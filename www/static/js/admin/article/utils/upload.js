define([], function () {
	function upload(file) {
		var fd = new FormData();
		fd.append('image', file);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/admin/upload/post', true);
		xhr.onprogress = function () {
			
		};
		xhr.onload = function (res) {
			console.log(res);
		};
		xhr.send(fd);
	}
	return upload;
});