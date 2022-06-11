import { CompShipsPlacementChoiceArr, Div, NodesDiv } from '../utilities/types'
import { renderCompBoard } from './renderCompBoard'
import { renderCompShipsOnBoard } from './renderCompShipsOnBoard'

const placeCompShipsOnBoard = function (
	compShipsPlacementChoicesArr_: CompShipsPlacementChoiceArr
) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const compBoardContainer: Div = document.querySelector('.compBoard-container')

	const compGameCells: NodesDiv = document.querySelectorAll('.comp-gameCell')
	const compShipsPlacementChoicesArr = compShipsPlacementChoicesArr_

	//TODO: randomize the comp ship placement
	//

	renderCompShipsOnBoard(compShipsPlacementChoicesArr[0])
}
export { placeCompShipsOnBoard }
