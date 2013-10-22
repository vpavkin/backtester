SYSTEMS.PP = $.extend({}, NFL_SYSTEM_BASE, {
	NAME: "PP",
	DESCRIPTION: "",
	BET: BETING_TYPE.PARLAY,
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,

	process: function (games, context) {
		var res = [];
		if (games.length < 2)
			return res;
		games.sort(function (a, b) {
			return Math.abs(a.H_S) - Math.abs(b.H_S);
		});
		var curParlay = {plays: []};
		for (var i = 0; i < 2; i++) {
			var g = games[i];
			if (g.H_S < 0)
				B.betRoadSpread(g);
			else
				B.betHomeSpread(g);
			curParlay.plays.push(g)
		}
		var _p = context.progressions.resolve(1);
		P.win(curParlay, _p.toWinSeriesAmount());
		_p.process(curParlay);
		curParlay.prg = 1;
		return [curParlay];
	}
});
