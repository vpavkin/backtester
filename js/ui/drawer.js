var DRAWER = {
	_line: null,

	labels: function(n, step) {
		var lbs = [];
		for (var i = 0; i < n; i++) {
			lbs.push(i * step);
		}
		return lbs;
	},

	draw: function(res) {
		if (this._line)
			RGraph.Clear(this._line.canvas);
		RGraph.ObjectRegistry.Clear();
		this._line = new RGraph.Line('cvs', res.map(function(item) {
			return item.accumulatedResult
		}))
			.Set('chart.xaxispos', 'center')
			.Set('numxticks', 25)
			.Set('chart.gutter.left', 65)
			.Set('chart.text.font', 'Georgia')
			.Set('labels', this.labels(25, Math.round(res.length / 25)))
			.Set('chart.background.grid.dotted', true)
			.Set('chart.background.grid.autofit.numhlines', 20)
			.Set('chart.tooltips', res.map(function(g, index) {
				if (g.H) {//single
					return index + ": " + g.D + " " + g.H + "-" + g.R + " " + (g.result > 0 ? "+" : "") + g.result.toFixed(2) + "$";
				} else {//parlay
					return index + ": " + g.D + " " + g.takenBet + " " + (g.result > 0 ? "+" : "") + g.result.toFixed(2) + "$";
				}
			}))
			.Draw();
	}
};
