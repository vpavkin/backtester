SYSTEMS.XCODE_1_5 = $.extend({}, NHL_SYSTEM_BASE, {

	DESCRIPTION: "XCode system with -1.5 bets for under 1.500 favs (at simulated 2.20 odds)",
	NAME: "XCode -1.5 @2.2",
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	process: function (games, context) {
		var res = [];
		var qualified = this.getStrongestFav(games);
		if (B.getFavMLOdds(qualified) > 1.8)
			return res;
		var p = context.progressions.resolve(qualified.prg = 0, progressions.XCodeProgression);
		if (B.getFavMLOdds(qualified) < 1.5)
			B.betAlternativeSpread(qualified, p.nextAmount(), qualified[qualified.F], -1.5, 2.2);
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
	}
});