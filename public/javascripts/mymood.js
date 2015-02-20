(function () {
  'use strict';

  angular.module('myApp.controllers').controller('mymoodCtrl',['$scope','mmood',function($scope,mmood){
    
    $scope.mymoods = mmood.mymoods;
    //console.log($scope.mymoods);



    $scope.theupdate = function (name){
      
      //call the update method inside factory
      mmood.update($scope.mymoods,name);
    }
}])




   .factory('mmood',['$http',function($http){

  	var o = {
  		mymoods: []
  	};
  

    function findIndex(array,key,value){
        for(var i = 0; i < array.length; i++){
          if(array[i][key] == value)
            return i;
        }
      }



  	o.getAll = function(){
  		return $http.get('/my-mood').success(function (data){
        //console.log(data);
  			angular.copy(data, o.mymoods);
  		});
  	};



     o.update = function (moodsarray,emoji) {
        console.log(emoji);
        console.log(moodsarray);

        var index = findIndex(moodsarray,"name",emoji);
        console.log(moodsarray[index].timesUsed);
        moodsarray[index].timesUsed += 1;
        console.log(moodsarray[index].timesUsed);
        //moodsarray[index][timesUsed];
        //console.log(moodsarray[index]); 

        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/my-mood/update',moodsarray[index])
            .success(function (data) {
              console.log("successful add");
              
               
            }).error(function(error){
              console.log("error adding");
            });
    };

  return o;
  }])
  
}());