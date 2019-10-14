'use strict';

angular.module('inspinia')

    .controller('wareHouseMapCtrl', ['$scope', '$state', 'NgMap', 'dealService', 'toaster', 'FileUploader', 'configurationService', '$stateParams', '$timeout', 'GeoCoder', '$uibModal', '$log', '$rootScope', '$uibModalInstance', '$controller', function ($scope, $state, NgMap, dealService, toaster, FileUploader, configurationService, $stateParams, $timeout, GeoCoder, $uibModal, $log, $rootScope, $uibModalInstance, $controller) {
        var vm = this;
        $scope.searchArea = "Mumbai";
        var mapVariable;
        var map, x, y, z;
        $scope.showBtn = true;
        var zoomVal = 11;
        var dragupdata = {};
        //alert("12346");
       

        $rootScope.selectedMaparea = {};
        function newMapData(lat, lng) {
            $scope.searchArea = String(lat + ',' + lng);
        }
      
         if ($state.current.breadcrumb.text == "Edit") {
             //console.log("123456");
             $scope.searchArea = $rootScope.savedAddress.area;
         }

        if ($rootScope.selectedMaparea.lat != undefined) {
            $scope.zoom = 11;
            NgMap.getMap('billingmap').then(function (map) {
                mapVariable = map;
                google.maps.event.trigger(mapVariable, 'resize');
            })
        } else {
            $scope.zoom = 11;
            NgMap.getMap('billingmap').then(function (map) {
                mapVariable = map;
                google.maps.event.trigger(mapVariable, 'resize');
            })
        }
        $scope.$watch('searchArea', function (newValues, oldValues) {
            if (newValues) {
                $scope.mapCenter = $scope.searchArea;
                $scope.markerReady = true;
                google.maps.event.trigger(mapVariable, 'resize');
            }
        });


        $scope.ok = function () {
            var latfinall;
            var lngfinall
            var sliptlatlng = $scope.searchArea.split(",");
            GeoCoder.geocode({ address: $scope.searchArea }).then(function (result) {
                if (sliptlatlng[0]) {
                    var typeofval = parseInt(sliptlatlng[0])
                }
                if (isNaN(typeofval) || (typeofval === " ")) {
                    latfinall = Number(result[0].geometry.location.lat());
                    lngfinall = Number(result[0].geometry.location.lng());
                } else {
                    latfinall = Number(sliptlatlng[0]);
                    lngfinall = Number(sliptlatlng[1]);
                }
                $rootScope.selectedMaparea = {
                    lat: latfinall,
                    lng: lngfinall,
                    data: result,
                    message: result[0].formatted_address
                };
                toaster.success($rootScope.selectedMaparea.message + 'added');
                $uibModalInstance.close($rootScope.selectedMaparea);
            });
        };
        $scope.doSth = function () {
            var testlat = Number(this.getPosition().lat());
            var testlng = Number(this.getPosition().lng());
            newMapData(testlat, testlng);
            $scope.showBtn = false;
        }

        $scope.doclick = function (event) {
            var testlat = Number(event.latLng.lat());
            var testlng = Number(event.latLng.lng());
            newMapData(testlat, testlng);
        }
        $scope.cancle = function () {
            $uibModalInstance.dismiss('cancel');
        }
        $timeout(function () {
            $(".pac-container").appendTo($(".testnew987"));
        }, 500);
    }]);    