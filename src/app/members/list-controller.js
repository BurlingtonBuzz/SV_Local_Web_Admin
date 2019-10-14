'use strict';

angular.module('inspinia')
    .controller('MemberListCtrl', function ($scope, $state,FileUploader, memberService, toaster, $stateParams) {
        var vm = this;

        // get user list api start here
        // $scope.exportToExcel = function () {
        //     var blob = new Blob([document.getElementById('tableToExport').innerHTML], {
        //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        //     });
        //     saveAs(blob, "UsersList.xls");
        // };
        $scope.getMembersList = function () {
            memberService.getList().then(function (data) {
                $scope.users = data;
                 console.log($scope.users);
            });
        }
        $scope.getMembersList();

        // get user list api end here

        /********************Excel start  ***********************/
        $scope.exportToExcel = function () {
            alasql('SELECT * INTO XLSX("myinquires.xlsx",{headers:true}) \
                    FROM HTML("#tableToExport",{headers:true})');
        };
        /********************Excel end  ***********************/

        // Delete user api start here
        $scope.delete = function (id) {
            memberService.deleteMember(id).then(function (data) {
                if (data.result.count == 1) {
                    toaster.success('Member Successfully Deleted!');
                    memberService.getList().then(function (data) {
                        $scope.users = data;
                    });
                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete user api end here

        $scope.edit = function (id) {
            $state.go('members.edit', {
                id: id
            });
        }
    });