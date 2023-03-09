import { Div, RandomizedHavenShipNames, RandomizedManticoreShipNames } from '../types';
import {
	addAttributeToElem,
	addStyleToElem,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from './elementCreators';
import { returnPlayerCompShipsCoords } from './returnPlayerCompShipsCoords';
import { shuffleArray } from './shuffleArray';

/**
 * Renders the tactical overview - player shipnames and coordinates, computer shipnames and '?' cells.
 * The player's cells are updated visually when a hit is registered and the computer's cells are updated visually when length of the ship is confirmed
 *
 * @function
 * @returns {void}
 */
function renderTacticalOverview(): void {
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

	const manticoreShipNamesCoords: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? JSON.stringify([{}])
	);

	// grabs the ship coords to use them in the tac overview cells to update hits
	const { playerShipCoords } = returnPlayerCompShipsCoords();

	// loops through the player ship names and renders the ship names along with the cells corresponding to the shiptype and coords from the board
	Object.entries(manticoreShipNamesCoords).forEach(
		([shipType, shipName]: [string, string | string[]]) => {
			//handles superdreadnought, carrier, battleship first
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
			// handles destroyers and frigates that are a string[]
			else {
				const lengthOfCells = shipType === 'destroyers' ? 2 : 1;

				const shipAndCoords: string[][] =
					shipType === 'destroyers'
						? playerShipCoords.destroyers
						: playerShipCoords.frigates;

				for (let i = 0; i < 2; i += 1) {
					const shipNameContainer = elemCreator('div')(['shipName-container']);
					appendElemToParent(tacticalOverviewWrapperPlayer)(shipNameContainer);

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

	const havenShipNamesCoords: RandomizedHavenShipNames = JSON.parse(
		localStorage.getItem('havenShipNames') ?? JSON.stringify([{}])
	);

	const havenShipTypeNamesArr: [string, string | string[]][] =
		Object.entries(havenShipNamesCoords);
	// shuffle array
	const shuffledHavenShipTypeNamesCoordsArr = shuffleArray(havenShipTypeNamesArr);

	// loop through the comp ship names and render the ship names along with the cells corresponding to the shiptype and coords from the board
	shuffledHavenShipTypeNamesCoordsArr.forEach(
		([shipType, shipName]: [string, string | string[]]) => {
			// handle superdreadnought, carrier, battleship first
			if (!Array.isArray(shipName)) {
				const shipNameContainer = elemCreator('div')(['shipName-container']);
				appendElemToParent(tacticalOverviewWrapperComp)(shipNameContainer);

				const lengthOfCells =
					shipType === 'superdreadnought' ? 5 : shipType === 'carrier' ? 4 : 3;

				pipe(
					addAttributeToElem([['data-compshipnamecontainer', `${shipType}`]]),
					addTextToElem(`PNS ${shipName}`),
					appendElemToParent(shipNameContainer)
				)(elemCreator('p')(['shipName-text']));

				pipe(appendElemToParent(shipNameContainer))(
					elemCreator('div')(['tacticalCells-container'])
				);

				// add the hidden cells that wil be revealed once the player has fired upon all adjacent cells
				for (let i = 0; i < lengthOfCells; i += 1) {
					pipe(
						addAttributeToElem([
							[
								`data-compshipcell`,
								`${shipType[0].toUpperCase() + shipType.slice(1)}_${i}`,
							],
						]),
						addStyleToElem([['display', 'none']]),
						appendElemToParent(shipNameContainer)
					)(elemCreator('div')(['comp-tacticalCell']));
				}

				pipe(
					addTextToElem('?'),
					addAttributeToElem([
						[`data-compshipquestion`, `${shipType[0].toUpperCase() + shipType.slice(1)}`],
					]),
					appendElemToParent(shipNameContainer)
				)(elemCreator('div')(['comp-tacticalCell']));
			}
			// handle destroyers and frigates that are a string[]
			else {
				const lengthOfCells = shipType === 'destroyers' ? 2 : 1;

				for (let i = 0; i < 2; i += 1) {
					const shipNameContainer = elemCreator('div')(['shipName-container']);
					appendElemToParent(tacticalOverviewWrapperComp)(shipNameContainer);

					pipe(
						addTextToElem(`PNS ${shipName[i]}`),
						appendElemToParent(shipNameContainer)
					)(elemCreator('p')(['shipName-text']));

					const tacticalCellsContainer = elemCreator('div')(['tacticalCells-container']);
					pipe(
						addAttributeToElem([
							[
								'data-compshiptype',
								`${shipType[0].toUpperCase() + shipType.slice(1)}_${i}`,
							],
						]),
						appendElemToParent(shipNameContainer)
					)(tacticalCellsContainer);

					pipe(
						addAttributeToElem([
							[
								`data-compshipquestion`,
								`${shipType[0].toUpperCase() + shipType.slice(1)}_${i}`,
							],
						]),
						addTextToElem('?'),
						appendElemToParent(shipNameContainer)
					)(elemCreator('div')(['comp-tacticalCell']));

					// add the hidden cells that wil be revealed once the player has fired upon all adjacent cells
					for (let j = 0; j < lengthOfCells; j += 1) {
						pipe(
							addAttributeToElem([
								[
									`data-compshipcell`,
									`${shipType[0].toUpperCase() + shipType.slice(1)}_${i}_${j}`,
								],
							]),
							addStyleToElem([['display', 'none']]),
							appendElemToParent(shipNameContainer)
						)(elemCreator('div')(['comp-tacticalCell']));
					}
				}
			}
		}
	);
}

export { renderTacticalOverview };
