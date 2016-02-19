define(['../app', 'marked'], function (app, marked) {
	return app.controller('listCtrl', function ($scope, $http, $templateCache) {
		// $scope.items = [{name: 'A'}, {name: 'B'}];

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
			// alert(id);
			location.href = '#/add/'+id;
		};
		$scope.list();
		
	}).filter('marked', ['$sce',function ($sce) {
		return function (input) {
			return $sce.trustAsHtml(marked(input));
		}
	}]);;
});
