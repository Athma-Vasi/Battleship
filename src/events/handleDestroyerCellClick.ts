import { accumulatePlayerShipCoords } from '../components/accumulatePlayerShipCoords'
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
				addStyleToElem([
					['color', '#f0a400'],
					['cursor', 'default'],
				]),
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
				addStyleToElem([
					['color', '#f0a400'],
					['cursor', 'default'],
				]),
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
	accumulatePlayerShipCoords(destroyerCoords)

	if (isCorrectNumberOfShips(ship, amount) === false) {
		//after 'this' button has been clicked, set the color to grey to visually indicate finished
		const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			])
		)(destroyerBttn)

		//enable events on other shipButtons after both destroyers have been placed and set color to Apple green to visually indicate that they can be clicked if they have not been previously disabled after a click
		const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
		if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleSuperdreadnoughtBttnClick)
			)(superdreadnoughtBttn)

		const carrierBttn: Button = document.querySelector('.bttn-carrier')
		if (carrierBttn && carrierBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleCarrierBttnClick)
			)(carrierBttn)

		const battleshipBttn: Button = document.querySelector('.bttn-battleship')
		if (battleshipBttn && battleshipBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleBattleshipBttnClick)
			)(battleshipBttn)

		const frigateBttn: Button = document.querySelector('.bttn-frigate')
		if (frigateBttn && frigateBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleFrigateBttnClick)
			)(frigateBttn)

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
