(function () {
  'use strict';

  angular.module('myApp.controllers').controller('DropdownCtrl',['$scope',function($scope){


  	$scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
  }]);

}());
