(function () {
  'use strict';

  angular.module('myApp.controllers').controller('DropdownCtrl',['$scope',function($scope){


  	$scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
  }]);


angular.module('myApp.controllers').controller('defaultSwitch',['$scope',function($scope){
	  $scope.switchAlternate = 'off';
}]);



angular.module('myApp.controllers').controller('customSwitch',['$scope',function($scope){

	  $scope.switchAlternate = 'off';
}]);



angular.module('myApp.controllers').controller('privacySwitch',['$scope',function($scope){

	  $scope.switchAlternate = 'off';
}]);


}());

