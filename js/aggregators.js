var AGGREGATORS = {

	_context: function (LEAGUE) {
		var res = {
			seasons: {},
			progressions: new ProgressionManager()
		};
		LEAGUE.SEASONS.forEach(function (season) {
			res.seasons[season] = {stats: {}};
			LEAGUE.TEAMS.forEach(function (team) {
				res.seasons[season].stats[team] = new StatsObject(season);
			});
		});
		return res
	},

	eachGameDay: function (callback) {
		var current_date = "";
		for (var i = 0; i < GAMES.length; i++) {
			if (GAMES[i].D != current_date) {
				callback(GAMES[i].D);
				current_date = GAMES[i].D;
			}
		}
	},

	eachNFLWeek: function (callback) {
		var current_week = "";
		for (var i = 0; i < GAMES.length; i++) {
			if (GAMES[i].W != current_week) {
				callback(GAMES[i].W);
				current_date = GAMES[i].W;
			}
		}
	},

	gamesForDay: function (date) {
		return GAMES.filter(function (item) {
			return item.D == date.toString();
		})
	},

	_daily: function (LEAGUE, system, parser) {
		var context = $.extend(AGGREGATORS._context(LEAGUE), system.context ? system.context() : {});
		var output = [];
		var filteredGames = FILTERS_MANAGER.preFilterGames(GAMES);
		var days = filteredGames.reduce(function (d, game) {
			d[game.D] || (d[game.D] = []);
			d[game.D].push(game);
			return d;
		}, {});

		AGGREGATORS.eachGameDay(function (D) {
			if (days[D]) {
				var res = system.process(days[D], context);
				output.push(system.filterAfter ? FILTERS_MANAGER.afterFilterGames(res) : res);
			}
		});

		return parser(output);
	},

	_custom: function (LEAGUE, system, parser) {
		if (system.updateStats) {
			alert("Custom aggregator can't update stats");
			return;
		}

		var output = [];
		var context = $.extend(AGGREGATORS._context(LEAGUE), system.context ? system.context() : {});
		var filteredGames = FILTERS_MANAGER.preFilterGames(GAMES);
		var seriess = system.prepareGames(filteredGames);
		seriess.forEach(function (s) {
			var res = system.process(s.games, context);
			output.push(system.filterAfter ? FILTERS_MANAGER.afterFilterGames(res) : res);
		});
		return parser(output);
	},

	MLB: {

		daily: function (system, parser) {
			return AGGREGATORS._daily(MLB, system, parser);
		},
		custom: function (system, parser) {
			return AGGREGATORS._custom(MLB, system, parser);
		},
		series: function (system, parser) {
			var context = $.extend(AGGREGATORS.MLB._context(MLB), system.context ? system.context() : {});
			var output = [];
			var filteredGames = FILTERS_MANAGER.preFilterGames(GAMES);
			var days = filteredGames.reduce(function (d, game) {
				d[game.D] || (d[game.D] = []);
				d[game.D].push(game);
				return d;
			}, {});
			var vs = {};
			for (var day in days) {
				days[day].forEach(function (game) {
					var id = game.H + "-" + game.R;
					vs[id] || (vs[id] = []);
					vs[id].push(game);
				});
			}
			var vs_splitted = {};
			for (var p in vs) {
				vs_splitted[p] = vs[p].reduce(function (arr, item) {
					var l;
					var s = arr.last();
					s && (l = s.games.last());
					if (l && UTILS.nearbyDates(UTILS.dateFromString(l.D), UTILS.dateFromString(item.D))) {
						s.addGame(item)
					} else {
						arr.push(new Series([item]));
					}
					return arr;
				}, []);

				vs_splitted[p] = vs_splitted[p].filter(function (item) {
					return item.games.length > 2;
				})
			}
			console.log(vs_splitted);
			//todo
			return output;
		}
	},
	NFL: {

		daily: function (system, parser) {
			return AGGREGATORS._daily(NFL, system, parser);
		},
		weekly: function (system, parser) {
			var context = $.extend(AGGREGATORS._context(NFL), system.context ? system.context() : {});
			var output = [];
			var filteredGames = FILTERS_MANAGER.preFilterGames(GAMES);
			var weeks = filteredGames.reduce(function (d, game) {
				d[game.W] || (d[game.W] = []);
				d[game.W].push(game);
				return d;
			}, {});

			AGGREGATORS.eachNFLWeek(function (D) {
				if (weeks[D]) {
					var res = system.process(weeks[D], context);
					output.push(system.filterAfter ? FILTERS_MANAGER.afterFilterGames(res) : res);
				}
			});

			return parser(output);
		}
	},
	NHL: {

		daily: function (system, parser) {
			return AGGREGATORS._daily(NHL, system, parser);
		}
	},
	NBA: {
		daily: function (system, parser) {
			return AGGREGATORS._daily(NBA, system, parser);
		}
	}
}

