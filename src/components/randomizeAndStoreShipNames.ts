import { ShipNamesPool } from '../utilities/types'

const randomizeAndStoreShipNames = function (shipNames_: ShipNamesPool) {
	if (!localStorage.getItem('playerShipNames')) {
		localStorage.setItem('playerShipNames', JSON.stringify([]))
	}

	//creates a randomized ship name per game session
	Object.entries(shipNames_).forEach(([polity, shipTypes]) => {
		if (polity === 'haven') {
			const havenShipNames = new Map()

			Object.entries(shipTypes).forEach(([shipType, shipNamesArr]) => {
				//need two names for destroyers and frigates
				if (shipType === 'destroyers' || shipType === 'frigates') {
					const tempShipNamesArr = [
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
					]

					havenShipNames.set(shipType, tempShipNamesArr)
				} else {
					//only one name for superdreadnought, cruiser and battleship
					havenShipNames.set(
						shipType.slice(0, -1),
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]
					)
				}
			})

			localStorage.setItem(
				'havenShipNames',
				JSON.stringify(Object.fromEntries(havenShipNames))
			)
		} else if (polity === 'manticore') {
			const manticoreShipNames = new Map()

			Object.entries(shipTypes).forEach(([shipType, shipNamesArr]) => {
				//need two names for destroyers and frigates
				if (shipType === 'destroyers' || shipType === 'frigates') {
					const tempShipNamesArr = [
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
					]

					manticoreShipNames.set(shipType, tempShipNamesArr)
				} else {
					//only one name for superdreadnought, cruiser and battleship
					manticoreShipNames.set(
						shipType.slice(0, -1),
						shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]
					)
				}
			})

			localStorage.setItem(
				'manticoreShipNames',
				JSON.stringify(Object.fromEntries(manticoreShipNames))
			)
		}
	})
}
export { randomizeAndStoreShipNames }
