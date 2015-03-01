(function () {
  'use strict';

  angular.module('myApp.controllers').controller('aboutCtrl',['$scope','$http',function($scope,$http){


      // Pop up button
      $(function () {
        $('[data-toggle="popover"]').popover()
      })

      
  }]);
}());