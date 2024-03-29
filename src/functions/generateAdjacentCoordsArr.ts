/**
 * Generates an cloud of adjacent coordinates based on a given coordinate. The cloud is generated based on a radius.
 *
 * @function
 * @param {string} coord - Coordinate to generate adjacent coordinates from
 * @param {number} radius - Radius of the cloud
 * @returns {string[]} - Array of adjacent coordinates
 */
function generateAdjacentCoordsArr(coord: string, radius = 1): string[] {
	const xyCoords = coord.split(',');
	const xCoord = parseInt(xyCoords[0].replace('"', ''));
	const yCoord = parseInt(xyCoords[1].replace('"', ''));

	// generates adjacent coords of specified radius based on coord location
	const adjacentCoords: string[] = [];

	for (let i = 1; i <= radius; i += 1) {
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
