define(['angular', 'angularRoute', 'marked'], function (angular, angularRoute, marked) {
    return angular.module('app', ['ngRoute'])
    	.filter('marked', ['$sce',function($sce) {
			return function (input) {
				return $sce.trustAsHtml(marked(input));
			}
		}]);
});