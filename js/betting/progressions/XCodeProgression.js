progressions.XCodeProgression = function (id, options) {
	progressions.Base.call(this, id);
	options |= {};

	this.amounts = options.amounts || progressions.XCodeProgression.amounts;
	this.maxTiers = this.amounts.length;
	this.winsToClose = options.winsToClose || progressions.XCodeProgression.winsToClose;
	this.wins = 0;

	this.nextAmount = function () {
		return (this.amounts[this.tier] || 0) * UNIT_SIZE * progressions.XCodeProgression.globalModifier();
	};

	this.addWin = function (g) {
		this.currentLosses -= g.result;
		if (this.tier <= 1 || ((++this.wins) >= this.winsToClose)) {
			this.close();
			progressions.XCodeProgression.onSeriesClosed(true);
			return;
		}
		this.tier--;
	};

	this.process = function (g) {
		var lost = this.currentLosses, tier = this.tier + 1;
		if (g.result > 0) {
			this.addWin(g);
		} else if (g.result < 0) {
			this.advance(g.stake);
		}
		g.series = this;
		g.tier = tier;
		if (this.tier >= this.maxTiers) {
			this.close();
			progressions.XCodeProgression.onSeriesClosed(false);
		}
		g.seriesResult = g.result - lost
	};

	this.successful = function () {
		return this.wins >= this.winsToClose;
	}
};

progressions.XCodeProgression.winsToClose = 2;
progressions.XCodeProgression.amounts = [1, 2, 3];
progressions.XCodeProgression.globalModifiers = [1, 2, 4];
progressions.XCodeProgression.currentModifierIndex = 0;
progressions.XCodeProgression.globalModifier = function () {
	return progressions.XCodeProgression.globalModifiers[progressions.XCodeProgression.currentModifierIndex];
};
progressions.XCodeProgression.onSeriesClosed = function (successful) {
	if (this.currentModifierIndex > 0 || !successful)
		this.next()
};
progressions.XCodeProgression.next = function () {
	this.currentModifierIndex = (this.currentModifierIndex + 1) % this.globalModifiers.length;
}