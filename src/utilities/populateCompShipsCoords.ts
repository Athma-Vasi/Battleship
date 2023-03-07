import { CompShipsPlacementChoice } from './types';

// returns an object with the computer's ships' randomly generated coordinates
function populateCompShipsCoords(): CompShipsPlacementChoice {
	// creates tuples[] of all possible coordinates
	const allCoords: [number, number][] = [];
	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			allCoords.push([j, i]);
		}
	}

	const shipsLengthTuple: [string, number][] = [
		['superdreadnought', 5],
		['carrier', 4],
		['battleship', 3],
		['destroyer', 2],
		['destroyer', 2],
		['frigate', 1],
		['frigate', 1],
	];

	const shipsPresentCoordsSet = new Set<string>();

	return Object.fromEntries(
		shipsLengthTuple.reduce(
			(
				acc: Map<string, Record<string, string> | Record<string, string>[]>,
				[shipType, shipLength]
			) => {
				let withinBounds = false;
				let isAnotherShipPresent = true;
				let shipCoordsArr: [number, number][] = [];

				// keeps generating random coordinates and direction until the ship fits within the board and doesn't overlap with another ship
				while (!withinBounds || isAnotherShipPresent) {
					shipCoordsArr = [];

					// returns a random coordinate
					const randCoord = (function () {
						let randIndex = Math.floor(Math.random() * allCoords.length);
						const randCoordStr = allCoords[randIndex].join(',');

						while (shipsPresentCoordsSet.has(randCoordStr)) {
							randIndex = Math.floor(Math.random() * allCoords.length);
						}
						return allCoords[randIndex];
					})();

					// returns a random direction
					const randDirection = (function () {
						const randIndex = Math.floor(Math.random() * 2);
						return randIndex === 0 ? 'horizontal' : 'vertical';
					})();

					switch (randDirection) {
						case 'horizontal': {
							// generates the ship's coordinates of corresponding length based on the random coordinate and direction
							for (let i = 0; i < shipLength; i += 1) {
								shipCoordsArr.push([randCoord[0] + i, randCoord[1]]);
							}
							// checks if the ship fits within the board
							withinBounds = shipCoordsArr.every(
								([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10
							);
							// checks if the ship overlaps with another ship
							isAnotherShipPresent = shipCoordsArr.some((coord) =>
								shipsPresentCoordsSet.has(coord.join(','))
							);
							// isAnotherShipPresent = shipCoordsArr.reduce((acc, coord) => {
							// 	if (shipsPresentCoords.includes(coord)) acc = true;

							// 	return acc;
							// }, false);

							break;
						}
						// same as above but for vertical direction
						case 'vertical': {
							for (let i = 0; i < shipLength; i += 1) {
								shipCoordsArr.push([randCoord[0], randCoord[1] + i]);
							}

							withinBounds = shipCoordsArr.every(
								([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10
							);

							isAnotherShipPresent = shipCoordsArr.some((coord) =>
								shipsPresentCoordsSet.has(coord.join(','))
							);
							// isAnotherShipPresent = shipCoordsArr.reduce((acc, coord) => {
							// 	if (shipsPresentCoords.includes(coord)) acc = true;

							// 	return acc;
							// }, false);

							break;
						}
						default:
							break;
					}
				}

				// adds the ship's coords to the shipsPresentCoords
				shipCoordsArr.forEach((coord) => shipsPresentCoordsSet.add(coord.join(',')));
				console.log(
					'shipsPresentCoords from populateCompShipsCoords()',
					shipsPresentCoordsSet
				);

				let shipTypeCoordsObj: Map<string, string>;
				// creates a Map object with the ship's type as the key and an object with the ship's coordinates as the value
				// superdreadnought, carrier, and battleship are treated separately because they consist of a single object
				if (
					shipType === 'superdreadnought' ||
					shipType === 'carrier' ||
					shipType === 'battleship'
				) {
					// creates a Map object with the ship's type as the key and an object with the ship's coordinates as the value
					shipTypeCoordsObj = new Map([
						['head', shipCoordsArr[0].toString()],
						['tail', shipCoordsArr[shipCoordsArr.length - 1].toString()],
					]);

					// adds the ship's body coordinates to the Map object
					for (let i = 1; i < shipCoordsArr.length - 1; i += 1) {
						shipTypeCoordsObj.set(
							`${shipType === 'battleship' ? `body` : `body${i}`}`,
							shipCoordsArr[i].toString()
						);
					}

					acc.set(shipType, Object.fromEntries(shipTypeCoordsObj));
				}
				// destroyer and frigate are treated separately because they consist of an array of objects
				else if (shipType === 'destroyer' || shipType === 'frigate') {
					switch (shipType) {
						case 'destroyer': {
							const destroyerCoordObj = {
								head: shipCoordsArr[0].toString(),
								tail: shipCoordsArr[shipCoordsArr.length - 1].toString(),
							};

							const prevDestroyerCoordObjArr = acc.get('destroyers') as
								| Record<string, string>[]
								| undefined;

							if (prevDestroyerCoordObjArr) {
								acc.set('destroyers', prevDestroyerCoordObjArr.concat(destroyerCoordObj));
							} else acc.set('destroyers', [destroyerCoordObj]);

							break;
						}
						case 'frigate': {
							const frigateCoordObj = {
								body: shipCoordsArr[0].toString(),
							};

							const prevFrigateCoordObjArr = acc.get('frigates') as
								| Record<string, string>[]
								| undefined;

							if (prevFrigateCoordObjArr) {
								acc.set('frigates', prevFrigateCoordObjArr.concat(frigateCoordObj));
							} else acc.set('frigates', [frigateCoordObj]);

							break;
						}
						default:
							break;
					}
				}

				return acc;
			},
			new Map()
		)
	) as CompShipsPlacementChoice;
}

export { populateCompShipsCoords };
