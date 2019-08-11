function runNN(modelDirectory) {

	loadModel(modelDirectory).then(
	model =>  {
	  document.getElementById("file").addEventListener("change", function (event) {
	  compress(event).then(
		image =>  {
		  predict(image, model).then(
			prediction =>  {

			  var danceability       = document.getElementById("danceability");
        var energy             = document.getElementById("energy");
			  var mode               = document.getElementById("mode");
        var acousticness       = document.getElementById("acousticness");
        var instrumentalness   = document.getElementById("instrumentalness");
        var liveness           = document.getElementById("liveness");
			  var valence            = document.getElementById("valence");  
        
        danceability.value     = prediction[0][0].toFixed(2);
			  energy.value           = prediction[0][1].toFixed(2);
			  mode.value             = prediction[0][2].toFixed(2);
			  acousticness.value     = prediction[0][3].toFixed(2);
			  instrumentalness.value = prediction[0][4].toFixed(2);
			  liveness.value         = prediction[0][5].toFixed(2);
        valence.value          = prediction[0][6].toFixed(2);
        
			}, reason => {
			  console.log(reason);
			});
		}, reason => {
		  console.log(reason);
		});
	  });
	}, reason => {
	  console.log(reason);
	});
}