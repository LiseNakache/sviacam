// Test avec plusieurs rectangles

var points_value = []

var details = [
  {
    "name" : "rect1",
    "color" : "blue",
    "division_x": 8,
    "division_y": 5
  }, 
  {
    "name" : "rect2",
    "color" : "red",
    "division_x": 1.3,
    "division_y": 5
  },
]

//Part linked to the rectangles
var MIN_X = 2
var MIN_Y = 2 
var MAX_WIDTH = 395;
var MIN_WIDTH = 50;
var MAX_HEIGHT = 295;
var MIN_HEIGHT = 50;

for (var i = 0; i < details.length; i++){
  var name = details[i].name
  var color =  details[i].color
  var division_x = details[i].division_x
  var division_y = details[i].division_y
  var name_tr = name + "_tr"


  //New Rectangle
  this[name] = new Konva.Rect({
    x: stage.width() / division_x,
    y: stage.height() / division_y,
    width: 30,
    height: 30,
    stroke: color,
    strokeWidth:0,
    visible: false,
    id: i,
    draggable: true,
    dragBoundFunc: function(pos) {
        var width = rect.width() * rect.scaleX();
        var height = rect.height() * rect.scaleY();
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

        var pts = {
            "x": pos.x,
            "y":pos.y,
            "width":width,
            "height":height,
            "rect":rect
        }

        check_points(pts, rect);
        
        return pos;
    }
  })


  // Transformer of rect
  this[name_tr] = new Konva.Transformer({
    borderStroke : color,
    anchorStroke: color,
    boundBoxFunc: function(oldBoundBox, newBoundBox) {
    var MAX_X = newBoundBox.x + newBoundBox.width
    var MAX_Y = newBoundBox.y + newBoundBox.height
      
    if (newBoundBox.x < MIN_X) {
      rect_tr.stopTransform();
      newBoundBox.x = MIN_X;
    }
    if (MAX_X > MAX_WIDTH) {
      rect_tr.stopTransform();
      newBoundBox.x = MAX_WIDTH - newBoundBox.width;
    }
    if (newBoundBox.y < MIN_Y) {
      rect_tr.stopTransform();
      newBoundBox.y = MIN_Y;
    }
    if (MAX_Y > MAX_HEIGHT) {
      rect_tr.stopTransform();
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
    
    var pts = {
      "x": newBoundBox.x,
      "y":newBoundBox.y,
      "width":newBoundBox.width,
      "height":newBoundBox.height
    }

    check_points(pts,rect);
        
    return newBoundBox;
  }
});

var rect = this[name]
var rect_tr = this[name_tr]

    // Type of mouse
    rect.on('mouseenter', function() {
    stage.container().style.cursor = 'move';
    });
    
    rect.on('mouseleave', function() {
    stage.container().style.cursor = 'default';
    });

    
}

//Button sensor
$("#rect1").click(function () {
    if ($(this).is(':checked')) {
        $("#select_rect1").removeAttr('disabled');
        // console.log(rect1)
        layer.add(rect1);
        layer.add(rect1_tr);
        rect1_tr.attachTo(rect1);
        rect1.show();
        rect1_tr.show()
        layer.draw();
    } else {
        $("#select_rect1").attr('disabled', true);
        rect1.hide();
        rect1_tr.hide()
        layer.draw();
    }
})

$("#rect2").click(function () {
    if ($(this).is(':checked')) {
        $("#select_rect2").removeAttr('disabled');
        // console.log(rect2)
        layer.add(rect2);
        layer.add(rect2_tr);
        rect2_tr.attachTo(rect2);
        rect2.show();
        rect2_tr.show()
        layer.draw();
    } else {
        $("#select_rect2").attr('disabled', true);
        rect2.hide();
        rect2_tr.hide()
        layer.draw();
    }
})



// $('#threshold').click(function () {
//     if ($(this).is(':checked')) {
//         console.log('points_value', points_value)
//         // Checked but not moved
//         if ($("#rect1").is(':checked') && !points_value[0]){
//             points_value[0] = { "x":rect1.x(),
//                                 "y":rect1.y(),
//                                 "width":rect1.width(),
//                                 "height":rect1.height(),
//                                 "val_choice": $("#select_rect1" ).val()
//                             }

//         } else if ($("#rect2").is(':checked') && !points_value[1]) {
//             points_value[1] = { "x":rect2.x(),
//                                 "y":rect2.y(),
//                                 "width":rect2.width(),
//                                 "height":rect2.height(),
//                                 "val_choice": $("#select_rect2" ).val()
//                             }
//         } else if {
//             points_value[0].val_choice = $("#select_rect1" ).val()
//             points_value[1].val_choice = $("#select_rect2" ).val()
//         }

//         var select_one_val = $( "#select1" ).val();
//         // if points_value is empty (not dragged or transformed)
//         if (Object.keys(points_value).length === 0 && points_value.constructor === Object) {
//             points_value = {
//                 "x":rect.x(),
//                 "y":rect.y(),
//                 "width":rect.width(),
//                 "height":rect.height()
//             }
//         }
//         var myJSON = JSON.stringify(points_value); 
//         console.log("points_value", points_value )
//         $.ajax({
//             method: 'POST',
//             url: '/',
//             data: {select_one_val,points_value:myJSON },
//             dataType: "jsonp",
//         })  
//     }
// });


function check_points(pts, rect){
    if (!rect.parent) {
        points_value[0] = pts
    } else {
        points_value[1] = pts
    }
    console.log('points_value', points_value)
}