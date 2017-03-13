angular.module('rtrs')

.controller('custCtrl', ['$scope', '$rootScope', '$state', '$http', 'searchFactory', 'reviewService', function($scope,$rootScope,$state,$http,searchFactory,reviewService) {

  $scope.searchName = '';
  $scope.searchLocation = '';
  $scope.searchCuisine = '';
  $scope.availRests = [];
  $scope.review = {};
  


  
  $http({
            method: 'GET',
            url: '/getRests'

        }).then(function successCallback(response) {
            for (let noOfObjects = 0; noOfObjects < response.data.length; noOfObjects++) {                
                    $scope.availRests.push(response.data[noOfObjects]);                
            }
            // console.log($scope.restuarants);
            
            // alert('got!!!!!');
        }, function errorCallback(response) {
            console.log('Error occured while fetching all restuarants from db!!!');
        });



  $scope.search = function(by){
    console.log(by);

    if(by=="name"){
      if($scope.searchName != ''){
        $scope.restuarants = [];
        // alert("by name");
        searchFactory.byName($scope.searchName).then(function successCallback(response) {
            for (let noOfObjects = 0; noOfObjects < response.data.length; noOfObjects++) {                
                    $scope.restuarants.push(response.data[noOfObjects]);                
            }
            // console.log($scope.restuarants);
            
            // alert('got!!!!!');
        }, function errorCallback(response) {
            console.log('Error occured while fetching all restuarants from db!!!');
        });

      }
      else{alert("please fill the search field!!!")}
      
    }

    if(by=="location"){
      if($scope.searchLocation != ''){
        $scope.restuarants = [];
        // alert("by name");
        searchFactory.byLocation($scope.searchLocation).then(function successCallback(response) {
            for (let noOfObjects = 0; noOfObjects < response.data.length; noOfObjects++) {                
                    $scope.restuarants.push(response.data[noOfObjects]);                
            }
            // console.log($scope.restuarants);
            
            // alert('got!!!!!');
        }, function errorCallback(response) {
            console.log('Error occured while fetching all restuarants from db!!!');
        });

      }
      else{alert("please fill the search field!!!")}
      
    }

    if(by=="cuisine"){
      if($scope.searchCuisine != ''){
        $scope.restuarants = [];
        // alert("by name");
        searchFactory.byCuisine($scope.searchCuisine).then(function successCallback(response) {
            for (let noOfObjects = 0; noOfObjects < response.data.length; noOfObjects++) {                
                    $scope.restuarants.push(response.data[noOfObjects]);                
            }
            // console.log($scope.restuarants);
            
            // alert('got!!!!!');
        }, function errorCallback(response) {
            console.log('Error occured while fetching all restuarants from db!!!');
        });

      }
      else{alert("please fill the search field!!!")}
      
    }
  }

  $scope.getTables = function(rest,capacity){
    console.log(rest);
    console.log(capacity);
    $scope.availTables = [];

    for (var record = 0; record < rest.Tables.length; record++) {
        console.log(rest.Tables[record]);
        if(rest.Tables[record].capacity == capacity && rest.Tables[record].status == 'available'){
                  $scope.availTables.push(rest.Tables[record]);

        }
    }
                    
    console.log($scope.availTables);
  }

  $scope.postReview = function(){
    // console.log($scope.review.comment);
    // console.log($scope.reviewRest.Name);
    // console.log($scope.reviewRest.Location);

    $scope.review.restName = $scope.reviewRest.Name;
    $scope.review.restLocation = $scope.reviewRest.Location;

    console.log($scope.review);

    reviewService.postReview($scope.review).then(function success(response){
                alert("Comments posted to db!!!!");
                $scope.reviewRest = '';
                $scope.review = {};
              },
              function error(error){
                alert("something went wrong while posting review !!!!!!");
              });
  }





  



}]);
  
