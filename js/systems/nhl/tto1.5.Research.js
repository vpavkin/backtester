SYSTEMS.TTO_1_5 = $.extend({}, NHL_SYSTEM_BASE, {

	DESCRIPTION: "Team Total Over 1.5 Research. Bets tto1.5 on selected team with 1.2 odds if it's a favourite and 1.3 odds if it's a dog. Not a system, just shows how often teams score 2 or more.",
	NAME: "TTO 1.5",
	postFilter: false,
	isResearch: true,
	process: function(games, context) {
		var res = [];
		var team = FILTERS.team.team;
		if (!team)
			return res;
		games.forEach(function(g) {
			B.NHL.betTeamTotalOver(g, UNIT_SIZE, team, 1.5, B.isFav(g, team) ? 1.2 : 1.3);
			res.push(g)
		});
		return res;
	}
});