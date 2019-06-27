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

io.on('connection', function (socket) {
  console.log("socket")
  socket.on('click',function(key){
          console.log(key)
          robot.keyTap(key);
          // socket.emit('done', true)
  })
})

server.listen(process.env.PORT || 3000)
