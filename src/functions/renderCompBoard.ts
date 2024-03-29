import {
	addAttributeToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../functions/elementCreators';
import { Div } from '../types';

/**
 * Renders the computer's game board to the DOM and adds data attributes to each cell
 * @function
 * @returns {void}
 */
const renderCompBoard = function (): void {
	const gameBoardContainer: Div = document.querySelector('.gameBoard-container');

	const compBoardWrapper = elemCreator('div')(['compBoard-wrapper']);
	appendElemToParent(gameBoardContainer)(compBoardWrapper);

	const compBoardContainer = elemCreator('div')(['compBoard-container']);
	appendElemToParent(compBoardWrapper)(compBoardContainer);

	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			pipe(
				addAttributeToElem([['data-cellcomp', `${j},${i}`]]),
				appendElemToParent(compBoardContainer)
			)(elemCreator('div')(['comp-gameCell']));
		}
	}
};
export { renderCompBoard };
