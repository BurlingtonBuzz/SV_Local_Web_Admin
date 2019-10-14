'use strict';

angular.module('inspinia')
    .controller('procategoriesListCtrl', function ($scope, $state, categoryService,procategoryService, toaster, $stateParams) {
        var vm = this;
        // get user list api start here
        // $scope.getprocategory = function () {
        //     procategoryService.getList().then(function (procategory) {
               
        //         $scope.listproCategory = procategory.result.list;
        //         console.log(procategory);
        //     });
        // }
        // $scope.getprocategory();

            // Get List pro and sub categories//
            $scope.getprosubcategory = function () {
                procategoryService.getCategory().then(function (procategory) {
                    console.log(procategory);
                    $scope.listproCategory = procategory.result.list;
                  
                });
            }
            $scope.getprosubcategory();

        // Delete user api start here
        //$scope.prosubcategories.id
        $scope.delete = function (id) {
            
            procategoryService.deleteCategory(id).then(function (data) {
                if (data.result.count == 1) {
                    toaster.success('Pro Category Successfully Deleted!');
                    procategoryService.getCategory().then(function (procategory) {
                        console.log(procategory);
                        $scope.listproCategory = procategory.result.list;
                      
                    });
                } else {
                    toaster.warning('Unable to delete');
                }
            });
        }
        // Delete user api end here

        $scope.edit = function (id) {
            $state.go('procategories.edit', {
                id: id
            });
        }

    });