const genRandCompAttackGuess = function (prevCompFiringCoords: string[]) {
	let compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
		Math.random() * 10
	)}`;

	//checks if guess is in previous guesses, if so runs the random function again
	//avoids guessing the same co-ordinates
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

/**
 
	let compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
		Math.random() * 10
	)}`;
	// //stores comp guesses to avoid hits on previously targeted co-ordinates
	// if (!localStorage.getItem('compAttackGuesses')) {
	// 	localStorage.setItem('compAttackGuesses', JSON.stringify([]));
	// }
	// const compAttackGuesses: string[] = JSON.parse(
	// 	localStorage.getItem('compAttackGuesses') ?? ''
	// );

	//checks if guess is in previous guesses, if so runs the random function again
	//avoids guessing the same co-ordinates
	let isUniqueCoordinate = false;

	while (!isUniqueCoordinate) {
		if (prevCompFiringCoords.includes(compAttackGuess)) {
			//if the guessed co-ordinate has already been tried
			isUniqueCoordinate = false;

			compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
				Math.random() * 10
			)}`;
		} else {
			isUniqueCoordinate = true;
			// //stores unique co-ordinate
			// compAttackGuesses.push(compAttackGuess);
			// localStorage.setItem('compAttackGuesses', JSON.stringify(compAttackGuesses));
		}
	}

	return compAttackGuess;

 */
