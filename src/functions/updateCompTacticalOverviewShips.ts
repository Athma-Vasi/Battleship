import { beforeAfterShipCellsFiredUponStatus } from './beforeAfterShipCellsFiredUponStatus';
import {
	addStyleToElem,
	addTextToElem,
	pipe,
	removeStyleFromElem,
} from './elementCreators';
import {
	Battleship,
	BigShips,
	Carrier,
	Destroyer,
	Div,
	Frigate,
	Para,
	SmallShips,
	Superdreadnought,
} from './types';

function updateCompTacticalOverviewShips(): void {
	// grab all coords of comp ships
	const superdreadnoughtCoords: Superdreadnought = JSON.parse(
		localStorage.getItem('compSuperdreadnought') ?? JSON.stringify([])
	);
	const superdreadnoughtCoordsArray: string[] = Object.values(superdreadnoughtCoords);

	const battleshipCoords: Battleship = JSON.parse(
		localStorage.getItem('compBattleship') ?? JSON.stringify([])
	);
	const battleshipCoordsArray: string[] = Object.values(battleshipCoords);

	const carrierCoords: Carrier = JSON.parse(
		localStorage.getItem('compCarrier') ?? JSON.stringify([])
	);
	const carrierCoordsArray: string[] = Object.values(carrierCoords);

	const destroyerCoords: Destroyer[] = JSON.parse(
		localStorage.getItem('compDestroyers') ?? JSON.stringify([])
	);
	const destroyerCoordsArray: string[][] = destroyerCoords.map((destroyer) =>
		Object.values(destroyer)
	);

	const frigateCoords: Frigate[] = JSON.parse(
		localStorage.getItem('compFrigates') ?? JSON.stringify([])
	);
	const frigateCoordsArray: string[][] = frigateCoords.map((frigate) =>
		Object.values(frigate)
	);

	// coords of player misses on computer ships
	const compShipsMissesCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsMissesCoords') ?? JSON.stringify([])
	);
	const compShipsMissesCoordsSet = new Set<string>(compShipsMissesCoords);

	// coords of player hits on computer ships
	const compShipsHitCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsHitCoords') ?? JSON.stringify([])
	);
	const compShipsHitCoordsSet = new Set<string>(compShipsHitCoords);

	const shipTypesCoords: [BigShips, string[]][] = [
		['Superdreadnought', superdreadnoughtCoordsArray],
		['Battleship', battleshipCoordsArray],
		['Carrier', carrierCoordsArray],
	];

	shipTypesCoords.forEach(([shipType, coords]: [BigShips, string[]]) => {
		const isEveryShipCoordHit = coords.reduce((acc, coord) => {
			if (!compShipsHitCoordsSet.has(coord)) acc = false;

			return acc;
		}, true);

		// if every ship coord is hit, check if the cell before and after the ship is also hit, then the ship is sunk and the ship is displayed as sunk in the tactical overview without prematurely displaying to the player
		if (isEveryShipCoordHit) {
			// sorts the coords, determines direction, and determines the cells just before and after the ship and whether they have been fired upon
			const { isBeforeShipCellFiredUpon, isAfterShipCellFiredUpon } =
				beforeAfterShipCellsFiredUponStatus({
					shipType,
					coordsArr: coords,
					compShipsHitCoordsSet,
					compShipsMissesCoordsSet,
				});

			// if the cells just before and just after the ship have been fired upon (either hit or miss), then the ship is confirmed sunk and safe to update the tactical overview
			if (isBeforeShipCellFiredUpon && isAfterShipCellFiredUpon) {
				// grab the tac overview comp '?' cell and remove it
				const questionMarkCell: Para = document.querySelector(
					`[data-compshipquestion="${shipType}"]`
				);
				if (questionMarkCell) questionMarkCell.remove();

				const lengthOfCells =
					shipType === 'Superdreadnought' ? 5 : shipType === 'Carrier' ? 4 : 3;

				// display sunk ship with '💥' emoji
				for (let i = 0; i < lengthOfCells; i += 1) {
					const hiddenCell: Div = document.querySelector(
						`[data-compshipcell="${shipType}_${i}"]`
					);
					if (hiddenCell && hiddenCell.style.display === 'none') {
						pipe(
							removeStyleFromElem('display'),
							addStyleToElem([
								['display', 'visible'],
								['color', '#f0a400'],
							]),
							addTextToElem('💥')
						)(hiddenCell);
					}
				}
			}
		}
	});

	const shipTypesCoordsArrArr: [SmallShips, Array<string[]>][] = [
		['Destroyers', destroyerCoordsArray],
		['Frigates', frigateCoordsArray],
	];

	shipTypesCoordsArrArr.forEach(
		([shipType, coordsArrArr]: [SmallShips, Array<string[]>]) => {
			coordsArrArr.forEach((coordsArr: string[], idx: number) => {
				const isEveryShipCoordHit = coordsArr.reduce((acc, coord) => {
					if (!compShipsHitCoordsSet.has(coord)) acc = false;

					return acc;
				}, true);

				// if every ship coord is hit, check if the cell before and after the ship is also hit, then the ship is sunk and the ship is displayed as sunk in the tactical overview without prematurely displaying to the player
				if (isEveryShipCoordHit) {
					// sorts the coords, determines direction, and determines the cells just before and after the ship and whether they have been fired upon
					const { isBeforeShipCellFiredUpon, isAfterShipCellFiredUpon } =
						beforeAfterShipCellsFiredUponStatus({
							shipType,
							coordsArr,
							compShipsHitCoordsSet,
							compShipsMissesCoordsSet,
						});

					// if the cells just before and just after the ship have been fired upon (either hit or miss), then the ship is confirmed sunk and safe to update the tactical overview
					if (isBeforeShipCellFiredUpon && isAfterShipCellFiredUpon) {
						// grab the tac overview comp '?' cell and remove it
						const questionMarkCell: Para = document.querySelector(
							`[data-compshipquestion="${shipType}_${idx}"]`
						);

						if (questionMarkCell) questionMarkCell.remove();

						// display sunk ship with '💥' emoji
						for (let i = 0; i < coordsArr.length; i += 1) {
							const hiddenCell: Div = document.querySelector(
								`[data-compshipcell="${shipType}_${idx}_${i}"]`
							);
							if (hiddenCell && hiddenCell.style.display === 'none') {
								pipe(
									removeStyleFromElem('display'),
									addStyleToElem([
										['display', 'visible'],
										['color', '#f0a400'],
									]),
									addTextToElem('💥')
								)(hiddenCell);
							}
						}
					}
				}
			});
		}
	);
}

export { updateCompTacticalOverviewShips };
