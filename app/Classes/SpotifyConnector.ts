/*
* 	
*/
import * as request from 'request';
import { checkToken } from './SpotifyAuthentication';
import { subtractVectors } from './Helper';
import { parseDate } from 'tough-cookie';

/*
*	
*/
function search(searchParams:any, token: string) {
  return new Promise<any>(function (resolve, reject) {

    const options = {
      url: 'https://api.spotify.com/v1/search/?q=' 
            + searchParams.query 
            + '%20year:' + searchParams.yearRange[0]
            + '-' + searchParams.yearRange[1] 
            + '&type=track&limit=50'
            + '&offset=' + searchParams.offset,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };

    request.get(options, function(error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {
        // get list of tracks from search results
        var tracks = body.tracks.items;

        let featureVectorWithinTolerance = function(track:any) {
          let difference = subtractVectors(track.audio_features, searchParams.searchAudioFeatures);
          let distance = difference.reduce( (acc:number, cur:number) => acc + Math.pow(cur,2) );
          if (distance < searchParams.searchAudioFeatureTolerance) {
            return true;
          }
        }
          
        let trackWithinPopularityRange = function(track:any) {
          //console.log(track.popularity, searchParams.popularityRange[0], searchParams.popularityRange[1]);
          if (track.popularity > searchParams.popularityRange[0] && track.popularity < searchParams.popularityRange[1]) {
            return true;
          }
        }

        // if user includes audio features use them to filter the search
        if (searchParams.searchAudioFeatures.every( (element:number) => !isNaN(element)) ) {
          let trackIds:string[] = tracks.map( (track:any) => track.id );
          getAudioFeatures(trackIds, token)
          .then(function(audioFeatures) {
            audioFeatures.map( function(f:any, index:number) {
              let featureVector = [f.danceability, f.energy, f.mode, f.acousticness, f.instrumentalness, f.liveness, f.valence] 
              tracks[index].audio_features = featureVector;
            });
          });
          var filteredTracks = tracks.filter(featureVectorWithinTolerance) 
        }
        // if user doesn't provide audio features don't filter search
        else {
          var filteredTracks = tracks.filter(trackWithinPopularityRange);
        }
        resolve(filteredTracks);
      }
      else {
        reject(error);
      }
    });
  });
}

function getAudioFeatures(ids: string[], token: string) {
	return new Promise<any>(function (resolve, reject) {
  
	  const options = {
		  url: 'https://api.spotify.com/v1/audio-features/?ids=' + ids.join(),
		  headers: {
			'Authorization': 'Bearer ' + token
		  },
		  json: true
	  };
  
	  request.get(options, function(error: any, response: any, body: any) {
			  if (!error && response.statusCode === 200) {
				  resolve(body.audio_features);
			  }
			  else {
				  reject(error);
			  }
		  });
	});
  }

export { search, getAudioFeatures }