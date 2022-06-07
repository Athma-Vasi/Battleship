import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import {
	addStyleToElem,
	addTextToElem,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Destroyer } from '../utilities/types'

const handleDestroyerCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'destroyer'
	const amount = 'double'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the ship object upon first call
	if (!localStorage.getItem('destroyer')) {
		localStorage.setItem('destroyer', JSON.stringify([]))
	}
	const destroyer: Destroyer[] = JSON.parse(localStorage.getItem('destroyer') ?? '')

	const destroyerCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		log(isCorrectNumberOfShips(ship, amount))
		//grid boundary detection
		if (Number(currentX) > 8) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(2, currentAxis, currentX, currentY)) return null

		//to place destroyer on the grid
		for (let i = 0; i < 2; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('D'))(nextCell)

			destroyerCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//only update if there are 2 or less ships
		if (isCorrectNumberOfShips(ship, amount)) {
			destroyer.push({ head: destroyerCoords[0], tail: destroyerCoords[1] })
		}
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentY) > 8) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(2, currentAxis, currentX, currentY)) return null

		for (let i = 0; i < 2; i++) {
			//to place destroyer on the grid
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('D'))(nextCell)

			destroyerCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//only update if there are 2 or less ships
		if (isCorrectNumberOfShips(ship, amount)) {
			destroyer.push({ head: destroyerCoords[0], tail: destroyerCoords[1] })
		}
	}

	//store destroyer
	localStorage.setItem('destroyer', JSON.stringify(destroyer))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(destroyerCoords)

	//remove event listeners after single battleship has been placed
	if (isCorrectNumberOfShips(ship, amount) === false) {
		playerGameCells.forEach((player) => {
			player.removeEventListener('click', handleDestroyerCellClick)
		})
	}
}

export { handleDestroyerCellClick }
