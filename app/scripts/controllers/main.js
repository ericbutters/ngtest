'use strict';

/**
 * @ngdoc function
 * @name ngtestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngtestApp
 */
angular.module('ngtestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
