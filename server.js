// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  var url_data = req.params.date;
  if(/-/.test(url_data)){
    var date = url_data;
  } else {
    var date = parseInt(url_data);
  }
  var time = new Date(date);
  if(time == 'Invalid Date'){
    res.json({error: 'Invalid Date'})
  }
  else{
    res.json({unix: time.getTime(), utc: time.toUTCString()})
  }
});

app.get("/api/", function (req, res) {
  var time = new Date();
  res.json({unix: time.getTime(), utc: time.toUTCString()})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
