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

/* 
    Constants
*/
//port used for the server
const PORT = 8000;
const audioFeatureVector = ['danceability', 'energy', 'mode', 'acousticness', 'instrumentalness', 'liveness', 'valence'];

// Create a new express application instance
const app = express();
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

var subtractVectors = function(a:number[], b:number[]) {
  return a.map(function(element:number, index:number){
    return element - b[index];
  })
}


app.post('/search', (req, res) => {

  // application requests authorization
  getToken()
  .then(function(token:string) {
    console.log(token)
    const searchAudioFeatures = [req.body.danceability, req.body.energy, req.body.mode, req.body.acousticness, req.body.instrumentalness, req.body.liveness, req.body.valence].map( (element:string) => parseFloat(element) );
    const searchAudioFeatureTolerance = req.body.tolerance;

    let featureVectorWithinTolerance = function(track:any) {
      let difference = subtractVectors(track.audio_features, searchAudioFeatures);
      let distance = difference.reduce( (acc, cur) => acc + Math.pow(cur,2) );
      if (distance < searchAudioFeatureTolerance) {
        return true;
      }
    }
    search(req.body.query, req.body.startYear, req.body.stopYear, token)
    .then(function(result) {
      // if user includes audio features use them to filter the search
      if (searchAudioFeatures.every( (element:number) => !isNaN(element)) ) {
        let trackIds:string[] = result.tracks.items.map( (track:any) => track.id );
        getAudioFeatures(trackIds, token)
        .then(function(audioFeatures) {
          audioFeatures.map( function(f:any, index:number) {
            let featureVector = [f.danceability, f.energy, f.mode, f.acousticness, f.instrumentalness, f.liveness, f.valence] 
            result.tracks.items[index].audio_features = featureVector;
          });
        });
        var filteredTracks = result.tracks.items.filter(featureVectorWithinTolerance) 
      }
      // if user doesn't provide audio features don't filter search
      else {
        var filteredTracks = result.tracks.items;
      }
      res.render('results.ejs', { results : filteredTracks, query : req.body.query} )   
    }, function(error) {
        console.log(error);
        res.render('error.ejs', {error: error})
      });
    }, function(reason) {
      console.log(reason);
  })
})

app.listen(PORT, function () {
  console.log('Listening on port ', PORT);
});