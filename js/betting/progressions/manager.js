progressions.Manager = function() {

	this.data = {};
	this.lastId = 0;

	this.resolve = function(code, progressionType, options) {
		if (!this.data[code])
			this.data[code] = [new progressionType(++this.lastId, options)];
		if (this.data[code].last().closed) {
			this.data[code].push(new progressionType(++this.lastId, options))
		}
		return this.data[code].last();
	};
};