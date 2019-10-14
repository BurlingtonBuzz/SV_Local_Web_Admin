'use strict';

angular.module('inspinia')
    .controller('advertisementCreateCtrl', function ($scope, $state, advertisementService, toaster, FileUploader, configurationService, $stateParams, $filter) {
        var fileurl = configurationService.baseUrl();
        $scope.productCreation = {};
        $scope.productCreation.price = [{}];
        $scope.productCreation.status = 1;
        $scope.productCreation.isPopular = true;
        $scope.productCreation.additionalNutritionInfo = [{}];
        $scope.productCreation.nutritionInfo = [{}];
        $scope.imgobj = [];
        $scope.showimage = true;
        $scope.dealsimage = "";
        $scope.bannernumber = "";
        $scope.bannernumber2 = "";
        $scope.abovefive = false;
        $scope.imagepath = "";
        $scope.imageval = undefined;
        // Edit banners api start here
        $scope.delete = function (id) {
            advertisementService.deleteadvertisement(id).then(function (data) {
                toaster.success('Advertisement  Image Successfully Deleted!');
                $scope.getBannerList();
            })
        }
        $scope.getBannerList = function () {
            advertisementService.listadvertisement().then(function (getImage) {
                console.log(getImage);
                if (getImage.success) {
                    $scope.imageShow = true;
                    $scope.imgobj = getImage.result.list;
                    console.log($scope.imgobj.length);
                    if ($scope.imgobj.length <= 4) {
                        $scope.imageval = 23;
                    }

                } else {
                    $scope.imageShow = false;
                }
            });
        }
        $scope.getBannerList();
        // Edit banners api end here
        // Create/update banner api start here
        $scope.save = function () {
            var error = 0;
            // if ($scope.imgobj == '' || $scope.imgobj == undefined) {
            //     $scope.errorship = "Please upload images";
            //     error++;
            // }
            if (error == 0)
                if ($state.current.breadcrumb.text == "Create") {
                    advertisementService.addadvertisement($scope.imgobj).then(function (data) {
                        console.log(data);
                        toaster.success('Banners Successfully Created!');
                        $state.go('advertisement');
                    }, function (reason) {
                        toaster.error(reason);
                    }, function (update) {
                        toaster.error(update);
                    });
                } else {
                    var imageLength = $scope.imgobj.length;
                    if (imageLength == 0) {
                        alert("Please upload image");
                    }
                    $scope.updateImage = {
                        id: $stateParams.id,
                        imageURL: $scope.imgobj[0].imageURL
                    }
                    advertisementService.updateadvertisement($scope.updateImage).then(function (data) {
                        toaster.success('Banner Image Successfully Updated!');
                        $state.go('advertisement');
                    })
                }
        }
        // Create/update banner api end here

        var dealPhoto = $scope.dealPhoto = new FileUploader({
            scope: $scope,
            url: fileurl + '/containers/advertiseImages/upload',
            formData: [
                { key: 'value' }
            ]
        });
        dealPhoto.onSuccessItem = function (item, response, status, headers) {
            $scope.errorimg = '';
            $scope.img = response;

            console.log($scope.img.result.result.files.file[0].name);
            if ($scope.img.result.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in product image');
            } else {
                $scope.imagepath = '/containers/advertiseImages/download/' + $scope.img.result.result.files.file[0].name;
            }
        };

        $scope.addbannertolive = function () {
            var error = 0;
            console.log();
            if ($scope.imageval != 23) {
                error++;
                $scope.errormessage = "Maximum 5 Banners allowed";
            }
            if (!$scope.imagepath) {
                error++;
                $scope.errormessage = "Please Select Image";
            }
            if ($scope.bannernumber == undefined) {
                error++;
                $scope.errormessage = "Order Number wrong";
            }
            if (error == 0) {
                var obj = { "imageURL": $scope.imagepath, 'index': $scope.bannernumber };
                advertisementService.addadvertisement(obj).then(function (data) {
                    //Success code
                    console.log(data);
                    if (data.status == 200) {
                        toaster.pop({
                            type: 'success',
                            title: 'New banner Add Successfully',
                            showCloseButton: true
                        });
                        $scope.getBannerList();
                        $state.go('allbanners');

                    }
                });
            }
        }
        $scope.cancle = function () {
            window.history.back();
        }
        // Multiple Image Uploads
        var fileurl = configurationService.baseUrl();
        $scope.baseurlimg = fileurl;
        var uploader = $scope.uploader = new FileUploader({
            url: fileurl + '/containers/advertiseImages/upload'
        });


        uploader.onSuccessItem = function (item, response, status, headers) {
            $scope.errorimg = '';
            $scope.img = response;
            console.log($scope.img.result.result.files.file[0].name);
            if ($scope.img.result.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in product image');
            } else {
                var imageURL = '/containers/advertiseImages/download/' + $scope.img.result.result.files.file[0].name;
                $scope.imgobj.push({ 'imageURL': imageURL });
                var obj = { "imageURL": imageURL, 'index': $scope.bannernumber2 };

                advertisementService.addadvertisement(obj).then(function (data) {
                    //Success code

                    toaster.pop({
                        type: 'success',
                        title: 'New banner Add Successfully',
                        showCloseButton: true
                    });
                    $scope.getBannerList();
                });
            }
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            // console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            // console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            // console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            //console.info('onCompleteAll');
        };
        $scope.deleteimg = function (id) {
            $scope.imgobj.splice(id, 1);
        }
        var product = $scope.product = new FileUploader({
            scope: $scope,
            url: fileurl + '/containers/advertiseImages/upload',
            formData: [
                { key: 'value' }
            ]
        });
        product.onSuccessItem = function (item, response, status, headers) {
            $scope.productImg = response;
            if ($scope.productImg.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in product image');
            } else {
                var imageURL = '/containers/advertiseImages/download/' + $scope.productImg.result.files.file[0].name;
                $scope.productCreation.imageURL = imageURL;
            }
        };

    });
