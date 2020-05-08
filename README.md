# update-lambda
Github Action to Update Lambda Function

# How to use

Works with existing zip package, can be created in steps or job prior to this action.

Create secrets:
  * AWS_REGION
  * AWS_SECRET_ID
  * AWS_SECRET_KEY

```
name: Test Run
on:
  push
jobs:
  lambda:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: echo "THIS IS A TEST PACKAGE" > file.txt
      - run: zip lambda.zip file.txt
      - uses: stcalica/update-lambda@master
        with:
          package: lambda.zip
          function-name: TEST-FUNCTION
          AWS_REGION: ${{ secrets.AWS_REGION }}
          AWS_SECRET_ID: ${{ secrets.AWS_SECRET_ID }}
          AWS_SECRET_KEY: ${{ secrets.AWS_SECRET_KEY }}
```
