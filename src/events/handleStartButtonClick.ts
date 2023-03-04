import { placeCompShipsOnBoard } from '../components/placeCompShipsOnBoard';
import { randomizeAndStoreShipNames } from '../components/randomizeAndStoreShipNames';
import { renderCompBoard } from '../components/renderCompBoard';
import { compShipsPlacementChoicesArr } from '../data/compShipsPlacementChoicesArr';
import { shipNames } from '../data/shipNames';
import {
	addEvtListener,
	addStyleToElem,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators';
import { renderPlayerBoard } from '../utilities/renderPlayerBoard';
import { renderTacticalOverview } from '../utilities/renderTacticalOverview';
import { Div, NodesDiv } from '../utilities/types';
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses';
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips';

const handleStartButtonClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	//removes the previous info screen
	const infoScreenWrapper = document.querySelector('.infoScreen-wrapper');
	infoScreenWrapper?.remove();

	const preBattleInfoScreen = document.querySelector('.preBattle-infoScreen');
	preBattleInfoScreen?.remove();

	//removes the ship bttns wrapper
	const shipBttnsWrapper = document.querySelector('.shipBttns-wrapper');
	shipBttnsWrapper?.remove();

	const bothBoardsContainer = document.querySelector('.bothBoards-container');
	bothBoardsContainer?.remove();

	//remove the start button
	this.remove();

	//renders player and comp board and places the ships
	renderPlayerBoard();
	renderCompBoard();
	placeCompShipsOnBoard(compShipsPlacementChoicesArr);

	//randomizes and store ship names for each battle
	randomizeAndStoreShipNames(shipNames);

	if (!localStorage.getItem('isGameRunning')) {
		localStorage.setItem('isGameRunning', JSON.stringify(true));
	}

	//adds evt listeners to comp game board cells
	const compShipPresentCells: NodesDiv = document.querySelectorAll('.compShipPresent');
	compShipPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompShips)(cell)
	);

	const compShipNotPresentCells: NodesDiv =
		document.querySelectorAll('.compShipNotPresent');
	compShipNotPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompMisses)(cell)
	);

	//renders a new info screen for the battle texts
	const main: HTMLElement | null = document.querySelector('.main');

	pipe(appendElemToParent(main))(elemCreator('div')(['infoScreen-wrapper']));

	// render tactical overview
	renderTacticalOverview();

	const gameBoardContainer: Div = document.querySelector('.gameBoard-container');

	// renders a new info screen for the battle texts
	const battleMessageWrapper = elemCreator('div')(['battleMessage-wrapper']);
	pipe(
		// addStyleToElem([['position', 'relative']]),
		appendElemToParent(gameBoardContainer)
	)(battleMessageWrapper);

	pipe(
		addTextToElem('Manticoran Tenth Fleet CIC'),
		// addStyleToElem([
		// 	['color', '#00f000'],
		// 	['position', 'sticky'],
		// 	['top', '0'],
		// ]),
		appendElemToParent(battleMessageWrapper)
	)(elemCreator('h2')(['battleMessageTitleElem']));

	const battleMessageContainer = elemCreator('div')(['battleMessage-container']);
	appendElemToParent(battleMessageWrapper)(battleMessageContainer);
};

export { handleStartButtonClick };
