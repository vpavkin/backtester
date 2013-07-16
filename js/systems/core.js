var AGGREGATOR_TYPE = {
	BY_DAY: 0
};
var MM_TYPE = {
	FLAT: 0,
	PROGRESSION: 1
};
var SYSTEM_BASE = {
	DESCRIPTION: "",
	NAME: "",
	AGGREGATOR: AGGREGATOR_TYPE.BY_DAY,
	MM: MM_TYPE.FLAT,
	init: function() {
	},
	process: function(games) {
	}
};
var SYSTEMS = {};