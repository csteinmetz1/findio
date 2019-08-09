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
import { search } from './Classes/SpotifySearch';

/* 
    Constants
*/
//port used for the server
const PORT = 8000;
let token: string = "";

// Create a new express application instance
const app = express();
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// application requests authorization
getToken().then(
  value =>  {
    console.log(value);
    token = value;
  }, reason => {
    console.log(reason);
  }
);

app.post('/search', (req, res) => {
  search(req.body.query, req.body.startYear, req.body.stopYear, token).then(
    result => {
      res.render('results.ejs', { results : result.tracks.items, query : req.body.query} )
    }, error => {
      console.log(error);
      res.render('error.ejs', {error: error})
    }
  );
})

app.listen(PORT, function () {
  console.log('Listening on port ', PORT);
});