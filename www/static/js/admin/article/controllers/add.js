define(['../app'], function (app) {
	return app.controller('addCtrl', function ($scope) {
	$scope.content = 'hello world';
	
})
	.filter('marked', ['$sce',function ($sce) {
	return function (input) {
		return $sce.trustAsHtml(marked(input));
	}
}])
});
