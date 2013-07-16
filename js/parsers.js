var PARSERS = {
	flat: function(output) {
		var res = [];
		var accRes = 0;
		for (var i = 0; i < output.length; i++) {
			for (var j = 0; j < output[i].length; j++) {
				var g = output[i][j];
				accRes += g.result;
				output[i][j].accumulatedResult = Number(accRes.toFixed(2));
				res.push(output[i][j]);
			}
		}
		return res;
	}
}