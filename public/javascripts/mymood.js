(function () {
  'use strict';

  angular.module('myApp.controllers').controller('mymoodCtrl',['$scope','$window','$modal','mmood',function($scope,$window,$modal,mmood){
    
    $scope.mymoods = mmood.mymoods;
    
  


    $scope.open = function (size,name,image,defaultCategory) {

      $scope.defaultCategory = defaultCategory; 
      $scope.name = name;
      $scope.imageSRC = image;
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'moodModalCtrl',
      size: size,
      resolve: {
          thename: function(){
            return $scope.name;
          },
          theimageSRC: function(){
            return $scope.imageSRC;
          },
          thedefaultCategory: function(){
            return $scope.defaultCategory;
          },
          thearray:  function(){
            return $scope.mymoods;
          }
      }
     });
  };

}])




   .factory('mmood',['$http','$window',function($http,$window){

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
        
        //function to find index of emoji in emoji array
        var index = findIndex(moodsarray,"name",emoji);
        moodsarray[index].timesUsed += 1;
        

        //use the express route for this post's id to add an upvote to it in the mongo model
        return $http.put('/my-mood/update',moodsarray[index])
            .success(function (data) {
              console.log("successful add");
            }).error(function(error){
              console.log("error adding");
            });
    };

  return o;
  }]);



  angular.module('myApp.controllers').controller('moodModalCtrl', function ($scope, $modalInstance,thename,theimageSRC,thedefaultCategory,mmood,thearray,$window) {

    $scope.name = thename;
    $scope.imageSRC = theimageSRC;
    $scope.defaultCategory =  thedefaultCategory;
    $scope.mymoods = thearray;
    

    $scope.theupdate = function (){
      //call the update method inside factory
      $modalInstance.close(mmood.update($scope.mymoods,$scope.name));
      $window.location.reload();
    };

     $scope.cancel = function (name,imageSRC) {
          $modalInstance.dismiss('cancel');
    };
});



  
}());