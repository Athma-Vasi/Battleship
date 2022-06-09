const handleStartButtonClick = function (this: HTMLButtonElement, ev: MouseEvent) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	if (!localStorage.getItem('gameRunning')) {
		localStorage.setItem('gameRunning', JSON.stringify(true))
	}

	let gameRunning = JSON.parse(localStorage.getItem('gameRunning') ?? '')

	while (gameRunning) {
		log('running')
		gameRunning = false
	}
	log('not running')
}

export { handleStartButtonClick }
