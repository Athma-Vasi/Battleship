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
import { handleCarrierCellClick } from './handleCarrierCellClick'
import { handleCarrierMouseEnter } from './handleCarrierMouseEnter'
import { handleCarrierMouseLeave } from './handleCarrierMouseLeave'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'

const handleCarrierBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	this.disabled = true

	//disable clicking on other shipButtons while selected
	//prevents double selection
	const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
	if (superdreadnoughtBttn)
		pipe(removeEvtListener('click')(handleSuperdreadnoughtBttnClick))(
			superdreadnoughtBttn
		)

	const battleshipBttn: Button = document.querySelector('.bttn-battleship')
	if (battleshipBttn)
		pipe(removeEvtListener('click')(handleBattleshipBttnClick))(battleshipBttn)

	const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
	if (destroyerBttn)
		pipe(removeEvtListener('click')(handleDestroyerBttnClick))(destroyerBttn)

	const frigateBttn: Button = document.querySelector('.bttn-frigate')
	if (frigateBttn) pipe(removeEvtListener('click')(handleFrigateBttnClick))(frigateBttn)

	//assign event listener to each player game cell after clicking superdreadnought button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleCarrierCellClick),
			addEvtListener('mouseenter')(handleCarrierMouseEnter),
			addEvtListener('mouseleave')(handleCarrierMouseLeave)
		)(player)
	)
}
export { handleCarrierBttnClick }
