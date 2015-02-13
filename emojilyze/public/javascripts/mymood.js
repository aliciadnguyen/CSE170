(function () {
  'use strict';

  angular.module('myApp.controllers').controller('mymoodCtrl',['$scope','$http',function($scope,$http){
    $http.get('mymood.json')
      .then(function(res){
        $scope.mymoods = res.data;
        console.log($scope.mymoods);
      }); 	
}]);
}());