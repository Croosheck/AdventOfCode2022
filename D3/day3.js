/////////////// DAY 3 ///////////////////
function runHandler(e) {
	e.preventDefault();
	day3();
}
run.addEventListener("click", runHandler);

async function day3() {
	const response = await fetch("day3Input.txt");

	const data = await response.text();

	const newData = data.split("\n");

	const filteredData = newData.filter((i) => i !== "");

	const alphaLower = Array.from(Array(26)).map((e, i) => i + 97);
	const alphabetLower = alphaLower.map((x, i) => String.fromCharCode(x));
	const alphabetLowerObj = alphabetLower.reduce(
		(a, v, i) => ({ ...a, [v]: i + 1 }),
		{}
	);

	const alphaUpper = Array.from(Array(26)).map((e, i) => i + 65);
	const alphabetUpper = alphaUpper.map((x, i) => String.fromCharCode(x));
	const alphabetUpperObj = alphabetUpper.reduce(
		(a, v, i) => ({ ...a, [v]: i + 27 }),
		{}
	);

	const alphabet = { ...alphabetLowerObj, ...alphabetUpperObj };

	//part1
	let sumPart1 = 0;
	filteredData.forEach((item) => {
		const length = item.split("").length;
		const firstHalf = item.split("").slice(0, length / 2);
		const secondHalf = item.split("").slice(length / 2, length);

		for (let i = 0; i < length / 2; i++) {
			if (secondHalf.some((item) => item === firstHalf[i])) {
				return (sumPart1 += alphabet[firstHalf[i]]);
			}
		}
	});
	p1.innerHTML = `Part 1: ${sumPart1}`;

	//part2
	let groups = [];
	filteredData.forEach((item, i) => {
		if (i === 0) {
			groups.push([item]);
			return;
		}

		if (i % 3 !== 0) {
			groups[groups.length - 1] = [...groups[groups.length - 1], item];
			return;
		}

		if (i % 3 === 0) {
			groups.push([item]);
			return;
		}
	});

	let sumPart2 = 0;
	groups.forEach((group) => {
		for (let i = 0; i < group[0].length; i++) {
			if (group[1].includes(group[0][i]) && group[2].includes(group[0][i])) {
				return (sumPart2 += alphabet[group[0][i]]);
			}
		}
	});
	p2.innerHTML = `Part 2: ${sumPart2}`;
}
