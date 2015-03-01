(function () {
  'use strict';

  angular.module('myApp.controllers').controller('mymoodaltCtrl',['$scope','$http',function($scope,$http){
    $http.get('friend.json')
      .then(function(res){
        $scope.friends = res.data;
        console.log($scope.friends);
      });
      $scope.myVar = false;

      // Pop up button
      $(function () {
        $('[data-toggle="popover"]').popover()
      })

      // Easy pie charts
      var $ppc = $('.progress-pie-chart'),
      $ppc = $('.progress-pie-chart'),
        percent = parseInt($ppc.data('percent')),
        deg = 360*percent/100;
      if (percent > 50) {
        $ppc.addClass('gt-50');
      }
      $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
      $('.ppc-percents span').html(percent+'%');
      
  }]);
}());
