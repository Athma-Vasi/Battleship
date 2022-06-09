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
import { handleCarrierCellClick } from './handleCarrierCellClick'
import { handleCarrierMouseEnter } from './handleCarrierMouseEnter'
import { handleCarrierMouseLeave } from './handleCarrierMouseLeave'

const handleCarrierBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//assign event listener to each player game cell after clicking superdreadnought button
	playerGameCells.forEach((player) =>
		pipe(
			addEvtListener('click')(handleCarrierCellClick),
			addEvtListener('mouseenter')(handleCarrierMouseEnter),
			addEvtListener('mouseleave')(handleCarrierMouseLeave)
		)(player)
	)

	this.disabled = true
}
export { handleCarrierBttnClick }
