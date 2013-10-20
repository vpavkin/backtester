var MLB = {

	SEASONS: ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013"],
	TEAMS: [
		"ARI",
		"ATL",
		"BAL",
		"BOS",
		"CHC",
		"CIN",
		"CLE",
		"COL",
		"CHW",
		"DET",
		"HOU",
		"KC",
		"LA",
		"LAA",
		"MIA",
		"MIL",
		"MIN",
		"NYM",
		"NYY",
		"OAK",
		"PHI",
		"PIT",
		"SD",
		"SEA",
		"SF",
		"STL",
		"TB",
		"TEX",
		"TOR",
		"WAS"
	],
	STATS: {
		"2006": {
			homeWinPercentage: {"ARI": 0.48, "ATL": 0.49, "BAL": 0.49, "BOS": 0.59, "CHC": 0.44, "CHW": 0.60, "CIN": 0.52, "CLE": 0.54, "COL": 0.54, "DET": 0.59, "HOU": 0.54, "KC": 0.42, "LA": 0.60, "LAA": 0.56, "MIA": 0.52, "MIL": 0.59, "MIN": 0.65, "NYM": 0.62, "NYY": 0.61, "OAK": 0.60, "PHI": 0.51, "PIT": 0.53, "SD": 0.52, "SEA": 0.54, "SF": 0.53, "STL": 0.63, "TB": 0.51, "TEX": 0.48, "TOR": 0.62, "WAS": 0.51}
		},
		"2007": {
			homeWinPercentage: {"ARI": 0.61, "ATL": 0.54, "BAL": 0.43, "BOS": 0.65, "CHC": 0.54, "CHW": 0.47, "CIN": 0.48, "CLE": 0.65, "COL": 0.62, "DET": 0.56, "HOU": 0.52, "KC": 0.43, "LA": 0.53, "LAA": 0.66, "MIA": 0.44, "MIL": 0.63, "MIN": 0.51, "NYM": 0.51, "NYY": 0.64, "OAK": 0.49, "PHI": 0.57, "PIT": 0.46, "SD": 0.58, "SEA": 0.60, "SF": 0.48, "STL": 0.53, "TB": 0.46, "TEX": 0.58, "TOR": 0.60, "WAS": 0.49}
		},
		"2008": {
			homeWinPercentage: {"ARI": 0.59, "ATL": 0.53, "BAL": 0.46, "BOS": 0.67, "CHC": 0.66, "CHW": 0.65, "CIN": 0.53, "CLE": 0.56, "COL": 0.53, "DET": 0.49, "HOU": 0.59, "KC": 0.47, "LA": 0.59, "LAA": 0.60, "MIA": 0.56, "MIL": 0.60, "MIN": 0.65, "NYM": 0.59, "NYY": 0.59, "OAK": 0.53, "PHI": 0.63, "PIT": 0.48, "SD": 0.43, "SEA": 0.43, "SF": 0.46, "STL": 0.57, "TB": 0.70, "TEX": 0.49, "TOR": 0.58, "WAS": 0.43}
		},
		"2009": {
			homeWinPercentage: {"ARI": 0.44, "ATL": 0.49, "BAL": 0.48, "BOS": 0.68, "CHC": 0.58, "CHW": 0.53, "CIN": 0.49, "CLE": 0.43, "COL": 0.61, "DET": 0.63, "HOU": 0.54, "KC": 0.41, "LA": 0.62, "LAA": 0.62, "MIA": 0.53, "MIL": 0.49, "MIN": 0.59, "NYM": 0.51, "NYY": 0.72, "OAK": 0.49, "PHI": 0.56, "PIT": 0.49, "SD": 0.52, "SEA": 0.59, "SF": 0.64, "STL": 0.56, "TB": 0.64, "TEX": 0.59, "TOR": 0.54, "WAS": 0.41}
		},
		"2010": {
			homeWinPercentage: {"ARI": 0.49, "ATL": 0.67, "BAL": 0.46, "BOS": 0.57, "CHC": 0.43, "CHW": 0.56, "CIN": 0.60, "CLE": 0.47, "COL": 0.64, "DET": 0.64, "HOU": 0.52, "KC": 0.47, "LA": 0.56, "LAA": 0.53, "MIA": 0.51, "MIL": 0.49, "MIN": 0.64, "NYM": 0.58, "NYY": 0.64, "OAK": 0.58, "PHI": 0.64, "PIT": 0.49, "SD": 0.56, "SEA": 0.43, "SF": 0.61, "STL": 0.64, "TB": 0.58, "TEX": 0.61, "TOR": 0.57, "WAS": 0.51}
		},
		"2011": {
			homeWinPercentage: {"ARI": 0.64, "ATL": 0.58, "BAL": 0.48, "BOS": 0.56, "CHC": 0.48, "CHW": 0.44, "CIN": 0.52, "CLE": 0.54, "COL": 0.47, "DET": 0.62, "HOU": 0.38, "KC": 0.49, "LA": 0.52, "LAA": 0.56, "MIA": 0.40, "MIL": 0.70, "MIN": 0.41, "NYM": 0.42, "NYY": 0.63, "OAK": 0.53, "PHI": 0.63, "PIT": 0.44, "SD": 0.43, "SEA": 0.46, "SF": 0.57, "STL": 0.57, "TB": 0.57, "TEX": 0.65, "TOR": 0.52, "WAS": 0.55}
		},
		"2012": {
			homeWinPercentage: {"ARI": 0.51, "ATL": 0.59, "BAL": 0.58, "BOS": 0.42, "CHC": 0.47, "CHW": 0.56, "CIN": 0.60, "CLE": 0.46, "COL": 0.43, "DET": 0.62, "HOU": 0.43, "KC": 0.46, "LA": 0.56, "LAA": 0.57, "MIA": 0.47, "MIL": 0.60, "MIN": 0.38, "NYM": 0.44, "NYY": 0.62, "OAK": 0.62, "PHI": 0.49, "PIT": 0.56, "SD": 0.52, "SEA": 0.49, "SF": 0.60, "STL": 0.62, "TB": 0.57, "TEX": 0.61, "TOR": 0.51, "WAS": 0.61}
		},
		homeWinPercentagesDescending: function (year) {
			var res = [];
			if (!this[year] || !this[year].homeWinPercentage)
				return res;
			for (var team in this[year].homeWinPercentage) {
				res.push({team: team, homeWinPercentage: this[year].homeWinPercentage[team]});
			}
			return res.sort(function (a, b) {
				if (a.p > b.p)
					return -1;
				else if (a.p < b.p)
					return 1;
				return 0;
			})
		}
	},
	selectFirstGamesEmulated: function (games, N) {
		if (!games.length)
			return games;

		var byRoad = function (a, b) {
			return a.R.localeCompare(b.R);
		};
		if (games[0].DoW % 2) {
			games.sort(byRoad);
		}
		if (games.length % 2) {
			games.reverse();
		}
		if (games.length <= N)
			return games;
		else
			return games.slice(0, N);
	},

	BUY_ONE_TOTAL_POINT_ODDS: 2.35,
	NEITHER_RACE_TO_7_ODDS: 1.35
};
