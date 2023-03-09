type BeforeAfterShipCellsFiredUponStatusProps = {
	shipType?: 'Superdreadnought' | 'Carrier' | 'Battleship' | 'Destroyers' | 'Frigates';
	coordsArr: string[];
	compShipsHitCoordsSet: Set<string>;
	compShipsMissesCoordsSet: Set<string>;
};

function beforeAfterShipCellsFiredUponStatus({
	shipType,
	coordsArr,
	compShipsHitCoordsSet,
	compShipsMissesCoordsSet,
}: BeforeAfterShipCellsFiredUponStatusProps): {
	isBeforeShipCellFiredUpon: boolean;
	isAfterShipCellFiredUpon: boolean;
} {
	// since frigates are only one cells each, both directions must be checked
	// to determine if the frigate is surrounded
	if (shipType === 'Frigates') {
		// no sorting as frigate coords are only one cell each
		const frigateCell = coordsArr[0];
		const frigateCellX = parseInt(frigateCell.split(',')[0]);
		const frigateCellY = parseInt(frigateCell.split(',')[1]);

		// top cell
		const topCell = `${frigateCellX},${frigateCellY - 1}`;
		const topCellWithinBounds = parseInt(topCell.split(',')[1]) >= 0;
		// right cell
		const rightCell = `${frigateCellX + 1},${frigateCellY}`;
		const rightCellWithinBounds = parseInt(rightCell.split(',')[0]) <= 9;
		// bottom cell
		const bottomCell = `${frigateCellX},${frigateCellY + 1}`;
		const bottomCellWithinBounds = parseInt(bottomCell.split(',')[1]) <= 9;
		// left cell
		const leftCell = `${frigateCellX - 1},${frigateCellY}`;
		const leftCellWithinBounds = parseInt(leftCell.split(',')[0]) >= 0;

		// if the cells are not within bounds, they are considered to have been fired upon
		const isTopCellFiredUpon = topCellWithinBounds
			? compShipsHitCoordsSet.has(topCell) || compShipsMissesCoordsSet.has(topCell)
			: true;
		const isRightCellFiredUpon = rightCellWithinBounds
			? compShipsHitCoordsSet.has(rightCell) || compShipsMissesCoordsSet.has(rightCell)
			: true;
		const isBottomCellFiredUpon = bottomCellWithinBounds
			? compShipsHitCoordsSet.has(bottomCell) || compShipsMissesCoordsSet.has(bottomCell)
			: true;
		const isLeftCellFiredUpon = leftCellWithinBounds
			? compShipsHitCoordsSet.has(leftCell) || compShipsMissesCoordsSet.has(leftCell)
			: true;

		const isBeforeShipCellFiredUpon = isTopCellFiredUpon && isLeftCellFiredUpon;
		const isAfterShipCellFiredUpon = isRightCellFiredUpon && isBottomCellFiredUpon;

		return {
			isBeforeShipCellFiredUpon,
			isAfterShipCellFiredUpon,
		};
	}

	// following is for all other ship types except frigates
	// need  to sort the coords because they were grabbed from an object and
	// JS does not guarantee the order of the keys in an object
	const coordsArrClone = structuredClone(coordsArr);
	const sortedCoordsArr = coordsArrClone.sort((a, b) => {
		const aX = parseInt(a.split(',')[0].replace('"', ''));
		const aY = parseInt(a.split(',')[1].replace('"', ''));
		const bX = parseInt(b.split(',')[0].replace('"', ''));
		const bY = parseInt(b.split(',')[1].replace('"', ''));

		if (aX < bX) return -1;
		if (aX > bX) return 1;
		if (aY < bY) return -1;
		if (aY > bY) return 1;

		return 0;
	});

	// determine the direction of the ship
	const firstCoord = sortedCoordsArr[0];
	const lastCoord = sortedCoordsArr[sortedCoordsArr.length - 1];

	const firstCoordXY = firstCoord.split(',');
	const lastCoordXY = lastCoord.split(',');
	const firstCoordX = parseInt(firstCoordXY[0].replace('"', ''));
	const firstCoordY = parseInt(firstCoordXY[1].replace('"', ''));
	const lastCoordX = parseInt(lastCoordXY[0].replace('"', ''));
	const lastCoordY = parseInt(lastCoordXY[1].replace('"', ''));
	const isHorizontal = firstCoordY === lastCoordY;
	// const isVertical = firstCoordX === lastCoordX;

	// determine the cells just before and just after the ship
	const beforeShipCell = isHorizontal
		? `${firstCoordX - 1},${firstCoordY}`
		: `${firstCoordX},${firstCoordY - 1}`;
	const beforeShipCellX = parseInt(beforeShipCell.split(',')[0]);
	const beforeShipCellY = parseInt(beforeShipCell.split(',')[1]);
	const beforeShipCellWithinBounds = isHorizontal
		? beforeShipCellX <= 9 && beforeShipCellX >= 0
		: beforeShipCellY <= 9 && beforeShipCellY >= 0;
	// if the cell is not within bounds, it is considered to have been fired upon
	const isBeforeShipCellFiredUpon = beforeShipCellWithinBounds
		? compShipsHitCoordsSet.has(beforeShipCell) ||
		  compShipsMissesCoordsSet.has(beforeShipCell)
		: true;

	const afterShipCell = isHorizontal
		? `${lastCoordX + 1},${lastCoordY}`
		: `${lastCoordX},${lastCoordY + 1}`;
	const afterShipCellX = parseInt(afterShipCell.split(',')[0]);
	const afterShipCellY = parseInt(afterShipCell.split(',')[1]);
	const afterShipCellWithinBounds = isHorizontal
		? afterShipCellX <= 9 && afterShipCellX >= 0
		: afterShipCellY <= 9 && afterShipCellY >= 0;
	// if the cell is not within bounds, it is considered to have been fired upon
	const isAfterShipCellFiredUpon = afterShipCellWithinBounds
		? compShipsHitCoordsSet.has(afterShipCell) ||
		  compShipsMissesCoordsSet.has(afterShipCell)
		: true;

	return {
		isBeforeShipCellFiredUpon,
		isAfterShipCellFiredUpon,
	};
}

export { beforeAfterShipCellsFiredUponStatus };
