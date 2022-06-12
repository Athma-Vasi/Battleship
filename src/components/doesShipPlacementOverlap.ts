const doesShipPlacementOverlap = function (
	shipLength_: number,
	currentAxis_: string,
	currentX_: string,
	currentY_: string
) {
	//initializes on first call for overlap detection
	if (!localStorage.getItem('playerShipsCoords')) {
		localStorage.setItem('playerShipsCoords', JSON.stringify([]))
	}
	let playerShipsCoords: string[] = JSON.parse(
		localStorage.getItem('playerShipsCoords') ?? ''
	)

	if (currentAxis_ === 'Axis-X') {
		for (let i = 0; i < shipLength_; i += 1) {
			//overlap detection
			if (playerShipsCoords.includes(`${Number(currentX_) + i},${currentY_}`)) {
				alert(
					'A ship is already present at these coordinates. Please choose another area.'
				)
				return true
			}
		}
	} else if (currentAxis_ === 'Axis-Y') {
		for (let i = 0; i < shipLength_; i += 1) {
			if (playerShipsCoords.includes(`${currentX_},${Number(currentY_) + i}`)) {
				alert(
					'A ship is already present at these coordinates. Please choose another area.'
				)
				return true
			}
		}
	}
}
export { doesShipPlacementOverlap }
