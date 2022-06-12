import { Div } from '../utilities/types'
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

const renderCompBoard = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const main: HTMLElement | null = document.querySelector('.main')

	const bothBoardsContainer: Div = document.querySelector('.bothBoards-container')

	const compBoardWrapper = elemCreator('div')(['compBoard-wrapper'])
	appendElemToParent(bothBoardsContainer)(compBoardWrapper)

	const compBoardContainer = elemCreator('div')(['compBoard-container'])
	appendElemToParent(compBoardWrapper)(compBoardContainer)

	for (let i = 0; i < 10; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			pipe(
				addAttributeToElem([['data-cellcomp', `${j},${i}`]]),
				appendElemToParent(compBoardContainer)
			)(elemCreator('div')(['comp-gameCell']))
		}
	}
}
export { renderCompBoard }
