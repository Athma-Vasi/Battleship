import { shipNames } from '../data/shipNames';
import {
	addEvtListener,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../functions/elementCreators';
import { placeCompShipsOnBoard } from '../functions/placeCompShipsOnBoard';
import { randomizeAndStoreShipNames } from '../functions/randomizeAndStoreShipNames';
import { renderCompBoard } from '../functions/renderCompBoard';
import { renderPlayerBoard } from '../functions/renderPlayerBoard';
import { renderTacticalOverview } from '../functions/renderTacticalOverview';
import { Div, NodesDiv } from '../types';
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses';
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips';

/**
 * Handles click event on the start button by removing the info screen, the start button, and the ship buttons wrapper. It then renders the player and computer boards, places the ships on the computer board, randomizes and stores the ship names for each battle, adds event listeners to the computer board cells, and renders a new info screen for the battle texts.
 *
 * @function
 * @param {HTMLButtonElement} this - The button that was clicked.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handleStartButtonClick = function (this: HTMLButtonElement, ev: MouseEvent): void {
	// scroll to top of window
	window.scrollTo(0, 0);

	// removes the previous info screen
	const infoScreenContainer = document.querySelector('.infoScreen-container');
	infoScreenContainer?.remove();

	const preBattleInfoScreen = document.querySelector('.preBattle-infoScreen');
	preBattleInfoScreen?.remove();

	// removes the ship bttns wrapper
	const shipBttnsWrapper = document.querySelector('.shipBttns-wrapper');
	shipBttnsWrapper?.remove();

	const bothBoardsContainer = document.querySelector('.bothBoards-container');
	bothBoardsContainer?.remove();

	// remove the start button
	this.remove();

	// renders player and comp board and places the ships
	renderPlayerBoard();
	renderCompBoard();
	// placeCompShipsOnBoard(compShipsPlacementChoicesArr);
	placeCompShipsOnBoard();

	//randomizes and store ship names for each battle
	randomizeAndStoreShipNames(shipNames);

	if (!localStorage.getItem('isGameRunning')) {
		localStorage.setItem('isGameRunning', JSON.stringify(true));
	}

	// adds evt listeners to comp game board cells
	const compShipPresentCells: NodesDiv = document.querySelectorAll('.compShipPresent');
	compShipPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompShips)(cell)
	);

	const compShipNotPresentCells: NodesDiv =
		document.querySelectorAll('.compShipNotPresent');
	compShipNotPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompMisses)(cell)
	);

	// renders a new info screen for the battle texts
	const main: HTMLElement | null = document.querySelector('.main');

	pipe(appendElemToParent(main))(elemCreator('div')(['infoScreen-wrapper']));

	// render tactical overview
	renderTacticalOverview();

	const gameBoardContainer: Div = document.querySelector('.gameBoard-container');

	// renders a new info screen for the battle texts
	const battleMessageWrapper = elemCreator('div')(['battleMessage-wrapper']);
	pipe(appendElemToParent(gameBoardContainer))(battleMessageWrapper);

	pipe(
		addTextToElem('Manticoran Tenth Fleet CIC'),
		appendElemToParent(battleMessageWrapper)
	)(elemCreator('h2')(['battleMessageTitleElem']));

	const today = new Date();
	const formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
	});
	const formattedDate = formatter.format(today);

	pipe(
		addTextToElem(`Imperial Terran-year 1913 ${formattedDate}`),
		appendElemToParent(battleMessageWrapper)
	)(elemCreator('h4')(['battleMessageElem']));

	const battleMessageContainer = elemCreator('div')(['battleMessage-container']);
	appendElemToParent(battleMessageWrapper)(battleMessageContainer);
};

export { handleStartButtonClick };
