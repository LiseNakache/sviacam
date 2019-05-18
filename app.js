const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const app = express()

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

app.get('/', (req, res) => {
  response.sendFile(__dirname + './index.html');
})

app.post('/', function (req, res) {
  var sess = req.session
  sess.userId = req.sessionID
  sess.choice = req.body.select_one_val
  sess.points = req.body.points_value
  console.log('session', sess);
});


app.listen(process.env.PORT || 3000)