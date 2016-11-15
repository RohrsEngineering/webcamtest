$(function() {
	if ($("#canvas").length === 0) { return; }

	//Compatibility
	/*global navigator, $, stream, Image*/
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
			console.log('start navigator.getUserMedia');
			$("#btnStop").click( function() {
					stream.getVideoTracks()[0].stop();
					console.log('stop navigator.getUserMedia');
			});

			$("#btnPhoto").click( function() {
				snapPhoto();
				//context.drawImage(video, 0, 0, 320, 240);
				console.log('Photo button press');
			});
			$("#btnTestPhoto").click( function() {
				snapTestPhoto();
				//context.drawImage(video, 0, 0, 320, 240);
				console.log('Test photo button press');
			});
		} else {
			console.log('Error starting navigator.getUserMedia');
		}
	});
	
	function snapPhoto() {
		if (context) { context.drawImage(video, 0, 0, 320, 240); }
		var img = context.getImageData(0, 0, video.width, video.height);
		//ImageData.data  representing a one-dimensional array containing the data
		//in the RGBA order, with integer values between 0 and 255
		console.log(img);
		console.log(img.data.length);
		analyzePhoto(img);

		console.log("Photo Drawn");
	}
	
	function snapTestPhoto() {
		var testPhoto = new Image();
    testPhoto.src = "https://s3-us-west-2.amazonaws.com/velocitylaboratories/blank-calibration-example.png";
  	console.log(testPhoto);
  	
		if (context) { context.drawImage(testPhoto, 0, 0, 320, 240); }
		var img = context.getImageData(0, 0, testPhoto.width, testPhoto.height);
		analyzePhoto(img);
	}
	
	function analyzePhoto(img) {
		var intensity= createArray(img.height, img.width);
		var sumIntensity= new Array(img.height);
		var k = 3;
		for (var i = 0; i<img.height.length; i++) {
			for (var j = 0; j<img.width; j++) {
				intensity[i][j]=img.data[k];
			}
			sumIntensity[i]=intensity[i].reduce(add, 0);
		}
		console.log(intensity);
		console.log(sumIntensity);
		updateImgDB(sumIntensity);
	}
	
	function updateImgDB (sumIntensity) {
		$("#scan_data").val("Example Data");
		$("#scan_number").val(12345);
	}
	function add(a, b) {
	    return a + b;
	}
	
	function createArray(length) {
    var arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
	}
	// ctx.font = "48px serif";
	// if streaming {
	// 	ctx.fillText("Hello world", 5, 50);
	// }
	// else {
	// 	ctx.fillText("Not Streaming", 5, 50);
	// }
});
