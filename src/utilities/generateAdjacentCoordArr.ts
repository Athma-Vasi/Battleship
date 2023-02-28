function generateAdjacentCoordArr(
	prevCompFireOnPlayerCoord: string,
	compHitOnPlayerCoordsArr: string[],
	compMissOnPlayerCoordsArr: string[]
): string[] {
	const prevCompHitOnPlayerCoords = prevCompFireOnPlayerCoord.split(',');
	const xCoord = parseInt(prevCompHitOnPlayerCoords[0].replace('"', ''));
	const yCoord = parseInt(prevCompHitOnPlayerCoords[1].replace('"', ''));

	console.log('prevCompHitOnPlayerCoords', prevCompHitOnPlayerCoords);
	console.log('xCoord', xCoord);
	console.log('yCoord', yCoord);

	//generate adjacent coords
	const adjacentCoords: string[] = [];

	// loop through each of the previous hits and generate adjacent coords
	compHitOnPlayerCoordsArr.forEach((coord) => {
		const xyCoords = coord.split(',');
		const xCoord = parseInt(xyCoords[0].replace('"', ''));
		const yCoord = parseInt(xyCoords[1].replace('"', ''));

		//top
		if (yCoord - 1 >= 0) adjacentCoords.push(`${xCoord},${yCoord - 1}`);

		//right
		if (xCoord + 1 <= 9) adjacentCoords.push(`${xCoord + 1},${yCoord}`);

		//bottom
		if (yCoord + 1 <= 9) adjacentCoords.push(`${xCoord},${yCoord + 1}`);

		//left
		if (xCoord - 1 >= 0) adjacentCoords.push(`${xCoord - 1},${yCoord}`);
	});

	//filter the coords that have already been hit or missed
	const uniqueAdjacentCoords = adjacentCoords.filter(
		(coord) =>
			!compHitOnPlayerCoordsArr.includes(coord) &&
			!compMissOnPlayerCoordsArr.includes(coord)
	);

	return uniqueAdjacentCoords;
}

export { generateAdjacentCoordArr };

/**
 
	{
		//top
		let topCoordStep = 1;
		let topCoord = `${xCoord},${yCoord - topCoordStep}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(topCoord) && !infiniteLoop) {
			// top of the board
			if (yCoord - topCoordStep >= 0) {
				topCoord = `${xCoord},${yCoord - topCoordStep}`;
				topCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (yCoord - topCoordStep >= 0) {
			adjacentCoords.push(topCoord);
		}
		console.log('topCoord', topCoord);
	}

	{
		//right
		let rightCoordStep = 1;
		let rightCoord = `${xCoord + rightCoordStep},${yCoord}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(rightCoord) && !infiniteLoop) {
			// right of the board
			if (xCoord + rightCoordStep <= 9) {
				rightCoord = `${xCoord + rightCoordStep},${yCoord}`;
				rightCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (xCoord + rightCoordStep <= 9) {
			adjacentCoords.push(rightCoord);
		}
		console.log('rightCoord', rightCoord);
	}

	{
		//bottom
		let bottomCoordStep = 1;
		let bottomCoord = `${xCoord},${yCoord + bottomCoordStep}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(bottomCoord) && !infiniteLoop) {
			// bottom of the board
			if (yCoord + bottomCoordStep <= 9) {
				bottomCoord = `${xCoord},${yCoord + bottomCoordStep}`;
				bottomCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (yCoord + bottomCoordStep <= 9) {
			adjacentCoords.push(bottomCoord);
		}
		console.log('bottomCoord', bottomCoord);
	}

	{
		//left
		let leftCoordStep = 1;
		let leftCoord = `${xCoord - leftCoordStep},${yCoord}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(leftCoord) && !infiniteLoop) {
			// left of the board
			if (xCoord - leftCoordStep >= 0) {
				leftCoord = `${xCoord - leftCoordStep},${yCoord}`;
				leftCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (xCoord - leftCoordStep >= 0) {
			adjacentCoords.push(leftCoord);
		}
		console.log('leftCoord', leftCoord);
	}

 */
