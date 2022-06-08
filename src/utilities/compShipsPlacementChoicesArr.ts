export const compShipsPlacementChoicesArr = [
	{
		superdreadnought: {
			head: '1,0',
			body1: '2,0',
			body2: '3,0',
			body3: '4,0',
			tail: '5,0',
		},
		carrier: { head: '1,2', body1: '2,2', body2: '3,2', tail: '4,2' },
		battleship: { head: '1,4', body: '2,4', tail: '3,4' },
		destroyers: [
			{ head: '1,6', tail: '2,6' },
			{ head: '1,8', tail: '2,8' },
		],
		frigates: [{ body: '4,6' }, { body: '4,8' }],
	},
	{
		superdreadnought: {
			head: '1,2',
			body1: '1,3',
			body2: '1,4',
			body3: '1,5',
			tail: '1,6',
		},
		carrier: { head: '4,2', body1: '4,3', body2: '4,4', tail: '4,5' },
		battleship: { head: '6,1', body: '7,1', tail: '8,1' },
		destroyers: [
			{ head: '7,4', tail: '8,4' },
			{ head: '3,7', tail: '3,8' },
		],
		frigates: [{ body: '7,7' }, { body: '5,8' }],
	},
	{
		superdreadnought: {
			head: '1,1',
			body1: '1,2',
			body2: '1,3',
			body3: '1,4',
			tail: '1,5',
		},
		carrier: { head: '3,2', body1: '3,3', body2: '3,4', tail: '3,5' },
		battleship: { head: '1,7', body: '2,7', tail: '3,7' },
		destroyers: [
			{ head: '4,0', tail: '5,0' },
			{ head: '5,2', tail: '5,3' },
		],
		frigates: [{ body: '5,5' }, { body: '5,7' }],
	},
	{
		superdreadnought: {
			head: '1,8',
			body1: '2,8',
			body2: '3,8',
			body3: '4,8',
			tail: '5,8',
		},
		carrier: { head: '6,6', body1: '7,6', body2: '8,6', tail: '9,6' },
		battleship: { head: '6,4', body: '7,4', tail: '8,4' },
		destroyers: [
			{ head: '2,6', tail: '3,6' },
			{ head: '2,4', tail: '3,4' },
		],
		frigates: [{ body: '3,2' }, { body: '7,2' }],
	},
	{
		superdreadnought: {
			head: '1,1',
			body1: '1,2',
			body2: '1,3',
			body3: '1,4',
			tail: '1,5',
		},
		carrier: { head: '8,6', body1: '8,7', body2: '8,8', tail: '8,9' },
		battleship: { head: '6,1', body: '7,1', tail: '8,1' },
		destroyers: [
			{ head: '6,3', tail: '7,3' },
			{ head: '1,8', tail: '2,8' },
		],
		frigates: [{ body: '4,6' }, { body: '3,3' }],
	},
	{
		superdreadnought: {
			head: '0,0',
			body1: '1,0',
			body2: '2,0',
			body3: '3,0',
			tail: '4,0',
		},

		carrier: { head: '2,9', body1: '3,9', body2: '4,9', tail: '5,9' },
		battleship: { head: '0,5', body: '0,6', tail: '0,7' },
		destroyers: [
			{ head: '8,3', tail: '8,4' },
			{ head: '5,6', tail: '5,7' },
		],
		frigates: [{ body: '3,2' }, { body: '8,9' }],
	},
	{
		superdreadnought: {
			head: '0,7',
			body1: '1,7',
			body2: '2,7',
			body3: '3,7',
			tail: '4,7',
		},
		carrier: { head: '6,9', body1: '7,9', body2: '8,9', tail: '9,9' },
		battleship: { head: '7,2', body: '7,3', tail: '7,4' },
		destroyers: [
			{ head: '0,2', tail: '0,3' },
			{ head: '3,1', tail: '3,2' },
		],
		frigates: [{ body: '3,4' }, { body: '9,6' }],
	},
]

// //first generate grid

// function generateGridAndStoreIt(squareSide: number): void {
// 	let grid: string[][] = []

// 	for (let i = 0; i < squareSide; i++) {
// 		grid[i] = []
// 	}

// 	for (let i = 0; i < squareSide; i++) {
// 		for (let j = 0; j < squareSide; j++) {
// 			grid[i][j] = `${j},${i}`
// 		}
// 	}
// 	console.log(JSON.stringify(grid))

// 	//for persistent state
// 	if (!localStorage.getItem('compGrid')) {
// 		localStorage.setItem('compGrid', JSON.stringify(grid))
// 	}
// }

// function randShipCoordGenerator(shipLength_: number) {
// 	//random axis gen
// 	const axis = ['x', 'y']
// 	const randAxis_ = axis[Math.round(Math.random())]
// 	console.log({ randAxis_ })

// 	const maxBound = 11 - shipLength_

// 	let xCoord = Math.floor(Math.random() * maxBound)
// 	let yCoord = Math.floor(Math.random() * maxBound)

// 	//grab grid state from storage
// 	const compGrid = JSON.parse(localStorage.getItem('compGrid') ?? '')

// 	if (randAxis_ === 'x') {
// 		let coordArr: string[] = []
// 		for (let i = 0; i < shipLength_; i++) {
// 			coordArr.push(`${xCoord},${yCoord + i}`)
// 		}
// 		return coordArr
// 	} else if (randAxis_ === 'y') {
// 		let coordArr: string[] = []
// 		for (let i = 0; i < shipLength_; i++) {
// 			coordArr.push(`${xCoord + i},${yCoord}`)
// 		}
// 		return coordArr
// 	}
// }

// function secondRandShipCoordGen(shipLength_: number) {
// 	//random axis gen
// 	const axis = ['x', 'y']
// 	const randAxis_ = axis[Math.round(Math.random())]

// 	//grab grid state from storage
// 	const compGrid: Array<string[]> = JSON.parse(localStorage.getItem('compGrid') ?? '')
// }
