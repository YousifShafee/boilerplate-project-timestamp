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
app.get("/api/:date_string", function(req, res) {
  var date_string = req.params.date_string;
  if(isNaN(date_string)) {
    var dateToMillis = Date.parse(date_string);
    var date = new Date(dateToMillis);
  } else {
    var date = new Date(parseInt(date_string));
  }
  if(isNaN(date)) {
    res.json({"error" : "Invalid Date" });
    return;
  }
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

app.get("/api/", function (req, res) {
  var time = new Date();
  res.json({unix: time.getTime(), utc: time.toUTCString()})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
