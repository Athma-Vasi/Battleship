import { placeCompShipsOnBoard } from './placeCompShipsOnBoard'
import { renderStartButton } from './renderStartButton'
import { compShipsPlacementChoicesArr } from '../utilities/compShipsPlacementChoicesArr'
import { renderWaterInPlayerBoard } from './renderWaterInPlayerBoard'

const checkAllShipsInPlace = function () {
	placeCompShipsOnBoard(compShipsPlacementChoicesArr)

	//if all the player ships have been placed
	if (localStorage.getItem('playerShipsCoords')) {
		const shipsCoordsArr = JSON.parse(localStorage.getItem('playerShipsCoords') ?? '')

		if (shipsCoordsArr.length === 18) {
			//add water to player board
			renderWaterInPlayerBoard()
			//START GAME
			renderStartButton()
		}
	}
}
export { checkAllShipsInPlace }

// const ships = {
// 	superdreadnought: JSON.parse(localStorage.getItem('superdreadnought') ?? ''),
// 	carrier: JSON.parse(localStorage.getItem('carrier') ?? ''),
// 	battleship: JSON.parse(localStorage.getItem('battleship') ?? ''),
// 	destroyers: JSON.parse(localStorage.getItem('destroyer') ?? ''),
// 	frigates: JSON.parse(localStorage.getItem('frigate') ?? ''),
// }
// console.log(JSON.stringify(ships))
