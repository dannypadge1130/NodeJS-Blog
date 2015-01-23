(function () {

	var app = angular.module("app", []);

	var MainController = function($scope, $http) {
				
		$http.get('/api/blogentries').then(function(response) {
				$scope.entries = response.data;
		});
	};
	
	app.controller("MainController", ["$scope", MainController]);

}());