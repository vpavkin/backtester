var USE_FILTERS = true;

var FILTERS = {
	years: {filter: false},
	months: {filter: false},
	days: {filter: false},
	team: {filter: false},
	place: {filter: false},
	status: {filter: false},
	odds: {filter: false}
};

var FM, FILTERS_MANAGER;
FILTERS_MANAGER = FM = {
	_initSeasons: function() {

		this._seasonInputs = $('input[id^="season_"]');
		this._seasonInputs.on('change', function() {
			FILTERS.years.filter = false;
			FM._seasonInputs.each(function(ind, el) {
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
			FM._monthInputs.each(function(ind, el) {
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
			FM._dayInputs.each(function(ind, el) {
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
			FM._placeInputs.each(function(ind, el) {
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
			FM._statusInputs.each(function(ind, el) {
				if (!(FILTERS.status[el.value] = $(el).prop("checked")))
					FILTERS.status.filter = true;
			});
			console.log(FILTERS.status);
		})
	},
	_initTeam: function() {
		var ts = this._teamSelect = $('#teams_teams');
		LEAGUE.TEAMS.forEach(function(item) {
			ts.append("<option value='" + item + "'>" + item + "</option> ");
		});
		this._teamSelect.on('change', function() {
			FILTERS.team.filter = (FILTERS.team.team = FM._teamSelect.val()) != "All";
			console.log(FILTERS.team);
		})
	},
	_initOdds: function() {
		this._oddsInputs = $('#odds_min,#odds_max');
		this._oddsInputs.on('change', function() {
			FILTERS.odds.filter = false;
			FM._oddsInputs.each(function(ind, el) {
				if (FILTERS.odds[el.value] = $(el).prop("checked"))
					FILTERS.odds.filter = true;
			});
			console.log(FILTERS.odds);
		});
		$('#odds_min_val').change(function(e) {
			$("label[for='odds_min']").html("<span></span>Min = " + e.target.value);
		});
		$('#odds_max_val').change(function(e) {
			$("label[for='odds_max']").html("<span></span>Max = " + e.target.value);
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
	},

	year: function(g) {
		return !(FILTERS.years.filter && !FILTERS.years[g.SEAS])
	},
	month: function(g) {
		return !(FILTERS.months.filter && !FILTERS.months[g.M])
	},
	day: function(g) {
		return !(FILTERS.days.filter && !FILTERS.days[g.DoW])
	},
	team: function(g, team) {
		return !(g.H != team && g.R != team);
	},
	place: function(g, team) {
		if (FILTERS.place.filter) {
			if (!FILTERS.place.H && g.H == team)
				return false;
			if (!FILTERS.place.R && g.R == team)
				return false;
		}
		return true;
	},
	status: function(g, team) {
		if (FILTERS.status.filter) {
			if (!FILTERS.status.U && g[g.F] != team)
				return false;
			if (!FILTERS.status.F && g[g.F] == team)
				return false;
		}
		return true;
	},
	takenOdds: function(g) {
		if (FILTERS.odds.filter) {
			if (FILTERS.odds.odds_min && g.takenOdds < Number($('#odds_min_val')[0].value))
				return false;
			if (FILTERS.odds.odds_max && g.takenOdds > Number($('#odds_max_val')[0].value))
				return false;
		}
		return true;
	},
	preQualifies: function(g) {
		if (!FM.year(g) || !FM.month(g) || !FM.day(g))
			return false;
		if (FILTERS.team.filter) {
			var team = FILTERS.team.team;
			if (!FM.team(g, team) || !FM.place(g, team) || !FM.status(g, team))
				return false
		}
		return true;
	},

	postQualifies: function(g) {

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
		return FM.takenOdds(g);
	},

	preFilterGames: function(picks) {
		return picks.filter(FM.preQualifies);
	},

	postFilterGames: function(picks) {
		return picks.filter(FM.postQualifies)
	}
};

