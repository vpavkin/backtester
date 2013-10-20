SYSTEMS.SPREAD = $.extend({}, NBA_SYSTEM_BASE, {

	DESCRIPTION: "Spread filtered",
	NAME: "Spread",
	process: function (games) {
		var res = [];
		games.forEach(function (g) {
			var another = B.copyGame(g);
			B.betRoadSpread(g);
			res.push(g);
			B.betHomeSpread(another);
			res.push(another)
		});
		return res;
	}
});