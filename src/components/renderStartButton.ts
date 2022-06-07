import { handleStartButtonClick } from '../events/handleStartButtonClick'
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

const renderStartButton = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	//remove the ship selection buttons
	const shipsBttnContainer: Div = document.querySelector('.shipsBttn-container')
	shipsBttnContainer?.remove()

	const shipBttnsWrapper: Div = document.querySelector('.shipBttns-wrapper')

	pipe(
		addTextToElem('Start Game'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'start'],
		]),
		addEvtListener('click')(handleStartButtonClick),
		appendElemToParent(shipBttnsWrapper)
	)(elemCreator('button')(['bttn', 'bttn-startGame']))
}
export { renderStartButton }
