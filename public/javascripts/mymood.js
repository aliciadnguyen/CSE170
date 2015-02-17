(function () {
  'use strict';

  angular.module('myApp.controllers').controller('mymoodCtrl',['$scope','mmood',function($scope,mmood){
   
    console.log(mmood.mymoods);
    $scope.mymoods = mmood.mymoods;      	
}])




   .factory('mmood',['$http',function($http){

  	var o = {
  		mymoods: []
  	};
  


  	o.getAll = function(){
  		return $http.get('/my-mood').success(function (data){
  			angular.copy(data, o.mymoods);
  		});
  	};

  return o;
  }]);
}());