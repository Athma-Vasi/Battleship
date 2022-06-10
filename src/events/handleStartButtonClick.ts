import { addEvtListener } from '../utilities/elementCreators'
import {
	NodesDiv,
	HavenShipNames,
	ManticoreShipNames,
	ShipNames,
	BattleTexts,
} from '../utilities/types'
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips'
import { shipNames } from '../data/shipNames'
import { battleTexts } from '../data/battleTexts'

const handleStartButtonClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	if (!localStorage.getItem('isGameRunning')) {
		localStorage.setItem('isGameRunning', JSON.stringify(true))
	}

	const compShipPresentCells: NodesDiv = document.querySelectorAll('.compShipPresent')

	const compShipNotPresentCells: NodesDiv =
		document.querySelectorAll('.compShipNotPresent')

	//add evt listeners to comp game cells
	compShipPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompShips)(cell)
	)

	compShipNotPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompMisses)(cell)
	)

	//randomize and store ship names for each battle
	const shipNames_: ShipNames = shipNames
	if (!localStorage.getItem('playerShipNames')) {
		localStorage.setItem('playerShipNames', JSON.stringify([]))
	}

	//creates a randomized ship name per game session
	Object.entries(shipNames_).forEach(([polity, shipTypes]) => {
		if (polity === 'haven') {
			const havenShipNames = new Map()

			Object.entries(shipTypes).forEach(([shipType, shipNamesArr]) => {
				//need two names for destroyers and frigates
				if (shipType === 'destroyers' || shipType === 'frigates') {
					const tempShipNamesArr = [
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
					]

					havenShipNames.set(shipType, tempShipNamesArr)
				} else {
					//only one name for superdreadnought, cruiser and battleship
					havenShipNames.set(
						shipType,
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]
					)
				}
			})

			localStorage.setItem(
				'havenShipNames',
				JSON.stringify(Object.fromEntries(havenShipNames))
			)
		} else if (polity === 'manticore') {
			const manticoreShipNames = new Map()

			Object.entries(shipTypes).forEach(([shipType, shipNamesArr]) => {
				//need two names for destroyers and frigates
				if (shipType === 'destroyers' || shipType === 'frigates') {
					const tempShipNamesArr = [
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
					]

					manticoreShipNames.set(shipType, tempShipNamesArr)
				} else {
					//only one name for superdreadnought, cruiser and battleship
					manticoreShipNames.set(
						shipType,
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]
					)
				}
			})

			localStorage.setItem(
				'manticoreShipNames',
				JSON.stringify(Object.fromEntries(manticoreShipNames))
			)
		}
	})
}

export { handleStartButtonClick }
// //creates a randomized hitmessage
// const battleTexts_ = battleTexts
// if (!localStorage.getItem('battleTexts')) {
// 	localStorage.setItem('battleTexts', JSON.stringify([]))
// }

// const hitMessages = new Map()
// Object.entries(battleTexts_).forEach(([hitType, hitMessagesArr]) => {
// 	hitMessages.set(
// 		hitType,
// 		hitMessagesArr[Math.floor(Math.random() * hitMessagesArr.length)]
// 	)

// 	localStorage.setItem('hitMessages', JSON.stringify(Object.fromEntries(hitMessages)))
// })
