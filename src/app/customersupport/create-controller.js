'use strict';

angular.module('inspinia')
    .controller('supportCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'supportService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, supportService) {

        $scope.post = {};
        $scope.imgobj = [];
        $scope.regEx = /^[0-9]{10,10}$/;
        var fileurl = configurationService.baseUrl();
        // Edit member api start here
        $scope.editSupport = function () {
            
            if ($state.current.breadcrumb.text == "Edit") {

                supportService.getSupport($stateParams.id).then(function (data) {
                    console.log("edit");
                    console.log(data);
                    $scope.post = data.result;
                    // $scope.member.dob = new Date(data.dob);
                    // $scope.DPhotogetImage = true;
                    var fileurl = configurationService.baseUrl();
                    $scope.baseurlimg = fileurl;
                });
            }
        }
        $scope.editSupport();
        // Edit member api end here
        // image upload start here
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;

      
        // image upload end here

        // save / update api start here
        $scope.save = function (model) {
            var error = 0;
        

            if (error == 0) {
          
              
                       
                supportService.updateSupport($scope.post.id,$scope.post).then(function (data) {
                    console.log(data);
                    $state.go('support');
                    toaster.pop({
                        type: 'success',
                        title: 'About us Updated Successfully',
                        showCloseButton: true
                    });
                })
                
            }
        }
    }]);