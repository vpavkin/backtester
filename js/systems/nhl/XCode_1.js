SYSTEMS.XCODE_1 = $.extend({}, NHL_SYSTEM_BASE, {

	DESCRIPTION: "XCode system with -1 spread bets for under 1.500 favs. Odds are calculated this way: [AH-1] = [ML] * 1.2",
	NAME: "XCode -1",
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	process: function (games, context) {
		var res = [];
		var qualified = this.getStrongestFav(games);
		if (B.getFavMLOdds(qualified) > 1.8)
			return res;
		var p = context.progressions.resolve(qualified.prg = 0, progressions.XCodeProgression);
		if (B.getFavMLOdds(qualified) < 1.5)
			B.betAlternativeSpread(qualified, p.nextAmount(), qualified[qualified.F], -1, this.getReducedSpreadOdds(qualified[qualified.F + "_ML"]));
		else
			B.betFavML(qualified, p.nextAmount());
		p.process(qualified);
		res.push(qualified);
		return res;
	},

	getStrongestFav: function (games) {
		var qualified = games[0];
		for (var i = 1; i < games.length; i++) {
			if (B.getFavMLOdds(games[i]) < B.getFavMLOdds(qualified))
				qualified = games[i]

		}
		return qualified;
	},

	getReducedSpreadOdds: function (ml_odds) {
		return ml_odds * 1.2;
	}
});