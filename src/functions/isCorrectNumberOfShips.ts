/**
 *  Checks if there are two destroyers and two frigates placed on the board
 *
 * @function
 * @param {string} ship_ - ship name
 * @param {string} amount_ - amount of ships
 * @returns {boolean | undefined}
 */
const isCorrectNumberOfShips = function (
	ship_: string,
	amount_: string
): boolean | undefined {
	// capitalizes first letters
	const ship = ship_[0].toUpperCase() + ship_.slice(1);
	const amount = amount_[0].toUpperCase() + amount_.slice(1);

	if (amount_ === 'single') {
		// for persistent state and enforces single ship
		if (!localStorage.getItem(`is${amount}${ship}`)) {
			localStorage.setItem(`is${amount}${ship}`, JSON.stringify(true));
		}
		return true;
	} else if (amount_ === 'double') {
		const shipObjArr: unknown[] = JSON.parse(localStorage.getItem(`${ship_}`) ?? '');

		if (shipObjArr.length < 2) {
			// for persistent state and enforces double ships
			if (!localStorage.getItem(`is${amount}${ship}`)) {
				localStorage.setItem(`is${amount}${ship}`, JSON.stringify(true));
			}
			return true;
		} else if (shipObjArr.length === 2) {
			localStorage.setItem(`is${amount}${ship}`, JSON.stringify(false));
			return false;
		}
	}
};

export { isCorrectNumberOfShips };
