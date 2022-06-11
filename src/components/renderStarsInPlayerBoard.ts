import { addAttributeToElem, addTextToElem, pipe } from '../utilities/elementCreators'
import { NodesDiv } from '../utilities/types'

const renderStarsInPlayerBoard = function () {
	const playerGameCell: NodesDiv = document.querySelectorAll('.player-gameCell')

	playerGameCell.forEach((cell) => {
		if (!cell.classList.contains('playerShipPresent')) {
			pipe(
				addTextToElem('✴'),
				addAttributeToElem([['class', 'player-gameCell playerShipNotPresent']])
			)(cell)
		}
	})
}
export { renderStarsInPlayerBoard }
