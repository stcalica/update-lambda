const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const AWS = require('aws-sdk');

try {
  const functionName = core.getInput('function-name');
  const package = core.getInput('package');
  const AWS_SECRET_KEY = core.getInput('AWS_SECRET_KEY');
  const AWS_SECRET_ID = core.getInput('AWS_SECRET_ID');
  const AWS_REGION = core.getInput('AWS_REGION');

  console.log(`Updating Function Name ${functionName} with ${package}!`);

  var zipBuffer = fs.readFileSync(`./${package}`);
  core.debug('Package put into memory buffer');

  const lambda = new AWS.Lambda({
      apiVersion: '2015-03-31',
      region: AWS_REGION,
      secretAccessKey: AWS_SECRET_KEY,
      accessKeyId: AWS_SECRET_ID,
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
