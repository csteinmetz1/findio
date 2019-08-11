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
import { getToken, checkToken } from './Classes/SpotifyAuthentication';
import { search, getAudioFeatures } from './Classes/SpotifyConnector';
import { parseFormData } from './Classes/Helper';
import { promises } from 'dns';

/* 
    Constants
*/
//port used for the server
const PORT = 8000;

// Create a new express application instance
const app = express();
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.post('/search', (req, res) => {

  // application requests authorization
  getToken()
  .then(function(token:string) {
    let searchParams = parseFormData(req.body);
    var searches:any[] = [];
    while (searchParams.offset + 50 <= searchParams.searchDepth) {
      searchParams.offset += 50;
      searches.push(search(searchParams, token))
    }
    Promise.all(searches)
    .then(function(searchResults:any) {
      let mergedSearchResults = [].concat.apply([], searchResults);
      res.render('results.ejs', { results : mergedSearchResults, query : searchParams.query} )  
    })
  }, function(error) {
      console.log(error);
      res.render('error.ejs', {error: error})
    });
  }, function(reason) {
    console.log(reason);
});


app.listen(PORT, function () {
  console.log('Listening on port ', PORT);
});