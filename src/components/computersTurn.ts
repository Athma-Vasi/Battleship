import { handlePlayerClickOnCompMisses } from '../events/handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from '../events/handlePlayerClickOnCompShips'
import { pipe, addEvtListener, addTextToElem } from '../utilities/elementCreators'
import { Div, NodesDiv } from '../utilities/types'
import { announceGameWinner } from './announceGameWinner'
import { computerAttacks } from './computerAttacks'
import { genRandCompAttackGuess } from './genRandCompAttackGuess'

const computersTurn = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	if (!localStorage.getItem('totalHitsOnPlayerShips')) {
		localStorage.setItem('totalHitsOnPlayerShips', JSON.stringify(0))
	}

	const playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? ''
	)

	const compAttackGuess = genRandCompAttackGuess()

	//if compAttackGuess is on a playerShipCoord, then check the hit counter
	//avoids registering a win when the computer misses
	if (playerShipsCoords.includes(compAttackGuess)) {
		let totalHitsOnPlayerShips: number = JSON.parse(
			localStorage.getItem('totalHitsOnPlayerShips') ?? ''
		)
		if (totalHitsOnPlayerShips === 17) {
			//call game winner function
			announceGameWinner('comp')
		}
	}

	//if no winner, continue attacking
	computerAttacks(compAttackGuess)

	const compShipPresent: NodesDiv = document.querySelectorAll('.compShipPresent')
	const compShipNotPresent: NodesDiv = document.querySelectorAll('.compShipNotPresent')

	//add evtlisteners back on after works done
	compShipPresent.forEach((cell) => {
		pipe(addEvtListener('click')(handlePlayerClickOnCompShips))(cell)
	})

	compShipNotPresent.forEach((cell) => {
		pipe(addEvtListener('click')(handlePlayerClickOnCompMisses))(cell)
	})
}
export { computersTurn }
