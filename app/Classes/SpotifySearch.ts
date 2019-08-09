import * as request from 'request';

function search(query: string, startYear: string, stopYear: string, token: string) {
  return new Promise<any>(function (resolve, reject) {

	const options = {
		url: 'https://api.spotify.com/v1/search/?q=' + query + '%20year:' + startYear + '-' + stopYear +'&type=track&limit=40',
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

export { search }