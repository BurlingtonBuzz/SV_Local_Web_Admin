'use strict';

angular.module('inspinia')
    .controller('termspolicyCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'termspolicyService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, termspolicyService) {

        $scope.post = {};
       
        $scope.regEx = /^[0-9]{10,10}$/;
        var fileurl = configurationService.baseUrl();
        // Edit member api start here
        $scope.editTerms = function () {
            
            if ($state.current.breadcrumb.text == "Edit") {

                termspolicyService.getTerms($stateParams.id).then(function (data) {
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
        $scope.editTerms();
        // Edit member api end here
        // image upload start here
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;

    
     
        // save / update api start here
        $scope.save = function (model) {
            var error = 0;
       
            if (error == 0) {
            
                termspolicyService.updateTerms($scope.post.id,$scope.post).then(function (data) {

                        $state.go('termspolicy');
                        toaster.pop({
                            type: 'success',
                            title: 'Terms & Policy Updated Successfully',
                            showCloseButton: true
                        });
                    })
                
            }
        }
    }]);