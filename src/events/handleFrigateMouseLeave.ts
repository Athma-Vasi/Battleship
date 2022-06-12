import { Div } from '../utilities/types'
import { addStyleToElem, pipe } from '../utilities/elementCreators'

const handleFrigateMouseLeave = function (this: HTMLDivElement, ev: MouseEvent) {
	//grabs the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//changes cell on hover
	const nextCell: Div = document.querySelector(
		`[data-cellplayer="${currentX},${currentY}"]`
	)

	//avoids changing cells of ships already present
	if (!nextCell?.classList.contains('playerShipPresent')) {
		if (nextCell) nextCell.textContent = ''
		pipe(
			addStyleToElem([
				['color', 'gainsboro'],
				['cursor', 'default'],
			])
		)(nextCell)
	}
}
export { handleFrigateMouseLeave }
