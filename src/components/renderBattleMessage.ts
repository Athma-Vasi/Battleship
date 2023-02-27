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
} from '../utilities/types';

const renderBattleMessageElem = function (
	currentCellCoord_: string,
	currentShipSymbol_: string,
	towardsCombatant_: string,
	hitOrMiss_: string
) {
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

	const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper');

	const battleMessageElem = elemCreator('p')(['battleMessageElem']);
	appendElemToParent(infoScreenWrapper)(battleMessageElem);

	if (towardsCombatant_ === 'comp') {
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

		//checks what compShip currentCellCoord_ is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
		const compSuperdreadnought: string[] = Object.values(
			JSON.parse(localStorage.getItem('compSuperdreadnought') ?? '')
		);
		const compCarrier: string[] = Object.values(
			JSON.parse(localStorage.getItem('compCarrier') ?? '')
		);
		const compBattleship: string[] = Object.values(
			JSON.parse(localStorage.getItem('compBattleship') ?? '')
		);

		//destroyers consists of an array of objects
		let compDestroyers: unknown[] = [];
		JSON.parse(localStorage.getItem('compDestroyers') ?? '').forEach(
			(destroyer: Destroyer) => {
				compDestroyers.push(Object.values(destroyer));
			}
		);
		compDestroyers = compDestroyers.flat();

		//frigates consists of an array of objects
		let compFrigates: unknown[] = [];
		JSON.parse(localStorage.getItem('compFrigates') ?? '').forEach((frigate: Frigate) => {
			compFrigates.push(Object.values(frigate));
		});
		compFrigates = compFrigates.flat();

		if (hitOrMiss_ === 'hit') {
			//player attacking computer scores a hit
			if (compSuperdreadnought.includes(currentCellCoord_)) {
				//displays hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} the superdreadnought PNS ${
							havenShipNames.superdreadnought
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// haven CIC text that indicates damage to their superdreadnought when player scores a hit
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the superdreadnought PNS ${
							havenShipNames.superdreadnought
						}! ${
							battleTexts.damageOnShip[
								Math.floor(Math.random() * battleTexts.damageOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compCarrier.includes(currentCellCoord_)) {
				//displays hit on carrier with randomized text
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} the carrier PNS ${havenShipNames.cruiser}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// haven CIC text that indicates damage to their carrier when player scores a hit
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the carrier PNS ${havenShipNames.cruiser}! ${
							battleTexts.damageOnShip[
								Math.floor(Math.random() * battleTexts.damageOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compBattleship.includes(currentCellCoord_)) {
				//displays hit on battleship with randomized text
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} the battleship PNS ${havenShipNames.battleship}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// haven CIC text that indicates damage to their battleship when player scores a hit
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the battleship PNS ${havenShipNames.battleship}! ${
							battleTexts.damageOnShip[
								Math.floor(Math.random() * battleTexts.damageOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compDestroyers.includes(currentCellCoord_)) {
				//there are two destroyers to connect names
				//checks that current cell that has hit registered is included in either one of the destroyers' or frigates' co-ordinates and assigns corresponding name to the hit rather than randomly calling the names

				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('compDestroyers') ?? ''
				);
				console.log(destroyer1);

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
						} ${hitsPrecursorString()} the destroyer PNS ${
							destroyer1Coords.includes(currentCellCoord_)
								? havenShipNames.destroyers[0]
								: havenShipNames.destroyers[1]
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// haven CIC text that indicates damage to their destroyer when player scores a hit
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the destroyer PNS ${
							destroyer1Coords.includes(currentCellCoord_)
								? havenShipNames.destroyers[0]
								: havenShipNames.destroyers[1]
						}! ${
							battleTexts.damageOnShip[
								Math.floor(Math.random() * battleTexts.damageOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (compFrigates.includes(currentCellCoord_)) {
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
						} ${hitsPrecursorString()} the frigate PNS ${
							frigate1Coords.includes(currentCellCoord_)
								? havenShipNames.frigates[0]
								: havenShipNames.frigates[1]
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// haven CIC text that indicates damage to their frigate when player scores a hit
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the frigate PNS ${
							frigate1Coords.includes(currentCellCoord_)
								? havenShipNames.frigates[0]
								: havenShipNames.frigates[1]
						}! ${
							battleTexts.damageOnShip[
								Math.floor(Math.random() * battleTexts.damageOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			}
		} else if (hitOrMiss_ === 'miss') {
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
	} else if (towardsCombatant_ === 'player') {
		{
			//display that its computer's turn so the messages are more clearly differentiable
			pipe(addTextToElem(`Computer's turn: `))(battleMessageElem);
			//adds a spacer element to separate the player's turn message from the battle message
			for (let i = 0; i < 2; i += 1) {
				const spacerElem = elemCreator('br')(['spacerElem']);
				pipe(appendElemToParent(battleMessageElem))(spacerElem);
			}
		}

		if (hitOrMiss_ === 'hit') {
			//if computer attacking player registers a hit
			if (currentShipSymbol_ === 'S') {
				//displays hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the superdreadnought RMNS ${
							manticoreShipNames.superdreadnought
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

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
			} else if (currentShipSymbol_ === 'C') {
				//displays hit on carrier with randomized text
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the carrier RMNS ${manticoreShipNames.cruiser}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// player CIC text that indicates damage to their carrier when computer scores a hit
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} the carrier RMNS ${manticoreShipNames.cruiser}! ${
							battleTexts.damageOnShip[
								Math.floor(Math.random() * battleTexts.damageOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (currentShipSymbol_ === 'B') {
				//displays hit on battleship with randomized text
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the battleship RMNS ${
							manticoreShipNames.battleship
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

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
			} else if (currentShipSymbol_ === 'D') {
				//there are two destroyers to connect names
				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('destroyer') ?? ''
				);

				const destroyer1Coords: string[] = [];
				Object.values(destroyer1).forEach((shipPartCoords) => {
					destroyer1Coords.push(shipPartCoords);
				});

				//displays hit on destroyer with randomized text
				//only need to check one destroyer
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the destroyer RMNS ${
							destroyer1Coords.includes(currentCellCoord_)
								? manticoreShipNames.destroyers[0]
								: manticoreShipNames.destroyers[1]
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// player CIC text that indicates damage to their destroyer when computer scores a hit
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} the destroyer RMNS ${
							destroyer1Coords.includes(currentCellCoord_)
								? manticoreShipNames.destroyers[0]
								: manticoreShipNames.destroyers[1]
						}! ${
							battleTexts.damageOnShip[
								Math.floor(Math.random() * battleTexts.damageOnShip.length)
							]
						}`
					)
				)(battleMessageElem);
			} else if (currentShipSymbol_ === 'F') {
				//there are two frigates to connect names
				const [frigate1, _]: Frigate[] = JSON.parse(
					localStorage.getItem('frigate') ?? ''
				);

				const frigate1Coords: string[] = [];
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords);
				});

				//displays hit on frigate with randomized text
				//only need to check one frigate
				pipe(
					addTextToElem(
						`Haven Fleet CIC: ${
							tossCoin() ? `Admiral McQueen!` : ''
						} ${hitsPrecursorString()} the frigate RMNS ${
							frigate1Coords.includes(currentCellCoord_)
								? manticoreShipNames.frigates[0]
								: manticoreShipNames.frigates[1]
						}! ${
							battleTexts.hitsOnShip[
								Math.floor(Math.random() * battleTexts.hitsOnShip.length)
							]
						}`
					)
				)(battleMessageElem);

				for (let i = 0; i < 2; i += 1) {
					const spacerElem = elemCreator('br')(['spacerElem']);
					pipe(appendElemToParent(battleMessageElem))(spacerElem);
				}

				// player CIC text that indicates damage to their frigate when computer scores a hit
				pipe(
					addTextToElem(
						`Tenth Fleet CIC: ${
							tossCoin() ? `Admiral ${playerName}!` : ''
						} ${hitsPrecursorString()} the frigate RMNS ${
							frigate1Coords.includes(currentCellCoord_)
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
		} else if (hitOrMiss_ === 'miss') {
			//computer attacking player misses
			pipe(
				addTextToElem(
					`Haven Fleet CIC: ${tossCoin() ? `Admiral McQueen!` : ''} ${
						battleTexts.missesOnShip[
							Math.floor(Math.random() * battleTexts.missesOnShip.length)
						]
					}`
				)
			)(battleMessageElem);
		}
	}

	const dividerElem = elemCreator('p')(['dividerElem']);
	pipe(
		addTextToElem('_______________________'),
		addStyleToElem([['color', '#00f000']]),
		appendElemToParent(infoScreenWrapper)
	)(dividerElem);
};
export { renderBattleMessageElem };
