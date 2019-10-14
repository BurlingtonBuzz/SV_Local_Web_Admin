'use strict';

angular.module('inspinia').service('bragService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/brags?filter[include][relation]=userData&filter[include][scope][fields][0]=name').success(function (data) {
            console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }


    // this.createMember = function (data) {
    //     var D = $q.defer()
    //     $http.post(configurationService.baseUrl() + '/users', data).then(function (data) {
    //         D.resolve(data);
    //     }, function (data) {
    //         D.reject(data);
    //     });
    //     return D.promise;
    // }

    // this.getMember = function (id) {
    //     var D = $q.defer()
    //     $http.get(configurationService.baseUrl() + '/users/' + id).success(function (data) {
    //         D.resolve(data);
    //     }).error(function (data) {
    //         D.resolve(data);
    //     });
    //     return D.promise;
    // }
    this.deleteBrags = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/brags/' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    // this.updateMember = function (data) {
    //     var D = $q.defer()
    //     $http.put(configurationService.baseUrl() + '/users', data).success(function (data) {
    //         D.resolve(data);
    //     }).error(function (data) {
    //         D.resolve(data);
    //     });
    //     return D.promise;
    // }
}]);
