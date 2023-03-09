import { populateCompShipsCoords } from '../functions/populateCompShipsCoords';
import { renderCompShipsOnBoard } from './renderCompShipsOnBoard';

/**
 * Places the computer's ships on the game board by calling the functions which randomly generate the coordinates and renders the ships
 *
 * @function
 * @returns {void}
 */
const placeCompShipsOnBoard = function (): void {
	const randCompShipPlacement = populateCompShipsCoords();

	renderCompShipsOnBoard(randCompShipPlacement);
};

export { placeCompShipsOnBoard };
