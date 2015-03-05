(function () {
  'use strict';

  angular.module('myApp.controllers').controller('wbCtrl',['$scope','$http',function($scope,$http){
    $http.get('weeklybreakdown.json')
      .then(function(res){
        $scope.weeklybreakdown = res.data;
        console.log($scope.weeklybreakdown);
      });
      
  }]);
}());