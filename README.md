# Telematics-Demo

Serverless Framework AWS NodeJS Example
This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework. 

## Prerequest

### install serverless 
npm install -g serverless

### check version
serverless -version

### install --offline plugin
serverless plugin install -n serverless-offline

### npm install dependencies
npm install

### login serverless platform
serverless login


## Usage
### Deployment
In order to deploy the example, you need to run the following command:

$ serverless deploy

After running deploy, you should see output similar to:

Serverless: Running "serverless" installed locally (in service node_modules)

Serverless: Using provider credentials, configured via dashboard: https://app.serverless.com/taowei/apps/ctrack/ctrack/dev/ap-southeast-2/providers

Serverless: Deprecation warning: Resolution of lambda version hashes was improved with better algorithm, which will be used in next major release.

            Switch to it now by setting "provider.lambdaHashingVersion" to "20201221"
            
            More Info: https://www.serverless.com/framework/docs/deprecations/#LAMBDA_HASHING_VERSION_V2
            
            Serverless: Packaging service...
            
Serverless: Excluding development dependencies...

Serverless: Installing dependencies for custom CloudFormation resources...

Serverless: Uploading CloudFormation file to S3...

Serverless: Uploading artifacts...

Serverless: Uploading service ctrack.zip file to S3 (2.14 MB)...

Serverless: Uploading custom CloudFormation resources...

Serverless: Validating template...

Serverless: Updating Stack...

Serverless: Checking Stack update progress...

..................................

Serverless: Stack update finished...

Service Information

service: ctrack

stage: dev

region: ap-southeast-2

stack: ctrack-dev

resources: 28

api keys:

  None
  
endpoints:

  GET - https://#######.execute-api.ap-southeast-2.amazonaws.com/dev/ctrack/token
  
  GET - https://#######.execute-api.ap-southeast-2.amazonaws.com/dev/ctrack/vehicles
  
functions:

  fetchToken: fetchToken
  getVehicles: getVehicles
  
layers:

  None
  
Serverless: Publishing service to the Serverless Dashboard...

Serverless: Successfully published your service to the Serverless Dashboard: https://app.serverless.com/taowei/apps/ctrack/ctrack/dev/ap-southeast-2


## reference:

https://www.serverless.com/framework/docs
