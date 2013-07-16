var AGGREGATORS = {
	daily: function(system, resultsGetter) {
		var context = {};
		var output = [];
		var filteredGames = FILTERS_MANAGER.preFilterGames(GAMES);
		var days = filteredGames.reduce(function(d, game) {
			d[game.D] || (d[game.D] = []);
			d[game.D].push(game);
			return d;
		}, {});

		for (var d in days) {
			output.push(FILTERS_MANAGER.afterFilterGames(system.process(days[d], context)));
		}
		return resultsGetter(output);
	}
}

