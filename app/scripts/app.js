'use strict';

/**
 * @ngdoc overview
 * @name ngtestApp
 * @description
 * # ngtestApp
 *
 * Main module of the application.
 */
angular
  .module('ngtestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngMaterial'
  ])
  .directive('dkControl', function() {
    return {
      transclude: true,
      templateUrl: 'views/dk-control.html'
    };
  })
  .directive('myTabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope) {
      var panes = $scope.panes = [];

      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };

      this.addPane = function(pane) {
        if (panes.length === 0) {
          $scope.select(pane);
        }
        panes.push(pane);
      };
    },
    templateUrl: 'views/my-tabs.html'
  };
  })
  .directive('myPane', function() {
  return {
    require: '^myTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
    },
    templateUrl: 'views/my-pane.html'
  };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/eric', {
        templateUrl: 'views/eric.html',
        controller: 'EricCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
