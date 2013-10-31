var progressions = {};

progressions.Base = function (id) {
	this.id = id;
	this.tier = this.currentLosses = 0;
	this.closed = false;
	this.maxTiers = 0;

	this.close = function () {
		this.closed = true;
	};

	this.advance = function (amount) {
		this.tier++;
		this.currentLosses += amount;
	};

	this.process = function (g) {
		//abstract
	};

	this.processSeries = function (games) {
		for (var i = 0; (i < games.length && i + this.tier < this.maxTiers); i++) {
			if (!this.closed)
				this.process(games[i]);
		}
	}

};
