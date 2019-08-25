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
import { parseFormData, sumSearchDetails } from './Classes/Helper';
import { sortResults } from './Classes/Sort';
import { SearchParameters, SearchResults, TrackObject } from './types';

/*
   Data
*/
import { dropdown } from './public/dropdown/dropdown.json'


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

app.get('/', (req, res) => {
  res.render('index.ejs', {dropdown: dropdown})
})

app.post('/search', (req, res) => {

  getToken()                                                      // Application requests authorization
  .then(function(token:string) {
    let searchParams:SearchParameters = parseFormData(req.body);  // Parse search params from form and store into object
    var searches:Promise<SearchResults>[] = [];                   // Create array to hold promises from each search
    while (searchParams.offset + 50 <= searchParams.depth) {      // Perform number of searches required to get to the provided depth
      searchParams.offset += 50;
      searches.push(search(searchParams, token))                  // Save each search results array into an array of promises
    }
    Promise.all(searches)
    .then(function(searchResults) {
      // extract the array of track results for each search
      let mergedTrackObjects = searchResults.map((searchResults:SearchResults) => searchResults.trackObjects);
      // flatten these boys out and then sort them
      let flatMergedTrackObjects = sortResults(mergedTrackObjects.flat(), searchParams.sort);

      // extract the array of track results for each search
      let mergedSearchDetails = searchResults.map((searchResults:SearchResults) => searchResults.searchDetails);
      let summarySearchDetails = sumSearchDetails(mergedSearchDetails);

      // send data to the template
      res.render('results.ejs', { details:summarySearchDetails, results:flatMergedTrackObjects, query:searchParams.query});

    }, function(error) {
      console.log("one or more search()s failed", error);
      res.redirect('error.html')
    });
  }, function(error) {
      console.log("getToken() failed", error);
    });
  }, function(error) {
    console.log("/search endpoint failed", error);
});


app.listen(PORT, function () {
  console.log('Listening on port ', PORT);
});