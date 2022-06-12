import { computersTurn } from '../components/computersTurn'
import { renderBattleMessageElem } from '../components/renderBattleMessage'
import { addStyleToElem, pipe, removeEvtListener } from '../utilities/elementCreators'
import { Div, NodesDiv } from '../utilities/types'
import { handlePlayerClickOnCompShips } from './handlePlayerClickOnCompShips'

const handlePlayerClickOnCompMisses = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const currentCellCoord = this.dataset.cellcomp ?? ''
	const currentShipSymbol = this.textContent ?? ''
	const towardsCombatant = 'comp'
	const hitOrMiss = 'miss'

	renderBattleMessageElem(
		currentCellCoord,
		currentShipSymbol,
		towardsCombatant,
		hitOrMiss
	)

	//assigns '✖' to currently missed co-ordinate and colors it Apple amber
	this.textContent == ''
	this.textContent = '✖'
	pipe(addStyleToElem([['color', '#f0a400']]))(this)

	//initialize storage for previously missed co-ordinates
	if (!localStorage.getItem('prevPlayerMissOnCompCoord')) {
		localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(''))
	}

	//grab the previous miss co-ordinates in order to turn them back into gray
	const prevPlayerMissOnCompCoord = JSON.parse(
		localStorage.getItem('prevPlayerMissOnCompCoord') ?? ''
	)
	const prevPlayerMissOnCompCell: Div = document.querySelector(
		`[data-cellcomp="${prevPlayerMissOnCompCoord}"]`
	)
	pipe(addStyleToElem([['color', 'gainsboro']]))(prevPlayerMissOnCompCell)

	//store current miss co-ordinates in order to highlight the current round's co-ordinates
	localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(currentCellCoord))

	//to prevent player clicking while computer's turn
	//while timer runs, clicks on comp grid cells do not register
	//after relevant work is done, event listeners are added back on
	//simulates computer taking time to 'think'
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent')
	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent')

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
