'use strict';

angular.module('inspinia').service('termspolicyService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/lists?filter[where][name]=termsAndPolicy').success(function (data) {
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

    this.getTerms = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/lists/' + id).success(function (data) {
            //console.log(data);
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateTerms = function (id, data) {
        var D = $q.defer()
        $http.patch(configurationService.baseUrl() + '/lists/' + id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);