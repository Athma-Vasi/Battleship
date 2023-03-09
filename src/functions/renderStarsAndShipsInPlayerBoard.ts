import {
	Battleship,
	Carrier,
	Destroyer,
	Frigate,
	NodesDiv,
	Superdreadnought,
} from '../types';
import {
	addAttributeToElem,
	addStyleToElem,
	addTextToElem,
	pipe,
} from './elementCreators';

/**
 * Renders the stars and ships in the player board
 *
 * @function
 * @returns {void}
 */
function renderStarsAndShipsInPlayerBoard(): void {
	const superdreadnoughtCoords: Superdreadnought = JSON.parse(
		localStorage.getItem('superdreadnought') ?? JSON.stringify([])
	);
	const superdreadnoughtCoordsArray = Object.values(superdreadnoughtCoords);

	const battleshipCoords: Battleship = JSON.parse(
		localStorage.getItem('battleship') ?? JSON.stringify([])
	);
	const battleshipCoordsArray = Object.values(battleshipCoords);

	const carrierCoords: Carrier = JSON.parse(
		localStorage.getItem('carrier') ?? JSON.stringify([])
	);
	const carrierCoordsArray = Object.values(carrierCoords);

	const destroyerCoords: Destroyer[] = JSON.parse(
		localStorage.getItem('destroyer') ?? JSON.stringify([])
	);
	const destroyerCoordsArray = destroyerCoords.flatMap((destroyer) =>
		Object.values(destroyer)
	);

	const frigateCoords: Frigate[] = JSON.parse(
		localStorage.getItem('frigate') ?? JSON.stringify([])
	);
	const frigateCoordsArray = frigateCoords.flatMap((frigate) => Object.values(frigate));

	// grabs the cells for the player's ships and add the corresponding letter
	const playerGameCell: NodesDiv = document.querySelectorAll('.player-gameCell');

	// if the cell's data-cellplayer attribute is included in the array of
	// coords for that ship, add the corresponding letter to the cell and add the class playerShipPresent
	// else add a star and class playerShipNotPresent
	playerGameCell.forEach((cell) => {
		if (superdreadnoughtCoordsArray.includes(cell.dataset.cellplayer ?? '')) {
			pipe(
				addTextToElem('S'),
				addStyleToElem([['color', '#f0a400']]),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (battleshipCoordsArray.includes(cell.dataset.cellplayer ?? '')) {
			pipe(
				addTextToElem('B'),
				addStyleToElem([['color', '#f0a400']]),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (carrierCoordsArray.includes(cell.dataset.cellplayer ?? '')) {
			pipe(
				addTextToElem('C'),
				addStyleToElem([['color', '#f0a400']]),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (destroyerCoordsArray.includes(cell.dataset.cellplayer ?? '')) {
			pipe(
				addTextToElem('D'),
				addStyleToElem([['color', '#f0a400']]),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (frigateCoordsArray.includes(cell.dataset.cellplayer ?? '')) {
			pipe(
				addTextToElem('F'),
				addStyleToElem([['color', '#f0a400']]),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else {
			pipe(
				addTextToElem('✴'),
				addStyleToElem([['color', 'gainsboro']]),
				addAttributeToElem([['class', 'player-gameCell playerShipNotPresent']])
			)(cell);
		}
	});
}

export { renderStarsAndShipsInPlayerBoard };
