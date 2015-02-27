(function () {
  'use strict';

  angular.module('myApp.controllers').controller('theirmoodCtrl',['$scope','$http','$modal','$log',function($scope,$http,$modal,$log){
    
    $http.get('friend.json')
      .then(function(res){
        $scope.friends = res.data;
        console.log($scope.friends[0].emoji[0].emoji1.imageSRC);
      });


    $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      	$log.info('Modal dismissed at: ' + new Date());
    	});
 	};
  }]);





angular.module('myApp.controllers').controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http) {

   $http.get('friend.json')
      .then(function(res){
        $scope.friends = res.data;
        console.log($scope.friends);
      });   
  

  $scope.ok = function(user) {
    $scope.friends.push(user);
    $scope.apply;
    console.log($scope.friends);
    $modalInstance.close($scope.friends);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
}());
