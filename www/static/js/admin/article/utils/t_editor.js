define([], function () {
	function insertText (oField) {
		var pos = 0;
//http://www.cnblogs.com/TheViper/p/4629884.html
//http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
		if(document.selection) {
			oField.focus();

			var oSel = document.selection.createRange();

			oSel.moveStart('character', -oField.value.length);

			pos = oSel.text.length;
		} else if (oField.selectionStart || oField.selectionStart == '0') {
    		pos = oField.selectionStart;
    	}

	}
});