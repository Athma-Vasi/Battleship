import { accumulatePlayerShipCoords } from '../components/accumulatePlayerShipCoords'
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
	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent ?? ''

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

	const ship = 'frigate'
	const amount = 'double'
	if (isCorrectNumberOfShips(ship, amount)) {
		//overlap detection
		if (doesShipPlacementOverlap(1, currentAxis, currentX, currentY)) return null

		//place frigate on the grid
		const nextCell: Div = document.querySelector(
			`[data-cellplayer="${currentX},${currentY}"]`
		)
		//prevents duplicate letters being placed
		if (nextCell) nextCell.textContent = ''

		pipe(
			addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
			addStyleToElem([
				['color', '#f0a400'],
				['cursor', 'default'],
			]),
			addTextToElem('F')
		)(nextCell)

		frigateCoords.push(`${currentX},${currentY}`)

		//only update if there are 2 or less ships
		if (isCorrectNumberOfShips(ship, amount)) {
			frigate.push({ body: frigateCoords[0] })
		}
	} else if (isCorrectNumberOfShips(ship, amount) === false) {
		return null
	}

	//store frigate
	localStorage.setItem('frigate', JSON.stringify(frigate))

	//store current ship coords to pool of all ship coords
	accumulatePlayerShipCoords(frigateCoords)

	if (isCorrectNumberOfShips(ship, amount) === false) {
		//after 'this' button has been clicked, set the color to grey to visually indicate finished
		const frigateBttn: Button = document.querySelector('.bttn-frigate')
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
			])
		)(frigateBttn)

		//enable events on other shipButtons after both frigates have been placed and set color to Apple green to visually indicate that they can be clicked if they have not been previously disabled after a click
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
