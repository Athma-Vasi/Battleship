import { genRandCompAttackGuess } from '../components/genRandCompAttackGuess';
import { generateAdjacentCoordArr } from './generateAdjacentCoordArr';

function generateProbabilisticFiringCoord() {
	const prevCompHitOrMiss: 'hit' | 'miss' = localStorage.getItem('prevCompHitOrMiss') as
		| 'hit'
		| 'miss';

	const prevCompFireOnPlayerCoord =
		prevCompHitOrMiss === 'hit'
			? localStorage.getItem('prevCompHitOnPlayerCoord') ?? ''
			: localStorage.getItem('prevCompMissOnPlayerCoord') ?? '';

	const compHitOnPlayerCoordsArr: string[] = JSON.parse(
		localStorage.getItem('compHitOnPlayerCoordsArr') ?? '[]'
	);

	const compMissOnPlayerCoordsArr: string[] = JSON.parse(
		localStorage.getItem('compMissOnPlayerCoordsArr') ?? '[]'
	);

	const prevCompFiringCoords = [
		compHitOnPlayerCoordsArr,
		compMissOnPlayerCoordsArr,
	].flat();

	let newFiringCoordinate = '';

	//only runs on first computer turn as prevCompHitOrMiss is undefined
	if (!prevCompHitOrMiss) {
		newFiringCoordinate = genRandCompAttackGuess(prevCompFiringCoords);
	} else {
		const adjacentCoords: string[] = generateAdjacentCoordArr(
			prevCompFireOnPlayerCoord,
			compHitOnPlayerCoordsArr,
			compMissOnPlayerCoordsArr
		);

		//if all adjacent coords of prev hits have been hit, generate a random guess
		//else generate a random adjacent coord from the prev hits
		newFiringCoordinate =
			adjacentCoords.length === 0
				? genRandCompAttackGuess(prevCompFiringCoords)
				: adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
	}

	return newFiringCoordinate;
}

export { generateProbabilisticFiringCoord };

/**
 
  if (prevCompHitOrMiss === 'hit') {
		const adjacentCoords: string[] = generateAdjacentCoordArr(
			prevCompFireOnPlayerCoord,
			prevCompFiringCoords
		);

		//if all adjacent coords have been hit, generate a random guess
		newFiringCoordinate =
			adjacentCoords.length === 0
				? genRandCompAttackGuess(prevCompFiringCoords)
				: adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
	} else {
		// either generate a random guess or a random adjacent coord
		// avoids the computer only firing at adjacent coords
		// and simulates a more organic play style

		// first firing coord is always random
		if (!prevCompFireOnPlayerCoord) {
			newFiringCoordinate = genRandCompAttackGuess(prevCompFiringCoords);
		} else {
			const adjacentCoords: string[] = generateAdjacentCoordArr(
				prevCompFireOnPlayerCoord,
				prevCompFiringCoords
			);

			newFiringCoordinate = tossCoin()
				? genRandCompAttackGuess(prevCompFiringCoords)
				: adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
		}

		console.log('else block prevCompFiringCoords', prevCompFiringCoords);
		console.log('else block compHitOnPlayerCoordsArr', compHitOnPlayerCoordsArr);
	}

 */
