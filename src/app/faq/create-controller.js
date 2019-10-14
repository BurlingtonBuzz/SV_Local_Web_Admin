'use strict';

angular.module('inspinia')
    .controller('faqCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'faqService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, faqService) {

        $scope.post = {};
        // $scope.imgobj = [];
        $scope.regEx = /^[0-9]{10,10}$/;
        var fileurl = configurationService.baseUrl();
        // Edit member api start here
        $scope.editFaq = function () {
            
            if ($state.current.breadcrumb.text == "Edit") {

                faqService.getFaq($stateParams.id).then(function (data) {
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
        $scope.editFaq();
        // Edit member api end here
        // image upload start here
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;

        // // Driver address photo start Here
        // $scope.driver_Photograph = function () {
        //     var img_div = angular.element(document.querySelector('#driver_Photograph'));
        //     img_div.addClass('remove_img');
        // }

        // var driverPhoto = $scope.driverPhoto = new FileUploader({
        //     scope: $scope,
        //     url: fileurl + '/containers/users/upload',
        //     formData: [
        //         { key: 'value' }
        //     ]
        // });

        // driverPhoto.onSuccessItem = function (item, response, status, headers) {
        //     $scope.driverAddPhoto = response;
        //     if ($scope.driverAddPhoto.result.files.file[0].name == undefined) {
        //         toastr.warning('Error : Problem in upload image');
        //     } else {
        //         $scope.driverAddress = '/containers/users/download/' + $scope.driverAddPhoto.result.files.file[0].name;
        //         $scope.DPhotogetImage = true;
        //         $scope.member.imageURL = $scope.driverAddress;
        //     }
        // };
        // // image upload end here

        // save / update api start here
        $scope.save = function (model) {
          
            console.log("save");
            var error = 0;
            if (error == 0) {
                // var rdata = {}
                // $scope.rdata = $scope.list,
                // $scope.rdata.id = $stateParams.id;
               
                console.log($scope.post);
               
                faqService.updatefaq($scope.post.id,$scope.post).then(function (data) {
                    console.log(data);
                    $state.go('faq');
                    toaster.pop({
                        type: 'success',
                        title: 'FAQ Updated Successfully',
                        showCloseButton: true
                    });
                })

            }
        }
    }]);