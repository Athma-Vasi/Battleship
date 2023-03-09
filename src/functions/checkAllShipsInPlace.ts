import { renderStarsInPlayerBoard } from './renderStarsInPlayerBoard';
import { renderStartButton } from './renderStartButton';

/**
 * Checks if all the player ships have been placed on the board and if so, renders the start button
 *
 * @function
 * @returns {void}
 */
const checkAllShipsInPlace = function (): void {
	// if playerShip co-ordinates does not exist, create it to check its length which is the sum total of length of all player ships
	if (localStorage.getItem('playerShipsCoords')) {
		const shipsCoordsArr: string[] = JSON.parse(
			localStorage.getItem('playerShipsCoords') ?? JSON.stringify([])
		);

		// if all the player ships have been placed
		if (shipsCoordsArr.length === 18) {
			// adds stars to player board
			renderStarsInPlayerBoard();
			// STARTS GAME
			renderStartButton();
		}
	}
};
export { checkAllShipsInPlace };
