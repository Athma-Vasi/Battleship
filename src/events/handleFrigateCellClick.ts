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
	addEvtListener,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Frigate, NodesBttn, Button } from '../utilities/types'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'
import { handleDestroyerMouseEnter } from './handleDestroyerMouseEnter'
import { handleDestroyerMouseLeave } from './handleDestroyerMouseLeave'
import { handleFrigateMouseEnter } from './handleFrigateMouseEnter'
import { handleFrigateMouseLeave } from './handleFrigateMouseLeave'
import { handleSuperdreadnoughtBttnClick } from './handleSuperdreadnoughtBttnClick'

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
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
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
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
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

	if (isCorrectNumberOfShips(ship, amount) === false) {
		//enable events on other shipButtons after both frigates have been placed
		const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
		if (superdreadnoughtBttn)
			pipe(addEvtListener('click')(handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn)

		const carrierBttn: Button = document.querySelector('.bttn-carrier')
		if (carrierBttn) pipe(addEvtListener('click')(handleCarrierBttnClick))(carrierBttn)

		const battleshipBttn: Button = document.querySelector('.bttn-battleship')
		if (battleshipBttn)
			pipe(addEvtListener('click')(handleBattleshipBttnClick))(battleshipBttn)

		const destroyerBttn: Button = document.querySelector('.bttn-destroyer')
		if (destroyerBttn)
			pipe(addEvtListener('click')(handleDestroyerBttnClick))(destroyerBttn)

		//remove event listeners after both frigates have been placed
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
