import { computersTurn } from '../components/computersTurn'
import { pipe, removeEvtListener } from '../utilities/elementCreators'
import { NodesDiv } from '../utilities/types'
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips'

const handlePlayerClickOnCompMisses = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	this.textContent == ''
	this.textContent = '✖'

	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent')
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent')

	//to prevent player clicking while computer's turn
	//while timer runs, clicks on comp grid cells do not register
	//after relevant work is done, event listeners are added back on
	//simulates computer taking time to 'think'
	compShipNotPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompMisses))(cell)
	})
	compShipPresent.forEach((cell) => {
		pipe(removeEvtListener('click')(handlePlayerClickOnCompShips))(cell)
	})

	//computers turn
	setTimeout(computersTurn, 0)
}
export { handlePlayerClickOnCompMisses }
