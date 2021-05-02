'use strict';
const AWS = require('aws-sdk');
const csvjson = require('csvjson');

AWS.config.update({
  region: 'us-east-1'
})

/**
 * 
 * @param {body} event.body
 * [
 *  {},
 *  {}
 * ]
 */
module.exports.save = async (event) => {
    try{
        let {body} = event;
        console.log(body);
    
        if (!body){
            body = [];
            let dynamodb = new AWS.DynamoDB.DocumentClient();
            let dynamoParams = {
                TableName: process.env.MOVIE_TABLE,
                Key: {
                    'movie_id': 'asi785421'
                }
            }
    
            dynamodb.get(dynamoParams, (err, data) => {
                if(err){
                    console.error(err);
                    return
                }
                
                console.log(data)
                body.push(data.Item)
                return save_data_to_s3(body);
            })
        }
        else{
            return save_data_to_s3(body);
        }    
    }
    catch (error){
        console.log(error);
    }
    
    
}

let save_data_to_s3 = async (body) => {
    let s3 = new AWS.S3();
    console.log('save-data');
    let csvData = csvjson.toCSV(body, {headers: 'key'})
    let s3Params = {
        Bucket: 'csv-data-test/data',
        Key: `${Date.now()}-csv-data.csv`,
        Body: csvData,
        ContentType: 'text/csv'
    };

    console.log(s3Params);
    s3.upload(s3Params, (err, data) => {
        console.log(err);
        if(err){
            console.log(err)
            return {
                statusCode: 500,
                body: 'Error to save the file in the bucket. ' + err
            }
        }
        else{
            console.log('si guardo');
            return {
                statusCode: 200,
                body: `File uploaded successfully at ${data.location}`
            }
        }

    })
}