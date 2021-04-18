'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
})

module.exports.save = async (event) => {
  
  let {body} = event;
  console.log(body);

  if (!body){
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Body doesn't exist"
      })
    }
  }

  if (!body.movie_id){
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Body doesn't have movie_id"
      })
    }
  }

  let dynamo_client = new AWS.DynamoDB.DocumentClient();
  let dynamo_table = process.env.MOVIE_TABLE;

  let params = {
    TableName: dynamo_table,
    Item: body
  }

  console.log(dynamo_table);
  console.log(params);

  let error = '';

  dynamo_client.put(params, (err, data) => {
    if(err){
      console.error(err);
      error = err
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Movie saved successfully"
      })
    }

  })  


  if(error != ''){
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error to save the movie. " + error
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Movie saved successfully!!!"
    })
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
