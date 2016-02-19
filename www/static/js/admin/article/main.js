require.config({
	paths: {
        marked: '../../libs/marked',
        angular: '../../libs/angular-1.5.0/angular',
        angularRoute: '../../libs/angular-1.5.0/angular-route'
    },
    shim: {
    	'angular': {'exports': 'angular'},
    	'angularRoute': {deps: ['angular']}
    },
    priority: [
    	"angular"
    ]
});

require([
	'angular',
	 'app',
     'controllers/add',
     'routes'
], function (angular) {
	angular.bootstrap(document, ['app']);
});

