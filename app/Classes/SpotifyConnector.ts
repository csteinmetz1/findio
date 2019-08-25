/*
* 	
*/
import * as request from 'request';
import { checkToken } from './SpotifyAuthentication';
import { subtractVectors } from './Helper';
import { parseDate } from 'tough-cookie';
import { AudioFeaturesObject, TrackObject, SearchResults, SearchDetails } from '../types';

/*
*	
*/
function search(searchParams:any, token: string) {
  return new Promise<SearchResults>(function (resolve, reject) {

    // build the API search url
    const options = {
      url: 'https://api.spotify.com/v1/search/?q=' 
            + searchParams.query.join('%20')
            + '%20year:' + searchParams.yearRange[0]
            + '-' + searchParams.yearRange[1] 
            +  ( (searchParams.genre == 'Any') ? ''  : '%20genre:%22' + searchParams.genre.join('%20') + '%22') 
            + '&type=track&limit=50'
            + '&offset=' + searchParams.offset,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };

    request.get(options, function(error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {

        let featureVectorWithinTolerance = function(track:TrackObject) {
          if (track.audio_features) {
            let difference = subtractVectors(track.audio_features, searchParams.audioFeatures);
            let distance = difference.reduce( (acc:number, cur:number) =>  acc + Math.pow(cur,2), 0 );
            if (distance < searchParams.audioFeatureTolerance) {
              return true;
            }
          }
          else {
            return false;
          }
        }
          
        let trackWithinPopularityRange = function(track:TrackObject) {
          if (track.popularity > searchParams.popularityRange[0] && track.popularity < searchParams.popularityRange[1]) {
            return true;
          }
        }

        let trackWithinDurationRange = function(track:TrackObject) {
          if (track.duration_ms > searchParams.durationRange[0] && track.duration_ms < searchParams.durationRange[1]) {
            return true;
          }
        }

        let trackWithinExplicitFilter = function(track:TrackObject) {
          switch(searchParams.explicit) {
            case 'allow':
              return true;
              break;
            case 'exclude':
              if (track.explicit) {
                return false;
              }
              else {
                return true;
              }
              break;
            case 'explicit': 
              if (track.explicit) {
                return true;
              }
              else {
                return false;
              }
              break;
            }
          }

        // get list of tracks from search results
        var searchResultTracks:TrackObject[] = body.tracks.items;

        // init filtered tracks array and details on the search
        var filteredTracks:TrackObject[] = [];
        var searchDetails:SearchDetails = {
          totalTracks: searchResultTracks.length,
          filteredTracks: searchResultTracks.length,
          filteredByAudioFeatures: 0,
          filteredByPopularity: 0,
          filteredByDuration: 0,
          filteredByExplicit: 0
        }
        
        // this is the object we will return (with all details)
        var searchResults:SearchResults = {
          trackObjects: filteredTracks,
          searchDetails: searchDetails
        }
        
        // get track ids for each found track to get audio features
        let trackIds:string[] = searchResultTracks.map( (track:TrackObject) => track.id );

        // if no tracks are found return SearchResults object with empty array
        if (trackIds.length < 1) {
          resolve(searchResults);
        }
        // if we've got tracks let's filter them
        else {
          getAudioFeatures(trackIds, token)
          .then(function(audioFeatures) {
            audioFeatures.filter( (f:AudioFeaturesObject) => f != null ).map( function(f:AudioFeaturesObject, index:number) {

              let featureVector = [f.danceability, f.energy, f.mode, f.acousticness, f.instrumentalness, f.liveness, f.valence];
              let tempTracks = searchResultTracks[index];
              
              tempTracks.audio_features = featureVector;
              searchResults.trackObjects.push(tempTracks);
            });
            
            // if user includes audio features use them to filter the search
            if (searchParams.audioFeatures.every( (element:number) => !isNaN(element)) ) {
              searchResults.trackObjects = searchResults.trackObjects.filter(featureVectorWithinTolerance);
            }
            // calculate how many tracks were filtered out by audio features
            searchResults.searchDetails.filteredByAudioFeatures = (searchResults.searchDetails.filteredTracks - searchResults.trackObjects.length);
            searchResults.searchDetails.filteredTracks = searchResults.trackObjects.length;

            // filter by popularity
            searchResults.trackObjects = searchResults.trackObjects.filter(trackWithinPopularityRange);
            // calculate how many tracks were filtered out by popularity
            searchResults.searchDetails.filteredByPopularity = (searchResults.searchDetails.filteredTracks - searchResults.trackObjects.length);
            searchResults.searchDetails.filteredTracks = searchResults.trackObjects.length;

            // filter by duration
            searchResults.trackObjects = searchResults.trackObjects.filter(trackWithinDurationRange);
            // calculate how many tracks were filtered out by duration
            searchResults.searchDetails.filteredByDuration = (searchResults.searchDetails.filteredTracks - searchResults.trackObjects.length);
            searchResults.searchDetails.filteredTracks = searchResults.trackObjects.length;

            // filter by explicit content
            searchResults.trackObjects = searchResults.trackObjects.filter(trackWithinExplicitFilter);
            // calculate how many tracks were filtered out by explicit content
            searchResults.searchDetails.filteredByExplicit = (searchResults.searchDetails.filteredTracks - searchResults.trackObjects.length);
            searchResults.searchDetails.filteredTracks = searchResults.trackObjects.length;

            resolve(searchResults);
          }, function(error) {
            console.log(error)
            reject(error);
          });
        }
      }
      else {
        reject(error);
      }
    });
  });
}

function getAudioFeatures(ids:string[], token:string) {
	return new Promise<AudioFeaturesObject[]>(function (resolve, reject) {
  
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