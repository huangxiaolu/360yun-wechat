define(['../app', 'marked'], function (app, marked) {
	return app.controller('detailCtrl', function ($scope, $http, $templateCache, $route, $routeParams) {
		$scope.id = $routeParams.id;
		$scope.$route = $route;
		$scope.content = '加载中……';
		$scope.detail = function () {
			$http({
				method: 'GET',
				url: '/admin/article/detail',
				params: {id: $scope.id}
				// cache: $templateCache
			}).then(function (res) {
				$scope.content = res.data.data.content || 'request failed';
				
			});
		};
		$scope.edit = function () {
			location.href = '#/add/'+$scope.id;
		};
		$scope.detail();
		
	});
});
