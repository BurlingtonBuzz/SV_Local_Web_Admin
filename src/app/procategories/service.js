'use strict';

angular.module('inspinia').service('procategoryService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

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
    this.getCategory = function () {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/procategories').success(function (data) {
            // console.log(data);
            // console.log('#######');
            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategorybyId123 = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/procategories/' + id).success(function (data) {
            // console.log(data);
            // console.log('#######');
            D.resolve(data);
        });
        return D.promise;
    }
    this.getCategorybyId = function (id) {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/prosubcategories/' + id).success(function (data) {
            // console.log(data);
            // console.log('#######');
            D.resolve(data);
        });
        return D.promise;
    }
    this.createCategory = function (data) {
        // console.log(data);
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/procategories', data).then(function (res) {
            //console.log(data)
            D.resolve(res);
        }, function (error) {

            if(error.data.err.statusCode == 422){
                alert(error.data.err.message) ;
            }
            D.reject(data);
        });
        return D.promise;
    }
    this.deleteCategory = function (id) {
        var D = $q.defer()
        $http.delete(configurationService.baseUrl() + '/procategories/' + id).success(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
    this.updateCategory = function (data,id) {
        var D = $q.defer()
        $http.put(configurationService.baseUrl() + '/procategories/'+id, data).success(function (data) {
            D.resolve(data);
        }).error(function (data) {
            D.resolve(data);
        });
        return D.promise;
    }
}]);
