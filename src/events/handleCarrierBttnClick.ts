import {
	addEvtListener,
	addStyleToElem,
	pipe,
	removeEvtListener,
} from '../functions/elementCreators';
import { Button, NodesDiv } from '../types';
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick';
import { handleCarrierCellClick } from './handleCarrierCellClick';
import { handleCarrierMouseEnter } from './handleCarrierMouseEnter';
import { handleCarrierMouseLeave } from './handleCarrierMouseLeave';
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick';
import { handleFrigateBttnClick } from './handleFrigateBttnClick';
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick';

/**
 *  Handles click event on carrier ship selection button by disabling the button and other ship selection buttons
 * by removing their event listeners until after the ship is placed on the game board.
 * Also adds event listeners to the game board cells to handle (carrier) mouseenter, mouseleave, and click events.
 *
 * @function
 * @param {HTMLButtonElement} this - The button that was clicked.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handleCarrierBttnClick = function (this: HTMLButtonElement, ev: MouseEvent): void {
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell');

	// disables button after clicking once
	this.disabled = true;

	// visually indicates that 'this' button is selected
	pipe(
		addStyleToElem([
			['border', '1px solid #f0a400'],
			['color', '#f0a400'],
		])
	)(this);

	// disables clicking on other shipButtons while selected
	// prevents double selection
	const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought');
	if (superdreadnoughtBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleSuperdreadnoughtBttnClick)
		)(superdreadnoughtBttn);

	const battleshipBttn: Button = document.querySelector('.bttn-battleship');
	if (battleshipBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleBattleshipBttnClick)
		)(battleshipBttn);

	const destroyerBttn: Button = document.querySelector('.bttn-destroyer');
	if (destroyerBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleDestroyerBttnClick)
		)(destroyerBttn);

	const frigateBttn: Button = document.querySelector('.bttn-frigate');
	if (frigateBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleFrigateBttnClick)
		)(frigateBttn);

	// assigns event listener to each player game cell after clicking superdreadnought button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleCarrierCellClick),
			addEvtListener('mouseenter')(handleCarrierMouseEnter),
			addEvtListener('mouseleave')(handleCarrierMouseLeave)
		)(player)
	);
};

export { handleCarrierBttnClick };
