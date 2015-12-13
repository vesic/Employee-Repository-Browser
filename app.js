var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require("morgan");

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (app.get('env') == 'development') {
  app.use(logger('dev'));
}

var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: 'Success'
  });
});

app.use('/api', router);

app.listen(port, function(err) {
  if (err) {
    // handle error
  }
  console.log('Listening at %d', port);
});