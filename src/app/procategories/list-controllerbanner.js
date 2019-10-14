'use strict';

angular.module('inspinia')
    .controller('advertisementListCtrl', function($scope, $state, advertisementService, toaster, $stateParams, configurationService) {
        
        var vm = this;
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;

        // list banner api start here
        $scope.listBanners = function(){
            advertisementService.listadvertisement().then(function(data) { 
                vm.list = data;
            })
        }
        $scope.listBanners();
        // list banner api end here

        $scope.edit = function(imageId) {
            $state.go('advertisement.edit', { id: imageId });
        }

        // Delete banner api call start here
        $scope.delete = function(id) {
            advertisementService.deleteadvertisement(id).then(function(data) {
                toaster.success('Advertisement  Image Successfully Deleted!');
                advertisementService.listadvertisement().then(function(data) {
                    vm.list = data; 
                })
            })
        }
        // Delete banner api call end here
    });
