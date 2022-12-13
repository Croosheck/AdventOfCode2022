/////////////// DAY 8 ///////////////////
function runHandler(e) {
	e.preventDefault();
	day8();
}
run.addEventListener("click", runHandler);

async function day8() {
	const response = await fetch("day8Input.txt");

	const data = await response.text();

	const newData = data.split("\n");

	const filteredData = newData.filter((i) => i !== "");

	const forest = [];

	filteredData.forEach((line) => {
		forest.push(line.split("").map((item) => parseInt(item, 10)));
	});

	let coveredTrees = 0;
	let highestScenicScore = 0;

	function isCovered(location, forest, currentRow, currentTree) {
		if (location === "right") {
			for (
				let tree = currentTree + 1;
				tree < forest[currentRow].length;
				tree++
			) {
				if (forest[currentRow][tree] >= forest[currentRow][currentTree]) {
					return true;
				}
			}
		}

		if (location === "left") {
			for (let tree = currentTree - 1; tree >= 0; tree--) {
				if (forest[currentRow][tree] >= forest[currentRow][currentTree]) {
					return true;
				}
			}
		}

		if (location === "top") {
			for (let row = currentRow - 1; row >= 0; row--) {
				if (forest[row][currentTree] >= forest[currentRow][currentTree]) {
					return true;
				}
			}
		}

		if (location === "bottom") {
			for (let row = currentRow + 1; row < forest.length; row++) {
				if (forest[row][currentTree] >= forest[currentRow][currentTree]) {
					return true;
				}
			}
		}
		return false;
	}

	function scenicScore(direction, forest, currentRow, currentTree) {
		const scenicPoints = {
			right: 0,
			left: 0,
			top: 0,
			bottom: 0,
		};

		if (direction === "right") {
			for (
				let tree = currentTree + 1;
				tree < forest[currentRow].length;
				tree++
			) {
				scenicPoints.right++;
				if (forest[currentRow][currentTree] <= forest[currentRow][tree]) {
					return scenicPoints.right;
				}
			}
			return scenicPoints.right;
		}

		if (direction === "left") {
			for (let tree = currentTree - 1; tree >= 0; tree--) {
				scenicPoints.left++;
				if (forest[currentRow][currentTree] <= forest[currentRow][tree]) {
					return scenicPoints.left;
				}
			}
			return scenicPoints.left;
		}

		if (direction === "top") {
			for (let row = currentRow - 1; row >= 0; row--) {
				scenicPoints.top++;
				if (forest[currentRow][currentTree] <= forest[row][currentTree]) {
					return scenicPoints.top;
				}
			}
			return scenicPoints.top;
		}

		if (direction === "bottom") {
			for (let row = currentRow + 1; row < forest.length; row++) {
				scenicPoints.bottom++;
				if (forest[currentRow][currentTree] <= forest[row][currentTree]) {
					return scenicPoints.bottom;
				}
			}
			return scenicPoints.bottom;
		}
	}

	function part1() {
		for (let row = 0; row < forest.length; row++) {
			const currentRow = forest[row];
			if (row === 0) continue;
			if (row === forest.length - 1) break;

			for (let tree = 0; tree < forest[row].length; tree++) {
				if (tree === 0) continue;
				if (tree === currentRow.length - 1) continue;

				if (
					isCovered("top", forest, row, tree) &&
					isCovered("bottom", forest, row, tree) &&
					isCovered("left", forest, row, tree) &&
					isCovered("right", forest, row, tree)
				) {
					coveredTrees++;
				}
			}
		}

		const visibleTrees = forest.flat().length - coveredTrees;

		p1.innerHTML = `Part 1: ${visibleTrees} visible trees`;
	}

	function part2() {
		function counter(scenicPoints) {
			return (
				scenicPoints.right *
				scenicPoints.left *
				scenicPoints.top *
				scenicPoints.bottom
			);
		}

		for (let row = 0; row < forest.length; row++) {
			const currentRow = forest[row];
			if (row === 0) continue;
			if (row === forest.length - 1) break;

			for (let tree = 0; tree < forest[row].length; tree++) {
				const scenicPoints = {
					right: 0,
					left: 0,
					top: 0,
					bottom: 0,
				};

				if (tree === 0) continue;
				if (tree === currentRow.length - 1) continue;

				scenicPoints.right = scenicScore("right", forest, row, tree);
				scenicPoints.left = scenicScore("left", forest, row, tree);
				scenicPoints.top = scenicScore("top", forest, row, tree);
				scenicPoints.bottom = scenicScore("bottom", forest, row, tree);

				const treeScore = counter(scenicPoints);

				if (treeScore > highestScenicScore) {
					highestScenicScore = treeScore;
				}
			}
		}

		p2.innerHTML = `Part 2: ${highestScenicScore} is the highest scenic score`;
	}

	part1();
	part2();
}
day8();
