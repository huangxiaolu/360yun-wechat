define(['../app'], function (app) {
		// 文件上传参考：
		// https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
		// 在controller中拿到文件
		// 对应属性: file-model
		app.directive('fileModel', ['$parse', function($parse) {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;
					element.bind('change', function() {
						scope.$apply(function() {
							modelSetter(scope, element[0].files[0]);
						});
						
						var file = element[0].files[0];
						var reader = new FileReader();
						reader.onload = function(e) {
							console.log('onload'); 
							scope.fileSrc = e.target.result;
						}
						reader.readAsDataURL(file);
					});
				}
			};
		}])
		// 发起 multipart/form-data请求
		.service('fileUpload', ['$http', function($http) {
			this.uploadFileToUrl = function(file, uploadUrl) {
				var fd = new FormData();
				fd.append('file', file);
				return $http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			}
		}]);
});