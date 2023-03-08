const restartGame = function (): void {
	localStorage.clear();
	window.scrollTo(0, 0);
	self.location.reload();
};
export { restartGame };
