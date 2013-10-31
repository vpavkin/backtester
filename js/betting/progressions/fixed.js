progressions.Fixed = function(id, options) {
	progressions.OneWinBase.call(this, id);
	this.amounts = options.amounts;
	this.maxTiers = this.amounts.length;

	this.nextAmount = function() {
		return (this.amounts[this.tier] || 0) * UNIT_SIZE;
	};
};