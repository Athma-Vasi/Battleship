import { Div, NodesDiv } from '../utilities/types'
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

	//grab the current state of the axis button
	const axisSelector = document.querySelector('.bttn-axisSelector')
	const currentAxis = axisSelector?.textContent

	//grab the current cell co-ordinate
	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	// if (!localStorage.getItem('superdreadnoughts')) {
	// 	localStorage.setItem('superdreadnoughts', JSON.stringify([]))
	// }

	// const superdreadnoughts: string[] = JSON.parse(
	// 	localStorage.getItem('superdreadnoughts') ?? ''
	// )

	// const lengthSuperdreadnoughts: number = superdreadnoughts.length
	// log(lengthSuperdreadnoughts)

	if (currentAxis === 'Axis-X') {
		//for horizontal placement
		if (Number(currentY) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		for (let i = 0; i < 4; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${currentX},${Number(currentY) + i}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)

			// superdreadnoughts.push(`${currentX},${Number(currentY) + i}`)
			// localStorage.setItem('superdreadnoughts', JSON.stringify(superdreadnoughts))
		}
	} else if (currentAxis === 'Axis-Y') {
		//for vertical placement
		if (Number(currentX) > 6) {
			alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
			return null
		}

		for (let i = 0; i < 4; i++) {
			const nextCell: Div = document.querySelector(
				`[data-cell="${Number(currentX) + i},${currentY}"]`
			)
			pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)

			// superdreadnoughts.push(`${Number(currentX) + i},${currentY}`)
			// localStorage.setItem('superdreadnoughts', JSON.stringify(superdreadnoughts))
		}
	}

	// this.removeEventListener('click', handleSuperdreadnoughtCellClick)
}
export { handleCarrierCellClick }
