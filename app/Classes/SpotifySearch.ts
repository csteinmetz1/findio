import * as request from 'request';

export function search(query: string, token: string) {
  return new Promise(function (resolve, reject) {

	const options = {
		url: 'https://api.spotify.com/v1/search/?q=' + query + '&type=track',
		headers: {
		  'Authorization': 'Bearer ' + token
		},
		json: true
	};

	request.get(options, function(error: any, response: any, body: any) {
		if (!error && response.statusCode === 200) {
			resolve(body);
		}
		else {
			reject(error);
		}
	});
  });
}