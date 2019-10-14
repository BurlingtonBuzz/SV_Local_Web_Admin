'use strict';

angular.module('inspinia')
    .controller('merchantCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'dealService', 'merchantService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, dealService, merchantService) {
        var polygonInstance;
        var polygonData;
        var regionMap;
        var deliveryMap;
        $scope.merchantModel = {};
        $scope.merchantModel.address = {};
        $scope.event = {};
        $scope.startpointMarker = 'Burlington NC';
        $scope.showimage = true;
        $scope.imgobj = [];
        $scope.regEx = /^[0-9]{10,10}$/;
        $scope.merchant = {};
        $scope.selectedCat = [];
        var modalInstance = {};
        var pos = {};
        var temp = [];
        var getCatName = {};

        var fileurl = configurationService.baseUrl();
        $scope.getCurrentLocation = function () {



            $scope.pos = this.getPosition();
            // edfi console.log($scope.pos);


            // $scope.merchant.address.location = {
            //     "lat": $scope.pos.lat(),
            //     "lng": $scope.pos.lng()

            // }

        }

        function getFormattedAddress(place) {
            //@params: place - Google Autocomplete place object
            //@returns: location_obj - An address object in human readable format
            var location_obj = {};
            for (var i in place.address_components) {
                var item = place.address_components[i];

                location_obj['formatted_address'] = place.formatted_address;
                if (item['types'].indexOf("locality") > -1) {
                    location_obj['locality'] = item['long_name']
                } else if (item['types'].indexOf("administrative_area_level_1") > -1) {
                    location_obj['admin_area_l1'] = item['long_name']
                } else if (item['types'].indexOf("street_number") > -1) {
                    location_obj['street_number'] = item['short_name']
                } else if (item['types'].indexOf("route") > -1) {
                    location_obj['route'] = item['long_name']
                } else if (item['types'].indexOf("country") > -1) {
                    location_obj['country'] = item['long_name']
                } else if (item['types'].indexOf("postal_code") > -1) {
                    location_obj['postal_code'] = item['short_name']
                }

            }
            return location_obj;
        }

        $scope.$on('place_changed', function (e, place) {
            // do something with place

            $scope.pos = place.geometry.location;
            $scope.startpointMarker = [place.geometry.location.lat(), place.geometry.location.lng()];

            var formattedAddress = getFormattedAddress(place)
            console.log('Place changed : ' + JSON.stringify(formattedAddress))

            $scope.merchant.address = {
                location: place.geometry.location,
                streetAddress: formattedAddress.street_number +
                    ' ' + formattedAddress.route +
                    ', ' + formattedAddress.locality,
                city: formattedAddress.locality,
                state: formattedAddress.admin_area_l1,
                zipCode: parseFloat(formattedAddress.postal_code)
            }
            // $scope.merchant.address.location = place.geometry.location
            // $scope.merchant.address.streetAddress = formattedAddress.street_number
            // // +
            // //     ' ' + formattedAddress.route
            // // + 
            // // ', ' + formattedAddress.locality
            // $scope.merchant.address.city = formattedAddress.locality
            // $scope.merchant.address.state = formattedAddress.admin_area_l1
            // $scope.merchant.address.zipCode = formattedAddress.postal_code

        });

        // $scope.$watch('pos', function (newValues, oldValues) {
        //     console.log('\n  newValues pos : ' + newValues)
        //     console.log('\nn pos oldValues : ' + oldValues)
        //     // if (newValues[1]) {
        //     //     // $scope.mapCenter = $scope.searchArea;
        //     //     // $scope.markerReady = false;
        //     //     // $scope.zoom = 12;
        //     // } else if (newValues[0]) {
        //     //     var temp = JSON.parse($scope.regionModel.PC);
        //     //     // $scope.mapCenter = [temp.address.coordinates.lat, temp.address.coordinates.lng];
        //     //     // $scope.markerReady = true;
        //     //     // $scope.markerOption = {};
        //     //     // $scope.markerOption.label = temp.name;
        //     // }
        // });

        $scope.getPositionsMap = function (e) {

            $scope.pos = e.latLng;
            $scope.startpointMarker = [e.latLng.lat(), e.latLng.lng()];

        }


        $scope.removeImg = function (index) {
            $scope.merchant.logo = "";

        }
        // Edit member api start here
        $scope.getcategory = function (category) {
            dealService.getCategory(category).then(function (category) {
                $scope.listCategory = category.result.list;

                //  $scope.showDropDown = false;
                $scope.showMapBtn = true;

            });
        }
        $scope.getcategory();
        $scope.editEvent = function () {
            if ($state.current.breadcrumb.text == "Edit") {

                merchantService.getEvent($stateParams.id).then(function (data) {


                    //$scope.getcategory();
                    $scope.merchant = data.result;
                    // $scope.merchant.categories = data.result.categories;
                    $scope.pos = data.result.address.location;
                    $scope.pos = [$scope.pos.lat, $scope.pos.lng];
                    $scope.temp_lat_lng = {
                        "lat": data.result.address.location.lat,
                        "lng": data.result.address.location.lng

                    };


                    console.log($scope.merchant.categories);

                    angular.forEach($scope.merchant.categories, function (val, key) {

                        console.log(val);
                        // $scope.change(true,val);


                        console.log(val);
                        // angular.element('#'.val).triggerHandler('click');

                        //   $scope.selectedCat
                        var getId = _.findIndex($scope.listCategory, function (x) {
                            return x.id === val;
                        });
                        if (getId != -1) {
                            $scope.selectedCat.push($scope.listCategory[getId]);
                            $scope.change(true, val);
                        }


                    });







                    $timeout(function () {

                        angular.forEach($scope.test, function (val, key) {
                            var getCatName = _.find($scope.listCategory, function (x) {
                                console.log(x);
                                return x.id == val;

                            });

                            temp.push({ id: getCatName, name: getCatName.name });


                        });
                        $scope.merchant.categories = temp;

                        $scope.startpointMarker = [data.result.address.location.lat, data.result.address.location.lng];
                    }, 1000)

                    $scope.test = data.result.categories;

                    $scope.showDropDown = false;
                    $scope.DPhotogetImage = true;
                    $scope.baseurlimg = fileurl;

                });
            }
        }
        $scope.editEvent();
        // Edit member api end here
        // Logo Image upload 

        // $scope.checkChecked=function(dataList,id){
        //     console.log(dataList);
        //     console.log(id);

        //     var findId=_.findIndex(dataList,function(x){
        //      return   x === id 
        //     });
        //     if(findId != -1){
        //         return true;
        //         $scope.change(true,id);
        //     }else{
        //         return false ;
        //     }
        //     console.log(findId) ;
        // }

        $scope.baseurlimg = fileurl;


        $scope.deals_Photograph = function () {

            var img_div = angular.element(document.querySelector('#deals_Photograph'));
            img_div.addClass('remove_img');
        }


        $scope.lst = [];
        $scope.change = function (check, value) {
            console.log(check);
            if (check) {
                $scope.lst.push(value);
            } else {
                $scope.lst.splice($scope.lst.indexOf(value), 1);
            }
        };


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
                $scope.merchant.logo = '/containers/images/download/' + $scope.dealAddPhoto.result.result.files.file[0].name;
                $scope.DPhotogetImage = true;
                $scope.showDropDown = false;
                $scope.removeImg = function (index) {
                    $scope.merchant.logo = "";

                }

            }
        };
        // End Image 


        $scope.save = function (merchant) {


            $scope.merchant.categories = $scope.lst;


            var error = 0;




            if (error == 0) {



                if ($state.current.breadcrumb.text == "Create") {
                    $scope.merchant.address.location = {
                        "lat": $scope.pos.lat(),
                        "lng": $scope.pos.lng()

                    }

                    var modifyaddres = [];
                    modifyaddres.push(merchant.address);

                    //  merchant.address = modifyaddres;

                    console.log($scope.merchant);

                    merchantService.createEvent($scope.merchant).then(function (data) {

                        $state.go('merchant');
                        toaster.pop({
                            type: 'success',
                            title: 'Event Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    var galImages = [];



                    if (typeof $scope.pos.lat === "function") {

                        $scope.merchant.address.location = {
                            "lat": $scope.pos.lat(),
                            "lng": $scope.pos.lng()
                        }
                    } else {
                        $scope.merchant.address.location = $scope.temp_lat_lng;
                        //
                    }


                    $scope.event.imageURL = galImages;




                    if ($scope.merchant.password == "" || $scope.merchant.password == undefined) {
                        delete $scope.merchant.password;
                    }

                    merchantService.updateEvents($scope.merchant).then(function (data) {






                        if (data.success === true) {
                            toaster.pop({
                                type: 'success',
                                title: 'Event Updated Successfully',
                                showCloseButton: true

                            });
                            $state.go('merchant');
                        } else {

                            console.log(data.err);
                            toaster.pop({
                                type: 'error',
                                title: data.err.message,
                                showCloseButton: true
                            });
                        }

                    })
                }
            }
        }
    }]);