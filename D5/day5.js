/////////////// DAY 4 ///////////////////
function runHandler(e) {
	e.preventDefault();
	day5();
}
run.addEventListener("click", runHandler);

async function day5() {
	const response = await fetch("day5Input.txt");

	const data = await response.text();

	const newData = data.split("\n");

	const filteredData = newData.filter((i) => i !== "");

	const stackArr = [];

	for (let i = 0; i < 8; i++) {
		stackArr.push(filteredData[i]);
	}

	const allRows = stackArr.map((row) => row.split(""));

	const columns = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
		7: [],
		8: [],
		9: [],
	};

	let column = 1;
	allRows.forEach((row) => {
		for (let i = 1; i < row.length - 1; i += 4) {
			if (row[i] !== " ") {
				columns[column].unshift(row[i]);
			}
			column++;
		}
		column = 1;
	});

	const steps = [];

	for (let i = 9; i < filteredData.length; i++) {
		const extractedNums = filteredData[i].match(/\d+/g);
		const numsArr = [
			Number(extractedNums[0]),
			Number(extractedNums[1]),
			Number(extractedNums[2]),
		];
		steps.push(numsArr);
	}

	const crateMover9000 = structuredClone(columns);
	const crateMover9001 = structuredClone(columns);
	let part1 = "";
	let part2 = "";

	function crateMover(cols, result, part) {
		for (let i = 0; i < steps.length; i++) {
			let cutPiece;

			if (part === 1) {
				cutPiece = cols[steps[i][1]].splice(-steps[i][0]).reverse();
			}

			if (part === 2) {
				cutPiece = cols[steps[i][1]].splice(-steps[i][0]);
			}

			cols[steps[i][2]].push(...cutPiece);
		}

		for (const col in cols) {
			const lastItem = cols[col][cols[col].length - 1];
			result += lastItem;
		}

		return result;
	}

	p1.innerHTML = `Part 1: ${crateMover(crateMover9000, part1, 1)}`;
	p2.innerHTML = `Part 2: ${crateMover(crateMover9001, part2, 2)}`;
}
