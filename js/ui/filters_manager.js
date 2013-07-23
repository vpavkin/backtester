var USE_FILTERS = true;

var FILTERS = {
	years: {filter: false},
	months: {filter: false},
	days: {filter: false},
	team: {filter: false},
	place: {filter: false},
	status: {filter: false},
	odds: {filter: false},
	parlays: {filter: false}
};

var FILTERS_MANAGER = {
	_initSeasons: function() {

		this._seasonInputs = $('input[id^="season_"]');
		this._seasonInputs.on('change', function() {
			FILTERS.years.filter = false;
			FILTERS_MANAGER._seasonInputs.each(function(ind, el) {
				if (!(FILTERS.years[el.value] = $(el).prop("checked")))
					FILTERS.years.filter = true;
			});
			console.log(FILTERS.years);
		})
	},
	_initMonths: function() {

		this._monthInputs = $('input[id^="month_"]');
		this._monthInputs.on('change', function() {
			FILTERS.months.filter = false;
			FILTERS_MANAGER._monthInputs.each(function(ind, el) {
				if (!(FILTERS.months[el.value] = $(el).prop("checked")))
					FILTERS.months.filter = true;
			});
			console.log(FILTERS.months);
		})
	},
	_initDays: function() {

		this._dayInputs = $('input[id^="day_"]');
		this._dayInputs.on('change', function() {
			FILTERS.days.filter = false;
			FILTERS_MANAGER._dayInputs.each(function(ind, el) {
				if (!(FILTERS.days[el.value] = $(el).prop("checked")))
					FILTERS.days.filter = true;
			});
			console.log(FILTERS.days);
		})
	},
	_initPlace: function() {
		this._placeInputs = $('input[id^="place_"]');
		this._placeInputs.on('change', function() {
			FILTERS.place.filter = false;
			FILTERS_MANAGER._placeInputs.each(function(ind, el) {
				if (!(FILTERS.place[el.value] = $(el).prop("checked")))
					FILTERS.place.filter = true;
			});
			console.log(FILTERS.place);
		})
	},
	_initStatus: function() {
		this._statusInputs = $('input[id^="status_"]');
		this._statusInputs.on('change', function() {
			FILTERS.status.filter = false;
			FILTERS_MANAGER._statusInputs.each(function(ind, el) {
				if (!(FILTERS.status[el.value] = $(el).prop("checked")))
					FILTERS.status.filter = true;
			});
			console.log(FILTERS.status);
		})
	},
	_initTeam: function() {
		var ts = this._teamSelect = $('#teams_teams');
		TEAMS.forEach(function(item) {
			ts.append("<option value='" + item + "'>" + item + "</option> ");
		});
		this._teamSelect.on('change', function() {
			FILTERS.team.filter = (FILTERS.team.team = FILTERS_MANAGER._teamSelect.val()) != "All";
			console.log(FILTERS.team);
		})
	},
	_initOdds: function() {
		this._oddsInputs = $('#ml_odds_min,#ml_odds_max,#spread_odds_min,#spread_odds_max');
		this._oddsInputs.on('change', function() {
			FILTERS.odds.filter = false;
			FILTERS_MANAGER._oddsInputs.each(function(ind, el) {
				if (!(FILTERS.odds[el.value] = $(el).prop("checked")))
					FILTERS.odds.filter = true;
			});
			console.log(FILTERS.odds);
		});
		$('#ml_odds_min_val').change(function(e) {
			$("label[for='ml_odds_min']").html("<span></span>Min = " + e.target.value);
		});
		$('#spread_odds_min_val').change(function(e) {
			$("label[for='spread_odds_min']").html("<span></span>Min = " + e.target.value);
		});
		$('#ml_odds_max_val').change(function(e) {
			$("label[for='ml_odds_max']").html("<span></span>Max = " + e.target.value);
		});
		$('#spread_odds_max_val').change(function(e) {
			$("label[for='spread_odds_max']").html("<span></span>Max = " + e.target.value);
		})
	},
	_initParlays: function() {
		this._parlayInputs = $('#parlay_min,#parlay_max');
		this._parlayInputs.on('change', function() {
			FILTERS.parlays.filter = false;
			FILTERS_MANAGER._parlayInputs.each(function(ind, el) {
				if (!(FILTERS.parlays[el.value] = $(el).prop("checked")))
					FILTERS.parlays.filter = true;
			});
			console.log(FILTERS.parlays);
		});
		$('#parlay_min_val').change(function(e) {
			$("label[for='parlay_min']").html("<span></span>Min = " + e.target.value);
		});
		$('#parlay_max_val').change(function(e) {
			$("label[for='parlay_max']").html("<span></span>Max = " + e.target.value);
		});
	},
	init: function() {
		this._initSeasons();
		this._initMonths();
		this._initDays();
		this._initTeam();
		this._initPlace();
		this._initStatus();
		this._initOdds();
		this._initParlays();
	},

	preQualifies: function(g) {
		if (FILTERS.years.filter)
			if (!FILTERS.years[g.SEAS])
				return false;
		if (FILTERS.months.filter)
			if (!FILTERS.months[g.M])
				return false;
		if (FILTERS.days.filter)
			if (!FILTERS.days[g.DoW])
				return false;
		return true;
	},

	afterQualifies: function(g) {
		if (FILTERS.team.filter)
			if (!(FILTERS.team.team == g.takenTeam))
				return false;
		if (FILTERS.place.filter) {
			if (!FILTERS.place.H && g.takenTeam == g.H)
				return false;
			if (!FILTERS.place.R && g.takenTeam == g.R)
				return false;
		}
		if (FILTERS.status.filter) {
			if (!FILTERS.status.U && g[g.F] != g.takenTeam)
				return false;
			if (!FILTERS.status.F && g[g.F] == g.takenTeam)
				return false;
		}
		if (FILTERS.odds.filter) {
			if (g.takenBet == BET_TYPE.ML) {
				if (FILTERS.odds.ml_min && g.takenOdds < Number($('#ml_odds_min_val')[0].value))
					return false;
				if (FILTERS.odds.ml_max && g.takenOdds > Number($('#ml_odds_max_val')[0].value))
					return false;
			}
			if (g.takenBet == BET_TYPE.POS_SP || g.takenBet == BET_TYPE.NEG_SP || g.takenBet == BET_TYPE.NEG_SP_RED) {
				if (FILTERS.odds.spread_min && g.takenOdds < Number($('#spread_odds_min_val')[0].value))
					return false;
				if (FILTERS.odds.spread_max && g.takenOdds > Number($('#spread_odds_max_val')[0].value))
					return false;
			}

		}
		return true
	},

	preFilterGames: function(picks) {
		return picks.filter(FILTERS_MANAGER.preQualifies);
	},

	afterFilterGames: function(picks) {
		return picks.filter(FILTERS_MANAGER.afterQualifies)
	},

	qualifyParlay: function(p) {
		if (FILTERS.parlays.parlay_min) {
			if (p.plays.length < Number($('#parlay_min_val')[0].value))
				return false;
		}
		if (FILTERS.parlays.parlay_max) {
			var max = Number($('#parlay_max_val')[0].value);
			if (p.plays.length > max)
				p.plays = p.plays.slice(0, max);
		}
		return true;
	}
};

