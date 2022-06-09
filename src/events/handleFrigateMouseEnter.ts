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

const handleFrigateMouseEnter = function (this: HTMLDivElement, ev: MouseEvent) {
	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//change cell on hover
	const nextCell: Div = document.querySelector(
		`[data-cellplayer="${currentX},${currentY}"]`
	)

	pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)
}
export { handleFrigateMouseEnter }
