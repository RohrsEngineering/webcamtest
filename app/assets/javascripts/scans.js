$(function() {
	if ($("#canvas").length === 0) { return; }

	//Compatibility
	/*global navigator, $, stream*/
	navigator.getUserMedia = navigator.getUserMedia ||
		navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.querySelector('video'),
		streaming = false,
		constraints = {
				video: true,
				audio: false
		};
	/*global stream*/
	function successCallback(stream) {
		window.stream = stream; // stream available to console
		if (window.URL) {
    		video.src = window.URL.createObjectURL(stream);
		} else {
    		video.src = stream;
		}
		console.log('navigator.getUserMedia active');
	}

	function errorCallback(error) {
	  console.log('navigator.getUserMedia error: ', error);
	}
	
	$( "#btnStart" ).click( function() {
		if (navigator.getUserMedia) {
			navigator.getUserMedia(constraints, successCallback, errorCallback);

			$("#btnStop").click( function() {
					stream.getVideoTracks()[0].stop();
			});

			$("#btnPhoto").click( function() {
				snapPhoto();
				//context.drawImage(video, 0, 0, 320, 240);
				console.log('Photo button press');
			});
		}
	});
	
	function snapPhoto(img) {
		if (context) { context.drawImage(video, 0, 0, 320, 240); }
		$("#scan_data").val("Example Data");
		$("#scan_number").val(12345);
		img = context.getImageData(0, 0, video.width, video.height);
		console.log("Photo Drawn");
	}
	// ctx.font = "48px serif";
	// if streaming {
	// 	ctx.fillText("Hello world", 5, 50);
	// }
	// else {
	// 	ctx.fillText("Not Streaming", 5, 50);
	// }
});
