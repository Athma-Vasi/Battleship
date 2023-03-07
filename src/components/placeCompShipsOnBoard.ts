import { populateCompShipsCoords } from '../utilities/populateCompShipsCoords';
import { renderCompShipsOnBoard } from './renderCompShipsOnBoard';

const placeCompShipsOnBoard = function () {
	const randCompShipPlacement = populateCompShipsCoords();

	renderCompShipsOnBoard(randCompShipPlacement);
};

export { placeCompShipsOnBoard };
