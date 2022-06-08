import { Div, NodesDiv } from '../utilities/types'

const placeCompShipsOnBoard = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const compBoardContainer: Div = document.querySelector('.compBoard-container')

	const compGameCells: NodesDiv = document.querySelectorAll('.comp-gameCell')

	function randShipHeadCoord(randAxis_: string, shipLength_: number) {}

	function randShipCoordGenerator(shipLength_: number, compShipsCoords_: string[]) {
		//random axis gen
		const axis = ['x', 'y']
		const randAxis_ = axis[Math.round(Math.random())]
		log({ randAxis_ })

		const maxBound = 11 - shipLength_

		let xCoord = Math.floor(Math.random() * maxBound)
		let yCoord = Math.floor(Math.random() * maxBound)

		if (randAxis_ === 'x') {
			let coordArr: string[] = []
			for (let i = 0; i < shipLength_; i++) {
				coordArr.push(`${xCoord},${yCoord + i}`)
			}
			return coordArr
		} else if (randAxis_ === 'y') {
			let coordArr: string[] = []
			for (let i = 0; i < shipLength_; i++) {
				coordArr.push(`${xCoord + i},${yCoord}`)
			}
			return coordArr
		}
	}

	log(randShipCoordGenerator(5))
}
export { placeCompShipsOnBoard }
