SYSTEMS.SIMPLE_TO_WIN = $.extend({}, NHL_SYSTEM_BASE, {

	DESCRIPTION: "Simple ML 'to_win_series' progressions",
	NAME: "To Win ML",
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	TIERS: 3,
	process: function(games, context) {
		var res = [];
		var team = FILTERS.team.team;
		if (!team)
			return res;
		games.forEach(function(g) {
			var p = context.progressions.resolve(g.prg = 0, progressions.ToWin, {toWin: UNIT_SIZE, maxTiers: SYSTEMS.SIMPLE_TO_WIN.TIERS});
			B.betTeamML(g, p.toWinSeriesAmount() / (B.getTeamMLOdds(g, team) - 1), team);
			if (FM.takenOdds(g)) {
				p.process(g);
				res.push(g)
			}
		});
		return res;
	}
});