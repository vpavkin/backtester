var STATS = {

	updateMultipleStats: function(games, context) {
		for (var j = 0; j < games.length; j++) {
			STATS.updateStats(games[j], context);
		}
	},
	updateStats: function(game, context) {
		var g = game;
		var h = context.seasons[g.SEAS].stats[g.H];
		var r = context.seasons[g.SEAS].stats[g.R];
		h.games++;
		h.pointsScored += g.H_R;
		h.pointsAllowed += g.R_R;
		r.pointsScored += g.R_R;
		r.pointsAllowed += g.H_R;
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
};

var StatsObject = function(season) {
	this.season = season;
	this.losses = this.wins = this.games = this.currentLosingStreak = this.currentWinningStreak = this.pointsScored = this.pointsAllowed = 0;
	this.winPercentage = function() {
		return this.wins / (this.wins + this.losses);
	}
};