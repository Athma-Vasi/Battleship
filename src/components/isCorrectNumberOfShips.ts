const isCorrectNumberOfShips = function (ship_: string, amount_: string): boolean {
	//capitalize first letters
	const ship = ship_[0].toUpperCase() + ship_.slice(1)
	const amount = amount_[0].toUpperCase() + amount_.slice(1)

	// for persistent state and enforce single carrier
	if (!localStorage.getItem(`is${amount}${ship}`)) {
		localStorage.setItem(`is${amount}${ship}`, JSON.stringify(true))
	}
	return JSON.parse(localStorage.getItem(`is${amount}${ship}`) ?? '')
}

export { isCorrectNumberOfShips }
