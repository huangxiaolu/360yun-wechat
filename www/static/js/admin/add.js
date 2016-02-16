var addApp = angular.module('addApp', []);

addApp.controller('addCtrl', function ($scope) {
	$scope.content = 'hello world';
	$scope.parse = function  (argument) {
		// body...
	}
});
addApp.filter('marked', ['$sce',function ($sce) {
	return function (input) {
		return $sce.trustAsHtml(marked(input));
	}
}])