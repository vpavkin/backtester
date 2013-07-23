var APP_UI = {
	_parser: function(s) {
		switch (s.MM) {
			case MM_TYPE.FLAT:
				return PARSERS.flat;
			case MM_TYPE.PROGRESSION:
				return PARSERS.progression;
		}
		return PARSERS.flat;
	},
	_helper: function(s) {
		switch (s.BET) {
			case BETING_TYPE.SINGLE:
				return FLAT_UI;
			case BETING_TYPE.PARLAY:
				return PARLAY_UI;
		}
		return FLAT_UI;
	},
	_aggregator: function(s) {
		return AGGREGATORS.daily;
	},
	addSystems: function() {
		var container = $(".buttons");

		for (var sysname in SYSTEMS) {
			var l = $('<a href="#"></a>');
			l.html(SYSTEMS[sysname].NAME).data("system", sysname);
			container.append(l);
			l.click(function(e) {
				var s = SYSTEMS[$(e.target).data('system')];
				APP_UI.TEST(APP_UI._aggregator(s), s, APP_UI._parser(s), APP_UI._helper(s));
				e.preventDefault();
			});
		}
	},
	TEST: function(aggregator, system, parser, UI) {

		var res = aggregator(system, parser);

		UI.setDescription(system.DESCRIPTION);
		UI.fill(res);
		DRAWER.draw(res);
	}
};

