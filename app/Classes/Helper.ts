import { SearchParameters } from '../types';

function subtractVectors(a:number[], b:number[]) {
	return a.map(function(element:number, index:number){
	  return element - b[index];
	})
}
  
function parseFormData(body:any) {
	let formData:SearchParameters = {
    query: body.query.split(' '),
    yearRange: [body.startYear, body.stopYear],
    popularityRange: body.popularity.split(',').map((val:string) => parseInt(val)),
    audioFeatures: [body.danceability, body.energy, body.mode, body.acousticness, body.instrumentalness, body.liveness, body.valence].map(parseFloat),
    audioFeatureTolerance: parseFloat(body.tolerance),
    depth: parseInt(body.depth),
    offset: 0 // init offset to 0
  };
	return formData;
}

export { subtractVectors, parseFormData }