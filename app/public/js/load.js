var loadModel = function(modelUrl) {
	return new Promise(function (resolve, reject) {
    var model = tf.loadLayersModel(modelUrl);
    resolve(model);
  });

}