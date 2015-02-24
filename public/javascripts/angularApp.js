(function () {
  'use strict';

  // create the angular app
  angular.module('myApp', ['myApp.controllers',
    'myApp.directives'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('myApp.directives', ['d3']);
  angular.module('myApp.controllers',['ui.bootstrap','ui.router', 'ui.utils']).config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider, $urlRouterProvider,$locationProvider){

  	$urlRouterProvider.otherwise('/my-mood');


    $stateProvider

    	.state('mymood', {
            url: '/my-mood',
            templateUrl: 'my-mood.html',
            controller:'mymoodCtrl',
            resolve:{
              myMoodPromise: ['mmood',function (moods) {
                  return moods.getAll();
            }]
          }
        })
        
       
        .state('about', {
            url: '/about',
            templateUrl: 'about.html',
            
        })

        .state('theirmood', {
            url: '/their-mood',
            templateUrl: 'their-mood.html',
            
        })
      
        .state('ourmood', {
            url: '/our-mood',
            templateUrl: 'our-mood.html',
        })

        .state('setup', {
            url: '/setup',
            templateUrl: 'setup.html',
        })

        .state('weeklybreakdown', {
            url: '/weekly-breakdown',
            templateUrl: 'weekly-breakdown.html',
            
        })

        
        .state('sorting', {
            url: '/sorting',
            templateUrl: 'sorting.html',
            
        });

  }]);


  
}());