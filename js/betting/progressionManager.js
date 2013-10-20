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
		return this.moneyLost + (this.step + 1) * this.toWin;
	};
	this.toWinSeries = function() {
		return this.moneyLost + this.toWin;
	};
	this.process = function(g) {
		var lost = this.moneyLost, step = this.step + 1;
		if (g.result == 0) {
			step--;
		}
		else if (g.result > 0) {
			this.close();
		} else if (g.result < 0) {
			this.advance(g.stake);
		}
		g.series = this;
		g.step = step;
		g.seriesResult = this.closed ? (g.result - lost) : -this.moneyLost;
	};
	this.processMany = function(games) {
		var step = this.step + 1;
		var closed = true;
		var me = this;
		games.forEach(function(g, index) {
			if (g.result > 0) {
				me.moneyLost -= g.result;
			} else if (g.result < 0) {
				me.moneyLost += g.stake;
				closed = false;
			} else if (g.result == 0) {
				closed = false;
			}
			g.series = me;
			g.step = step + "-" + (index + 1);
			g.seriesResult = -me.moneyLost;
		});

		closed ? this.close() : this.advance(0);
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