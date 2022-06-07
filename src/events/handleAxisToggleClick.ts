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

const handleAxisToggleClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')
	const currentText = this.textContent

	if (currentText === 'Axis-X') {
		this.textContent = ''
		this.textContent = 'Axis-Y'
	} else if (currentText === 'Axis-Y') {
		this.textContent = ''
		this.textContent = 'Axis-X'
	}
}
export { handleAxisToggleClick }
