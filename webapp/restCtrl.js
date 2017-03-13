angular.module('rtrs')

.controller('restCtrl', ['$scope', '$rootScope', '$state', '$mdDialog', 'onboardService', 'deleteRestService', '$http', function($scope,$rootScope,$state,$mdDialog,onboardService,deleteRestService,$http) {
  // var ctrl = this;
  
    let arr=[];

    $scope.tables = [0];
    $scope.restuarant = {};
    $scope.table = [];
    $scope.tableCounter = 0;
    $scope.restuarants = [];

    $rootScope.myTabIndex;

    // -------get list of available restuarants--------
      $http({
            method: 'GET',
            url: '/getRests'

        }).then(function successCallback(response) {
            for (let noOfObjects = 0; noOfObjects < response.data.length; noOfObjects++) {                
                    $scope.restuarants.push(response.data[noOfObjects]);                
            }
            // console.log($scope.restuarants);
            
            // alert('got!!!!!');
        }, function errorCallback(response) {
            console.log('Error occured while fetching all restuarants from db!!!');
        });
   
    
    $rootScope.$on("restdata", function() {
            $scope.restuarants = [];

            $http.get('/getRests')
                .then(function success(response) {
                    for (var noofobj = 0; noofobj < response.data.length; noofobj++) {                       
                            $scope.restuarants.push(response.data[noofobj]);                                              
                    }
                }, function error(response) {
                    console.log("error occored ", response);
                });

        });
    
    $scope.tabChange = function(){
      $rootScope.$emit('restdata', {});
    }
   
    $scope.add = function() {
      
        $scope.tableCounter = $scope.tableCounter + 1;
        $scope.tables.push($scope.tableCounter);
        console.log($scope.tableCounter);
    };

    $scope.remove = function(){

          if($scope.tableCounter !== 0)
          {$scope.tables.pop();
           $scope.tableCounter = $scope.tableCounter - 1;
          }
          // if($scope.tableCounter >= 1)
          // {$scope.tableCounter = $scope.tableCounter + 1;}
          console.log($scope.tableCounter);
        
    }

    $scope.editRest = function(restObj){

      console.log(restObj);
      // let rest = angular.toJson(restObj);
      let rest = restObj;
      $state.go('rest.editRest', {rest});
    }

    $scope.save = function() {

      
              for(let i = 0; i <= $scope.tableCounter; i = i + 1) {                
                  // console.log($scope.table[i].name);
                  // console.log($scope.table[i].capacity);
                  // console.log($scope.table[i].status);
                  // console.log($scope.restuarant);             


                 
                let temp = {};
                
                temp.name = $scope.table[i].name
                
                temp.capacity = $scope.table[i].capacity;
                
                temp.status = $scope.table[i].status;
                
                arr.push(temp);
                // console.log(arr);
              }
              $scope.restuarant.tables = arr;
              console.log($scope.restuarant);

              
              onboardService.addRest($scope.restuarant).then(function success(response){
                alert("restuarant added to db!!!!");
                $scope.restuarant = {};

                $scope.tables = [];
                $scope.table = [];

                $scope.tableCounter = 0;

              },
              function error(error){
                alert("something went wrong while adding restuarant to db!!!!!!");
              });
             
    };

    $scope.showConfirmDel = function(ev,obj){
      var confirm = $mdDialog.confirm()
            .title('Would you like to delete the selected Restuarant?')          
            .targetEvent(ev)
            .ok('YES!')
            .cancel('Not sure, maybe later!');

            $mdDialog.show(confirm).then(function() { //when user clicks on "YES"
                // console.log(object);
                let restName = obj.Name;
                deleteRestService.removeRest(restName).then(function mySucces(response)  {
                            console.log('deleted restuarant!!!!!');
                            $rootScope.$emit('restdata', {});
                    }, function myError(response) {
                            console.log('error in deleting restuarant!!!!!');
                    });
                $mdDialog.hide();
            }, function() { 
                $mdDialog.hide();//Hide the prompt when user clicks CANCEL!
            });
    }

    

}]);


