'use strict';

angular.module('inspinia').service('categoryService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories').success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }

    this.getCategory = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories').success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategorybyId = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories/' + id).success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }


    this.createCategory = function (data) {
        // console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/categories', data).then(function (data) {
            console.log(data)
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }



    this.deleteCategory = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/categories/' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateCategory = function (data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/categories', data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
