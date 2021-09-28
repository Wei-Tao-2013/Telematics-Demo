'use strict';

const soap = require('soap');
const AWS = require('aws-sdk');
const encryptedPass = process.env['PASSWORD'];
const encryptedID = process.env['USER_NAME'];
const url = process.env['CTRACK_URL'];
const region = process.env['REGION'];
const kms = new AWS.KMS();

AWS.config.update({
	region: region
});

var ddb = new AWS.DynamoDB({
	apiVersion: '2012-08-10'
});

let decryptedPass = encryptedPass,
	decryptedID = encryptedID,
	responseData, args = {};

async function fetchAuthentication() {
	// TODO handle the event here
	args.username = decryptedID;
	args.password = decryptedPass;
	try {
		const client = await soap.createClientAsync(url);
		let res = await client.LoginAsync(args);
		//statusCode = 200;
		responseData = res[0].LoginResult;
		responseData.statusCode = 200;

	} catch (err) {
		//statusCode = 500;
		responseData = err;
	};

};

function storeTokenIntoDynamoDB(key) {
	console.log("-----start store in DynamoDB-----");
	let params = {
		TableName: 'SESSION_TOKEN',
		Item: {
			'Token': {S:key.SessionToken },
			'TokenTimeStamp':{S: + new Date() + ''},
			'ErrorCode': {S:key.ErrorCode},
			'SessionDurationMinutes': {S:key.SessionDurationMinutes},
			'SessionToken': {S:key.SessionToken},
			'UserId': {S:key.UserId}
		}
	};

	// Call DynamoDB to add the item to the table
	return new Promise((resolve, reject) => {
		ddb.putItem(params, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})

	});
};

function decryptKMS(key) {
	return new Promise((resolve, reject) => {
		// const kms = new AWS.KMS();
		kms.decrypt({
			CiphertextBlob: new Buffer(key, 'base64')
		}, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data.Plaintext.toString('ascii'))
			}
		})
	})
};

const keys = [encryptedPass, encryptedID];

module.exports.fetchToken = async (event) => {
	console.log('start fetchToken with parameters decryptedPass and decryptedID >>>' + decryptedPass +'   '+ decryptedID)
	if (!decryptedPass || !decryptedID) {
		try {
			let results = await Promise.all(keys.map(decryptKMS));
			decryptedPass = results[0];
			decryptedID = results[1];
		} catch (err) {
			return err;
		}
	}
	await fetchAuthentication();
	let key=[responseData];
//	await  Promise.all(key.map(storeTokenIntoDynamoDB));
	console.log(JSON.stringify(responseData))
	return responseData;

	
};