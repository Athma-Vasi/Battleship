import { genRandCompAttackGuess } from '../components/genRandCompAttackGuess';
import { generateFiringSolution } from './generateFiringSolution';

function generateProbabilisticFiringCoord(): string {
	const prevCompHitOrMiss: 'hit' | 'miss' = localStorage.getItem('prevCompHitOrMiss') as
		| 'hit'
		| 'miss';

	const compHitOnPlayerCoordsArr: string[] = JSON.parse(
		localStorage.getItem('compHitOnPlayerCoordsArr') ?? '[]'
	);
	const compHitOnPlayerCoordsSet = new Set<string>(compHitOnPlayerCoordsArr);

	const compMissOnPlayerCoordsArr: string[] = JSON.parse(
		localStorage.getItem('compMissOnPlayerCoordsArr') ?? '[]'
	);
	const compMissOnPlayerCoordsSet = new Set<string>(compMissOnPlayerCoordsArr);

	const prevCompFiringCoords = [
		compHitOnPlayerCoordsArr,
		compMissOnPlayerCoordsArr,
	].flat();

	let newFiringCoordinate = '';

	// only runs on first computer turn as prevCompHitOrMiss is undefined
	if (!prevCompHitOrMiss) {
		newFiringCoordinate = genRandCompAttackGuess(prevCompFiringCoords);
	} else {
		// if there havent been any hits yet, generate a random guess
		if (compHitOnPlayerCoordsArr.length === 0) {
			newFiringCoordinate = genRandCompAttackGuess(prevCompFiringCoords);
		}
		// if there have been hits, generate a firing solution
		else {
			newFiringCoordinate = generateFiringSolution({
				compHitOnPlayerCoordsSet,
				compMissOnPlayerCoordsSet,
			});
			newFiringCoordinate =
				newFiringCoordinate === ''
					? genRandCompAttackGuess(prevCompFiringCoords)
					: newFiringCoordinate;
		}
	}

	return newFiringCoordinate;
}

export { generateProbabilisticFiringCoord };
