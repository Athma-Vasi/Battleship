import { addEvtListener } from '../utilities/elementCreators'
import { NodesDiv } from '../utilities/types'
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips'

const handleStartButtonClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	if (!localStorage.getItem('isGameRunning')) {
		localStorage.setItem('isGameRunning', JSON.stringify(true))
	}

	let isGameRunning = JSON.parse(localStorage.getItem('isGameRunning') ?? '')

	const compShipPresentCells: NodesDiv = document.querySelectorAll('.compShipPresent')

	const compShipNotPresentCells: NodesDiv =
		document.querySelectorAll('.compShipNotPresent')

	compShipPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompShips)(cell)
	)

	compShipNotPresentCells.forEach((cell) =>
		addEvtListener('click')(handlePlayerClickOnCompMisses)(cell)
	)
}

export { handleStartButtonClick }

// while (isGameRunning) {
// 	log('running')

// 	setTimeout(() => {
// 		//insert a win conditon that changes isGameRunning to false
// 		log('macrotask running')
// 		isGameRunning = false
// 	}, 1000)

// 	isGameRunning = false
// }
// log('not running')
