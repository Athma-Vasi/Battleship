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
import { handleSuperdreadnoughtCellClick } from './handleSuperdreadnoughtCellClick'
import { handleSuperdreadnoughtMouseEnter } from './handleSuperdreadnoughtMouseEnter'
import { handleSuperdreadnoughtMouseLeave } from './handleSuperdreadnoughtMouseLeave'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'

const handleSuperdreadnoughtBttnClick = function (
	this: HTMLButtonElement,
	ev: MouseEvent
) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	this.disabled = true

	//disable clicking on other shipButtons while selected
	//prevents double selection
	const carrierBttn: Button = document.querySelector('.bttn-carrier')
	if (carrierBttn) pipe(removeEvtListener('click')(handleCarrierBttnClick))(carrierBttn)

	const battleshipBttn: Button = document.querySelector('.bttn-battleship')
	if (battleshipBttn)
		pipe(removeEvtListener('click')(handleBattleshipBttnClick))(battleshipBttn)

	const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
	if (destroyerBttn)
		pipe(removeEvtListener('click')(handleDestroyerBttnClick))(destroyerBttn)

	const frigateBttn: Button = document.querySelector('.bttn-frigate')
	if (frigateBttn) pipe(removeEvtListener('click')(handleFrigateBttnClick))(frigateBttn)

	//assign event listeners to each player game cell after clicking superdreadnought button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleSuperdreadnoughtCellClick),
			addEvtListener('mouseenter')(handleSuperdreadnoughtMouseEnter),
			addEvtListener('mouseleave')(handleSuperdreadnoughtMouseLeave)
		)(player)
	)
}
export { handleSuperdreadnoughtBttnClick }
