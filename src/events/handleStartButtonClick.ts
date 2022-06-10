import { addEvtListener } from '../utilities/elementCreators'
import { NodesDiv, BattleTexts } from '../utilities/types'
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips'
import { shipNames } from '../data/shipNames'
import { battleTexts } from '../data/battleTexts'
import { randomizeAndStoreShipNames } from '../components/randomizeAndStoreShipNames'

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
	randomizeAndStoreShipNames(shipNames)

	//remove the info screen
	const infoScreenContainer = document.querySelector('.infoScreen-container')
	infoScreenContainer?.remove()

	//remove the start button
	this.remove()
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
