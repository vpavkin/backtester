var AGGREGATORS = {

	_updateDailyStats: function(games, context) {
		for (var j = 0; j < games.length; j++) {
			var g = games[j];
			var h = context.seasons[g.SEAS].stats[g.H];
			var r = context.seasons[g.SEAS].stats[g.R];
			h.games++;
			r.games++;
			if (g.H_ML_R) {
				h.wins++;
				r.losses++;
				h.currentLosingStreak = 0;
				r.currentLosingStreak++;
				h.currentWinningStreak++;
				h.currentWinningStreak = 0;
			} else {
				r.wins++;
				h.losses++;
				r.currentLosingStreak = 0;
				h.currentLosingStreak++;
				r.currentWinningStreak++;
				h.currentWinningStreak = 0;
			}
		}
	},
	_dailyContext: function() {
		var res = {
			seasons: {},
			progressions: new ProgressionManager()
		};
		SEASONS.forEach(function(season) {
			res.seasons[season] = {stats: {}};
			TEAMS.forEach(function(team) {
				res.seasons[season].stats[team] = new StatsObject(season);
			});
		});


		return res
	},

	daily: function(system, parser) {
		var context = $.extend(AGGREGATORS._dailyContext(), system.context ? system.context() : {});
		var output = [];
		var filteredGames = FILTERS_MANAGER.preFilterGames(GAMES);
		var days = filteredGames.reduce(function(d, game) {
			d[game.D] || (d[game.D] = []);
			d[game.D].push(game);
			return d;
		}, {});

		DATA.eachGameDay(function(D) {
			if (days[D])
				output.push(FILTERS_MANAGER.afterFilterGames(system.process(days[D], context)));
			if (system.updateStats)
				AGGREGATORS._updateDailyStats(DATA.games(D), context)
		});

		return parser(output);
	}
}

