import { Div } from '../utilities/types'
import { renderCompBoard } from './renderCompBoard'
import { renderPlayerBoard } from './renderPlayerBoard'
import { renderShipSelectionBttns } from './renderShipSelectionBttns'
import { renderStartButton } from './renderStartButton'

const renderGamePage = function () {
	const log = (i: unknown) => console.log('\n', i, '\n')

	//remove main page content
	const formContainer: Div = document.querySelector('.form-container')
	formContainer?.remove()

	//render
	renderShipSelectionBttns()
	renderPlayerBoard()
	renderCompBoard()
}
export { renderGamePage }
