Object.defineProperty(Object.prototype, 'forEach', {
	writable: true,
	enumerable: false,
	value: function (iterator, scope) {
		for (var key in this) {
			if (this.hasOwnProperty(key)) {
				iterator.call(scope, this[key], key, this);
			}
		}
	}
});
Array.prototype.last = function () {
	return this[this.length - 1];
};
var UTILS = {
	flatten: function (output) {
		return [].concat.apply([], output);
	},
	dateFromString: function (s) {
		return new Date(Number(s.substr(6)), Number(s.substr(3, 2)) - 1, Number(s.substr(0, 2)));
	},
	nearbyDates: function (d1, d2, diff) {
		diff = diff || 1;
		if (d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear())
			return true;
		for (var i = 1; i <= diff; i++) {
			d1.setDate(d1.getDate() + 1);
			if (d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear())
				return true;
		}
		return false;
	},
	compareNumbers: function (n1, n2) {
		return n1 - n2;
	},
	compareDates: function (d1, d2) {
		var cd = UTILS.compareNumbers(d1.getFullYear(), d2.getFullYear());
		if (cd) return cd;
		var cm = UTILS.compareNumbers(d1.getMonth(), d2.getMonth());
		if (cm) return cm;
		return UTILS.compareNumbers(d1.getDate(), d2.getDate());
	},
	compareStringDates: function (d1, d2) {
		return UTILS.compareDates(UTILS.dateFromString(d1), UTILS.dateFromString(d2));
	},
	getCSSClass: function (res) {
		if (res > 0)
			return "green";
		else if (res < 0)
			return "red";
		return ""
	},
	spreadToString: function (s) {
		return s >= 0 ? "+" + s.toString() : s.toString();
	}
};
