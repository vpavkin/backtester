progressions.ToWin = function(id, options) {
	progressions.Base.call(this, id);
	options |= {};
	this.toWin = options.toWin || UNIT_SIZE;
	this.maxTiers = options.maxTiers || Number.MAX_VALUE;

	this.toWinEachStepAmount = function() {
		return this.currentLosses + (this.tier + 1) * this.toWin;
	};
	this.toWinSeriesAmount = function() {
		return this.currentLosses + this.toWin;
	};

};