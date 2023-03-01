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
