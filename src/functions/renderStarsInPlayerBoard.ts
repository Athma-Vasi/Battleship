import { addAttributeToElem, addTextToElem, pipe } from '../functions/elementCreators';
import { NodesDiv } from '../types';

/**
 *  Renders stars in the player's game board for cells which do not contain a ship
 *
 * @function
 * @returns {void}
 */
const renderStarsInPlayerBoard = function (): void {
	const playerGameCell: NodesDiv = document.querySelectorAll('.player-gameCell');

	// adds stars and a corresponding class to differentiate the cells which do not consist of a player ship
	playerGameCell.forEach((cell) => {
		if (!cell.classList.contains('playerShipPresent')) {
			pipe(
				addTextToElem('✴'),
				addAttributeToElem([['class', 'player-gameCell playerShipNotPresent']])
			)(cell);
		}
	});
};
export { renderStarsInPlayerBoard };
