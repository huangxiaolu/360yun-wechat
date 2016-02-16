require.config({
    paths: {
        angular: '../../libs/angular/angular.min'
    },
    shim: {
        'angular' : {'exports' : 'angular'}
    },
    priority: [
        "angular"
    ]
});

require(['angular',
		 'app',
         'controllers/add',
         'routes'
], function (angular) {
    angular.bootstrap(document, ['app']);
});
