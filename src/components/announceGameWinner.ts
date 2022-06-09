import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	pipe,
} from '../utilities/elementCreators'
import { Div } from '../utilities/types'

const announceGameWinner = function (winner_: string) {
	const headerContainer: Div = document.querySelector('.header-container')

	const winnerContainer = elemCreator('div')(['winner-container'])
	appendElemToParent(headerContainer)(winnerContainer)

	if (winner_ === 'comp') {
		pipe(addTextToElem('Oh no! Computer won! Click Restart to play again!'))(
			elemCreator('p')(['winner-announcement'])
		)
	} else {
		pipe(addTextToElem(`Congrats ${winner_}! You won! Click Restart to play again!`))(
			elemCreator('p')(['winner-announcement'])
		)
	}
}
export { announceGameWinner }
