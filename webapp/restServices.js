angular.module('rtrs')
    .factory('onboardService', function($http) {
    	return {
            addRest: function(rest) {
            	console.log(rest);
                // let restObj = {
                //     name: rest.name
                // };
                return $http({
                    method: 'POST',
                    url: '/onboard',
                    data: rest,
                    cache: false
                }).then(function mySucces(response)  {
                    console.log('Succes onboardservice!!!!');
                }, function myError(response) {
                    console.log('error in adding restuarant');
                });
            }
        };

    })
    .factory('updateRestService', function($http) {
        return {
            updateRest: function(rest) {
                console.log(rest);
                let restName = rest.Name;
                return $http({
                    method: 'PATCH',
                    url: '/update/'+ restName,
                    data: rest,
                    cache: false
                }).then(function mySucces(response)  {
                    console.log('Succes updateservice!!!!!');
                }, function myError(response) {
                    console.log('error in updating restuarant');
                });
            }
        };

    })
    .factory('deleteRestService', function($http) {
        return {
            removeRest: function(name) {
                return $http({
                    method: 'DELETE',
                    url: '/remove/' + name
                }).then(function mySucces(response)  {
                    console.log('Succes deleteservice!!!!');
                }, function myError(response) {
                    console.log('error in deleting Restuarant');
                });
            }
        };
    });