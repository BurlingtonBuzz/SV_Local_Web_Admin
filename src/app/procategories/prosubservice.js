'use strict';

angular.module('inspinia').service('prosubcategoryService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    //returns a promise that resolves with customers if found, 
    //otherwise reject


    this.getList = function () {
        var D = $q.defer()
        // http://54.169.63.1:3030/api/prosubcategories?filter[include]=procategories
        $http.get(configurationService.baseUrl() + '/prosubcategories?filter[include]=procategories').success(function (data) {
            console.log(data);
            // console.log('#######');
            D.resolve(data);
        });
        return D.promise;
    }

    this.getSubCategoryByCatId = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/prosubcategories?filter[where][procategoryId]=' + id).success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }

    this.getCategory = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/procategories').success(function (data) {
            // console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategorybyId = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/prosubcategories/' + id).success(function (data) {
            console.log(data);
            // console.log('#######');

            D.resolve(data);
        });
        return D.promise;
    }

    this.getProUserById = function (id) {
        var D = $q.defer()
        //'/prodetails/getProDetails?id=' + id
        $http.get(configurationService.baseUrl() + '/proServiceProviders/' + id).success(function (data) {
            console.log(data);
            // console.log('#######');
            D.resolve(data);
        });
        return D.promise;
    }


    this.createCategory = function (data) {
        // console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/prosubcategories', data).then(function (data) {
            console.log(data)
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }

    //Pro users services start
    this.createProUser87447 = function (data) {
        // console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/proServiceProviders', data).then(function (data) {
            console.log(data)
            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
    this.proUserList = function () {
        // console.log(data);
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/proServiceProviders').then(function (data) {

            D.resolve(data);
        }, function (data) {
            D.reject(data);
        });
        return D.promise;
    }
    //Pro users services end
    this.deleteCategory = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/prosubcategories/' + id).success(function (data) {
            console.log(id)
            D.resolve(data);
        });
        return D.promise;
    }
    this.deleteProUser = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/proServiceProviders/' + id).success(function (data) {
            console.log(id)
            D.resolve(data);
        });
        return D.promise;
    }

    this.updateSubCategory = function (data, id) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/prosubcategories/' + id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateProUser = function (data, id) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/proServiceProviders/' + id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }

}]);
