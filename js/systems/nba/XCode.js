SYSTEMS.XCODE = $.extend({}, NBA_SYSTEM_BASE, {

	DESCRIPTION: "XCode system",
	NAME: "XCode",
	MM: MM_TYPE.PROGRESSION,
	postFilter: false,
	process: function (games, context) {
		var res = [];
		var qualified = this.getBiggestSpread(games);

		var p = context.progressions.resolve(qualified.prg = 0, progressions.XCodeProgression);
		B.betDogSpread(qualified, p.nextAmount());
		p.process(qualified);
		res.push(qualified);
		return res;
	},

	getBiggestSpread: function (games) {
		var qualified = games[0];
		for (var i = 1; i < games.length; i++) {
			if (Math.abs(games[i].H_S) > Math.abs(qualified.H_S))
				qualified = games[i]
		}
		return qualified;
	}
});