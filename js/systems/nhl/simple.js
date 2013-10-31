SYSTEMS.ML = $.extend({}, NHL_SYSTEM_BASE, {

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
