import {
	addAttributeToElem,
	addStyleToElem,
	addTextToElem,
	pipe,
} from './elementCreators';
import {
	Battleship,
	Carrier,
	Destroyer,
	Frigate,
	NodesDiv,
	Superdreadnought,
} from './types';

function renderStarsAndShipsInPlayerBoard() {
	const playerGameCell: NodesDiv = document.querySelectorAll('.player-gameCell');

	// grab the cells for the player's ships and add the corresponding letter
	const superdreadnoughtCoords: Superdreadnought = JSON.parse(
		localStorage.getItem('superdreadnought') || JSON.stringify([])
	);
	const superdreadnoughtCoordsArray = Object.values(superdreadnoughtCoords);

	const battleshipCoords: Battleship = JSON.parse(
		localStorage.getItem('battleship') || JSON.stringify([])
	);
	const battleshipCoordsArray = Object.values(battleshipCoords);

	const carrierCoords: Carrier = JSON.parse(
		localStorage.getItem('carrier') || JSON.stringify([])
	);
	const carrierCoordsArray = Object.values(carrierCoords);

	const destroyerCoords: Destroyer[] = JSON.parse(
		localStorage.getItem('destroyer') || JSON.stringify([])
	);
	const destroyerCoordsArray = destroyerCoords.flatMap((destroyer) =>
		Object.values(destroyer)
	);

	const frigateCoords: Frigate[] = JSON.parse(
		localStorage.getItem('frigate') || JSON.stringify([])
	);
	const frigateCoordsArray = frigateCoords.flatMap((frigate) => Object.values(frigate));

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
