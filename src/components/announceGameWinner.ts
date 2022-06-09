import { handlePlayerClickOnCompMisses } from '../events/handlePlayerClickOnCompMisses'
import { handlePlayerClickOnCompShips } from '../events/handlePlayerClickOnCompShips'
import {
	addTextToElem,
	appendElemToParent,
	elemCreator,
	removeEvtListener,
	pipe,
} from '../utilities/elementCreators'
import { Div, NodesDiv } from '../utilities/types'
import { preventClicksAfterWin } from './preventClicksAfterWin'

const announceGameWinner = function (winner_: string) {
	const headerContainer: Div = document.querySelector('.header-container')

	const winnerContainer = elemCreator('div')(['winner-container'])
	appendElemToParent(headerContainer)(winnerContainer)

	if (winner_ === 'comp') {
		pipe(
			addTextToElem('Oh no! Computer won! Click Restart to play again!'),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']))

		//remove event listeners after win
		preventClicksAfterWin()
	} else {
		pipe(
			addTextToElem(`Congrats ${winner_}! You won! Click Restart to play again!`),
			appendElemToParent(winnerContainer)
		)(elemCreator('p')(['winner-announcement']))

		//remove event listeners after win
		preventClicksAfterWin()
	}
}
export { announceGameWinner }
