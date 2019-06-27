const width = 400;
const height = 300;
        
var video = document.createElement('video')
video.autoplay = true

// Use of Konva Stage
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var webcam = new Konva.Image({
    image : video,
    x: 0,
    y: 0,
    width: width,
    height: height
});
layer.add(webcam);


var imageObj = new Image(width,height)

function get_video(){
        navigator.getMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

        navigator.getMedia({
            video: true,
            audio: false
            }, function(stream){
                console.log('camera fonctionne')
                video.srcObject=stream;
                video.play();
                core = core();
            }, function(error){
                console.log('camera fonctionne pas')
                console.log(error.code)
            }
        );
}

//Call the get_video function from video.js
get_video()