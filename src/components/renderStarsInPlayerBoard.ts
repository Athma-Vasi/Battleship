import { addAttributeToElem, addTextToElem, pipe } from '../utilities/elementCreators';
import { NodesDiv } from '../utilities/types';

const renderStarsInPlayerBoard = function () {
	const playerGameCell: NodesDiv = document.querySelectorAll('.player-gameCell');

	//adds stars and a corresponding class to differentiate the cells which do not consist of a player ship
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
