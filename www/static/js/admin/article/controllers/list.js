define(['../app', 'marked'], function (app, marked) {
	return app.controller('listCtrl', function ($scope, $http, $templateCache, $route) {
		// $scope.items = [{name: 'A'}, {name: 'B'}];
		$scope.$route = $route;
		$scope.list = function () {
			$http({
				method: 'GET',
				url: '/admin/article/list',
				// cache: $templateCache
			}).then(function (res) {
				$scope.items = res.data.data.list || 'request failed';
				console.log(res.data.data.list);
				$scope.errno = res.errno;
			});
		};
		$scope.edit = function (id) {
			location.href = '#/add/'+id;
		};
		$scope.list();
		
	});
});
