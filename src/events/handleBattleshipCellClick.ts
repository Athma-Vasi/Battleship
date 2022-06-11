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
			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['background-color', 'grey']]),
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
			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['background-color', 'grey']]),
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
		//enable events on other shipButtons after both destroyers have been placed
		const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
		if (superdreadnoughtBttn)
			pipe(addEvtListener('click')(handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn)

		const carrierBttn: Button = document.querySelector('.bttn-carrier')
		if (carrierBttn) pipe(addEvtListener('click')(handleCarrierBttnClick))(carrierBttn)

		const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
		if (destroyerBttn)
			pipe(addEvtListener('click')(handleDestroyerBttnClick))(destroyerBttn)

		const frigateBttn: Button = document.querySelector('.bttn-frigate')
		if (frigateBttn) pipe(addEvtListener('click')(handleFrigateBttnClick))(frigateBttn)

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
