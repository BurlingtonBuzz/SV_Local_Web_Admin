'use strict';

angular.module('inspinia')
    .controller('dealNotificationCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'notificationService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, notificationService) {

        $scope.notification = {};

         // get user list api start here
        $scope.getDealsList = function () {
            notificationService.getDealsList().then(function (data) {
                $scope.deals = data.result.list;
                console.log("Deals : " + data);
            });
        }
        $scope.getDealsList();

        $scope.notify = function (model) {

            var selectedDeal = $scope.deals.filter(function(d) {
                return d.id==$scope.notification.dealId;
            });
            
            var params = {data: {
                title: $scope.notification.title, 
                message: $scope.notification.message,
                dealId: $scope.notification.dealId,
                image: selectedDeal[0].images[0]
            }} 
           notificationService.sendNotification(params).then(function (data) {
                // console.log(data);
                // console.log("test")
                // $state.go('deals');
                $scope.notification = {}

                toaster.pop({
                    type: 'success',
                    title: 'Notification Sent Successfully',
                    showCloseButton: true
                });

            })
        }

    }]);