function generateAdjacentCoordsArr(coord: string, length = 1): string[] {
	const xyCoords = coord.split(',');
	const xCoord = parseInt(xyCoords[0].replace('"', ''));
	const yCoord = parseInt(xyCoords[1].replace('"', ''));

	// generate adjacent coords of specified length based on coord location
	const adjacentCoords: string[] = [];

	for (let i = 1; i <= length; i += 1) {
		// top
		const topCoord = `${xCoord},${yCoord - i}`;
		if (yCoord - i >= 0) adjacentCoords.push(topCoord);

		// right
		const rightCoord = `${xCoord + i},${yCoord}`;
		if (xCoord + i <= 9) adjacentCoords.push(rightCoord);

		// bottom
		const bottomCoord = `${xCoord},${yCoord + i}`;
		if (yCoord + i <= 9) adjacentCoords.push(bottomCoord);

		// left
		const leftCoord = `${xCoord - i},${yCoord}`;
		if (xCoord - i >= 0) adjacentCoords.push(leftCoord);
	}

	return adjacentCoords;
}

export { generateAdjacentCoordsArr };
