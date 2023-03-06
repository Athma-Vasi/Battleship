import { CompShipsPlacementChoice } from './types';

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

	const shipsPresentCoords: [number, number][] = [];

	return Object.fromEntries(
		shipsLengthTuple.reduce(
			(
				acc: Map<string, Record<string, string> | Record<string, string>[]>,
				[shipType, shipLength]
			) => {
				let withinBounds = false;
				let isAnotherShipPresent = true;
				let shipCoordsArr: [number, number][] = [];

				while (!withinBounds || isAnotherShipPresent) {
					shipCoordsArr = [];

					// returns a random coordinate
					const randCoord = (function () {
						let randIndex = Math.floor(Math.random() * allCoords.length);
						while (shipsPresentCoords.includes(allCoords[randIndex])) {
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
							for (let i = 0; i < shipLength; i += 1) {
								shipCoordsArr.push([randCoord[0] + i, randCoord[1]]);
							}

							withinBounds = shipCoordsArr.every(
								([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10
							);

							isAnotherShipPresent = shipCoordsArr.some((coord) =>
								shipsPresentCoords.includes(coord)
							);

							break;
						}
						case 'vertical': {
							for (let i = 0; i < shipLength; i += 1) {
								shipCoordsArr.push([randCoord[0], randCoord[1] + i]);
							}

							withinBounds = shipCoordsArr.every(
								([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10
							);

							isAnotherShipPresent = shipCoordsArr.some((coord) =>
								shipsPresentCoords.includes(coord)
							);

							break;
						}
						default:
							break;
					}
				}

				// adds the ship's coords to the shipsPresentCoords array
				shipCoordsArr.forEach((coord) => shipsPresentCoords.push(coord));

				let shipTypeCoordsObj: Map<string, string>;

				if (
					shipType === 'superdreadnought' ||
					shipType === 'carrier' ||
					shipType === 'battleship'
				) {
					shipTypeCoordsObj = new Map([
						['head', shipCoordsArr[0].toString()],
						['tail', shipCoordsArr[shipCoordsArr.length - 1].toString()],
					]);

					for (let i = 1; i < shipCoordsArr.length - 1; i += 1) {
						shipTypeCoordsObj.set(
							`${shipType === 'battleship' ? `body` : `body${i}`}`,
							shipCoordsArr[i].toString()
						);
					}

					acc.set(shipType, Object.fromEntries(shipTypeCoordsObj));
				} else if (shipType === 'destroyer' || shipType === 'frigate') {
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

				//
				//
				//
				//
				//
				return acc;
			},
			new Map()
		)
	) as CompShipsPlacementChoice;
}

export { populateCompShipsCoords };

/**
 
  else if (shipType === 'destroyer' || shipType === 'frigate') {
					shipCoordsArrArr = [];
					const numOfShips = 2;

					switch (randDirection) {
						case 'horizontal': {
							for (let i = 0; i < numOfShips; i += 1) {
								const tempCoordsArr: [number, number][] = [];
								for (let j = 0; j < shipLength; j += 1) {
									tempCoordsArr.push([randCoord[0] + j, randCoord[1]]);
								}
								shipCoordsArrArr.push(tempCoordsArr);
							}

							withinBounds = shipCoordsArrArr.every((coordArr) =>
								coordArr.every(([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10)
							);
							console.log('withinBounds horizontal', withinBounds);
							isAnotherShipPresent = shipCoordsArrArr.some((coordArr) =>
								coordArr.some((coord) => shipsPresentCoords.includes(coord))
							);
							console.log('isAnotherShipPresent horizontal', isAnotherShipPresent);

							break;
						}
						case 'vertical': {
							for (let i = 0; i < numOfShips; i += 1) {
								const tempCoordsArr: [number, number][] = [];
								for (let j = 0; j < shipLength; j += 1) {
									tempCoordsArr.push([randCoord[0], randCoord[1] + j]);
								}
								shipCoordsArrArr.push(tempCoordsArr);
							}

							withinBounds = shipCoordsArrArr.every((coordArr) =>
								coordArr.every(([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10)
							);
							console.log('withinBounds vertical', withinBounds);
							isAnotherShipPresent = shipCoordsArrArr.some((coordArr) =>
								coordArr.some((coord) => shipsPresentCoords.includes(coord))
							);
							console.log('isAnotherShipPresent vertical', isAnotherShipPresent);

							break;
						}
						default:
							break;
					}
				}

  {
		superdreadnought: {
			head: '1,0',
			body1: '2,0',
			body2: '3,0',
			body3: '4,0',
			tail: '5,0',
		},
		carrier: { head: '1,2', body1: '2,2', body2: '3,2', tail: '4,2' },
		battleship: { head: '1,4', body: '2,4', tail: '3,4' },
		destroyers: [
			{ head: '1,6', tail: '2,6' },
			{ head: '1,8', tail: '2,8' },
		],
		frigates: [{ body: '4,6' }, { body: '4,8' }],
	},
	

 */
