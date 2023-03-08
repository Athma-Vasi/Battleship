import {
	addEvtListener,
	addStyleToElem,
	pipe,
	removeEvtListener,
} from '../functions/elementCreators';
import { Button, NodesDiv } from '../functions/types';
import { handleBattleshipCellClick } from './handleBattleshipCellClick';
import { handleBattleshipMouseEnter } from './handleBattleshipMouseEnter';
import { handleBattleshipMouseLeave } from './handleBattleshipMouseLeave';
import { handleCarrierBttnClick } from './handleCarrierBttnClick';
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick';
import { handleFrigateBttnClick } from './handleFrigateBttnClick';
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick';

const handleBattleshipBttnClick = function (
	this: HTMLButtonElement,
	ev: MouseEvent
): void {
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell');

	// disables this button after clicking
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

	const carrierBttn: Button = document.querySelector('.bttn-carrier');
	if (carrierBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleCarrierBttnClick)
		)(carrierBttn);

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

	// assigns event listeners to each player game cell after clicking battleship button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleBattleshipCellClick),
			addEvtListener('mouseenter')(handleBattleshipMouseEnter),
			addEvtListener('mouseleave')(handleBattleshipMouseLeave)
		)(player)
	);
};
export { handleBattleshipBttnClick };
