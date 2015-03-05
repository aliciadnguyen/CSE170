(function () {
  'use strict';

  angular.module('myApp.controllers').controller('aboutCtrl',['$scope','$http',function($scope,$http){
  	  
      // Pop up button
      $(function () {
        $('[data-toggle="popover"]').popover()
      })

      $http.get('weeklybreakdown.json')
      .then(function(res){
        $scope.weeklybreakdown = res.data;
        console.log($scope.weeklybreakdown);
      });
      
  }]);
}());