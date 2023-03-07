const genRandCompAttackGuess = function (prevCompFiringCoords: string[]): string {
	let compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
		Math.random() * 10
	)}`;

	// checks if guess is in previous guesses, if so runs the random function again
	// avoids guessing the same co-ordinates
	let isUniqueCoordinate = false;

	while (!isUniqueCoordinate) {
		if (prevCompFiringCoords.includes(compAttackGuess)) {
			//if the guessed co-ordinate has already been tried
			isUniqueCoordinate = false;

			compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
				Math.random() * 10
			)}`;
		} else isUniqueCoordinate = true;
	}

	return compAttackGuess;
};
export { genRandCompAttackGuess };
