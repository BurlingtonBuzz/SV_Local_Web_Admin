'use strict';

angular.module('inspinia')
    .controller('prosubcategoriesCreateCtrl', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, dealService, prosubcategoryService) {
     
        $scope.procategory = {};
        $scope.sending=false ;
      //  $scope.prosubcategory.img = '';
        $scope.showimage = true;
        $scope.regEx = /^[0-9]{10,10}$/;
        var fileurl = configurationService.baseUrl();
        $scope.deals_Photograph = function () {
            var img_div = angular.element(document.querySelector('#deals_Photograph'));
            img_div.addClass('remove_img');
        }
        $scope.removeImg = function (index) {
            $scope.prosubcategory.image="" ;
           // console.log($scope.category.img) ;
           // $scope.category.img.splice(index, 1);
          //console.log($scope.deals.images) ;
        }
////
$scope.getprocategory = function (procategory) {
    $scope.pickupAddress = "";
    $scope.deliveryAddress = "";
    prosubcategoryService.getCategory(procategory).then(function (procategories) {
        if (procategories.result.list.length == 0) {
            $scope.showDropDown = true;
            $scope.showMapBtn = true;
            // console.log($scope.listMerchant);
        } else {
            //console.log(merchants.result.list);
            $scope.listprocategories = procategories.result.list;
            $scope.showDropDown = false;
            $scope.showMapBtn = true;
        }
    });
}

$scope.getprocategory();    
        /// 
        $scope.getCategorybyId = function () {
            if ($state.current.breadcrumb.text == "Edit") {
                
                prosubcategoryService.getCategorybyId($stateParams.id).then(function (data) {
                    console.log(data)
                    //Success code
                    $scope.prosubcategory = data.result;
                    $scope.DPhotogetImage = true;
                    $scope.baseurlimg = fileurl;
                });
            }
        }
        $scope.getCategorybyId();
        //get cat
        $scope.getcategory = function () {
            prosubcategoryService.getCategory().then(function (category) {
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
                $scope.prosubcategory.image = '/containers/images/download/' + $scope.dealAddPhoto.result.result.files.file[0].name;
                $scope.removeImg = function (index) {
                    $scope.prosubcategory.imgage="" ;
                }
                $scope.DPhotogetImage = true;
                // $scope.member.imageURL = $scope.driverAddress;
            }
        };
        // image upload end here

        // save / update api start here
        $scope.save = function (prosubcategory) {
            console.log($scope.procategory)
            var error = 0;
            $scope.sending=true ;
            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {
                    prosubcategoryService.createCategory($scope.prosubcategory).then(function (data) {
                        console.log(data.success)
                        if(data.success == false){
                            toaster.pop({
                                type: 'warning',
                                title: 'Pro sub-category already exist',
                                showCloseButton: true
                            });

                         }
                        $state.go('prosubprocategories');
                        toaster.pop({
                            type: 'success',
                            title: 'Pro sub-category Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    prosubcategoryService.updateSubCategory($scope.prosubcategory,$stateParams.id).then(function (data) {
                        $state.go('prosubprocategories');
                        toaster.pop({
                            type: 'success',
                            title: 'Pro sub-category Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
    });