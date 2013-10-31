var NBA = {
	NAME: "NBA",
	SEASONS: ["2006-2007", "2007-2008", "2008-2009", "2009-2010", "2010-2011", "2011-2012", "2012-2013", "2013-2014"],
	TEAMS: [
		"Atlanta Hawks",
		"Boston Celtics",
		"Brooklyn Nets",
		"Charlotte Bobcats",
		"Chicago Bulls",
		"Cleveland Cavaliers",
		"Dallas Mavericks",
		"Denver Nuggets",
		"Detroit Pistons",
		"Golden State Warriors",
		"Houston Rockets",
		"Indiana Pacers",
		"Los Angeles Clippers",
		"Los Angeles Lakers",
		"Memphis Grizzlies",
		"Miami Heat",
		"Milwaukee Bucks",
		"Minnesota Timberwolves",
		"New Orleans Hornets",
		"New York Knicks",
		"Oklahoma City Thunder",
		"Orlando Magic",
		"Philadelphia 76ers",
		"Phoenix Suns",
		"Portland Trail Blazers",
		"Sacramento Kings",
		"San Antonio Spurs",
		"Toronto Raptors",
		"Utah Jazz",
		"Washington Wizards"
	],
	STATS: {

	},
	hideColumns: {
		"H_ML": true,
		"R_ML": true,
		"H_S_L": true,
		"R_S_L": true,
		"O_L": true,
		"U_L": true
	},
	hasColumn: function(c) {
		return !this.hideColumns[c];
	}
};
