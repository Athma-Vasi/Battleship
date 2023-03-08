import { handleStartButtonClick } from '../events/handleStartButtonClick';
import {
	addAttributeToElem,
	addEvtListener,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../functions/elementCreators';
import { Button, Div } from '../functions/types';

const renderStartButton = function (): void {
	// removes the ship selection buttons
	const shipsBttnContainer: Div = document.querySelector('.shipsBttn-container');
	shipsBttnContainer?.remove();
	// removes axis selection button
	const axisSelectorBttn: Button = document.querySelector('.bttn-axisSelector');
	axisSelectorBttn?.remove();

	const shipBttnsWrapper: Div = document.querySelector('.shipBttns-wrapper');

	// renders start game button
	pipe(
		addTextToElem('Engage!'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'start'],
		]),
		addEvtListener('click')(handleStartButtonClick),
		appendElemToParent(shipBttnsWrapper)
	)(elemCreator('button')(['bttn', 'bttn-startGame']));
};
export { renderStartButton };