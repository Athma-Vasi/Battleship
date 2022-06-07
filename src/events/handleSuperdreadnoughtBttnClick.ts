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

const handleSuperdreadnoughtBttnClick = function (
	this: HTMLButtonElement,
	ev: MouseEvent
) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//assign event listener to each player game cell after clicking superdreadnought button
	playerGameCells.forEach((player) =>
		addEvtListener('click')(handleSuperdreadnoughtCellClick)(player)
	)
}
export { handleSuperdreadnoughtBttnClick }
