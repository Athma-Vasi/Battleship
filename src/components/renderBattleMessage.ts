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
} from '../utilities/types'
import { battleTexts } from '../data/battleTexts'

const renderBattleMessageElem = function (
	currentCellCoord_: string,
	currentShipSymbol_: string,
	towardsCombatant_: string,
	hitOrMiss_: string
) {
	const randPlayerHitCompStrings = [
		'A hit on',
		"We've hit",
		'Shields weak on',
		'Hull integrity is weakening on',
	]
	const playerHitCompPrecursorString =
		randPlayerHitCompStrings[Math.floor(Math.random() * randPlayerHitCompStrings.length)]

	const randPlayerMissCompStrings = ['']

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
		if (hitOrMiss_ === 'hit') {
			//player attacking computer scores a hit
			if (currentShipSymbol_ === 'S') {
				//display hit on superdreadnought with randomized text
				pipe(
					addTextToElem(
						`${playerHitCompPrecursorString} PNS ${havenShipNames.superdreadnought}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'C') {
				//display hit on carrier with randomized text
				pipe(
					addTextToElem(
						`${playerHitCompPrecursorString} PNS ${havenShipNames.cruiser}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'B') {
				//display hit on battleship with randomized text
				pipe(
					addTextToElem(
						`${playerHitCompPrecursorString} PNS ${havenShipNames.battleship}! ${
							battleTexts.hitsOnComp[
								Math.floor(Math.random() * battleTexts.hitsOnComp.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'D') {
				//because there are two destroyers to connect names
				//checking that current cell that has hit registered is included in either one of the destroyers' co-ordinates and assigning corresponding name to the hit rather than randomly calling the names

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
						`${playerHitCompPrecursorString} PNS ${
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
			} else if (currentShipSymbol_ === 'F') {
				//because there are two frigates to connect names
				//checking that current cell that has hit registered is included in either one of the frigates' co-ordinates and assigning corresponding name to the hit rather than randomly calling the names

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
						`${playerHitCompPrecursorString} PNS ${
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
						`${playerHitCompPrecursorString} RMNS ${
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
						`${playerHitCompPrecursorString} RMNS ${manticoreShipNames.cruiser}! ${
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
						`${playerHitCompPrecursorString} RMNS ${manticoreShipNames.battleship}! ${
							battleTexts.hitsOnPlayer[
								Math.floor(Math.random() * battleTexts.hitsOnPlayer.length)
							]
						}`
					)
				)(battleMessageElem)
			} else if (currentShipSymbol_ === 'D') {
				//because there are two destroyers to connect names
				//checking that current cell that has hit registered is included in either one of the destroyers' co-ordinates and assigning corresponding name to the hit rather than randomly calling the names

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
						`${playerHitCompPrecursorString} RMNS ${
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
				//checking that current cell that has hit registered is included in either one of the frigates' co-ordinates and assigning corresponding name to the hit rather than randomly calling the names

				const [frigate1, _]: Frigate[] = JSON.parse(localStorage.getItem('frigate') ?? '')

				const frigate1Coords: string[] = []
				Object.values(frigate1).forEach((shipPartCoords) => {
					frigate1Coords.push(shipPartCoords)
				})

				//display hit on frigate with randomized text
				//only need to check one frigate
				pipe(
					addTextToElem(
						`${playerHitCompPrecursorString} RMNS ${
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
