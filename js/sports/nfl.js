var NFL = {
	NAME: "NFL",
	SEASONS: ["2006-2007", "2007-2008", "2008-2009", "2009-2010", "2010-2011", "2011-2012", "2012-2013", "2013-2014"],
	TEAMS: [
		"Arizona",
		"Atlanta",
		"Baltimore",
		"Buffalo",
		"Carolina",
		"Chicago",
		"Cincinnati",
		"Cleveland",
		"Dallas",
		"Denver",
		"Detroit",
		"Green Bay",
		"Houston",
		"Indianapolis",
		"Jacksonville",
		"Kansas City",
		"Miami",
		"Minnesota",
		"N.Y. Giants",
		"N.Y. Jets",
		"New England",
		"New Orleans",
		"Oakland",
		"Philadelphia",
		"Pittsburgh",
		"San Diego",
		"San Francisco",
		"Seattle",
		"St. Louis",
		"Tampa Bay",
		"Tennessee",
		"Washington"
	],
	STATS: {

	},
	hideColumns: {
		"H_S_L": true,
		"R_S_L": true,
		"O_L": true,
		"U_L": true
	},
	hasColumn: function(c) {
		return !this.hideColumns[c];
	}
};
