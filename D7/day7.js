/////////////// DAY 7 ///////////////////
function runHandler(e) {
	e.preventDefault();
	day7();
}
run.addEventListener("click", runHandler);

async function day7() {
	const response = await fetch("day7Input.txt");

	const data = await response.text();

	const newData = data.split("\n");

	const filteredData = newData.filter((i) => i !== "");

	function createTree(lines) {
		const tree = {
			name: "/",
			isDirectory: true,
			children: [],
		};

		let currentNode = tree;
		let currentCommand = null;

		for (const line of lines) {
			if (line[0] === "$") {
				//command
				const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line);
				currentCommand = match.groups.command;

				if (currentCommand === "cd") {
					const target = match.groups.arg;
					switch (target) {
						case "/":
							currentNode = tree;
							break;
						case "..":
							currentNode = currentNode.parent;
							break;
						default:
							currentNode = currentNode.children.find(
								(folder) => folder.isDirectory && folder.name === target
							);
					}
				}
			} else {
				// file/directory from 'ls' command
				if (currentCommand === "ls") {
					const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
					if (fileMatch) {
						const node = {
							name: fileMatch.groups.name,
							size: parseInt(fileMatch.groups.size),
							isDirectory: false,
							parent: currentNode,
						};
						currentNode.children.push(node);
					}
					const dirMatch = /^dir (?<name>.+)$/.exec(line);
					if (dirMatch) {
						const node = {
							name: dirMatch.groups.name,
							isDirectory: true,
							children: [],
							parent: currentNode,
						};
						currentNode.children.push(node);
					}
				} else {
					throw new Error("unknown state");
				}
			}
		}

		return tree;
	}

	function printTree(node, depth = 0) {
		console.log(
			`${" ".repeat(depth * 2)}- ${node.name} (${
				node.isDirectory ? "dir" : `file, size=${node.size}`
			})`
		);
		if (node.isDirectory) {
			for (const child of node.children) {
				printTree(child, depth + 1);
			}
		}
	}

	function getSize(node, directoryCallback = () => {}) {
		if (!node.isDirectory) return node.size;

		const directorySize = node.children
			.map((child) => getSize(child, directoryCallback))
			.reduce((a, b) => a + b, 0);

		directoryCallback(node.name, directorySize);

		return directorySize;
	}

	function part1() {
		const thresholdSize = 100000;
		const tree = createTree(filteredData);

		// printTree(tree);

		let sumSmallFolders = 0;
		const discSize = 70000000;
		let spaceLeft = 0;
		let dirToDelete = 0;
		let smallestSize = 0;

		getSize(tree, (name, size) => {
			// console.log(name, size);

			if (size <= thresholdSize) {
				sumSmallFolders += size;
			}
		});

		p1.innerHTML = `Part 1: ${sumSmallFolders}`;
	}

	function part2() {
		const discSize = 70000000;
		const requiredSpace = 30000000;
		const tree = createTree(filteredData);

		const usedSpace = getSize(tree);
		const availableSpace = discSize - usedSpace;

		if (availableSpace >= requiredSpace) {
			throw new Error("There is enough space already");
		}

		const minimumFolderSize = requiredSpace - availableSpace;

		const candidates = [];

		getSize(tree, (name, size) => {
			if (size >= minimumFolderSize)
				candidates.push({
					name,
					size,
				});
		});

		candidates.sort((a, b) => a.size - b.size);

		p2.innerHTML = `Part 2: ${candidates[0].size}`;
	}

	part1();
	part2();
}

day7();
