import { accumulatePlayerShipCoords } from '../functions/accumulatePlayerShipCoords';
import { checkAllShipsInPlace } from '../functions/checkAllShipsInPlace';
import { doesShipPlacementOverlap } from '../functions/doesShipPlacementOverlap';
import {
	addAttributeToElem,
	addEvtListener,
	addStyleToElem,
	addTextToElem,
	pipe,
	removeEvtListener,
} from '../functions/elementCreators';
import { isCorrectNumberOfShips } from '../functions/isCorrectNumberOfShips';
import { Button, Div, Frigate, NodesDiv } from '../types';
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick';
import { handleCarrierBttnClick } from './handleCarrierBttnClick';
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick';
import { handleFrigateMouseEnter } from './handleFrigateMouseEnter';
import { handleFrigateMouseLeave } from './handleFrigateMouseLeave';
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick';

const handleFrigateCellClick = function (
	this: HTMLDivElement,
	ev: MouseEvent
): null | undefined {
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell');

	// grabs the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector');
	const currentAxis = axisSelector?.textContent ?? '';

	// grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',');
	const currentX = currentCell?.[0] ?? '';
	const currentY = currentCell?.[1] ?? '';

	// initializes the ship object upon first call
	if (!localStorage.getItem('frigate')) {
		localStorage.setItem('frigate', JSON.stringify([]));
	}
	const frigate: Frigate[] = JSON.parse(localStorage.getItem('frigate') ?? '');

	const frigateCoords: string[] = [];

	const ship = 'frigate';
	const amount = 'double';

	if (isCorrectNumberOfShips(ship, amount)) {
		// overlap detection
		if (doesShipPlacementOverlap(1, currentAxis, currentX, currentY)) return null;

		// places frigate on the grid
		const nextCell: Div = document.querySelector(
			`[data-cellplayer="${currentX},${currentY}"]`
		);
		// prevents duplicate letters being placed
		if (nextCell) nextCell.textContent = '';

		pipe(
			addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
			addStyleToElem([
				['color', '#f0a400'],
				['cursor', 'default'],
			]),
			addTextToElem('F')
		)(nextCell);

		frigateCoords.push(`${currentX},${currentY}`);

		// only updates if there are 2 or less ships
		if (isCorrectNumberOfShips(ship, amount)) {
			frigate.push({ body: frigateCoords[0] });
		}
	} else if (isCorrectNumberOfShips(ship, amount) === false) {
		return null;
	}

	// stores frigate
	localStorage.setItem('frigate', JSON.stringify(frigate));

	// stores current ship coords to pool of all ship coords
	accumulatePlayerShipCoords(frigateCoords);

	if (isCorrectNumberOfShips(ship, amount) === false) {
		// after 'this' button has been clicked, sets the color to grey to visually indicate finished
		const frigateBttn: Button = document.querySelector('.bttn-frigate');
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
			])
		)(frigateBttn);

		// enables events on other shipButtons after both frigates have been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
		const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought');
		if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleSuperdreadnoughtBttnClick)
			)(superdreadnoughtBttn);

		const carrierBttn: Button = document.querySelector('.bttn-carrier');
		if (carrierBttn && carrierBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleCarrierBttnClick)
			)(carrierBttn);

		const battleshipBttn: Button = document.querySelector('.bttn-battleship');
		if (battleshipBttn && battleshipBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleBattleshipBttnClick)
			)(battleshipBttn);

		const destroyerBttn: Button = document.querySelector('.bttn-destroyer');
		if (destroyerBttn && destroyerBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleDestroyerBttnClick)
			)(destroyerBttn);

		//removes event listeners after both frigates have been placed
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleFrigateCellClick),
				removeEvtListener('mouseenter')(handleFrigateMouseEnter),
				removeEvtListener('mouseleave')(handleFrigateMouseLeave)
			)(player);
		});
	}

	//if all ships placed, renders start button
	checkAllShipsInPlace();
};

export { handleFrigateCellClick };
