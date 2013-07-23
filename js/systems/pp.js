SYSTEMS.PP = $.extend({}, SYSTEM_BASE, {
	NAME: "PP",
	DESCRIPTION: "Home wins% based Percentage Plays",
	BET: BETING_TYPE.PARLAY,
	MM: MM_TYPE.PROGRESSION,
	updateStats: true,
	_fits: function(team, stats) {
		return stats[team] && stats[team].games > 10 && stats[team].winPercentage() >= 0.54 && stats[team].currentLosingStreak < 3;
	},

	process: function(games, context) {
		var res = [];
		if (!games.length)
			return res;
		var top = (STATS.homeWinPercentagesDescending(Number(games[0].SEAS) - 1)).filter(function(item) {
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
			var lost = _p.moneyLost, step = _p.step + 1;

			P.win(parlay, _p.toWinEachStep());
			if (parlay.result > 0) {
				_p.close();
			} else if (parlay.result < 0) {
				_p.advance(parlay.stake);
			}

			parlay.series = _p;
			parlay.prg = index + 1;
			parlay.step = step;
			parlay.seriesResult = _p.closed ? (parlay.result - lost) : -_p.moneyLost;
		});
		return res;
	}
});
