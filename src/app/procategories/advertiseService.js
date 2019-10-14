'use strict';

angular.module('inspinia').service('advertisementService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {

    //returns a promise that resolves with habit if found, 
    //otherwise reject

    this.addadvertisement = function(data) { 
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/banners', data).then(function(data) {
            D.resolve(data);
        },function(data){
            D.reject(data); 
        });
        return D.promise;   
    }  
    
     this.getadvertisement = function(id){
        var D = $q.defer();
        $http.get(configurationService.baseUrl() + '/banners/' + id).success(function(data){
            D.resolve(data);  
        });
        return D.promise;
    }

    this.listadvertisement = function() { 
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/banners').success(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.deleteadvertisement = function(id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/banners/' + id).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateadvertisement = function(data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/banners', data).success(function(data) {
            D.resolve(data);
        }).error(function(data) {
            D.resolve(data);
        });
        return D.promise; 
    }

}]);
