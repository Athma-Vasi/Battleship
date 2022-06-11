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

const handleBattleshipMouseLeave = function (this: HTMLDivElement, ev: MouseEvent) {
	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//change consecutive cells in corresponding axes on hover
	if (currentAxis === 'Axis-X') {
		for (let i = 0; i < 3; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)

			//to avoid changing cells of ships already present
			if (!nextCell?.classList.contains('playerShipPresent')) {
				if (nextCell) nextCell.textContent = ''
				pipe(addStyleToElem([['color', 'gainsboro']]))(nextCell)
			}
		}
	} else if (currentAxis === 'Axis-Y') {
		for (let i = 0; i < 3; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)

			//to avoid changing cells of ships already present
			if (!nextCell?.classList.contains('playerShipPresent')) {
				if (nextCell) nextCell.textContent = ''
				pipe(addStyleToElem([['color', 'gainsboro']]))(nextCell)
			}
		}
	}
}
export { handleBattleshipMouseLeave }
