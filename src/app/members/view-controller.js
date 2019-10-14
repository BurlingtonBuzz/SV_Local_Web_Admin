'use strict';

angular.module('inspinia')

.controller('CustomerViewCtrl', function($scope, $state, $stateParams, CustomerService, DTOptionsBuilder, DTColumnDefBuilder, toaster,configurationService, $location, $rootScope, $timeout, $filter, $mdDialog) {

    // get orders based on user id start
    CustomerService.getOrderByUserId($stateParams.id).then(function(userOrder) {
        $scope.getOrders = userOrder;
      
        // total price count start
        _.each(userOrder,function(value,key){
            $scope.totalItemPrice = _.reduce(value.payload, function(memo, num){ 
                return memo + num.quantity*num.price; }, 0);  
        });
          
        // total price count end

        if ($scope.getOrders.length == 0) {
            toaster.pop({
                type: 'success',
                title: 'Customer Has No Orders',
                showCloseButton: true
            });
        }
    });
    // get orders based on user id end
});
