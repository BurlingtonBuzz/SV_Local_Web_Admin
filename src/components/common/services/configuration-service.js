'use strict';

angular.module('inspinia').service('configurationService', ['$q', '$location', function ($q, $location) {
    //client
    // this.baseUrl = function() {
    //    	return "http://34.199.228.216:3030/api";                                                      
    // }

    // test
    // this.baseUrl = function() {
    //     return "http://52.220.190.223:3030/api"; 
    // }  


    // dev server 

    // this.baseUrl = function () {
    //     return "http://54.161.136.42:3030/api"
    // }

    // prod server "http://34.199.228.216:3031/api"
    this.baseUrl = function () {
        return "http://34.199.228.216:3031/api"
    }

}]);

