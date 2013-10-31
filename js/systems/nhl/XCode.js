SYSTEMS.XCODE = $.extend({}, NHL_SYSTEM_BASE, {

	DESCRIPTION: "XCode system with ML betting only",
	NAME: "XCode",
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	process: function (games, context) {
		var res = [];
		var qualified = this.getStrongestFav(games);
		if (B.getFavMLOdds(qualified) > 1.8)
			return res;
		var p = context.progressions.resolve(qualified.prg = 0, progressions.XCodeProgression);
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