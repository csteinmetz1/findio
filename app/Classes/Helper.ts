import { SearchParameters, SearchDetails } from '../types';

function subtractVectors(a:number[], b:number[]) {
	return a.map(function(element:number, index:number){
	  return element - b[index];
	})
}
  
function parseFormData(body:any) {
	let formData:SearchParameters = {
    query: body.query.split(' '),
    yearRange: [body.startYear, body.stopYear],
    durationRange: body.duration.split(',').map((val:string) => parseInt(val)),
    explicit: body.explicit,
    genre: body.genre.split(' '),
    popularityRange: body.popularity.split(',').map((val:string) => parseInt(val)),
    audioFeatures: [body.danceability, body.energy, body.mode, body.acousticness, body.instrumentalness, body.liveness, body.valence].map(parseFloat),
    audioFeatureTolerance: parseFloat(body.tolerance),
    depth: parseInt(body.depth),
    sort: body.sort,
    offset: 0 // init offset to 0
  };
  //console.log(formData)
	return formData;
}

function sumSearchDetails(searchDetails:SearchDetails[]) {
  return searchDetails.reduce((acc:SearchDetails, cur:SearchDetails) => {
    for (var key in cur) {
      if (cur.hasOwnProperty(key) && acc.hasOwnProperty(key)) {
        acc[key] += cur[key];
      }
    }
    return acc;
  });
}

export { subtractVectors, parseFormData, sumSearchDetails }