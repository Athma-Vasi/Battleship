import { Button, Div, NodesDiv } from '../utilities/types'
import {
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
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	//disables this button after clicking
	this.disabled = true

	//visually indicates that 'this' button is selected
	pipe(
		addStyleToElem([
			['border', '1px solid #f0a400'],
			['color', '#f0a400'],
		])
	)(this)

	//disables events on other shipButtons while selected
	//prevents double selection
	const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
	if (superdreadnoughtBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleSuperdreadnoughtBttnClick)
		)(superdreadnoughtBttn)

	const carrierBttn: Button = document.querySelector('.bttn-carrier')
	if (carrierBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleCarrierBttnClick)
		)(carrierBttn)

	const battleshipBttn: Button = document.querySelector('.bttn-battleship')
	if (battleshipBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleBattleshipBttnClick)
		)(battleshipBttn)

	const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
	if (destroyerBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleDestroyerBttnClick)
		)(destroyerBttn)

	//assigns event listeners to each player game cell after clicking destroyer button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleFrigateCellClick),
			addEvtListener('mouseenter')(handleFrigateMouseEnter),
			addEvtListener('mouseleave')(handleFrigateMouseLeave)
		)(player)
	)
}
export { handleFrigateBttnClick }
