define(['../app', 'marked', '../utils/upload'], function (app, marked, upload) {
	return app.controller('addCtrl', function ($scope, $http, $route, $routeParams, fileUpload) {
		$scope.id = $routeParams.id;
		$scope.$route = $route;
		$scope.detail = function () {
			$http({
				method: 'GET',
				url: '/admin/article/detail',
				params: {id: $scope.id}
			}).then(function (res) {
				$scope.title = res.data.data.title;
				$scope.content = res.data.data.content || 'request failed';
			});
		};
		$scope.submit = function () {
			var url = $scope.id === undefined? '/admin/article/add': '/admin/article/update'
			
		};
		$scope.uploadFile = function () {
			var file = $scope.myFile;
			console.log('file is ');
			console.dir(file);
			var uploadUrl = '/admin/upload/post';
			fileUpload.uploadFileToUrl(file, uploadUrl).success(function(resp) {
				console.log(resp.data.path);
			})
			.error(function() {
				
			});
		}
		if($scope.id) {
			$scope.content = '加载中';
			$scope.detail();
		} else {
			$scope.content = '>     请使用markdown语法';
		}
		console.log($scope);
	});
});
