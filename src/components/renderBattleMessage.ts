import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import {
	Div,
	RandomizedHavenShipNames,
	RandomizedManticoreShipNames,
	Destroyer,
	Frigate,
} from '../utilities/types'
import { battleTexts } from '../data/battleTexts'

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
	]
	const hitsPrecursorString =
		randHitsStrings[Math.floor(Math.random() * randHitsStrings.length)]

	const havenShipNames: RandomizedHavenShipNames = JSON.parse(
		localStorage.getItem('havenShipNames') ?? ''
	)
	const manticoreShipNames: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? ''
	)

	const playerName = JSON.parse(localStorage.getItem('playerName') ?? '')

	const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper')

	const battleMessageElem = elemCreator('p')(['battleMessageElem'])
	appendElemToParent(infoScreenWrapper)(battleMessageElem)

	if (towardsCombatant_ === 'comp') {
		//checks what compShip currentCellCoord_ is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
		const compSuperdreadnought: string[] = Object.values(
			JSON.parse(localStorage.getItem('compSuperdreadnought') ?? '')
		)
		const compCarrier: string[] = Object.values(
			JSON.parse(localStorage.getItem('compCarrier') ?? '')
		)
		const compBattleship: string[] = Object.values(
			JSON.parse(localStorage.getItem('compBattleship') ?? '')
		)

		//destroyers consists of an array of objects
		let compDestroyers: unknown[] = []
		JSON.parse(localStorage.getItem('compDestroyers') ?? '').forEach(
			(destroyer: Destroyer) => {
				compDestroyers.push(Object.values(destroyer))
			}
		)
		compDestroyers = compDestroyers.flat()

		//frigates consists of an array of objects
		let compFrigates: unknown[] = []
		JSON.parse(localStorage.getItem('compFrigates') ?? '').forEach((frigate: Frigate) => {
			compFrigates.push(Object.values(frigate))
		})
		compFrigates = compFrigates.flat()

		if (hitOrMiss_ === 'hit') {
			//player attacking computer scores a hit
			if (compSuperdreadnought.includes(currentCellCoord_)) {
				//displays hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`${playerName}'s turn: ${hitsPrecursorString} the superdreadnought PNS ${
							havenShipNames.superdreadnought
						}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (compCarrier.includes(currentCellCoord_)) {
				//displays hit on carrier with randomized text
				pipe(
					addTextToElem(
						`${playerName}'s turn: ${hitsPrecursorString} the carrier PNS ${
							havenShipNames.cruiser
						}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (compBattleship.includes(currentCellCoord_)) {
				//displays hit on battleship with randomized text
				pipe(
					addTextToElem(
						`${playerName}'s turn: ${hitsPrecursorString} the battleship PNS ${
							havenShipNames.battleship
						}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (compDestroyers.includes(currentCellCoord_)) {
				//there are two destroyers to connect names
				//checks that current cell that has hit registered is included in either one of the destroyers' or frigates' co-ordinates and assigns corresponding name to the hit rather than randomly calling the names

				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('compDestroyers') ?? ''
				)
				console.log(destroyer1)

				const destroyer1Coords: string[] = []
				Object.values(destroyer1).forEach((shipPartCoords) => {
					destroyer1Coords.push(shipPartCoords)
				})

				//displays hit on destroyer with randomized text
				//only need to check one destroyer
				pipe(
					addTextToElem(
						`${playerName}'s turn: ${hitsPrecursorString} the destroyer PNS ${
							destroyer1Coords.includes(currentCellCoord_)
								? havenShipNames.destroyers[0]
								: havenShipNames.destroyers[1]
						}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (compFrigates.includes(currentCellCoord_)) {
				//there are two frigates to connect names
				const [frigate1, _]: Frigate[] = JSON.parse(
					localStorage.getItem('compFrigates') ?? ''
				)

				const frigate1Coords: string[] = []
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords)
				})

				//displays hit on frigate with randomized text
				//only need to check one frigate
				pipe(
					addTextToElem(
						`${playerName}'s turn: ${hitsPrecursorString} the frigate PNS ${
							frigate1Coords.includes(currentCellCoord_)
								? havenShipNames.frigates[0]
								: havenShipNames.frigates[1]
						}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			}
		} else if (hitOrMiss_ === 'miss') {
			//player attacking computer misses
			pipe(
				addTextToElem(
					`${playerName}'s turn: ${
						battleTexts.missesByPlayer[
							Math.floor(Math.random() * battleTexts.missesByPlayer.length)
						]
					}`
				)
			)(battleMessageElem)
		}
	} else if (towardsCombatant_ === 'player') {
		if (hitOrMiss_ === 'hit') {
			//if computer attacking player registers a hit
			if (currentShipSymbol_ === 'S') {
				//displays hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`Haven's turn: ${hitsPrecursorString} the superdreadnought RMNS ${
							manticoreShipNames.superdreadnought
						}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'C') {
				//displays hit on carrier with randomized text
				pipe(
					addTextToElem(
						`Haven's turn: ${hitsPrecursorString} the carrier RMNS ${
							manticoreShipNames.cruiser
						}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'B') {
				//displays hit on battleship with randomized text
				pipe(
					addTextToElem(
						`Haven's turn: ${hitsPrecursorString} the battleship RMNS ${
							manticoreShipNames.battleship
						}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'D') {
				//there are two destroyers to connect names
				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('destroyer') ?? ''
				)

				const destroyer1Coords: string[] = []
				Object.values(destroyer1).forEach((shipPartCoords) => {
					destroyer1Coords.push(shipPartCoords)
				})

				//displays hit on destroyer with randomized text
				//only need to check one destroyer
				pipe(
					addTextToElem(
						`Haven's turn: ${hitsPrecursorString} the destroyer RMNS ${
							destroyer1Coords.includes(currentCellCoord_)
								? manticoreShipNames.destroyers[0]
								: manticoreShipNames.destroyers[1]
						}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'F') {
				//there are two frigates to connect names
				const [frigate1, _]: Frigate[] = JSON.parse(localStorage.getItem('frigate') ?? '')

				const frigate1Coords: string[] = []
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords)
				})

				//displays hit on frigate with randomized text
				//only need to check one frigate
				pipe(
					addTextToElem(
						`Haven's turn: ${hitsPrecursorString} the frigate RMNS ${
							frigate1Coords.includes(currentCellCoord_)
								? manticoreShipNames.frigates[0]
								: manticoreShipNames.frigates[1]
						}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			}
		} else if (hitOrMiss_ === 'miss') {
			//computer attacking player misses
			pipe(
				addTextToElem(
					`Haven's turn: ${
						battleTexts.missesByComp[
							Math.floor(Math.random() * battleTexts.missesByComp.length)
						]
					}`
				)
			)(battleMessageElem)
		}
	}
}
export { renderBattleMessageElem }
