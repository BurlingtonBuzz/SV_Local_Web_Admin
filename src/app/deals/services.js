'use strict';

angular.module('inspinia').service('dealService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/deals?filter[include][relation]=merchant').success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }

    this.getCategory1 = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/merchants/categories?merchantId=' + id).success(function (data) {
            //  console.log(data);
            //      console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategory = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/categories').success(function (data) {


            D.resolve(data);
        });
        return D.promise;
    }
    this.createDeal = function (data) {
        // console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/deals', data).then(function (data) {
            //  console.log(data)
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
    this.getDeals = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/deals/' + id).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.deleteDeals = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/deals/' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateDeal = function (data) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/deals', data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
