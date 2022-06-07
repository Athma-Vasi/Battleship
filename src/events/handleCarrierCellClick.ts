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

const handleCarrierCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	// for persistent state and enforce single carrier
	if (!localStorage.getItem('isSingleCarrier')) {
		localStorage.setItem('isSingleCarrier', JSON.stringify(true))
	}
	let isSingleCarrier = JSON.parse(localStorage.getItem('isSingleCarrier') ?? '')

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the carrier object upon first call
	if (!localStorage.getItem('carrier')) {
		localStorage.setItem(
			'carrier',
			JSON.stringify([
				{
					head: '',
					body1: '',
					body2: '',
					tail: '',
				},
			])
		)
	}

	const carrier: Carrier[] = JSON.parse(localStorage.getItem('carrier') ?? '')

	const carrierCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isSingleCarrier) {
		//grid boundary detection
		if (Number(currentX) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//to place carrier on grid
		for (let i = 0; i < 4; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)

			carrierCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		localStorage.setItem('isSingleCarrier', JSON.stringify(false))
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isSingleCarrier) {
		//grid boundary detection
		if (Number(currentY) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//to place carrier on grid
		for (let i = 0; i < 4; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)

			carrierCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		localStorage.setItem('isSingleCarrier', JSON.stringify(false))
	}

	isSingleCarrier = JSON.parse(localStorage.getItem('isSingleCarrier') ?? '')

	//to prevent updating after first click
	if (isSingleCarrier) {
		//update carrier object attributes
		carrier[0].head = carrierCoords[0]
		carrier[0].body1 = carrierCoords[1]
		carrier[0].body2 = carrierCoords[2]
		carrier[0].tail = carrierCoords[3]
	}

	//store carrier
	localStorage.setItem('carrier', JSON.stringify(carrier))

	//remove event listeners after single carrier has been placed
	if (isSingleCarrier === true) {
		playerGameCells.forEach((player) => {
			player.removeEventListener('click', handleCarrierCellClick)
		})
	}
}
export { handleCarrierCellClick }
