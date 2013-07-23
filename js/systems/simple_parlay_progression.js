SYSTEMS.ML_PARLAY_PROGRESSION = $.extend({}, SYSTEM_BASE, {

	DESCRIPTION: "Parlay all fitting ML selections of a day, progression",
	NAME: "Parlay progr.: ML",
	BET: BETING_TYPE.PARLAY,
	MM: MM_TYPE.PROGRESSION,
	filterAfter: false,
	process: function(games, context) {
		var parlay = {plays: []};

		games.forEach(function(g) {
			B.betRoadML(g);
			FILTERS_MANAGER.afterQualifies(g) && parlay.plays.push(g);
			var another = B.copyGame(g);
			B.betHomeML(another);
			FILTERS_MANAGER.afterQualifies(another) && parlay.plays.push(another)
		});
		if (!FILTERS_MANAGER.qualifyParlay(parlay))
			return [];
		var _p = context.progressions.resolve(1);
		P.win(parlay, _p.toWinSeries());
		_p.process(parlay);
		parlay.prg = 1;
		return [parlay];
	}
});