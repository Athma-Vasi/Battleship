import {
	addAttributeToElem,
	addStyleToElem,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from './elementCreators';
import { returnPlayerCompShipsCoords } from './returnPlayerCompShipsCoords';
import { Div, RandomizedHavenShipNames, RandomizedManticoreShipNames } from './types';

function renderTacticalOverview() {
	const gamePlayerBoardWrapper: Div = document.querySelector('.gamePlayerBoard-wrapper');

	const compBoardWrapper: Div = document.querySelector('.compBoard-wrapper');

	const tacticalOverviewWrapperPlayer = elemCreator('div')(['tacticalOverview-wrapper']);
	appendElemToParent(gamePlayerBoardWrapper)(tacticalOverviewWrapperPlayer);

	const tacticalOverviewWrapperComp = elemCreator('div')(['tacticalOverview-wrapper']);
	appendElemToParent(compBoardWrapper)(tacticalOverviewWrapperComp);

	const tacticalOverviewContainerPlayer = elemCreator('div')([
		'tacticalOverview-container',
	]);
	appendElemToParent(tacticalOverviewWrapperPlayer)(tacticalOverviewContainerPlayer);

	const tacticalOverviewTitlePlayer = elemCreator('h2')(['tacticalOverview-title']);
	pipe(
		addTextToElem('Manticoran Navy Tenth Fleet'),
		appendElemToParent(tacticalOverviewContainerPlayer)
	)(tacticalOverviewTitlePlayer);

	const tacticalOverviewContainerComp = elemCreator('div')([
		'tacticalOverview-container',
	]);
	appendElemToParent(tacticalOverviewWrapperComp)(tacticalOverviewContainerComp);

	const tacticalOverviewTitleComp = elemCreator('h2')(['tacticalOverview-title']);
	pipe(
		addTextToElem('Havenite Navy Grendelsbane Fleet'),
		appendElemToParent(tacticalOverviewContainerComp)
	)(tacticalOverviewTitleComp);

	const manticoreShipNames: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? ''
	);

	// grab the ship coords from the board to use them in the tac overview cells to update hits
	const { playerShipCoords, compShipCoords } = returnPlayerCompShipsCoords();

	// loop through the player ship names and render the ship names along with the cells corresponding to the shiptype and coords from the board
	Object.entries(manticoreShipNames).forEach(
		([shipType, shipName]: [string, string | string[]]) => {
			//handle superdreadnought, carrier, battleship first
			if (!Array.isArray(shipName)) {
				const shipNameContainer = elemCreator('div')(['shipName-container']);
				appendElemToParent(tacticalOverviewWrapperPlayer)(shipNameContainer);

				const lengthOfCells =
					shipType === 'superdreadnought' ? 5 : shipType === 'carrier' ? 4 : 3;

				const shipAndCoords: string[] =
					shipType === 'superdreadnought'
						? playerShipCoords.superdreadnought
						: shipType === 'carrier'
						? playerShipCoords.carrier
						: playerShipCoords.battleship;

				pipe(
					addTextToElem(`RMNS ${shipName}`),
					appendElemToParent(shipNameContainer)
				)(elemCreator('p')(['shipName-text']));

				pipe(
					addAttributeToElem([['data-shiptype', `${shipType}`]]),
					appendElemToParent(shipNameContainer)
				)(elemCreator('div')(['tacticalCells-container']));

				for (let i = 0; i < lengthOfCells; i += 1) {
					pipe(
						addAttributeToElem([[`data-playership`, `${shipAndCoords[i]}`]]),
						addTextToElem(shipType[0].toUpperCase()),
						appendElemToParent(shipNameContainer)
					)(elemCreator('div')(['player-tacticalCell']));
				}
			}
			// handle destroyers and frigates that are a string[]
			else {
				const lengthOfCells = shipType === 'destroyers' ? 2 : 1;

				const shipAndCoords: string[][] =
					shipType === 'destroyers'
						? playerShipCoords.destroyers
						: playerShipCoords.frigates;

				for (let i = 0; i < 2; i += 1) {
					const shipNameContainer = elemCreator('div')(['shipName-container']);
					appendElemToParent(tacticalOverviewWrapperPlayer)(shipNameContainer);
					// const smallShipsContainer = elemCreator('p')(['smallShips-container']);
					// pipe(appendElemToParent(shipNameContainer))(smallShipsContainer);

					pipe(
						addTextToElem(`RMNS ${shipName[i]}`),
						appendElemToParent(shipNameContainer)
					)(elemCreator('p')(['shipName-text']));

					const tacticalCellsContainer = elemCreator('div')(['tacticalCells-container']);
					pipe(
						addAttributeToElem([['data-playershiptype', `${shipType}`]]),
						appendElemToParent(shipNameContainer)
					)(tacticalCellsContainer);

					for (let j = 0; j < lengthOfCells; j += 1) {
						pipe(
							addAttributeToElem([[`data-playership`, `${shipAndCoords[i][j]}`]]),
							addTextToElem(shipType[0].toUpperCase()),
							appendElemToParent(tacticalCellsContainer)
						)(elemCreator('div')(['player-tacticalCell']));
					}
				}
			}
		}
	);

	const havenShipNames: RandomizedHavenShipNames = JSON.parse(
		localStorage.getItem('havenShipNames') ?? ''
	);

	// loop through the comp ship names and render the ship names along with the cells corresponding to the shiptype and coords from the board
	Object.entries(havenShipNames)
		.sort((_, __) => Math.random() - 0.5)
		.forEach(([shipType, shipName]: [string, string | string[]]) => {
			/

			// handle superdreadnought, carrier, battleship first
			if (!Array.isArray(shipName)) {
				const shipNameContainer = elemCreator('div')(['shipName-container']);
				appendElemToParent(tacticalOverviewWrapperComp)(shipNameContainer);

				const lengthOfCells =
					shipType === 'superdreadnought' ? 5 : shipType === 'carrier' ? 4 : 3;

				// const shipAndCoords: string[] =
				// 	shipType === 'superdreadnought'
				// 		? compShipCoords.superdreadnought
				// 		: shipType === 'carrier'
				// 		? compShipCoords.carrier
				// 		: compShipCoords.battleship;

				pipe(
					addAttributeToElem([['data-compshipnamecontainer', `${shipType}`]]),
					addTextToElem(`PNS ${shipName}`),
					appendElemToParent(shipNameContainer)
				)(elemCreator('p')(['shipName-text']));

				pipe(
					addAttributeToElem([
						['data-compshiptype', `${shipType[0].toUpperCase() + shipType.slice(1)}`],
					]),
					appendElemToParent(shipNameContainer)
				)(elemCreator('div')(['tacticalCells-container']));

				for (let i = 0; i < lengthOfCells; i += 1) {
					pipe(
						addAttributeToElem([
							[
								`data-compshipcell`,
								`${shipType[0].toUpperCase() + shipType.slice(1)}_${i}`,
							],
						]),
						addStyleToElem([['display', 'none']]),
						// addTextToElem(shipType[0].toUpperCase()),
						appendElemToParent(shipNameContainer)
					)(elemCreator('div')(['comp-tacticalCell']));
				}

				pipe(
					addTextToElem('?'),
					addAttributeToElem([
						[`data-compshipquestion`, `${shipType[0].toUpperCase() + shipType.slice(1)}`],
					]),
					appendElemToParent(shipNameContainer)
				)(elemCreator('p')(['comp-tacticalCell']));
			}
			// handle destroyers and frigates that are a string[]
			else {
				const lengthOfCells = shipType === 'destroyers' ? 2 : 1;

				const shipAndCoords: string[][] =
					shipType === 'destroyers' ? compShipCoords.destroyers : compShipCoords.frigates;

				for (let i = 0; i < 2; i += 1) {
					const shipNameContainer = elemCreator('div')(['shipName-container']);
					appendElemToParent(tacticalOverviewWrapperComp)(shipNameContainer);

					// const smallShipsContainer = elemCreator('p')(['smallShips-container']);
					// pipe(appendElemToParent(shipNameContainer))(smallShipsContainer);

					pipe(
						addTextToElem(`PNS ${shipName[i]}`),
						appendElemToParent(shipNameContainer)
					)(elemCreator('p')(['shipName-text']));

					// for (let j = 0; j < lengthOfCells; j += 1) {
					// 	pipe(
					// 		addAttributeToElem([[`data-compship`, `${shipAndCoords[i][j]}`]]),
					// 		addTextToElem(shipType[0].toUpperCase()),
					// 		appendElemToParent(smallShipsContainer)
					// 	)(elemCreator('div')(['comp-tacticalCell']));
					// }

					const tacticalCellsContainer = elemCreator('div')(['tacticalCells-container']);
					pipe(
						addAttributeToElem([
							[
								'data-compshiptype',
								`${shipType[0].toUpperCase() + shipType.slice(1)}${i}`,
							],
						]),
						appendElemToParent(shipNameContainer)
					)(tacticalCellsContainer);

					pipe(
						addTextToElem('?'),
						appendElemToParent(shipNameContainer)
					)(elemCreator('p')(['comp-tacticalCell']));
				}
			}
		});
}

export { renderTacticalOverview };

/**
 
	// loop through the comp ship names and render the ship names along with the cells corresponding to the shiptype and coords from the board
	Object.entries(havenShipNames).forEach(
		([shipType, shipName]: [string, string | string[]]) => {
			const shipNameContainer = elemCreator('div')(['shipName-container']);
			appendElemToParent(tacticalOverviewWrapperComp)(shipNameContainer);

			// handle superdreadnought, carrier, battleship first
			if (!Array.isArray(shipName)) {
				const lengthOfCells =
					shipType === 'superdreadnought' ? 5 : shipType === 'carrier' ? 4 : 3;

				const shipAndCoords: string[] =
					shipType === 'superdreadnought'
						? compShipCoords.superdreadnought
						: shipType === 'carrier'
						? compShipCoords.carrier
						: compShipCoords.battleship;

				pipe(
					addTextToElem(`PNS ${shipName}`),
					appendElemToParent(shipNameContainer)
				)(elemCreator('p')(['shipName-text']));

				pipe(
					addAttributeToElem([['data-shiptype', `${shipType}`]]),
					appendElemToParent(shipNameContainer)
				)(elemCreator('div')(['tacticalCells-container']));

				for (let i = 0; i < lengthOfCells; i += 1) {
					pipe(
						addAttributeToElem([[`data-compship`, `${shipAndCoords[i]}`]]),
						addTextToElem(shipType[0].toUpperCase()),
						appendElemToParent(shipNameContainer)
					)(elemCreator('div')(['comp-tacticalCell']));
				}
			}
			// handle destroyers and frigates that are a string[]
			else {
				const lengthOfCells = shipType === 'destroyers' ? 2 : 1;

				const shipAndCoords: string[][] =
					shipType === 'destroyers' ? compShipCoords.destroyers : compShipCoords.frigates;

				for (let i = 0; i < 2; i += 1) {
					const smallShipsContainer = elemCreator('p')(['smallShips-container']);
					pipe(appendElemToParent(shipNameContainer))(smallShipsContainer);

					pipe(
						addTextToElem(`PNS ${shipName[i]}`),
						appendElemToParent(smallShipsContainer)
					)(elemCreator('p')(['shipName-text']));

					for (let j = 0; j < lengthOfCells; j += 1) {
						pipe(
							addAttributeToElem([[`data-compship`, `${shipAndCoords[i][j]}`]]),
							addTextToElem(shipType[0].toUpperCase()),
							appendElemToParent(smallShipsContainer)
						)(elemCreator('div')(['comp-tacticalCell']));
					}
				}
			}
		}
	);

 */
