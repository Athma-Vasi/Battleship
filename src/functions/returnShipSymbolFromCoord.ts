import { PlayerCompShipsCoords } from '../types';

type ReturnShipSymbolFromCoordProps = {
	playerCompShipsCoords: PlayerCompShipsCoords;
	currentCellCoord: string;
	towardsCombatant: 'player' | 'comp';
};

/**
 * Return ship symbol from coordinate object supplied
 *
 * @function
 * @param {PlayerCompShipsCoords} playerCompShipsCoords - Object containing player and comp ship coordinates
 * @param {string} currentCellCoord - Current cell coordinate
 * @param {string} towardsCombatant - Current combatant
 * @returns {string} - Ship symbol - first letter of ship type
 */
function returnShipSymbolFromCoord({
	playerCompShipsCoords,
	currentCellCoord,
	towardsCombatant,
}: ReturnShipSymbolFromCoordProps): string {
	const { playerShipCoords, compShipCoords } = playerCompShipsCoords;

	let shipSymbol = '';

	if (towardsCombatant === 'player') {
		shipSymbol = Object.entries(playerShipCoords).reduce(
			(acc, [shipName, shipCoords]: [string, string[] | string[][]]) => {
				const shipCoords_ = shipCoords.flat(3);
				if (shipCoords_.includes(currentCellCoord)) {
					acc = shipName[0].toUpperCase();
				}

				return acc;
			},
			''
		);
	}

	if (towardsCombatant === 'comp') {
		shipSymbol = Object.entries(compShipCoords).reduce(
			(acc, [shipName, shipCoords]: [string, string[] | string[][]]) => {
				const shipCoords_ = shipCoords.flat(3);
				if (shipCoords_.includes(currentCellCoord)) {
					acc = shipName[0].toUpperCase();
				}

				return acc;
			},
			''
		);
	}

	return shipSymbol;
}

export { returnShipSymbolFromCoord };
