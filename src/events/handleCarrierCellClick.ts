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
import { Button, Carrier, Div, NodesDiv } from '../types';
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick';
import { handleCarrierMouseEnter } from './handleCarrierMouseEnter';
import { handleCarrierMouseLeave } from './handleCarrierMouseLeave';
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick';
import { handleFrigateBttnClick } from './handleFrigateBttnClick';
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick';

/**
 * Handles click event on board when carrier is placed by grabbing current state of axis button, current cell co-ordinates, and current state of carrier object in localStorage. Then, checks if the ship placement overlaps with any other ship placements, whether the ship placement is within the grid boundaries, and whether the correct number of ships are in place. If all conditions are met, the ship is placed on the board and the carrier object is updated in localStorage and enables the other ship selection buttons and adds back their click event listeners.
 *
 * @function
 * @param {HTMLDivElement} this - The cell that was clicked.
 * @param {MouseEvent} ev - The event object.
 * @returns {null | undefined}
 */
const handleCarrierCellClick = function (
	this: HTMLDivElement,
	ev: MouseEvent
): null | undefined {
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell');

	// grabs the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector');
	const currentAxis = axisSelector?.textContent;

	// grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',');
	const currentX = currentCell?.[0] ?? '';
	const currentY = currentCell?.[1] ?? '';

	// initializes the carrier object upon first call
	if (!localStorage.getItem('carrier')) {
		localStorage.setItem('carrier', JSON.stringify([]));
	}

	let carrier: Carrier = JSON.parse(localStorage.getItem('carrier') ?? '');

	const carrierCoords: string[] = [];

	const ship = 'carrier';
	const amount = 'single';

	// for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		// grid boundary detection
		if (Number(currentX) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
			return null;
		}

		// overlap detection
		if (doesShipPlacementOverlap(4, currentAxis, currentX, currentY)) return null;

		// places carrier on grid
		for (let i = 0; i < 4; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			);

			// prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = '';

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([
					['color', '#f0a400'],
					['cursor', 'default'],
				]),
				addTextToElem('C')
			)(nextCell);

			carrierCoords.push(`${Number(currentX) + i},${currentY}`);
		}

		// prevents updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update carrier object attributes
			carrier = {
				head: carrierCoords[0],
				body1: carrierCoords[1],
				body2: carrierCoords[2],
				tail: carrierCoords[3],
			};
		}

		localStorage.setItem('isSingleCarrier', JSON.stringify(false));
	} // for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentY) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
			return null;
		}

		// overlap detection
		if (doesShipPlacementOverlap(4, currentAxis, currentX, currentY)) return null;

		// places carrier on grid
		for (let i = 0; i < 4; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			);
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = '';

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([
					['color', '#f0a400'],
					['cursor', 'default'],
				]),
				addTextToElem('C')
			)(nextCell);

			carrierCoords.push(`${currentX},${Number(currentY) + i}`);
		}

		// prevents updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			// updates carrier object attributes
			carrier = {
				head: carrierCoords[0],
				body1: carrierCoords[1],
				body2: carrierCoords[2],
				tail: carrierCoords[3],
			};
		}

		localStorage.setItem('isSingleCarrier', JSON.stringify(false));
	}

	// stores carrier
	localStorage.setItem('carrier', JSON.stringify(carrier));

	// stores current ship coords to pool of all ship coords
	accumulatePlayerShipCoords(carrierCoords);

	if (isCorrectNumberOfShips(ship, amount) === true) {
		// after 'this' button has been clicked, sets the color to grey to visually indicate finished
		const carrierBttn: Button = document.querySelector('.bttn-carrier');
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			])
		)(carrierBttn);

		// enables events on other shipButtons after carrier has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
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

		const frigateBttn: Button = document.querySelector('.bttn-frigate');
		if (frigateBttn && frigateBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleFrigateBttnClick)
			)(frigateBttn);

		// removes event listeners after single carrier has been placed
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleCarrierCellClick),
				removeEvtListener('mouseenter')(handleCarrierMouseEnter),
				removeEvtListener('mouseleave')(handleCarrierMouseLeave)
			)(player);
		});
	}

	//if all ships placed, renders start button
	checkAllShipsInPlace();
};
export { handleCarrierCellClick };
