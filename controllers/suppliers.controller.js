angular.module('app').controller('suppliersCtrl', function($scope, $rootScope, SuppliersService) {
    function showAlert(text, state) {
        const alert = document.getElementById('alert')
        alert.classList.add('show')
        alert.classList.add(`alert-${state}`)
        alert.innerHTML = text
        setTimeout( function() {
            alert.classList.remove('show')
            alert.classList.remove(`alert-${state}`)
        }, 2000)
    } 
    $scope.suppliers = [];
    $scope.supplier = {};
    SuppliersService.get().then(function (response) {
        $scope.suppliers = response.data ?? []
    });
    $rootScope.$on('cep', function (event, data) {
        $scope.supplier.street = data.logradouro
        $scope.supplier.neigborhood = data.bairro
        $scope.supplier.city = data.cidade
        $scope.supplier.state = data.estado
    })


    $scope.updateSuppliers = function(supplier) {
        if ($scope.addSupplier) {
            SuppliersService.post(supplier).then(function (response) {
                showAlert(
                    'Registro de fornecedor efetuado com sucesso!',
                    'success'
                )
                const newSupplier = {
                    id: response.data.name,
                    ...supplier
                }
                SuppliersService.put(newSupplier).then(function (response) {
                    showAlert(
                        'Registro de fornecedor editado com sucesso!',
                        'success'
                    )
                    SuppliersService.get().then(function (response) {
                       $scope.suppliers = response.data
                    })
                 }),
                $scope.addSupplier = false
             },
             function() {
                showAlert(
                    'Ocorreu um erro ao realizar o registro do fornecedor, por favor tente novamente!',
                    'danger'
                )
             });
        } else if ($scope.editSupplier = true) {
            SuppliersService.put(supplier).then(function (response) {
                showAlert(
                    'Registro de fornecedor editado com sucesso!',
                    'success'
                )
                $scope.editSupplier = false
                SuppliersService.get().then(function (response) {
                    $scope.suppliers = response.data
                })
             },
             function() {
                showAlert(
                    'Ocorreu um erro ao editar o registro do fornecedor, por favor tente novamente!',
                    'danger'
                )
             });
        }
    };

    $scope.dealWithSupplier = function(supplier = false, viewMode = false) {
        if (viewMode) $scope.viewMode = true
        if (supplier) {
            $scope.editSupplier = true
            $scope.supplier = supplier
        } else {
            $scope.addSupplier = true
        }
    };

    $scope.deleteSupplier = function(supplier) {
        SuppliersService.delete(supplier).then(function (response) {
            showAlert(
                'Registro de fornecedor deletado com sucesso!',
                'success'
            )
            SuppliersService.get().then(function (response) {
                $scope.suppliers = response.data ?? []
             })
        },
        function() {
            showAlert(
                'Ocorreu um erro ao deletar o registro de fornecedor, por favor tente novamente!',
                'danger'
            )
        });
    };

    $scope.backToSuppliers = function() {
        $scope.editSupplier = false
        $scope.addSupplier = false
        $scope.viewMode = false
        $scope.supplier = {};
    };
});
