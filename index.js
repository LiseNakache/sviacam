//Creation of the video tag
var video = document.createElement('video');
video.autoplay = true;

// Use of Konva Stage
var stage = new Konva.Stage({
    container: 'container',
    width: 400,
    height: 300
});

var layer = new Konva.Layer();
stage.add(layer);

// Camera WEBCAM
var image = new Konva.Image({
    image: video,
    x: 0,
    y: 0,
    width: 400,
    height: 300
});

layer.add(image);

video.addEventListener('loadedmetadata', function(e) {
    image.width(video.videoWidth);
    image.height(video.videoHeight);
});

var anim = new Konva.Animation(function() {
    // do nothing, animation just need to update the layer
}, layer);

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
            anim.start();
        }, function(error){
            console.log('camera fonctionne pas')
            console.log(error.code)
        }
    );
}

get_video()

//Part linked to the rectangles
var MIN_X = 2
var MIN_Y = 2 
var MAX_WIDTH = 395;
var MIN_WIDTH = 50;
var MAX_HEIGHT = 295;
var MIN_HEIGHT = 50;

// Rectangle Sensor
var rect1 = new Konva.Rect({
    x: stage.width() / 2,
    y: stage.height() / 2,
    width: 50,
    height: 50,
    stroke: 'blue',
    strokeWidth: 1,
    visible: false,
    name: 'rect1',
    draggable: true,
    dragBoundFunc: function(pos) {
        var width = rect1.width() * rect1.scaleX();
        var height = rect1.height() * rect1.scaleY();
        console.log('h', height)
        console.log('w', width)
        var MAX_X = pos.x + width
        var MAX_Y = pos.y + height

        if (pos.x < MIN_X) {
            pos.x = MIN_X;
        }
        if (MAX_X > MAX_WIDTH) {
            pos.x = MAX_WIDTH - width;
        }
        if (pos.y < MIN_Y) {
            pos.y = MIN_Y;
        }
        if (MAX_Y > MAX_HEIGHT) {
            pos.y = MAX_HEIGHT - height;
        }
        return pos;
    }
});


var tr = new Konva.Transformer({
    boundBoxFunc: function(oldBoundBox, newBoundBox) {
    var MAX_X = newBoundBox.x + newBoundBox.width
    var MAX_Y = newBoundBox.y + newBoundBox.height
        
      if (newBoundBox.x < MIN_X) {
        tr.stopTransform();
        newBoundBox.x = MIN_X;
      }
      if (MAX_X > MAX_WIDTH) {
        tr.stopTransform();
        newBoundBox.x = MAX_WIDTH - newBoundBox.width;
      }
      if (newBoundBox.y < MIN_Y) {
        tr.stopTransform();
        newBoundBox.y = MIN_Y;
      }
      if (MAX_Y > MAX_HEIGHT) {
        tr.stopTransform();
        newBoundBox.y = MAX_HEIGHT - newBoundBox.height;
      }

      if (newBoundBox.width > MAX_WIDTH) {
        // tr.stopTransform();
        newBoundBox.width = MAX_WIDTH;
      }
      if (newBoundBox.width < MIN_WIDTH) {
        // tr.stopTransform();
        newBoundBox.width = MIN_WIDTH;
      }
      if (newBoundBox.height > MAX_HEIGHT) {
        // tr.stopTransform();
        newBoundBox.height = MAX_HEIGHT;
      }
      if (newBoundBox.height < MIN_HEIGHT) {
        // tr.stopTransform();
        newBoundBox.height = MIN_HEIGHT;
      }
   
      return newBoundBox;
    }
  });


  rect1.on('mouseenter', function() {
    stage.container().style.cursor = 'move';
  });

  rect1 .on('mouseleave', function() {
    stage.container().style.cursor = 'default';
  });


// rect1.on('transform', function() {
// var width = rect1.width() * rect1.scaleX();
// var height = rect1.height() * rect1.scaleY();
// if (width > MAX_WIDTH) {
    // tr.stopTransform();
//     var scaleX = MAX_WIDTH / rect1.width();
//     rect1.scaleX(scaleX);
// }
// if (width > MIN_WIDTH) {
    // tr.stopTransform();
//     var scaleX = MIN_WIDTH / rect1.width();
//     rect1.scaleX(scaleX);
// }
// if (height > MAX_WIDTH) {
    // tr.stopTransform();
//     var scaleX = MAX_WIDTH / rect1.width();
//     rect1.scaleX(scaleX);
// }
// if (width > MIN_WIDTH) {
    // tr.stopTransform();
//     var scaleX = MIN_WIDTH / rect1.width();
//     rect1.scaleX(scaleX);
// }
// })


// tr.on('transform', function() {
//     var width = rect.width() * rect.scaleX();
//     if (width > 200) {
    //   tr.stopTransform();
//       // reset visible width to 200
//       // so future transform is possible
//       var scaleX = 200 / rect.width();
//       rect.scaleX(scaleX);
//     }
//   });


// Event : button clicked
function toggleCheckboxSensor1() {
   var sensor1 = document.getElementById("sensor1");
   if (sensor1.checked == true){
    layer.add(rect1);
    rect1.show();
    layer.add(tr);
    tr.attachTo(rect1);
    layer.draw();
   } else {
    rect1.hide();
    layer.draw();
   }
}
