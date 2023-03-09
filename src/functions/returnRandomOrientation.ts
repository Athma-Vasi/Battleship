/**
 * Returns a random orientation
 * @function
 * @returns {string} - 'horizontal' or 'vertical'
 */
function returnRandomOrientation(): 'horizontal' | 'vertical' {
	const randIndex = Math.floor(Math.random() * 2);
	return randIndex === 0 ? 'horizontal' : 'vertical';
}

export { returnRandomOrientation };
