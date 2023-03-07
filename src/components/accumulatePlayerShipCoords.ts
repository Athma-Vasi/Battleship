const accumulatePlayerShipCoords = function (currentShipCoords_: string[]): void {
	const playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? ''
	);

	// adds currentship coordinate to rest of ships
	currentShipCoords_.forEach((coord) => playerShipsCoords.push(coord));

	localStorage.setItem('playerShipsCoords', JSON.stringify(playerShipsCoords));
};
export { accumulatePlayerShipCoords };
