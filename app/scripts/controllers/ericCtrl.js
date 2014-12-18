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
        /**/
        
    });
    $scope.getPercent = function(data) {
      console.log("getPercent: " + data.users[0].name + "NUM-USERS: " + data.users.length);
      var numUsers = data.users.length;
      var numTimes = data.times.length;
      var pcent = [];
      for(var j=0; j<numTimes; j++) {
        var numTrues = 0;
        var hex = parseInt(data.times[j].check);
        for(var i=0; i<numUsers; i++) {
        var state = (hex >> data.users[i].id*8) & 0xff;
          switch(state) {
            case 0x00: //FALSE
              break;
             case 0x01: //TRUE
              numTrues++;
              break;
             case 0x10: //MAYBE
              break;
             case 0x11: //DEFAULT (unclicked)
              break;
             default:
              console.log("STATE: UNKNOWN");
              break;
          }//switch
        }//for users
        pcent.push((100/numUsers)*numTrues);
      }//for times
      var cnt100 = 0;
      for(var i=0; i<pcent.length; i++) {
        if(pcent[i] == 100)
          cnt100++;
      }
      return (cnt100)?"100% (" + cnt100.toString() + ")":"0% (0)";
    }
    $scope.getTheme = function(check,user) {
      var hex = parseInt(check);
      var state = (hex >> user.id*8) & 0xff;
      switch(state) {
        case 0x00: /*FALSE*/
          return "red";
         case 0x01: /*TRUE*/
          return "green";
         case 0x10: /*MAYBE*/
          return "amber";
         case 0x11: /*DEFAULT (unclicked)*/
          return "grey";
         default:
          console.log("STATE: UNKNOWN");
          break;
      }
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
