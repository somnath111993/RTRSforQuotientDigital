angular.module('rtrs')
    .factory('searchFactory', function($http) {
    	          function byName(name) {
                    // console.log(name);
                    let req = {};
                    req.url = '/searchByName/' + name;
                    req.method = 'GET';
                    return $http(req);
                }

                function byLocation(location) {
                    let req = {};
                    req.url = '/searchByLocation/' + location;
                    req.method = 'GET';
                    return $http(req);
                }

                function byCuisine(cuisine) {
                    let req = {};
                    req.url = '/searchByCuisine/' + cuisine;
                    req.method = 'GET';
                    return $http(req);
                }

                let factory = {
                    byName: byName,
                    byLocation: byLocation,
                    byCuisine: byCuisine                    
                };
                return factory;

    })
    .factory('reviewService', function($http) {
        return {
            postReview: function(reviewObj) {
                console.log(reviewObj);
                
                return $http({
                    method: 'POST',
                    url: '/reviewed',
                    data: reviewObj,
                    cache: false
                }).then(function mySucces(response)  {
                    console.log('Succes reviewservice!!!!');
                }, function myError(response) {
                    console.log('error in posting review');
                });
            }
        };

    });

    