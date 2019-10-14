'use strict';

angular.module('inspinia')
    .controller('termspolicyctrl', function ($scope, $state, termspolicyService, toaster, $stateParams,configurationService) {
        var vm = this;

        // get user list api start here
        $scope.baseUrl = configurationService.baseUrl();

        $scope.getList = function () {
            termspolicyService.getList().then(function (data) {

                $scope.list = data;
                console.log($scope.list);
            });
        }
        $scope.getList();

        // get user list api end here

        /********************Excel start  ***********************/
        // $scope.exportUsers = function () {
        //     alasql('SELECT * INTO XLSX("users.xlsx",{headers:true}) \
        //             FROM HTML("#users",{headers:true})');
        // };
        /********************Excel end  ***********************/

        // Delete user api start here
        // $scope.delete = function (id) {
        //     bragService.deleteBrags(id).then(function (data) {
        //         if (data.result.count == 1) {
        //             toaster.success('Member Successfully Deleted!');
        //             bragService.getList().then(function (data) {
        //                 $scope.brags = data;
        //             });
        //         } else {
        //             toaster.warning('Unable to delete');
        //         }
        //     })
        // }
        // Delete user api end here

        $scope.edit = function (id) {
            $state.go('termspolicy.edit', {
                id: id
            });
        }
    });