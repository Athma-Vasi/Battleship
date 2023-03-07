import { populateCompShipsCoords } from '../utilities/populateCompShipsCoords';
import { renderCompShipsOnBoard } from './renderCompShipsOnBoard';

const placeCompShipsOnBoard = function () {
	const randCompShipPlacement = populateCompShipsCoords();

	console.table(randCompShipPlacement);

	renderCompShipsOnBoard(randCompShipPlacement);
};

export { placeCompShipsOnBoard };
