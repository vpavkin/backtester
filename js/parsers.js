var PARSERS = {
	_flatten: function(output) {
		return [].concat.apply([], output);
	},

	flat: function(output) {
		var res = PARSERS._flatten(output);
		var accRes = 0;
		for (var i = 0; i < res.length; i++) {
			var g = res[i];
			accRes += g.result;
			res[i].accumulatedResult = accRes;
		}
		res.isProgression = false;
		return res;
	},

	progression: function(output) {
		var res = PARSERS.flat(output);
		res.isProgression = true;
		return res;
	}
}