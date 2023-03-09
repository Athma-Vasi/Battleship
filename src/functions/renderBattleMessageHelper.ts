import { battleTexts } from '../data/battleTexts';
import { Div, RandomizedHavenShipNames, RandomizedManticoreShipNames } from '../types';
import { createTypewriterEffect } from './createTypewriterEffect';
import { appendElemToParent, elemCreator } from './elementCreators';
import { tossCoin } from './tossCoin';

type RenderBattleMessageHelperProps = {
	towardsCombatant: 'player' | 'comp';
	firedStatus: 'hit' | 'miss' | 'sunk';
	shipTypeHit?: string;
	shipNumber?: number;
};

/**
 * Renders the battle message to the DOM by figuring out which ship was hit and which ship was fired upon and then determining the appropriate message to craft from the battleTexts pool of pre-made messages, and calling createTypewriterEffect to render the message
 *
 * @function
 * @param {string} towardsCombatant - 'player' or 'comp'
 * @param {string} firedStatus - 'hit', 'miss', or 'sunk'
 * @param {string} shipTypeHit - 'superdreadnought', 'carrier', 'battleship', 'destroyer', or 'frigate'
 * @param {number} shipNumber - 0 or 1 - used to determine the name of the destroyers or frigates (0 = first, 1 = second)
 * @param {string} playerName - player's name
 * @returns {Promise<void>}
 */
async function renderBattleMessageHelper({
	towardsCombatant,
	firedStatus,
	shipTypeHit,
	shipNumber,
}: RenderBattleMessageHelperProps): Promise<void> {
	// used in the front of the message
	const randHitsStrings = [
		'A hit on',
		'Direct hit on',
		'Shields weak on',
		'Hull integrity is weakening on',
		'Impellers damaged on',
		'Engines are out on',
		'Weapons systems offline on',
		'Life support failing on',
		'Structural damage on',
		'Reactor breach on',
		'Target immobilized on',
		'Power systems fluctuating on',
		'Navigational systems down on',
		'Communication systems disabled on',
		'Gravity generators failing on',
		'Primary sensor array damaged on',
		'Secondary defenses compromised on',
		'Point defense systems offline on',
		'Missile tubes destroyed on',
	];
	const hitsPrecursorString = () =>
		randHitsStrings[Math.floor(Math.random() * randHitsStrings.length)];

	const havenShipNames: RandomizedHavenShipNames = JSON.parse(
		localStorage.getItem('havenShipNames') ?? JSON.stringify({})
	);
	const manticoreShipNames: RandomizedManticoreShipNames = JSON.parse(
		localStorage.getItem('manticoreShipNames') ?? JSON.stringify({})
	);

	const playerName = JSON.parse(localStorage.getItem('playerName') ?? '');

	const battleMessageContainer: Div = document.querySelector('.battleMessage-container');

	const battleMessageElem = elemCreator('p')(['battleMessageElem']);
	appendElemToParent(battleMessageContainer)(battleMessageElem);

	const today = new Date();
	const formatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});
	const formattedTime = formatter.format(today);

	let shipName = '';
	if (towardsCombatant === 'comp') {
		// the shipTypeHit is not passed in when the firedStatus is 'miss'
		if (shipTypeHit) {
			switch (shipTypeHit) {
				case 'superdreadnought': {
					shipName = havenShipNames.superdreadnought;
					break;
				}
				case 'carrier': {
					shipName = havenShipNames.carrier;
					break;
				}
				case 'battleship': {
					shipName = havenShipNames.battleship;
					break;
				}
				case 'destroyer': {
					// shipNumber can be either 0 or 1 or undefined
					if (shipNumber !== undefined) {
						shipName = havenShipNames.destroyers[shipNumber];
					}
					break;
				}
				case 'frigate': {
					if (shipNumber !== undefined) {
						shipName = havenShipNames.frigates[shipNumber];
					}
					break;
				}
				default: {
					break;
				}
			}
		}
	} else if (towardsCombatant === 'player') {
		if (shipTypeHit) {
			switch (shipTypeHit) {
				case 'superdreadnought': {
					shipName = manticoreShipNames.superdreadnought;
					break;
				}
				case 'carrier': {
					shipName = manticoreShipNames.carrier;
					break;
				}
				case 'battleship': {
					shipName = manticoreShipNames.battleship;
					break;
				}
				case 'destroyer': {
					if (shipNumber !== undefined) {
						shipName = manticoreShipNames.destroyers[shipNumber];
					}
					break;
				}
				case 'frigate': {
					if (shipNumber !== undefined) {
						shipName = manticoreShipNames.frigates[shipNumber];
					}
					break;
				}
				default: {
					break;
				}
			}
		}
	}

	if (towardsCombatant === 'comp') {
		const statusText =
			firedStatus === 'hit'
				? battleTexts.hitsOnShip[
						Math.floor(Math.random() * battleTexts.hitsOnShip.length)
				  ]
				: firedStatus === 'miss'
				? battleTexts.missesOnShip[
						Math.floor(Math.random() * battleTexts.missesOnShip.length)
				  ]
				: firedStatus === 'sunk'
				? battleTexts.compShipDestroyed[
						Math.floor(Math.random() * battleTexts.compShipDestroyed.length)
				  ]
				: '';

		const randomNumStrings = ['two', 'three', 'four', 'five', 'six', 'seven'];
		const sunkOnlyText =
			firedStatus === 'sunk'
				? `Sir, ${
						randomNumStrings[Math.floor(Math.random() * randomNumStrings.length)]
				  } cross confirmations!`
				: '';

		// if ship was hit or sunk
		if (shipTypeHit) {
			const battleMessageStrings = [
				`${formattedTime}:: ${
					tossCoin() ? `Admiral ${playerName}!` : ''
				} ${hitsPrecursorString()} the PNS ${shipName}! ${sunkOnlyText} ${statusText}`,
			];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		}
		// if ship was missed
		else {
			const battleMessageStrings = [`${formattedTime}::	${statusText}`];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		}
	} else if (towardsCombatant === 'player') {
		// if a miss towards player, message is not displayed
		if (!shipTypeHit) return;

		// only adds text if ship was hit or sunk
		const statusText =
			firedStatus === 'hit'
				? battleTexts.damageOnShip[
						Math.floor(Math.random() * battleTexts.damageOnShip.length)
				  ]
				: firedStatus === 'sunk'
				? battleTexts.playerShipDestroyed[
						Math.floor(Math.random() * battleTexts.playerShipDestroyed.length)
				  ]
				: '';

		if (firedStatus === 'hit') {
			const battleMessageStrings = [
				`${formattedTime}::	${
					tossCoin() ? `Admiral ${playerName}!` : ''
				} ${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! ${statusText}`,
			];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		} else if (firedStatus === 'sunk') {
			const battleMessageStrings = [
				`${formattedTime}::	${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! Admiral ${playerName}! Core breach detected!
				...
				Sir, she's gone... Dear God, all those people... `,
			];

			createTypewriterEffect({
				containerElem: battleMessageContainer,
				strings: battleMessageStrings,
				speed: 25,
			});
		}
	}
}
export { renderBattleMessageHelper };
