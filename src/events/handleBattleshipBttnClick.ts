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

import { handleBattleshipCellClick } from './handleBattleshipCellClick'
import { handleBattleshipMouseEnter } from './handleBattleshipMouseEnter'
import { handleBattleshipMouseLeave } from './handleBattleshipMouseLeave'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'

const handleBattleshipBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//disable this button after clicking
	this.disabled = true

	//visually indicate that 'this' button is selected
	pipe(
		addStyleToElem([
			['border', '1px solid #f0a400'],
			['color', '#f0a400'],
		])
	)(this)

	//disable clicking on other shipButtons while selected
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

	const frigateBttn: Button = document.querySelector('.bttn-frigate')
	if (frigateBttn)
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			]),
			removeEvtListener('click')(handleFrigateBttnClick)
		)(frigateBttn)

	//assign event listeners to each player game cell after clicking battleship button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleBattleshipCellClick),
			addEvtListener('mouseenter')(handleBattleshipMouseEnter),
			addEvtListener('mouseleave')(handleBattleshipMouseLeave)
		)(player)
	)
}
export { handleBattleshipBttnClick }