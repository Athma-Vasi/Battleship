/**
 * Adds coordinates of the currently placed player ship on the board, to the array of coordinates of all the player's ships and stores it in local storage
 * @function
 * @param {string[]} currentShipCoords_ - Array of coordinates of the current ship
 * @returns {void}
 */
const accumulatePlayerShipCoords = function (currentShipCoords_: string[]): void {
	const playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? ''
	);

	// adds currentship coordinate to rest of ships
	currentShipCoords_.forEach((coord) => playerShipsCoords.push(coord));

	localStorage.setItem('playerShipsCoords', JSON.stringify(playerShipsCoords));
};
export { accumulatePlayerShipCoords };
