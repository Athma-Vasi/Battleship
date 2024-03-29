import {
	RandomizedHavenShipNames,
	RandomizedManticoreShipNames,
	ShipHits,
} from '../types';
import { returnPlayerCompShipsCoords } from './returnPlayerCompShipsCoords';

/**
 * Tracks the hits on player and comp ships and when hit counter equals length of appropriate ship, returns an object containing the current hit's sunk ship's name.
 * Used to render the ship's name in the battle message
 *
 * @function
 * @param {string} currentCellCoord - Current cell coordinate
 * @param {string} currentShipSymbol - Current ship symbol
 * @param {string} towardsCombatant  - 'player' or 'comp'
 * @returns {object} - Object containing the current hit's sunk ship's name
 */
function returnSunkShipObj(
	currentCellCoord: string,
	currentShipSymbol: string,
	towardsCombatant: 'player' | 'comp'
): { player: null | string; comp: null | string } {
	const playerCompShipsCoords = returnPlayerCompShipsCoords();

	// stores hits on ships to determine if a ship has been sunk
	const shipHits: ShipHits = JSON.parse(
		localStorage.getItem('shipHits') ??
			JSON.stringify({
				playerShips: {
					superdreadnought: 0,
					carrier: 0,
					battleship: 0,
					destroyers: [0, 0],
					frigates: [0, 0],
				},
				compShips: {
					superdreadnought: 0,
					carrier: 0,
					battleship: 0,
					destroyers: [0, 0],
					frigates: [0, 0],
				},
			})
	);

	const havenShipNames: RandomizedHavenShipNames = JSON.parse(
		localStorage.getItem('havenShipNames') ?? JSON.stringify({})
	);
	const manticoreShipNames: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? JSON.stringify({})
	);

	const sunkShipObj: { player: null | string; comp: null | string } = {
		player: null,
		comp: null,
	};

	if (towardsCombatant === 'player') {
		switch (currentShipSymbol) {
			case 'S': {
				shipHits.playerShips.superdreadnought < 4
					? (shipHits.playerShips.superdreadnought += 1)
					: (sunkShipObj.player = manticoreShipNames.superdreadnought);
				break;
			}
			case 'C': {
				shipHits.playerShips.carrier < 3
					? (shipHits.playerShips.carrier += 1)
					: (sunkShipObj.player = manticoreShipNames.carrier);
				break;
			}
			case 'B': {
				shipHits.playerShips.battleship < 2
					? (shipHits.playerShips.battleship += 1)
					: (sunkShipObj.player = manticoreShipNames.battleship);
				break;
			}
			case 'D': {
				if (
					playerCompShipsCoords.playerShipCoords.destroyers[0].includes(currentCellCoord)
				) {
					shipHits.playerShips.destroyers[0] < 1
						? (shipHits.playerShips.destroyers[0] += 1)
						: (sunkShipObj.player = manticoreShipNames.destroyers[0]);
				} else {
					shipHits.playerShips.destroyers[1] < 1
						? (shipHits.playerShips.destroyers[1] += 1)
						: (sunkShipObj.player = manticoreShipNames.destroyers[1]);
				}

				break;
			}
			case 'F': {
				if (
					playerCompShipsCoords.playerShipCoords.frigates[0].includes(currentCellCoord)
				) {
					sunkShipObj.player = manticoreShipNames.frigates[0];
				} else sunkShipObj.player = manticoreShipNames.frigates[1];

				break;
			}
			default:
				break;
		}
	}
	// towards combatant === 'comp'
	else {
		switch (currentShipSymbol) {
			case 'S': {
				shipHits.compShips.superdreadnought < 4
					? (shipHits.compShips.superdreadnought += 1)
					: (sunkShipObj.comp = havenShipNames.superdreadnought);
				break;
			}
			case 'C': {
				shipHits.compShips.carrier < 3
					? (shipHits.compShips.carrier += 1)
					: (sunkShipObj.comp = havenShipNames.carrier);
				break;
			}
			case 'B': {
				shipHits.compShips.battleship < 2
					? (shipHits.compShips.battleship += 1)
					: (sunkShipObj.comp = havenShipNames.battleship);
				break;
			}
			case 'D': {
				if (
					playerCompShipsCoords.compShipCoords.destroyers[0].includes(currentCellCoord)
				) {
					shipHits.compShips.destroyers[0] < 1
						? (shipHits.compShips.destroyers[0] += 1)
						: (sunkShipObj.comp = havenShipNames.destroyers[0]);
				} else {
					shipHits.compShips.destroyers[1] < 1
						? (shipHits.compShips.destroyers[1] += 1)
						: (sunkShipObj.comp = havenShipNames.destroyers[1]);
				}

				break;
			}
			case 'F': {
				if (playerCompShipsCoords.compShipCoords.frigates[0].includes(currentCellCoord)) {
					sunkShipObj.comp = havenShipNames.frigates[0];
				} else sunkShipObj.comp = havenShipNames.frigates[1];

				break;
			}
			default:
				break;
		}
	}

	localStorage.setItem('shipHits', JSON.stringify(shipHits));

	return sunkShipObj;
}

export { returnSunkShipObj };
