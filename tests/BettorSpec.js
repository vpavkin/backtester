describe("Better", function () {

	var TEST_SAMPLE;

	beforeEach(function () {
		var st = Math.round(Math.random() * 17000);
		TEST_SAMPLE = GAMES.slice(st, st + 1000);
	});

	it("should clear games", function () {
		var g = {result: 1, takenOdds: 1, takenBet: 1, takenTeam: 1, accumulatedResult: 1};
		B.clearGame(g);
		expect(g.result).toBeNull();
		expect(g.takenOdds).toBeNull();
		expect(g.takenBet).toBeNull();
		expect(g.takenTeam).toBeNull();
		expect(g.accumulatedResult).toBeNull();
	});

	it("should correctly determine a Fav", function () {
		TEST_SAMPLE.forEach(function (g) {
			expect(B.isFavHome(g)).toEqual(g.H_ML <= g.R_ML)
		});
	});

	it("should correctly bet ML", function () {
		TEST_SAMPLE.forEach(function (g) {
			B.betRoadML(g);
			expect(g.takenBet).toEqual(BET_TYPE.ML);
			expect(g.takenOdds).toEqual(g.R_ML);
			expect(g.result).toEqual(g.R_ML_R ? UNIT_SIZE * (g.takenOdds - 1) : -UNIT_SIZE);
			expect(g.takenTeam).toEqual(g.R);
			B.clearGame(g);

			B.betHomeML(g);
			expect(g.takenBet).toEqual(BET_TYPE.ML);
			expect(g.takenOdds).toEqual(g.H_ML);
			expect(g.result).toEqual(Number((g.H_ML_R ? UNIT_SIZE * (g.takenOdds - 1) : -UNIT_SIZE)));
			expect(g.takenTeam).toEqual(g.H);
			B.clearGame(g);

			B.betDogML(g);
			expect(g.takenBet).toEqual(BET_TYPE.ML);
			expect(g.takenOdds).toEqual(g.H_ML <= g.R_ML ? g.R_ML : g.H_ML);
			expect(g.result).toEqual(Number((g.U_ML_R ? UNIT_SIZE * (g.takenOdds - 1) : -UNIT_SIZE)));
			expect(g.takenTeam).toEqual(g.H_ML <= g.R_ML ? g.R : g.H);

			B.clearGame(g);
			B.betFavML(g);
			expect(g.takenBet).toEqual(BET_TYPE.ML);
			expect(g.takenOdds).toEqual(g.H_ML <= g.R_ML ? g.H_ML : g.R_ML);
			expect(g.result).toEqual(Number((g.F_ML_R ? UNIT_SIZE * (g.takenOdds - 1) : -UNIT_SIZE)));
			expect(g.takenTeam).toEqual(g.H_ML <= g.R_ML ? g.H : g.R);
		});
	});

	it("should correctly bet +1.5 on Underdog", function () {
		TEST_SAMPLE.forEach(function (g) {
			B.betDogSpread(g);
			expect(g.takenBet).toEqual(BET_TYPE.DOG_SP);
			expect(g.takenOdds).toEqual((g["F"] == "H") ? g["R_S_L"] : g["H_S_L"]);
			var res = (g["F"] == "H") ? g["R_S_R"] : g["H_S_R"];
			expect(g.result).toEqual(Number((res ? UNIT_SIZE * (g.takenOdds - 1) : -UNIT_SIZE)));
			expect(g.takenTeam).toEqual(g.H_ML <= g.R_ML ? g.R : g.H);
		});
	});

	it("should correctly bet -1 on Fave", function () {
		TEST_SAMPLE.forEach(function (g) {
			B.MLB.betFavReducedSpread(g);
			expect(g.takenBet).toEqual(BET_TYPE.FAV_SP_RED);
			expect(g.takenOdds).toEqual(g["F-1"]);
			if (B.isFavHome(g)) {
				expect(g.result).toEqual(Number((g.H_R - g.R_R > 1 ? UNIT_SIZE * (g.takenOdds - 1) : (g.H_R - g.R_R == 1 ? 0 : -UNIT_SIZE))));
			} else {
				expect(g.result).toEqual(Number((g.R_R - g.H_R > 1 ? UNIT_SIZE * (g.takenOdds - 1) : (g.R_R - g.H_R == 1 ? 0 : -UNIT_SIZE))));
			}
			expect(g.takenTeam).toEqual(g.H_ML <= g.R_ML ? g.H : g.R);
		});
	});
});