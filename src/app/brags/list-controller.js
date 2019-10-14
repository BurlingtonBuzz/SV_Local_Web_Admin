'use strict';

angular.module('inspinia')
    .controller('bragsListCtrl', function ($scope, $state, bragService, toaster, $stateParams,configurationService) {
        var vm = this;

        // get user list api start here
        $scope.baseUrl = configurationService.baseUrl();

        $scope.getBragList = function () {
            bragService.getList().then(function (data) {

                $scope.brags = data;
                console.log($scope.brags);
            });
        }
        $scope.getBragList();

        // get user list api end here

        /********************Excel start  ***********************/
        $scope.exportUsers = function () {
            alasql('SELECT * INTO XLSX("users.xlsx",{headers:true}) \
                    FROM HTML("#users",{headers:true})');
        };
        /********************Excel end  ***********************/

        // Delete user api start here
        $scope.delete = function (id) {
            bragService.deleteBrags(id).then(function (data) {
                if (data.result.count == 1) {
                    toaster.success('Member Successfully Deleted!');
                    bragService.getList().then(function (data) {
                        $scope.brags = data;
                    });
                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete user api end here

        $scope.edit = function (id) {
            $state.go('members.edit', {
                id: id
            });
        }
    });