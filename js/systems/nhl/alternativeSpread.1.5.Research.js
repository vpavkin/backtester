SYSTEMS.ALTERNATIVE_SPREAD_1_5 = $.extend({}, NHL_SYSTEM_BASE, {

	DESCRIPTION: "Alternative Spread +1.5 Research. Bets +1.5 on selected team with 1.2 odds if it's a favourite and 1.4 odds if it's a dog. Not a system, just shows how close team keeps its games.",
	NAME: "Alt. Spread +1.5",
	postFilter: false,
	isResearch: true,
	process: function(games, context) {
		var res = [];
		var team = FILTERS.team.team;
		if (!team)
			return res;
		games.forEach(function(g) {
			B.betAlternativeSpread(g, UNIT_SIZE, team, 1.5, B.isFav(g, team) ? 1.2 : 1.4);
			res.push(g)
		});
		return res;
	}
});