import { CompShipsPlacementChoice, Div, NodesDiv } from '../utilities/types'
import {
	elemCreator,
	appendElemToParent,
	addTextToElem,
	addAttributeToElem,
	createImage,
	addEvtListener,
	addStyleToElem,
	pipe,
} from '../utilities/elementCreators'
import { handlePlayerClickOnCompShips } from '../events/handlePlayerClickOnCompShips'
import { handlePlayerClickOnCompMisses } from '../events/handlePlayerClickOnCompMisses'

const renderCompShipsOnBoard = function (
	compShipsPlacementChoice_: CompShipsPlacementChoice
) {
	const log = (i: unknown) => console.log('\n', i, '\n')

	const compShipsWrapper: Div = document.querySelector('.compShips-wrapper')

	const compShipsContainer = document.querySelector('.compShips-container')

	//persistent state management
	if (!localStorage.getItem('compShipsCoords')) {
		localStorage.setItem('compShipsCoords', JSON.stringify([]))
	}

	const compShipsCoords: string[] = JSON.parse(
		localStorage.getItem('compShipsCoords') ?? ''
	)

	Object.entries(compShipsPlacementChoice_).forEach(([ship, shipObj]) => {
		//store the compships obj in camelcase
		if (!localStorage.getItem(`comp${ship[0].toUpperCase() + ship.slice(1)}`)) {
			localStorage.setItem(
				`comp${ship[0].toUpperCase() + ship.slice(1)}`,
				JSON.stringify(shipObj)
			)
		}

		//for superdreadnought, carrier, battleship properties whose attributes do not consist of an array
		if (!Array.isArray(shipObj)) {
			Object.entries(shipObj).forEach(([shipSection, sectionCoords]) => {
				//grab the corresponding game board cell
				const shipCell: Div = document.querySelector(`[data-cellcomp="${sectionCoords}"]`)

				pipe(
					addAttributeToElem([['class', 'compShipPresent comp-gameCell']]),
					// addEvtListener('click')(handlePlayerClickOnCompShips),
					addTextToElem(`${ship[0].toUpperCase()}`),
					addStyleToElem([['background-color', 'lightgray']])
				)(shipCell)

				//store the co-ordinates
				compShipsCoords.push(sectionCoords)
			})
		} else {
			//for destroyers and frigates properties whose attributes consist of an array
			shipObj.forEach((ship) => {
				Object.entries(ship).forEach(([shipSection, sectionCoords]) => {
					//grab the corresponding game board cell
					const shipCell: Div = document.querySelector(
						`[data-cellcomp="${sectionCoords}"]`
					)

					pipe(
						addAttributeToElem([['class', 'compShipPresent comp-gameCell']]),
						// addEvtListener('click')(handlePlayerClickOnCompShips),
						addTextToElem(`${Object.keys(ship).length === 2 ? 'D' : 'F'}`),
						addStyleToElem([['background-color', 'lightgray']])
					)(shipCell)

					//store the co-ordinates
					compShipsCoords.push(sectionCoords)
				})
			})
		}
	})

	const compGameCells: NodesDiv = document.querySelectorAll('.comp-gameCell')

	//to differentiate between ships and empty spaces
	compGameCells.forEach((cell) => {
		if (!cell.classList.contains('compShipPresent')) {
			pipe(
				// addEvtListener('click')(handlePlayerClickOnCompMisses),
				addAttributeToElem([['class', 'compShipNotPresent comp-gameCell']]),
				addTextToElem('〰')
			)(cell)
		}
	})

	//put the coordinates in storage
	localStorage.setItem('compShipsCoords', JSON.stringify(compShipsCoords))
}

export { renderCompShipsOnBoard }
