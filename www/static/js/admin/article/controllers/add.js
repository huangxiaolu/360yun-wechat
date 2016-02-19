define(['../app', 'marked', '../utils/upload'], function (app, marked, upload) {
	return app.controller('addCtrl', function ($scope, $http, $routeParams) {
		$scope.id = $routeParams.id;

		$scope.detail = function () {
			$http({
				method: 'GET',
				url: '/admin/article/detail',
				params: {id: $scope.id}
			}).then(function (res) {
				$scope.content = res.data.data.content || 'request failed';
			});
		};
		$scope.submit = function () {
			var url = $scope.id === undefined? '/admin/article/add': '/admin/article/update'
			$http({
				method: 'POST',
				url: url,
				data: {
					id: $scope.id,
					content: $scope.content
				}
			}).then(function (res) {
				
			});
		};
		$scope.uploadImg = function (e) {
			console.log(e.file);
			// var file = 
			// upload(file);
		};
		if($scope.id) {
			$scope.content = '加载中';
			$scope.detail();
		} else {
			$scope.content = 'hello world';
		}
		$scope.uploadme = function () {
			console.log('fileread');
			console.log($scope.fileread);
		}
	})
	.filter('marked', ['$sce',function ($sce) {
		return function (input) {
			return $sce.trustAsHtml(marked(input));
		}
	}])
	.directive("fileread", [function () {
	    return {
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                scope.$apply(function () {
	                    scope.fileread = changeEvent.target.files[0];
	                 	
	                 	upload(scope.fileread);
	                });
	            });
	        }
	    }
	}]);
});
