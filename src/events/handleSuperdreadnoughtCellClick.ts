import { accumulateShipCoords } from '../components/accumulateShipCoords'
import { checkAllShipsInPlace } from '../components/checkAllShipsInPlace'
import { doesShipPlacementOverlap } from '../components/doesShipPlacementOverlap'
import { isCorrectNumberOfShips } from '../components/isCorrectNumberOfShips'
import {
	addStyleToElem,
	elemCreator,
	pipe,
	addTextToElem,
	addAttributeToElem,
	addEvtListener,
	removeEvtListener,
} from '../utilities/elementCreators'
import { Button, Div, NodesDiv, Superdreadnought } from '../utilities/types'
import { handleBattleshipBttnClick } from './handleBattleshipBttnClick'
import { handleCarrierBttnClick } from './handleCarrierBttnClick'
import { handleDestroyerBttnClick } from './handleDestroyerBttnClick'
import { handleFrigateBttnClick } from './handleFrigateBttnClick'
import { handleSuperdreadnoughtMouseEnter } from './handleSuperdreadnoughtMouseEnter'
import { handleSuperdreadnoughtMouseLeave } from './handleSuperdreadnoughtMouseLeave'

//TODO:implement background change on mouse hover
const handleSuperdreadnoughtCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const ship = 'superdreadnought'
	const amount = 'single'

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cellplayer?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the carrier object upon first call
	if (!localStorage.getItem('superdreadnought')) {
		localStorage.setItem('superdreadnought', JSON.stringify(''))
	}

	let superdreadnought: Superdreadnought = JSON.parse(
		localStorage.getItem('superdreadnought') ?? ''
	)

	const superdreadnoughtCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isCorrectNumberOfShips(ship, amount)) {
		//grid boundary detection
		if (Number(currentX) > 5) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(5, currentAxis, currentX, currentY)) return null

		//to place superdreadnought on the grid
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${Number(currentX) + i},${currentY}"]`
			)
			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('S')
			)(nextCell)

			superdreadnoughtCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update superdreadnought object attributes
			superdreadnought = {
				head: superdreadnoughtCoords[0],
				body1: superdreadnoughtCoords[1],
				body2: superdreadnoughtCoords[2],
				body3: superdreadnoughtCoords[3],
				tail: superdreadnoughtCoords[4],
			}
		}

		localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false))
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isCorrectNumberOfShips(ship, 'single')) {
		//grid boundary detection
		if (Number(currentY) > 5) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//overlap detection
		if (doesShipPlacementOverlap(5, currentAxis, currentX, currentY)) return null

		//to place superdreadnought on the grid
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cellplayer="${currentX},${Number(currentY) + i}"]`
			)

			//prevents duplicate letters being placed
			if (nextCell) nextCell.textContent = ''

			pipe(
				addAttributeToElem([['class', 'playerShipPresent player-gameCell']]),
				addStyleToElem([['color', '#f0a400']]),
				addTextToElem('S')
			)(nextCell)

			superdreadnoughtCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		//to prevent updating after first click
		if (isCorrectNumberOfShips(ship, amount)) {
			//update superdreadnought object attributes
			superdreadnought = {
				head: superdreadnoughtCoords[0],
				body1: superdreadnoughtCoords[1],
				body2: superdreadnoughtCoords[2],
				body3: superdreadnoughtCoords[3],
				tail: superdreadnoughtCoords[4],
			}
		}

		localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false))
	}

	//store superdreadnought
	localStorage.setItem('superdreadnought', JSON.stringify(superdreadnought))

	//store current ship coords to pool of all ship coords
	accumulateShipCoords(superdreadnoughtCoords)

	if (isCorrectNumberOfShips(ship, amount) === true) {
		//after 'this' button has been clicked, set the color to grey to visually indicate finished
		const superdreadnoughtBttn: Button = document.querySelector('.bttn-superdreadnought')
		pipe(
			addStyleToElem([
				['border', '1px solid gainsboro'],
				['color', 'gainsboro'],
				['cursor', 'not-allowed'],
			])
		)(superdreadnoughtBttn)

		//enable events on other shipButtons after superdreadnought has been placed and set color to Apple green to visually indicate that they can be clicked if they have not been previously disabled after a click
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

		//remove event listeners after single superdreadnought has been placed
		playerGameCells.forEach((player) => {
			pipe(
				removeEvtListener('click')(handleSuperdreadnoughtCellClick),
				removeEvtListener('mouseenter')(handleSuperdreadnoughtMouseEnter),
				removeEvtListener('mouseleave')(handleSuperdreadnoughtMouseLeave)
			)(player)
		})
	}

	//if all ships placed, render start button
	checkAllShipsInPlace()
}
export { handleSuperdreadnoughtCellClick }
