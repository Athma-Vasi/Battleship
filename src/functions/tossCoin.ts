/**
 * Toss a coin
 * @function
 * @returns {boolean} - true or false
 */
function tossCoin(): boolean {
	return Math.random() > 0.5;
}

export { tossCoin };
