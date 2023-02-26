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
} from '../utilities/elementCreators';

const renderShipSelectionBttns = function () {
	const log = (i: unknown) => console.log('\n', i, '\n');

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

	//axis selector button
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
