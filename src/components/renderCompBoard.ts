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

	const compBoardWrapper: Div = document.querySelector('.compBoard-wrapper')

	const compBoardContainer = elemCreator('div')(['compBoard-container'])
	appendElemToParent(compBoardWrapper)(compBoardContainer)

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			pipe(
				addAttributeToElem([['data-cellComp', `${j},${i}`]]),
				appendElemToParent(compBoardContainer)
			)(elemCreator('div')(['comp-gameCell']))
		}
	}
}
export { renderCompBoard }
