function storeCompHitMissCoords(
	compAttackGuess_: string,
	hitOrMiss: 'hit' | 'miss'
): void {
	localStorage.setItem('prevCompHitOrMiss', hitOrMiss);
	switch (hitOrMiss) {
		case 'hit': {
			localStorage.setItem('prevCompHitOnPlayerCoord', JSON.stringify(compAttackGuess_));

			const compHitOnPlayerCoordsArr: string[] = JSON.parse(
				localStorage.getItem('compHitOnPlayerCoordsArr') ?? JSON.stringify([])
			);
			// adds current hit to array
			compHitOnPlayerCoordsArr.push(compAttackGuess_);

			// updates store
			localStorage.setItem(
				'compHitOnPlayerCoordsArr',
				JSON.stringify(compHitOnPlayerCoordsArr)
			);

			break;
		}
		case 'miss': {
			localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(compAttackGuess_));

			const compMissOnPlayerCoordsArr: string[] = JSON.parse(
				localStorage.getItem('compMissOnPlayerCoordsArr') ?? JSON.stringify([])
			);
			// adds current miss to array
			compMissOnPlayerCoordsArr.push(compAttackGuess_);

			// updates store
			localStorage.setItem(
				'compMissOnPlayerCoordsArr',
				JSON.stringify(compMissOnPlayerCoordsArr)
			);

			break;
		}
		default:
			break;
	}
}

export { storeCompHitMissCoords };
