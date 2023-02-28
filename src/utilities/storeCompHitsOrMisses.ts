function storeCompHitsOrMisses(
	compAttackGuess_: string,
	hitOrMiss: 'hit' | 'miss'
): void {
	switch (hitOrMiss) {
		case 'hit': {
			const compHitOnPlayerCoordsArr: string[] = JSON.parse(
				localStorage.getItem('compHitOnPlayerCoordsArr') ?? '[]'
			);

			//adds current hit to array
			compHitOnPlayerCoordsArr.push(compAttackGuess_);

			//updates store
			localStorage.setItem(
				'compHitOnPlayerCoordsArr',
				JSON.stringify(compHitOnPlayerCoordsArr)
			);

			console.log('compHitOnPlayerCoordsArr', compHitOnPlayerCoordsArr);

			break;
		}
		case 'miss': {
			const compMissOnPlayerCoordsArr: string[] = JSON.parse(
				localStorage.getItem('compMissOnPlayerCoordsArr') ?? '[]'
			);

			//adds current miss to array
			compMissOnPlayerCoordsArr.push(compAttackGuess_);

			//updates store
			localStorage.setItem(
				'compMissOnPlayerCoordsArr',
				JSON.stringify(compMissOnPlayerCoordsArr)
			);

			console.log('compMissOnPlayerCoordsArr', compMissOnPlayerCoordsArr);

			break;
		}
		default:
			break;
	}
}

export { storeCompHitsOrMisses };
