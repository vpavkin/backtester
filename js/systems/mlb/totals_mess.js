SYSTEMS.TOTALS_MESS = $.extend({}, MLB_SYSTEM_BASE, {
	NAME: "Totals Mess",
	DESCRIPTION: "over+1/under-1 progressions on 3 first games of the day (total 6 progressions)",
	BET: BETING_TYPE.SINGLE,
	MM: MM_TYPE.PROGRESSION,
	updateStats: false,
	postFilter: false,
	UNIT_SIZE: 5,
	N: 3,
	RECOVERY_SERIES_TO_GO: 0,
	RECOVERY_MULTIPLIER: 5,
	//_bet: function(games, gameIndex, progIndex, context, func) {
	//	var g = B.copyGame(games[gameIndex]);
	//	var prog = context.progressions.resolve(g.prg = progIndex);
	//	if ((prog.moneyLost > 10 * UNIT_SIZE)) {
	//		var triple = [g, B.copyGame(games[1]), B.copyGame(games[2])];
	//		triple[1].prg = triple[2].prg = progIndex;
	//		triple.forEach(function(game) {
	//			func(game, prog.toWinEachStepAmount() / (6 * ( B.BUY_ONE_TOTAL_POINT_ODDS - 1)));
	//		});
	//		prog.processMany(triple);
	//		return triple;
	//	} else {
	//		func(g, prog.toWinEachStepAmount() / ( B.BUY_ONE_TOTAL_POINT_ODDS - 1));
	//		prog.process(g);
	//		return [g];
	//	}
	//},

	//process: function(games, context) {
	//	var res = [];
	//	games = FILTERS_MANAGER.selectFirstGamesEmulated(games, 3);
	//	if (games.length < 3)
	//		return res;
	//	for (var i = 0; i < 3; i++) {
	//		res = res.concat(this._bet(games, i, i * 2, context, B.betMinUnder));
	//		res = res.concat(this._bet(games, i, i * 2 + 1, context, B.betMaxOver));
	//	}
	//	return res;
	//}

	_bet: function(games, gameIndex, context, func) {
		var g = B.copyGame(games[gameIndex]);
		var progIndex = gameIndex * 2 + (func == B.MLB.betMinUnder ? 0 : 1);
		var prog = context.progressions.resolve(g.prg = progIndex);
		if (prog.tier == 11) {
			this.RECOVERY_SERIES_TO_GO += 20;
			prog.close();
			prog = context.progressions.resolve(progIndex);
		}
		if (prog.tier == 0 && this.RECOVERY_SERIES_TO_GO > 0) {
			this.RECOVERY_SERIES_TO_GO--;
			prog.toWin *= this.RECOVERY_MULTIPLIER;
			prog.RECOVERY = true;
		}
		if (prog.RECOVERY)
			g.prg += "R";
		//if ((prog.moneyLost > 10 * UNIT_SIZE)) {
		//	var helpers = games.slice(gameIndex * 2 + 3, gameIndex * 2 + 5).reduce(function(arr, item) {
		//		arr.push(B.copyGame(item), B.copyGame(item));
		//		return arr;
		//	}, []);
		//	var toWinEach = prog.toWinEachStepAmount() / (helpers.length + 1);
		//	var toStakeEach = prog.toWinEachStepAmount() / ((helpers.length + 1) * ( B.BUY_ONE_TOTAL_POINT_ODDS - 1));
		//	prog.moneyLost = toWinEach;
		//	func(g, toStakeEach);
		//	prog.process(g);
		//	helpers.forEach(function(helper, helperIndex) {
		//		helper.prg = progIndex + "-" + helperIndex;
		//		var hProgIndex = helperIndex + gameIndex * 2 + 3;
		//		var helperProg = context.progressions.resolve(hProgIndex);
		//		helperProg.toWin = 0;
		//		helperProg.moneyLost += toWinEach;
		//		var f = hProgIndex % 2 ? B.betMinUnder : B.betMaxOver;
		//		f(helper, helperProg.toWinSeriesAmount() / ( B.BUY_ONE_TOTAL_POINT_ODDS - 1));
		//		helperProg.process(helper)
		//	});
		//	return [g].concat(helpers);
		//} else {
		func(g, prog.toWinEachStepAmount() / ( B.BUY_ONE_TOTAL_POINT_ODDS - 1));
		prog.process(g);
		return [g];
		//}
	},

	process: function(games, context) {
		var res = [];
		games = MLB.selectFirstGamesEmulated(games, this.N * 3);
		for (var i = 0; i < this.N; i++) {
			if (!games[i])
				return res;
			res = res.concat(this._bet(games, i, context, B.MLB.betMinUnder));
			res = res.concat(this._bet(games, i, context, B.MLB.betMaxOver));
		}
		return res;
	}
});
