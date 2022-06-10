import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { checkAllShipsInPlace } from '../components/checkAllShipsInPlace'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import {
	addAttributeToElem,
	addStyleToElem,
	addTextToElem,
	elemCreator,
	removeEvtListener,
	pipe,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Frigate } from '../utilities/types'
import { handleDestroyerMouseEnter } from './handleDestroyerMouseEnter'
import { handleDestroyerMouseLeave } from './handleDestroyerMouseLeave'
import { handleFrigateMouseEnter } from './handleFrigateMouseEnter'
import { handleFrigateMouseLeave } from './handleFrigateMouseLeave'

const handleFrigateCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'frigate'
	const amount = 'double'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the ship object upon first call
	if (!localStorage.getItem('frigate')) {
		localStorage.setItem('frigate', JSON.stringify([]))
	}
	const frigate: Frigate[] = JSON.parse(localStorage.getItem('frigate') ?? '')

	const frigateCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		// //grid boundary detection
		// if (Number(currentX) > 9) {
		// 	alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
		// 	return null
		// }

		//overlap detection
		if (doesShipPlacementOverlap(1, currentAxis, currentX, currentY)) return null

		//to place frigate on the grid
		for (let i = 0; i < 1; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)
			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['background-color', 'grey']]),
				addTextToElem('F')
			)(nextCell)

			frigateCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//only update if there are 2 or less ships
		if (isCorrectNumberOfShips(ship, amount)) {
			frigate.push({ body: frigateCoords[0] })
		}
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, amount)) {
		// //grid boundary detection
		// if (Number(currentY) > 9) {
		// 	alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
		// 	return null
		// }

		//overlap detection
		if (doesShipPlacementOverlap(1, currentAxis, currentX, currentY)) return null

		for (let i = 0; i < 1; i++) {
			//to place frigate on the grid
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)
			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['background-color', 'grey']]),
				addTextToElem('F')
			)(nextCell)

			frigateCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//only update if there are 2 or less ships
		if (isCorrectNumberOfShips(ship, amount)) {
			frigate.push({ body: frigateCoords[0] })
		}
	} else if (isCorrectNumberOfShips(ship, amount) === false) return null

	//store frigate
	localStorage.setItem('frigate', JSON.stringify(frigate))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(frigateCoords)

	//remove event listeners after single battleship has been placed
	if (isCorrectNumberOfShips(ship, amount) === false) {
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleFrigateCellClick),
				removeEvtListener('mouseenter')(handleFrigateMouseEnter),
				removeEvtListener('mouseleave')(handleFrigateMouseLeave)
			)(player)
		})
	}

	//if all ships placed, render start button
	checkAllShipsInPlace()
}

export { handleFrigateCellClick }