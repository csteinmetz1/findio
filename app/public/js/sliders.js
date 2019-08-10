$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

// Without JQuery
var slider = new Slider('#tolerance', {
	formatter: function(value) {
		return value;
	}
});