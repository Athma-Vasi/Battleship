import {
	addAttributeToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators';
import { renderTacticalOverview } from '../utilities/renderTacticalOverview';

const renderPlayerBoard = function () {
	const main: HTMLElement | null = document.querySelector('.main');

	const bothBoardsContainer = elemCreator('div')(['bothBoards-container']);
	appendElemToParent(main)(bothBoardsContainer);

	const playerBoardWrapper = elemCreator('div')(['playerBoard-wrapper']);
	appendElemToParent(bothBoardsContainer)(playerBoardWrapper);

	const playerBoardContainer = elemCreator('div')(['playerBoard-container']);
	appendElemToParent(playerBoardWrapper)(playerBoardContainer);

	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			//renders a div per iteration of for-loop and append
			pipe(
				addAttributeToElem([['data-cellplayer', `${j},${i}`]]),
				appendElemToParent(playerBoardContainer)
			)(elemCreator('div')(['player-gameCell']));
		}
	}
};
export { renderPlayerBoard };
