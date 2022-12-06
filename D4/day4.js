/////////////// DAY 4 ///////////////////
function runHandler(e) {
	e.preventDefault();
	day4();
}
run.addEventListener("click", runHandler);

async function day4() {
	const response = await fetch("day4Input.txt");

	const data = await response.text();

	const newData = data.split("\n");

	const filteredData = newData.filter((i) => i !== "");

	function rangeCkeck(range1, range2, overlapAtAll) {
		let overlaping = 0;

		const range1Start = Number(range1[0]);
		const range1End = Number(range1[1]);

		const range2Start = Number(range2[0]);
		const range2End = Number(range2[1]);

		const firstContains2nd =
			range1Start <= range2Start && range1End >= range2End;
		const secondContains1st =
			range2Start <= range1Start && range2End >= range1End;

		const firstOverlaps2nd = range1End >= range2Start && range2End >= range1End;
		const secondOverlaps1st =
			range2Start <= range1Start && range2End >= range1Start;

		if (
			overlapAtAll &&
			(firstOverlaps2nd ||
				secondOverlaps1st ||
				firstContains2nd ||
				secondContains1st)
		) {
			return { part1: 0, part2: 1 };
		}

		if (firstContains2nd || secondContains1st)
			return { part1: 1, part2: overlaping };

		return { part1: 0, part2: 0 };
	}

	let fullyContainingSum = 0;
	let partiallyContainingSum = 0;

	filteredData.forEach((pair) => {
		const pairsArr = pair.split(",").map((sectors) => {
			return { ...sectors.split("-") };
		});
		fullyContainingSum += rangeCkeck(pairsArr[0], pairsArr[1]).part1;
		partiallyContainingSum += rangeCkeck(pairsArr[0], pairsArr[1], true).part2;
	});

	p1.innerHTML = `Part 1: ${fullyContainingSum} fully contained`;
	p2.innerHTML = `Part 2: ${partiallyContainingSum} at least partially contained`;
}
