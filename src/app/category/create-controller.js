'use strict';

angular.module('inspinia')
    .controller('categoryCreateCtrl', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, dealService, categoryService) {

        $scope.category = {};
        $scope.category.img = '';
        $scope.showimage = true;
        $scope.regEx = /^[0-9]{10,10}$/;
        var fileurl = configurationService.baseUrl();

        $scope.deals_Photograph = function () {

            var img_div = angular.element(document.querySelector('#deals_Photograph'));
            img_div.addClass('remove_img');

        }


        $scope.removeImg = function (index) {
            $scope.category.img="" ;
           
           // console.log($scope.category.img) ;
           // $scope.category.img.splice(index, 1);

            //console.log($scope.deals.images) ;

        }

        $scope.getCategorybyId = function () {
            if ($state.current.breadcrumb.text == "Edit") {

                categoryService.getCategorybyId($stateParams.id).then(function (data) {
                    //Success code
                    $scope.category = data.result;

                    $scope.DPhotogetImage = true;
                    $scope.baseurlimg = fileurl;
                });
            }
        }
        $scope.getCategorybyId();

        //get cat
        $scope.getcategory = function () {
            categoryService.getCategory().then(function (category) {

                //console.log(merchants.result.list);
                $scope.listCategory = category.result.list;
            });
        }
        $scope.getcategory();







        // Edit member api end here
        // image upload start here
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;
        var dealPhoto = $scope.dealPhoto = new FileUploader({
            scope: $scope,
            url: fileurl + '/containers/images/upload',
            formData: [
                { key: 'value' }
            ]
        });



        dealPhoto.onSuccessItem = function (item, response, status, headers) {
            //  alert(item);
            $scope.dealAddPhoto = response;

            if ($scope.dealAddPhoto.result.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in upload image');
            } else {
                $scope.driverAddress = '/containers/images/download/' + $scope.dealAddPhoto.result.result.files.file[0].name;
                $scope.category.img = '/containers/images/download/' + $scope.dealAddPhoto.result.result.files.file[0].name;
                 
           
                    
                $scope.removeImg = function (index) {
                    $scope.category.img="" ;
               
                }

                $scope.DPhotogetImage = true;
                // $scope.member.imageURL = $scope.driverAddress;
            }
        };
        // image upload end here

        // save / update api start here
        $scope.save = function (category) {

            var error = 0;


            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {
                    categoryService.createCategory($scope.category).then(function (data) {
                        $state.go('category');
                        toaster.pop({
                            type: 'success',
                            title: 'category Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    var galImages = [];
                    categoryService.updateCategory($scope.category).then(function (data) {
                        $state.go('category');
                        toaster.pop({
                            type: 'success',
                            title: 'category Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
    });