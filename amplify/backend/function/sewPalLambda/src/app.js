/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var axios = require('axios');
var AWS = require('aws-sdk');
var ssmClient = new AWS.SSM({region: 'us-west-2'});

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

var airtable_key = '';

/**********************
 * Get method         *
 **********************/

app.get('/table', async function(req, res) {
  await getParam();
  const res_data = await axios.get(
    'https://api.airtable.com/v0/appNGAC5YA6KQkOP7/Patterns?view=Grid%20view',
    {
      headers: { Authorization: `Bearer ${airtable_key}` }
    }
  )
  .then(function (response) {
    // handle success
    return response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json({ error: error, url: req.url });
  });
  
  res.json({success: 'get call succeed!', url: req.url, data: res_data });
});

function getParam(){
  var params = {
    Name: '/airtable/key', 
    WithDecryption: true
  };
  var parameterPromise = ssmClient.getParameter(params).promise();
  return parameterPromise.then(
    function(data) {
      /* process the data */
      airtable_key = data.Parameter.Value;
    },
    function(error) {
      /* handle the error */
      console.log(error);
    }
  );
}

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app