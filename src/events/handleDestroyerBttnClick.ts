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
import { handleDestroyerCellClick } from './handleDestroyerCellClick'

const handleDestroyerBttnClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoard: Div = document.querySelector('.playerBoard-container')
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const bttnValue = this.value

	//assign event listeners to each player game cell after clicking destroyer button
	playerGameCells.forEach((player) =>
		addEvtListener('click')(handleDestroyerCellClick)(player)
	)

	//disable button after two destroyers on board
	if (localStorage.getItem('isDoubleDestroyer')) {
		if (JSON.parse(localStorage.getItem('isDoubleDestroyer') ?? '') === false) {
			this.disabled = true
		}
	}
}
export { handleDestroyerBttnClick }
