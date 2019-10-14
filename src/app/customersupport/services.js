'use strict';

angular.module('inspinia').service('supportService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/lists?filter[where][name]=customerSupport').success(function (data) {
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

    this.getSupport = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/lists/' + id).success(function (data) {
            //console.log(data);
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateSupport = function (id, data) {
        var D = $q.defer()
        $http.patch(configurationService.baseUrl() + '/lists/' + id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
