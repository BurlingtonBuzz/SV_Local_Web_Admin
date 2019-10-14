'use strict';

angular.module('inspinia')
    .controller('dealsListCtrl', function ($scope, $state, dealService, toaster, $stateParams) {
        var vm = this;
        $scope.toggle = {};
        $scope.toggle.switch = true;
        $scope.switchActiveInactive = function (index, status) {
           // console.log(index, status);
            if (status == true) {
                //Hit service and set as false.
                $scope.deals.result.list[index].isactive = status;
                console.log($scope.deals.result.list[index]);
                dealService.updateDeal($scope.deals.result.list[index]).then(function (response) {
                    if (response.success == true) {
                        toaster.success('Deal is Active ');
                    } else {
                        $scope.deals.result.list[index].isactive = true;
                        toaster.warning('Oops server issue please try again');
                    }
                })
            } else {
                //Hit service and set as true..
                $scope.deals.result.list[index].isactive = status;
                console.log($scope.deals.result.list[index]);
                dealService.updateDeal($scope.deals.result.list[index]).then(function (response) {
                    if (response.success == true) {
                        toaster.success('Deal is Inactive ');
                    } else {
                        $scope.deals.result.list[index].isactive = false;
                        toaster.warning('Oops server issue please try again');
                    }
                })
            }
        }
        // get user list api start here
        $scope.getDealsList = function () {
            dealService.getList().then(function (data) {
                $scope.deals = data;
                // console.log(data);
            });
        }
        $scope.getDealsList();
        // get user list api end here
        /********************Excel start  ***********************/
        // $scope.exportUsers = function () {
        //     alasql('SELECT * INTO XLSX("users.xlsx",{headers:true}) \
        //             FROM HTML("#users",{headers:true})');
        // };
        /********************Excel end  ***********************/
        // Delete user api start here
        $scope.delete = function (id) {
            dealService.deleteDeals(id).then(function (data) {
                if (data.result.count == 1) {
                    toaster.success('Deals Successfully Deleted!');
                    dealService.getList().then(function (data) {
                        $scope.deals = data;
                    });
                } else {
                    toaster.warning('Unable to delete');
                }
            });
        }
        // Delete user api end here
        $scope.edit = function (id) {
            $state.go('deals.edit', {
                id: id
            });
        }
    });