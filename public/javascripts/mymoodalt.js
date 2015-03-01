(function () {
  'use strict';

  angular.module('myApp.controllers').controller('mymoodaltCtrl',['$scope','mmood',function($scope,mmood){
    

      $scope.results = mmood.mymoods;

      $scope.total = 0;

      $scope.results.forEach(function(d) {
            d.timesUsed = +d.timesUsed;
            $scope.total = $scope.total + d.timesUsed;
            d.enabled = true;                                        // NEW
          });
         
          //function to sort arrays
          var combineCategories = function (data) {
          var res = {};

          data.forEach(function (el) {
            res[el.defaultCategory] = (res[el.defaultCategory]) 
              ? res[el.defaultCategory] += +el.timesUsed 
              : +el.timesUsed;
          });

          return Object.keys(res).map(function (el) {
            return {defaultCategory: el, timesUsed: res[el], enabled: true};  
             });
          }

       

          $scope.result = combineCategories($scope.results);

      console.log($scope.result);
      console.log($scope.total);
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
