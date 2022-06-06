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

const renderShipSelectionBttns = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const shipBttnsWrapper: Div = document.querySelector('.shipBttns-wrapper')

	const shipsBttnContainer = elemCreator('div')(['shipsBttn-container'])
	appendElemToParent(shipBttnsWrapper)(shipsBttnContainer)

	pipe(
		addTextToElem('Superdreadnought'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'superdreadnought'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-superdreadnought']))

	pipe(
		addTextToElem('Dreadnought'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'dreadnought'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-Dreadnought']))

	pipe(
		addTextToElem('Battleship'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'battleship'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-battleship']))

	pipe(
		addTextToElem('Cruiser'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'cruiser'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-cruiser']))

	pipe(
		addTextToElem('Frigate'),
		addAttributeToElem([
			['type', 'button'],
			['value', 'frigate'],
		]),
		appendElemToParent(shipsBttnContainer)
	)(elemCreator('button')(['bttn-frigate']))
}
export { renderShipSelectionBttns }
