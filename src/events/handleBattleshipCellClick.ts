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
import { Battleship, Button, Div, NodesDiv } from '../types';
import { handleBattleshipMouseEnter } from './handleBattleshipMouseEnter';
import { handleBattleshipMouseLeave } from './handleBattleshipMouseLeave';
import { handleCarrierBttnClick } from './handleCarrierBttnClick';
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick';
import { handleFrigateBttnClick } from './handleFrigateBttnClick';
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick';

/**
 * Handles click event on board when battleship is placed by grabbing current state of axis button, current cell co-ordinates, and current state of battleship object in localStorage. Then, checks if the ship placement overlaps with any other ship placements, whether the ship placement is within the grid boundaries, and whether the correct number of ships are in place. If all conditions are met, the ship is placed on the board and the battleship object is updated in localStorage and enables the other ship selection buttons and adds back their click event listeners.
 *
 * @function
 * @param {HTMLDivElement} this - The cell that was clicked.
 * @param {MouseEvent} ev - The event object.
 * @returns {null | undefined}
 */
const handleBattleshipCellClick = function (
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

	// initializes the ship object upon first call
	if (!localStorage.getItem('battleship')) {
		localStorage.setItem('battleship', JSON.stringify(''));
	}
	let battleship: Battleship = JSON.parse(localStorage.getItem('battleship') ?? '');

	const battleshipCoords: string[] = [];

	const ship = 'battleship';
	const amount = 'single';

	// for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		// grid boundary detection
		if (Number(currentX) > 7) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
			return null;
		}

		// overlap detection
		if (doesShipPlacementOverlap(3, currentAxis, currentX, currentY)) return null;

		// places battleship on the grid
		for (let i = 0; i < 3; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			);
			if (nextCell) nextCell.textContent = '';

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([
					['color', '#f0a400'],
					['cursor', 'default'],
				]),
				addTextToElem('B')
			)(nextCell);

			battleshipCoords.push(`${Number(currentX) + i},${currentY}`);
		}

		// prevents updating after first click
		if (isCorrectNumberOfShips(ship, 'single')) {
			// updates battleship object attributes
			battleship = {
				head: battleshipCoords[0],
				body: battleshipCoords[1],
				tail: battleshipCoords[2],
			};
		}

		localStorage.setItem('isSingleBattleship', JSON.stringify(false));
	} // for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, amount)) {
		// grid boundary detection
		if (Number(currentY) > 7) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
			return null;
		}

		// overlap detection
		if (doesShipPlacementOverlap(3, currentAxis, currentX, currentY)) return null;

		for (let i = 0; i < 3; i += 1) {
			// places battleship on the grid
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			);
			// prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = '';

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([
					['color', '#f0a400'],
					['cursor', 'default'],
				]),
				addTextToElem('B')
			)(nextCell);

			battleshipCoords.push(`${currentX},${Number(currentY) + i}`);
		}

		// prevents updating after first click
		if (isCorrectNumberOfShips(ship, 'single')) {
			// updates battleship object attributes
			battleship = {
				head: battleshipCoords[0],
				body: battleshipCoords[1],
				tail: battleshipCoords[2],
			};
		}

		localStorage.setItem('isSingleBattleship', JSON.stringify(false));
	}

	// stores battleship
	localStorage.setItem('battleship', JSON.stringify(battleship));

	// stores current ship coords to pool of all ship coords
	accumulatePlayerShipCoords(battleshipCoords);

	if (isCorrectNumberOfShips(ship, amount) === true) {
		// after 'this' button has been clicked, sets the color to grey to visually indicate finished
		const battleshipBttn: Button = document.querySelector('.bttn-battleship');
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			])
		)(battleshipBttn);

		// enables events on other shipButtons after battleship has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
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

		// removes event listeners after battleship has been placed
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleBattleshipCellClick),
				removeEvtListener('mouseenter')(handleBattleshipMouseEnter),
				removeEvtListener('mouseleave')(handleBattleshipMouseLeave)
			)(player);
		});
	}

	// if all ships placed, renders start button
	checkAllShipsInPlace();
};

export { handleBattleshipCellClick };
