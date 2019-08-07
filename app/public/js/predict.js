
var predict = function(userImage, model) {
	const userImageTensor = tf.browser.fromPixels(userImage);
	const prediction = model.predict(userImageTensor.expandDims(0));
	console.log(prediction.array())
}

