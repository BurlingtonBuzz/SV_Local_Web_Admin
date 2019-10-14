'use strict';

angular.module('inspinia').service('loginService', ['$q', '$http', 'configurationService', function ($q, $http, configurationService) {

    this.getLogin = function (data) {
        var D = $q.defer()
        $http.post(configurationService.baseUrl() + '/admins/login', data).success(function (data) {
            D.resolve(data);
        })
            .error(function (data) {
                D.resolve(data);
            });
        return D.promise;
    }



}]);
