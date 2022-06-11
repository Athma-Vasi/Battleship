import { Button, Div, NodesBttn, NodesDiv } from '../utilities/types'
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
import { handleFrigateCellClick } from './handleFrigateCellClick'
import { handleFrigateMouseEnter } from './handleFrigateMouseEnter'
import { handleFrigateMouseLeave } from './handleFrigateMouseLeave'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'

const handleFrigateBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//assign event listeners to each player game cell after clicking destroyer button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleFrigateCellClick),
			addEvtListener('mouseenter')(handleFrigateMouseEnter),
			addEvtListener('mouseleave')(handleFrigateMouseLeave)
		)(player)
	)

	//disable frigate button after one click
	this.disabled = true

	//disable events on other shipButtons while selected
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

	const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
	if (destroyerBttn)
		pipe(removeEvtListener('click')(handleDestroyerBttnClick))(destroyerBttn)

	// const shipButtons: NodesBttn = document.querySelectorAll(
	// 	'.bttn-superdreadnought .bttn-cruiser .bttn-battleship .bttn-destroyer'
	// )
	// shipButtons.forEach((bttn) => (bttn.disabled = true))

	// //disable button after two frigates on board
	// if (localStorage.getItem('isDoubleFrigate')) {
	// 	if (JSON.parse(localStorage.getItem('isDoubleFrigate') ?? '') === false) {
	// 		this.disabled = true
	// 	}
	// }
}
export { handleFrigateBttnClick }
