# # Place all the behaviors and hooks related to the matching controller here.
# # All this logic will automatically be available in application.js.
# # You can use CoffeeScript in this file: http://coffeescript.org/

# window.onload = ->
#   #Compatibility
#   navigator.getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia
  
#   canvas = document.getElementById('canvas')
#   context = canvas.getContext('2d')
#   video = document.getElementById('video')
#   videoObj = 
#     video: true
#     audio: false
#   streaming = false
#   $('#btnStart').click ->
#     localMediaStream = undefined
#     if navigator.getUserMedia
#       navigator.getUserMedia videoObj,
#         (stream) ->
#           video.src = if navigator.webkitGetUserMedia then window.URL.createObjectURL(stream) else stream
#           localMediaStream = stream
#           streaming = true
#           console.log 'started streaming'
#         , (error) ->
#           console.error 'Video capture error: ', error.code
#       $('#btnStop').click ->
#         localMediaStream.getVideoTracks()[0].stop;
#         streaming = false
#         console.log 'stopped streaming'
#       $('#btnPhoto').click ->
#         if streaming
#           console.log 'picture taken'
#           context.drawImage video, 0, 0, 320, 240
          
#   ctx = document.getElementById('hexnum').getContext('2d');
#   ctx.font = "48px serif";
#   if streaming
#     ctx.fillText "Hello world", 5, 50
#   else
#     ctx.fillText "Not Streaming", 5, 50