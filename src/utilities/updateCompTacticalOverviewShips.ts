import {
	addStyleToElem,
	addTextToElem,
	pipe,
	removeStyleFromElem,
} from './elementCreators';
import {
	Battleship,
	Carrier,
	Destroyer,
	Div,
	Frigate,
	Para,
	Superdreadnought,
} from './types';

function updateCompTacticalOverviewShips() {
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

	console.group('compShipCoordsArray');
	console.log('superdreadnoughtCoordsArray', superdreadnoughtCoordsArray);
	console.log('battleshipCoordsArray', battleshipCoordsArray);
	console.log('carrierCoordsArray', carrierCoordsArray);
	console.groupEnd();

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
	console.log('compShipsMissesCoordsSet', compShipsMissesCoordsSet);

	// coords of player hits on computer ships
	const compShipsHitCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsHitCoords') ?? JSON.stringify([])
	);
	const compShipsHitCoordsSet = new Set<string>(compShipsHitCoords);
	console.log('compShipsHitCoordsSet', compShipsHitCoordsSet);

	const shipTypesCoords: [string, string[]][] = [
		['Superdreadnought', superdreadnoughtCoordsArray],
		['Battleship', battleshipCoordsArray],
		['Carrier', carrierCoordsArray],
	];

	shipTypesCoords.forEach(([shipType, coords]: [string, string[]]) => {
		const isEveryShipCoordHit = coords.reduce((acc, coord) => {
			if (!compShipsHitCoordsSet.has(coord)) acc = false;

			return acc;
		}, true);

		// if every ship coord is hit, check if the cell before and after the ship is also hit, then the ship is sunk and the ship is displayed as sunk in the tactical overview without prematurely displaying to the player
		if (isEveryShipCoordHit) {
			// need  to sort the coords because they were grabbed from an object and
			// js does not guarantee the order of the keys in an object
			const coordsClone: string[] = structuredClone(coords);
			const sortedCoords = coordsClone.sort((a, b) => {
				const aX = parseInt(a.split(',')[0]);
				const aY = parseInt(a.split(',')[1]);
				const bX = parseInt(b.split(',')[0]);
				const bY = parseInt(b.split(',')[1]);

				if (aX < bX) return -1;
				if (aX > bX) return 1;
				if (aY < bY) return -1;
				if (aY > bY) return 1;

				return 0;
			});

			console.log('sorted coords', sortedCoords);

			// determine the direction of the ship
			const firstCoord = sortedCoords[0];
			const lastCoord = sortedCoords[sortedCoords.length - 1];

			const firstCoordXY = firstCoord.split(',');
			const lastCoordXY = lastCoord.split(',');
			const firstCoordX = parseInt(firstCoordXY[0].replace('"', ''));
			const firstCoordY = parseInt(firstCoordXY[1].replace('"', ''));
			const lastCoordX = parseInt(lastCoordXY[0].replace('"', ''));
			const lastCoordY = parseInt(lastCoordXY[1].replace('"', ''));
			const isHorizontal = firstCoordY === lastCoordY;
			// const isVertical = firstCoordX === lastCoordX;

			// determine the cells just before the starting cell and whether they are within bounds and have been fired upon
			const beforeShipCell = isHorizontal
				? `${firstCoordX - 1},${firstCoordY}`
				: `${firstCoordX},${firstCoordY - 1}`;
			const beforeShipCellX = parseInt(beforeShipCell.split(',')[0]);
			const beforeShipCellY = parseInt(beforeShipCell.split(',')[1]);
			const beforeShipCellWithinBounds = isHorizontal
				? beforeShipCellX <= 9 && beforeShipCellX >= 0
				: beforeShipCellY <= 9 && beforeShipCellY >= 0;
			// if the cell is not within bounds, it is considered to have been fired upon
			const isBeforeShipCellFiredUpon = beforeShipCellWithinBounds
				? compShipsHitCoordsSet.has(beforeShipCell) ||
				  compShipsMissesCoordsSet.has(beforeShipCell)
				: true;

			// determine the cells just after the ending cell and whether they are within bounds and have been fired upon
			const afterShipCell = isHorizontal
				? `${lastCoordX + 1},${lastCoordY}`
				: `${lastCoordX},${lastCoordY + 1}`;
			const afterShipCellX = parseInt(afterShipCell.split(',')[0]);
			const afterShipCellY = parseInt(afterShipCell.split(',')[1]);
			const afterShipCellWithinBounds = isHorizontal
				? afterShipCellX <= 9 && afterShipCellX >= 0
				: afterShipCellY <= 9 && afterShipCellY >= 0;
			// if the cell is not within bounds, it is considered to have been fired upon
			const isAfterShipCellFiredUpon = afterShipCellWithinBounds
				? compShipsHitCoordsSet.has(afterShipCell) ||
				  compShipsMissesCoordsSet.has(afterShipCell)
				: true;

			console.group('big ships');
			console.log('shipType', shipType);
			console.log('beforeShipCell big ships', beforeShipCell);
			console.log('afterShipCell big ships', afterShipCell);
			console.log('beforeShipCellWithinBounds big ships', beforeShipCellWithinBounds);
			console.log('afterShipCellWithinBounds big ships', afterShipCellWithinBounds);
			console.groupEnd();

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

	const shipTypesCoordsArrArr: [string, string[][]][] = [
		['Destroyers', destroyerCoordsArray],
		['Frigates', frigateCoordsArray],
	];

	shipTypesCoordsArrArr.forEach(([shipType, coordsArrArr]: [string, string[][]]) => {
		coordsArrArr.forEach((coordsArr: string[], idx: number) => {
			const isEveryShipCoordHit = coordsArr.reduce((acc, coord) => {
				if (!compShipsHitCoordsSet.has(coord)) acc = false;

				return acc;
			}, true);
			console.log(`isEveryShipCoordHit for ${shipType}: `, isEveryShipCoordHit);

			// if every ship coord is hit, check if the cell before and after the ship is also hit, then the ship is sunk and the ship is displayed as sunk in the tactical overview without prematurely displaying to the player
			if (isEveryShipCoordHit) {
				// need  to sort the coords because they were grabbed from an object and
				// js does not guarantee the order of the keys in an object
				const coordsArrClone = structuredClone(coordsArr);
				const sortedCoordsArr = coordsArrClone.sort((a, b) => {
					const aX = parseInt(a.split(',')[0].replace('"', ''));
					const aY = parseInt(a.split(',')[1].replace('"', ''));
					const bX = parseInt(b.split(',')[0].replace('"', ''));
					const bY = parseInt(b.split(',')[1].replace('"', ''));

					if (aX < bX) return -1;
					if (aX > bX) return 1;
					if (aY < bY) return -1;
					if (aY > bY) return 1;

					return 0;
				});

				// determine the direction of the ship
				const firstCoord = sortedCoordsArr[0];
				const lastCoord = sortedCoordsArr[sortedCoordsArr.length - 1];

				const firstCoordXY = firstCoord.split(',');
				const lastCoordXY = lastCoord.split(',');
				const firstCoordX = parseInt(firstCoordXY[0].replace('"', ''));
				const firstCoordY = parseInt(firstCoordXY[1].replace('"', ''));
				const lastCoordX = parseInt(lastCoordXY[0].replace('"', ''));
				const lastCoordY = parseInt(lastCoordXY[1].replace('"', ''));
				const isHorizontal = firstCoordY === lastCoordY;
				// const isVertical = firstCoordX === lastCoordX;

				// determine the cells just before and just after the ship
				const beforeShipCell = isHorizontal
					? `${firstCoordX - 1},${firstCoordY}`
					: `${firstCoordX},${firstCoordY - 1}`;
				const beforeShipCellX = parseInt(beforeShipCell.split(',')[0]);
				const beforeShipCellY = parseInt(beforeShipCell.split(',')[1]);
				const beforeShipCellWithinBounds = isHorizontal
					? beforeShipCellX <= 9 && beforeShipCellX >= 0
					: beforeShipCellY <= 9 && beforeShipCellY >= 0;
				// if the cell is not within bounds, it is considered to have been fired upon
				const isBeforeShipCellFiredUpon = beforeShipCellWithinBounds
					? compShipsHitCoordsSet.has(beforeShipCell) ||
					  compShipsMissesCoordsSet.has(beforeShipCell)
					: true;

				const afterShipCell = isHorizontal
					? `${lastCoordX + 1},${lastCoordY}`
					: `${lastCoordX},${lastCoordY + 1}`;
				const afterShipCellX = parseInt(afterShipCell.split(',')[0]);
				const afterShipCellY = parseInt(afterShipCell.split(',')[1]);
				const afterShipCellWithinBounds = isHorizontal
					? afterShipCellX <= 9 && afterShipCellX >= 0
					: afterShipCellY <= 9 && afterShipCellY >= 0;
				// if the cell is not within bounds, it is considered to have been fired upon
				const isAfterShipCellFiredUpon = afterShipCellWithinBounds
					? compShipsHitCoordsSet.has(afterShipCell) ||
					  compShipsMissesCoordsSet.has(afterShipCell)
					: true;

				console.group('small ships');
				console.log('shipType', shipType);
				console.log('beforeShipCell small ships', beforeShipCell);
				console.log('afterShipCell small ships', afterShipCell);
				console.log('beforeShipCellWithinBounds small ships', beforeShipCellWithinBounds);
				console.log('afterShipCellWithinBounds small ships', afterShipCellWithinBounds);
				console.log('isBeforeShipCellFiredUpon small ships', isBeforeShipCellFiredUpon);
				console.log('isAfterShipCellFiredUpon small ships', isAfterShipCellFiredUpon);
				console.groupEnd();

				// if the cells just before and just after the ship have been fired upon (either hit or miss), then the ship is confirmed sunk and safe to update the tactical overview
				if (isBeforeShipCellFiredUpon && isAfterShipCellFiredUpon) {
					// grab the tac overview comp '?' cell and remove it
					const questionMarkCell: Para = document.querySelector(
						`[data-compshipquestion="${shipType}_${idx}"]`
					);
					console.group('inside if statement small ships');
					console.log('questionMarkCell small ships', questionMarkCell);
					console.log('shipType small ships', shipType);
					console.log('idx small ships', idx);
					console.groupEnd();

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
	});

	//
	//
	//
}

export { updateCompTacticalOverviewShips };

/**
 
	// at each fire by player towards computer, the computer ships coords are checked to see if all adjacent cells are hit, if so, a message is displayed to player
	// this ensures that player does not easily determine the type of ship and whether it is sunk or not by the number of hits on the ship

	// coords of player misses on computer ships
	const compShipsMissesCoords = JSON.parse(
		localStorage.getItem('compShipsMissesCoords') ?? JSON.stringify([])
	);

	// coords of player hits on computer ships
	const compShipsHitCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsHitCoords') ?? JSON.stringify([])
	);

	// check the superdreadnought, carrier, battleship first that consist of an array of one object whose values will be returned as string[]
	let shipTypes = ['Superdreadnought', 'Carrier', 'Battleship'];

	shipTypes.forEach((shipType) => {
		const compShipsCoords: Superdreadnought | Carrier | Battleship = JSON.parse(
			localStorage.getItem(`comp${shipType}`) ?? JSON.stringify([])
		);

		// grab adjacent array of cells for each ship
		const uniqueAdjacentCoords: string[] = Object.values(compShipsCoords)
			.reduce((adjCoords: string[], coord: string) => {
				const xyCoords = coord.split(',');
				const xCoord = parseInt(xyCoords[0].replace('"', ''));
				const yCoord = parseInt(xyCoords[1].replace('"', ''));

				//top
				if (yCoord - 1 >= 0) adjCoords.push(`${xCoord},${yCoord - 1}`);
				//right
				if (xCoord + 1 <= 9) adjCoords.push(`${xCoord + 1},${yCoord}`);
				//bottom
				if (yCoord + 1 <= 9) adjCoords.push(`${xCoord},${yCoord + 1}`);
				//left
				if (xCoord - 1 >= 0) adjCoords.push(`${xCoord - 1},${yCoord}`);

				return adjCoords;
			}, [])
			.filter(
				(coord) =>
					!compShipsHitCoords.includes(coord) && !compShipsMissesCoords.includes(coord)
			);

		// if all adjacent cells are hit, the ship is confirmed sunk and the ship is displayed as sunk in the tactical overview
		if (uniqueAdjacentCoords.length === 0) {
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
	});

	// check the destroyer and submarine last that consist of an array of two objects whose values will be returned as Array<string[]>
	shipTypes = ['Destroyers', 'Frigates'];

	shipTypes.forEach((shipType) => {
		const compShipsCoords: Destroyer[] | Frigate[] = JSON.parse(
			localStorage.getItem(`comp${shipType}`) ?? JSON.stringify([])
		);

		const compShipCoordsArr = compShipsCoords.map((ship) => Object.values(ship));

		// grab adjacent array of cells for each ship of each type
		compShipCoordsArr.forEach((compShipCoord: string[], idx) => {
			const uniqueAdjacentCoords: string[] = compShipCoord
				.reduce((adjCoords: string[], coord: string) => {
					const xyCoords = coord.split(',');
					const xCoord = parseInt(xyCoords[0].replace('"', ''));
					const yCoord = parseInt(xyCoords[1].replace('"', ''));

					//top
					if (yCoord - 1 >= 0) adjCoords.push(`${xCoord},${yCoord - 1}`);
					//right
					if (xCoord + 1 <= 9) adjCoords.push(`${xCoord + 1},${yCoord}`);
					//bottom
					if (yCoord + 1 <= 9) adjCoords.push(`${xCoord},${yCoord + 1}`);
					//left
					if (xCoord - 1 >= 0) adjCoords.push(`${xCoord - 1},${yCoord}`);

					return adjCoords;
				}, [])
				.filter(
					(coord) =>
						!compShipsHitCoords.includes(coord) && !compShipsMissesCoords.includes(coord)
				);

			// if all adjacent cells are hit, the ship is confirmed sunk and the ship is displayed as sunk in the tactical overview
			if (uniqueAdjacentCoords.length === 0) {
				// grab the tac overview comp '?' cell and remove it
				const questionMarkCell: Para = document.querySelector(
					`[data-compshipquestion="${shipType}_${idx}"]`
				);
				if (questionMarkCell) questionMarkCell.remove();

				const lengthOfCells = shipType === 'Destroyers' ? 2 : 1;

				// display sunk ship with '💥' emoji
				for (let i = 0; i < lengthOfCells; i += 1) {
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
		});
	});

 */
