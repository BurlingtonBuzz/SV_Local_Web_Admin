'use strict';

angular.module('inspinia').service('notificationService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getDealsList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/deals?filter[include][relation]=merchant').success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }

    this.getProSerivceProvidersList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/proServiceProviders').success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }

    this.sendNotification = function (data) {
        // console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/notifications/sendNotification', data).then(function (data) {
            //  console.log(data)
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
}]);
