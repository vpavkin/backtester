var Series = function(games) {
	this.games = games;
	games.forEach(function(g, index) {
		g.series = this;
		g.seriesIndex = index;
	});
	this.addGame = function(g) {
		this.games.push(g);
		g.series = this;
		g.seriesIndex = this.games.length - 1;
	};
	this.startingDate = function(){
		return this.games[0] ? this.games[0].D : null;
	}
};