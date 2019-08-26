/*
* 	Configuration and methods for setting up Spotify authentication/ Spotify API tokens
*/
// The keys file has configuration details for using the spotify api
//import { keys } from '../keys';
import * as request from 'request';

// When you send any POST request you need auth options 
const authOptions = {
  uri: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  }
}

/*
* This method uses the authentication options above to receive a token 
* from spotify that allows for API requests to be made.
* It needs to be refreshed after 1 hour.
* Christian thinks we need to check its validation before every use.
*/
function getToken() {
  return new Promise<string>(function (resolve, reject) {
    request.post(authOptions, function(error: any, response: any, body: any) {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body).access_token);
      }
      else {
        reject(error);
      }
    });
  });
}

/*
* This method checks to see if the Spotify API token has expired.
* If the token has expired it will refresh it.
*/
function checkToken(token: string) {
  let trackId = '06AKEBrKUckW0KREUWRnvT'
  let getOptions = {
    uri: 'https://api.spotify.com/v1/audio-features/' + trackId,
    headers: {
		  'Authorization': 'Bearer ' + token
		},
		json: true
  }
  return new Promise<boolean>(function (resolve, reject) {
    request.get(getOptions, function(error: any, response: any, body: any) {
    if (!error && response.statusCode === 200) {
      resolve(true);
    }
    else {
      reject(false);
      console.log(error);
    }
    })
  });
}

export { getToken, checkToken }