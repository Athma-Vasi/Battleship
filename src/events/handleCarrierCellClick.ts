import { Carrier, Div, NodesDiv } from '../utilities/types'
import {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	addStyleToElem,
	pipe,
} from '../utilities/elementCreators'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { checkAllShipsInPlace } from '../components/checkAllShipsInPlace'

const handleCarrierCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'carrier'
	const amount = 'single'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the carrier object upon first call
	if (!localStorage.getItem('carrier')) {
		localStorage.setItem('carrier', JSON.stringify([]))
	}

	const carrier: Carrier[] = JSON.parse(localStorage.getItem('carrier') ?? '')

	const carrierCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentX) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(4, currentAxis, currentX, currentY)) return null

		//to place carrier on grid
		for (let i = 0; i < 4; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('C'))(nextCell)

			carrierCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update carrier object attributes
			carrier.push({
				head: carrierCoords[0],
				body1: carrierCoords[1],
				body2: carrierCoords[2],
				tail: carrierCoords[3],
			})
		}

		localStorage.setItem('isSingleCarrier', JSON.stringify(false))
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentY) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(4, currentAxis, currentX, currentY)) return null

		//to place carrier on grid
		for (let i = 0; i < 4; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('C'))(nextCell)

			carrierCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update carrier object attributes
			carrier.push({
				head: carrierCoords[0],
				body1: carrierCoords[1],
				body2: carrierCoords[2],
				tail: carrierCoords[3],
			})
		}

		localStorage.setItem('isSingleCarrier', JSON.stringify(false))
	}

	//store carrier
	localStorage.setItem('carrier', JSON.stringify(carrier))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(carrierCoords)

	//remove event listeners after single carrier has been placed
	if (isCorrectNumberOfShips(ship, amount) === true) {
		playerGameCells.forEach((player) => {
			player.removeEventListener('click', handleCarrierCellClick)
		})
	}

	//if all ships placed, render start button
	checkAllShipsInPlace()
}
export { handleCarrierCellClick }
