var BET_TYPE = {
	ML: "ML",
	DOG_SP: "+",
	FAV_SP: "-",
	FAV_SP_RED: "-1",
	OVER: "OVER",
	UNDER: "UNDER",
	NEITHER_RACE_TO: "NEITHER TO"
};

var B = {

	getAmount: function (amount) {
		return (amount == undefined || amount == null) ? UNIT_SIZE : amount;
	},
	clearGame: function (g) {
		g.result = g.takenBet = g.takenTeam = g.takenOdds = g.accumulatedResult = g.betParam = g.betString = null;
	},
	copyGame: function (g) {
		return $.extend({}, g);
	},
	isFavHome: function (g) {
		return g.F == "H";
	},
	getOdds: function (g, place, betType) {
		if (betType == "ML")
			return g[place + "_ML"];
		else if (betType == "DefaultSpread") {
			return g[place + "_S_L"];
		}
		else
			return 0;
	},
	isWithinOddRange: function (g, place, betType, start, end) {
		var odd = B.getOdds(g, place, betType);
		return odd >= start && odd <= end;
	},
	W: function (g, odds) {
		g.result = g.stake * (odds - 1);
	},
	L: function (g) {
		g.result = -g.stake;
	},
	P: function (g) {
		g.result = 0
	},
	WL: function (g, odds, flag) {
		g.takenOdds = odds;
		flag ? B.W(g, odds) : B.L(g);
	},
	WLP: function (g, odds, flag) {
		g.takenOdds = odds;
		if (flag == 1)
			B.W(g, odds);
		else if (flag == 0.5)
			B.P(g);
		else
			B.L(g);
	},
	betHomeML: function (g, amount) {
		g.stake = B.getAmount(amount);
		g.takenTeam = g.H;
		g.takenBet = BET_TYPE.ML;
		g.betString = g.takenTeam + " " + g.takenBet;
		B.WL(g, g.H_ML, g.H_ML_R);
	},
	betRoadML: function (g, amount) {
		g.stake = B.getAmount(amount);
		g.takenTeam = g.R;
		g.takenBet = BET_TYPE.ML;
		g.betString = g.takenTeam + " " + g.takenBet;
		B.WL(g, g.R_ML, g.R_ML_R);
	},
	betHomeSpread: function (g, amount) {
		g.stake = B.getAmount(amount);
		g.takenTeam = g.H;
		g.betParam = g.H_S;
		g.betString = g.takenTeam + " " + UTILS.spreadToString(g.H_S);
		B.WLP(g, g.H_S_L, g.H_S_R);
		if (B.isFavHome(g)) {
			g.takenBet = BET_TYPE.FAV_SP;
		} else {
			g.takenBet = BET_TYPE.DOG_SP;
		}
	},
	betRoadSpread: function (g, amount) {
		g.stake = B.getAmount(amount);
		g.takenTeam = g.R;
		g.betParam = g.R_S;
		g.betString = g.takenTeam + " " + UTILS.spreadToString(g.R_S);
		B.WLP(g, g.R_S_L, g.R_S_R);
		if (B.isFavHome(g)) {
			g.takenBet = BET_TYPE.DOG_SP;
		} else {
			g.takenBet = BET_TYPE.FAV_SP;
		}
	},
	betFavML: function (g, amount) {
		B.isFavHome(g) ?
			B.betHomeML(g, amount) :
			B.betRoadML(g, amount)
	},
	betDogML: function (g, amount) {
		B.isFavHome(g) ?
			B.betRoadML(g, amount) :
			B.betHomeML(g, amount)
	},
	betDogSpread: function (g, amount) {
		B.isFavHome(g) ?
			B.betRoadSpread(g, amount) :
			B.betHomeSpread(g, amount)
	},
	betFavSpread: function (g, amount) {
		B.isFavHome(g) ?
			B.betHomeSpread(g, amount) :
			B.betRoadSpread(g, amount)
	},
	betOver: function (g, amount) {
		g.stake = B.getAmount(amount);
		g.betParam = g["O/U_L"];
		g.takenTeam = "";
		g.takenBet = BET_TYPE.OVER;
		B.WLP(g, g.O_L, g.O_R);
		g.betString = g.takenBet + " " + g.betParam;
	},
	betUnder: function (g, amount) {
		g.stake = B.getAmount(amount);
		g.betParam = g["O/U_L"];
		g.takenTeam = "";
		g.takenBet = BET_TYPE.UNDER;
		B.WLP(g, g.U_L, g.U_R);
		g.betString = g.takenBet + " " + g.betParam;
	},

	MLB: {
		betFavReducedSpread: function (g, amount) {
			g.stake = B.getAmount(amount);
			g.takenBet = BET_TYPE.FAV_SP_RED;
			var homeOverRoad = g["H_R"] - g["R_R"];
			if (B.isFavHome(g)) {
				g.takenTeam = g.H;
				B.WLP(g, g["F-1"], (homeOverRoad > 1) ? 1 : ((homeOverRoad == 1) ? 0.5 : 0));
			} else {
				g.takenTeam = g.R;
				B.WLP(g, g["F-1"], (homeOverRoad < -1) ? 1 : ((homeOverRoad == -1) ? 0.5 : 0));
			}
			g.betString = g.takenTeam + " -1";
		},
		betMinUnder: function (g, amount) {
			g.stake = B.getAmount(amount);
			g.takenTeam = "";
			var newLine = Number(g["O/U_L"]) - 1;
			g.takenBet = BET_TYPE.UNDER;
			g.betParam = newLine.toString();
			B.WLP(g, B.BUY_ONE_TOTAL_POINT_ODDS, (g.T < newLine ? 1 : (g.T == newLine ? 0.5 : 0)));
			g.betString = g.takenBet + " " + g.betParam;
		},
		betMaxOver: function (g, amount) {
			g.stake = B.getAmount(amount);
			g.takenTeam = "";
			var newLine = Number(g["O/U_L"]) + 1;
			g.takenBet = BET_TYPE.OVER;
			g.betParam = newLine.toString()
			B.WLP(g, B.BUY_ONE_TOTAL_POINT_ODDS, (g.T > newLine ? 1 : (g.T == newLine ? 0.5 : 0)));
			g.betString = g.takenBet + " " + g.betParam;
		},

		betNeitherRaceTo: function (g, amount, to, odds) {
			g.stake = B.getAmount(amount);
			g.takenTeam = "";
			g.takenBet = "Neither race to";
			g.betParam = to;
			B.WL(g, odds, g.H_R < to && g.R_R < to);
			g.betString = g.takenBet + " " + g.betParam;
		},

		//todo: refactor buying totals points when it's needed
		betUnderBuy: function (g, buy, amount) {
			if (!buy) {
				B.betUnder(g, amount);
				return
			}

			g.stake = B.getAmount(amount);

			var odds = g.U_L == 1 ? 1.9 : g.U_L;

			var line = g["O/U_L"] + buy;
			if (buy == 0.5) {
				odds = odds * 0.91;
			} else if (buy == 1) {
				odds = odds * 0.83;
			}

			if (g.T < line) {
				B._W(g, odds);
			} else if (g.T == line) {
				B._P(g)
			} else {
				B._L(g);
			}

			g.takenTeam = "";
			g.takenBet = BET_TYPE.UNDER + " " + line;
			g.takenOdds = odds;
		},
		//todo: refactor buying totals points
		betOverBuy: function (g, buy, amount) {
			if (!buy) {
				B.betOver(g, amount);
				return
			}

			g.stake = B.getAmount(amount);
			var odds = g.O_L == 1 ? 1.9 : g.O_L;
			var line = g["O/U_L"] + buy;
			if (buy == -0.5) {
				odds = odds * 0.91;
			} else if (buy == -1) {
				odds = odds * 0.83;
			}

			if (g.T > line) {
				B._W(g, odds);
			} else if (g.T == line) {
				B._P(g)
			} else {
				B._L(g);
			}

			g.takenTeam = "";
			g.takenBet = BET_TYPE.OVER + " " + line;
			g.takenOdds = odds;
		}
	}
}