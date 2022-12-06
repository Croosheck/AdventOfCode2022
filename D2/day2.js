/////////////// DAY 2 ///////////////////
const pointsRock = 1;
const pointsPaper = 2;
const pointsScisors = 3;

const pointsWin = 6;
const pointsDraw = 3;
const pointsLose = 0;

const abc = {
	A: {
		X: pointsDraw + pointsRock, //rock rock
		Y: pointsLose + pointsRock, //rock paper
		Z: pointsWin + pointsRock, //rock scisors
	},
	B: {
		X: pointsWin + pointsPaper, //paper rock
		Y: pointsDraw + pointsPaper, //paper paper
		Z: pointsLose + pointsPaper, //paper scisors
	},
	C: {
		X: pointsLose + pointsScisors, //scisors rock
		Y: pointsWin + pointsScisors, //scisors paper
		Z: pointsDraw + pointsScisors, //scisors scisors
	},
};

const xyz = {
	X: {
		A: pointsDraw + pointsRock, //rock rock
		B: pointsLose + pointsRock, //rock paper
		C: pointsWin + pointsRock, //rock scisors

		X: pointsLose + pointsRock,
		Y: pointsDraw + pointsRock,
		Z: pointsWin + pointsRock,
	},
	Y: {
		A: pointsWin + pointsPaper, //paper rock
		B: pointsDraw + pointsPaper, //paper paper
		C: pointsLose + pointsPaper, //paper scisors

		X: pointsLose + pointsPaper,
		Y: pointsDraw + pointsPaper,
		Z: pointsWin + pointsPaper,
	},
	Z: {
		A: pointsLose + pointsScisors, //scisors rock
		B: pointsWin + pointsScisors, //scisors paper
		C: pointsDraw + pointsScisors, //scisors scisors

		X: pointsLose + pointsScisors,
		Y: pointsDraw + pointsScisors,
		Z: pointsWin + pointsScisors,
	},
};

const xyzPart2 = {
	X: {
		A: pointsLose + pointsScisors,
		B: pointsLose + pointsRock,
		C: pointsLose + pointsPaper,
	},
	Y: {
		A: pointsDraw + pointsRock,
		B: pointsDraw + pointsPaper,
		C: pointsDraw + pointsScisors,
	},
	Z: {
		A: pointsWin + pointsPaper,
		B: pointsWin + pointsScisors,
		C: pointsWin + pointsRock,
	},
};

let playerXYZScore = 0;
let playerABCScore = 0;
let playerXYZScorePart2 = 0;

async function day2() {
	const response = await fetch("day2Input.txt");

	const data = await response.text();

	const newData = data.split("\n");

	const filteredData = newData.filter((i) => i !== "");

	//part1
	filteredData.forEach((item) => {
		playerABCScore += abc[item[0]][item[2]];
		playerXYZScore += xyz[item[2]][item[0]];
	});

	console.log("PART 1");
	console.log(`Player ABC Score: ${playerABCScore}`);
	console.log(`Player XYZ Score: ${playerXYZScore}`);
	console.log("\n");

	//part2
	filteredData.forEach((item) => {
		playerXYZScorePart2 += xyzPart2[item[2]][item[0]];
	});
	console.log("PART 2");
	console.log(`Player XYZ Score: ${playerXYZScorePart2}`);
}
// day2();
