import {
	addStyleToElem,
	addTextToElem,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import { Div, NodesDiv, Battleship } from '../utilities/types'

const handleBattleshipCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	// for persistent state and enforce single carrier
	if (!localStorage.getItem('isSingleBattleship')) {
		localStorage.setItem('isSingleBattleship', JSON.stringify(true))
	}
	let isSingleBattleship = JSON.parse(localStorage.getItem('isSingleBattleship') ?? '')

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the carrier object upon first call
	if (!localStorage.getItem('battleship')) {
		localStorage.setItem(
			'battleship',
			JSON.stringify([
				{
					head: '',
					body: '',
					tail: '',
				},
			])
		)
	}

	//initialize on first call for overlap detection
	if (!localStorage.getItem('playerShipsCoords')) {
		localStorage.setItem('playerShipsCoords', JSON.stringify([]))
	}
	let playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? ''
	)

	const battleship: Battleship[] = JSON.parse(localStorage.getItem('battleship') ?? '')

	const battleshipCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isSingleBattleship) {
		//grid boundary detection
		if (Number(currentX) > 7) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		for (let i = 0; i < 3; i++) {
			//overlap detection
			if (playerShipsCoords.includes(`${Number(currentX) + i},${currentY}`)) {
				alert(
					'A ship is already present at these coordinates. Please choose another area.'
				)
				return null
			}
		}

		for (let i = 0; i < 3; i++) {
			//to place battleship on the grid
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('B'))(nextCell)

			battleshipCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		//to prevent updating after first click
		if (isSingleBattleship) {
			//update battleship object attributes
			battleship[0].head = battleshipCoords[0]
			battleship[0].body = battleshipCoords[1]
			battleship[0].tail = battleshipCoords[2]
		}

		localStorage.setItem('isSingleBattleship', JSON.stringify(false))
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isSingleBattleship) {
		//grid boundary detection
		if (Number(currentX) > 7) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		for (let i = 0; i < 3; i++) {
			//overlap detection
			if (playerShipsCoords.includes(`${Number(currentX) + i},${currentY}`)) {
				alert(
					'A ship is already present at these coordinates. Please choose another area.'
				)
				return null
			}
		}

		for (let i = 0; i < 3; i++) {
			//to place battleship on the grid
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]), addTextToElem('B'))(nextCell)

			battleshipCoords.push(`${currentX},${Number(currentY) + i}`)
		}
		//to prevent updating after first click
		if (isSingleBattleship) {
			//update battleship object attributes
			battleship[0].head = battleshipCoords[0]
			battleship[0].body = battleshipCoords[1]
			battleship[0].tail = battleshipCoords[2]
		}

		localStorage.setItem('isSingleBattleship', JSON.stringify(false))
	}

	isSingleBattleship = JSON.parse(localStorage.getItem('isSingleBattleship') ?? '')

	//store battleship
	localStorage.setItem('battleship', JSON.stringify(battleship))

	//add battleship coordinate to rest of ships
	battleshipCoords.forEach((coord) => playerShipsCoords.push(coord))
	localStorage.setItem('playerShipsCoords', JSON.stringify(playerShipsCoords))

	//remove event listeners after single battleship has been placed
	if (isSingleBattleship === true) {
		playerGameCells.forEach((player) => {
			player.removeEventListener('click', handleBattleshipCellClick)
		})
	}
}

export { handleBattleshipCellClick }
