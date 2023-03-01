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
		// if the previous guess was a hit, generate adjacent coords of all previous hits
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
