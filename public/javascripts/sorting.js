(function () {
  'use strict';


angular.module('myApp.controllers').controller('SortingCtrl', ['$scope', '$http', '$window', 'emojiService', function($scope, $http, $window, emojiService){
  $scope.emojiArray = null;
  $scope.index = 0;
  emojiService.getData().then(function(response) {
      $scope.emojiArray = response.data;

      var defaultArray = [];
      var categoryArray = [];

      for(var i = 0; i < $scope.emojiArray.length; i++) {
        var currEmoji = $scope.emojiArray[i];
        var category = currEmoji['defaultCategory'];

        defaultArray[i] = category;
      }

      for(var i = 0; i < $scope.emojiArray.length; i++) {
        var currEmoji = $scope.emojiArray[i];
        var category = currEmoji['customCategory'];
        if(defaultArray.indexOf(category) == -1) {
          categoryArray.push(category);
        }
      }

      $scope.list = $.merge(defaultArray, categoryArray);  
      $scope.initial = $scope.emojiArray[0]['customCategory'];
      $scope.initialSrc = $scope.emojiArray[0]['imageSRC'];
      $(".categoryBtn:first-child").val($scope.initial);
  });


  $(".dropdown-menu").on('click', 'li a', function(){
    $(".categoryBtn:first-child").html($(this).text()+" <span class=\"caret\"></span>");
    $(".categoryBtn:first-child").val($(this).text());

  });

  // $scope.updateDropdownList = function() {
  //   var categoryArray = [];

  //   for(var i = 0; i < $scope.emojiArray.length; i++) {
  //     var currEmoji = $scope.emojiArray[i];
  //     var category = currEmoji['customCategory'];

  //     categoryArray[i] = category;
  //   }

  //   $scope.list = categoryArray;
  //   var ul = $('.dropdown-menu');
  //   ul.html('<li ng-repeat="category in list | unique: \'category\'"><a ng-click="$parent.current = category">{{category}}</a></li>');
  // };

  $scope.submitCategory = function() {

    // console.log('Submit clicked');
    // console.log($('#customCategory').val());
    $scope.name = $scope.emojiArray[$scope.index]['name'];

     $scope.custom = $('#customCategory').val();

    // //update current emoji category
    if(!$scope.custom.replace(/^\s+/g, '').length) {
      $scope.customCategory = $(".categoryBtn:first-child").val();
    }
    else {
      $scope.customCategory = $scope.custom;
    }

    //update index
    if($scope.index == $scope.emojiArray.length-1) {
      $scope.index = 0;
    }
    else {
      $scope.index++;
    }

     var newEmoji = $scope.emojiArray[$scope.index];
     var newImage = newEmoji['imageSRC'];

    // //set image to next emoji
     $('#emojiImage').attr( {src: newImage} );

    // //clear input field
    $('#customCategory').val("");

    $(".categoryBtn:first-child").html(newEmoji['customCategory']+" <span class=\"caret\"></span>");
    $(".categoryBtn:first-child").val(newEmoji['customCategory']);

    // update emoji
    emojiService.update($scope.emojiArray, $scope.name, $scope.customCategory);
    $scope.list.push($scope.custom);
    //$window.location.reload();
  };

}])


.factory('emojiService', ['$http', function($http) {

  var o = {
    emojiArray: []
  }

  function findIndex(array,key,value) {
    for(var i = 0; i < array.length; i++){
          if(array[i][key] == value)
            return i;
        }
  }

  o.getData = function() {
    return $http.get('/sorting').success(function(data) {
      angular.copy(data, o.emojiArray);
    });
  };


  o.update = function(emojiArray, emoji, newCategory) {
    //find index of emoji in emoji array
    var index = findIndex(emojiArray, "name", emoji);
    emojiArray[index].customCategory = newCategory;

   //use the express route for this post's id to change its customCategory in the mongo model
    return $http.put('/sorting/update',emojiArray[index])
      .success(function (data) {
        console.log("successful add");
      }).error(function(error){
        console.log("error adding");
      });   
  };

  return o;

}]);

}());