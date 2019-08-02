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
 *  Authors: Christian Steinmetz & Sean Myers
 *  Date: Aug 1, 2019
 *  Purpose: Built for the /r/ProgrammerHumor Hackathon
 */

/* 
    Modules
*/ 
import express from 'express'; // Express web server framework
import * as request from 'request'; // used for http requests
import path from 'path';
//var querystring = require('querystring'); 
//var cookieParser = require('cookie-parser');
//var session = require('client-sessions'); // store user data in cookies
//var fs = require('fs'); // used to read and write to the local filesystem 
//var socket = require('socket.io'); // socket connection to clients
//var bodyparser = require('body-parser'); // 
//var favicon = require('serve-favicon');


import { getToken } from './Classes/SpotifyAuthentication';

/* 
    Constants
*/
//port used for the server
const PORT = 8000;

// Create a new express application instance
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.send('This is adv');
});

app.listen(PORT, function () {
  console.log('Listening on port ', PORT);
});

// your application requests authorization
getToken().then(
  value =>  {
    console.log(value);
  }, reason => {
    console.log(reason);
  }
);