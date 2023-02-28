function storePrevCompHitOrMiss(prevCompHitOrMiss: 'hit' | 'miss', coord: string): void {
	localStorage.setItem('prevCompHitOrMiss', prevCompHitOrMiss);

	switch (prevCompHitOrMiss) {
		case 'hit': {
			localStorage.setItem('prevCompHitOnPlayerCoord', JSON.stringify(coord));
			break;
		}
		case 'miss': {
			localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(coord));
			break;
		}
		default:
			break;
	}
}

export { storePrevCompHitOrMiss };
