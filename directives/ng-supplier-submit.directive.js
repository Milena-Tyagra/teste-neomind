angular.module('app').directive('ngSupplierSubmit', function() {
    return {
        restrict: 'E',
        require: '^form',
        scope: {
            submit: '&',
        },
        template: '<button type="submit" class="btn btn-primary">Salvar</button>',
        link: function($scope, $element, $attrs, formCtrl) {
            $element.on('click', function() {
                if (formCtrl.$valid) {
                    $scope.submit();
                }
                else {
                    document.getElementById('alert').classList.add('show')
                    document.getElementById('alert').classList.add('alert-danger')
                    document.getElementById('alert').innerHTML = 'Verifique os dados e tente novamente'
                    setTimeout( function() {
                        document.getElementById('alert').classList.remove('show')
                        document.getElementById('alert').classList.remove('alert-danger')
                    }, 2000)
                }
            });
        }
    }
});