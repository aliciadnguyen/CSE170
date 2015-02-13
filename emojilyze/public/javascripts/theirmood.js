(function () {
  'use strict';

  angular.module('myApp.controllers').controller('theirmoodCtrl',['$scope','$http',function($scope,$http){
    $http.get('friend.json')
      .then(function(res){
        $scope.friends = res.data;
        //console.log($scope.friends[0].emoji[0].emoji1.imageSRC);
      }); 	
}]);
}());