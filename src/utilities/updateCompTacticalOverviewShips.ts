import {
	addStyleToElem,
	addTextToElem,
	pipe,
	removeStyleFromElem,
} from './elementCreators';
import {
	Battleship,
	Carrier,
	Destroyer,
	Div,
	Frigate,
	Para,
	Superdreadnought,
} from './types';

function updateCompTacticalOverviewShips() {
	// at each fire by player towards computer, the computer ships coords are checked to see if all adjacent cells are hit, if so, the ship is sunk and message is displayed to player
	// this ensures that player does not easily determine the type of ship and whether it is sunk or not by the number of hits on the ship

	// coords of player misses on computer ships
	const compShipsMissesCoords = JSON.parse(
		localStorage.getItem('compShipsMissesCoords') ?? JSON.stringify([])
	);

	// coords of player hits on computer ships
	const compShipsHitCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsHitCoords') ?? JSON.stringify([])
	);

	// check the superdreadnought, carrier, battleship first that consist of an array of one object whose values will be returned as string[]
	let shipTypes = ['Superdreadnought', 'Carrier', 'Battleship'];

	shipTypes.forEach((shipType) => {
		const compShipsCoords: Superdreadnought | Carrier | Battleship = JSON.parse(
			localStorage.getItem(`comp${shipType}`) ?? JSON.stringify([])
		);

		// grab adjacent array of cells for each ship
		const uniqueAdjacentCoords: string[] = Object.values(compShipsCoords)
			.reduce((adjCoords: string[], coord: string) => {
				const xyCoords = coord.split(',');
				const xCoord = parseInt(xyCoords[0].replace('"', ''));
				const yCoord = parseInt(xyCoords[1].replace('"', ''));

				//top
				if (yCoord - 1 >= 0) adjCoords.push(`${xCoord},${yCoord - 1}`);

				//right
				if (xCoord + 1 <= 9) adjCoords.push(`${xCoord + 1},${yCoord}`);

				//bottom
				if (yCoord + 1 <= 9) adjCoords.push(`${xCoord},${yCoord + 1}`);

				//left
				if (xCoord - 1 >= 0) adjCoords.push(`${xCoord - 1},${yCoord}`);

				return adjCoords;
			}, [])
			.filter(
				(coord) =>
					!compShipsHitCoords.includes(coord) && !compShipsMissesCoords.includes(coord)
			);

		// if all adjacent cells are hit, the ship is sunk and the ship is displayed as sunk in the tactical overview
		if (uniqueAdjacentCoords.length === 0) {
			// grab the tac overview comp '?' cell and remove it
			const questionMarkCell: Para = document.querySelector(
				`[data-compshipquestion="${shipType}"]`
			);
			if (questionMarkCell) questionMarkCell.remove();

			const lengthOfCells =
				shipType === 'Superdreadnought' ? 5 : shipType === 'Carrier' ? 4 : 3;

			// display sunk ship with '💥' emoji
			for (let i = 0; i < lengthOfCells; i += 1) {
				const hiddenCell: Div = document.querySelector(
					`[data-compshipcell="${shipType}_${i}"]`
				);
				if (hiddenCell && hiddenCell.style.display === 'none') {
					pipe(
						removeStyleFromElem('display'),
						addStyleToElem([
							['display', 'visible'],
							['color', '#f0a400'],
						]),
						addTextToElem('💥')
					)(hiddenCell);
				}
			}
		}
	});

	// check the destroyer and submarine last that consist of an array of two objects whose values will be returned as Array<string[]>
	shipTypes = ['Destroyers', 'Frigates'];

	shipTypes.forEach((shipType) => {
		const compShipsCoords: Destroyer[] | Frigate[] = JSON.parse(
			localStorage.getItem(`comp${shipType}`) ?? JSON.stringify([])
		);

		const compShipCoordsArr = compShipsCoords.map((ship) => Object.values(ship));

		// grab adjacent array of cells for each ship of each type
		compShipCoordsArr.forEach((compShipCoord: string[], idx) => {
			const uniqueAdjacentCoords: string[] = compShipCoord
				.reduce((adjCoords: string[], coord: string) => {
					const xyCoords = coord.split(',');
					const xCoord = parseInt(xyCoords[0].replace('"', ''));
					const yCoord = parseInt(xyCoords[1].replace('"', ''));

					//top
					if (yCoord - 1 >= 0) adjCoords.push(`${xCoord},${yCoord - 1}`);

					//right
					if (xCoord + 1 <= 9) adjCoords.push(`${xCoord + 1},${yCoord}`);

					//bottom
					if (yCoord + 1 <= 9) adjCoords.push(`${xCoord},${yCoord + 1}`);

					//left
					if (xCoord - 1 >= 0) adjCoords.push(`${xCoord - 1},${yCoord}`);

					return adjCoords;
				}, [])
				.filter(
					(coord) =>
						!compShipsHitCoords.includes(coord) && !compShipsMissesCoords.includes(coord)
				);

			console.log(`uniqueAdjacentCoords for ${shipType}: `, uniqueAdjacentCoords);

			// if all adjacent cells are hit, the ship is sunk and the ship is displayed as sunk in the tactical overview
			if (uniqueAdjacentCoords.length === 0) {
				// grab the tac overview comp '?' cell and remove it
				const questionMarkCell: Para = document.querySelector(
					`[data-compshipquestion="${shipType}_${idx}"]`
				);
				if (questionMarkCell) questionMarkCell.remove();

				const lengthOfCells = shipType === 'Destroyers' ? 2 : 1;

				// display sunk ship with '💥' emoji
				for (let i = 0; i < lengthOfCells; i += 1) {
					const hiddenCell: Div = document.querySelector(
						`[data-compshipcell="${shipType}_${idx}_${i}"]`
					);
					if (hiddenCell && hiddenCell.style.display === 'none') {
						pipe(
							removeStyleFromElem('display'),
							addStyleToElem([
								['display', 'visible'],
								['color', '#f0a400'],
							]),
							addTextToElem('💥')
						)(hiddenCell);
					}
				}
			}
		});
	});
}

export { updateCompTacticalOverviewShips };
