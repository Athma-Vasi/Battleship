import {
	addAttributeToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import { Div } from '../utilities/types'

const renderCompBoard = function () {
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
