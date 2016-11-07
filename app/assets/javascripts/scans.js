window.onload = function() {
  var canvas, context, ctx, streaming, video, videoObj;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  video = document.getElementById('video');
  videoObj = {
    video: true,
    audio: false
  };
  streaming = false;
  $('#btnStart').click(function() {
    var localMediaStream;
    localMediaStream = void 0;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(videoObj, function(stream) {
        video.src = navigator.webkitGetUserMedia ? window.URL.createObjectURL(stream) : stream;
        localMediaStream = stream;
        streaming = true;
        return console.log('started streaming');
      }, function(error) {
        return console.error('Video capture error: ', error.code);
      });
      $('#btnStop').click(function() {
        localMediaStream.getVideoTracks()[0].stop;
        streaming = false;
        return console.log('stopped streaming');
      });
      return $('#btnPhoto').click(function() {
        if (streaming) {
          console.log('picture taken');
          return context.drawImage(video, 0, 0, 320, 240);
        }
      });
    }
  });
  ctx = document.getElementById('hexnum').getContext('2d');
  ctx.font = "48px serif";
  if (streaming) {
    return ctx.fillText("Hello world", 5, 50);
  } else {
    return ctx.fillText("Not Streaming", 5, 50);
  }
};
