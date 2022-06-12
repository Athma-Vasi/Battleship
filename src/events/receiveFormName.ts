import { renderGamePage } from '../components/renderGamePage'
import { renderPlayerBoard } from '../components/renderPlayerBoard'

const receiveFormName = function (this: HTMLFormElement, ev: SubmitEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	ev.preventDefault()

	const formData = new FormData(this)
	const playerName = formData.get('form-name-input')?.toString() ?? ''

	//store playerName to use for battle texts
	if (!localStorage.getItem('playerName')) {
		localStorage.setItem('playerName', JSON.stringify(playerName))
	}

	renderGamePage(playerName)
}
export { receiveFormName }
