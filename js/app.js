 /**
 * Created by aleduarte06 on 22/08/15.
 */
var mod = angular.module('myapp',['ui.router']); //Creamos un modulo de angular
mod.config(function($stateProvider, $urlRouterProvider){

 $stateProvider
     .state('home',{
         url: '/home',
         templateUrl: 'templates/buscador.html',
         controller: 'buscadorCtrl'
     })

     .state('resultados',{
         url: '/resultados?q',
         templateUrl: 'templates/resultados.html',
         controller: 'resultadosCtrl'
     })
    $urlRouterProvider.otherwise('/home');

});

mod.controller('buscadorCtrl', function($scope,$state,$http){
    console.log('Primer Controlador');
    $scope.busqueda = '';
    $scope.enviar = function(){
        $state.go('resultados',{q:$scope.busqueda})
    }

});

mod.controller('resultadosCtrl', function($scope,$http,$stateParams){
    console.log('Segungo controlador');
    //console.log($stateParams.q);
    var url = 'https://api.mercadolibre.com/sites/MLA/search?q='+ $stateParams.q + '&limit=10';
    console.log(url);
    $http.get(url).then(function(res){
        console.log(res);
        $scope.resultados = res.data.results;

    });

});

