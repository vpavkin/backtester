SYSTEMS.CLP = $.extend({}, MLB_SYSTEM_BASE, {

	NAME: "CLP",
	DESCRIPTION: "Cliff's Line Picks",
	process: function(games) {
		//todo: refactor this
		var FB = 1.61;
		var FT = 1.64;
		var DB = 1.81;
		var DT = 1.84;

		console.log(FB, FT, DB, DT);
		var res = [];
		for (var i = 0; i < games.length; i++) {
			var g = games[i];
			if (g.H_ML >= FB && g.H_ML <= FT) {
				B.betHomeML(g);
				res.push(g);
			} else if (g.R_ML >= FB && g.R_ML <= FT) {
				B.betRoadML(g);
				res.push(g);
			} else if (g.H_ML >= DB && g.H_ML <= DT) {
				B.betRoadSpread(g);
				res.push(g);
			} else if (g.R_ML >= DB && g.R_ML <= DT) {
				B.betHomeSpread(g);
				res.push(g);
			}
		}
		return res;
	}
});
