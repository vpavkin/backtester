DATA = {
	games: function(date) {
		return GAMES.filter(function(item) {
			return item.D == date.toString();
		})
	},
	eachGameDay: function(callback) {
		var current_date = "";
		for (var i = 0; i < GAMES.length; i++) {
			if (GAMES[i].D != current_date) {
				callback(GAMES[i].D);
				current_date = GAMES[i].D;
			}
		}
	}
}