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
		switch (s.AGGREGATOR) {
			case AGGREGATOR_TYPE.MLB.BY_DAY:
				return AGGREGATORS.MLB.daily;
			case AGGREGATOR_TYPE.MLB.BY_SERIES:
				return AGGREGATORS.MLB.series;
			case AGGREGATOR_TYPE.MLB.CUSTOM:
				return AGGREGATORS.MLB.custom;
			case AGGREGATOR_TYPE.NFL.BY_DAY:
				return AGGREGATORS.NFL.daily;
			case AGGREGATOR_TYPE.NFL.BY_WEEK:
				return AGGREGATORS.NFL.weekly;
			case AGGREGATOR_TYPE.NHL.BY_DAY:
				return AGGREGATORS.NHL.daily;
			case AGGREGATOR_TYPE.NBA.BY_DAY:
				return AGGREGATORS.NBA.daily;
		}
		return null;
	},
	addSystems: function() {
		var container = $(".buttons");

		for (var sysname in SYSTEMS) {
			var l = $('<a href="#"></a>');
			l.html(SYSTEMS[sysname].NAME).data("system", sysname).attr("title", SYSTEMS[sysname].DESCRIPTION);
			if (SYSTEMS[sysname].isResearch)
				l.addClass("research");
			container.append(l);
			l.click(function(e) {
				var lightbox = $("#lightbox");
				lightbox.show();
				setTimeout(function() {
					var s = SYSTEMS[$(e.target).data('system')];
					APP_UI.TEST(APP_UI._aggregator(s), s, APP_UI._parser(s), APP_UI._helper(s));
					lightbox.hide();
					e.preventDefault();
				}, 100);
			});
		}
	},
	TEST: function(aggregator, system, parser, UI) {

		window.UNIT_SIZE = system.UNIT_SIZE;
		var res = aggregator(system, parser);
		if (!res.length) {
			alert("No results!");
			return;
		}
		UI.setDescription(system.DESCRIPTION);
		UI.fill(res);
		DRAWER.draw(res);
	}
};

