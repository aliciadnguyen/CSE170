(function () {
  'use strict';

  angular.module('myApp.controllers').controller('mymoodCtrl',['$scope','$window','$modal','mmood',function($scope,$window,$modal,mmood){
    
    $scope.mymoods = mmood.mymoods;
  $(".mainMoodGraph").click(function(){
    //add your Woopra tracking code for version A's like button click event
    woopra.track("mymood_graph_click");
  })


      var recent; 
      for(var i = 0; i < $scope.mymoods.length; i++) {
        var currEmoji = $scope.mymoods[i];
        if(currEmoji['mostRecent'] == 1) {
          recent = currEmoji;
        }
      }

      $scope.mostRecent = recent;
      $scope.mostRecentName = $scope.mostRecent['name'];

    $scope.open = function (size,name,image,customCategory) {

      $scope.customCategory = customCategory; 
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
          thecustomCategory: function(){
            return $scope.customCategory;
          },
          thearray:  function(){
            return $scope.mymoods;
          },
          theRecentName : function(){
            console.log($scope.mostRecentName);
            return $scope.mostRecentName;
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


    o.updateMostRecent = function (moodsarray,recentName) {
        var oldIndex = findIndex(moodsarray,"name",recentName);
        moodsarray[oldIndex].mostRecent = 0;

        //update old emoji to have mostRecent field as 0
        return $http.put('/my-mood/updateMostRecent',moodsarray[oldIndex])
            .success(function (data) {
              console.log("successful changing mostRecent");
            }).error(function(error){
              console.log("error changing mostRecent");
            });
    }

     o.update = function (moodsarray,emoji) {
        
        //function to find index of emoji in emoji array
        var index = findIndex(moodsarray,"name",emoji);
        moodsarray[index].timesUsed += 1;
        moodsarray[index].mostRecent = 1;

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



  angular.module('myApp.controllers').controller('moodModalCtrl', function ($scope, $modalInstance,thename,theimageSRC,thecustomCategory,mmood,thearray,theRecentName,$window) {

    $scope.name = thename;
    $scope.imageSRC = theimageSRC;
    $scope.customCategory =  thecustomCategory;
    $scope.mymoods = thearray;
    $scope.mostRecentName = theRecentName;

    $scope.theupdate = function (){
      //call the update method inside factory
      mmood.updateMostRecent($scope.mymoods,$scope.mostRecentName);
      $modalInstance.close(mmood.update($scope.mymoods,$scope.name));
      $window.location.reload();
    };

     $scope.cancel = function (name,imageSRC) {
          $modalInstance.dismiss('cancel');
    };
});



  
}());