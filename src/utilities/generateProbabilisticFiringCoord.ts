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

	const unattackedCoords: string[] = [];

	//quadratic time complexity but n === 10 always
	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			const coord = `${j},${i}`;
			if (
				!compHitOnPlayerCoordsArr.includes(coord) &&
				!compMissOnPlayerCoordsArr.includes(coord)
			) {
				unattackedCoords.push(coord);
			}
		}
	}

	let newFiringCoordinate = '';

	if (prevCompHitOrMiss === 'hit') {
		//generate adjacent coords
		const adjacentCoords: string[] = [];

		const prevCompHitOnPlayerCoords = prevCompFireOnPlayerCoord.split(',');
		const xCoord = parseInt(prevCompHitOnPlayerCoords[0]);
		const yCoord = parseInt(prevCompHitOnPlayerCoords[1]);

		{
			//top
			let topCoordStep = 1;
			let topCoord = `${xCoord},${yCoord - topCoordStep}`;
			while (compHitOnPlayerCoordsArr.includes(topCoord)) {
				// top of the board
				if (yCoord - topCoordStep >= 0) {
					topCoord = `${xCoord},${yCoord - topCoordStep}`;
					topCoordStep += 1;
				}
			}
			// only push if within bounds of board
			if (yCoord - topCoordStep >= 0) {
				adjacentCoords.push(topCoord);
			}
		}

		{
			//right
			let rightCoordStep = 1;
			let rightCoord = `${xCoord + rightCoordStep},${yCoord}`;
			while (compHitOnPlayerCoordsArr.includes(rightCoord)) {
				// right of the board
				if (xCoord + rightCoordStep <= 9) {
					rightCoord = `${xCoord + rightCoordStep},${yCoord}`;
					rightCoordStep += 1;
				}
			}
			// only push if within bounds of board
			if (xCoord + rightCoordStep <= 9) {
				adjacentCoords.push(rightCoord);
			}
		}

		{
			//bottom
			let bottomCoordStep = 1;
			let bottomCoord = `${xCoord},${yCoord + bottomCoordStep}`;
			while (compHitOnPlayerCoordsArr.includes(bottomCoord)) {
				// bottom of the board
				if (yCoord + bottomCoordStep <= 9) {
					bottomCoord = `${xCoord},${yCoord + bottomCoordStep}`;
					bottomCoordStep += 1;
				}
			}
			// only push if within bounds of board
			if (yCoord + bottomCoordStep <= 9) {
				adjacentCoords.push(bottomCoord);
			}
		}

		{
			//left
			let leftCoordStep = 1;
			let leftCoord = `${xCoord - leftCoordStep},${yCoord}`;
			while (compHitOnPlayerCoordsArr.includes(leftCoord)) {
				// left of the board
				if (xCoord - leftCoordStep >= 0) {
					leftCoord = `${xCoord - leftCoordStep},${yCoord}`;
					leftCoordStep += 1;
				}
			}
			// only push if within bounds of board
			if (xCoord - leftCoordStep >= 0) {
				adjacentCoords.push(leftCoord);
			}
		}

		newFiringCoordinate =
			adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
	} else if (prevCompHitOrMiss === 'miss') {
		const prevCompFiringCoords = [
			compHitOnPlayerCoordsArr,
			compMissOnPlayerCoordsArr,
		].flat();

		newFiringCoordinate = `${Math.floor(Math.random() * 10)},${Math.floor(
			Math.random() * 10
		)}`;

		//checks if guess is in previous guesses, if so runs the random function again
		//avoids guessing the same co-ordinates
		let isUniqueCoordinate = false;

		while (!isUniqueCoordinate) {
			if (prevCompFiringCoords.includes(newFiringCoordinate)) {
				//if the guessed co-ordinate has already been tried
				isUniqueCoordinate = false;

				newFiringCoordinate = `${Math.floor(Math.random() * 10)},${Math.floor(
					Math.random() * 10
				)}`;
			} else {
				isUniqueCoordinate = true;
				//stores unique co-ordinate
				prevCompFiringCoords.push(newFiringCoordinate);
				localStorage.setItem(
					'prevCompFiringCoords',
					JSON.stringify(prevCompFiringCoords)
				);
			}
		}
	}
	return newFiringCoordinate;

	//
	//
	//
}
