import { addStyleToElem, pipe } from '../functions/elementCreators';
import { returnSunkShipObj } from '../functions/returnSunkShipObj';
import { storeCompHitMissCoords } from '../functions/storeCompHitMissCoords';
import { updatePlayerTacticalOverviewCells } from '../functions/updatePlayerTacticalOverviewCells';
import { Div } from '../types';
import { renderBattleMessageElem } from './renderBattleMessage';

/**
 *  Computer attacks player's ships, updates player's tactical overview and battle message, checks if a ship has been sunk and updates the game state
 *
 * @function
 * @param {string} compAttackGuess_ - computer's attack guess coordinate
 * @returns {void}
 */
const computerAttacks = function (compAttackGuess_: string): void {
	const playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? '[]'
	);

	let totalHitsOnPlayerShips: number = JSON.parse(
		localStorage.getItem('totalHitsOnPlayerShips') ?? '0'
	);

	// compAttackGuess_ is assumed to be unique at this point
	// checks if playerShip is present
	if (playerShipsCoords.includes(compAttackGuess_)) {
		const playerShipCell: Div = document.querySelector(
			`[data-cellplayer="${compAttackGuess_}"]`
		);

		const currentCellCoord = compAttackGuess_;
		const currentShipSymbol = playerShipCell?.textContent ?? '';
		const towardsCombatant = 'player';
		const hitOrMiss = 'hit';

		// update tactical overview ship cells to visually indicate hit
		updatePlayerTacticalOverviewCells(currentCellCoord);

		// stores hits on corresponding ships to determine if a ship has been sunk
		const sunkShipObj = returnSunkShipObj(
			currentCellCoord,
			currentShipSymbol,
			towardsCombatant
		);
		const sunkShipName =
			sunkShipObj.player === null
				? (sunkShipObj.comp as string)
				: (sunkShipObj.player as string);

		// calls function to display battle message when computer registers a hit on a player ship
		renderBattleMessageElem({
			currentCellCoord,
			currentShipSymbol,
			towardsCombatant,
			hitOrMiss,
			sunkShipName,
		});

		// updates playercell to visually indicate hit
		if (playerShipCell) {
			playerShipCell.textContent = '';
			playerShipCell.textContent = '💥';
		}

		// updates hit counter and store
		totalHitsOnPlayerShips = totalHitsOnPlayerShips + 1;
		localStorage.setItem(
			'totalHitsOnPlayerShips',
			JSON.stringify(totalHitsOnPlayerShips)
		);

		// stores the current hit co-ordinates and hit type to assist comp firing solution
		storeCompHitMissCoords(compAttackGuess_, 'hit');
	} else {
		//if its a miss
		const playerShipCell: Div = document.querySelector(
			`[data-cellplayer="${compAttackGuess_}"]`
		);

		// assigns '✖' to currently missed co-ordinate and colors it  amber
		if (playerShipCell) {
			playerShipCell.textContent = '';
			playerShipCell.textContent = '✖';
			pipe(addStyleToElem([['color', '#f0a400']]))(playerShipCell);
		}

		// initializes storage for previously missed co-ordinates
		if (!localStorage.getItem('prevCompMissOnPlayerCoord')) {
			localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(''));
		}

		// grabs the previous miss co-ordinates in order to turn them back into gray
		const prevCompMissOnPlayerCoord = JSON.parse(
			localStorage.getItem('prevCompMissOnPlayerCoord') ?? ''
		);
		const prevCompMissOnPlayerCell: Div = document.querySelector(
			`[data-cellplayer="${prevCompMissOnPlayerCoord}"]`
		);
		pipe(addStyleToElem([['color', 'gainsboro']]))(prevCompMissOnPlayerCell);

		//store the current miss co-ordinates and hit type to assist comp firing solution
		storeCompHitMissCoords(compAttackGuess_, 'miss');
	}
};
export { computerAttacks };
