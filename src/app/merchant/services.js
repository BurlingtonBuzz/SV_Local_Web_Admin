'use strict';

angular.module('inspinia').service('merchantService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found,  
    //otherwise reject
    this.getMerchants = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/merchants').success(function (data) {

            D.resolve(data);
        });
        return D.promise;
    }
    this.createEvent = function (data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/merchants', data).then(function (data) {

            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
    this.getEvent = function (id) {

        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/merchants/' + id).success(function (data) {
            // console.log(data);

            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.deleteMerchant = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/admins/deleteMerchant?merchantId=' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateEvents = function (data) {
        var D = $q.defer()
        $http.patch(configurationService.baseUrl() + '/merchants/'+data.id, data).success(function (data) {
            console.log("Servicedata");
            console.log(data);
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
