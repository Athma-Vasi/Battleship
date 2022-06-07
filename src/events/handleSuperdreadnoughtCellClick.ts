import { addStyleToElem, pipe } from '../utilities/elementCreators'
import { Div, NodesDiv } from '../utilities/types'

const handleSuperdreadnoughtCellClick = function (this: HTMLDivElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerGameCells: NodesDiv = document.querySelectorAll('.player-gameCell')

	const currentCell = this.dataset.cell?.split(',')
	const currentX = currentCell?.[0] ?? ''
	const currentY = currentCell?.[1] ?? ''

	const superdreadnoughtArr: HTMLElement[] = []

	//for horizontal placement
	if (Number(currentY) > 5) {
		alert('Please stay within boundaries of the sector (｡•́︿•̀｡)')
		return null
	}

	for (let i = 0; i < 5; i++) {
		const nextCell: Div = document.querySelector(
			`[data-cell="${currentX},${Number(currentY) + i}"]`
		)
		pipe(addStyleToElem([['background-color', 'grey']]))(nextCell)
		if (nextCell) superdreadnoughtArr.push(nextCell)
	}

	log(superdreadnoughtArr)

	// this.removeEventListener('click', handleSuperdreadnoughtCellClick)
}
export { handleSuperdreadnoughtCellClick }
