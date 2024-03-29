import { announceGameWinner } from '../functions/announceGameWinner';
import { computersTurn } from '../functions/computersTurn';
import { pipe, removeEvtListener } from '../functions/elementCreators';
import { renderBattleMessageElem } from '../functions/renderBattleMessage';
import { returnPlayerCompShipsCoords } from '../functions/returnPlayerCompShipsCoords';
import { returnShipSymbolFromCoord } from '../functions/returnShipSymbolFromCoord';
import { returnSunkShipObj } from '../functions/returnSunkShipObj';
import { updateCompTacticalOverviewShips } from '../functions/updateCompTacticalOverviewShips';
import { NodesDiv } from '../types';
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses';

/**
 *  Handles click event on game board cells by changing the text content of the cell to '💥' to indicate that the player hit the computer's ship, calls functions to render battle message and update the tactical overview.
 * Removes click event listeners from all cells on the computer's board. They are added back on when the computer attacks to continue the round.
 *
 * @function
 * @param {HTMLDivElement} this - The cell that the player clicked on.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handlePlayerClickOnCompShips = function (
	this: HTMLDivElement,
	ev: MouseEvent
): void {
	// initialize the hit counter on first hit
	// when total hits reaches 18, game ends
	if (!localStorage.getItem('totalHitsOnCompShips')) {
		localStorage.setItem('totalHitsOnCompShips', JSON.stringify(0));
	}

	const compShipsCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsCoords') ?? ''
	);

	let totalHitsOnCompShips: number = JSON.parse(
		localStorage.getItem('totalHitsOnCompShips') ?? ''
	);

	const currentCellCoord = this.dataset.cellcomp ?? '';
	// prevents winner being called when a miss is registered
	if (compShipsCoords.includes(currentCellCoord)) {
		// checks hit counter to see if its the last hit
		if (totalHitsOnCompShips === 17) {
			const playerName = JSON.parse(localStorage.getItem('playerName') ?? '');

			announceGameWinner(playerName);
		}
	}

	// used to identify the ship that was hit
	const playerCompShipsCoords = returnPlayerCompShipsCoords();

	// required so that the renderBattleMessageElem function can display the appropriate message
	const towardsCombatant = 'comp';
	const hitOrMiss = 'hit';
	const currentShipSymbol = returnShipSymbolFromCoord({
		playerCompShipsCoords,
		currentCellCoord,
		towardsCombatant,
	});

	// stores hits on corresponding ships to determine if a ship has been sunk
	const sunkShipObj = returnSunkShipObj(
		currentCellCoord,
		currentShipSymbol,
		towardsCombatant
	);
	const sunkShipName =
		sunkShipObj.player === null || sunkShipObj.player === undefined
			? (sunkShipObj.comp as string)
			: (sunkShipObj.player as string);

	renderBattleMessageElem({
		currentCellCoord,
		currentShipSymbol,
		towardsCombatant,
		hitOrMiss,
		sunkShipName,
	});

	// updates the comp board cell to visually indicate hit
	this.textContent = '';
	this.textContent = '💥';
	this.style.color = '#f0a400';

	// prevents clicks on previously hit cells counting towards totalHitsOnCompShips
	if (!localStorage.getItem('compShipsHitCoords')) {
		localStorage.setItem('compShipsHitCoords', JSON.stringify([]));
	}
	const compShipsHitCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsHitCoords') ?? ''
	);

	// updates hit counter only when new hit is not on a previously hit cell, and store
	if (!compShipsHitCoords.includes(currentCellCoord)) {
		// stores the unique hit co-ordinate
		compShipsHitCoords.push(currentCellCoord);
		localStorage.setItem('compShipsHitCoords', JSON.stringify(compShipsHitCoords));

		// increments the hit counter and store
		totalHitsOnCompShips = totalHitsOnCompShips + 1;
		localStorage.setItem('totalHitsOnCompShips', JSON.stringify(totalHitsOnCompShips));
	}

	// update the comp tactical overview
	updateCompTacticalOverviewShips();

	// all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
	// the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
	// After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue may contain the createTypewriterEffect async function(s)), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
	// simulates a rudimentary game loop  and gives the illusion of time taken for the computer to "think"
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent');
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent');

	compShipPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompShips))(cell);
	});
	compShipNotPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompMisses))(cell);
	});

	setTimeout(computersTurn, 2000);
};
export { handlePlayerClickOnCompShips };
