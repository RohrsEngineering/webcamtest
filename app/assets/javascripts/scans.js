window.onload = function() {

	//Compatibility
	/*global navigator*/
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		btnStart = document.getElementById("btnStart"),
		btnStop = document.getElementById("btnStop"),
		btnPhoto = document.getElementById("btnPhoto"),
		videoObj = {
				video: true,
				audio: false
		};
	var streaming = false;
	btnStart.addEventListener("click", function() {
		var localMediaStream;
		if (navigator.getUserMedia) {
			navigator.getUserMedia(
				videoObj,
				function(stream) {              
					video.src = (navigator.webkitGetUserMedia) ? window.URL.createObjectURL(stream) : stream;
					localMediaStream = stream;
					streaming = true;
				},
				function(error) {
					console.error("Video capture error: ", error.code);
				}
			);

			btnStop.addEventListener("click", function() {
					localMediaStream.getVideoTracks()[0].stop();
			});

			btnPhoto.addEventListener("click", function() {
				context.drawImage(video, 0, 0, 320, 240);

			});
		}
	});
	// ctx.font = "48px serif";
	// if streaming {
	// 	ctx.fillText("Hello world", 5, 50);
	// }
	// else {
	// 	ctx.fillText("Not Streaming", 5, 50);
	// }
};