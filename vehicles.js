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

let decryptedPass, decryptedID, responseData, args = {};

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

const keys = [encryptedPass, encryptedID]

module.exports.getVehicles = async (event) => {
	await fetchAuthentication();
	return responseData;
};