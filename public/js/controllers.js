'use strict'

/* global angular */
angular.module('app-controllers', [])
  .controller('EmployeeCtrl', function($http) {
    var self = this;
    self.foo = 'Hola mundo';
    $http.get('/api/employees')
      .then(function(res) {
        self.employees = res.data;
      })
  })