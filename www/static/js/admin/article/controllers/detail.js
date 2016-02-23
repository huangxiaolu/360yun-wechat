define(['../app', 'marked'], function (app, marked) {
	return app.controller('detailCtrl', function ($scope, $http, $templateCache, $routeParams) {
		$scope.id = $routeParams.id;
		console.log($scope.id);
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
		
	}).filter('marked', ['$sce',function ($sce) {
		return function (input) {
			return $sce.trustAsHtml(marked(input));
		}
	}]);;
});
