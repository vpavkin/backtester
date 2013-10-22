SYSTEMS.SIMPLE_ABC = $.extend({}, NHL_SYSTEM_BASE, {

	DESCRIPTION: "Simple ML ABC progressions",
	NAME: "ABC ML",
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	process: function(games, context) {
		var res = [];
		var team = FILTERS.team.team;
		if (!team)
			return res;
		games.forEach(function(g) {
			var p = context.progressions.resolve(g.prg = 0, progressions.Fixed, {amounts: [1, 3, 6]});
			B.betTeamML(g, p.nextAmount(), team);
			if (FM.takenOdds(g)) {
				p.process(g);
				res.push(g)
			}
		});
		return res;
	}
});