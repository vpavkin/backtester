SYSTEMS.PP = $.extend({}, MLB_SYSTEM_BASE, {
	NAME: "PP",
	DESCRIPTION: "Home wins% based Percentage Plays",
	BET: BETING_TYPE.PARLAY,
	MM: MM_TYPE.PROGRESSION,
	updateStats: true,
	filterAfter: false,
	_fits: function(team, stats) {
		return stats[team] && stats[team].games > 10 && stats[team].winPercentage() >= 0.54 && stats[team].currentLosingStreak < 3;
	},

	process: function(games, context) {
		var res = [];
		if (!games.length)
			return res;
		var top = (MLB.STATS.homeWinPercentagesDescending(Number(games[0].SEAS) - 1)).filter(function(item) {
			return item.homeWinPercentage > 0.54;
		});
		if (!top.length)
			return res;

		var curParlay = {plays: []};
		var stats = context.seasons[games[0].SEAS].stats;
		for (var i = 0; (i < top.length && res.length < 2); i++) {
			var team = top[i].team;
			if (!this._fits(team, stats))
				continue;

			for (var j = 0; j < games.length; j++) {
				var g = games[j];
				if (g.H == team) {
					B.isFavHome(g) ? B.betHomeML(g) : B.betHomeSpread(g);
					curParlay.plays.push(g);
					if (curParlay.plays.length == 2) {
						res.push(curParlay);
						curParlay = {plays: []}
					}
				}
			}
		}

		res.forEach(function(parlay, index) {
			var _p = context.progressions.resolve(index);
			P.win(parlay, _p.toWinEachStep());

			_p.process(parlay);
			parlay.prg = index + 1;
		});
		return res;
	}
});
