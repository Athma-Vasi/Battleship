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

const handleSuperdreadnoughtMouseEnter = function (this: HTMLDivElement, ev: MouseEvent) {
	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//change consecutive cells in corresponding axes on hover
	if (currentAxis === 'Axis-X') {
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)

			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)
		}
	} else if (currentAxis === 'Axis-Y') {
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)

			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)
		}
	}
}
export { handleSuperdreadnoughtMouseEnter }