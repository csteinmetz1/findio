/*
 *  adv (TBD)
 *  The Spotify search you don't need and never wanted.
 * 
 *  Built using node.js, TypeScript, Express, and the 
 *  Spotify Web API.
 * 
 *  For more information, read
 *  https://github.com/csteinmetz1/adv
 * 
 *  Built for the r/ProgrammerHumor Hackathon
 *  by Christian Steinmetz & Sean Myers
 */

/* 
    Modules
*/ 
var express = require('express'); // Express web server framework
var request = require('request'); // used for http requests
//var querystring = require('querystring'); 
//var cookieParser = require('cookie-parser');
//var session = require('client-sessions'); // store user data in cookies
//var fs = require('fs'); // used to read and write to the local filesystem 
//var socket = require('socket.io'); // sockect connection to clients
//var bodyparser = require('body-parser'); // 
//var favicon = require('serve-favicon');
//var path = require('path'); //local path for filesystem read and writes
var keys = require('./keys'); // Spotify API keys file

/* 
    Constants
*/
//port used for the server
const PORT = 8000;

// Set API keys for client authentication
const client_id = keys.client_id;
const client_secret = keys.client_secret;
const redirect_uri = keys.redirect_uri;

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

// Create a new express application instance
//const app: express.Application = express();

//app.get('/', function (req, res) {
//  res.send('This is adv');
//});

//app.listen(PORT, function () {
//  console.log('Listening on port ', PORT);
//});