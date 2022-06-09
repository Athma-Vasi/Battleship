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

	//starting prevent clicking
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
