var BET_TYPE = {
	ML: "ML",
	POS_SP: "+1.5",
	NEG_SP: "-1.5",
	NEG_SP_RED: "-1",
	OVER: "OVER",
	UNDER: "UNDER"
};

var B = {

	getAmount: function(amount) {
		return (amount == undefined || amount == null) ? UNIT_SIZE : amount;
	},
	clearGame: function(g) {
		g.result = g.takenBet = g.takenTeam = g.takenOdds = g.accumulatedResult = null;
	},
	copyGame: function(g) {
		return $.extend({}, g);
	},
	isFavHome: function(g) {
		return g.F == "H";
	},
	getOdds: function(g, place, betType) {
		if (betType == "ML")
			return g[place + "_ML"];
		else if (betType == "DefaultSpread") {
			if (B.isFavHome(g))
				return (place == "H") ? g["F-1.5"] : g["U+1.5"];
			else
				return (place == "H") ? g["U+1.5"] : g["F-1.5"];
		}
		else
			return 0;
	},
	isWithinOddRange: function(g, place, betType, start, end) {
		var odd = B.getOdds(g, place, betType);
		return odd >= start && odd <= end;
	},
	W: function(g, odds) {
		g.result = Number((g.stake * (odds - 1)).toFixed(2));
	},
	L: function(g) {
		g.result = Number(-g.stake.toFixed(2));
	},
	P: function(g) {
		g.result = 0
	},
	WL: function(g, odds, flag) {
		g.takenOdds = odds;
		flag ? B.W(g, odds) : B.L(g);
	},
	WLP: function(g, odds, flag) {
		g.takenOdds = odds;
		if (flag == 1)
			B.W(g, odds);
		else if (flag == 0.5)
			B.P(g);
		else
			B.L(g);
	},
	betHomeML: function(g, amount) {
		g.stake = B.getAmount(amount);
		g.takenTeam = g.H;
		g.takenBet = BET_TYPE.ML;
		B.WL(g, g.H_ML, g.H_ML_R);
	},
	betRoadML: function(g, amount) {
		g.stake = B.getAmount(amount);
		g.takenTeam = g.R;
		g.takenBet = BET_TYPE.ML;
		B.WL(g, g.R_ML, g.R_ML_R);
	},
	betHomeSpread: function(g, amount) {
		g.stake = B.getAmount(amount);
		if (B.isFavHome(g)) {
			g.takenTeam = g.H;
			g.takenBet = BET_TYPE.NEG_SP;
			B.WL(g, g["F-1.5"], g["H-1.5_R"]);
		}
		else {
			g.takenTeam = g.H;
			g.takenBet = BET_TYPE.POS_SP;
			B.WL(g, g["U+1.5"], g["H+1.5_R"]);
		}
	},
	betRoadSpread: function(g, amount) {
		g.stake = B.getAmount(amount);
		if (B.isFavHome(g)) {
			g.takenTeam = g.R;
			g.takenBet = BET_TYPE.POS_SP;
			B.WL(g, g["U+1.5"], g["R+1.5_R"]);
		}
		else {
			g.takenTeam = g.R;
			g.takenBet = BET_TYPE.NEG_SP;
			B.WL(g, g["F-1.5"], g["R-1.5_R"]);
		}

	},
	betFavML: function(g, amount) {
		g.stake = B.getAmount(amount);
		g.takenBet = BET_TYPE.ML;
		if (B.isFavHome(g)) {
			g.takenTeam = g.H;
			B.WL(g, g.H_ML, g.H_ML_R);
		} else {
			g.takenTeam = g.R;
			B.WL(g, g.R_ML, g.R_ML_R);
		}
	},
	betDogML: function(g, amount) {
		g.stake = B.getAmount(amount);
		g.takenBet = BET_TYPE.ML;
		if (B.isFavHome(g)) {
			g.takenTeam = g.R;
			B.WL(g, g.R_ML, g.R_ML_R);
		} else {
			g.takenTeam = g.H;
			B.WL(g, g.H_ML, g.H_ML_R);
		}
	},
	betFavReducedSpread: function(g, amount) {
		g.stake = B.getAmount(amount);
		g.takenBet = BET_TYPE.NEG_SP_RED;
		var homeOverRoad = g["H_R"] - g["R_R"];
		if (B.isFavHome(g)) {
			g.takenTeam = g.H;
			B.WLP(g, g["F-1"], (homeOverRoad > 1) ? 1 : ((homeOverRoad == 1) ? 0.5 : 0));
		} else {
			g.takenTeam = g.R;
			B.WLP(g, g["F-1"], (homeOverRoad < -1) ? 1 : ((homeOverRoad == -1) ? 0.5 : 0));
		}
	},
	betDogSpread: function(g, amount) {
		g.stake = B.getAmount(amount);
		g.takenBet = BET_TYPE.POS_SP;
		if (B.isFavHome(g)) {
			g.takenTeam = g.R;
			B.WL(g, g["U+1.5"], g["R+1.5_R"]);
		} else {
			g.takenTeam = g.H;
			B.WL(g, g["U+1.5"], g["H+1.5_R"]);
		}
	},
	betOver: function(g, amount) {
		g.stake = B.getAmount(amount);
		//TODO: add one more field betParam?
		g.takenTeam = BET_TYPE.OVER;
		g.takenBet =  g["O/U_L"];
		B.WLP(g, g.O_L, g.O_R);
	},
	betUnder: function(g, amount) {
		g.stake = B.getAmount(amount);
		g.takenTeam = BET_TYPE.UNDER;
		g.takenBet = g["O/U_L"];
		B.WLP(g, g.U_L, g.U_R);
	},

	//todo: refactor buying totals points
	betUnderBuy: function(g, buy, amount) {
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
	betOverBuy: function(g, buy, amount) {
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