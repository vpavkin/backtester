var Progression = function(id, toWin) {
	this.id = id;
	this.toWin = toWin;
	this.step = this.moneyLost = 0;
	this.closed = false;
	this.close = function() {
		this.step = this.moneyLost = 0;
		this.closed = true;
	};
	this.advance = function(amount) {
		this.step++;
		this.moneyLost += amount;
	};
	this.toWinEachStep = function() {
		return this.moneyLost + (this.step + 1) * UNIT_SIZE;
	};
	this.toWinSeries = function() {
		return this.moneyLost + UNIT_SIZE;
	}
};

var ProgressionManager = function() {

	this.data = {};
	this.lastId = 0;

	this.resolve = function(code) {
		if (!this.data[code])
			this.data[code] = [new Progression(++this.lastId, UNIT_SIZE)];
		if (this.data[code].last().closed) {
			this.data[code].push(new Progression(++this.lastId, UNIT_SIZE))
		}
		return this.data[code].last();
	};
};