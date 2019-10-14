'use strict';

angular.module('inspinia')
    .controller('merchantListCtrl', function ($scope, $state, merchantService, toaster, $stateParams) {
        var vm = this;

        // get user list api start here
        $scope.getMerchants = function () {
            merchantService.getMerchants().then(function (data) {
                $scope.merchants = data;
            });
        }
        $scope.getMerchants();
        // get user list api end here

        // Delete user api start here
        $scope.delete = function (id) {
            merchantService.deleteMerchant(id).then(function (data) {
                var merchantCount = data.result.deleteMerchant.count
                

                if (merchantCount == 1) {
                    toaster.success('Merchant Successfully Deleted!');
                    $scope.getMerchants();
                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete user api end here

        $scope.edit = function (id) {

            // merchantService.getEvent(id).then(function(data){
            //    $scope.merchant = data; 
            //    console.log($scope.merchant);
            // });

            $state.go('merchant.edit', {
                id: id
            });
        }
    });