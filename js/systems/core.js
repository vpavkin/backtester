var AGGREGATOR_TYPE = {
	MLB: {
		BY_DAY: 0,
		BY_SERIES: 1,
		CUSTOM: 2
	},
	NFL: {
		BY_DAY: 10,
		BY_WEEK: 11
	},
	NHL: {
		BY_DAY: 20
	},
	NBA: {
		BY_DAY: 30
	}
};
var MM_TYPE = {
	FLAT: 0,
	PROGRESSION: 1
};
var BETING_TYPE = {
	SINGLE: 0,
	PARLAY: 1
};

var MLB_SYSTEM_BASE = {
	DESCRIPTION: "",
	NAME: "",
	AGGREGATOR: AGGREGATOR_TYPE.MLB.BY_DAY,
	MM: MM_TYPE.FLAT,
	BET: BETING_TYPE.SINGLE,
	updateStats: false,
	filterAfter: true,
	UNIT_SIZE: 100,
	init: function () {
	},
	process: function (games) {
	}
};

var NFL_SYSTEM_BASE = {
	DESCRIPTION: "",
	NAME: "",
	AGGREGATOR: AGGREGATOR_TYPE.NFL.BY_DAY,
	MM: MM_TYPE.FLAT,
	BET: BETING_TYPE.SINGLE,
	updateStats: false,
	filterAfter: true,
	UNIT_SIZE: 100,
	init: function () {
	},
	process: function (games) {
	}
};

var NHL_SYSTEM_BASE = {
	DESCRIPTION: "",
	NAME: "",
	AGGREGATOR: AGGREGATOR_TYPE.NHL.BY_DAY,
	MM: MM_TYPE.FLAT,
	BET: BETING_TYPE.SINGLE,
	updateStats: false,
	filterAfter: true,
	UNIT_SIZE: 100,
	init: function () {
	},
	process: function (games) {
	}
};

var NBA_SYSTEM_BASE = {
	DESCRIPTION: "",
	NAME: "",
	AGGREGATOR: AGGREGATOR_TYPE.NBA.BY_DAY,
	MM: MM_TYPE.FLAT,
	BET: BETING_TYPE.SINGLE,
	updateStats: false,
	filterAfter: true,
	UNIT_SIZE: 100,
	init: function () {
	},
	process: function (games) {
	}
};

var SYSTEMS = {};