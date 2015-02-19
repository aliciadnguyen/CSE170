(function () {
  'use strict';

  angular.module('myApp.controllers').controller('ourmoodCtrl',['$scope','$http',function($scope,$http){
    $http.get('friend.json')
      .then(function(res){
        $scope.friends = res.data;
        console.log($scope.friends);
      });
      $scope.myVar = false;
      $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
      };
  }]);
}());