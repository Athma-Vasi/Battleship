import {
	addAttributeToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from './elementCreators';
import { renderStarsAndShipsInPlayerBoard } from './renderStarsAndShipsInPlayerBoard';

/**
 * Renders the player's game board to the DOM and adds data attributes to each cell
 *
 * @function
 * @returns {void}
 */
function renderPlayerBoard(): void {
	const main: HTMLElement | null = document.querySelector('.main');

	const gameBoardContainer = elemCreator('div')(['gameBoard-container']);
	appendElemToParent(main)(gameBoardContainer);

	const gamePlayerBoardWrapper = elemCreator('div')(['gamePlayerBoard-wrapper']);
	appendElemToParent(gameBoardContainer)(gamePlayerBoardWrapper);

	const playerBoardContainer = elemCreator('div')(['playerBoard-container']);
	appendElemToParent(gamePlayerBoardWrapper)(playerBoardContainer);

	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			// renders a div per iteration of for-loop and append
			pipe(
				addAttributeToElem([['data-cellplayer', `${j},${i}`]]),
				appendElemToParent(playerBoardContainer)
			)(elemCreator('div')(['player-gameCell']));
		}
	}

	renderStarsAndShipsInPlayerBoard();
}

export { renderPlayerBoard };
