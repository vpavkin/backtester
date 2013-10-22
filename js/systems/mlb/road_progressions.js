SYSTEMS.ROAD_PROGRESSIONS = $.extend({}, MLB_SYSTEM_BASE, {
	NAME: "Road Progressions",
	DESCRIPTION: "",
	BET: BETING_TYPE.SINGLE,
	MM: MM_TYPE.PROGRESSION,
	AGGREGATOR: AGGREGATOR_TYPE.CUSTOM,
	updateStats: false,
	postFilter: false,
	UNIT_SIZE: 100,

	prepareGames: function (all_games) {
		var output = [];
		var days = all_games.reduce(function (d, game) {
			d[game.D] || (d[game.D] = []);
			d[game.D].push(game);
			return d;
		}, {});
		var vs = {};
		for (var day in days) {
			days[day].forEach(function (game) {
				vs[game.R] || (vs[game.R] = []);
				vs[game.R].push(game);
				vs[game.H] || (vs[game.H] = []);
				vs[game.H].push(game);
			});
		}
		var vs_splitted = {};
		for (var team in vs) {
			vs_splitted[team] = vs[team].reduce(function (arr, item) {
				var s = arr.last();
				var l = s.games.last();
				if (item.R == team) {
					if (!l || UTILS.nearbyDates(UTILS.dateFromString(l.D), UTILS.dateFromString(item.D), 2))
						s.addGame(item);
					else
						arr.push(new Series([item]));
				} else {
					if (s.games.length)
						arr.push(new Series([]));
				}
				return arr;
			}, [new Series([])]);

			vs_splitted[team] = vs_splitted[team].filter(function (item) {
				return item.games.length > 3;
			})
		}
		for (var team in vs_splitted) {
			output.push.apply(output, vs_splitted[team])
		}
		output.sort(function (a, b) {
			return UTILS.compareStringDates(a.startingDate(), b.startingDate())
		});
		return output;
	},

	process: function (games, context) {
		var p = context.progressions.resolve(0, progressions.ToWin);
		var res = [];
		for (var i = 0; i < games.length; i++) {
			var g = games[i];
			g.prg = "";
			B.betHomeML(g, p.toWinSeriesAmount() / (g.H_ML - 1));
			res.push(g);
			p.process(g);
			if (p.closed)
				break;
		}
		if (!p.closed)
			p.closed = true;
		return res;
	}
});
