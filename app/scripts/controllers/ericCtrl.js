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
			},function(){
			//on cancel button press
			console.log("Modal Closed");
			});
	}; //testEdit 

	var ModalInstanceCtrl = function($scope, $modalInstance, $modal, items) {
		$scope.items = items;
		$scope.ok = function () {
			$modalInstance.close($scope.items);
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
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

