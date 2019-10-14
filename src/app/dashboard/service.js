'use strict';

angular.module('inspinia').service('dashboardService', ['$q', '$http', 'configurationService', function($q, $http, configurationService) {
    this.getList = function() {
        var D = $q.defer()
        $http.get(configurationService.baseUrl() + '/deals/dashboard').success(function(data) {
               console.log(data);
            // console.log("data");
            D.resolve(data);
        }); 
        return D.promise;
    }
    
}]);
