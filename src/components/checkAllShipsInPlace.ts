import { renderStartButton } from './renderStartButton'
import { renderStarsInPlayerBoard } from './renderStarsInPlayerBoard'

const checkAllShipsInPlace = function () {
	//if playerShip co-ordinates does not exist, create it to check its length which is the sum total of length of all player ships
	if (localStorage.getItem('playerShipsCoords')) {
		const shipsCoordsArr = JSON.parse(localStorage.getItem('playerShipsCoords') ?? '')

		//if all the player ships have been placed
		if (shipsCoordsArr.length === 18) {
			//adds stars to player board
			renderStarsInPlayerBoard()
			//STARTS GAME
			renderStartButton()
		}
	}
}
export { checkAllShipsInPlace }
