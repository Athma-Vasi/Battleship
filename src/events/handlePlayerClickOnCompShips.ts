import { announceGameWinner } from '../components/announceGameWinner'
import { computersTurn } from '../components/computersTurn'
import {
	addEvtListener,
	addTextToElem,
	pipe,
	removeEvtListener,
} from '../utilities/elementCreators'
import { NodesDiv } from '../utilities/types'
import { handlePlayerClickOnCompMisses } from './handlePlayerClickOnCompMisses'

const handlePlayerClickOnCompShips = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const currentCellCoord = this.dataset.cellcomp ?? ''

	//initialize the hit counter on first hit
	//when total hits reaches 18, game ends
	if (!localStorage.getItem('totalHitsOnCompShips')) {
		localStorage.setItem('totalHitsOnCompShips', JSON.stringify(0))
	}

	const compShipsCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsCoords') ?? ''
	)

	let totalHitsOnCompShips: number = JSON.parse(
		localStorage.getItem('totalHitsOnCompShips') ?? ''
	)
	//to prevent winner being called when a miss is registered
	if (compShipsCoords.includes(currentCellCoord)) {
		//check hit counter to see if its the last hit
		if (totalHitsOnCompShips === 17) {
			log('player')
			//call game winner function
			announceGameWinner('player')
		}
	}

	if (this.textContent === 'S') {
		//call the function to display hit on superdreadnought text
	} else if (this.textContent === 'C') {
		//call the function to display hit on carrier text
	} else if (this.textContent === 'B') {
		//call the function to display hit on battleship text
	} else if (this.textContent === 'D') {
		//call the function to display hit on destroyer text
	} else if (this.textContent === 'F') {
		//call the function to display hit on frigate text
	}

	this.textContent = ''
	this.textContent = '💥'

	//update hit counter and store
	totalHitsOnCompShips = totalHitsOnCompShips + 1
	localStorage.setItem('totalHitsOnCompShips', JSON.stringify(totalHitsOnCompShips))

	//disable clicking until computer has its turn
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent')
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent')

	//starting prevent clicking
	compShipPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompShips))(cell)
	})
	compShipNotPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompMisses))(cell)
	})

	//
	//

	setTimeout(computersTurn, 0)
}
export { handlePlayerClickOnCompShips }
