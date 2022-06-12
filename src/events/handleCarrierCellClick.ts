import { Button, Carrier, Div, NodesDiv } from '../utilities/types'
import {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	addStyleToElem,
	pipe,
	removeEvtListener,
} from '../utilities/elementCreators'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { checkAllShipsInPlace } from '../components/checkAllShipsInPlace'
import { handleCarrierMouseEnter } from './handleCarrierMouseEnter'
import { handleCarrierMouseLeave } from './handleCarrierMouseLeave'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'

const handleCarrierCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'carrier'
	const amount = 'single'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the carrier object upon first call
	if (!localStorage.getItem('carrier')) {
		localStorage.setItem('carrier', JSON.stringify([]))
	}

	let carrier: Carrier = JSON.parse(localStorage.getItem('carrier') ?? '')

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
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)

			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('C')
			)(nextCell)

			carrierCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update carrier object attributes
			carrier = {
				head: carrierCoords[0],
				body1: carrierCoords[1],
				body2: carrierCoords[2],
				tail: carrierCoords[3],
			}
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
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('C')
			)(nextCell)

			carrierCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update carrier object attributes
			carrier = {
				head: carrierCoords[0],
				body1: carrierCoords[1],
				body2: carrierCoords[2],
				tail: carrierCoords[3],
			}
		}

		localStorage.setItem('isSingleCarrier', JSON.stringify(false))
	}

	//store carrier
	localStorage.setItem('carrier', JSON.stringify(carrier))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(carrierCoords)

	if (isCorrectNumberOfShips(ship, amount) === true) {
		//after 'this' button has been clicked, set the color to grey to visually indicate finished
		const carrierBttn: Button = document.querySelector('.bttn-carrier')
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			])
		)(carrierBttn)

		//enable events on other shipButtons after carrier has been placed and set color to Apple green to visually indicate that they can be clicked if they have not been previously disabled after a click
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

		const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
		if (destroyerBttn && destroyerBttn.disabled !== true)
			pipe(
				addStyleToElem([
					['border', '1px solid #00f000'],
					['color', '#00f000'],
					['cursor', 'pointer'],
				]),
				addEvtListener('click')(handleDestroyerBttnClick)
			)(destroyerBttn)

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

		//remove event listeners after single carrier has been placed
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleCarrierCellClick),
				removeEvtListener('mouseenter')(handleCarrierMouseEnter),
				removeEvtListener('mouseleave')(handleCarrierMouseLeave)
			)(player)
		})
	}

	//if all ships placed, render start button
	checkAllShipsInPlace()
}
export { handleCarrierCellClick }
