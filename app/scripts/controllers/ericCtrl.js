'use strict';

angular.module('ngtestApp')
  .controller('EricCtrl', ['$scope','$http','$modal', function ($scope, $http,$modal) {

    $scope.meetings = [];
    $scope.tmp = [];
    $scope.testEdit = function(i,e) {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		$scope.resData = {meeting: $scope.meetings[i]};
		$scope.opts = {
		backdrop: true,
		backdropClick: true,
		dialogFade: false,
		keyboard: true,
		size: 'lg',
		templateUrl : 'views/default-control.html',
		controller : ModalInstanceCtrl,
		resolve: {
			items:function() {
				console.log(".." + $scope.resData.title);
				return $scope.resData;
			}
		  }
		}; //opts

		var modalInstance = $modal.open($scope.opts);
		modalInstance.result.then(function(){
			//on ok button press
			$scope.meetings[i] = $scope.resData.meeting;
			//console.log("after: " + JSON.stringify($scope.meetings[i]));
			},function(){
			//on cancel button press
			console.log("Modal Closed");
			});
	}; //testEdit 

	var ModalInstanceCtrl = function($scope, $modalInstance, $http, $modal,items) {
		$scope.items = items;
		$scope.printDT = function(d) {
			$scope.dt = d;
			$http.get('json/data.json').success(function(data) {
				console.log("--> " + JSON.stringify(data));
				data.date = d.toString().substring(0,15);
				$scope.items.meeting.data.push(data);
			});
		}
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();
		$scope.ok = function () {
			$modalInstance.close($scope.items);
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		$scope.setActiveDate = function(d) {
			$scope.acdate = d;
		}
		$scope.deleteActiveDate = function(i) {
			$scope.items.meeting.data.splice(i,1);
		}
		$scope.setActiveTime = function(t) {
			$scope.actime = t;
		}
		$scope.deleteActiveTime = function(i) {
			$scope.items.meeting.data.times.splice(i,1);
		}	
		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			console.log("toggle");
			$scope.status.isopen = !$scope.status.isopen;
		}
		$scope.status = {
			isopen: false
		};

		$scope.toggled = function(open) {
			console.log("Dropdown is now");
		};		
		$scope.isCollapsed = true;
		$scope.toggleCollapsed = function() {
			console.log("toggle collapsed");
			$scope.isCollapsed = !($scope.isCollapsed);
		}
	}   

    $scope.loadJSON = function(def) {
		var jsonurl = 'json/meetings.json';
		if(def)
			jsonurl = 'json/default.json';
		
		$http.get(jsonurl).success(function(data) {
			console.log("json success(" + jsonurl + ")");
			if($scope.meetings.length > 0){
				for(var i=0; i<data.length; i++)
					$scope.meetings.push(data[i]);
			}else
			{
				$scope.meetings = data;
			}
			//$scope.tmp = data;
		});	
    }
    $scope.testAdd = function(def){
      $scope.loadJSON(def);
      //$scope.meetings.push($scope.tmp);
    }
    $scope.testRemove = function(i,e){
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      $scope.meetings.splice(i,1);
    }
  }]) //EricCtrl
  .directive('ericDlg', function() {
    return {
	  restrict: 'E',
	  transclude: true,
      templateUrl: 'views/dk-control.html'
    };
  }); //ericDlg

