import { handlePlayerClickOnCompMisses } from '../events/handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from '../events/handlePlayerClickOnCompShips'
import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	removeEvtListener,
	pipe,
} from '../utilities/elementCreators'
import { Div, NodesDiv } from '../utilities/types'

const preventClicksAfterWin = function () {
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent')
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent')

	//prevent further clicks after winner is announced
	compShipPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompShips))(cell)
	})
	compShipNotPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompMisses))(cell)
	})
}
export { preventClicksAfterWin }
