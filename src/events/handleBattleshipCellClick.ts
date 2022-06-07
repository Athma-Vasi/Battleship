import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import {
	addStyleToElem,
	addTextToElem,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Battleship } from '../utilities/types'

const handleBattleshipCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'battleship'
	const amount = 'single'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the ship object upon first call
	if (!localStorage.getItem('battleship')) {
		localStorage.setItem('battleship', JSON.stringify([]))
	}
	const battleship: Battleship[] = JSON.parse(localStorage.getItem('battleship') ?? '')

	const battleshipCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentX) > 7) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(3, currentAxis, currentX, currentY)) return null

		//to place battleship on the grid
		for (let i = 0; i < 3; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('B'))(nextCell)

			battleshipCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, 'single')) {
			//update battleship object attributes
			battleship.push({
				head: battleshipCoords[0],
				body: battleshipCoords[1],
				tail: battleshipCoords[2],
			})
		}

		localStorage.setItem('isSingleBattleship', JSON.stringify(false))
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentY) > 7) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(3, currentAxis, currentX, currentY)) return null

		for (let i = 0; i < 3; i++) {
			//to place battleship on the grid
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('B'))(nextCell)

			battleshipCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, 'single')) {
			//update battleship object attributes
			battleship.push({
				head: battleshipCoords[0],
				body: battleshipCoords[1],
				tail: battleshipCoords[2],
			})
		}

		localStorage.setItem('isSingleBattleship', JSON.stringify(false))
	}

	//store battleship
	localStorage.setItem('battleship', JSON.stringify(battleship))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(battleshipCoords)

	//remove event listeners after single battleship has been placed
	if (isCorrectNumberOfShips(ship, amount) === true) {
		playerGameCells.forEach((player) => {
			player.removeEventListener('click', handleBattleshipCellClick)
		})
	}
}

export { handleBattleshipCellClick }
