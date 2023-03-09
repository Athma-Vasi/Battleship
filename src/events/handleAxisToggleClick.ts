/**
 * Modifies the textContent of the button to toggle between 'Axis-X' and 'Axis-Y' when clicked.
 *
 * @function
 * @param {HTMLButtonElement} this - The button that was clicked.
 * @param {MouseEvent} ev - The event object.
 * @returns {void}
 */
const handleAxisToggleClick = function (this: HTMLButtonElement, ev: MouseEvent): void {
	const currentText = this.textContent;

	if (currentText === 'Axis-X') {
		this.textContent = '';
		this.textContent = 'Axis-Y';
	} else if (currentText === 'Axis-Y') {
		this.textContent = '';
		this.textContent = 'Axis-X';
	}
};
export { handleAxisToggleClick };
