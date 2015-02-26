(function () {
  'use strict';

  angular.module('myApp.controllers').controller('ourmoodCtrl',['$scope','$http',function($scope,$http){
    $http.get('friend.json')
      .then(function(res){
        $scope.friends = res.data;
        console.log($scope.friends);
      });
      $scope.myVar = false;

      // Each user's toggle for mood breakdown
      $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
      };
      $scope.toggle2 = function() {
        $scope.myVar2 = !$scope.myVar2;
      };
      $scope.toggle3 = function() {
        $scope.myVar3 = !$scope.myVar3;
      };
      $scope.toggle4 = function() {
        $scope.myVar4 = !$scope.myVar4;
      };
      $scope.toggle5 = function() {
        $scope.myVar5 = !$scope.myVar5;
      };
      $scope.toggle6 = function() {
        $scope.myVar6 = !$scope.myVar6;
      };

      $(function () {
        $('[data-toggle="popover"]').popover()
      })
      
  }]);
}());