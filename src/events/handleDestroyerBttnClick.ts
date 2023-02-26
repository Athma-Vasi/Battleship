import { Button, Div, NodesDiv } from '../utilities/types';
import {
	addEvtListener,
	addStyleToElem,
	pipe,
	removeEvtListener,
} from '../utilities/elementCreators';
import { handleDestroyerCellClick } from './handleDestroyerCellClick';
import { handleDestroyerMouseEnter } from './handleDestroyerMouseEnter';
import { handleDestroyerMouseLeave } from './handleDestroyerMouseLeave';
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick';
import { handleCarrierBttnClick } from './handleCarrierBttnClick';
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick';
import { handleFrigateBttnClick } from './handleFrigateBttnClick';

const handleDestroyerBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell');

	//assigns event listeners to each player game cell after clicking destroyer button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleDestroyerCellClick),
			addEvtListener('mouseenter')(handleDestroyerMouseEnter),
			addEvtListener('mouseleave')(handleDestroyerMouseLeave)
		)(player)
	);

	//disables this button after clicking
	this.disabled = true;

	//visually indicates that 'this' button is selected
	pipe(
		addStyleToElem([
			['border', '1px solid #f0a400'],
			['color', '#f0a400'],
		])
	)(this);

	//disables clicking on other shipButtons while selected
	//prevents double selection
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
};
export { handleDestroyerBttnClick };
