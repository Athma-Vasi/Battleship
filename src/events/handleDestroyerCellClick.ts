import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { checkAllShipsInPlace } from '../components/checkAllShipsInPlace'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import {
	addStyleToElem,
	addTextToElem,
	elemCreator,
	addAttributeToElem,
	removeEvtListener,
	pipe,
	addEvtListener,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Destroyer, Button } from '../utilities/types'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleDestroyerMouseEnter } from './handleDestroyerMouseEnter'
import { handleDestroyerMouseLeave } from './handleDestroyerMouseLeave'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'

const handleDestroyerCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'destroyer'
	const amount = 'double'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
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
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('D')
			)(nextCell)

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
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('D')
			)(nextCell)

			destroyerCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//only update if there are 2 or less ships
		if (isCorrectNumberOfShips(ship, amount)) {
			destroyer.push({ head: destroyerCoords[0], tail: destroyerCoords[1] })
		}
	} else if (isCorrectNumberOfShips(ship, amount) === false) return null

	//store destroyer
	localStorage.setItem('destroyer', JSON.stringify(destroyer))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(destroyerCoords)

	if (isCorrectNumberOfShips(ship, amount) === false) {
		//enable events on other shipButtons after both destroyers have been placed
		const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
		if (superdreadnoughtBttn)
			pipe(addEvtListener('click')(handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn)

		const carrierBttn: Button = document.querySelector('.bttn-carrier')
		if (carrierBttn) pipe(addEvtListener('click')(handleCarrierBttnClick))(carrierBttn)

		const battleshipBttn: Button = document.querySelector('.bttn-battleship')
		if (battleshipBttn)
			pipe(addEvtListener('click')(handleBattleshipBttnClick))(battleshipBttn)

		const frigateBttn: Button = document.querySelector('.bttn-frigate')
		if (frigateBttn) pipe(addEvtListener('click')(handleFrigateBttnClick))(frigateBttn)

		//remove event listeners after both destroyers have been placed
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleDestroyerCellClick),
				removeEvtListener('mouseenter')(handleDestroyerMouseEnter),
				removeEvtListener('mouseleave')(handleDestroyerMouseLeave)
			)(player)
		})
	}

	//if all ships placed, render start button
	checkAllShipsInPlace()
}

export { handleDestroyerCellClick }
