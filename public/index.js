//set width and height of the stage and webcam
const width = 400;
const height = 300;
        
var video = document.createElement('video')
video.autoplay = true

// Creation of Konva Stage
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

// Creation of Konva Layer
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

//Function to play the video
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
                //call core function
                core = core();
            }, function(error){
                console.log('camera fonctionne pas')
                console.log(error.code)
            }
        );
}

get_video()


