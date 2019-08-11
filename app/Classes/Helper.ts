function subtractVectors(a:number[], b:number[]) {
	return a.map(function(element:number, index:number){
	  return element - b[index];
	})
}
  
function parseFormData(body:any) {
	let formData:any = new Object;
	formData.query = body.query;
	formData.yearRange = [body.startYear, body.stopYear]
	formData.popularityRange = body.popularity.split(',').map((val:string) => parseInt(val));
	formData.searchAudioFeatures = [body.danceability, body.energy, body.mode, body.acousticness, body.instrumentalness, body.liveness, body.valence].map(parseFloat);
  formData.searchAudioFeatureTolerance = body.tolerance;
  formData.searchDepth = body.depth;
  formData.offset = 0; // init offset to 0
	//console.log(formData)
	return formData;
}

export { subtractVectors, parseFormData }