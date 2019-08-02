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
    Module Imports
*/ 
import express from 'express'; // Express web server framework
import * as request from 'request'; // used for http requests
import path from 'path';
/*
    Local Imports
*/
import { getToken } from './Classes/SpotifyAuthentication';

/* 
    Constants
*/
//port used for the server
const PORT = 8000;

// Create a new express application instance
const app = express();
app.use(express.static(path.join(__dirname, 'public/')))

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