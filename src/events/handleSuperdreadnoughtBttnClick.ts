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
import { handleSuperdreadnoughtCellClick } from './handleSuperdreadnoughtCellClick'
import { handleSuperdreadnoughtMouseEnter } from './handleSuperdreadnoughtMouseEnter'
import { handleSuperdreadnoughtMouseLeave } from './handleSuperdreadnoughtMouseLeave'

const handleSuperdreadnoughtBttnClick = function (
	this: HTMLButtonElement,
	ev: MouseEvent
) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//assign event listeners to each player game cell after clicking superdreadnought button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleSuperdreadnoughtCellClick),
			addEvtListener('mouseenter')(handleSuperdreadnoughtMouseEnter),
			addEvtListener('mouseleave')(handleSuperdreadnoughtMouseLeave)
		)(player)
	)

	this.disabled = true
}
export { handleSuperdreadnoughtBttnClick }
