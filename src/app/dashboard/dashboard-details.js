'use strict';

angular.module('inspinia')
    .controller('adminDashboardCtrl', function ($scope,  $state, toaster, dashboardService, $controller) {

        // Get total users count
        $scope.getUsersCount = function () {
            dashboardService.getList().then(function (counts) {
                $scope.totalCount = counts;
                  console.log('%%%%%%%%%%%');
                console.log($scope.totalCount);
            });
        }
        $scope.getUsersCount();
        // $scope.getUsersCount();
        // $controller('RegionListCtrl', { $scope: $scope });
        // $scope.listFranchises();
        // $controller('DriversListCtrl', { $scope: $scope });
        // $scope.listBoys();
        // $controller('orderListCtrl', { $scope: $scope });
        // $scope.getOrders();      
    });
