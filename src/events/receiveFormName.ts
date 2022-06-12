import { renderGamePage } from '../components/renderGamePage'

const receiveFormName = function (this: HTMLFormElement, ev: SubmitEvent) {
	ev.preventDefault()

	const formData = new FormData(this)
	const playerName = formData.get('form-name-input')?.toString() ?? ''

	//stores playerName to use for battle texts
	if (!localStorage.getItem('playerName')) {
		localStorage.setItem('playerName', JSON.stringify(playerName))
	}

	renderGamePage(playerName)
}
export { receiveFormName }
