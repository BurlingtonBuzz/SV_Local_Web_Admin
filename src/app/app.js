'use strict';

angular.module('inspinia', ['ngAnimate', 'angularFileUpload', 'jcs-autoValidate', 'ngCookies', 'ngTouch', 'textAngular', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'datatables', 'ui.footable', 'ngMap', 'vsGoogleAutocomplete', 'toaster', 'ngDraggable', 'ui.router.breadcrumbs', '720kb.datepicker', 'ngToast', 'schemaForm', 'angular.filter', 'ui.bootstrap.datetimepicker', 'angular.filter', 'ui.select', 'pascalprecht.translate', 'ngSchemaFormFile', 'ngMessages', 'ngMaterial', 'sc.select', 'colorpicker.module', 'ui.calendar', 'ui.toggle', 'ngCsvImport', 'pascalprecht.translate', 'ngSchemaFormFile', 'ngPrint', 'chart.js', 'checklist-model'])

    .service('APIInterceptor', function ($cookieStore) {
        var service = this;
        service.request = function (config) {
            if ($cookieStore.get('loginAccess')) {
                config.headers.Authorization = $cookieStore.get('loginAccess').id;
            }
            return config;
        }
    })
    .directive('googleplace', function ($rootScope) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, model) {

                var options = {
                    types: [],
                    componentRestrictions: { country: 'US' }
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {

                    var geoComponents = scope.gPlace.getPlace();
                    console.log(geoComponents);
                    // scope.latitude = geoComponents.geometry.location.lat();
                    // scope.longitude = geoComponents.geometry.location.lng();

                    // var addressComponents = geoComponents.address_components;

                    // scope.finalData = addressComponents;
                    // //console.log(addressComponents);       

                    // addressComponents = addressComponents.filter(function (component) {
                    //     switch (component.types[0]) {
                    //         case "locality": // city
                    //             return true;
                    //         case "administrative_area_level_1": // state
                    //             return true;
                    //         case "country": // country
                    //             return true;
                    //         default:
                    //             return false;
                    //     }
                    // });

                    scope.$apply(function () {
                        model.$setViewValue(element.val());
                        $rootScope.$broadcast('place_changed', geoComponents);

                    });

                });
            },
            controller: function ($scope) {
                // console.log('scope');
            }
        };
    })

    .run(function ($rootScope, $state, $cookieStore, NgMap) {

        NgMap.getMap().then(function (map) {
            $rootScope.map = map;
        });

        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.$state = $state;

            if ($cookieStore.get('loginAccess') == undefined) {
                $rootScope.hideView = true;
                $state.go('login');
            }
        });
        $rootScope.cancel = function () {
            window.history.back();
        };
        $rootScope.redirectSub = '';
        $rootScope.mapLatLngValues = {
            lat: '',
            lng: '',
            data: {},
            message: ''
        };
        $rootScope.tempRoute = {};
        $rootScope.selectedMaparea = {};
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, breadcrumbsProvider, $translateProvider, $mdDateLocaleProvider, ChartJsProvider) {
        ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD-MM-YYYY');
        };

        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'DD-MM-YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $translateProvider.translations('en', {
            'modules.upload.dndNotSupported': 'Drag n drop not surpported by your browser',
            'modules.attribute.fields.required.caption': 'Required',
            'modules.upload.descriptionMultifile': 'Drop your file(s) here',
            'buttons.add': 'Open file browser',
            'modules.upload.field.filename': 'Filename',
            'modules.upload.field.preview': 'Preview',
            'modules.upload.multiFileUpload': 'Multifile upload',
            'modules.upload.field.progress': 'Progress',
            'buttons.upload': 'Upload',
            'modules.upload.descriptionSinglefile': '',
        });

        $translateProvider.preferredLanguage('en');



        $stateProvider.state('login', {
            title: 'B-Buzz',
            url: "/login",
            templateUrl: "app/login/index.html",
            controller: 'loginCtrl'
        })
            .state('logout', {
                url: "/logout",
                controller: 'logoutCtrl',
                templateUrl: "app/logout/index.html"
            })

            .state('dashboard', {
                url: "/dashboard",
                views: {
                    "@": {
                        templateUrl: "app/dashboard/view.html",
                        controller: 'adminDashboardCtrl as adminDashboard'
                    }
                },
                title: 'Welcome To Admin Dashboard ',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Dashboard',
                    stateName: 'dashboard'
                }
            })
            // Pro categories
            .state('prosubprocategories', {
                url: "/prosubprocategories",
                views: {
                    "@": {
                        templateUrl: "app/procategories/list.html",
                        controller: 'prosubcategoriesListCtrl'
                    }
                },
                title: 'Pro sub-Categories List',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'procategories'
                }
            })
            .state('procategories', {
                url: "/procategories",
                views: {
                    "@": {
                        templateUrl: "app/procategories/procategorylist.html",
                        controller: 'procategoriesListCtrl as procategoriesList'
                    }
                },
                title: 'Pro Categories List',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'procategories'
                }
            })
            .state('procategories.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/procategories/create.html",
                        controller: 'procategoriesCreateCtrl as procategoriesCreate'
                    }
                },
                title: 'Pro Categories Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'procategories.create'
                }
            })
            // sub category edit    

            .state('procategories.createproSub', {
                url: "/createproSub",
                views: {
                    "@": {
                        templateUrl: "app/procategories/createproSub.html",
                        controller: 'prosubcategoriesCreateCtrl'
                    }
                },
                title: 'Pro sub-Categories Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'procategories.createproSub'
                }
            })
            .state('procategories.updateProSub', {
                url: "/updateprosub/:id",
                views: {
                    "@": {
                        templateUrl: "app/procategories/createproSub.html",
                        controller: 'prosubcategoriesCreateCtrl'
                    }
                },
                title: 'Pro sub-Categories Update',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'procategories.updateProSub'
                }
            })
            //
            .state('procategories.edit', {

                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/procategories/create.html",
                        controller: 'procategoriesCreateCtrl as procategoriesCreate'
                    }
                },
                title: 'Pro Categories Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'procategories.edit'
                }
            })
            // end 

            // members states start here
            .state('members', {
                url: "/members",
                views: {
                    "@": {
                        templateUrl: "app/members/list.html",
                        controller: 'MemberListCtrl as MemberList'
                    }
                },
                title: 'Members',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'members'
                }
            })
            .state('members.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/members/create.html",
                        controller: 'memberCreateCtrl as memberCreate'
                    }
                },
                title: 'Member Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'members.create'
                }
            })
            .state('members.edit', {

                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/members/create.html",
                        controller: 'memberCreateCtrl as memberCreate'
                    }
                },
                title: 'Member Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'members.edit'
                }
            })
            // members states start here
            // Pro users  start here
            .state('prousers', {
                url: "/prousers",
                views: {
                    "@": {
                        templateUrl: "app/procategories/prouserlist.html",
                        controller: 'proUserListCtrl'
                    }
                },
                title: 'Pro Merchants',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'prousers'
                }
            })
            .state('prousers.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/procategories/prousers.html",
                        controller: 'proUserCreateCtrl'
                    }
                },
                title: ' Pro Service Providers Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'prousers.create'
                }
            })
            .state('prousers.edit', {
                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/procategories/prousers.html",
                        controller: 'proUserCreateCtrl'
                    }
                },
                title: 'Pro Merchants Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'prousers.edit'
                }
            })
            // members states start here

            // Deals states start here
            .state('deals', {
                url: "/deals",
                views: {
                    "@": {
                        templateUrl: "app/deals/list.html",
                        controller: 'dealsListCtrl as dealsList'
                    }
                },
                title: 'Deals',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'deals'
                }
            })
            .state('deals.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/deals/create.html",
                        controller: 'dealsCreateCtrl as dealsCreate'
                    }
                },
                title: 'Deals Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'deals.create'
                }
            })
            .state('deals.edit', {
                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/deals/create.html",
                        controller: 'dealsCreateCtrl as dealsCreate'
                    }
                },
                title: 'Deals Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'deals.edit'
                }
            })
            // brags states start here
            .state('brags', {
                url: "/brags",
                views: {
                    "@": {
                        templateUrl: "app/brags/list.html",
                        controller: 'bragsListCtrl as bragsList'
                    }
                },
                title: 'Brags',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'brags'
                }
            })
            .state('brags.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/brags/create.html",
                        controller: 'bragsCreateCtrl as bragsCreate'
                    }
                },
                title: 'Brags Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'brags.create'
                }
            })
            .state('brags.edit', {
                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/brags/create.html",
                        controller: 'bragsCreateCtrl as bragsCreate'
                    }
                },
                title: 'Brags Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'brags.edit'
                }
            })
            // category starts here
            .state('category', {
                url: "/category",
                views: {
                    "@": {
                        templateUrl: "app/category/list.html",
                        controller: 'categoryListCtrl as categoryList'
                    }
                },
                title: 'Category',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'category'
                }
            })
            .state('category.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/category/create.html",
                        controller: 'categoryCreateCtrl as categoryCreate'
                    }
                },
                title: 'category Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'category.create'
                }
            })
            .state('category.edit', {
                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/category/create.html",
                        controller: 'categoryCreateCtrl as categoryCreate'
                    }
                },
                title: 'category Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'category.edit'
                }
            })
            // category end here
            // Merchant states start here
            .state('merchant', {
                url: "/merchant",
                views: {
                    "@": {
                        templateUrl: "app/merchant/list.html",
                        controller: 'merchantListCtrl as merchantList'
                    }
                },
                title: 'Merchant',
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'merchant'
                }
            })
            .state('merchant.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/merchant/create.html",
                        controller: 'merchantCreateCtrl as merchantCreate'
                    }
                },
                title: 'Merchant Create',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Create',
                    stateName: 'merchant.create'
                }
            })
            .state('merchant.edit', {
                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/merchant/create.html",
                        controller: 'merchantCreateCtrl as merchantCreate'
                    }
                },
                title: 'Merchant Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'merchant.edit'
                }
            })
            //faq
            .state('faq', {
                url: "/faq",
                views: {
                    "@": {
                        templateUrl: "app/faq/list.html",
                        controller: 'faqlistctrl as faqlist'
                    }
                },
                title: "FAQs",
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'faq'
                }
            })
            .state('faq.edit', {

                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/faq/create.html",
                        controller: 'faqCreateCtrl as faqCreate'
                    }
                },
                title: 'faq Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'faq.edit'
                }
            })
            //terms & policy
            .state('termspolicy', {
                url: "/termspolicy",
                views: {
                    "@": {
                        templateUrl: "app/termspolicy/list.html",
                        controller: 'termspolicyctrl as termspolicylist'
                    }
                },
                title: "Terms & Policy",
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'termspolicy'
                }
            })
            .state('termspolicy.edit', {

                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/termspolicy/create.html",
                        controller: 'termspolicyCreateCtrl as termspolicyCreate'
                    }
                },
                title: 'termspolicy Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'termspolicy.edit'
                }
            })
            //notifications
            .state('dealnotification', {
                url: "/dealnotification",
                views: {
                    "@": {
                        templateUrl: "app/notification/dealNotification.html",
                        controller: 'dealNotificationCtrl as dealnotify'
                    }
                },
                title: "Deal Notification",
            })
            .state('pronotification', {
                url: "/pronotification",
                views: {
                    "@": {
                        templateUrl: "app/notification/proNotification.html",
                        controller: 'proNotificationCtrl as pronotify'
                    }
                },
                title: "Pro Notification",
            })
            //support
            .state('support', {
                url: "/support",
                views: {
                    "@": {
                        templateUrl: "app/customersupport/list.html",
                        controller: 'supportctrl as supportlist'
                    }
                },
                title: "Customer Support",
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'support'
                }
            })
            .state('support.edit', {

                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/customersupport/create.html",
                        controller: 'supportCreateCtrl as supportCreate'
                    }
                },
                title: 'support Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'support.edit'
                }
            })

            // Banners
            .state('procategories.createBanner', {
                url: "/createBanner",
                views: {
                    "@": {
                        templateUrl: "app/procategories/createBanner.html",
                        controller: 'advertisementCreateCtrl as procategoriesCreate'
                    }
                },
                title: 'Add Banners',
                breadcrumb: {
                    class: 'highlight',
                    text: ' ',
                    stateName: 'procategories.createBanner'
                }
            })

            .state('allbanners', {
                url: "/allbanners",
                views: {
                    "@": {
                        templateUrl: "app/procategories/createBanner2.html",
                        controller: 'advertisementCreateCtrl2 as procategoriesCreate'
                    }
                },
                title: 'Banners',
                breadcrumb: {
                    class: 'highlight',
                    text: ' ',
                    stateName: 'allbanners'
                }
            })

            .state('advertisement', {

                url: "/advertisement",
                views: {
                    "@": {
                        templateUrl: "app/advertisement/list.html",
                        controller: 'advertisementListCtrl as advertisementList'
                    }
                },
                title: 'Banner List',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Advertisement List',
                    stateName: 'advertisement'
                }
            })

            .state('advertisement.edit', {
                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/advertisement/create.html",
                        controller: 'advertisementCreateCtrl as advertisementCreate'
                    }
                },
                title: 'Edit Advertisement',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'advertisement.edit'
                }
            })


            //About us
            .state('aboutus', {
                url: "/aboutus",
                views: {
                    "@": {
                        templateUrl: "app/aboutus/list.html",
                        controller: 'aboutusctrl as aboutuslist'
                    }
                },
                title: "About us",
                breadcrumb: {
                    class: 'highlight',
                    text: 'List',
                    stateName: 'aboutus'
                }
            })
            .state('aboutus.edit', {

                url: "/edit/:id",
                views: {
                    "@": {
                        templateUrl: "app/aboutus/create.html",
                        controller: 'aboutusCreateCtrl as aboutusCreate'
                    }
                },
                title: 'aboutus Edit',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Edit',
                    stateName: 'aboutus.edit'
                }
            })
            // members states start here
            // helpcenter  Rouuting Start Here

            .state('helpcenterCreate.create', {
                url: "/create",
                views: {
                    "@": {
                        templateUrl: "app/helpcenter/create.html",
                        controller: 'helpcenterCreateCtrl as helpcenterCreate'
                    }
                },
                title: 'Help Center',
                breadcrumb: {
                    class: 'highlight',
                    text: 'create',
                    stateName: 'helpcenterCreate.create'
                }
            })



        // Advertisement Rouuting End HereÓ

        $urlRouterProvider.otherwise('dashboard');
        $httpProvider.interceptors.push('APIInterceptor');
    })