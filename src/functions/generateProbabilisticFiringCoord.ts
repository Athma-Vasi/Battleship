import { generateFiringSolution } from './generateFiringSolution';
import { genRandCompAttackGuess } from './genRandCompAttackGuess';

/**
 * Generates a firing coordinate for the computer by calling the generateFiringSolution function and if it returns an empty string, calls the genRandCompAttackGuess function to generate a random firing coordinate. The very first attack is always random.
 *
 * @function
 * @returns {string} - a coordinate for the computer to fire at
 */
function generateProbabilisticFiringCoord(): string {
	const prevCompHitOrMiss: 'hit' | 'miss' = localStorage.getItem('prevCompHitOrMiss') as
		| 'hit'
		| 'miss';

	const compHitOnPlayerCoordsArr: string[] = JSON.parse(
		localStorage.getItem('compHitOnPlayerCoordsArr') ?? JSON.stringify([])
	);
	const compHitOnPlayerCoordsSet = new Set<string>(compHitOnPlayerCoordsArr);

	const compMissOnPlayerCoordsArr: string[] = JSON.parse(
		localStorage.getItem('compMissOnPlayerCoordsArr') ?? JSON.stringify([])
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
		// if there havent been any hits yet, generates a random guess
		if (compHitOnPlayerCoordsArr.length === 0) {
			newFiringCoordinate = genRandCompAttackGuess(prevCompFiringCoords);
		}
		// if there have been hits, generates a firing solution
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
