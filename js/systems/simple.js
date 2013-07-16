SYSTEMS.ML = $.extend({}, SYSTEM_BASE, {

	DESCRIPTION: "ML",
	NAME: "ML filtered",
	process: function(games) {
		var res = [];
		games.forEach(function(g) {
			B.betRoadML(g);
			res.push(g);
			var another = B.copyGame(g);
			B.betHomeML(another);
			res.push(another)
		});
		return res;
	}
});

SYSTEMS.ML_OR_SPREAD = $.extend({}, SYSTEM_BASE, {

	DESCRIPTION: "ML or +1.5 filtered",
	NAME: "ML or +1.5",
	process: function(games) {
		var res = [];
		games.forEach(function(g) {
			var another = B.copyGame(g);
			if (B.isFavHome(g)) {
				B.betRoadSpread(g);
				B.betHomeML(another);
				res.push(g, another);
			} else {
				B.betRoadML(g);
				B.betHomeSpread(another);
				res.push(g, another);
			}
		});
		return res;
	}
});
