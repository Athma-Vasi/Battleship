import { PlayerCompShipsCoords } from '../types';

type ReturnShipSymbolFromCoordProps = {
	playerCompShipsCoords: PlayerCompShipsCoords;
	currentCellCoord: string;
	towardsCombatant: 'player' | 'comp';
};

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
