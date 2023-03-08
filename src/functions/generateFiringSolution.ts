import { generateAdjacentCoordsArr } from './generateAdjacentCoordsArr';

type GenerateFiringSolutionProps = {
	compHitOnPlayerCoordsSet: Set<string>;
	compMissOnPlayerCoordsSet: Set<string>;
};

function generateFiringSolution({
	compHitOnPlayerCoordsSet,
	compMissOnPlayerCoordsSet,
}: GenerateFiringSolutionProps): string {
	// generate a cloud of all adjacent coords of all previous hits
	// each of these adjacent coords that have not been previously fired upon will be used to generate ranked tuples
	const uniqueAdjacentCoords: string[] = Array.from(compHitOnPlayerCoordsSet)
		.flatMap((coord) => generateAdjacentCoordsArr(coord))
		.filter(
			(coord) =>
				!compMissOnPlayerCoordsSet.has(coord) && !compHitOnPlayerCoordsSet.has(coord)
		);

	// if there are no unique adjacent coords, meaning all surrounding coords
	// have been hit, return an empty string so that the caller can call the
	// random coord guess function
	if (uniqueAdjacentCoords.length === 0) return '';

	// create ranked tuples of the adjacent coords
	const adjCoordsRankedTuples: [string, number][] = uniqueAdjacentCoords.reduce(
		(rankedTuples: [string, number][], uniqueAdjCoord: string) => {
			// for each of the unique adjacent coords, we generate another cloud of
			// adjacent coords but this time with a radius of 2 and we count the
			// number of times these new coords intersect with previous hits

			// this approach favours coords that are on the same axes as prev hits
			// and can more reliably hit the adjacent coord in the same axis rather
			// than hunting in another axis
			const newAdjCoords: string[] = generateAdjacentCoordsArr(uniqueAdjCoord, 2);

			const coordScore: number = newAdjCoords.reduce(
				(score: number, newAdjCoord: string) => {
					if (compHitOnPlayerCoordsSet.has(newAdjCoord)) score += 1;

					return score;
				},
				0
			);

			rankedTuples.push([uniqueAdjCoord, coordScore]);

			return rankedTuples;
		},
		[]
	);

	const sortedAdjCoordsRankedTuples: [string, number][] = adjCoordsRankedTuples.sort(
		(a, b) => b[1] - a[1]
	);

	return sortedAdjCoordsRankedTuples[0][0];
}

export { generateFiringSolution };
