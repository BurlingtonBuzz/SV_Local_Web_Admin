'use strict';

angular.module('inspinia')
    .controller('memberCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'memberService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, memberService) {

        $scope.member = {};
        $scope.imgobj = [];
        $scope.regEx = /^[0-9]{10,10}$/;
        var fileurl = configurationService.baseUrl();
        // Edit member api start here
        $scope.getMember = function () {
            if ($state.current.breadcrumb.text == "Edit") {
                memberService.getMember($stateParams.id).then(function (data) {
                    $scope.member = data.result;
                    alert("enter");
                    console.log(data);
                    // $scope.member = data;
                    // $scope.member.dob = new Date(data.dob);
                    // $scope.DPhotogetImage = true;
                });
            }
        }
        $scope.getMember();
        // Edit member api end here
        // image upload start here
        // var fileurl = configurationService.baseUrl();
        // $scope.baseurlimg = fileurl;

        // Driver address photo start Here
        $scope.driver_Photograph = function () {
            var img_div = angular.element(document.querySelector('#driver_Photograph'));
            img_div.addClass('remove_img');
        }

        var driverPhoto = $scope.driverPhoto = new FileUploader({
            scope: $scope,
            url: fileurl + '/containers/users/upload',
            formData: [
                { key: 'value' }
            ]
        });

        driverPhoto.onSuccessItem = function (item, response, status, headers) {
            $scope.driverAddPhoto = response;
            if ($scope.driverAddPhoto.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in upload image');
            } else {
                $scope.driverAddress = '/containers/users/download/' + $scope.driverAddPhoto.result.files.file[0].name;
                $scope.DPhotogetImage = true;
                $scope.member.imageURL = $scope.driverAddress;
            }
        };
        // image upload end here

        // save / update api start here
        $scope.save = function (model) {
            var error = 0;
            // $scope.errorsinp = { "designation":"","username": "", "fullName": "", "dob": "", "mobileno": "", "landline": "", "address": "", "email": "", "password": "" };
            // if ($scope.member.username == undefined || $scope.member.username == '') {
            //     $scope.errorsinp.username = "Enter User Name";
            //     error++;
            // }
            // if ($scope.member.designation == undefined || $scope.member.designation == '') {
            //     $scope.errorsinp.designation = "Enter designation";
            //     error++;
            // }
            // if ($scope.member.fullName == undefined || $scope.member.fullName == '') {
            //     $scope.errorsinp.fullName = "Enter Full Name";
            //     error++;
            // }
            // if ($scope.member.dob == undefined || $scope.member.dob == '') {
            //     $scope.errorsinp.dob = "Enter DOB";
            //     error++;
            // }
            // if ($scope.member.mobileno == undefined || $scope.member.mobileno == '') {
            //     $scope.errorsinp.mobileno = "Enter Mobile No";
            //     error++;
            // }
            // if ($scope.member.landline == undefined || $scope.member.landline == '') {
            //     $scope.errorsinp.landline = "Enter landline no";
            //     error++;
            // }
            // if ($scope.member.address == undefined || $scope.member.address == '') {
            //     $scope.errorsinp.address = "Enter address";
            //     error++;
            // }
            // if ($scope.member.email == undefined || $scope.member.email == '') {
            //     $scope.errorsinp.email = "Enter email";
            //     error++;
            // }
            // if ($scope.member.password == undefined || $scope.member.password == '') {
            //     $scope.errorsinp.password = "Enter password";
            //     error++;
            // }

            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {
                    memberService.createMember($scope.member).then(function (data) {
                        $state.go('members');
                        toaster.pop({
                            type: 'success',
                            title: 'Member Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    memberService.updateMember($scope.member).then(function (data) {
                        $state.go('members');
                        toaster.pop({
                            type: 'success',
                            title: 'member Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
    }]);