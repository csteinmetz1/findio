
var predict = function(userImage, model) {
	return new Promise( function (resolve, reject) {
		const userImageTensor = tf.browser.fromPixels(userImage);
		const prediction = model.predict(userImageTensor.expandDims(0));
		console.log(prediction.array());
		resolve(prediction.array());
	});
}

