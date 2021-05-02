# Install Serverles framework
```
npm i -g serverless
```


# Create project
```
serverless create --template aws-nodejs --path lambda-with-dynamodb
```

# Execute commands

## Invoke local enviroment
```
sls invoke local -f {function_name} --stage dev
```
- --state -> This is a dynamic value that is used in yml file, to get its value (dev) you can use the following command into the yml file. To get more information [here.](https://www.serverless.com/framework/docs/providers/aws/guide/variables/)
```
${opt:stage}
```
example 1
```
sls invoke local -f save_data_dynamodb --stage prod -p ./json_inputs/save_data_dynamodb.json
```

example 2
```
sls invoke local -f save_data_dynamodb --stage dev -p ./json_inputs/save_data_dynamodb.json
```

# Deploy proccess
- If is the first time you have to run the following command
```
sls deploy --stage {dev|prod}
```
- To update a exist lambda and you want updata only a especific lambda you have to run the following command
```
sls deploy function -f {function_name} --stage {dev|prod}
```


# Documentation links
- Yml format
https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/

- Pass dynamically values to the yml file.
https://www.serverless.com/framework/docs/providers/aws/guide/variables/

- Reference variables in other files
https://www.serverless.com/framework/docs/providers/aws/guide/variables/#reference-variables-in-other-files

- Schedule AWS Lambda
https://blog.shikisoft.com/3-ways-to-schedule-aws-lambda-and-step-functions-state-machines/