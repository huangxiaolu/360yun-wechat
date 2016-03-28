/*!
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 */
 /**
 ** Modified by huangxiaolu
 ** 改造Rotate，使其返回旋转后的图片的datauri。而不是直接旋转。
 **/
(function() {
	var Rotate = (function() {
		
		function radians(angle) {
			if (typeof angle == 'number') return angle;
			return {
				rad: function(z) {
					return z;
				},
				deg: function(z) {
					return Math.PI / 180 * z;
				}
			}[String(angle).match(/[a-z]+$/)[0] || 'rad'](parseFloat(angle));
		}
		
		var HAS_CANVAS = (function() {
			var canvas = document.createElement('canvas');
			return !!(canvas && canvas.getContext);
		})();
		
		var HAS_FILTER = (function() {
			return document.createElement('span').style.filter !== undefined;
		})();
		
		return function(imgSrc, angle, callback) {

			angle = radians(angle);
		
			var sin = Math.sin(angle);
			var cos = Math.cos(angle);
			
			var img = new Image();

			img.onload = function() {

				if (HAS_CANVAS) return (function() {
					
					img.style.visibility = 'hidden';
					
					// var loader = new Image();
					
					// loader.onload = function() {
					
					var sin = Math.sin(angle);
					var cos = Math.cos(angle);
				
					var canvas = document.createElement('canvas');
					
					var imgWidth = img.width;
					var imgHeight = img.height;
					
					// calculate the needed space
					var fullWidth = Math.abs(sin) * imgHeight + Math.abs(cos) * imgWidth;
					var fullHeight = Math.abs(cos) * imgHeight + Math.abs(sin) * imgWidth;
					
					// safari 2 requires setAttribute
					canvas.setAttribute('width', fullWidth);
					canvas.setAttribute('height', fullHeight);
					canvas.style.visibility = 'hidden';
					// in safari 2 the canvas has to be added to the dom before it is drawn into
					// 这行不要了：img.parentNode.replaceChild(canvas, img);
					// 替换成下面这行：
					document.body.appendChild(canvas);

					var g = canvas.getContext('2d');
					
					// makes everything relative to the center, effectively creating a grid
					g.translate(fullWidth / 2, fullHeight / 2)
					g.rotate(angle);
					
					// rotates the image over its center point
					g.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
					
					//save the rotated img
					var dataURL = canvas.toDataURL();
					// return dataURL;
					if(callback) {
						callback(dataURL);
					}
				})();
				
				// if (HAS_FILTER) return (function() {
				
				// 	img.style.filter = [
				// 		'progid:DXImageTransform.Microsoft.Matrix(M11="',
				// 			cos,
				// 		'", M12="',
				// 			-sin,
				// 		'", M21="',
				// 			sin,
				// 		'", M22="',
				// 			cos,
				// 		'", sizingMethod="auto expand")'
				// 	].join('');
					
				// })();
			};
			img.src = imgSrc;
			
		};
		
	})();

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = Rotate;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return Rotate; });
} else {
  this.Rotate = Rotate;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());