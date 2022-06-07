import { addStyleToElem, elemCreator, pipe } from '../utilities/elementCreators'
import { Div, NodesDiv, Superdreadnought } from '../utilities/types'

//TODO:implement background change on mouse hover
const handleSuperdreadnoughtCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	// for persistent state and enforce single carrier
	if (!localStorage.getItem('isSingleSuperdreadnought')) {
		localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(true))
	}
	let isSingleSuperdreadnought = JSON.parse(
		localStorage.getItem('isSingleSuperdreadnought') ?? ''
	)

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	//initialize the carrier object upon first call
	if (!localStorage.getItem('superdreadnought')) {
		localStorage.setItem(
			'superdreadnought',
			JSON.stringify([
				{
					head: '',
					body1: '',
					body2: '',
					body3: '',
					tail: '',
				},
			])
		)
	}

	const superdreadnought: Superdreadnought[] = JSON.parse(
		localStorage.getItem('superdreadnought') ?? ''
	)

	const superdreadnoughtCoords: string[] = []

	//for horizontal placement
	if (currentAxis === 'Axis-X' && isSingleSuperdreadnought) {
		//grid boundary detection
		if (Number(currentX) > 5) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//to place superdreadnought on the grid
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)

			superdreadnoughtCoords.push(`${Number(currentX) + i},${currentY}`)
		}

		localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false))
	} //for vertical placement
	else if (currentAxis === 'Axis-Y' && isSingleSuperdreadnought) {
		//grid boundary detection
		if (Number(currentX) > 5) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		//to place superdreadnought on the grid
		for (let i = 0; i < 5; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)

			superdreadnoughtCoords.push(`${currentX},${Number(currentY) + i}`)
		}

		localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false))
	}

	//update carrier object attributes
	superdreadnought[0].head = superdreadnoughtCoords[0]
	superdreadnought[0].body1 = superdreadnoughtCoords[1]
	superdreadnought[0].body2 = superdreadnoughtCoords[2]
	superdreadnought[0].body3 = superdreadnoughtCoords[3]
	superdreadnought[0].tail = superdreadnoughtCoords[4]

	//store carrier
	log(superdreadnought)
	localStorage.setItem('superdreadnought', JSON.stringify(superdreadnought))

	//remove event listeners after single carrier has been placed
	isSingleSuperdreadnought = JSON.parse(
		localStorage.getItem('isSingleSuperdreadnought') ?? ''
	)
	if (isSingleSuperdreadnought === true) {
		playerGameCells.forEach((player) => {
			player.removeEventListener('click', handleSuperdreadnoughtCellClick)
		})
	}
}
export { handleSuperdreadnoughtCellClick }
