SYSTEMS.ML_PARLAY_PROGRESSION = $.extend({}, MLB_SYSTEM_BASE, {

	DESCRIPTION: "Parlay all fitting ML selections of a day, progression",
	NAME: "Parlay progr.: ML",
	BET: BETING_TYPE.PARLAY,
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	process: function(games, context) {
		var parlay = {plays: []};

		games.forEach(function(g) {
			B.betRoadML(g);
			FILTERS_MANAGER.postQualifies(g) && parlay.plays.push(g);
			var another = B.copyGame(g);
			B.betHomeML(another);
			FILTERS_MANAGER.postQualifies(another) && parlay.plays.push(another)
		});
		if (!parlay.plays.length)
			return [];
		var _p = context.progressions.resolve(1, progressions.ToWin);
		P.win(parlay, _p.toWinSeriesAmount());
		_p.process(parlay);
		parlay.prg = 1;
		return [parlay];
	}
});

SYSTEMS.ML_OR_SPREAD_PARLAY_PROGRESSION = $.extend({}, MLB_SYSTEM_BASE, {

	DESCRIPTION: "Parlay all fitting selections of a day, progression",
	NAME: "Parlay progr.: ML or +1.5",
	BET: BETING_TYPE.PARLAY,
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	process: function(games, context) {
		var parlay = {plays: []};

		games.forEach(function(g) {
			var another = B.copyGame(g);
			if (B.isFavHome(g)) {
				B.betRoadSpread(g);
				B.betHomeML(another);
			} else {
				B.betRoadML(g);
				B.betHomeSpread(another);
			}
			FILTERS_MANAGER.postQualifies(g) && parlay.plays.push(g);
			FILTERS_MANAGER.postQualifies(another) && parlay.plays.push(another);
		});
		if (!parlay.plays.length)
			return [];
		var _p = context.progressions.resolve(1, progressions.ToWin);
		P.win(parlay, _p.toWinSeriesAmount());
		_p.process(parlay);
		parlay.prg = 1;
		return [parlay];
	}
});