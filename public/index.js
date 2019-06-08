const socket = io.connect('http://localhost:3000/')

//Creation of the video tag
var points_value = {}

// Use of Konva Stage
var stage = new Konva.Stage({
    container: 'container',
    width: 400,
    height: 300
});

var layer = new Konva.Layer();
stage.add(layer);

// Camera WEBCAM
var imageObj = new Image();
  var webcam = new Konva.Image({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  });


var imageObj = new Image();
imageObj.onload = function() {
    webcam.image(imageObj);
    layer.add(webcam);
    layer.draw()
};


socket.on('image', (data) => {
    //callback function, base64 into an image DOM element
    imageObj.src=`data:image/jpeg;base64,${data}`
})

//Part linked to the rectangles
var MIN_X = 2
var MIN_Y = 2 
var MAX_WIDTH = 395;
var MIN_WIDTH = 50;
var MAX_HEIGHT = 295;
var MIN_HEIGHT = 50;

// Rectangle 
var rect1 = new Konva.Rect({
    x: stage.width() / 2,
    y: stage.height() / 2,
    width: 50,
    height: 50,
    stroke: 'blue',
    strokeWidth:0,
    visible: false,
    name: 'rect1',
    draggable: true,
    dragBoundFunc: function(pos) {
        var width = rect1.width() * rect1.scaleX();
        var height = rect1.height() * rect1.scaleY();
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

        points_value = {
            "x": pos.x,
            "y":pos.y,
            "width":width,
            "height":height
        }

        return pos;
    }
});

// Transformer of rect
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
        newBoundBox.width = MAX_WIDTH;
      }
      if (newBoundBox.width < MIN_WIDTH) {
        newBoundBox.width = MIN_WIDTH;
      }
      if (newBoundBox.height > MAX_HEIGHT) {
        newBoundBox.height = MAX_HEIGHT;
      }
      if (newBoundBox.height < MIN_HEIGHT) {
        newBoundBox.height = MIN_HEIGHT;
      }
      
      points_value = {
          "x": newBoundBox.x,
          "y":newBoundBox.y,
          "width":newBoundBox.width,
          "height":newBoundBox.height
      }
          
      return newBoundBox;
    }
  });

//Type of mouse
rect1.on('mouseenter', function() {
stage.container().style.cursor = 'move';
});

rect1 .on('mouseleave', function() {
stage.container().style.cursor = 'default';
});

//Button sensor1
$('#sensor1').click(function () {
    if ($(this).is(':checked')) {
        $('#select1').removeAttr('disabled');
        layer.add(rect1);
        layer.add(tr);
        tr.attachTo(rect1);
        rect1.show();
        tr.show()
        layer.draw();
    } else {
        $('#select1').attr('disabled', true);
        rect1.hide();
        tr.hide()
        layer.draw();

    }
});


$('#threshold').click(function () {
    if ($(this).is(':checked')) {
        var select_one_val = $( "#select1" ).val();
        // if points_value is empty (not dragged or transformed)
        if (Object.keys(points_value).length === 0 && points_value.constructor === Object) {
            points_value = {
                "x":rect1.x(),
                "y":rect1.y(),
                "width":rect1.width(),
                "height":rect1.height()
            }
        }
        var myJSON = JSON.stringify(points_value); 
        $.ajax({
            method: 'POST',
            url: '/',
            data: {select_one_val,points_value:myJSON },
            dataType: "jsonp",
        })  
    }
});


