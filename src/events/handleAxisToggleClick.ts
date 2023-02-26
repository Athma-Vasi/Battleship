const handleAxisToggleClick = function (this: HTMLButtonElement, ev: MouseEvent) {
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
