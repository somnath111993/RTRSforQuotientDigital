var myApp = angular.module('rtrs',['ngMaterial',
'ngMdIcons',
'ui.router',
'ngMessages',
'ngAnimate']);

myApp.config(function($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
			.state("index",{
				url:"/",
				templateUrl: 'index.html'
				
			})
			.state("rest",{
				url:"/rest",
				templateUrl: 'rest.html',
				controller:"restCtrl",
				controllerAs:"vm"
				
			})
			.state("rest.editRest",{
				url:"/editRestuarant",
				params: {rest:null},
				templateUrl: 'editRest.html',
				controller:"editRestCtrl",
				controllerAs:"vm"
				
			})
			.state("cust",{
				url:"/cust",
				templateUrl: 'cust.html',
				controller:"custCtrl",
				controllerAs:"vm"
				
			});
			
});