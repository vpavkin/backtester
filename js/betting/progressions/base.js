var progressions = {};

progressions.Base = function(id) {
	this.id = id;
	this.tier = this.currentLosses = 0;
	this.closed = false;
	this.maxTiers = 0;

	this.close = function() {
		this.closed = true;
	};

	this.advance = function(amount) {
		this.tier++;
		this.currentLosses += amount;
	};

	this.process = function(g) {
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

	this.processSeries = function(games) {
		for (var i = 0; (i < games.length && i + this.tier < this.maxTiers); i++) {
			this.process(games[i]);
		}
	}

};
