var AGGREGATOR_TYPE = {
	BY_DAY: 0
};
var MM_TYPE = {
	FLAT: 0,
	PROGRESSION: 1
};
var BETING_TYPE = {
	SINGLE: 0,
	PARLAY: 1
};
var SYSTEM_BASE = {
	DESCRIPTION: "",
	NAME: "",
	AGGREGATOR: AGGREGATOR_TYPE.BY_DAY,
	MM: MM_TYPE.FLAT,
	BET: BETING_TYPE.SINGLE,
	updateStats: false,
	init: function() {
	},
	process: function(games) {
	}
};
var SYSTEMS = {};