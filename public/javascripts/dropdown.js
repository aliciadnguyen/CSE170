(function () {
  'use strict';

  angular.module('myApp.controllers').controller('DropdownCtrl',['$scope',function($scope){


  	$scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
  }]);


angular.module('myApp.controllers').controller('defaultSwitch',['$scope',function($scope){
	  $scope.switchAlternate = 'off';
}]);



angular.module('myApp.controllers').controller('customSwitch',['$scope',function($scope){

	  $scope.switchAlternate = 'off';
}]);



angular.module('myApp.controllers').controller('privacySwitch',['$scope',function($scope){

	  $scope.switchAlternate = 'off';
}]);



angular.module('myApp.controllers').controller('SortingCtrl', ['$scope',function($scope){

  var data = $.get('emoji.json');
  var index = 0;

  $(".dropdown-menu").on('click', 'li a', function(){
    $(".categoryBtn:first-child").html($(this).text()+" <span class=\"caret\"></span>");
    $(".categoryBtn:first-child").val($(this).text());

  });

  $scope.submitCategory = function() {
    console.log('Submit clicked');
    console.log($('#customCategory').val());

    //get emoji information
    var emojiArray = data['responseJSON']['emoji'];
    var currEmoji = emojiArray[index];

    //update index
    if(index == emojiArray.length-1) {
      index = 0;
    }
    else {
      index++;
    }
    var newEmoji = emojiArray[index];
    var newImage = newEmoji['imageSRC'];

    //set image to next emoji
    $('#emojiImage').attr( {src: newImage} );

    //clear input field
    $('#customCategory').val("");

  }

}]);



}());

