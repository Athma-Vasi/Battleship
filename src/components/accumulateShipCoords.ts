const accumulateShipCoords = function (currentShipCoords_: string[]) {
	const playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? ''
	)

	//add currentship coordinate to rest of ships
	currentShipCoords_.forEach((coord) => playerShipsCoords.push(coord))

	localStorage.setItem('playerShipsCoords', JSON.stringify(playerShipsCoords))
}
export { accumulateShipCoords }
