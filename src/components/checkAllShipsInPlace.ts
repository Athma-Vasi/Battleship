import { placeCompShipsOnBoard } from './placeCompShipsOnBoard'
import { renderStartButton } from './renderStartButton'

const checkAllShipsInPlace = function () {
	placeCompShipsOnBoard()
	//if all the player ships have been placed
	if (localStorage.getItem('playerShipsCoords')) {
		const shipsCoordsArr = JSON.parse(localStorage.getItem('playerShipsCoords') ?? '')

		if (shipsCoordsArr.length === 18) {
			//START GAME
			renderStartButton()
		}
	}
}
export { checkAllShipsInPlace }
