(function () {
  'use strict';

  // create the angular app
  angular.module('myApp', ['myApp.controllers',
    'myApp.directives'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('myApp.directives', ['d3']);
  angular.module('myApp.controllers',['ui.bootstrap','ui.router']).config(function($stateProvider, $urlRouterProvider){
    
  	$urlRouterProvider.otherwise('/my-mood');


    $stateProvider

    	.state('mymood', {
            url: '/my-mood',
            templateUrl: 'my-mood.html'
        })
        
        // nested list with custom controller
        .state('theirmood', {
            url: '/their-mood',
            templateUrl: 'their-mood.html',
            
        })
        
        // nested list with just some random string data
        .state('ourmood', {
            url: '/our-mood',
            templateUrl: 'our-mood.html'
        })

        .state('weeklybreakdown', {
            url: '/weekly-breakdown',
            templateUrl: 'weekly-breakdown.html',
            
        });

  });


  
}());