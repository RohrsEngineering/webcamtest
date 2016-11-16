// Store the configuration values for the video stream
var videoConfig = {
	video: true,
	audio: false,
};

// And maintain some sort of script state
var state = {
	stream: null,
	streaming: false,
};

// Try to limit modifying the state through this helper function
// This will make the code significantly less error-prone
var setState = function(newState) {
	state = Object.assign({}, state, newState);
};

// Break each piece of functionality out into separate functions
// This function only handles starting the recording from the user's
// camera
var startRecording = function(video) {
	// If we cannot get the user's media, just exit out of this function
	if (!navigator.getUserMedia) { return; }
	navigator.getUserMedia(
		videoConfig, // Referenced from the top of this file
		function(stream) {
			// Shorten the line to make it easier to read in the future
			video.src = navigator.webkitGetUserMedia ?
				window.URL.createObjectURL(stream) : // If we got user media, use it
				stream; // Otherwise keep stream as-is
			window.stream = stream; // Expose the stream to the window for console access
			setState({
				stream: stream, // Set the new stream state to the new stream
				streaming: true, // And set the streaming state to true
			});
			$("#btnStart").text("Stop Video");
		},
		function(error) {
			// Otherwise handle an error condition
			console.error("Video capture error: ", error.code);
		}
	);
};

// Have a function to handle when we want to stop recording from the user's
// camera
var stopRecording = function() {
	// Get each video track from the stream and iterate over them, calling a
	// function on each video stream we find to stop it
	state
		.stream
		.getVideoTracks()
		.map(function(stream) {
			stream.stop();
		});
	// And then make sure the app knows we've stopped streaming
	setState({ streaming: false });
		$("#btnStart").text("Start Video");
};

// A little helper function to make it easier to change the form
// that will get sent to the backend
var updateForm = function(data, number) {
	$("#scan_data").val(data);
	$("#scan_number").val(number);
};

// Separate the snapshot code into its own function which relies on the
// canvas context (for storing the image) and the camera's video
var takeSnapshot = function(context, video) {
	// Don't allow snapshots if there is nothing to pull from
	if (!state.streaming) {
		console.log('You need to be recording via your camera to take a snapshot!');
		return;
	}
	// If we have a canvas context we can write to, draw the image there
	var image = context.getImageData(0, 0, video.width, video.height);
	if (context) { context.drawImage(video, 0, 0, 320, 240); }

	//ImageData.data  representing a one-dimensional array containing the data
	//in the RGBA order, with integer values between 0 and 255
	console.log(img);
	console.log(img.data.length);
	analyzePhoto(img);

	// And finally, update the form data
	updateForm("Example Data", 12345);
};

var createArray = function(length) {
	var arr = new Array(length || 0),
			i = length;
	if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}
	return arr;
};

var add = function(a, b) {
	return a + b;
};

var analyzePhoto = function(img) {
	var intensity = createArray(img.height, img.width);
	var sumIntensity = new Array(img.height);
	var k = 3;
	for (var i = 0; i < img.height.length; i++) {
		for (var j = 0; j < img.width; j++) {
			intensity[i][j]=img.data[k];
		}
		sumIntensity[i]=intensity[i].reduce(add, 0);
	}
	console.log(intensity);
	console.log(sumIntensity);
};

// Wrap our initialization logic inside of a document ready closure
$(function() {
	// If we don't have a canvas, don't try to go through all of this work
	if ($("#canvas").length === 0) { return; }

	// Compatibility for multiple browsers
	navigator.getUserMedia = navigator.getUserMedia ||
		navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	// Set the canvas, video, and canvas context separately
	var canvas  = document.getElementById("canvas");
	var	video   = document.getElementById("video");
	var context = canvas.getContext("2d");

	// Handle the on-click event via jQuery for the toggle start/stop button
	$("#btnStart").on('click', function() {
		// Start streaming if we're not, stop if we are
		!state.streaming ? startRecording(video) : stopRecording();
	});
	$("#btnPhoto").on('click', function() {
		// Take a snapshot when btnPhoto is clicked
		takeSnapshot(context, video);
	});
});
