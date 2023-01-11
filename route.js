angular.module('app').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'suppliers.html',
            controller: 'suppliersCtrl'
        });
});