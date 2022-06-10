const genRandCompAttackGuess = function () {
	let compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
		Math.random() * 10
	)}`
	//store comp guesses to avoid hits on previously targeted co-ordinates
	if (!localStorage.getItem('compAttackGuesses')) {
		localStorage.setItem('compAttackGuesses', JSON.stringify([]))
	}
	let compAttackGuesses: string[] = JSON.parse(
		localStorage.getItem('compAttackGuesses') ?? ''
	)

	//check if guess is in previous guesses, if so run the random function again
	//avoids guessing the same co-ordinates
	let isUniqueCoordinate = false

	while (!isUniqueCoordinate) {
		if (compAttackGuesses.includes(compAttackGuess)) {
			//if the guessed co-ordinate has already been tried
			isUniqueCoordinate = false

			compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
				Math.random() * 10
			)}`
		} else {
			isUniqueCoordinate = true
			//store unique co-ordinate
			compAttackGuesses.push(compAttackGuess)
			localStorage.setItem('compAttackGuesses', JSON.stringify(compAttackGuesses))
		}
	}

	return compAttackGuess
}
export { genRandCompAttackGuess }
