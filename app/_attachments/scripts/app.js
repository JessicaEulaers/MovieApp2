'use strict'



angular.module('MovieApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        });
	})
	
	.controller('homeCtrl', function($scope, imdbSrv, couchSrv, saveSrv) {
		
	    	$('#searchButton').on('click', function (e) {

	    		$scope.movies = '';

	    		var actor = $('#actorText').val();
	    		
	    		if(imdbSrv.getmovies(actor) == couchSrv.getcouch(actor)){
	    			
    				$scope.movies = couchSrv.getcouch(actor);
	    			});
	    		}
	    		else {
	    			$scope.movies = imdbSrv.getmovies(actor)
	    			$.ajax({
				type: 			'PUT',
				url: 			'http://127.0.0.1:5984/movies_actors' + /actor,
				data:			json,
				contentType: 	'application/json',
				async:			true,
				success: 		function(actor){
								console.log(actor);
								buildOutput(actor)
								
				},
				error: 			function(XMLHttpRequest, textStatus, errorThrown){
								console.log(errorThrown);
				}
	    		}
	    		
	    	});
    })
   
    .service('imdbSrv', function($http, $q) {
    		this.getmovies = function(actor) {
	    		var q = $q.defer();
	    		var url = ' http://theimdbapi.org/api/find/person?name=' + actor;

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    })
    
    .service('couchSrv', function($http, $q) {
    		this.getcouch = function(actor) {
	    		var q = $q.defer();
	    		var url = 'http://127.0.0.1:5984/movies_actors'+/actor;

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    })
    
    .service('saveSrv', function($window, $http){
		  this.setObject = function(key, value){
			  $window.localStorage[key] = JSON.stringify(value);
			 	
			})
		  this.getObject = function(key){
			  return JSON.parse($window.localStorage[key] || '{}');
		  };
	});