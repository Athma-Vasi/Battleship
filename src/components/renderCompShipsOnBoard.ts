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

	Object.entries(compShipsPlacementChoice_).forEach(([ship, shipObj]) => {
		//for superdreadnought, carrier, battleship properties which do not have an array attribute
		if (!Array.isArray(shipObj)) {
			Object.entries(shipObj).forEach(([shipSection, sectionCoords]) => {
				//grab the specific game board cell based
				const shipCell: Div = document.querySelector(`[data-cellComp="${sectionCoords}"]`)

				pipe(
					addAttributeToElem([['class', 'compShipPresent']]),
					addEvtListener('click')(handlePlayerClickOnCompShips),
					addTextToElem(`${ship[0].toUpperCase()}`),
					addStyleToElem([['background-color', 'lightgray']])
				)(shipCell)
			})
		} else {
			//for destroyers and frigates properties which have an array attribute
			shipObj.forEach((ship) => {
				Object.entries(ship).forEach(([shipSection, sectionCoords]) => {
					//grab the specific game board cell based
					const shipCell: Div = document.querySelector(
						`[data-cellComp="${sectionCoords}"]`
					)

					pipe(
						addAttributeToElem([['class', 'compShipPresent']]),
						addEvtListener('click')(handlePlayerClickOnCompShips),
						addTextToElem(`${Object.keys(ship).length === 2 ? 'D' : 'F'}`),
						addStyleToElem([['background-color', 'lightgray']])
					)(shipCell)
				})
			})
		}
	})

	const compGameCells: NodesDiv = document.querySelectorAll('.comp-gameCell')

	//to differentiate between ships and empty spaces
	compGameCells.forEach((cell) => {
		if (!cell.classList.contains('compShipPresent')) {
			pipe(
				addEvtListener('click')(handlePlayerClickOnCompMisses),
				addAttributeToElem([['class', 'compShipNotPresent']]),
				addTextToElem('*')
			)(cell)
		}
	})

	//persistent state management

	if (!localStorage.getItem('compShipsCoords')) {
		localStorage.setItem('compShipsCoords', JSON.stringify([]))
	}
}

export { renderCompShipsOnBoard }
