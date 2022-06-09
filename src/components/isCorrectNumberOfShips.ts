//TODO: FIX destroyer and frigate duplicate logic

const isCorrectNumberOfShips = function (
	ship_: string,
	amount_: string
): boolean | undefined {
	//capitalize first letters
	const ship = ship_[0].toUpperCase() + ship_.slice(1)
	const amount = amount_[0].toUpperCase() + amount_.slice(1)

	if (amount_ === 'single') {
		// for persistent state and enforce single ship
		if (!localStorage.getItem(`is${amount}${ship}`)) {
			localStorage.setItem(`is${amount}${ship}`, JSON.stringify(true))
		}
		return true
	} else if (amount_ === 'double') {
		const shipObjArr: unknown[] = JSON.parse(localStorage.getItem(`${ship_}`) ?? '')
		// console.log(shipObjArr.length)

		if (shipObjArr.length < 2) {
			// for persistent state and enforce double ships
			if (!localStorage.getItem(`is${amount}${ship}`)) {
				localStorage.setItem(`is${amount}${ship}`, JSON.stringify(true))
			}
			return true
		} else if (shipObjArr.length === 2) {
			// console.log('false')
			localStorage.setItem(`is${amount}${ship}`, JSON.stringify(false))
			return false
		}
	}
}

export { isCorrectNumberOfShips }
