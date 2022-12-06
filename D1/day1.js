/////////////// DAY 1 ///////////////////
function runHandler(e) {
	e.preventDefault();
	day1();
}
run.addEventListener("click", runHandler);

let dataArray = [];
let sumsArray = [];
async function day1() {
	const response = await fetch("day1Input.txt");

	const data = await response.text();

	const newData = data.split("\n");

	let elfCalories = 0;
	newData.forEach((i, ind) => {
		if (i === "") {
			sumsArray.push(elfCalories);
			elfCalories = 0;
			return;
		}

		elfCalories += Number(i);
	});

	const first = Math.max(...sumsArray);
	const withoutFirst = sumsArray.filter((i) => i !== first);

	p1.innerHTML = `Part 1: ${first}`;

	const second = Math.max(...withoutFirst);
	const withoutSecond = withoutFirst.filter((i) => i !== second);

	const third = Math.max(...withoutSecond);

	console.log(`Top1: ${first}\nTop2: ${second}\nTop3: ${third}`);

	p2.innerHTML = `Part 2: ${first}(top1) + ${second}(top2) + ${third}(top3) = ${
		first + second + third
	}`;
}
