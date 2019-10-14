'use strict';

angular.module('inspinia')
    .controller('proNotificationCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'notificationService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, notificationService) {

        $scope.notification = {};

         // get user list api start here
        $scope.getProSerivceProvidersList = function () {
            notificationService.getProSerivceProvidersList().then(function (data) {
                $scope.providers = data.result.list;
                console.log("Providers : " + data);
            });
        }
        $scope.getProSerivceProvidersList();

        $scope.notify = function (model) {

             var selectedProvider = $scope.providers.filter(function(p) {
                return p.id==$scope.notification.providerId;
            });

            var params = {data: {
                title: $scope.notification.title, 
                message: $scope.notification.message,
                providerId: $scope.notification.providerId,
                image: selectedProvider[0].image
            }} 
           notificationService.sendNotification(params).then(function (data) {
                // console.log(data);
                // console.log("test")
                // $state.go('providers');
                $scope.notification = {};

                toaster.pop({
                    type: 'success',
                    title: 'Notification Sent Successfully',
                    showCloseButton: true
                });

            })
        }

    }]);