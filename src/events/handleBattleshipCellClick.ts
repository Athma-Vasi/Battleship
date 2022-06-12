import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { checkAllShipsInPlace } from '../components/checkAllShipsInPlace'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import {
	addStyleToElem,
	addTextToElem,
	addAttributeToElem,
	removeEvtListener,
	elemCreator,
	pipe,
	addEvtListener,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Battleship, Button } from '../utilities/types'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleBattleshipMouseEnter } from './handleBattleshipMouseEnter'
import { handleBattleshipMouseLeave } from './handleBattleshipMouseLeave'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'

const handleBattleshipCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'battleship'
	const amount = 'single'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the ship object upon first call
	if (!localStorage.getItem('battleship')) {
		localStorage.setItem('battleship', JSON.stringify(''))
	}
	let battleship: Battleship = JSON.parse(localStorage.getItem('battleship') ?? '')

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
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('B')
			)(nextCell)

			battleshipCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, 'single')) {
			//update battleship object attributes
			battleship = {
				head: battleshipCoords[0],
				body: battleshipCoords[1],
				tail: battleshipCoords[2],
			}
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
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('B')
			)(nextCell)

			battleshipCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, 'single')) {
			//update battleship object attributes
			battleship = {
				head: battleshipCoords[0],
				body: battleshipCoords[1],
				tail: battleshipCoords[2],
			}
		}

		localStorage.setItem('isSingleBattleship', JSON.stringify(false))
	}

	//store battleship
	localStorage.setItem('battleship', JSON.stringify(battleship))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(battleshipCoords)

	if (isCorrectNumberOfShips(ship, amount) === true) {
		//after 'this' button has been clicked, set the color to grey to visually indicate finished
		const battleshipBttn: Button = document.querySelector('.bttn-battleship')
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			])
		)(battleshipBttn)

		//enable events on other shipButtons after battleship has been placed and set color to Apple green to visually indicate that they can be clicked if they have not been previously disabled after a click
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

		//remove event listeners after battleship has been placed
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleBattleshipCellClick),
				removeEvtListener('mouseenter')(handleBattleshipMouseEnter),
				removeEvtListener('mouseleave')(handleBattleshipMouseLeave)
			)(player)
		})
	}

	//if all ships placed, render start button
	checkAllShipsInPlace()
}

export { handleBattleshipCellClick }
