'use strict';

angular.module('inspinia')
    .controller('categoryListCtrl', function ($scope, $state, categoryService, toaster, $stateParams) {
        var vm = this;

        // get user list api start here

        $scope.getcategory = function () {
            categoryService.getCategory().then(function (category) {
               
                $scope.listCategory = category.result.list;

            });
        }
        $scope.getcategory();



        // Delete user api start here
        $scope.delete = function (id) {
            categoryService.deleteCategory(id).then(function (data) {
                if (data.result.count == 1) {
                    toaster.success('Category Successfully Deleted!');
                    categoryService.getCategory().then(function (category) {
                        $scope.listCategory = category.result.list;

                    });
                } else {
                    toaster.warning('Unable to delete');
                }
            });
        }
        // Delete user api end here

        $scope.edit = function (id) {
            $state.go('category.edit', {
                id: id
            });
        }

    });