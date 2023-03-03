import {
	addAttributeToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from './elementCreators';
import { renderStarsAndShipsInPlayerBoard } from './renderStarsAndShipsInPlayerBoard';

function renderPlayerBoard() {
	const main: HTMLElement | null = document.querySelector('.main');

	const gameBoardContainer = elemCreator('div')(['gameBoard-container']);
	appendElemToParent(main)(gameBoardContainer);

	const gamePlayerBoardWrapper = elemCreator('div')(['gamePlayerBoard-wrapper']);
	appendElemToParent(gameBoardContainer)(gamePlayerBoardWrapper);

	const playerBoardContainer = elemCreator('div')(['playerBoard-container']);
	appendElemToParent(gamePlayerBoardWrapper)(playerBoardContainer);

	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			//renders a div per iteration of for-loop and append
			pipe(
				addAttributeToElem([['data-cellplayer', `${j},${i}`]]),
				appendElemToParent(playerBoardContainer)
			)(elemCreator('div')(['player-gameCell']));
		}
	}

	renderStarsAndShipsInPlayerBoard();
}

export { renderPlayerBoard };

/**
 
  // adds stars and a corresponding class to differentiate the cells which do not consist of a player ship
	playerGameCell.forEach((cell) => {
		if (!cell.classList.contains('playerShipPresent')) {
			pipe(
				addTextToElem('✴'),
				addAttributeToElem([['class', 'player-gameCell playerShipNotPresent']])
			)(cell);
		}
	});


  if (Object.values(superdreadnoughtCoords).includes(cell.dataset.cellplayer ?? '')) {
			pipe(
				addTextToElem('S'),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (battleshipCoords.includes(cell.dataset.cellplayer)) {
			pipe(
				addTextToElem('B'),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (carrierCoords.includes(cell.dataset.cellplayer)) {
			pipe(
				addTextToElem('C'),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (destroyerCoords.includes(cell.dataset.cellplayer)) {
			pipe(
				addTextToElem('D'),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else if (frigateCoords.includes(cell.dataset.cellplayer)) {
			pipe(
				addTextToElem('F'),
				addAttributeToElem([['class', 'player-gameCell playerShipPresent']])
			)(cell);
		} else {
			pipe(
				addTextToElem('✴'),
				addAttributeToElem([['class', 'player-gameCell playerShipNotPresent']])
			)(cell);
		}

 */
