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

const handleFrigateMouseLeave = function (this: HTMLDivElement, ev: MouseEvent) {
	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//change cell on hover
	const nextCell: Div = document.querySelector(
		`[data-cellplayer="${currentX},${currentY}"]`
	)

	//to avoid changing cells of ships already present
	if (!nextCell?.classList.contains('playerShipPresent')) {
		pipe(addStyleToElem([['background-color', 'white']]))(nextCell)
	}
}
export { handleFrigateMouseLeave }
