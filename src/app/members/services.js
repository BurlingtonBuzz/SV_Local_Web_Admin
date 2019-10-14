'use strict';

angular.module('inspinia').service('memberService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/users').success(function (data) {
            console.log(data)
            D.resolve(data);
        });
        return D.promise;
    }


    this.createMember = function (data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/users', data).then(function (data) {
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }

    this.getMember = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/users/' + id).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.deleteMember = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/users/' + id).success(function (data) {
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
