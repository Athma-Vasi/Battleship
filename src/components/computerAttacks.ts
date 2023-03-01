import { addStyleToElem, pipe } from '../utilities/elementCreators';
import { storeCompHitMissCoords } from '../utilities/storeCompHitMissCoords';

import { Div } from '../utilities/types';
import { updateTacticalOverviewCells } from '../utilities/updateTacticalOverviewCells';
import { renderBattleMessageElem } from './renderBattleMessage';

const computerAttacks = function (compAttackGuess_: string) {
	const playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? '[]'
	);

	let totalHitsOnPlayerShips: number = JSON.parse(
		localStorage.getItem('totalHitsOnPlayerShips') ?? '0'
	);

	//compAttackGuess_ is assumed to be unique at this point
	//checks if playerShip is present
	if (playerShipsCoords.includes(compAttackGuess_)) {
		const playerShipCell: Div = document.querySelector(
			`[data-cellplayer="${compAttackGuess_}"]`
		);

		const currentCellCoord = compAttackGuess_;
		const currentShipSymbol = playerShipCell?.textContent ?? '';
		const towardsCombatant = 'player';
		const hitOrMiss = 'hit';

		// update tactical overview ship cells to visually indicate hit
		updateTacticalOverviewCells(currentCellCoord, towardsCombatant);

		//calls function to display battle message when computer registers a hit on a player ship
		renderBattleMessageElem(
			currentCellCoord,
			currentShipSymbol,
			towardsCombatant,
			hitOrMiss
		);

		//updates playercell to visually indicate hit
		if (playerShipCell) {
			playerShipCell.textContent = '';
			playerShipCell.textContent = '💥';
		}

		//updates hit counter and store
		totalHitsOnPlayerShips = totalHitsOnPlayerShips + 1;
		localStorage.setItem(
			'totalHitsOnPlayerShips',
			JSON.stringify(totalHitsOnPlayerShips)
		);

		//store the current hit co-ordinates and hit type to assist comp firing solution
		storeCompHitMissCoords(compAttackGuess_, 'hit');
	} else {
		//if its a miss
		const playerShipCell: Div = document.querySelector(
			`[data-cellplayer="${compAttackGuess_}"]`
		);

		const currentCellCoord = compAttackGuess_;
		const currentShipSymbol = playerShipCell?.textContent ?? '';
		const towardsCombatant = 'player';
		const hitOrMiss = 'miss';

		//calls function to display battle message when computer does not hit a player ship
		renderBattleMessageElem(
			currentCellCoord,
			currentShipSymbol,
			towardsCombatant,
			hitOrMiss
		);

		//auto-scrolls to the bottom to have the most recent message visible
		const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper');
		const scrollHeight = infoScreenWrapper?.scrollHeight ?? 0;

		infoScreenWrapper?.scroll({ top: scrollHeight, left: 0, behavior: 'smooth' });

		//assigns '✖' to currently missed co-ordinate and colors it  amber
		if (playerShipCell) {
			playerShipCell.textContent = '';
			playerShipCell.textContent = '✖';
			pipe(addStyleToElem([['color', '#f0a400']]))(playerShipCell);
		}

		//initializes storage for previously missed co-ordinates
		if (!localStorage.getItem('prevCompMissOnPlayerCoord')) {
			localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(''));
		}

		//grabs the previous miss co-ordinates in order to turn them back into gray
		const prevCompMissOnPlayerCoord = JSON.parse(
			localStorage.getItem('prevCompMissOnPlayerCoord') ?? ''
		);
		const prevCompMissOnPlayerCell: Div = document.querySelector(
			`[data-cellplayer="${prevCompMissOnPlayerCoord}"]`
		);
		pipe(addStyleToElem([['color', 'gainsboro']]))(prevCompMissOnPlayerCell);

		// //stores current miss co-ordinates in order to highlight the current round's co-ordinates
		// localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(currentCellCoord));

		//store the current miss co-ordinates and hit type to assist comp firing solution
		storeCompHitMissCoords(compAttackGuess_, 'miss');
	}
};
export { computerAttacks };
