SYSTEMS.ML_PARLAY = $.extend({}, MLB_SYSTEM_BASE, {

	DESCRIPTION: "Parlay all fitting ML selections of a day",
	NAME: "Day parlay: ML",
	BET: BETING_TYPE.PARLAY,
	postFilter: false,
	process: function(games) {
		var parlay = {plays: []};
		games.forEach(function(g) {
			B.betRoadML(g);
			FILTERS_MANAGER.postQualifies(g) && parlay.plays.push(g);
			var another = B.copyGame(g);
			B.betHomeML(another);
			FILTERS_MANAGER.postQualifies(another) && parlay.plays.push(another)
		});
		if (parlay.plays.length) {
			P.risk(parlay, UNIT_SIZE);
			return [parlay];
		}
		return []
	}
});

SYSTEMS.ML_OR_SPREAD_PARLAY = $.extend({}, MLB_SYSTEM_BASE, {

	DESCRIPTION: "Parlay all fitting ML or Dog spread selections of a day respectively",
	NAME: "Day parlay: ML or Dog spread",
	BET: BETING_TYPE.PARLAY,
	postFilter: false,
	process: function(games) {
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
		if (parlay.plays.length) {
			P.risk(parlay, UNIT_SIZE);
			return [parlay];
		}
		return []
	}
});
