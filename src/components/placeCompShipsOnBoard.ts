import { CompShipsPlacementChoiceArr, Div, NodesDiv } from '../utilities/types'
import { renderCompShipsOnBoard } from './renderCompShipsOnBoard'

const placeCompShipsOnBoard = function (
	compShipsPlacementChoicesArr_: CompShipsPlacementChoiceArr
) {
	const compShipsPlacementChoicesArr = compShipsPlacementChoicesArr_

	//selects a random pre-formed compShipPlacement for every game
	const randCompShipPlacement =
		compShipsPlacementChoicesArr[
			Math.floor(Math.random() * compShipsPlacementChoicesArr.length)
		]

	renderCompShipsOnBoard(randCompShipPlacement)
}
export { placeCompShipsOnBoard }
