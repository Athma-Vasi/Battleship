import { Button, Div, NodesDiv } from '../utilities/types'
import {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	addStyleToElem,
	pipe,
	removeEvtListener,
} from '../utilities/elementCreators'
import { handleDestroyerCellClick } from './handleDestroyerCellClick'
import { handleDestroyerMouseEnter } from './handleDestroyerMouseEnter'
import { handleDestroyerMouseLeave } from './handleDestroyerMouseLeave'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'

const handleDestroyerBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//assign event listeners to each player game cell after clicking destroyer button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleDestroyerCellClick),
			addEvtListener('mouseenter')(handleDestroyerMouseEnter),
			addEvtListener('mouseleave')(handleDestroyerMouseLeave)
		)(player)
	)

	//disable destroyer bttn after one click
	this.disabled = true

	//disable clicking on other shipButtons while selected
	//prevents double selection
	const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
	if (superdreadnoughtBttn)
		pipe(removeEvtListener('click')(handleSuperdreadnoughtBttnClick))(
			superdreadnoughtBttn
		)

	const carrierBttn: Button = document.querySelector('.bttn-carrier')
	if (carrierBttn) pipe(removeEvtListener('click')(handleCarrierBttnClick))(carrierBttn)

	const battleshipBttn: Button = document.querySelector('.bttn-battleship')
	if (battleshipBttn)
		pipe(removeEvtListener('click')(handleBattleshipBttnClick))(battleshipBttn)

	const frigateBttn: Button = document.querySelector('.bttn-frigate')
	if (frigateBttn) pipe(removeEvtListener('click')(handleFrigateBttnClick))(frigateBttn)

	// //disable button after two destroyers on board
	// if (localStorage.getItem('isDoubleDestroyer')) {
	// 	if (JSON.parse(localStorage.getItem('isDoubleDestroyer') ?? '') === false) {
	// 		this.disabled = true
	// 	}
	// }
}
export { handleDestroyerBttnClick }
