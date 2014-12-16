'use strict';

/**
 * @ngdoc function
 * @name ngtestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngtestApp
 */
angular.module('ngtestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
