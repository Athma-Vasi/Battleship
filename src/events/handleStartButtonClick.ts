import { addEvtListener } from '../utilities/elementCreators'
import { NodesDiv, BattleTexts } from '../utilities/types'
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips'
import { shipNames } from '../data/shipNames'
import { battleTexts } from '../data/battleTexts'
import { randomizeAndStoreShipNames } from '../components/randomizeAndStoreShipNames'
import { renderCompBoard } from '../components/renderCompBoard'
import { placeCompShipsOnBoard } from '../components/placeCompShipsOnBoard'
import { compShipsPlacementChoicesArr } from '../data/compShipsPlacementChoicesArr'

const handleStartButtonClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	//remove the info screen
	const infoScreenContainer = document.querySelector('.infoScreen-container')
	infoScreenContainer?.remove()

	//remove the ship bttns wrapper
	const shipBttnsWrapper = document.querySelector('.shipBttns-wrapper')
	shipBttnsWrapper?.remove()

	//remove the start button
	this.remove()

	//render comp board and place the ships
	renderCompBoard()
	placeCompShipsOnBoard(compShipsPlacementChoicesArr)

	//randomize and store ship names for each battle
	randomizeAndStoreShipNames(shipNames)

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
