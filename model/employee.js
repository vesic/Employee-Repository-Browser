var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    name: String,
    // add few props more
});

module.exports = mongoose.model('Employee', EmployeeSchema);