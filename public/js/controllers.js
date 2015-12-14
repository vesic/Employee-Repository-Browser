'use strict'

/* global angular */
angular.module('app-controllers', [])
  .controller('EmployeesCtrl', function($http, $stateParams) {
    var self = this;
    $http.get('/api/employees')
      .then(function(res) {
        self.employees = res.data;
      })
  })
  .controller('EmployeeCtrl', function($http, $stateParams) {
    var self = this;
    var id = $stateParams.id;
    
    $http.get('/api/employees/' + id)
      .then(function(res) {
        self.employee = res.data;
        console.log(self.employee);
      })
  })