angular.module('rtrs')

.controller('editRestCtrl', ['$scope', '$state', '$stateParams', 'updateRestService', function($scope,$state,$stateParams,updateRestService){

	 $scope.restuarant = $stateParams.rest;

	 $scope.update = function(){
	 	console.log("updated rest:");

	 	console.log($scope.restuarant);

	 	updateRestService.updateRest($scope.restuarant).then(function mySucces(response)  {
                            console.log('Updated restuarant!!!!!');
                            $state.go('rest');
                    }, function myError(response) {
                            console.log('error in deleting restuarant!!!!!');
                    });


	 }

	
	
}]);