import { Div } from '../utilities/types'
import { renderCompBoard } from './renderCompBoard'
import { renderPlayerBoard } from './renderPlayerBoard'
import { renderPlayerInfoScreen } from './renderPlayerInfoScreen'
import { renderShipSelectionBttns } from './renderShipSelectionBttns'
import { renderStartButton } from './renderStartButton'

const renderGamePage = function (playerName_: string) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const playerName = playerName_

	//remove main page content
	const greetingsContainer = document.querySelector('.greetings-container')
	greetingsContainer?.remove()
	const formContainer: Div = document.querySelector('.form-container')
	formContainer?.remove()

	//render
	renderPlayerInfoScreen(playerName)
	renderShipSelectionBttns()
	renderPlayerBoard()
}
export { renderGamePage }
