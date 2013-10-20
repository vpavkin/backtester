SYSTEMS.TOTALS_MESS = $.extend({}, MLB_SYSTEM_BASE, {
	NAME: "Neither To 7",
	DESCRIPTION: "Progresion on 4-item parlays on under 7 for both teams",
	BET: BETING_TYPE.PARLAY,
	MM: MM_TYPE.PROGRESSION,
	updateStats: false,
	filterAfter: false,
	UNIT_SIZE: 25,
	N: 3,
	process: function (games, context) {
		var res = [];
		games = MLB.selectFirstGamesEmulated(games, 4);
		var parlay = {plays: []};
		for (var i = 0; i < games.length; i++) {
			var g = games[i];
			B.MLB.betNeitherRaceTo(g, UNIT_SIZE, 7, MLB.NEITHER_RACE_TO_7_ODDS);
			parlay.plays.push(g);
			if (parlay.plays.length == this.N)
				break;
		}
		if (parlay.plays.length < this.N)
			return res;
		var prog = context.progressions.resolve(0);
		P.win(parlay, prog.toWinSeries());
		parlay.prg = 0;
		prog.process(parlay);
		res.push(parlay);
		return res;
	}
});
