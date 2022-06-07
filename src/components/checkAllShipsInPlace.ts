import { renderStartButton } from './renderStartButton'

const checkAllShipsInPlace = function () {
	//if all the ships have been placed, start round
	if (localStorage.getItem('playerShipsCoords')) {
		const shipsCoordsArr = JSON.parse(localStorage.getItem('playerShipsCoords') ?? '')

		if (shipsCoordsArr.length === 18) {
			//START GAME
			renderStartButton()
		}
	}
}
export { checkAllShipsInPlace }
