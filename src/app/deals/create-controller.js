'use strict';

angular.module('inspinia')
    .controller('dealsCreateCtrl', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, dealService, merchantService) {
        $scope.deals = {};
        //  $scope.member = {};
        $scope.images = [];
        //  $scope.startDate ='';
        $scope.regEx = /^[0-9]{10,10}$/;
        var fileurl = configurationService.baseUrl();
        var merchantId = '';
        $scope.deals.startDate = moment().format('YYYY-MM-DD');
        $scope.deals.endDate = moment().format('YYYY-MM-DD');



        // update merchant id on change 
        $scope.update = function (id) {
            merchantId = id;
            dealService.getCategory1(merchantId).then(function (response) {


                $scope.listCategory = response.result.list;
                $scope.DPhotogetImage = true;
                $scope.baseurlimg = fileurl;
            });
        };



        $scope.open1 = function (index, selected, size) {
            NgMap.getMap('billingmap').then(function (map) {
                regionMap = map;
                google.maps.event.trigger(regionMap, 'resize');
            });
            $scope.searchArea = "Hyderabad";
            $scope.Mapindex = index;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/warehouseusers/mapTemplate.html',
                controller: 'wareHouseMapCtrl',
                size: size,
                // resolve: { 
                //   items: function () {
                //     return $scope.items;
                //   }
                // } 
            });

            modalInstance.result.then(function (selectedItem) {
                $rootScope.pmapLatLngValues = selectedItem;
                $scope.selectedMap = selectedItem;
                latlngAddress($scope.selectedMap.data);
                $scope.wareHouseModel.savedAddress.address = selectedItem.message;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        function latlngAddress(data) {
            _.each(data[0].address_components, function (component) {
                _.each(component.types, function (type) {

                    if (type === 'sublocality_level_2') {
                        $scope.wareHouseModel.savedAddress.street = component.long_name;

                    }
                    if (type === 'sublocality_level_1') {
                        $scope.wareHouseModel.savedAddress.area = component.long_name;
                    }
                    if (type === 'point_of_interest') {
                        $scope.wareHouseModel.savedAddress.landmark = component.long_name;
                    }

                    if (type === 'administrative_area_level_1') {
                        $scope.wareHouseModel.savedAddress.state = component.long_name;
                    }
                    if (type === 'administrative_area_level_2') {
                        $scope.wareHouseModel.savedAddress.city = component.long_name;
                    }
                    if (type === 'postal_code') {
                        $scope.wareHouseModel.savedAddress.pincode = Number(component.long_name);
                    }
                })
            })
        }




        $scope.getmerchants = function (merchant) {


            $scope.pickupAddress = "";
            $scope.deliveryAddress = "";
            merchantService.getMerchants(merchant).then(function (merchants) {
            console.log(merchants);
                if (merchants.result.list.length == 0) {
                    $scope.showDropDown = true;
                    $scope.showMapBtn = true;

                    // console.log($scope.listMerchant);
                } else {
                    //console.log(merchants.result.list);
                    $scope.listMerchant = merchants.result.list;
                    $scope.showDropDown = false;
                    $scope.showMapBtn = true;
                }
            });
        }

        $scope.getmerchants();
        $scope.deals_Photograph = function () {

            var img_div = angular.element(document.querySelector('#deals_Photograph'));
            img_div.addClass('remove_img');

        }


        $scope.removeImg = function (index) {

            $scope.deals.images.splice(index, 1);

            //console.log($scope.deals.images) ;

        };


        //  $scope.removeImg();
        // Edit member api start here
        $scope.editDeal = function () {
            if ($state.current.breadcrumb.text == "Edit") {
                dealService.getDeals($stateParams.id).then(function (data) {
                    var startDate = moment(data.result.startDate).format('YYYY-MM-DD');
                    var endDate = moment(data.result.endDate).format('YYYY-MM-DD');

                    //  console.log(data.result);
                    $scope.deals = data.result;
                    $scope.images = data.result.images;
                    $scope.deals.startDate = startDate;
                    $scope.deals.endDate = endDate;
                    $scope.update($scope.deals.merchantId);
                    $scope.DPhotogetImage = true;
                    $scope.baseurlimg = fileurl;
                    // console.log($scope.listCategory);
                    $timeout(function () {

                        // console.log($scope.listCategory);
                        var getIndex = _.find($scope.listCategory, function (x) {
                            console.log(data.result.categoryId);
                            return x.id === data.result.categoryId;
                        });
                        // console.log(getIndex);

                        $scope.deals.categoryId = getIndex;

                    }, 1000);

                    //  $scope.deals.categoryId = data.result.categoryId;

                    $scope.showDropDown = true;


                });
            }
        }
        $scope.editDeal();
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
            // alert(item);
            $scope.dealAddPhoto = response;

            $scope.removeImg = function (index) {

                $scope.images.splice(index, 1);

                console.log($scope.images);
                //$scope.deals_Photograph(); 
            };



            if ($scope.dealAddPhoto.result.result.files.file[0].name == undefined) {
                toastr.warning('Error : Problem in upload image');
            } else {
                $scope.driverAddress = '/containers/images/download/' + $scope.dealAddPhoto.result.result.files.file[0].name;
                $scope.deals.images = '/containers/images/download/' + $scope.dealAddPhoto.result.result.files.file[0].name;
                $scope.DPhotogetImage = true;


                $scope.images.push($scope.deals.images);


                //
            }
        };
        // image upload end here

        // save / update api start here
        $scope.save = function (model) {
            model.images = $scope.images;

            var error = 0;
            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {
                    dealService.createDeal($scope.deals).then(function (data) {
                        // console.log(data);
                        // console.log("test")
                        $state.go('deals');

                        toaster.pop({
                            type: 'success',
                            title: 'Deal Created Successfully',
                            showCloseButton: true
                        });

                    })
                } else {
                    console.log($scope.deals);
                    $scope.deals.categoryId = $scope.deals.categoryId.id;
                    console.log($scope.deals);

                    dealService.updateDeal($scope.deals).then(function (data) {
                        $state.go('deals');
                        toaster.pop({
                            type: 'success',
                            title: 'Deal Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
    });