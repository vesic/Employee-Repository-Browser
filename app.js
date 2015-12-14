var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require("morgan");
var mongoose = require("mongoose");
var _ = require("underscore");
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

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

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
  
router.route('/employees/:id')
  .get(function(req, res) {
    var id = req.params.id;
    Employee.findById(id, function(err, employee) {
      if (err) {
        res.send(err);
      }
      res.send(employee);
    })
  })
  .put(function(req, res) {
    var id = req.params.id;
    Employee.findById(id, function(err, employee) {
      if (err) {
        res.send(err);
      }
      employee.name = req.body.name;
      employee.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Employee updated!' });
      })
    })
  })
  .delete(function(req, res) {
    var id = req.params.id;
    Employee.remove({
      _id: id
    }, function(err, employee) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Employee deleted!'})
    })
  })
  
app.use('/api', router);
app.get('/', function(req, res) {
  res.render('index', {
    now: new Date().toDateString(),
    title: 'Employee Repository Browser',
    msg: "Hello, Employees!"
  })
});

app.listen(port, function(err) {
  if (err) {
    // handle error
  }
  console.log('Listening at %d', port);
});
