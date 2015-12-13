var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require("morgan");
var mongoose = require("mongoose");
var config = require("./config");
var Employee = require("./model/employee");


mongoose.connect(config.connection_string)
var connection = mongoose.connection;

connection
  .on('error', function() {
    console.log('db connection fail');
  })
  .on('open', function() {
    console.log('db connection success');
  })
  
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (app.get('env') == 'development') {
  app.use(logger('dev'));
}

var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: 'success'
  });
});

router.route('/employees')
  // post employee
  .post(function(req, res) {
    var employee = new Employee();
    employee.name = req.body.name;
    employee.save(function(err) {
      if (err) {
        res.send(err);
      }
      
      res.json({ message: 'Employee created!' });
    });
  })
  .get(function(req, res) {
    Employee.find(function(err, employees) {
      if (err) {
        res.send(err);
      }
      
      res.send(employees);
    })
  })
  
app.use('/api', router);

app.listen(port, function(err) {
  if (err) {
    // handle error
  }
  console.log('Listening at %d', port);
});
