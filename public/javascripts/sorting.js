(function () {
  'use strict';


angular.module('myApp.controllers').controller('SortingCtrl', ['$scope', '$http', 'emojiService', function($scope, $http, emojiService){
  $scope.emojiArray = null;

  emojiService.getData().then(function(response) {
      $scope.emojiArray = response.data.emoji;

      var index = 0;
      var categoryArray = [];

      for(var i = 0; i < $scope.emojiArray.length; i++) {
        var currEmoji = $scope.emojiArray[i];
        var category = currEmoji['customCategory'];

        categoryArray[i] = category;
      }

      $scope.list = categoryArray;  
      $scope.initial = categoryArray[0];
      $(".categoryBtn:first-child").val($scope.initial);
  });


  $(".dropdown-menu").on('click', 'li a', function(){
    $(".categoryBtn:first-child").html($(this).text()+" <span class=\"caret\"></span>");
    $(".categoryBtn:first-child").val($(this).text());

  });

  var index = 0;

  $scope.submitCategory = function() {
    console.log('Submit clicked');
    console.log($('#customCategory').val());

    var custom = $('#customCategory').val();

    //update current emoji category
    if(!custom.replace(/^\s+/g, '').length) {
      $scope.emojiArray[index]['customCategory'] = $(".categoryBtn:first-child").val();
    }
    else {
      $scope.emojiArray[index]['customCategory'] = custom;
      $scope.list.push(custom);
    }

    //update index
    if(index == $scope.emojiArray.length-1) {
      index = 0;
    }
    else {
      index++;
    }

    var newEmoji = $scope.emojiArray[index];
    var newImage = newEmoji['imageSRC'];

    //set image to next emoji
    $('#emojiImage').attr( {src: newImage} );

    //clear input field
    $('#customCategory').val("");

    $(".categoryBtn:first-child").html(newEmoji['customCategory']+" <span class=\"caret\"></span>");
    $(".categoryBtn:first-child").val(newEmoji['customCategory']);

  }

}])


.factory('emojiService', function($http) {
    return {
      getData : function() {
        return $http.get('emoji.json');
      }
    };
});

}());