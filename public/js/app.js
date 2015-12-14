'use strict'

/* global angular */
angular.module('app', ['ui.router', 'app-controllers'])
  .run(function() {
    console.clear();
  })
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/employees");
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('employees', {
        url: "/employees",
        templateUrl: "partials/employees.html",
        controller: 'EmployeesCtrl'
      })
      .state('employee', {
        url: "/employees/:id",
        templateUrl: "partials/employee.html",
        controller: 'EmployeeCtrl'
      })
    });