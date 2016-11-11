$(function() {
	if ($("#canvas").length === 0) { return; }
	//Compatibility
	/*global navigator*/
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		btnStart = document.getElementById("btnStart"),
		btnStop = document.getElementById("btnStop"),
		btnPhoto = document.getElementById("btnPhoto"),
		streaming = false,
		videoObj = {
				video: true,
				audio: false
		};

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
		}
	});

	btnStop.addEventListener("click", function() {
			localMediaStream.getVideoTracks()[0].stop();
	});

	btnPhoto.addEventListener("click", function() {
		if (context) { context.drawImage(video, 0, 0, 320, 240); }
		$("#scan_data").val("Example Data");
		$("#scan_number").val(12345);
	});
	// ctx.font = "48px serif";
	// if streaming {
	// 	ctx.fillText("Hello world", 5, 50);
	// }
	// else {
	// 	ctx.fillText("Not Streaming", 5, 50);
	// }
});
