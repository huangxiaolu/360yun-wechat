define(['app', 'controllers/add'],
    function (app, add ) {

        return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.
                when('/admin/article/#/add', {templateUrl:'partials/admi/article/add.html', controller:add}).
               otherwise({redirectTo:'/'});
              /*  $locationProvider.html5Mode(true);*/
        }]);
    });