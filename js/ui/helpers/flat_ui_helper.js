var FLAT_UI = $.extend({}, UI_BASE, {

	makeGamesTable: function(games) {
		var me = this;
		var r = this.makeGamesTableHeader(games);
		games.forEach(function(g) {
			r += "<tr>" +
				me._progressionCells1(games, g) +
				me.td(g.D) +
				me.td(g.H) +
				me.td(g.R) +
				me.td(g["H_ML"]) +
				me.td(g["R_ML"]) +
				me.td(g["U+1.5"]) +
				me.td(g["F-1"]) +
				me.td(g["O/U_L"]) +
				me.td(g["O_L"]) +
				me.td(g["U_L"]) +
				me.td(g["H_R"]) +
				me.td(g["R_R"]) +
				me.td(g["T"]) +
				me.td(g["takenTeam"] + " " + g["takenBet"]) +
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
			"<th title='Home'>Home</th>" +
			"<th title='Road'>Road</th>" +
			"<th title='Home ML Odds'>H ML</th>" +
			"<th title='Road ML Odds'>R ML</th>" +
			"<th title='Dog +1.5 odds'>Dog +1.5</th>" +
			"<th title='Fav -1 odds'>Fav -1</th>" +
			"<th title='O/U line'>O/U</th>" +
			"<th title='Over odds'>O odds</th>" +
			"<th title='Under Odds'>U odds</th>" +
			"<th title='Runs scored Home'>H Runs</th>" +
			"<th title='Runs scored Road'>R Runs</th>" +
			"<th title='Total runs'>Total</th>" +
			"<th title='Taken bet'>Taken</th>" +
			"<th title='Bet amount in $'>Stake</th>" +
			"<th title='Odds'>Odds</th>" +
			"<th title='Bet result in $'>Result</th>" +
			this._progressionHeaders2(games) +
			"<th title='Accumulated result with current bet'>Accumulated result</th>" +
			"</tr>"
	},
	makeDayStatsTable: function(results) {
		var wonLostByDay = {};
		results.forEach(function(g) {
			var val = g.result;
			(val != 0) && (wonLostByDay[g.DoW] || (wonLostByDay[g.DoW] = {won: 0, lost: 0, result: 0}));
			if (val > 0) {
				wonLostByDay[g.DoW].won++;
				wonLostByDay[g.DoW].result += val;
			} else if (val < 0) {
				wonLostByDay[g.DoW].lost++;
				wonLostByDay[g.DoW].result += val;
			}

		});

		var r = '<tr><th>Day:</th><th>Won</th><th>Lost</th><th>Win %</th><th>Res</th></tr>';
		for (var i = 1; i <= 7; i++) {
			var o;
			if (o = wonLostByDay[i]) {
				r += "<tr>" +
					this.td(this.dayName(i)) +
					this.td(o.won) +
					this.td(o.lost) +
					this.td((100 * o.won / (o.won + o.lost)).toFixed(2) + "%") +
					this.td(o.result.toFixed(1), o.result >= 0 ? "green" : "red") +
					"</tr>";
			}
		}
		return r;
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
	makeConsLossesTable: function(results) {

		var lostInARow = 0;
		var lostInARowStats = {};
		results.forEach(function(g) {
			var val = g.result;
			if (val > 0) {
				if (lostInARow) {
					lostInARowStats[lostInARow] = lostInARowStats[lostInARow] ? lostInARowStats[lostInARow] + 1 : 1;
					lostInARow = 0;
				}
			} else if (val < 0) {
				lostInARow++;
			}
		});

		var r = '<tr><th colspan="2">Consecutive losses</th></tr>';
		for (var i = 0; i < 100; i++) {
			if (lostInARowStats[i]) {
				r += "<tr><th>" + i + "</th><td>" + lostInARowStats[i] + "</td></tr>";
			}
		}
		return r;
	},
	makeOddsTable: function(results) {
		var r = '<tr><th>Odds</th><th>Won</th><th>Lost</th><th>Win %</th><th>Res</th></tr>';
		var odds = {};
		results.forEach(function(g) {
			var taken = (Math.floor(10 * g.takenOdds) / 10).toFixed(2);
			!odds[taken] && (odds[taken] = {won: 0, lost: 0, result: 0});
			odds[taken].result += g.result;
			if (g.result > 0) {
				odds[taken].won++;
			} else if (g.result < 0) {
				odds[taken].lost++;
			}
		});
		for (var i = 1; i < 3; i += 0.1) {
			var taken = i.toFixed(2);
			if (odds[taken]) {
				r += "<tr><th>" + taken + "-<br/>" + (i + 0.1).toFixed(2) + "</th>" +
					this.td(odds[taken].won) +
					this.td(odds[taken].lost) +
					this.td((100 * odds[taken].won / (odds[taken].won + odds[taken].lost)).toFixed(2) + "%") +
					this.td(odds[taken].result.toFixed(1), odds[taken].result >= 0 ? "green" : "red") +
					"</tr>";
			}
		}
		return r;
	},
	makeBetsTable: function(results) {
		var r = '<tr><th>Bet</th><th>Won</th><th>Lost</th><th>Win %</th></tr>';
		var bets = {};
		results.forEach(function(g) {
			var taken = g.takenBet;
			!bets[taken] && (bets[taken] = {won: 0, lost: 0});
			if (g.result > 0) {
				bets[taken].won++;
			} else if (g.result < 0) {
				bets[taken].lost++;
			}
		});
		for (var i = 1; i < 20; i += 0.5) {
			var taken = "OVER " + ((i - Math.floor(i) > 0) ? i.toFixed(1) : i);
			if (bets[taken]) {
				r += "<tr><th>" + taken + "</th><td>" + bets[taken].won + "</td><td>" + bets[taken].lost + "</td><td>" + (100 * bets[taken].won / (bets[taken].won + bets[taken].lost)).toFixed(2) + "%</td></tr>";
			}
		}
		for (var i = 1; i < 20; i += 0.5) {
			var taken = "UNDER " + ((i - Math.floor(i) > 0) ? i.toFixed(1) : i);
			if (bets[taken]) {
				r += "<tr><th>" + taken + "</th><td>" + bets[taken].won + "</td><td>" + bets[taken].lost + "</td><td>" + (100 * bets[taken].won / (bets[taken].won + bets[taken].lost)).toFixed(2) + "%</td></tr>";
			}
		}
		return r;
	},
	makeMainStatsTable: function(results) {
		var odds = 0, won = 0, lost = 0, lostInARow = 0, staked = 0;
		var lostInARowStats = {};
		results.forEach(function(g) {
			var val = g.result;
			odds += g.takenOdds;
			staked += g.stake;
			if (val > 0) {
				won++;
				if (lostInARow) {
					lostInARowStats[lostInARow] = lostInARowStats[lostInARow] ? lostInARowStats[lostInARow] + 1 : 1;
					lostInARow = 0;
				}
			} else if (val < 0) {
				lost++;
				lostInARow++;
			}
		});
		var t = $(this.makeMainStatsStructure());
		t.find("#td-bets-won").html(won);
		t.find("#td-bets-lost").html(lost);
		t.find("#td-win-percentage").html((100 * won / (won + lost)).toPrecision(4) + "%");
		t.find("#td-average-odds").html((odds / results.length).toFixed(2));
		var acc = results[results.length - 1].accumulatedResult;
		t.find("#td-roi").html((100 * acc / staked).toPrecision(4) + "%");
		t.find("#td-result").html(acc.toFixed(2)).addClass(acc >= 0 ? "green" : "red");


		var maxLossesInARow = 0;
		for (var i = 0; i < 1000; i++) {
			if (lostInARowStats[i]) {
				maxLossesInARow = i;
			}
		}
		t.find("#td-max-losses-row").html(maxLossesInARow);
		return t;
	},
	makeMainStatsStructure: function() {
		return '<tr>' +
			'<th colspan="2">Stats:</th>' +
			'</tr><tr>' +
			'<th>Result:</th>' +
			'<td id="td-result"></td>' +
			'</tr><tr>' +
			'<th>Bets Won</th>' +
			'<td id="td-bets-won" class="green"></td>' +
			'</tr><tr>' +
			'<th>Bets Lost</th>' +
			'<td id="td-bets-lost" class="red"></td>' +
			'</tr><tr>' +
			'<th>Win %</th>' +
			'<td id="td-win-percentage"></td>' +
			'</tr><tr>' +
			'<th>ROI</th>' +
			'<td id="td-roi"></td>' +
			'</tr><tr>' +
			'<th>Average odds</th>' +
			'<td id="td-average-odds"></td>' +
			'</tr><tr>' +
			'<th>Max losses in a row</th>' +
			'<td id="td-max-losses-row"></td>' +
			'</tr>';
	},
	fill: function(res) {
		$("#stats").html(this.makeMainStatsTable(res));
		$("#consecutive-losses").html(this.makeConsLossesTable(res));
		$("#stats-day").html(this.makeDayStatsTable(res));
		$("#stats-month").html(this.makeMonthStatsTable(res));
		$("#stats-odds").html(this.makeOddsTable(res));
		$("#stats-bets").html(this.makeBetsTable(res));
		$("#games").html(this.makeGamesTable(res));
		this.activate();
	}
});