SYSTEMS.ALTERNATIVE_SPREAD_3 = $.extend({}, MLB_SYSTEM_BASE, {

	DESCRIPTION: "Alternative Spread +3 Research. Bets +3 on selected team with 1.2 odds. Not a system, just shows how close team keeps its games.",
	NAME: "Alt. Spread +3",
	postFilter: false,
	isResearch: true,
	process: function (games, context) {
		var res = [];
		var team = FILTERS.team.team;
		if (!team)
			return res;
		games.forEach(function (g) {
			B.betAlternativeSpread(g, UNIT_SIZE, team, 3, 1.2);
			res.push(g)
		});
		return res;
	}
});