'use strict';

var th = angular.module('tunehousing', ['ngRoute', 'ngMaterial', 'ngLocale','uiGmapgoogle-maps']);
th.config(['$routeProvider',
    function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/search.html',
            controller: 'SearchCtrl'
        }).when('/search', {
            templateUrl: '/templates/search-result.html',
            controller: 'SearchCtrl'
        }).otherwise({
            redirectTo: '/',
            caseInsensitiveMatch: true
        })
}])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});

th.controller('SearchCtrl', function($scope, $rootScope, $location, $routeParams, SearchService, uiGmapIsReady) {
    $scope.search = function() {
        $location.path('/search').search({type : $scope.search.type, search : $scope.search.keywords});
    }

    if($routeParams.search){
        SearchService.search($routeParams).then(function(response){
            $scope.houses = response;
            $scope.mapOption = { center: { latitude: $scope.houses[0].coords.latitude, longitude: $scope.houses[0].coords.longitude }, zoom: 15};
        });
    }

    $scope.markerOptions = {
        icon: 'images/marker-icon.png'
    };

    $scope.onMarkerClicked = function(marker) {
        _.each($scope.houses, function(mker) {
            mker.showWindow = false;
        });
        marker.showWindow = true;
    };

});

th.service('SearchService', function($http, $q) {
    return {
        'search': function(search) {
            var defer = $q.defer();
            $http.get('/house/find?' + $.param(search)).success(function(resp){
                defer.resolve(resp);
            }).error( function(err) {
                defer.reject(err);
            });
            return defer.promise;
        }
}});

th.directive('thHouseCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/components/card.html',
        transclude: true,
        scope: {
            model: '='
        },
        link : function (scope, element, attrs){

        }
    };
})
.directive('thtop', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/components/top.html',
        link : function (scope, element, attrs){

        }
    };
})
.directive('thbottom', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/components/bottom.html',
        link : function (scope, element, attrs){

        }
    };
});