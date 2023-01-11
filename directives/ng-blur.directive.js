angular.module('app').directive('ngBlur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModel) {
            $element.on('blur', function() {
                if (ngModel.$invalid) {
                    $element[0].classList.add('border');
                    $element[0].classList.add('border-danger');
                }
            });
            $element.on('focus', function() {
                $element[0].classList.remove('border');
                $element[0].classList.remove('border-danger');
            });
        }
    }
});