import { addEvtListener } from '../utilities/elementCreators'
import { NodesDiv } from '../utilities/types'
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips'

const handleStartButtonClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	if (!localStorage.getItem('isGameRunning')) {
		localStorage.setItem('isGameRunning', JSON.stringify(true))
	}

	const compShipPresentCells: NodesDiv = document.querySelectorAll('.compShipPresent')

	const compShipNotPresentCells: NodesDiv =
		document.querySelectorAll('.compShipNotPresent')

	//add evt listeners to comp game cells
	compShipPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompShips)(cell)
	)

	compShipNotPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompMisses)(cell)
	)
}

export { handleStartButtonClick }
