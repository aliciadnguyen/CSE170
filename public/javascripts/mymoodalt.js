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

      $scope.percent1 = ($scope.result[1].timesUsed/$scope.total) * 100;
      $scope.percent2 = ($scope.result[2].timesUsed/$scope.total) * 100;
      $scope.percent3 = ($scope.result[0].timesUsed/$scope.total) * 100;
      $scope.percent4 = ($scope.result[4].timesUsed/$scope.total) * 100;
      $scope.percent5 = ($scope.result[3].timesUsed/$scope.total) * 100;





      $scope.options1 = {
        barColor: '#e99080',
        size: 200,
        lineWidth: 13
      };

      $scope.options2 = {
        barColor: '#264f7b',
        size: 200,
        lineWidth: 13
      };

      $scope.options3 = {
        barColor: '#990e11',
        size: 200,
        lineWidth: 13
      };

      $scope.options4 = {
        barColor: '#F2E96F',
        size: 200,
        lineWidth: 13
      };

      $scope.options5 = {
        barColor: '#ee9201',
        size: 200,
        lineWidth: 13
      };

      // Pop up button
      $(function () {
        $('[data-toggle="popover"]').popover()
      })

      
      // "#990e11","#e99080","#264f7b","#ee9201","#F2E96F"

      // // Easy pie charts
      // var $ppc = $('.progress-pie-chart'),
      // $ppc = $('.progress-pie-chart'),
      //   percent = parseInt($ppc.data('percent')),
      //   deg = 360*percent/100;
      // if (percent > 50) {
      //   $ppc.addClass('gt-50');
      // }
      // $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
      // $('.ppc-percents span').html(percent+'%');
      
  }]);
}());
