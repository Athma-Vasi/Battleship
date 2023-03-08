/**
 * Clones an array using structured clone algorithm
 * then shuffles the cloned array using the Durstenfeld shuffle algorithm (Fisher-Yates shuffle)
 * see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param array of generic type T
 * @returns new array of generic type T
 */
function shuffleArray<T>(array: T[]): T[] {
	const shuffledArray = structuredClone(array);

	for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}

export { shuffleArray };
