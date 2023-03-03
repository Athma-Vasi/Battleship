import {
	addStyleToElem,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from './elementCreators';
import {
	Battleship,
	Carrier,
	Destroyer,
	Div,
	Frigate,
	ShipType,
	Superdreadnought,
} from './types';

function updateCompTacticalOverviewShips(shipType: ShipType, shipNumber?: number) {
	// at each fire by player towards computer, the computer ships coords are checked to see if all adjacent cells are hit, if so, the ship is sunk and message is displayed to player
	// this ensures that player does not easily determine the type of ship and whether it is sunk or not by the number of hits on the ship

	console.log('shipType from updateCompTacticalOverviewShips()', shipType);

	const compShipsCoords:
		| Superdreadnought
		| Carrier
		| Battleship
		| Destroyer[]
		| Frigate[] = JSON.parse(
		localStorage.getItem(`comp${shipType}`) ?? JSON.stringify([])
	);

	console.log('adjUnknownCells from updateCompTacticalOverviewShips()', adjUnknownCells);

	// if all adjacent cells are hit, the ship is sunk and the ship is displayed as sunk in the tactical overview
	if (adjUnknownCells.length === 0) {
		// grab the comp tactical overview container for the ship type
		const compSunkShipContainer: Div = document.querySelector(
			`[data-compshiptype=${shipType}${shipNumber ?? ''}]`
		);

		// remove the child nodes that contain '?'
		while (compSunkShipContainer?.firstChild) {
			compSunkShipContainer.removeChild(compSunkShipContainer.firstChild);
		}

		const lengthOfCells =
			shipType === 'Superdreadnought'
				? 5
				: shipType === 'Carrier'
				? 4
				: shipType === 'Battleship'
				? 3
				: shipType === 'Destroyers'
				? 2
				: 1;

		// display sunk ship with '💥' emoji
		for (let i = 0; i < lengthOfCells; i += 1) {
			pipe(
				addTextToElem('💥'),
				addStyleToElem([['color', '#f0a400']]),
				appendElemToParent(compSunkShipContainer)
			)(elemCreator('p')(['comp-tacticalCell']));
		}
	}
}

export { updateCompTacticalOverviewShips };
