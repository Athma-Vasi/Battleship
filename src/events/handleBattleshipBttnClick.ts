import { Div, NodesDiv } from '../utilities/types'
import {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	addStyleToElem,
	pipe,
} from '../utilities/elementCreators'

import { handleBattleshipCellClick } from './handleBattleshipCellClick'
import { handleBattleshipMouseEnter } from './handleBattleshipMouseEnter'
import { handleBattleshipMouseLeave } from './handleBattleshipMouseLeave'

const handleBattleshipBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//assign event listeners to each player game cell after clicking battleship button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleBattleshipCellClick),
			addEvtListener('mouseenter')(handleBattleshipMouseEnter),
			addEvtListener('mouseleave')(handleBattleshipMouseLeave)
		)(player)
	)

	this.disabled = true
}
export { handleBattleshipBttnClick }
