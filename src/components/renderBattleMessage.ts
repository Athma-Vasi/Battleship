import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import {
	Div,
	BattleTexts,
	RandomizedHavenShipNames,
	RandomizedManticoreShipNames,
	Destroyer,
	Frigate,
	Superdreadnought,
	Carrier,
	Battleship,
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
		'Lost communication with',
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

	const infoScreenWrapper: Div = document.querySelector('.infoScreen-wrapper')
	const battleMessageElem = elemCreator('p')(['battleMessageElem'])
	appendElemToParent(infoScreenWrapper)(battleMessageElem)

	if (towardsCombatant_ === 'comp') {
		//in order to check what compShip currentCellCoord_ is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
		const compSuperdreadnought: string[] = Object.values(
			JSON.parse(localStorage.getItem('compSuperdreadnought') ?? '')
		)
		const compCarrier: string[] = Object.values(
			JSON.parse(localStorage.getItem('compCarrier') ?? '')
		)
		const compBattleship: string[] = Object.values(
			JSON.parse(localStorage.getItem('compBattleship') ?? '')
		)
		//because the destroyers and frigates consist of an array of objects
		const compDestroyers: string[] = []
		JSON.parse(localStorage.getItem('compDestroyers') ?? '').forEach(
			(destroyer: Destroyer) =>
				Object.values((coord: string) => {
					compDestroyers.push(coord)
				})
		)
		const compFrigates: string[] = []
		JSON.parse(localStorage.getItem('compFrigates') ?? '').forEach((frigate: Frigate) =>
			Object.values((coord: string) => {
				compFrigates.push(coord)
			})
		)

		if (hitOrMiss_ === 'hit') {
			//player attacking computer scores a hit
			if (compSuperdreadnought.includes(currentCellCoord_)) {
				//display hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the superdreadnought PNS ${
							havenShipNames.superdreadnought
						}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (compCarrier.includes(currentCellCoord_)) {
				//display hit on carrier with randomized text
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the carrier PNS ${havenShipNames.cruiser}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (compBattleship.includes(currentCellCoord_)) {
				//display hit on battleship with randomized text
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the battleship PNS ${havenShipNames.battleship}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (compDestroyers.includes(currentCellCoord_)) {
				//because there are two destroyers to connect names
				//checking that current cell that has hit registered is included in either one of the destroyers' or frigates' co-ordinates and assigning corresponding name to the hit rather than randomly calling the names

				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('compDestroyers') ?? ''
				)

				const destroyer1Coords: string[] = []
				Object.values(destroyer1).forEach((shipPartCoords) => {
					destroyer1Coords.push(shipPartCoords)
				})

				//display hit on destroyer with randomized text
				//only need to check one destroyer
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the destroyer PNS ${
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
				//because there are two frigates to connect names
				const [frigate1, _]: Frigate[] = JSON.parse(
					localStorage.getItem('compFrigates') ?? ''
				)

				const frigate1Coords: string[] = []
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords)
				})

				//display hit on frigate with randomized text
				//only need to check one frigate
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the frigate PNS ${
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
					`${
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
				//display hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the superdreadnought RMNS ${
							manticoreShipNames.superdreadnought
						}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'C') {
				//display hit on carrier with randomized text
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the carrier RMNS ${manticoreShipNames.cruiser}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'B') {
				//display hit on battleship with randomized text
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the battleship RMNS ${
							manticoreShipNames.battleship
						}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'D') {
				//because there are two destroyers to connect names
				const [destroyer1, _]: Destroyer[] = JSON.parse(
					localStorage.getItem('destroyer') ?? ''
				)

				const destroyer1Coords: string[] = []
				Object.values(destroyer1).forEach((shipPartCoords) => {
					destroyer1Coords.push(shipPartCoords)
				})

				//display hit on destroyer with randomized text
				//only need to check one destroyer
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the destroyer RMNS ${
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
				//because there are two frigates to connect names
				const [frigate1, _]: Frigate[] = JSON.parse(localStorage.getItem('frigate') ?? '')

				const frigate1Coords: string[] = []
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords)
				})

				//display hit on frigate with randomized text
				//only need to check one frigate
				pipe(
					addTextToElem(
						`${hitsPrecursorString} the frigate RMNS ${
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
					`${
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
