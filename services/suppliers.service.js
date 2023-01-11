
angular.module('app').service('SuppliersService', function($http) {
    this.get = function() {
        return $http.get('https://teste-neomind-default-rtdb.firebaseio.com/suppliers.json')
    }
    this.post = function(supplier) {
        return $http.post(
            'https://teste-neomind-default-rtdb.firebaseio.com/suppliers.json',
            supplier,
            {'Content-type': 'application/json; charset=UTF-8'},
        );
    };
    this.put = function(supplier) {
        return $http.put(
            `https://teste-neomind-default-rtdb.firebaseio.com/suppliers/${supplier.id}.json`,
            supplier,
            {'Content-type': 'application/json; charset=UTF-8'},
        );
    };
    this.delete = function(supplier) {
        return $http.delete(
            `https://teste-neomind-default-rtdb.firebaseio.com/suppliers/${supplier.id}.json`
        );
    };
 });