import { battleTexts } from '../data/battleTexts';
import {
	addStyleToElem,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators';
import { tossCoin } from '../utilities/tossCoin';
import {
	Destroyer,
	Div,
	Frigate,
	RandomizedHavenShipNames,
	RandomizedManticoreShipNames,
	ShipType,
} from '../utilities/types';
import { updateCompTacticalOverviewShips } from '../utilities/updateCompTacticalOverviewShips';

type renderBattleMessageElemProps = {
	currentCellCoord: string;
	currentShipSymbol: string;
	towardsCombatant: 'player' | 'comp';
	hitOrMiss: 'hit' | 'miss';
	sunkShipName?: string;
};

const renderBattleMessageElem = function ({
	currentCellCoord,
	currentShipSymbol,
	towardsCombatant,
	hitOrMiss,
	sunkShipName,
}: renderBattleMessageElemProps) {
	const randHitsStrings = [
		'A hit on',
		'Direct hit on',
		'Shields weak on',
		'Hull integrity is weakening on',
		'Impellers damaged on',
		'Engines are out on',
		'Weapons systems offline on',
		'Life support failing on',
		'Structural damage on',
		'Reactor breach on',
		'Target immobilized on',
		'Power systems fluctuating on',
		'Navigational systems down on',
		'Communication systems disabled on',
		'Gravity generators failing on',
		'Primary sensor array damaged on',
		'Secondary defenses compromised on',
		'Point defense systems offline on',
		'Missile tubes destroyed on',
	];
	const hitsPrecursorString = () =>
		randHitsStrings[Math.floor(Math.random() * randHitsStrings.length)];

	const havenShipNames: RandomizedHavenShipNames = JSON.parse(
		localStorage.getItem('havenShipNames') ?? ''
	);
	const manticoreShipNames: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? ''
	);

	const playerName = JSON.parse(localStorage.getItem('playerName') ?? '');

	const battleMessageWrapper: Div = document.querySelector('.battleMessage-wrapper');

	const battleMessageElem = elemCreator('p')(['battleMessageElem']);
	appendElemToParent(battleMessageWrapper)(battleMessageElem);

	{
		const today = new Date();
		const formatter = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		});
		const formattedDate = formatter.format(today);

		const dividerElem = elemCreator('p')(['dividerElem']);
		pipe(
			addTextToElem('_______________________'),
			addStyleToElem([['color', '#00f000']]),
			appendElemToParent(battleMessageWrapper)
		)(dividerElem);

		pipe(addTextToElem(`T-year 1913  ${formattedDate}  `))(battleMessageElem);

		for (let i = 0; i < 2; i += 1)
			pipe(appendElemToParent(battleMessageElem))(elemCreator('br')(['spacerElem']));
	}

	if (towardsCombatant === 'comp') {
		// checks what compShip currentCellCoord is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
		const compSuperdreadnought: string[] = Object.values(
			JSON.parse(localStorage.getItem('compSuperdreadnought') ?? '')
		);
		const compCarrier: string[] = Object.values(
			JSON.parse(localStorage.getItem('compCarrier') ?? '')
		);
		const compBattleship: string[] = Object.values(
			JSON.parse(localStorage.getItem('compBattleship') ?? '')
		);

		// destroyers consists of an array of objects
		let compDestroyers: unknown[] = [];
		JSON.parse(localStorage.getItem('compDestroyers') ?? '').forEach(
			(destroyer: Destroyer) => {
				compDestroyers.push(Object.values(destroyer));
			}
		);
		compDestroyers = compDestroyers.flat();

		// frigates consists of an array of objects
		let compFrigates: unknown[] = [];
		JSON.parse(localStorage.getItem('compFrigates') ?? '').forEach((frigate: Frigate) => {
			compFrigates.push(Object.values(frigate));
		});
		compFrigates = compFrigates.flat();

		if (hitOrMiss === 'hit') {
			// player attacking computer scores a hit
			if (compSuperdreadnought.includes(currentCellCoord)) {
				// displays hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} PNS ${havenShipNames.superdreadnought}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compCarrier.includes(currentCellCoord)) {
				//displays hit on carrier with randomized text
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} PNS ${havenShipNames.cruiser}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compBattleship.includes(currentCellCoord)) {
				//displays hit on battleship with randomized text
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} PNS ${havenShipNames.battleship}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compDestroyers.includes(currentCellCoord)) {
				//there are two destroyers to connect names
				//checks that current cell that has hit registered is included in either one of the destroyers' or frigates' co-ordinates and assigns corresponding name to the hit rather than randomly calling the names

				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('compDestroyers') ?? ''
				);

				const destroyer1Coords: string[] = [];
				Object.values(destroyer1).forEach((shipPartCoords) => {
					destroyer1Coords.push(shipPartCoords);
				});

				//displays hit on destroyer with randomized text
				//only need to check one destroyer
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} PNS ${
							destroyer1Coords.includes(currentCellCoord)
								? havenShipNames.destroyers[0]
								: havenShipNames.destroyers[1]
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compFrigates.includes(currentCellCoord)) {
				//there are two frigates to connect names
				const [frigate1, _]: Frigate[] = JSON.parse(
					localStorage.getItem('compFrigates') ?? ''
				);

				const frigate1Coords: string[] = [];
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords);
				});

				//displays hit on frigate with randomized text
				//only need to check one frigate
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} PNS ${
							frigate1Coords.includes(currentCellCoord)
								? havenShipNames.frigates[0]
								: havenShipNames.frigates[1]
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			}
		} else if (hitOrMiss === 'miss') {
			//player attacking computer misses
			pipe(
				addTextToElem(
					`Tenth Fleet CIC: ${tossCoin() ? `Admiral ${playerName}!` : ''} ${
						battleTexts.missesOnShip[
							Math.floor(Math.random() * battleTexts.missesOnShip.length)
						]
					}`
				)
			)(battleMessageElem);
		}
	} else if (towardsCombatant === 'player') {
		if (hitOrMiss === 'hit') {
			//if computer attacking player registers a hit
			if (currentShipSymbol === 'S') {
				// comp sinks player's superdreadnought
				if (sunkShipName === manticoreShipNames.superdreadnought) {
					// player CIC text that indicates that computer has sunk their superdreadnought
					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Tenth Fleet CIC: ${hitsPrecursorString()} the superdreadnought RMNS ${
								manticoreShipNames.superdreadnought
							}! Sir, it's gone... Dear God, all those people... `
						)
					)(battleMessageElem);

					pipe(appendElemToParent(battleMessageElem))(elemCreator('br')(['spacerElem']));

					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Admiral ${playerName} to Tenth Fleet: ${
								battleTexts.playerShipDestroyed[
									Math.floor(Math.random() * battleTexts.playerShipDestroyed.length)
								]
							}`
						)
					)(battleMessageElem);
				} else {
					// player CIC text that indicates damage to their superdreadnought when computer scores a hit
					pipe(
						addTextToElem(
							`Tenth Fleet CIC: ${
								tossCoin() ? `Admiral ${playerName}!` : ''
							} ${hitsPrecursorString()} the superdreadnought RMNS ${
								manticoreShipNames.superdreadnought
							}! ${
								battleTexts.damageOnShip[
									Math.floor(Math.random() * battleTexts.damageOnShip.length)
								]
							}`
						)
					)(battleMessageElem);
				}
			} else if (currentShipSymbol === 'C') {
				// comp sinks player's cruiser
				if (sunkShipName === manticoreShipNames.cruiser) {
					// player CIC text that indicates that computer has sunk their cruiser
					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Tenth Fleet CIC: ${hitsPrecursorString()} the cruiser RMNS ${
								manticoreShipNames.cruiser
							}! Sir, it's gone... Dear God, all those people... `
						)
					)(battleMessageElem);

					pipe(appendElemToParent(battleMessageElem))(elemCreator('br')(['spacerElem']));

					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Admiral ${playerName} to Tenth Fleet: ${
								battleTexts.playerShipDestroyed[
									Math.floor(Math.random() * battleTexts.playerShipDestroyed.length)
								]
							}`
						)
					)(battleMessageElem);
				} else {
					// player CIC text that indicates damage to their carrier when computer scores a hit
					pipe(
						addTextToElem(
							`Tenth Fleet CIC: ${
								tossCoin() ? `Admiral ${playerName}!` : ''
							} ${hitsPrecursorString()} the carrier RMNS ${
								manticoreShipNames.cruiser
							}! ${
								battleTexts.damageOnShip[
									Math.floor(Math.random() * battleTexts.damageOnShip.length)
								]
							}`
						)
					)(battleMessageElem);
				}
			} else if (currentShipSymbol === 'B') {
				// comp sinks player's battleship
				if (sunkShipName === manticoreShipNames.battleship) {
					// player CIC text that indicates that computer has sunk their battleship
					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Tenth Fleet CIC: ${hitsPrecursorString()} the battleship RMNS ${
								manticoreShipNames.battleship
							}! Sir, it's gone... Dear God, all those people... `
						)
					)(battleMessageElem);

					pipe(appendElemToParent(battleMessageElem))(elemCreator('br')(['spacerElem']));

					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Admiral ${playerName} to Tenth Fleet: ${
								battleTexts.playerShipDestroyed[
									Math.floor(Math.random() * battleTexts.playerShipDestroyed.length)
								]
							}`
						)
					)(battleMessageElem);
				} else {
					// player CIC text that indicates damage to their battleship when computer scores a hit
					pipe(
						addTextToElem(
							`Tenth Fleet CIC: ${
								tossCoin() ? `Admiral ${playerName}!` : ''
							} ${hitsPrecursorString()} the battleship RMNS ${
								manticoreShipNames.battleship
							}! ${
								battleTexts.damageOnShip[
									Math.floor(Math.random() * battleTexts.damageOnShip.length)
								]
							}`
						)
					)(battleMessageElem);
				}
			} else if (currentShipSymbol === 'D') {
				//there are two destroyers to connect names
				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('destroyer') ?? ''
				);

				const destroyer1Coords: string[] = [];
				Object.values(destroyer1).forEach((shipPartCoords) => {
					destroyer1Coords.push(shipPartCoords);
				});

				// comp sinks player's destroyer
				if (
					sunkShipName === manticoreShipNames.destroyers[0] ||
					sunkShipName === manticoreShipNames.destroyers[1]
				) {
					// player CIC text that indicates that computer has sunk their destroyer
					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Tenth Fleet CIC: ${hitsPrecursorString()} the destroyer RMNS ${
								destroyer1Coords.includes(currentCellCoord)
									? manticoreShipNames.destroyers[0]
									: manticoreShipNames.destroyers[1]
							}! Sir, it's gone... Dear God, all those people... `
						)
					)(battleMessageElem);

					pipe(appendElemToParent(battleMessageElem))(elemCreator('br')(['spacerElem']));

					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Admiral ${playerName} to Tenth Fleet: ${
								battleTexts.playerShipDestroyed[
									Math.floor(Math.random() * battleTexts.playerShipDestroyed.length)
								]
							}`
						)
					)(battleMessageElem);
				} else {
					// player CIC text that indicates damage to their destroyer when computer scores a hit
					pipe(
						addTextToElem(
							`Tenth Fleet CIC: ${
								tossCoin() ? `Admiral ${playerName}!` : ''
							} ${hitsPrecursorString()} the destroyer RMNS ${
								destroyer1Coords.includes(currentCellCoord)
									? manticoreShipNames.destroyers[0]
									: manticoreShipNames.destroyers[1]
							}! ${
								battleTexts.damageOnShip[
									Math.floor(Math.random() * battleTexts.damageOnShip.length)
								]
							}`
						)
					)(battleMessageElem);
				}
			} else if (currentShipSymbol === 'F') {
				//there are two frigates to connect names
				const [frigate1, _]: Frigate[] = JSON.parse(
					localStorage.getItem('frigate') ?? ''
				);

				const frigate1Coords: string[] = [];
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords);
				});

				// comp sinks player's frigate
				if (
					sunkShipName === manticoreShipNames.frigates[0] ||
					sunkShipName === manticoreShipNames.frigates[1]
				) {
					// player CIC text that indicates that computer has sunk their frigate
					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Tenth Fleet CIC: ${hitsPrecursorString()} the frigate RMNS ${
								frigate1Coords.includes(currentCellCoord)
									? manticoreShipNames.frigates[0]
									: manticoreShipNames.frigates[1]
							}! Sir, it's gone... Dear God, all those people... `
						)
					)(battleMessageElem);

					pipe(appendElemToParent(battleMessageElem))(elemCreator('br')(['spacerElem']));

					pipe(
						addStyleToElem([['color', '#f0a400']]),
						addTextToElem(
							`Admiral ${playerName} to Tenth Fleet: ${
								battleTexts.playerShipDestroyed[
									Math.floor(Math.random() * battleTexts.playerShipDestroyed.length)
								]
							}`
						)
					)(battleMessageElem);
				} else {
					// player CIC text that indicates damage to their frigate when computer scores a hit
					pipe(
						addTextToElem(
							`Tenth Fleet CIC: ${
								tossCoin() ? `Admiral ${playerName}!` : ''
							} ${hitsPrecursorString()} the frigate RMNS ${
								frigate1Coords.includes(currentCellCoord)
									? manticoreShipNames.frigates[0]
									: manticoreShipNames.frigates[1]
							}! ${
								battleTexts.damageOnShip[
									Math.floor(Math.random() * battleTexts.damageOnShip.length)
								]
							}`
						)
					)(battleMessageElem);
				}
			}
		}
		// else if (hitOrMiss === 'miss') {
		// 	//computer attacking player misses
		// 	pipe(
		// 		addTextToElem(
		// 			`Haven Fleet CIC: ${tossCoin() ? `Admiral McQueen!` : ''} ${
		// 				battleTexts.missesOnShip[
		// 					Math.floor(Math.random() * battleTexts.missesOnShip.length)
		// 				]
		// 			}`
		// 		)
		// 	)(battleMessageElem);
		// }
	}

	//auto-scrolls to the bottom to have the most recent message visible
	// const battleMessageWrapper: Div = document.querySelector('.battleMessage-wrapper');
	const scrollHeight = battleMessageWrapper?.scrollHeight ?? 0;

	battleMessageWrapper?.scroll({ top: scrollHeight, left: 0, behavior: 'smooth' });
};
export { renderBattleMessageElem };

/**
	
{
			//display that its players's turn so the messages are more clearly differentiable
			pipe(
				addStyleToElem([[`color`, `#f0a400`]]),
				addTextToElem(`Players's turn: `)
			)(battleMessageElem);

			//adds a spacer element to separate the player's turn message from the battle message
			for (let i = 0; i < 2; i += 1) {
				const spacerElem = elemCreator('br')(['spacerElem']);
				pipe(appendElemToParent(battleMessageElem))(spacerElem);
			}
		}


//displays hit on destroyer with randomized text
				//only need to check one destroyer
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the destroyer RMNS ${
							destroyer1Coords.includes(currentCellCoord)
								? manticoreShipNames.destroyers[0]
								: manticoreShipNames.destroyers[1]
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
 
 */
