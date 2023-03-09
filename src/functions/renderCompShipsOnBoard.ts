import {
	addAttributeToElem,
	addStyleToElem,
	addTextToElem,
	pipe,
} from '../functions/elementCreators';
import { CompShipsPlacementChoice, Div, NodesDiv } from '../types';

/**
 * Renders the randomly generated computer's ships locations to the game board and renders '✴' to all the cells to hide the ships
 *
 * @function
 * @param {Object} compShipsPlacementChoice_ - object containing all the computer's ships' placement coordinates
 * @returns {void}
 */
const renderCompShipsOnBoard = function (
	compShipsPlacementChoice_: CompShipsPlacementChoice
): void {
	// used for hit detection
	const compShipsCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsCoords') ?? JSON.stringify([])
	);

	Object.entries(compShipsPlacementChoice_).forEach(([ship, shipObj]) => {
		// if the compShips obj does not exist, creates it, then stores it in camelcase i.e., compCarrier
		if (!localStorage.getItem(`comp${ship[0].toUpperCase() + ship.slice(1)}`)) {
			localStorage.setItem(
				`comp${ship[0].toUpperCase() + ship.slice(1)}`,
				JSON.stringify(shipObj)
			);
		}

		// for superdreadnought, carrier, battleship properties whose attributes do not consist of an array
		if (!Array.isArray(shipObj)) {
			Object.entries(shipObj).forEach(([shipSection, sectionCoords]) => {
				//grab the corresponding game board cell
				const shipCell: Div = document.querySelector(
					`[data-cellcomp="${sectionCoords}"]`
				);

				pipe(
					addAttributeToElem([['class', 'compShipPresent comp-gameCell']]),
					addTextToElem('✴'),
					addStyleToElem([['border', '1px solid #00f000']])
				)(shipCell);

				// store the co-ordinates
				compShipsCoords.push(sectionCoords);
			});
		} else {
			// for destroyers and frigates properties whose attributes consist of an array
			shipObj.forEach((ship) => {
				Object.entries(ship).forEach(([shipSection, sectionCoords]) => {
					// grab the corresponding game board cell
					const shipCell: Div = document.querySelector(
						`[data-cellcomp="${sectionCoords}"]`
					);

					pipe(
						addAttributeToElem([['class', 'compShipPresent comp-gameCell']]),
						addTextToElem('✴'),
						addStyleToElem([['border', '1px solid #00f000']])
					)(shipCell);

					// store the co-ordinates
					compShipsCoords.push(sectionCoords);
				});
			});
		}
	});

	const compGameCells: NodesDiv = document.querySelectorAll('.comp-gameCell');

	// differentiates between ships and empty spaces
	compGameCells.forEach((cell) => {
		if (!cell.classList.contains('compShipPresent')) {
			pipe(
				addAttributeToElem([['class', 'compShipNotPresent comp-gameCell']]),
				addTextToElem('✴')
			)(cell);
		}
	});

	// puts the coordinates in storage for future hit detection checks
	localStorage.setItem('compShipsCoords', JSON.stringify(compShipsCoords));
};

export { renderCompShipsOnBoard };
