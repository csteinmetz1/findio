import { keys } from '../keys';
import * as request from 'request';

const authOptions = {
  uri: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic ' + (Buffer.from(keys.client_id + ':' + keys.client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  }
}

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

export { getToken }
