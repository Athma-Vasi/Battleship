import { handleAxisToggleClick } from '../events/handleAxisToggleClick';
import { handleBattleshipBttnClick } from '../events/handleBattleshipBttnClick';
import { handleCarrierBttnClick } from '../events/handleCarrierBttnClick';
import { handleDestroyerBttnClick } from '../events/handleDestroyerBttnClick';
import { handleFrigateBttnClick } from '../events/handleFrigateBttnClick';
import { handleSuperdreadnoughtBttnClick } from '../events/handleSuperdreadnoughtBttnClick';
import {
	addAttributeToElem,
	addEvtListener,
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../functions/elementCreators';

/**
 * Renders the ship selection buttons to the DOM and adds event listeners to each button in the ship selection section
 *
 * @function
 * @returns {void}
 */
const renderShipSelectionBttns = function (): void {
	const main: HTMLElement | null = document.querySelector('.main');

	const shipBttnsWrapper = elemCreator('div')(['shipBttns-wrapper']);
	appendElemToParent(main)(shipBttnsWrapper);

	const shipsBttnContainer = elemCreator('div')(['shipsBttn-container']);
	appendElemToParent(shipBttnsWrapper)(shipsBttnContainer);

	pipe(
		addTextToElem('Superdreadnought'),
		addEvtListener('click')(handleSuperdreadnoughtBttnClick),
		addAttributeToElem([
			['type', 'button'],
			['value', 'superdreadnought'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-superdreadnought']));

	pipe(
		addTextToElem('Carrier'),
		addEvtListener('click')(handleCarrierBttnClick),
		addAttributeToElem([
			['type', 'button'],
			['value', 'carrier'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-carrier']));

	pipe(
		addTextToElem('Battleship'),
		addEvtListener('click')(handleBattleshipBttnClick),
		addAttributeToElem([
			['type', 'button'],
			['value', 'battleship'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-battleship']));

	pipe(
		addTextToElem('Destroyer'),
		addEvtListener('click')(handleDestroyerBttnClick),
		addAttributeToElem([
			['type', 'button'],
			['value', 'destroyer'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-destroyer']));

	pipe(
		addTextToElem('Frigate'),
		addEvtListener('click')(handleFrigateBttnClick),
		addAttributeToElem([
			['type', 'button'],
			['value', 'frigate'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-frigate']));

	// axis selector button
	pipe(
		addEvtListener('click')(handleAxisToggleClick),
		addTextToElem('Axis-X'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'axis-x'],
		]),
		appendElemToParent(shipBttnsWrapper)
	)(elemCreator('button')(['bttn', 'bttn-axisSelector']));
};
export { renderShipSelectionBttns };
