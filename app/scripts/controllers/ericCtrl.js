'use strict';

angular.module('ngtestApp')
  .controller('EricCtrl', ['$scope','$http','$modal', '$filter', function ($scope, $http,$modal,$filter) {

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

	var ModalInstanceCtrl = function($scope, $modalInstance, $http, $modal,items, $filter) {
		$scope.items = items;
		$scope.printDT = function(d) {
			$scope.dt = d;
			$http.get('json/data.json').success(function(data) {
				console.log("--> " + JSON.stringify(data));
				data.date = d;
				$scope.items.meeting.data.push(data);
			});
		}
		$scope.changeDt = function(d) {
			$scope.dtdk = $filter('date')(d, "fullDate");
			console.log("changeDt: " + $filter('date')($scope.dt, "fullDate") + " .. " + $scope.dtdk + " .. " + $scope.dt + " .. " + d);
		}
		$scope.today = function() {
			$scope.dt = new Date();
			$scope.dtdk = $filter('date')($scope.dt, "fullDate");
		};
		$scope.today();
		$scope.ok = function () {
			$modalInstance.close($scope.items);
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		$scope.setActiveDate = function(d) {
			//$scope.acdate = d;
			$scope.actimeorig = [];
			$scope.actime = [];
			$scope.actdateorig = d;
			console.log("--> " + JSON.stringify(d));
			$scope.acdate = angular.copy(d);
			console.log("copied date: " + JSON.stringify($scope.acdate) + " .. " + JSON.stringify($scope.actdateorig));
			$scope.$watch('acdate.date', function(newvalue,oldvalue) {
				$scope.showChangeNew1 = 1;
				if(newvalue != $scope.actdateorig.date 
					&& (newvalue.match(/^((Monday)|(Tuesday)|(Wednesday)|(Thursday)|(Friday)|(Sunday))[,][ ]((January)|(February)|(March)|(April)|(May)|(June)|(July)|(August)|(September)|(October)|(November)|(December))[ ][1-3]?[0-9][,][ ][2][0][0-99]{2}$/)))
				{
					$scope.showChangeNew0 = 1;
				}
				else
					$scope.showChangeNew0 = 0;
			});	
		}
		$scope.showChangeNew0 = 0;
		$scope.showChangeNew1 = 0;
		$scope.deleteActiveDate = function(i) {
			$scope.items.meeting.data.splice(i,1);
		}
		$scope.showApplyDate = function(show){
			$scope.isCollapsedDate = !show;
		}
		$scope.applyDateChange = function() {
			$scope.actdateorig.date = $scope.acdate.date;
		}
		$scope.applyDateChangeNew = function(d) {
			console.log("apply new date to old one");
			//$scope.setActiveDate(d);
			$scope.acdate.date = angular.copy(d);
		}
		$scope.setActiveTime = function(t) {
			$scope.actimeorig = t;
			$scope.actime = angular.copy(t);
			//$scope.actime = t;			
			$scope.$watch('actime.stamp', function(newvalue,oldvalue) {
				if(newvalue != $scope.actimeorig.stamp && (newvalue.match(/^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9]{2})$/))) {
					$scope.showApplyTime(true);
				}
				else
					$scope.showApplyTime(false);
			});
		}
		$scope.showApplyTime = function(show){
			$scope.isCollapsedTime = !show;
		}
		$scope.applyTimeChange = function() {
			$scope.actimeorig.stamp = $scope.actime.stamp;

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
		$scope.isCollapsedDate = true;
		$scope.isCollapsedTime = true;
		$scope.toggleCollapsedTime = function() {
			console.log("toggle collapsedTime");
			$scope.isCollapsedTime = !($scope.isCollapsedTime);
		}
		$scope.toggleCollapsedDate = function() {
			console.log("toggle collapsedDate");
			$scope.isCollapsedDate = !($scope.isCollapsedDate);
		}
		$scope.showAlert = function(ev) {
			$mdDialog.show(
			  $mdDialog.alert()
				.title('This is an alert title')
				.content('You can specify some description text in here.')
				.ariaLabel('Password notification')
				.ok('Got it!')
				.targetEvent(ev)
			);
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
  });
  /*
  .directive('watchChange', function() {
    return {
        scope: {
            onchange: '&watchChange'
        },
        link: function(scope, element, attrs) {
            element.on('md-text-float', function() {
                scope.onchange();
            });
        }
    };
});*/

