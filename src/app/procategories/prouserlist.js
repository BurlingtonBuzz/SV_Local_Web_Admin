'use strict';

angular.module('inspinia')
    .controller('proUserListCtrl', function($scope, $state, prosubcategoryService, toaster, $stateParams, configurationService) {
        
        var vm = this;
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;

        // list banner api start here
        $scope.listBanners = function(){
            prosubcategoryService.proUserList().then(function(data) { 

                console.log(data.data.result.list)
                $scope.userList = data.data.result.list;
            })
        }
        $scope.listBanners();
        // list banner api end here

        $scope.edit = function(imageId) {
            $state.go('prousers.edit', { id: imageId });
        }

        // Delete banner api call start here
        $scope.delete = function(id) {
            prosubcategoryService.deleteProUser(id).then(function(data) {
                toaster.success('Pro Merchant Successfully Deleted!');
                prosubcategoryService.proUserList().then(function(data) { 
                    console.log(data.data.result.list)
                    $scope.userList = data.data.result.list;
                })
            })
        }
        // Delete banner api call end here
    });
