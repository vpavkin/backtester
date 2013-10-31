progressions.OneWinBase = function (id) {
	progressions.Base.call(this, id);

	this.process = function (g) {
		var lost = this.currentLosses, tier = this.tier + 1;
		if (g.result == 0) {
			tier--;
		}
		else if (g.result > 0) {
			this.close();
		} else if (g.result < 0) {
			this.advance(g.stake);
		}
		g.series = this;
		g.tier = tier;
		if (this.tier >= this.maxTiers)
			this.close();
		g.seriesResult = this.closed ? (g.result - lost) : -this.currentLosses;
	};



};
