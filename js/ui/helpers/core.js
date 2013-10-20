var UI_BASE = {
	hiddenColumns: {},
	header: null,
	td: function(str, cl) {
		return "<td" + (cl ? " class='" + cl + "'" : "") + ">" + str + "</td>";
	},
	dayName: function(n) {
		switch (n) {
			case 1:
				return "Mon";
			case 2:
				return "Tue";
			case 3:
				return "Wed";
			case 4:
				return "Thu";
			case 5:
				return "Fri";
			case 6:
				return "Sat";
			case 7:
				return "Sun"
		}
		return "???";
	},
	monthName: function(n) {
		switch (n) {
			case 1:
				return "Jan";
			case 2:
				return "Feb";
			case 3:
				return "Mar";
			case 4:
				return "Apr";
			case 5:
				return "May";
			case 6:
				return "Jun";
			case 7:
				return "Jul";
			case 8:
				return "Aug";
			case 9:
				return "Sep";
			case 10:
				return "Oct";
			case 11:
				return "Nov";
			case 12:
				return "Dec";
		}
		return "???";
	},
	activate: function() {
		var me = this;
		this.header = $("#games").find("th");
		this.header.click(function(e) {
			var i = Array.prototype.indexOf.call(me.header, e.target) + 1;
			if (!me.hiddenColumns[i]) {
				me.collapseColumn(i);
			} else {
				me.revealColumn(i);
			}
		});
	},
	collapseColumn: function(n) {
		this.hiddenColumns[n] = true;
		$('#games').find('th:nth-child(' + n + '), td:nth-child( ' + n + ')').css("fontSize", "2px");
	},
	revealColumn: function(n) {
		this.hiddenColumns[n] = false;
		$('#games').find('th:nth-child(' + n + '), td:nth-child( ' + n + ')').css("fontSize", "12px");
	},
	setDescription: function(desc) {
		$('.description').html(desc || "");
	},
	//heplers for progressions
	_progressionHeaders1: function(games) {
		if (games.isProgression)
			return "<th title='Series ID'>ID</th>" +
				"<th title='Progression ID'>PRG</th>";
		return "";
	},
	_progressionCells1: function(games, g) {
		if (games.isProgression)
			return this.td(g.series.id) +
				this.td(g.prg);
		return "";
	},
	_progressionHeaders2: function(games) {
		if (games.isProgression)
			return "<th title='Current Series result'>Series Res.</th>" +
				"<th title='Series Tier'>Tier</th>";
	},
	_progressionCells2: function(games, g) {
		if (games.isProgression)
			return this.td(g.seriesResult.toFixed(2), UTILS.getCSSClass(g.seriesResult)) +
				this.td(g.step);
		return "";
	}
};
