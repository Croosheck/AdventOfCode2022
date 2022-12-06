/////////////// DAY 6 ///////////////////
function runHandler(e) {
	e.preventDefault();
	day6();
}
run.addEventListener("click", runHandler);

async function day6() {
	const response = await fetch("day6Input.txt");

	const data = await response.text();

	function markerMessage(num, pp, pNum) {
		let sequence = [];
		for (let i = 0; i < data.length; i++) {
			if (i < num) {
				sequence.push(data[i]);
				continue;
			}
			sequence.shift();
			sequence.push(data[i]);
			const sequenceCheck = new Set(sequence);
			if (sequence.length === [...sequenceCheck].length) {
				return (pp.innerHTML = `Part ${pNum}: ${i + 1}`);
			}
		}
	}
	markerMessage(4, p1, "1");
	markerMessage(14, p2, "2");
}
day6();
