import { computersTurn } from '../functions/computersTurn';
import { addStyleToElem, pipe, removeEvtListener } from '../functions/elementCreators';
import { renderBattleMessageElem } from '../functions/renderBattleMessage';
import { updateCompTacticalOverviewShips } from '../functions/updateCompTacticalOverviewShips';
import { Div, NodesDiv } from '../types';
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips';

/**
 *  Handles click event on game board cells by changing the text content of the cell to '✖' to indicate that the player missed the computer's ship, calls functions to render battle message and update the tactical overview.
 * Removes click event listeners from all cells on the computer's board. They are added back on when the computer attacks to continue the round.
 *
 * @function
 * @param {HTMLDivElement} this - The cell that the player clicked on.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handlePlayerClickOnCompMisses = function (
	this: HTMLDivElement,
	ev: MouseEvent
): void {
	const currentCellCoord = this.dataset.cellcomp ?? '';
	const currentShipSymbol = this.textContent ?? '';
	const towardsCombatant = 'comp';
	const hitOrMiss = 'miss';

	renderBattleMessageElem({
		currentCellCoord,
		currentShipSymbol,
		towardsCombatant,
		hitOrMiss,
	});

	// assigns '✖' to currently missed co-ordinate and colors it amber
	this.textContent == '';
	this.textContent = '✖';
	pipe(addStyleToElem([['color', '#f0a400']]))(this);

	// initializse storage for previously missed co-ordinates
	if (!localStorage.getItem('prevPlayerMissOnCompCoord')) {
		localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(''));
	}

	// grabs the previous miss co-ordinates in order to turn them back into gray
	const prevPlayerMissOnCompCoord = JSON.parse(
		localStorage.getItem('prevPlayerMissOnCompCoord') ?? ''
	);
	const prevPlayerMissOnCompCell: Div = document.querySelector(
		`[data-cellcomp="${prevPlayerMissOnCompCoord}"]`
	);
	pipe(addStyleToElem([['color', 'gainsboro']]))(prevPlayerMissOnCompCell);

	// stores current miss co-ordinates in order to highlight the current round's co-ordinates
	localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(currentCellCoord));

	// store miss coords
	const compShipsMissesCoords = JSON.parse(
		localStorage.getItem('compShipsMissesCoords') ?? JSON.stringify([])
	);
	compShipsMissesCoords.push(currentCellCoord);
	localStorage.setItem('compShipsMissesCoords', JSON.stringify(compShipsMissesCoords));

	// update the comp tactical overview
	updateCompTacticalOverviewShips();

	// all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
	// the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
	// After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue may contain the createTypewriterEffect async function(s)), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
	// simulates a rudimentary game loop and gives the illusion of time taken for the computer to "think"
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent');
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent');

	compShipNotPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompMisses))(cell);
	});
	compShipPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompShips))(cell);
	});

	//computers turn
	setTimeout(computersTurn, 1500);
};
export { handlePlayerClickOnCompMisses };
