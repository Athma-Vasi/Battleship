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
import { Div } from '../utilities/types'

const renderPlayerBoard = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerBoardWrapper: Div = document.querySelector('.playerBoard-wrapper')

	const playerBoardContainer = elemCreator('div')(['playerBoard-container'])
	appendElemToParent(playerBoardWrapper)(playerBoardContainer)

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			pipe(
				addAttributeToElem([['data-cell', `${i},${j}`]]),
				appendElemToParent(playerBoardContainer)
			)(elemCreator('div')(['player-gameCell']))
		}
	}
}
export { renderPlayerBoard }
