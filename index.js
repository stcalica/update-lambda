const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const AWS = require('aws-sdk');

try {
  const functionName = core.getInput('function-name');
  const package = core.getInput('package');
  const AWS_SECRET_KEY = core.setSecret(core.getInput('AWS_SECRET_KEY'));
  const AWS_SECRET_ID = core.setSecret(core.getInput('AWS_SECRET_ID'));
  const AWS_REGION = core.setSecret(core.getInput('AWS_REGION'));
  console.log(AWS_REGION);
  console.log(`Updating Function Name ${functionName} with ${package}!`);
  fs.readdirSync('.').forEach(file => {
    console.log(file);
  });
    var zipBuffer = fs.readFileSync(`./${package}`);
  core.debug('Package put into memory buffer');

  const lambda = new AWS.Lambda({
      apiVersion: '2015-03-31',
      region: AWS_REGION,
      maxRetries: 3,
      sslEnabled: true,
      logger: console,
  });

  const params = {
    FunctionName: functionName,
    Publish: false,
    ZipFile: zipBuffer,
  };

  lambda.updateFunctionCode(params, err => {
      if (err) {
          console.error(err);
          process.exit(3);
      }
  });

} catch (error) {
  core.setFailed(error.message);
}
