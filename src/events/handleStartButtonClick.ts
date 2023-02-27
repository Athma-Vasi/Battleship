import { placeCompShipsOnBoard } from '../components/placeCompShipsOnBoard';
import { randomizeAndStoreShipNames } from '../components/randomizeAndStoreShipNames';
import { renderCompBoard } from '../components/renderCompBoard';
import { compShipsPlacementChoicesArr } from '../data/compShipsPlacementChoicesArr';
import { shipNames } from '../data/shipNames';
import {
	addEvtListener,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators';
import { NodesDiv } from '../utilities/types';
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

	//remove the start button
	this.remove();

	//renders comp board and place the ships
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
};

export { handleStartButtonClick };
