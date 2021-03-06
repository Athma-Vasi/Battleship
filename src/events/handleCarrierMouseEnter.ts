import { addStyleToElem, addTextToElem, pipe } from '../utilities/elementCreators'
import { Div } from '../utilities/types'

const handleCarrierMouseEnter = function (this: HTMLDivElement, ev: MouseEvent) {
	//grabs the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//changes consecutive cells in corresponding axes on hover
	if (currentAxis === 'Axis-X') {
		for (let i = 0; i < 4; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)

			if (!nextCell?.classList.contains('playerShipPresent')) {
				pipe(
					addTextToElem('C'),
					addStyleToElem([
						['color', '#f0a400'],
						['cursor', 'crosshair'],
					])
				)(nextCell)
			}
		}
	} else if (currentAxis === 'Axis-Y') {
		for (let i = 0; i < 4; i += 1) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)

			if (!nextCell?.classList.contains('playerShipPresent')) {
				pipe(
					addTextToElem('C'),
					addStyleToElem([
						['color', '#f0a400'],
						['cursor', 'crosshair'],
					])
				)(nextCell)
			}
		}
	}
}
export { handleCarrierMouseEnter }
