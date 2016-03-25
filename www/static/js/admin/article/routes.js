define(['app', 'controllers/add', 'controllers/list', 'controllers/detail'],
    function (app, add, list, detail) {
    	var _partPath = '/static/partials/admin/article/';
        return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.
            	when('/add', {
                    templateUrl: _partPath+'add.html', 
                    controller:'addCtrl',
                    activetab: 'add'
                }).
                when('/add/:id', {
                    templateUrl: _partPath+'add.html', 
                    controller:'addCtrl',
                    activetab: 'list'
                }).
                when('/list', {
                    templateUrl: _partPath+'list.html', 
                    controller: 'listCtrl',
                    activetab: 'list'
                }).
                when('/detail/:id', {
                    templateUrl: _partPath+'detail.html', 
                    controller: 'detailCtrl',
                    activetab: 'list'
                }).
               otherwise({redirectTo:'/list'});
        }]);
    });