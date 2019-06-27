//Test avec OpenCV : Webcam gérée par le serveur

//OpenCv read from the webcam and emit it to the wire 
const cv = require('opencv4nodejs')
const session = require('express-session');
const uuid = require('uuid/v4')
const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//  video capture object, with the id of the webcam : 0 = face cam
const wCap = new cv.VideoCapture(0)

//public broadcast, send image data
//every second, the server is publishing the image event
//every second we need to read from the opencv object and send it over socket.io
setInterval(() => {
//   //read the image from VideoCapture device, return a Math object
  const frame = wCap.read(function(err, im){
    if (err) throw err;
  })
  const strWebcam =  cv.imencode('.jpg', frame).toString('base64')
  io.emit('image',strWebcam); 
}, 50)

app.post('/', function (req, res) {
  var sess = req.session
  sess.userId = req.sessionID
  sess.choice = req.body.select_one_val
  sess.points = req.body.points_value
  console.log('session', sess);
});

server.listen(process.env.PORT || 3000)

// Coté Client
socket.on('image', (data) => {
    //callback function, base64 into an image DOM element
    const oldImg = new Image(imageObj.width, imageObj.height)
    oldImg.src = imageObj.src 
    imageObj.src=`data:image/jpeg;base64,${data}`
			var vals = imageCompare.compare(imageObj, oldImg, imageObj.width, imageObj.height);
      console.log(vals)
})