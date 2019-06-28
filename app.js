const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var robot = require("robotjs");
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (res) => {
  res.sendFile(__dirname + './index.html');
})

// Connection socket.io to receive the key 
// Use robojs to press the key
io.on('connection', function (socket) {
  console.log("socket")
  socket.on('click',function(key){
    //If the type of key is a mouse
    if (key.includes("mouse_")) {
      var mouse = robot.getMousePos()
      if (key == 'mouse_up'){
        robot.moveMouseSmooth(mouse.x, mouse.y - 50);
      } else if (key == 'mouse_down'){
        robot.moveMouseSmooth(mouse.x, mouse.y + 50);
      }else if (key == 'mouse_left'){
        robot.moveMouseSmooth(mouse.x - 50, mouse.y);
      }else if (key == 'mouse_right'){
        robot.moveMouseSmooth(mouse.x + 50, mouse.y);
      }
    //Id the type of key is key press
    } else {
      robot.keyTap(key);
    }
    socket.emit('done', true)
        
  })
})

server.listen(process.env.PORT || 3000)
