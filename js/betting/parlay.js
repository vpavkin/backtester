var P = $.extend({}, B, {
	clearGame: function(p) {
		p.games.forEach(B.clearGame);
	},
	copyGame: function(p) {
		p.games = p.games.map(B.copyGame);
	},
	_odds: function(p) {
		return p.plays.reduce(function(odds, game) {

			return odds * game.takenOdds
		}, 1);
	},
	_takenBet: function(p) {
		return p.plays.reduce(function(takenBet, game) {
			return takenBet + (takenBet ? "+" : "") + game.takenTeam + " " + game.takenBet;
		}, "");
	},
	_takenBetHTML: function(p) {
		return p.plays.reduce(function(takenBet, game) {
			return takenBet + (takenBet ? "+" : "") + "<span class='" + B.getClass(game.result) + "'>" + game.takenTeam + " " + game.takenBet + "</span>";
		}, "");
	},
	_result: function(p) {
		return p.plays.reduce(function(result, game) {
			if (game.result > 0)
				return result * game.takenOdds;
			else if (game.result == 0)
				return result;
			else
				return 0
		}, p.stake) - p.stake;
	},
	risk: function(p, amount) {
		p.D = p.plays[0].D;
		p.stake = P.getAmount(amount);
		p.takenOdds = this._odds(p);
		p.takenTeam = "";
		p.takenBet = this._takenBet(p);
		p.takenBetHTML = this._takenBetHTML(p);
		p.result = this._result(p);
	},
	win: function(p, amount) {
		this.risk(p, amount / (this._odds(p) - 1));
	}
});