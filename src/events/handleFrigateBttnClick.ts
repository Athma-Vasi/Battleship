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
import { handleFrigateCellClick } from './handleFrigateCellClick'
import { handleFrigateMouseEnter } from './handleFrigateMouseEnter'
import { handleFrigateMouseLeave } from './handleFrigateMouseLeave'

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

	//disable button after two frigates on board
	if (localStorage.getItem('isDoubleFrigate')) {
		if (JSON.parse(localStorage.getItem('isDoubleFrigate') ?? '') === false) {
			this.disabled = true
		}
	}
}
export { handleFrigateBttnClick }
