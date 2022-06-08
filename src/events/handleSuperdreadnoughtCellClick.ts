import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { checkAllShipsInPlace } from '../components/checkAllShipsInPlace'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import {
	addStyleToElem,
	elemCreator,
	pipe,
	addTextToElem,
	addEvtListener,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Superdreadnought } from '../utilities/types'

//TODO:implement background change on mouse hover
const handleSuperdreadnoughtCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'superdreadnought'
	const amount = 'single'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the carrier object upon first call
	if (!localStorage.getItem('superdreadnought')) {
		localStorage.setItem('superdreadnought', JSON.stringify(''))
	}

	let superdreadnought: Superdreadnought = JSON.parse(
		localStorage.getItem('superdreadnought') ?? ''
	)

	const superdreadnoughtCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentX) > 5) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(5, currentAxis, currentX, currentY)) return null

		//to place superdreadnought on the grid
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('S'))(nextCell)

			superdreadnoughtCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update superdreadnought object attributes
			superdreadnought = {
				head: superdreadnoughtCoords[0],
				body1: superdreadnoughtCoords[1],
				body2: superdreadnoughtCoords[2],
				body3: superdreadnoughtCoords[3],
				tail: superdreadnoughtCoords[4],
			}
		}

		localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false))
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, 'single')) {
		//grid boundary detection
		if (Number(currentY) > 5) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(5, currentAxis, currentX, currentY)) return null

		//to place superdreadnought on the grid
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('S'))(nextCell)

			superdreadnoughtCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update superdreadnought object attributes
			superdreadnought = {
				head: superdreadnoughtCoords[0],
				body1: superdreadnoughtCoords[1],
				body2: superdreadnoughtCoords[2],
				body3: superdreadnoughtCoords[3],
				tail: superdreadnoughtCoords[4],
			}
		}

		localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false))
	}

	//store superdreadnought
	localStorage.setItem('superdreadnought', JSON.stringify(superdreadnought))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(superdreadnoughtCoords)

	//remove event listeners after single superdreadnought has been placed
	if (isCorrectNumberOfShips(ship, amount) === true) {
		playerGameCells.forEach((player) => {
			player.removeEventListener('click', handleSuperdreadnoughtCellClick)
		})
	}

	//if all ships placed, render start button
	checkAllShipsInPlace()
}
export { handleSuperdreadnoughtCellClick }
