var PARLAY_UI = $.extend({}, UI_BASE, {

	makeGamesTable: function(games) {
		var me = this;
		var r = this.makeGamesTableHeader(games);
		games.forEach(function(g) {
			r += "<tr>" +
				me._progressionCells1(games, g) +
				me.td(g.D) +
				me.td(g["takenBetHTML"]) +
				me.td(g["stake"].toFixed(2)) +
				me.td(g["takenOdds"].toFixed(2)) +
				me.td(g["result"].toFixed(2), (g["result"] >= 0 ? "green" : "red")) +
				me._progressionCells2(games, g) +
				me.td(g["accumulatedResult"].toFixed(2), (g["accumulatedResult"] > 0 ? "green" : "red")) +
				"</tr>";
		});
		return r;
	},
	makeGamesTableHeader: function(games) {
		return "<tr>" +
			this._progressionHeaders1(games) +
			"<th title='Date'>Date</th>" +
			"<th title='Taken bet'>Taken</th>" +
			"<th title='Bet amount in $'>Stake</th>" +
			"<th title='Odds'>Odds</th>" +
			"<th title='Bet result in $'>Result</th>" +
			this._progressionHeaders2(games) +
			"<th title='Accumulated result with current bet'>Accumulated result</th>" +
			"</tr>"
	},
	makeMonthStatsTable: function(results) {

		var wonLostByMonth = {};
		results.forEach(function(g) {
			var val = g.result;
			(val != 0) && (wonLostByMonth[g.M] || (wonLostByMonth[g.M] = {won: 0, lost: 0, result: 0}));
			if (val > 0) {
				wonLostByMonth[g.M].won++;
				wonLostByMonth[g.M].result += val;
			} else if (val < 0) {
				wonLostByMonth[g.M].lost++;
				wonLostByMonth[g.M].result += val;
			}
		});

		var r = '<tr><th>Month:</th><th>Won</th><th>Lost</th><th>Win %</th><th>Res</th></tr>';
		for (var i = 1; i <= 12; i++) {
			var o;
			if (o = wonLostByMonth[i]) {
				r += "<tr>" +
					this.td(this.monthName(i)) +
					this.td(o.won) +
					this.td(o.lost) +
					this.td((100 * o.won / (o.won + o.lost)).toFixed(2) + "%") +
					this.td(o.result.toFixed(1), o.result >= 0 ? "green" : "red") +
					"</tr>";
			}
		}
		return r;
	},

	makeOddsTable: function(results) {
		return FLAT_UI.makeOddsTable(results);
	},
	makeMainStatsTable: function(results) {
		return FLAT_UI.makeMainStatsTable(results);
	},
	makeMainStatsStructure: function() {
		return FLAT_UI.makeMainStatsStructure();
	},
	fill: function(res) {
		$("#stats").html(this.makeMainStatsTable(res));
		$("#stats-month").html(this.makeMonthStatsTable(res));
		$("#stats-odds").html(this.makeOddsTable(res));
		$("#games").html(this.makeGamesTable(res));
		this.activate();
	}
});