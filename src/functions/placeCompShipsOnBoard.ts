import { populateCompShipsCoords } from '../functions/populateCompShipsCoords';
import { renderCompShipsOnBoard } from './renderCompShipsOnBoard';

const placeCompShipsOnBoard = function (): void {
	const randCompShipPlacement = populateCompShipsCoords();

	renderCompShipsOnBoard(randCompShipPlacement);
};

export { placeCompShipsOnBoard };
