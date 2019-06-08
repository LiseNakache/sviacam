//OpenCv read from the webcam and emit it to the wire 
const cv = require('opencv4nodejs')
//Create an express server
const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
var ks = require('node-key-sender');
const uuid = require('uuid/v4')
const app = express()
const server = require('http').Server(app)
//In order to update the image
const io = require('socket.io')(server)

// video capture object, with the id of the webcam : 0 = face cam
const wCap = new cv.VideoCapture(0)
// robot.typeString("Hello World");
// robot.keyTap("enter");


app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/', (res) => {
  res.sendFile(__dirname + './index.html');
})


//public broadcast, send image data
//every second, the server is publishing the image event
//every second we need to read from the opencv object and send it over socket.io
setInterval(() => {
  //read the image from VideoCapture device, return a Math object
  const frame = wCap.read(function(err, im){
    if (err) throw err;
  })
  const strWebcam =  cv.imencode('.jpg', frame).toString('base64')
  io.emit('image',strWebcam);
}, 50)

// setInterval(() => {
//   ks.sendKey('space').then(
//     function(stdout, stderr) {
//         console.log('success')
//     },        
//     function(error, stdout, stderr) {
//       console.log('error')
//     }
// );
// }, 2000)

app.post('/', function (req, res) {
  var sess = req.session
  sess.userId = req.sessionID
  sess.choice = req.body.select_one_val
  sess.points = req.body.points_value
  console.log('session', sess);
});


server.listen(process.env.PORT || 3000)
