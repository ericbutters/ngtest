'use strict';

angular.module('ngtestApp')
  .controller('EricCtrl', ['$scope','$http', function ($scope, $http) {
    var i=0;
    $scope.mytheme = "amber"
    $scope.cnt=1;
    $scope.indexE=1;
    $scope.name = 'Daniel';
    $scope.cnts = [];
    $scope.cnts.push($scope.indexE);
    $http.get('json/meetings.json').success(function(data) {
        $scope.meetings = data;
    });
    $scope.getTheme = function(x) {
      console.log("getTheme: " + x.name);
      if(x.check)
         return "amber";
      else
         return "deep-orange";
    }
    $scope.changeEric = function () {
      if(i){
        $scope.name = 'Daniel';
        i=0;
      }
      else {
        $scope.name = 'Eric';
        i=1;
      }
      console.log("changeEric!" + $scope.name);
    };
   $scope.sayHello = function(){
     console.log("Hello");
   }
   $scope.addEric = function () {
     $scope.indexE++;
     $scope.cnts.push($scope.indexE);
   }
   $scope.removeEric = function () {
     $scope.cnts.pop($scope.indexE);
     $scope.indexE--;
   }
  }])
  .directive('ericDlg', function() {
    return {
//      restrict: 'E',
//      transclude: true,
      
      templateUrl: 'views/dk-control.html'
    };
  });
