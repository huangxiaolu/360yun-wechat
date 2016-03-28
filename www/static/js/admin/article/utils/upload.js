define(['../app', 'Rotate', 'EXIF'], function (app, Rotate, EXIF) {		
		app

		// 文件上传参考：
		// https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
		// 在controller中拿到文件
		// 对应属性: file-model

		.directive('fileModel', ['$parse', 'rotateImg', function($parse, rotateImg) {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;//这个函数的作用是？
					element.bind('change', function() {
						var file = element[0].files[0];
						var reader = new FileReader();
						reader.onload = function(e) {
							var arrayBuffer = e.target.result;
							// fileUpload.uploadFileToUrl();
							rotateImg.autoRotateImg(arrayBuffer, file).then(
								function(dataURL) {
									
									scope.fileSrc = dataURL;
									// scope.$apply(); //需要调用这个使得其它地方更新model
								}
							);
						}
						// reader.readAsDataURL(file);
						reader.readAsArrayBuffer(file);
						scope.$apply(function() {
							modelSetter(scope, file);
						});
						
					});
				}
			};
		}])
		// 上传之前，预览的时候就根据exif信息旋转图片。
		// 再上传到服务器端。
		.service('rotateImg', ['$q', function($q) {
			this.autoRotateImg = function(arrayBuffer, file) {
				var deferred = $q.defer();
				var oExif = EXIF.readFromBinaryFile(arrayBuffer);
				var orientation = oExif.Orientation;
				var deg = '';
				switch(orientation) {
					case 6:
						deg = '90deg';
						break;
					case 3:
						deg = '180deg';
						break;
					case 8:
						deg = '270deg';
						break;
				}
				if(deg) {
					var reader = new FileReader();
					reader.onload = function(e) {
						var dataURL = e.target.result;
						
						Rotate(dataURL, deg, function(rotatedDataURL) {
							deferred.resolve(rotatedDataURL);
						});
					}
					reader.readAsDataURL(file);
				} else {
					// deferred.resolve(binaryString);
				}
				return deferred.promise;
			};
		}])
		// 发起 multipart/form-data请求
		.service('fileUpload', ['$http', function($http) {
			this.uploadFileToUrl = function(file, uploadUrl) {
				var fd = new FormData();
				fd.append('file', file);console.log('start upload');
				return $http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			}
		}]);
});