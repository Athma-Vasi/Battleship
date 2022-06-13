// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utilities/elementCreators.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEvtListener = exports.pipe = exports.elemCreator = exports.createImage = exports.appendElemToParent = exports.addTextToElem = exports.addStyleToElem = exports.addEvtListener = exports.addAttributeToElem = void 0;

var elemCreator = function elemCreator(elem_) {
  return function (class_) {
    var element = document.createElement(elem_);
    return class_.reduce(function (elem, currClass) {
      elem.classList.add(currClass);
      return elem;
    }, element);
  };
};

exports.elemCreator = elemCreator;

var addAttributeToElem = function addAttributeToElem(attrVals_) {
  return function (elem_) {
    return attrVals_.reduce(function (element, curr) {
      if (curr.length > 2) return undefined;
      element === null || element === void 0 ? void 0 : element.setAttribute(curr[0], curr[1]);
      return element;
    }, elem_);
  };
};

exports.addAttributeToElem = addAttributeToElem;

var addStyleToElem = function addStyleToElem(stylePropVals_) {
  return function (elem_) {
    return stylePropVals_.reduce(function (element, curr) {
      if (curr.length > 2) return undefined;
      element === null || element === void 0 ? void 0 : element.style.setProperty(curr[0], curr[1]);
      return element;
    }, elem_);
  };
};

exports.addStyleToElem = addStyleToElem;

var addTextToElem = function addTextToElem(text_) {
  return function (elem_) {
    var textNode = document.createTextNode(text_);
    elem_ === null || elem_ === void 0 ? void 0 : elem_.appendChild(textNode);
    return elem_;
  };
};

exports.addTextToElem = addTextToElem;

var appendElemToParent = function appendElemToParent(parent_) {
  return function (child_) {
    if (child_) parent_ === null || parent_ === void 0 ? void 0 : parent_.appendChild(child_);
  };
};

exports.appendElemToParent = appendElemToParent;

var createImage = function createImage(source_) {
  return function (class_) {
    return function (alt_) {
      return function (title_) {
        var image = new Image();
        image.src = source_;
        image.alt = alt_;
        image.title = title_;
        return class_.reduce(function (elem, currClass) {
          elem.classList.add(currClass);
          return elem;
        }, image);
      };
    };
  };
};

exports.createImage = createImage;

var addEvtListener = function addEvtListener(evt_) {
  return function (handleEvt_) {
    return function (elem_) {
      elem_ === null || elem_ === void 0 ? void 0 : elem_.addEventListener(evt_, handleEvt_);
      return elem_;
    };
  };
};

exports.addEvtListener = addEvtListener;

var removeEvtListener = function removeEvtListener(evt_) {
  return function (handleEvt_) {
    return function (elem_) {
      elem_ === null || elem_ === void 0 ? void 0 : elem_.removeEventListener(evt_, handleEvt_);
      return elem_;
    };
  };
};

exports.removeEvtListener = removeEvtListener;

var pipe = function pipe() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (value) {
    return funcs.reduce(function (res, func) {
      return func(res);
    }, value);
  };
};

exports.pipe = pipe;
},{}],"components/renderPlayerBoard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPlayerBoard = void 0;

var _elementCreators = require("../utilities/elementCreators");

var renderPlayerBoard = function renderPlayerBoard() {
  var main = document.querySelector('.main');
  var bothBoardsContainer = (0, _elementCreators.elemCreator)('div')(['bothBoards-container']);
  (0, _elementCreators.appendElemToParent)(main)(bothBoardsContainer);
  var playerBoardWrapper = (0, _elementCreators.elemCreator)('div')(['playerBoard-wrapper']);
  (0, _elementCreators.appendElemToParent)(bothBoardsContainer)(playerBoardWrapper);
  var playerBoardContainer = (0, _elementCreators.elemCreator)('div')(['playerBoard-container']);
  (0, _elementCreators.appendElemToParent)(playerBoardWrapper)(playerBoardContainer);

  for (var i = 0; i < 10; i += 1) {
    for (var j = 0; j < 10; j += 1) {
      //renders a div per iteration of for-loop and append
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['data-cellplayer', "".concat(j, ",").concat(i)]]), (0, _elementCreators.appendElemToParent)(playerBoardContainer))((0, _elementCreators.elemCreator)('div')(['player-gameCell']));
    }
  }
};

exports.renderPlayerBoard = renderPlayerBoard;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"components/renderPlayerInfoScreen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPlayerInfoScreen = void 0;

var _elementCreators = require("../utilities/elementCreators");

var renderPlayerInfoScreen = function renderPlayerInfoScreen(playerName_) {
  var main = document.querySelector('.main');
  var infoScreenWrapper = (0, _elementCreators.elemCreator)('div')(['preBattle-infoScreen']);
  (0, _elementCreators.appendElemToParent)(main)(infoScreenWrapper);
  var infoScreenContainer = (0, _elementCreators.elemCreator)('div')(['infoScreen-container']);
  (0, _elementCreators.appendElemToParent)(infoScreenWrapper)(infoScreenContainer);
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Shall we allow our audacious enemies to violate with impunity the territory of the Kingdom? Will you permit the fleet to escape which has carried terror into your families? You will not! March, then, to meet them. Teach the galaxy that a malediction attends those that violate the territory of the Star Kingdom and her allies!"), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)('p')(['greetings', 'infoScreen']));
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("You are about to embark upon the Great Battle, toward which we have striven these many months. The eyes of the galaxy are upon you. The hopes and prayers of liberty-loving people everywhere march with you. In company with our brave Allies and brothers-in-arms on other Sectors, you will bring about the destruction of the Haven war machine, the eliminations of their tyranny over oppressed people, and the security for ourselves in a free galaxy!"), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)('p')(['greetings', 'infoScreen']));
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Ready fleet formation, Admiral ".concat(playerName_, ".")), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)('p')(['greetings', 'infoScreen']));
};

exports.renderPlayerInfoScreen = renderPlayerInfoScreen;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleAxisToggleClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAxisToggleClick = void 0;

var handleAxisToggleClick = function handleAxisToggleClick(ev) {
  var currentText = this.textContent;

  if (currentText === 'Axis-X') {
    this.textContent = '';
    this.textContent = 'Axis-Y';
  } else if (currentText === 'Axis-Y') {
    this.textContent = '';
    this.textContent = 'Axis-X';
  }
};

exports.handleAxisToggleClick = handleAxisToggleClick;
},{}],"components/accumulatePlayerShipCoords.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accumulatePlayerShipCoords = void 0;

var accumulatePlayerShipCoords = function accumulatePlayerShipCoords(currentShipCoords_) {
  var _a;

  var playerShipsCoords = JSON.parse((_a = localStorage.getItem('playerShipsCoords')) !== null && _a !== void 0 ? _a : ''); //adds currentship coordinate to rest of ships

  currentShipCoords_.forEach(function (coord) {
    return playerShipsCoords.push(coord);
  });
  localStorage.setItem('playerShipsCoords', JSON.stringify(playerShipsCoords));
};

exports.accumulatePlayerShipCoords = accumulatePlayerShipCoords;
},{}],"components/renderStarsInPlayerBoard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderStarsInPlayerBoard = void 0;

var _elementCreators = require("../utilities/elementCreators");

var renderStarsInPlayerBoard = function renderStarsInPlayerBoard() {
  var playerGameCell = document.querySelectorAll('.player-gameCell'); //adds stars and a corresponding class to differentiate the cells which do not consist of a player ship

  playerGameCell.forEach(function (cell) {
    if (!cell.classList.contains('playerShipPresent')) {
      (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('✴'), (0, _elementCreators.addAttributeToElem)([['class', 'player-gameCell playerShipNotPresent']]))(cell);
    }
  });
};

exports.renderStarsInPlayerBoard = renderStarsInPlayerBoard;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"components/preventClicksAfterWin.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preventClicksAfterWin = void 0;

var _handlePlayerClickOnCompMisses = require("../events/handlePlayerClickOnCompMisses");

var _handlePlayerClickOnCompShips = require("../events/handlePlayerClickOnCompShips");

var _elementCreators = require("../utilities/elementCreators");

var preventClicksAfterWin = function preventClicksAfterWin() {
  var compShipPresent = document.querySelectorAll('.compShipPresent');
  var compShipNotPresent = document.querySelectorAll('.compShipNotPresent'); //prevents further clicks after winner is announced

  compShipPresent.forEach(function (cell) {
    (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(_handlePlayerClickOnCompShips.handlePlayerClickOnCompShips))(cell);
  });
  compShipNotPresent.forEach(function (cell) {
    (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(_handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses))(cell);
  });
};

exports.preventClicksAfterWin = preventClicksAfterWin;
},{"../events/handlePlayerClickOnCompMisses":"events/handlePlayerClickOnCompMisses.ts","../events/handlePlayerClickOnCompShips":"events/handlePlayerClickOnCompShips.ts","../utilities/elementCreators":"utilities/elementCreators.ts"}],"components/restartGame.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restartGame = void 0;

var restartGame = function restartGame() {
  localStorage.clear();
  self.location.reload();
};

exports.restartGame = restartGame;
},{}],"components/announceGameWinner.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.announceGameWinner = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _preventClicksAfterWin = require("./preventClicksAfterWin");

var _restartGame = require("./restartGame");

var announceGameWinner = function announceGameWinner(winner_) {
  var main = document.querySelector('.main');
  var winnerContainer = (0, _elementCreators.elemCreator)('div')(['winner-container']);
  (0, _elementCreators.appendElemToParent)(main)(winnerContainer);
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Restart'), (0, _elementCreators.addEvtListener)('click')(_restartGame.restartGame), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)('button')(['bttn-restart']));

  if (winner_ === 'comp') {
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Fall back and regroup! We will not surrender!'), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)('p')(['winner-announcement'])); //removes event listeners after win

    (0, _preventClicksAfterWin.preventClicksAfterWin)();
  } else {
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Congrats ".concat(winner_, "! You have destroyed the Haven Fleet!")), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)('p')(['winner-announcement']));
    (0, _preventClicksAfterWin.preventClicksAfterWin)();
  } //prevents computers turn from adding evt listeners back on


  localStorage.setItem('isGameWon', JSON.stringify(true));
};

exports.announceGameWinner = announceGameWinner;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./preventClicksAfterWin":"components/preventClicksAfterWin.ts","./restartGame":"components/restartGame.ts"}],"data/battleTexts.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.battleTexts = void 0;
var battleTexts = {
  hitsOnComp: ['A hit, Sir!', 'Direct hit, Sir!', 'We must have taken out her forward impellers!', 'Direct hit on their com section!', 'We just took out most of her missile tracking capability!', 'One hit, port side aft!', 'A hit, Sir! At least one, and—', 'Her forward impellers are down!', 'Roll port! All batteries, engage!', 'Engage with forward batteries!', "They're taking the bait, Sir!", 'Formation Reno, Com—get those cruisers in tighter!', 'Recompute firing pattern.'],
  missesByPlayer: ['The enemy has returned fire!', 'Tracking reports sixteen incoming, Sir!', 'Enemy jamming primary tracking systems!', 'Enemy countermeasures active!', 'Crossing minefield attack perimeter—now!'],
  playerShipDestroyed: ["Sir, it's gone... Dear God, all those people..."],
  hitsOnPlayer: ["Forward hold open to space! Mooring Tractor One's gone! Heavy casualties in Fusion One!", "We've lost Damage Control Three, Sir!", "Missile One is down, Sir! We're down to one tube.", 'Spinal Four gone, Sir!', "We've lost the secondary fire control sensors!. Primaries unaffected.", 'Damage control to the bridge! Corpsman to the bridge!', "Fusion One, Sir! The mag bottle's fluctuating and can't be shut down from here—something's cut the circuits!", "Sir, we're down to twelve birds for Missile Two, and out of laser heads.", 'Heavy damage aft! No contact at all with Two-Four or Two-Six.', "Sir, we've lost a beta node; our acceleration is dropping.", "We've lost another beta node, Sir", "Point defense is hurt bad, Sir! We've lost four laser clusters and half our phased radar array.", "We've lost an energy torpedo and Number Two Laser out of the starboard broadside, but at least the starboard sidewall is still up.", 'Tractor Seven is gone!', 'Compartments Eight-Niner-Two and Niner-Three open to space. No casualties!', 'Two hits forward! Laser Three and Five destroyed. Radar Five is gone, Sir! Heavy casualties in Laser Three!', 'Missile Two-One and Graser One gone! Heavy damage in the boat bay and Berthing Compartment Seven-five!'],
  missesByComp: ['They missed! Counter missiles now!', 'Ha! Go to rapid fire on all tubes!', "We won't get another chance! Get those impellers back for me, Lieutenant!", 'A miss! Increase acceleration to max!', "This is our chance! Close the range. We'll finish her with energy fire!", 'Missiles at three-five-two! Lucky this time..', 'Hard a starboard!', 'Pursuit vector, maximum acceleration!', 'General signal to all heavy cruisers. Return to formation at once. Repeat, return to formation at once!'],
  compShipDestroyed: ["Yes! She's streaming air, Sir!"]
};
exports.battleTexts = battleTexts;
},{}],"components/renderBattleMessage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBattleMessageElem = void 0;

var _battleTexts = require("../data/battleTexts");

var _elementCreators = require("../utilities/elementCreators");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renderBattleMessageElem = function renderBattleMessageElem(currentCellCoord_, currentShipSymbol_, towardsCombatant_, hitOrMiss_) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

  var randHitsStrings = ['A hit on', 'Direct hit on', 'Shields weak on', 'Hull integrity is weakening on', 'Impellers damaged on'];
  var hitsPrecursorString = randHitsStrings[Math.floor(Math.random() * randHitsStrings.length)];
  var havenShipNames = JSON.parse((_a = localStorage.getItem('havenShipNames')) !== null && _a !== void 0 ? _a : '');
  var manticoreShipNames = JSON.parse((_b = localStorage.getItem('manticoreShipNames')) !== null && _b !== void 0 ? _b : '');
  var playerName = JSON.parse((_c = localStorage.getItem('playerName')) !== null && _c !== void 0 ? _c : '');
  var infoScreenWrapper = document.querySelector('.infoScreen-wrapper');
  var battleMessageElem = (0, _elementCreators.elemCreator)('p')(['battleMessageElem']);
  (0, _elementCreators.appendElemToParent)(infoScreenWrapper)(battleMessageElem);

  if (towardsCombatant_ === 'comp') {
    //checks what compShip currentCellCoord_ is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
    var compSuperdreadnought = Object.values(JSON.parse((_d = localStorage.getItem('compSuperdreadnought')) !== null && _d !== void 0 ? _d : ''));
    var compCarrier = Object.values(JSON.parse((_e = localStorage.getItem('compCarrier')) !== null && _e !== void 0 ? _e : ''));
    var compBattleship = Object.values(JSON.parse((_f = localStorage.getItem('compBattleship')) !== null && _f !== void 0 ? _f : '')); //destroyers consists of an array of objects

    var compDestroyers = [];
    JSON.parse((_g = localStorage.getItem('compDestroyers')) !== null && _g !== void 0 ? _g : '').forEach(function (destroyer) {
      compDestroyers.push(Object.values(destroyer));
    });
    compDestroyers = compDestroyers.flat(); //frigates consists of an array of objects

    var compFrigates = [];
    JSON.parse((_h = localStorage.getItem('compFrigates')) !== null && _h !== void 0 ? _h : '').forEach(function (frigate) {
      compFrigates.push(Object.values(frigate));
    });
    compFrigates = compFrigates.flat();

    if (hitOrMiss_ === 'hit') {
      //player attacking computer scores a hit
      if (compSuperdreadnought.includes(currentCellCoord_)) {
        //displays hit on superdreadnought with randomized text
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("".concat(playerName, "'s turn: ").concat(hitsPrecursorString, " the superdreadnought PNS ").concat(havenShipNames.superdreadnought, "! ").concat(_battleTexts.battleTexts.hitsOnComp[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnComp.length)])))(battleMessageElem);
      } else if (compCarrier.includes(currentCellCoord_)) {
        //displays hit on carrier with randomized text
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("".concat(playerName, "'s turn: ").concat(hitsPrecursorString, " the carrier PNS ").concat(havenShipNames.cruiser, "! ").concat(_battleTexts.battleTexts.hitsOnComp[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnComp.length)])))(battleMessageElem);
      } else if (compBattleship.includes(currentCellCoord_)) {
        //displays hit on battleship with randomized text
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("".concat(playerName, "'s turn: ").concat(hitsPrecursorString, " the battleship PNS ").concat(havenShipNames.battleship, "! ").concat(_battleTexts.battleTexts.hitsOnComp[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnComp.length)])))(battleMessageElem);
      } else if (compDestroyers.includes(currentCellCoord_)) {
        //there are two destroyers to connect names
        //checks that current cell that has hit registered is included in either one of the destroyers' or frigates' co-ordinates and assigns corresponding name to the hit rather than randomly calling the names
        var _JSON$parse = JSON.parse((_j = localStorage.getItem('compDestroyers')) !== null && _j !== void 0 ? _j : ''),
            _JSON$parse2 = _slicedToArray(_JSON$parse, 2),
            destroyer1 = _JSON$parse2[0],
            _ = _JSON$parse2[1];

        console.log(destroyer1);
        var destroyer1Coords = [];
        Object.values(destroyer1).forEach(function (shipPartCoords) {
          destroyer1Coords.push(shipPartCoords);
        }); //displays hit on destroyer with randomized text
        //only need to check one destroyer

        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("".concat(playerName, "'s turn: ").concat(hitsPrecursorString, " the destroyer PNS ").concat(destroyer1Coords.includes(currentCellCoord_) ? havenShipNames.destroyers[0] : havenShipNames.destroyers[1], "! ").concat(_battleTexts.battleTexts.hitsOnComp[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnComp.length)])))(battleMessageElem);
      } else if (compFrigates.includes(currentCellCoord_)) {
        //there are two frigates to connect names
        var _JSON$parse3 = JSON.parse((_k = localStorage.getItem('compFrigates')) !== null && _k !== void 0 ? _k : ''),
            _JSON$parse4 = _slicedToArray(_JSON$parse3, 2),
            frigate1 = _JSON$parse4[0],
            _2 = _JSON$parse4[1];

        var frigate1Coords = [];
        Object.values(frigate1).forEach(function (shipPartCoords) {
          frigate1Coords.push(shipPartCoords);
        }); //displays hit on frigate with randomized text
        //only need to check one frigate

        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("".concat(playerName, "'s turn: ").concat(hitsPrecursorString, " the frigate PNS ").concat(frigate1Coords.includes(currentCellCoord_) ? havenShipNames.frigates[0] : havenShipNames.frigates[1], "! ").concat(_battleTexts.battleTexts.hitsOnComp[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnComp.length)])))(battleMessageElem);
      }
    } else if (hitOrMiss_ === 'miss') {
      //player attacking computer misses
      (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("".concat(playerName, "'s turn: ").concat(_battleTexts.battleTexts.missesByPlayer[Math.floor(Math.random() * _battleTexts.battleTexts.missesByPlayer.length)])))(battleMessageElem);
    }
  } else if (towardsCombatant_ === 'player') {
    if (hitOrMiss_ === 'hit') {
      //if computer attacking player registers a hit
      if (currentShipSymbol_ === 'S') {
        //displays hit on superdreadnought with randomized text
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Haven's turn: ".concat(hitsPrecursorString, " the superdreadnought RMNS ").concat(manticoreShipNames.superdreadnought, "! ").concat(_battleTexts.battleTexts.hitsOnPlayer[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnPlayer.length)])))(battleMessageElem);
      } else if (currentShipSymbol_ === 'C') {
        //displays hit on carrier with randomized text
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Haven's turn: ".concat(hitsPrecursorString, " the carrier RMNS ").concat(manticoreShipNames.cruiser, "! ").concat(_battleTexts.battleTexts.hitsOnPlayer[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnPlayer.length)])))(battleMessageElem);
      } else if (currentShipSymbol_ === 'B') {
        //displays hit on battleship with randomized text
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Haven's turn: ".concat(hitsPrecursorString, " the battleship RMNS ").concat(manticoreShipNames.battleship, "! ").concat(_battleTexts.battleTexts.hitsOnPlayer[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnPlayer.length)])))(battleMessageElem);
      } else if (currentShipSymbol_ === 'D') {
        //there are two destroyers to connect names
        var _JSON$parse5 = JSON.parse((_l = localStorage.getItem('destroyer')) !== null && _l !== void 0 ? _l : ''),
            _JSON$parse6 = _slicedToArray(_JSON$parse5, 2),
            _destroyer = _JSON$parse6[0],
            _3 = _JSON$parse6[1];

        var _destroyer1Coords = [];
        Object.values(_destroyer).forEach(function (shipPartCoords) {
          _destroyer1Coords.push(shipPartCoords);
        }); //displays hit on destroyer with randomized text
        //only need to check one destroyer

        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Haven's turn: ".concat(hitsPrecursorString, " the destroyer RMNS ").concat(_destroyer1Coords.includes(currentCellCoord_) ? manticoreShipNames.destroyers[0] : manticoreShipNames.destroyers[1], "! ").concat(_battleTexts.battleTexts.hitsOnPlayer[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnPlayer.length)])))(battleMessageElem);
      } else if (currentShipSymbol_ === 'F') {
        //there are two frigates to connect names
        var _JSON$parse7 = JSON.parse((_m = localStorage.getItem('frigate')) !== null && _m !== void 0 ? _m : ''),
            _JSON$parse8 = _slicedToArray(_JSON$parse7, 2),
            _frigate = _JSON$parse8[0],
            _4 = _JSON$parse8[1];

        var _frigate1Coords = [];
        Object.values(_frigate).forEach(function (shipPartCoords) {
          _frigate1Coords.push(shipPartCoords);
        }); //displays hit on frigate with randomized text
        //only need to check one frigate

        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Haven's turn: ".concat(hitsPrecursorString, " the frigate RMNS ").concat(_frigate1Coords.includes(currentCellCoord_) ? manticoreShipNames.frigates[0] : manticoreShipNames.frigates[1], "! ").concat(_battleTexts.battleTexts.hitsOnPlayer[Math.floor(Math.random() * _battleTexts.battleTexts.hitsOnPlayer.length)])))(battleMessageElem);
      }
    } else if (hitOrMiss_ === 'miss') {
      //computer attacking player misses
      (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Haven's turn: ".concat(_battleTexts.battleTexts.missesByComp[Math.floor(Math.random() * _battleTexts.battleTexts.missesByComp.length)])))(battleMessageElem);
    }
  }
};

exports.renderBattleMessageElem = renderBattleMessageElem;
},{"../data/battleTexts":"data/battleTexts.ts","../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handlePlayerClickOnCompShips.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePlayerClickOnCompShips = void 0;

var _announceGameWinner = require("../components/announceGameWinner");

var _computersTurn = require("../components/computersTurn");

var _renderBattleMessage = require("../components/renderBattleMessage");

var _elementCreators = require("../utilities/elementCreators");

var _handlePlayerClickOnCompMisses = require("./handlePlayerClickOnCompMisses");

var handlePlayerClickOnCompShips = function handlePlayerClickOnCompShips(ev) {
  var _a, _b, _c, _d, _e, _f, _g; //initialize the hit counter on first hit
  //when total hits reaches 18, game ends


  if (!localStorage.getItem('totalHitsOnCompShips')) {
    localStorage.setItem('totalHitsOnCompShips', JSON.stringify(0));
  }

  var compShipsCoords = JSON.parse((_a = localStorage.getItem('compShipsCoords')) !== null && _a !== void 0 ? _a : '');
  var totalHitsOnCompShips = JSON.parse((_b = localStorage.getItem('totalHitsOnCompShips')) !== null && _b !== void 0 ? _b : '');
  var currentCellCoord = (_c = this.dataset.cellcomp) !== null && _c !== void 0 ? _c : ''; //prevents winner being called when a miss is registered

  if (compShipsCoords.includes(currentCellCoord)) {
    //checks hit counter to see if its the last hit
    if (totalHitsOnCompShips === 17) {
      var playerName = JSON.parse((_d = localStorage.getItem('playerName')) !== null && _d !== void 0 ? _d : '');
      (0, _announceGameWinner.announceGameWinner)(playerName);
    }
  } //required so that the renderBattleMessageElem function can display the appropriate message


  var currentShipSymbol = (_e = this.textContent) !== null && _e !== void 0 ? _e : '';
  var towardsCombatant = 'comp';
  var hitOrMiss = 'hit';
  (0, _renderBattleMessage.renderBattleMessageElem)(currentCellCoord, currentShipSymbol, towardsCombatant, hitOrMiss); //auto-scrolls to the bottom to have the most recent message visible

  var infoScreenWrapper = document.querySelector('.infoScreen-wrapper');
  var scrollHeight = (_f = infoScreenWrapper === null || infoScreenWrapper === void 0 ? void 0 : infoScreenWrapper.scrollHeight) !== null && _f !== void 0 ? _f : 0;
  infoScreenWrapper === null || infoScreenWrapper === void 0 ? void 0 : infoScreenWrapper.scroll({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth'
  }); //updates the comp board cell to visually indicate hit

  this.textContent = '';
  this.textContent = '💥';
  this.style.color = '#f0a400'; //prevents clicks on previously hit cells counting towards totalHitsOnCompShips

  if (!localStorage.getItem('compShipsHitCoords')) {
    localStorage.setItem('compShipsHitCoords', JSON.stringify([]));
  }

  var compShipsHitCoords = JSON.parse((_g = localStorage.getItem('compShipsHitCoords')) !== null && _g !== void 0 ? _g : ''); //updates hit counter only when new hit is not on a previously hit cell, and store

  if (!compShipsHitCoords.includes(currentCellCoord)) {
    //stores the unique hit co-ordinate
    compShipsHitCoords.push(currentCellCoord);
    localStorage.setItem('compShipsHitCoords', JSON.stringify(compShipsHitCoords)); //increments the hit counter and store

    totalHitsOnCompShips = totalHitsOnCompShips + 1;
    localStorage.setItem('totalHitsOnCompShips', JSON.stringify(totalHitsOnCompShips));
  } //all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
  //the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
  //After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue is empty because there are no promises), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
  //simulates a rudimentary game loop (without a while(boolean) statement) and gives the illusion of time taken for the computer to "think"


  var compShipPresent = document.querySelectorAll('.compShipPresent');
  var compShipNotPresent = document.querySelectorAll('.compShipNotPresent');
  compShipPresent.forEach(function (cell) {
    (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(handlePlayerClickOnCompShips))(cell);
  });
  compShipNotPresent.forEach(function (cell) {
    (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(_handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses))(cell);
  });
  setTimeout(_computersTurn.computersTurn, 2000);
};

exports.handlePlayerClickOnCompShips = handlePlayerClickOnCompShips;
},{"../components/announceGameWinner":"components/announceGameWinner.ts","../components/computersTurn":"components/computersTurn.ts","../components/renderBattleMessage":"components/renderBattleMessage.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./handlePlayerClickOnCompMisses":"events/handlePlayerClickOnCompMisses.ts"}],"components/computerAttacks.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computerAttacks = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _renderBattleMessage = require("./renderBattleMessage");

var computerAttacks = function computerAttacks(compAttackGuess_) {
  var _a, _b, _c, _d, _e, _f;

  var playerShipsCoords = JSON.parse((_a = localStorage.getItem('playerShipsCoords')) !== null && _a !== void 0 ? _a : '');
  var totalHitsOnPlayerShips = JSON.parse((_b = localStorage.getItem('totalHitsOnPlayerShips')) !== null && _b !== void 0 ? _b : ''); //compAttackGuess_ is assumed to be unique at this point
  //checks if playerShip is present

  if (playerShipsCoords.includes(compAttackGuess_)) {
    var playerShipCell = document.querySelector("[data-cellplayer=\"".concat(compAttackGuess_, "\"]")); //calls function to display battle message when computer registers a hit on a player ship

    var currentCellCoord = compAttackGuess_;
    var currentShipSymbol = (_c = playerShipCell === null || playerShipCell === void 0 ? void 0 : playerShipCell.textContent) !== null && _c !== void 0 ? _c : '';
    var towardsCombatant = 'player';
    var hitOrMiss = 'hit';
    (0, _renderBattleMessage.renderBattleMessageElem)(currentCellCoord, currentShipSymbol, towardsCombatant, hitOrMiss); //updates playercell to visually indicate hit

    if (playerShipCell) {
      playerShipCell.textContent = '';
      playerShipCell.textContent = '💥';
    } //updates hit counter and store


    totalHitsOnPlayerShips = totalHitsOnPlayerShips + 1;
    localStorage.setItem('totalHitsOnPlayerShips', JSON.stringify(totalHitsOnPlayerShips));
  } else {
    //if its a miss
    var _playerShipCell = document.querySelector("[data-cellplayer=\"".concat(compAttackGuess_, "\"]")); //calls function to display battle message when computer does not hit a player ship


    var _currentCellCoord = compAttackGuess_;

    var _currentShipSymbol = (_d = _playerShipCell === null || _playerShipCell === void 0 ? void 0 : _playerShipCell.textContent) !== null && _d !== void 0 ? _d : '';

    var _towardsCombatant = 'player';
    var _hitOrMiss = 'miss';
    (0, _renderBattleMessage.renderBattleMessageElem)(_currentCellCoord, _currentShipSymbol, _towardsCombatant, _hitOrMiss); //auto-scrolls to the bottom to have the most recent message visible

    var infoScreenWrapper = document.querySelector('.infoScreen-wrapper');
    var scrollHeight = (_e = infoScreenWrapper === null || infoScreenWrapper === void 0 ? void 0 : infoScreenWrapper.scrollHeight) !== null && _e !== void 0 ? _e : 0;
    infoScreenWrapper === null || infoScreenWrapper === void 0 ? void 0 : infoScreenWrapper.scroll({
      top: scrollHeight,
      left: 0,
      behavior: 'smooth'
    }); //assigns '✖' to currently missed co-ordinate and colors it  amber

    if (_playerShipCell) {
      _playerShipCell.textContent = '';
      _playerShipCell.textContent = '✖';
      (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', '#f0a400']]))(_playerShipCell);
    } //initializes storage for previously missed co-ordinates


    if (!localStorage.getItem('prevCompMissOnPlayerCoord')) {
      localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(''));
    } //grabs the previous miss co-ordinates in order to turn them back into gray


    var prevCompMissOnPlayerCoord = JSON.parse((_f = localStorage.getItem('prevCompMissOnPlayerCoord')) !== null && _f !== void 0 ? _f : '');
    var prevCompMissOnPlayerCell = document.querySelector("[data-cellplayer=\"".concat(prevCompMissOnPlayerCoord, "\"]"));
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro']]))(prevCompMissOnPlayerCell); //stores current miss co-ordinates in order to highlight the current round's co-ordinates

    localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(_currentCellCoord));
  }
};

exports.computerAttacks = computerAttacks;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./renderBattleMessage":"components/renderBattleMessage.ts"}],"components/genRandCompAttackGuess.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genRandCompAttackGuess = void 0;

var genRandCompAttackGuess = function genRandCompAttackGuess() {
  var _a;

  var compAttackGuess = "".concat(Math.floor(Math.random() * 10), ",").concat(Math.floor(Math.random() * 10)); //stores comp guesses to avoid hits on previously targeted co-ordinates

  if (!localStorage.getItem('compAttackGuesses')) {
    localStorage.setItem('compAttackGuesses', JSON.stringify([]));
  }

  var compAttackGuesses = JSON.parse((_a = localStorage.getItem('compAttackGuesses')) !== null && _a !== void 0 ? _a : ''); //checks if guess is in previous guesses, if so runs the random function again
  //avoids guessing the same co-ordinates

  var isUniqueCoordinate = false;

  while (!isUniqueCoordinate) {
    if (compAttackGuesses.includes(compAttackGuess)) {
      //if the guessed co-ordinate has already been tried
      isUniqueCoordinate = false;
      compAttackGuess = "".concat(Math.floor(Math.random() * 10), ",").concat(Math.floor(Math.random() * 10));
    } else {
      isUniqueCoordinate = true; //stores unique co-ordinate

      compAttackGuesses.push(compAttackGuess);
      localStorage.setItem('compAttackGuesses', JSON.stringify(compAttackGuesses));
    }
  }

  return compAttackGuess;
};

exports.genRandCompAttackGuess = genRandCompAttackGuess;
},{}],"components/computersTurn.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computersTurn = void 0;

var _handlePlayerClickOnCompMisses = require("../events/handlePlayerClickOnCompMisses");

var _handlePlayerClickOnCompShips = require("../events/handlePlayerClickOnCompShips");

var _elementCreators = require("../utilities/elementCreators");

var _announceGameWinner = require("./announceGameWinner");

var _computerAttacks = require("./computerAttacks");

var _genRandCompAttackGuess = require("./genRandCompAttackGuess");

var computersTurn = function computersTurn() {
  var _a, _b, _c; //checks if game has been won


  if (!localStorage.getItem('isGameWon')) {
    localStorage.setItem('isGameWon', JSON.stringify(''));
  }

  var isGameWon = JSON.parse((_a = localStorage.getItem('isGameWon')) !== null && _a !== void 0 ? _a : ''); //this conditional check is to prevent computer from having a turn after player has destroyed all of computer's ships

  if (!isGameWon) {
    if (!localStorage.getItem('totalHitsOnPlayerShips')) {
      localStorage.setItem('totalHitsOnPlayerShips', JSON.stringify(0));
    }

    var playerShipsCoords = JSON.parse((_b = localStorage.getItem('playerShipsCoords')) !== null && _b !== void 0 ? _b : '');
    var compAttackGuess = (0, _genRandCompAttackGuess.genRandCompAttackGuess)(); //if compAttackGuess is on a playerShipCoord, then checks the hit counter
    //avoids registering a win when the computer misses

    if (playerShipsCoords.includes(compAttackGuess)) {
      var totalHitsOnPlayerShips = JSON.parse((_c = localStorage.getItem('totalHitsOnPlayerShips')) !== null && _c !== void 0 ? _c : '');

      if (totalHitsOnPlayerShips === 17) {
        //calls game winner function
        (0, _announceGameWinner.announceGameWinner)('comp');
      }
    } //if no winner, continues attack


    (0, _computerAttacks.computerAttacks)(compAttackGuess); //if game win condition has not been reached, adds the event listeners back on to continue round

    var compShipPresent = document.querySelectorAll('.compShipPresent');
    compShipPresent.forEach(function (cell) {
      (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handlePlayerClickOnCompShips.handlePlayerClickOnCompShips))(cell);
    });
    var compShipNotPresent = document.querySelectorAll('.compShipNotPresent');
    compShipNotPresent.forEach(function (cell) {
      (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses))(cell);
    });
  }
};

exports.computersTurn = computersTurn;
},{"../events/handlePlayerClickOnCompMisses":"events/handlePlayerClickOnCompMisses.ts","../events/handlePlayerClickOnCompShips":"events/handlePlayerClickOnCompShips.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./announceGameWinner":"components/announceGameWinner.ts","./computerAttacks":"components/computerAttacks.ts","./genRandCompAttackGuess":"components/genRandCompAttackGuess.ts"}],"events/handlePlayerClickOnCompMisses.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePlayerClickOnCompMisses = void 0;

var _computersTurn = require("../components/computersTurn");

var _renderBattleMessage = require("../components/renderBattleMessage");

var _elementCreators = require("../utilities/elementCreators");

var _handlePlayerClickOnCompShips = require("./handlePlayerClickOnCompShips");

var handlePlayerClickOnCompMisses = function handlePlayerClickOnCompMisses(ev) {
  var _a, _b, _c, _d;

  var currentCellCoord = (_a = this.dataset.cellcomp) !== null && _a !== void 0 ? _a : '';
  var currentShipSymbol = (_b = this.textContent) !== null && _b !== void 0 ? _b : '';
  var towardsCombatant = 'comp';
  var hitOrMiss = 'miss';
  (0, _renderBattleMessage.renderBattleMessageElem)(currentCellCoord, currentShipSymbol, towardsCombatant, hitOrMiss); //auto-scrolls to the bottom to have the most recent message visible

  var infoScreenWrapper = document.querySelector('.infoScreen-wrapper');
  var scrollHeight = (_c = infoScreenWrapper === null || infoScreenWrapper === void 0 ? void 0 : infoScreenWrapper.scrollHeight) !== null && _c !== void 0 ? _c : 0;
  infoScreenWrapper === null || infoScreenWrapper === void 0 ? void 0 : infoScreenWrapper.scroll({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth'
  }); //assigns '✖' to currently missed co-ordinate and colors it amber

  this.textContent == '';
  this.textContent = '✖';
  (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', '#f0a400']]))(this); //initializse storage for previously missed co-ordinates

  if (!localStorage.getItem('prevPlayerMissOnCompCoord')) {
    localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(''));
  } //grabs the previous miss co-ordinates in order to turn them back into gray


  var prevPlayerMissOnCompCoord = JSON.parse((_d = localStorage.getItem('prevPlayerMissOnCompCoord')) !== null && _d !== void 0 ? _d : '');
  var prevPlayerMissOnCompCell = document.querySelector("[data-cellcomp=\"".concat(prevPlayerMissOnCompCoord, "\"]"));
  (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro']]))(prevPlayerMissOnCompCell); //stores current miss co-ordinates in order to highlight the current round's co-ordinates

  localStorage.setItem('prevPlayerMissOnCompCoord', JSON.stringify(currentCellCoord)); //all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
  //the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
  //After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue is empty because there are no promises), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
  //simulates a rudimentary game loop (without a while(boolean) statement) and gives the illusion of time taken for the computer to "think"

  var compShipNotPresent = document.querySelectorAll('.compShipNotPresent');
  var compShipPresent = document.querySelectorAll('.compShipPresent');
  compShipNotPresent.forEach(function (cell) {
    (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(handlePlayerClickOnCompMisses))(cell);
  });
  compShipPresent.forEach(function (cell) {
    (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(_handlePlayerClickOnCompShips.handlePlayerClickOnCompShips))(cell);
  }); //computers turn

  setTimeout(_computersTurn.computersTurn, 2000);
};

exports.handlePlayerClickOnCompMisses = handlePlayerClickOnCompMisses;
},{"../components/computersTurn":"components/computersTurn.ts","../components/renderBattleMessage":"components/renderBattleMessage.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./handlePlayerClickOnCompShips":"events/handlePlayerClickOnCompShips.ts"}],"data/shipNames.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shipNames = void 0;
var shipNames = {
  haven: {
    superdreadnoughts: ['Nouveau Paris', 'Danville', 'Havensport', 'Juneau', 'Kaplin', "Macrea's Tor", 'La Martin', 'LaFayette', 'Lutetia', 'Merston', 'New Boston', 'Toulon', 'Tregizva', 'Waldensville', 'Kaplan', 'Merston', 'Shaldon', "René d'Aiguillon", 'Du Quesne', "D'Allonville", 'Alphand', 'Baudin', 'Charette', 'Forbin', 'Guichen', "D'Iberville", 'Lepanto', 'Mouchez', 'Tilden', 'Rouseau', 'Salamis', 'Sovereign of Space', 'Bayard', 'Cannonade', 'Conquete', 'Guerriere', 'Hero', 'Lancelot', 'New Republic', 'Victorieux', 'Temeraire'],
    cruisers: ['Sword', 'Claymore', 'Cutlass', 'Dirk', 'Drusus', 'Durandal', 'Epee', 'Estoc', 'Excalibur', 'Falchion', 'Flamberge', 'Foil', 'Gladius', 'Jian', 'Katana', 'Khopesh', 'Poignard', 'Raiden', 'Rapier', 'Sabre', 'Scimitar', 'Shamshir', 'Wakasashi', 'Mars', 'Loki', 'Marduk', 'Nurghal', 'Odin', 'Thor', 'Tyr', 'Anhur', 'Ares', 'De Conde', 'Hachiman', 'Huan-Ti', 'Ishtar', 'Rienzi', 'Tanit', 'Krashnark', 'Morrigan', 'Yama'],
    battleships: ['Tiger', 'Bengal', 'Bobcat', 'Burmese', 'Cheetah', 'Cougar', 'Jaguar', 'Leopard', 'Lion', 'Lioness', 'Lynx', 'Manx', 'Mountain Lion', 'Ocelot', 'Panther', 'Puma', 'Sabretooth', 'Wildcat', 'Sultan', 'Abdali', 'Achmed', 'Alp Arslan', 'Bayezid', 'Fatih', 'Isa', 'Kerebin', 'Malik', 'Mehmed', 'Murad', 'Musa', 'Rash al-Din', 'Saladin', 'Selim', 'Sinjar', 'Sulieman', 'Tinaly', 'Tolek', 'Walid', 'Yavuz', 'Yildirim', 'Attila', 'Barbarosa', 'Boyar', 'Cassander', 'Count Maresuke Nogi', 'Count Tilly', 'Cyrus', 'Farnese', 'Ivan IV', 'Kutuzov', 'MacArthur', 'Modred', 'Pappenheim', 'Roxana', 'Subutai', 'Tammerlane', 'Tepes', 'Wallenstein', 'William T. Sherman', 'Triumphant', 'Admiral Quinterra', 'Conquerant', 'Conquistador', 'Schaumberg', 'Theban Warrior', 'Vindicator', 'Citizen Admiral Tacosa', 'Mohawk', 'Saracen', 'Veracity'],
    destroyers: ['Bastogne', 'Arlon', 'Breslau ', 'Bruges', 'Busko', 'Charleroi', 'Gorzow', 'Jaroslaw', 'Kessler', 'Krakow', 'Leuven', 'Liege', 'Lubin', 'Malbork', 'Poznan', 'Suwalki', 'Torun', 'Toulon', 'Tournai', 'Desforge', 'Alcazar ', 'Auphan', 'Baudin', 'Bouvet', 'Bruat', 'Courbet', 'Decres', 'Duperre', 'Hamelin', 'Kersaint', 'Linois', 'Morillot', 'Muselier', 'Dainville', 'Picquet', 'Requin', 'Roussin', 'Toulouse', 'Hecate', 'Hector', 'Racer'],
    frigates: ['Brilliance', 'Glimmer', 'Radiance', 'Solar Flare', 'Sunspot', 'Conqueror', 'Alexander', 'Alvarado', 'Babar', 'Caesar', 'Cortez', 'Diaz', 'Khan', 'Hannibal', 'Hideyoshi', 'Huangdi', 'Montezuma', 'Napoleon', 'Rameses', 'Valdivia', 'Vaubon', 'Wari', 'William', 'Charles Wade Pope', 'Marcus', 'Beaudway', 'Thomas Fisher', 'Wiliam Harting', 'Isaiah Kenter', 'Joseph T. Marrone', 'Kenneth Nastansky', 'Esperanza de Souza', 'Jonathan Talbott', 'Bacchante', 'Sabine', 'Seahorse']
  },
  manticore: {
    superdreadnoughts: ['Invictus', 'Imperator', 'Incomparable', 'Intolerant', 'Intransigent', 'Second Yeltsin', 'Medusa', 'Barnett', 'Belisarius', 'Bellona', 'Elizabeth I', "Ellen D'Orville", 'Hancock', 'King Roger III', 'Marduk', 'Regulus', 'Revenge', 'Troubadour', 'Thunderer', "Trevor's Star", 'Victorious', 'Warrior', "Yeltsin's Star", 'King William', 'King David', 'King Edward', 'King George', 'King Michael', 'King Roger', 'Prince Charles', 'Prince Malachai', 'Prince Royal', 'Queen Adrianne', 'Queen Caitrin', 'Manticore', 'Gryphon', 'Sphinx', 'Samothrace', 'Hercules', 'Majestic', 'Magnificent', 'Monarch', 'Scepter', 'Sovereign', 'Bellerophon'],
    cruisers: ['Redoubtable', 'Champion', 'Defiant', 'Formidable', 'Intolerant', 'Invincible', 'Irresistible', 'Onslaught', 'Renown', 'Resolution', 'Revenge', 'Homer', 'Achilles', 'Agamemnon', 'Cassandra', 'Hecate', 'Hector', 'Menelaus', 'Penthesilea', 'Priam', 'Reliant', 'Alcibiades', 'Amphitrite', 'Achilles', 'Dauntless', 'Hasley', 'Indomitable', 'Ishtar', 'Lysander', 'Nike', 'Nelson', 'Retaliation', 'Royalist', 'Truculent', 'Venom', 'Victory', 'Viper', 'Warspite', 'Xerxes', 'Agamemnon', 'Ajax', 'Hector', 'Patrocles', 'Priam', 'Nike'],
    battleships: ['Prince Consort', 'Prince Adrian', 'Prince Justin', 'Prince Michael', 'Prince Roger', 'Prince Stephen', 'Prince Harold', 'Princess Adrienne', 'Princess Angelique', 'Princess Aorianna', 'Princess Caitrin', 'Princess Joanna', 'Princess Michelle', 'Princess Samantha', 'Princess Solange', 'Crusader', 'Alexius', 'Eleanor', 'Frederick', 'Iberiana', 'Lafroye', 'Philip', 'Richard', 'Tancred', 'Broadsword', 'Claymore', 'Cutlass', 'Glaive', 'Guisarm', 'Halberd', 'Pike', 'Schiavone', 'Alchemist', 'Cantrip', 'Circe', 'Conjurer', 'Druidess', 'Enchanter', 'Fearless ', 'Magician', 'Magus', 'Merlin', 'Necromancer', 'Oracle', 'Runebearer', 'Santander', 'Seeress', 'Shaman', 'Sorceror', 'Star Knight', 'Star Ranger', 'Thaumaturge', 'Valiant', 'Warlock ', 'Edward Saganami', 'Jessica Epps', 'Quentin Saint-James', 'Hexapuma', 'Gauntlet'],
    destroyers: ['Culverin', 'Cannonball', 'Carronade', 'Chainshot', 'Chanson', 'Aria', 'Balladeer', 'Bard', 'Canticle', 'Choralist', 'Glorioso', 'Madrigal', 'Minstrel', 'Nightingale', 'Plain Song', 'Rondeau', 'Serenade', 'Troubadur', 'Oracle', 'Vixen', 'Windsong', 'Havoc', 'Chaos', 'Devastation', 'Harrow', 'Hutspur', 'Turbulent', 'Vengeance', 'Wrack', 'Falcon', 'Condor', 'Goshawk', 'Harrier', 'Hawk', 'Hawkwing3', 'Kestrel', 'Kingfisher', 'Kite', 'Linnet', 'Merlin', 'Nighthawk', 'Peregrine', 'Shrike', 'Arrowhead', 'Roland'],
    frigates: ['Courageous', 'Audacious', 'Fearless', 'Intransigent', 'Intrepid', 'Resolute', 'Valiant', 'Defiant', 'Gallant', 'Apollo', 'Adonai', 'Agni', 'Amaterasu', 'Anubis', 'Aphrodite', 'Arethusa', 'Artemis', 'Athena', 'Chiron', 'Hera', 'Hermes', 'Iris', 'Leto', 'Perseus', 'Poseidon', 'Thetis', 'Xanthus', 'Ares', 'Illustrious', 'Furious', 'Magnificent', 'Regal', 'Avalon', 'Aegis']
  }
};
exports.shipNames = shipNames;
},{}],"components/randomizeAndStoreShipNames.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomizeAndStoreShipNames = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var randomizeAndStoreShipNames = function randomizeAndStoreShipNames(shipNames_) {
  //used to display a persistent (throughout the game round) name, that corresponds to the type of ship, that is displayed when a hit is registered
  if (!localStorage.getItem('playerShipNames')) {
    localStorage.setItem('playerShipNames', JSON.stringify([]));
  } //creates a randomized ship name per game session and stores it to be used for the battle messages


  Object.entries(shipNames_).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        polity = _ref2[0],
        shipTypes = _ref2[1];

    if (polity === 'haven') {
      var havenShipNames = new Map();
      Object.entries(shipTypes).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            shipType = _ref4[0],
            shipNamesArr = _ref4[1];

        //need two names for destroyers and frigates
        if (shipType === 'destroyers' || shipType === 'frigates') {
          var tempShipNamesArr = [shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)], shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]];
          havenShipNames.set(shipType, tempShipNamesArr);
        } else {
          //only one name for superdreadnought, cruiser and battleship
          havenShipNames.set( //changes from plural to singular
          shipType.slice(0, -1), shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]);
        }
      });
      localStorage.setItem('havenShipNames', JSON.stringify(Object.fromEntries(havenShipNames)));
    } else if (polity === 'manticore') {
      var manticoreShipNames = new Map();
      Object.entries(shipTypes).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            shipType = _ref6[0],
            shipNamesArr = _ref6[1];

        //need two names for destroyers and frigates
        if (shipType === 'destroyers' || shipType === 'frigates') {
          var tempShipNamesArr = [shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)], shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]];
          manticoreShipNames.set(shipType, tempShipNamesArr);
        } else {
          //only one name for superdreadnought, cruiser and battleship
          manticoreShipNames.set(shipType.slice(0, -1), shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]);
        }
      });
      localStorage.setItem('manticoreShipNames', JSON.stringify(Object.fromEntries(manticoreShipNames)));
    }
  });
};

exports.randomizeAndStoreShipNames = randomizeAndStoreShipNames;
},{}],"components/renderCompBoard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCompBoard = void 0;

var _elementCreators = require("../utilities/elementCreators");

var renderCompBoard = function renderCompBoard() {
  var bothBoardsContainer = document.querySelector('.bothBoards-container');
  var compBoardWrapper = (0, _elementCreators.elemCreator)('div')(['compBoard-wrapper']);
  (0, _elementCreators.appendElemToParent)(bothBoardsContainer)(compBoardWrapper);
  var compBoardContainer = (0, _elementCreators.elemCreator)('div')(['compBoard-container']);
  (0, _elementCreators.appendElemToParent)(compBoardWrapper)(compBoardContainer);

  for (var i = 0; i < 10; i += 1) {
    for (var j = 0; j < 10; j += 1) {
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['data-cellcomp', "".concat(j, ",").concat(i)]]), (0, _elementCreators.appendElemToParent)(compBoardContainer))((0, _elementCreators.elemCreator)('div')(['comp-gameCell']));
    }
  }
};

exports.renderCompBoard = renderCompBoard;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"components/renderCompShipsOnBoard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCompShipsOnBoard = void 0;

var _elementCreators = require("../utilities/elementCreators");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renderCompShipsOnBoard = function renderCompShipsOnBoard(compShipsPlacementChoice_) {
  var _a; //used for hit detection


  if (!localStorage.getItem('compShipsCoords')) {
    localStorage.setItem('compShipsCoords', JSON.stringify([]));
  }

  var compShipsCoords = JSON.parse((_a = localStorage.getItem('compShipsCoords')) !== null && _a !== void 0 ? _a : '');
  Object.entries(compShipsPlacementChoice_).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        ship = _ref2[0],
        shipObj = _ref2[1];

    //if the compShips obj does not exist, create it, then store it in camelcase i.e., compCarrier
    if (!localStorage.getItem("comp".concat(ship[0].toUpperCase() + ship.slice(1)))) {
      localStorage.setItem("comp".concat(ship[0].toUpperCase() + ship.slice(1)), JSON.stringify(shipObj));
    } //for superdreadnought, carrier, battleship properties whose attributes do not consist of an array


    if (!Array.isArray(shipObj)) {
      Object.entries(shipObj).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            shipSection = _ref4[0],
            sectionCoords = _ref4[1];

        //grab the corresponding game board cell
        var shipCell = document.querySelector("[data-cellcomp=\"".concat(sectionCoords, "\"]"));
        (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'compShipPresent comp-gameCell']]), (0, _elementCreators.addTextToElem)('✴'), (0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000']]))(shipCell); //store the co-ordinates

        compShipsCoords.push(sectionCoords);
      });
    } else {
      //for destroyers and frigates properties whose attributes consist of an array
      shipObj.forEach(function (ship) {
        Object.entries(ship).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              shipSection = _ref6[0],
              sectionCoords = _ref6[1];

          //grab the corresponding game board cell
          var shipCell = document.querySelector("[data-cellcomp=\"".concat(sectionCoords, "\"]"));
          (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'compShipPresent comp-gameCell']]), (0, _elementCreators.addTextToElem)('✴'), (0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000']]))(shipCell); //store the co-ordinates

          compShipsCoords.push(sectionCoords);
        });
      });
    }
  });
  var compGameCells = document.querySelectorAll('.comp-gameCell'); //differentiates between ships and empty spaces

  compGameCells.forEach(function (cell) {
    if (!cell.classList.contains('compShipPresent')) {
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'compShipNotPresent comp-gameCell']]), (0, _elementCreators.addTextToElem)('✴'))(cell);
    }
  }); //puts the coordinates in storage for future hit detection checks

  localStorage.setItem('compShipsCoords', JSON.stringify(compShipsCoords));
};

exports.renderCompShipsOnBoard = renderCompShipsOnBoard;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"components/placeCompShipsOnBoard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placeCompShipsOnBoard = void 0;

var _renderCompShipsOnBoard = require("./renderCompShipsOnBoard");

var placeCompShipsOnBoard = function placeCompShipsOnBoard(compShipsPlacementChoicesArr_) {
  var compShipsPlacementChoicesArr = compShipsPlacementChoicesArr_; //selects a random pre-formed compShipPlacement for every game

  var randCompShipPlacement = compShipsPlacementChoicesArr[Math.floor(Math.random() * compShipsPlacementChoicesArr.length)];
  (0, _renderCompShipsOnBoard.renderCompShipsOnBoard)(randCompShipPlacement);
};

exports.placeCompShipsOnBoard = placeCompShipsOnBoard;
},{"./renderCompShipsOnBoard":"components/renderCompShipsOnBoard.ts"}],"data/compShipsPlacementChoicesArr.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compShipsPlacementChoicesArr = void 0;
var compShipsPlacementChoicesArr = [{
  superdreadnought: {
    head: '1,0',
    body1: '2,0',
    body2: '3,0',
    body3: '4,0',
    tail: '5,0'
  },
  carrier: {
    head: '1,2',
    body1: '2,2',
    body2: '3,2',
    tail: '4,2'
  },
  battleship: {
    head: '1,4',
    body: '2,4',
    tail: '3,4'
  },
  destroyers: [{
    head: '1,6',
    tail: '2,6'
  }, {
    head: '1,8',
    tail: '2,8'
  }],
  frigates: [{
    body: '4,6'
  }, {
    body: '4,8'
  }]
}, {
  superdreadnought: {
    head: '1,2',
    body1: '1,3',
    body2: '1,4',
    body3: '1,5',
    tail: '1,6'
  },
  carrier: {
    head: '4,2',
    body1: '4,3',
    body2: '4,4',
    tail: '4,5'
  },
  battleship: {
    head: '6,1',
    body: '7,1',
    tail: '8,1'
  },
  destroyers: [{
    head: '7,4',
    tail: '8,4'
  }, {
    head: '3,7',
    tail: '3,8'
  }],
  frigates: [{
    body: '7,7'
  }, {
    body: '5,8'
  }]
}, {
  superdreadnought: {
    head: '1,1',
    body1: '1,2',
    body2: '1,3',
    body3: '1,4',
    tail: '1,5'
  },
  carrier: {
    head: '3,2',
    body1: '3,3',
    body2: '3,4',
    tail: '3,5'
  },
  battleship: {
    head: '1,7',
    body: '2,7',
    tail: '3,7'
  },
  destroyers: [{
    head: '4,0',
    tail: '5,0'
  }, {
    head: '5,2',
    tail: '5,3'
  }],
  frigates: [{
    body: '5,5'
  }, {
    body: '5,7'
  }]
}, {
  superdreadnought: {
    head: '1,8',
    body1: '2,8',
    body2: '3,8',
    body3: '4,8',
    tail: '5,8'
  },
  carrier: {
    head: '6,6',
    body1: '7,6',
    body2: '8,6',
    tail: '9,6'
  },
  battleship: {
    head: '6,4',
    body: '7,4',
    tail: '8,4'
  },
  destroyers: [{
    head: '2,6',
    tail: '3,6'
  }, {
    head: '2,4',
    tail: '3,4'
  }],
  frigates: [{
    body: '3,2'
  }, {
    body: '7,2'
  }]
}, {
  superdreadnought: {
    head: '1,1',
    body1: '1,2',
    body2: '1,3',
    body3: '1,4',
    tail: '1,5'
  },
  carrier: {
    head: '8,6',
    body1: '8,7',
    body2: '8,8',
    tail: '8,9'
  },
  battleship: {
    head: '6,1',
    body: '7,1',
    tail: '8,1'
  },
  destroyers: [{
    head: '6,3',
    tail: '7,3'
  }, {
    head: '1,8',
    tail: '2,8'
  }],
  frigates: [{
    body: '4,6'
  }, {
    body: '3,3'
  }]
}, {
  superdreadnought: {
    head: '0,0',
    body1: '1,0',
    body2: '2,0',
    body3: '3,0',
    tail: '4,0'
  },
  carrier: {
    head: '2,9',
    body1: '3,9',
    body2: '4,9',
    tail: '5,9'
  },
  battleship: {
    head: '0,5',
    body: '0,6',
    tail: '0,7'
  },
  destroyers: [{
    head: '8,3',
    tail: '8,4'
  }, {
    head: '5,6',
    tail: '5,7'
  }],
  frigates: [{
    body: '3,2'
  }, {
    body: '8,9'
  }]
}, {
  superdreadnought: {
    head: '0,7',
    body1: '1,7',
    body2: '2,7',
    body3: '3,7',
    tail: '4,7'
  },
  carrier: {
    head: '6,9',
    body1: '7,9',
    body2: '8,9',
    tail: '9,9'
  },
  battleship: {
    head: '7,2',
    body: '7,3',
    tail: '7,4'
  },
  destroyers: [{
    head: '0,2',
    tail: '0,3'
  }, {
    head: '3,1',
    tail: '3,2'
  }],
  frigates: [{
    body: '3,4'
  }, {
    body: '9,6'
  }]
}, {
  superdreadnought: {
    head: '8,1',
    body1: '8,2',
    body2: '8,3',
    body3: '8,4',
    tail: '8,5'
  },
  carrier: {
    head: '0,5',
    body1: '0,6',
    body2: '0,7',
    tail: '0,8'
  },
  battleship: {
    head: '6,6',
    body: '6,7',
    tail: '6,8'
  },
  destroyers: [{
    head: '1,1',
    tail: '1,2'
  }, {
    head: '3,1',
    tail: '3,2'
  }],
  frigates: [{
    body: '5,2'
  }, {
    body: '3,5'
  }]
}, {
  superdreadnought: {
    head: '0,8',
    body1: '1,8',
    body2: '2,8',
    body3: '3,8',
    tail: '4,8'
  },
  carrier: {
    head: '6,1',
    body1: '7,1',
    body2: '8,1',
    tail: '9,1'
  },
  battleship: {
    head: '0,3',
    body: '1,3',
    tail: '2,3'
  },
  destroyers: [{
    head: '8,8',
    tail: '9,8'
  }, {
    head: '1,5',
    tail: '2,5'
  }],
  frigates: [{
    body: '8,3'
  }, {
    body: '8,5'
  }]
}, {
  superdreadnought: {
    head: '1,1',
    body1: '2,1',
    body2: '3,1',
    body3: '4,1',
    tail: '5,1'
  },
  carrier: {
    head: '0,3',
    body1: '0,4',
    body2: '0,5',
    tail: '0,6'
  },
  battleship: {
    head: '8,3',
    body: '8,4',
    tail: '8,5'
  },
  destroyers: [{
    head: '3,3',
    tail: '3,4'
  }, {
    head: '3,7',
    tail: '3,8'
  }],
  frigates: [{
    body: '8,0'
  }, {
    body: '6,9'
  }]
}, {
  superdreadnought: {
    head: '0,8',
    body1: '1,8',
    body2: '2,8',
    body3: '3,8',
    tail: '4,8'
  },
  carrier: {
    head: '6,1',
    body1: '7,1',
    body2: '8,1',
    tail: '9,1'
  },
  battleship: {
    head: '0,0',
    body: '0,1',
    tail: '0,2'
  },
  destroyers: [{
    head: '9,8',
    tail: '9,9'
  }, {
    head: '7,6',
    tail: '7,7'
  }],
  frigates: [{
    body: '9,4'
  }, {
    body: '5,4'
  }]
}, {
  superdreadnought: {
    head: '9,0',
    body1: '9,1',
    body2: '9,2',
    body3: '9,3',
    tail: '9,4'
  },
  carrier: {
    head: '3,3',
    body1: '3,4',
    body2: '3,5',
    tail: '3,6'
  },
  battleship: {
    head: '0,7',
    body: '0,8',
    tail: '0,9'
  },
  destroyers: [{
    head: '0,0',
    tail: '0,1'
  }, {
    head: '9,8',
    tail: '9,9'
  }],
  frigates: [{
    body: '5,4'
  }, {
    body: '3,9'
  }]
}, {
  superdreadnought: {
    head: '2,3',
    body1: '3,3',
    body2: '4,3',
    body3: '5,3',
    tail: '6,3'
  },
  carrier: {
    head: '0,3',
    body1: '0,4',
    body2: '0,5',
    tail: '0,6'
  },
  battleship: {
    head: '8,0',
    body: '8,1',
    tail: '8,2'
  },
  destroyers: [{
    head: '2,0',
    tail: '2,1'
  }, {
    head: '2,6',
    tail: '2,7'
  }],
  frigates: [{
    body: '7,6'
  }, {
    body: '7,8'
  }]
}, {
  superdreadnought: {
    head: '2,9',
    body1: '3,9',
    body2: '4,9',
    body3: '5,9',
    tail: '6,9'
  },
  carrier: {
    head: '1,2',
    body1: '1,3',
    body2: '1,4',
    tail: '1,5'
  },
  battleship: {
    head: '8,2',
    body: '8,3',
    tail: '8,4'
  },
  destroyers: [{
    head: '9,8',
    tail: '9,9'
  }, {
    head: '0,7',
    tail: '0,8'
  }],
  frigates: [{
    body: '5,3'
  }, {
    body: '3,5'
  }]
}, {
  superdreadnought: {
    head: '2,5',
    body1: '2,6',
    body2: '2,7',
    body3: '2,8',
    tail: '2,9'
  },
  carrier: {
    head: '1,2',
    body1: '2,2',
    body2: '3,2',
    tail: '4,2'
  },
  battleship: {
    head: '7,2',
    body: '7,3',
    tail: '7,4'
  },
  destroyers: [{
    head: '5,6',
    tail: '6,6'
  }, {
    head: '5,8',
    tail: '6,8'
  }],
  frigates: [{
    body: '0,0'
  }, {
    body: '9,9'
  }]
}, {
  superdreadnought: {
    head: '4,3',
    body1: '4,4',
    body2: '4,5',
    body3: '4,6',
    tail: '4,7'
  },
  carrier: {
    head: '3,9',
    body1: '4,9',
    body2: '5,9',
    tail: '6,9'
  },
  battleship: {
    head: '3,0',
    body: '4,0',
    tail: '5,0'
  },
  destroyers: [{
    head: '0,1',
    tail: '0,2'
  }, {
    head: '0,8',
    tail: '0,9'
  }],
  frigates: [{
    body: '7,3'
  }, {
    body: '7,6'
  }]
}, {
  superdreadnought: {
    head: '9,0',
    body1: '9,1',
    body2: '9,2',
    body3: '9,3',
    tail: '9,4'
  },
  carrier: {
    head: '5,2',
    body1: '5,3',
    body2: '5,4',
    tail: '5,5'
  },
  battleship: {
    head: '7,1',
    body: '7,2',
    tail: '7,3'
  },
  destroyers: [{
    head: '9,8',
    tail: '9,9'
  }, {
    head: '7,7',
    tail: '7,8'
  }],
  frigates: [{
    body: '1,1'
  }, {
    body: '1,3'
  }]
}, {
  superdreadnought: {
    head: '2,6',
    body1: '3,6',
    body2: '4,6',
    body3: '5,6',
    tail: '6,6'
  },
  carrier: {
    head: '2,1',
    body1: '2,2',
    body2: '2,3',
    tail: '2,4'
  },
  battleship: {
    head: '8,6',
    body: '8,7',
    tail: '8,8'
  },
  destroyers: [{
    head: '5,2',
    tail: '5,3'
  }, {
    head: '7,1',
    tail: '7,2'
  }],
  frigates: [{
    body: '0,9'
  }, {
    body: '5,8'
  }]
}, {
  superdreadnought: {
    head: '6,3',
    body1: '6,4',
    body2: '6,5',
    body3: '6,6',
    tail: '6,7'
  },
  carrier: {
    head: '1,5',
    body1: '2,5',
    body2: '3,5',
    tail: '4,5'
  },
  battleship: {
    head: '4,1',
    body: '4,2',
    tail: '4,3'
  },
  destroyers: [{
    head: '1,1',
    tail: '1,2'
  }, {
    head: '8,1',
    tail: '8,2'
  }],
  frigates: [{
    body: '1,8'
  }, {
    body: '5,8'
  }]
}];
exports.compShipsPlacementChoicesArr = compShipsPlacementChoicesArr;
},{}],"events/handleStartButtonClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleStartButtonClick = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _handlePlayerClickOnCompMisses = require("./handlePlayerClickOnCompMisses");

var _handlePlayerClickOnCompShips = require("./handlePlayerClickOnCompShips");

var _shipNames = require("../data/shipNames");

var _randomizeAndStoreShipNames = require("../components/randomizeAndStoreShipNames");

var _renderCompBoard = require("../components/renderCompBoard");

var _placeCompShipsOnBoard = require("../components/placeCompShipsOnBoard");

var _compShipsPlacementChoicesArr = require("../data/compShipsPlacementChoicesArr");

var handleStartButtonClick = function handleStartButtonClick(ev) {
  //removes the previous info screen
  var infoScreenWrapper = document.querySelector('.infoScreen-wrapper');
  infoScreenWrapper === null || infoScreenWrapper === void 0 ? void 0 : infoScreenWrapper.remove(); //removes the ship bttns wrapper

  var shipBttnsWrapper = document.querySelector('.shipBttns-wrapper');
  shipBttnsWrapper === null || shipBttnsWrapper === void 0 ? void 0 : shipBttnsWrapper.remove(); //remove the start button

  this.remove(); //renders comp board and place the ships

  (0, _renderCompBoard.renderCompBoard)();
  (0, _placeCompShipsOnBoard.placeCompShipsOnBoard)(_compShipsPlacementChoicesArr.compShipsPlacementChoicesArr); //randomizes and store ship names for each battle

  (0, _randomizeAndStoreShipNames.randomizeAndStoreShipNames)(_shipNames.shipNames);

  if (!localStorage.getItem('isGameRunning')) {
    localStorage.setItem('isGameRunning', JSON.stringify(true));
  } //adds evt listeners to comp game board cells


  var compShipPresentCells = document.querySelectorAll('.compShipPresent');
  compShipPresentCells.forEach(function (cell) {
    return (0, _elementCreators.addEvtListener)('click')(_handlePlayerClickOnCompShips.handlePlayerClickOnCompShips)(cell);
  });
  var compShipNotPresentCells = document.querySelectorAll('.compShipNotPresent');
  compShipNotPresentCells.forEach(function (cell) {
    return (0, _elementCreators.addEvtListener)('click')(_handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses)(cell);
  }); //renders a new info screen for the battle texts

  var main = document.querySelector('.main');
  (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(main))((0, _elementCreators.elemCreator)('div')(['infoScreen-wrapper']));
};

exports.handleStartButtonClick = handleStartButtonClick;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./handlePlayerClickOnCompMisses":"events/handlePlayerClickOnCompMisses.ts","./handlePlayerClickOnCompShips":"events/handlePlayerClickOnCompShips.ts","../data/shipNames":"data/shipNames.ts","../components/randomizeAndStoreShipNames":"components/randomizeAndStoreShipNames.ts","../components/renderCompBoard":"components/renderCompBoard.ts","../components/placeCompShipsOnBoard":"components/placeCompShipsOnBoard.ts","../data/compShipsPlacementChoicesArr":"data/compShipsPlacementChoicesArr.ts"}],"components/renderStartButton.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderStartButton = void 0;

var _handleStartButtonClick = require("../events/handleStartButtonClick");

var _elementCreators = require("../utilities/elementCreators");

var renderStartButton = function renderStartButton() {
  //removes the ship selection buttons
  var shipsBttnContainer = document.querySelector('.shipsBttn-container');
  shipsBttnContainer === null || shipsBttnContainer === void 0 ? void 0 : shipsBttnContainer.remove(); //removes axis selection button

  var axisSelectorBttn = document.querySelector('.bttn-axisSelector');
  axisSelectorBttn === null || axisSelectorBttn === void 0 ? void 0 : axisSelectorBttn.remove();
  var shipBttnsWrapper = document.querySelector('.shipBttns-wrapper'); //renders start game button

  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Engage!'), (0, _elementCreators.addAttributeToElem)([['type', 'button'], ['value', 'start']]), (0, _elementCreators.addEvtListener)('click')(_handleStartButtonClick.handleStartButtonClick), (0, _elementCreators.appendElemToParent)(shipBttnsWrapper))((0, _elementCreators.elemCreator)('button')(['bttn', 'bttn-startGame']));
};

exports.renderStartButton = renderStartButton;
},{"../events/handleStartButtonClick":"events/handleStartButtonClick.ts","../utilities/elementCreators":"utilities/elementCreators.ts"}],"components/checkAllShipsInPlace.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAllShipsInPlace = void 0;

var _renderStarsInPlayerBoard = require("./renderStarsInPlayerBoard");

var _renderStartButton = require("./renderStartButton");

var checkAllShipsInPlace = function checkAllShipsInPlace() {
  var _a; //if playerShip co-ordinates does not exist, create it to check its length which is the sum total of length of all player ships


  if (localStorage.getItem('playerShipsCoords')) {
    var shipsCoordsArr = JSON.parse((_a = localStorage.getItem('playerShipsCoords')) !== null && _a !== void 0 ? _a : ''); //if all the player ships have been placed

    if (shipsCoordsArr.length === 18) {
      //adds stars to player board
      (0, _renderStarsInPlayerBoard.renderStarsInPlayerBoard)(); //STARTS GAME

      (0, _renderStartButton.renderStartButton)();
    }
  }
};

exports.checkAllShipsInPlace = checkAllShipsInPlace;
},{"./renderStarsInPlayerBoard":"components/renderStarsInPlayerBoard.ts","./renderStartButton":"components/renderStartButton.ts"}],"components/doesShipPlacementOverlap.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doesShipPlacementOverlap = void 0;

var doesShipPlacementOverlap = function doesShipPlacementOverlap(shipLength_, currentAxis_, currentX_, currentY_) {
  var _a; //initializes on first call for overlap detection


  if (!localStorage.getItem('playerShipsCoords')) {
    localStorage.setItem('playerShipsCoords', JSON.stringify([]));
  }

  var playerShipsCoords = JSON.parse((_a = localStorage.getItem('playerShipsCoords')) !== null && _a !== void 0 ? _a : '');

  if (currentAxis_ === 'Axis-X') {
    for (var i = 0; i < shipLength_; i += 1) {
      //overlap detection
      if (playerShipsCoords.includes("".concat(Number(currentX_) + i, ",").concat(currentY_))) {
        alert('A ship is already present at these coordinates. Please choose another area.');
        return true;
      }
    }
  } else if (currentAxis_ === 'Axis-Y') {
    for (var _i = 0; _i < shipLength_; _i += 1) {
      if (playerShipsCoords.includes("".concat(currentX_, ",").concat(Number(currentY_) + _i))) {
        alert('A ship is already present at these coordinates. Please choose another area.');
        return true;
      }
    }
  }
};

exports.doesShipPlacementOverlap = doesShipPlacementOverlap;
},{}],"components/isCorrectNumberOfShips.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCorrectNumberOfShips = void 0;

var isCorrectNumberOfShips = function isCorrectNumberOfShips(ship_, amount_) {
  var _a; //capitalizes first letters


  var ship = ship_[0].toUpperCase() + ship_.slice(1);
  var amount = amount_[0].toUpperCase() + amount_.slice(1);

  if (amount_ === 'single') {
    // for persistent state and enforces single ship
    if (!localStorage.getItem("is".concat(amount).concat(ship))) {
      localStorage.setItem("is".concat(amount).concat(ship), JSON.stringify(true));
    }

    return true;
  } else if (amount_ === 'double') {
    var shipObjArr = JSON.parse((_a = localStorage.getItem("".concat(ship_))) !== null && _a !== void 0 ? _a : '');

    if (shipObjArr.length < 2) {
      // for persistent state and enforces double ships
      if (!localStorage.getItem("is".concat(amount).concat(ship))) {
        localStorage.setItem("is".concat(amount).concat(ship), JSON.stringify(true));
      }

      return true;
    } else if (shipObjArr.length === 2) {
      localStorage.setItem("is".concat(amount).concat(ship), JSON.stringify(false));
      return false;
    }
  }
};

exports.isCorrectNumberOfShips = isCorrectNumberOfShips;
},{}],"events/handleBattleshipMouseEnter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBattleshipMouseEnter = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleBattleshipMouseEnter = function handleBattleshipMouseEnter(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 3; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]"));

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('B'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 3; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]"));

      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('B'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(_nextCell);
      }
    }
  }
};

exports.handleBattleshipMouseEnter = handleBattleshipMouseEnter;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleBattleshipMouseLeave.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBattleshipMouseLeave = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleBattleshipMouseLeave = function handleBattleshipMouseLeave(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 3; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]")); //avoids changing cells of ships already present

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        if (nextCell) nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 3; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //avoids changing cells of ships already present


      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        if (_nextCell) _nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(_nextCell);
      }
    }
  }
};

exports.handleBattleshipMouseLeave = handleBattleshipMouseLeave;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleCarrierMouseEnter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCarrierMouseEnter = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleCarrierMouseEnter = function handleCarrierMouseEnter(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 4; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]"));

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('C'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 4; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]"));

      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('C'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(_nextCell);
      }
    }
  }
};

exports.handleCarrierMouseEnter = handleCarrierMouseEnter;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleCarrierMouseLeave.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCarrierMouseLeave = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleCarrierMouseLeave = function handleCarrierMouseLeave(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 4; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]")); //avoids changing cells of ships already present

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        if (nextCell) nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 4; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //avoids changing cells of ships already present


      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        if (_nextCell) _nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(_nextCell);
      }
    }
  }
};

exports.handleCarrierMouseLeave = handleCarrierMouseLeave;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleDestroyerMouseEnter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDestroyerMouseEnter = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleDestroyerMouseEnter = function handleDestroyerMouseEnter(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 2; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]"));

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('D'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 2; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]"));

      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('D'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(_nextCell);
      }
    }
  }
};

exports.handleDestroyerMouseEnter = handleDestroyerMouseEnter;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleDestroyerMouseLeave.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDestroyerMouseLeave = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleDestroyerMouseLeave = function handleDestroyerMouseLeave(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 2; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]")); //avoids changing cells of ships already present

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        if (nextCell) nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 2; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //avoids changing cells of ships already present


      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        if (_nextCell) _nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(_nextCell);
      }
    }
  }
};

exports.handleDestroyerMouseLeave = handleDestroyerMouseLeave;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleFrigateMouseEnter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFrigateMouseEnter = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleFrigateMouseEnter = function handleFrigateMouseEnter(ev) {
  var _a, _b, _c; //grabs the current cell co-ordinate


  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes cell on hover

  var nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(currentY, "\"]"));

  if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('F'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(nextCell);
  }
};

exports.handleFrigateMouseEnter = handleFrigateMouseEnter;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleFrigateMouseLeave.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFrigateMouseLeave = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleFrigateMouseLeave = function handleFrigateMouseLeave(ev) {
  var _a, _b, _c; //grabs the current cell co-ordinate


  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes cell on hover

  var nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(currentY, "\"]")); //avoids changing cells of ships already present

  if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
    if (nextCell) nextCell.textContent = '';
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(nextCell);
  }
};

exports.handleFrigateMouseLeave = handleFrigateMouseLeave;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleSuperdreadnoughtMouseEnter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSuperdreadnoughtMouseEnter = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleSuperdreadnoughtMouseEnter = function handleSuperdreadnoughtMouseEnter(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 5; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]"));

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('S'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 5; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]"));

      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('S'), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'crosshair']]))(_nextCell);
      }
    }
  }
};

exports.handleSuperdreadnoughtMouseEnter = handleSuperdreadnoughtMouseEnter;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleSuperdreadnoughtMouseLeave.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSuperdreadnoughtMouseLeave = void 0;

var _elementCreators = require("../utilities/elementCreators");

var handleSuperdreadnoughtMouseLeave = function handleSuperdreadnoughtMouseLeave(ev) {
  var _a, _b, _c; //grabs the current state of the axis button


  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //changes consecutive cells in corresponding axes on hover

  if (currentAxis === 'Axis-X') {
    for (var i = 0; i < 5; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]")); //avoids changing cells of ships already present

      if (!(nextCell === null || nextCell === void 0 ? void 0 : nextCell.classList.contains('playerShipPresent'))) {
        if (nextCell) nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(nextCell);
      }
    }
  } else if (currentAxis === 'Axis-Y') {
    for (var _i = 0; _i < 5; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //avoids changing cells of ships already present


      if (!(_nextCell === null || _nextCell === void 0 ? void 0 : _nextCell.classList.contains('playerShipPresent'))) {
        if (_nextCell) _nextCell.textContent = '';
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['color', 'gainsboro'], ['cursor', 'default']]))(_nextCell);
      }
    }
  }
};

exports.handleSuperdreadnoughtMouseLeave = handleSuperdreadnoughtMouseLeave;
},{"../utilities/elementCreators":"utilities/elementCreators.ts"}],"events/handleSuperdreadnoughtCellClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSuperdreadnoughtCellClick = void 0;

var _accumulatePlayerShipCoords = require("../components/accumulatePlayerShipCoords");

var _checkAllShipsInPlace = require("../components/checkAllShipsInPlace");

var _doesShipPlacementOverlap = require("../components/doesShipPlacementOverlap");

var _isCorrectNumberOfShips = require("../components/isCorrectNumberOfShips");

var _elementCreators = require("../utilities/elementCreators");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var _handleSuperdreadnoughtMouseEnter = require("./handleSuperdreadnoughtMouseEnter");

var _handleSuperdreadnoughtMouseLeave = require("./handleSuperdreadnoughtMouseLeave");

var handleSuperdreadnoughtCellClick = function handleSuperdreadnoughtCellClick(ev) {
  var _a, _b, _c, _d;

  var playerGameCells = document.querySelectorAll('.player-gameCell'); //grabs the current state of the axis button

  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //initializes the carrier object upon first call

  if (!localStorage.getItem('superdreadnought')) {
    localStorage.setItem('superdreadnought', JSON.stringify(''));
  }

  var superdreadnought = JSON.parse((_d = localStorage.getItem('superdreadnought')) !== null && _d !== void 0 ? _d : '');
  var superdreadnoughtCoords = [];
  var ship = 'superdreadnought';
  var amount = 'single'; //for horizontal placement

  if (currentAxis === 'Axis-X' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //grid boundary detection
    if (Number(currentX) > 5) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(5, currentAxis, currentX, currentY)) return null; //places superdreadnought on the grid

    for (var i = 0; i < 5; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]")); //prevents duplicate letters being placed

      if (nextCell) nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('S'))(nextCell);
      superdreadnoughtCoords.push("".concat(Number(currentX) + i, ",").concat(currentY));
    } //prevents updating after first click


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
      //updates superdreadnought object attributes
      superdreadnought = {
        head: superdreadnoughtCoords[0],
        body1: superdreadnoughtCoords[1],
        body2: superdreadnoughtCoords[2],
        body3: superdreadnoughtCoords[3],
        tail: superdreadnoughtCoords[4]
      };
    }

    localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false));
  } //for vertical placement
  else if (currentAxis === 'Axis-Y' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, 'single')) {
    //grid boundary detection
    if (Number(currentY) > 5) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(5, currentAxis, currentX, currentY)) return null; //places superdreadnought on the grid

    for (var _i = 0; _i < 5; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //prevents duplicate letters being placed


      if (_nextCell) _nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('S'))(_nextCell);
      superdreadnoughtCoords.push("".concat(currentX, ",").concat(Number(currentY) + _i));
    } //prevents updating after first click


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
      //updates superdreadnought object attributes
      superdreadnought = {
        head: superdreadnoughtCoords[0],
        body1: superdreadnoughtCoords[1],
        body2: superdreadnoughtCoords[2],
        body3: superdreadnoughtCoords[3],
        tail: superdreadnoughtCoords[4]
      };
    }

    localStorage.setItem('isSingleSuperdreadnought', JSON.stringify(false));
  } //stores superdreadnought


  localStorage.setItem('superdreadnought', JSON.stringify(superdreadnought)); //stores current ship coords to pool of all ship coords

  (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(superdreadnoughtCoords);

  if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
    //after 'this' button has been clicked, sets the color to grey to visually indicate finished
    var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]))(superdreadnoughtBttn); //enables events on other shipButtons after superdreadnought has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click

    var carrierBttn = document.querySelector('.bttn-carrier');
    if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
    var battleshipBttn = document.querySelector('.bttn-battleship');
    if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
    var destroyerBttn = document.querySelector('.bttn-destroyer');
    if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn);
    var frigateBttn = document.querySelector('.bttn-frigate');
    if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn); //removes event listeners after single superdreadnought has been placed

    playerGameCells.forEach(function (player) {
      (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(handleSuperdreadnoughtCellClick), (0, _elementCreators.removeEvtListener)('mouseenter')(_handleSuperdreadnoughtMouseEnter.handleSuperdreadnoughtMouseEnter), (0, _elementCreators.removeEvtListener)('mouseleave')(_handleSuperdreadnoughtMouseLeave.handleSuperdreadnoughtMouseLeave))(player);
    });
  } //if all ships placed, renders start button


  (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

exports.handleSuperdreadnoughtCellClick = handleSuperdreadnoughtCellClick;
},{"../components/accumulatePlayerShipCoords":"components/accumulatePlayerShipCoords.ts","../components/checkAllShipsInPlace":"components/checkAllShipsInPlace.ts","../components/doesShipPlacementOverlap":"components/doesShipPlacementOverlap.ts","../components/isCorrectNumberOfShips":"components/isCorrectNumberOfShips.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts","./handleSuperdreadnoughtMouseEnter":"events/handleSuperdreadnoughtMouseEnter.ts","./handleSuperdreadnoughtMouseLeave":"events/handleSuperdreadnoughtMouseLeave.ts"}],"events/handleSuperdreadnoughtBttnClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSuperdreadnoughtBttnClick = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _handleSuperdreadnoughtCellClick = require("./handleSuperdreadnoughtCellClick");

var _handleSuperdreadnoughtMouseEnter = require("./handleSuperdreadnoughtMouseEnter");

var _handleSuperdreadnoughtMouseLeave = require("./handleSuperdreadnoughtMouseLeave");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var handleSuperdreadnoughtBttnClick = function handleSuperdreadnoughtBttnClick(ev) {
  var playerGameCells = document.querySelectorAll('.player-gameCell'); //disables this button after clicking

  this.disabled = true; //visually indicates that 'this' button is selected

  (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #f0a400'], ['color', '#f0a400']]))(this); //disables clicking on other shipButtons while selected
  //prevents double selection

  var carrierBttn = document.querySelector('.bttn-carrier');
  if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
  var battleshipBttn = document.querySelector('.bttn-battleship');
  if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
  var destroyerBttn = document.querySelector('.bttn-destroyer');
  if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn);
  var frigateBttn = document.querySelector('.bttn-frigate');
  if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn); //assigns event listeners to each player game cell after clicking superdreadnought button

  playerGameCells.forEach(function (player) {
    return (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handleSuperdreadnoughtCellClick.handleSuperdreadnoughtCellClick), (0, _elementCreators.addEvtListener)('mouseenter')(_handleSuperdreadnoughtMouseEnter.handleSuperdreadnoughtMouseEnter), (0, _elementCreators.addEvtListener)('mouseleave')(_handleSuperdreadnoughtMouseLeave.handleSuperdreadnoughtMouseLeave))(player);
  });
};

exports.handleSuperdreadnoughtBttnClick = handleSuperdreadnoughtBttnClick;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./handleSuperdreadnoughtCellClick":"events/handleSuperdreadnoughtCellClick.ts","./handleSuperdreadnoughtMouseEnter":"events/handleSuperdreadnoughtMouseEnter.ts","./handleSuperdreadnoughtMouseLeave":"events/handleSuperdreadnoughtMouseLeave.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts"}],"events/handleFrigateCellClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFrigateCellClick = void 0;

var _accumulatePlayerShipCoords = require("../components/accumulatePlayerShipCoords");

var _checkAllShipsInPlace = require("../components/checkAllShipsInPlace");

var _doesShipPlacementOverlap = require("../components/doesShipPlacementOverlap");

var _isCorrectNumberOfShips = require("../components/isCorrectNumberOfShips");

var _elementCreators = require("../utilities/elementCreators");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var _handleFrigateMouseEnter = require("./handleFrigateMouseEnter");

var _handleFrigateMouseLeave = require("./handleFrigateMouseLeave");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var handleFrigateCellClick = function handleFrigateCellClick(ev) {
  var _a, _b, _c, _d, _e;

  var playerGameCells = document.querySelectorAll('.player-gameCell'); //grabs the current state of the axis button

  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = (_a = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent) !== null && _a !== void 0 ? _a : ''; //grabs the current cell co-ordinate

  var currentCell = (_b = this.dataset.cellplayer) === null || _b === void 0 ? void 0 : _b.split(',');
  var currentX = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _c !== void 0 ? _c : '';
  var currentY = (_d = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _d !== void 0 ? _d : ''; //initializes the ship object upon first call

  if (!localStorage.getItem('frigate')) {
    localStorage.setItem('frigate', JSON.stringify([]));
  }

  var frigate = JSON.parse((_e = localStorage.getItem('frigate')) !== null && _e !== void 0 ? _e : '');
  var frigateCoords = [];
  var ship = 'frigate';
  var amount = 'double';

  if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //overlap detection
    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(1, currentAxis, currentX, currentY)) return null; //places frigate on the grid

    var nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(currentY, "\"]")); //prevents duplicate letters being placed

    if (nextCell) nextCell.textContent = '';
    (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('F'))(nextCell);
    frigateCoords.push("".concat(currentX, ",").concat(currentY)); //only updates if there are 2 or less ships

    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
      frigate.push({
        body: frigateCoords[0]
      });
    }
  } else if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) {
    return null;
  } //stores frigate


  localStorage.setItem('frigate', JSON.stringify(frigate)); //stores current ship coords to pool of all ship coords

  (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(frigateCoords);

  if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) {
    //after 'this' button has been clicked, sets the color to grey to visually indicate finished
    var frigateBttn = document.querySelector('.bttn-frigate');
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro']]))(frigateBttn); //enables events on other shipButtons after both frigates have been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click

    var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
    if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
    var carrierBttn = document.querySelector('.bttn-carrier');
    if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
    var battleshipBttn = document.querySelector('.bttn-battleship');
    if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
    var destroyerBttn = document.querySelector('.bttn-destroyer');
    if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn); //removes event listeners after both frigates have been placed

    playerGameCells.forEach(function (player) {
      (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(handleFrigateCellClick), (0, _elementCreators.removeEvtListener)('mouseenter')(_handleFrigateMouseEnter.handleFrigateMouseEnter), (0, _elementCreators.removeEvtListener)('mouseleave')(_handleFrigateMouseLeave.handleFrigateMouseLeave))(player);
    });
  } //if all ships placed, renders start button


  (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

exports.handleFrigateCellClick = handleFrigateCellClick;
},{"../components/accumulatePlayerShipCoords":"components/accumulatePlayerShipCoords.ts","../components/checkAllShipsInPlace":"components/checkAllShipsInPlace.ts","../components/doesShipPlacementOverlap":"components/doesShipPlacementOverlap.ts","../components/isCorrectNumberOfShips":"components/isCorrectNumberOfShips.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","./handleFrigateMouseEnter":"events/handleFrigateMouseEnter.ts","./handleFrigateMouseLeave":"events/handleFrigateMouseLeave.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts"}],"events/handleFrigateBttnClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFrigateBttnClick = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _handleFrigateCellClick = require("./handleFrigateCellClick");

var _handleFrigateMouseEnter = require("./handleFrigateMouseEnter");

var _handleFrigateMouseLeave = require("./handleFrigateMouseLeave");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var handleFrigateBttnClick = function handleFrigateBttnClick(ev) {
  var playerGameCells = document.querySelectorAll('.player-gameCell'); //disables this button after clicking

  this.disabled = true; //visually indicates that 'this' button is selected

  (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #f0a400'], ['color', '#f0a400']]))(this); //disables events on other shipButtons while selected
  //prevents double selection

  var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
  if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
  var carrierBttn = document.querySelector('.bttn-carrier');
  if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
  var battleshipBttn = document.querySelector('.bttn-battleship');
  if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
  var destroyerBttn = document.querySelector('.bttn-destroyer');
  if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn); //assigns event listeners to each player game cell after clicking destroyer button

  playerGameCells.forEach(function (player) {
    return (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handleFrigateCellClick.handleFrigateCellClick), (0, _elementCreators.addEvtListener)('mouseenter')(_handleFrigateMouseEnter.handleFrigateMouseEnter), (0, _elementCreators.addEvtListener)('mouseleave')(_handleFrigateMouseLeave.handleFrigateMouseLeave))(player);
  });
};

exports.handleFrigateBttnClick = handleFrigateBttnClick;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./handleFrigateCellClick":"events/handleFrigateCellClick.ts","./handleFrigateMouseEnter":"events/handleFrigateMouseEnter.ts","./handleFrigateMouseLeave":"events/handleFrigateMouseLeave.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts"}],"events/handleDestroyerCellClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDestroyerCellClick = void 0;

var _accumulatePlayerShipCoords = require("../components/accumulatePlayerShipCoords");

var _checkAllShipsInPlace = require("../components/checkAllShipsInPlace");

var _doesShipPlacementOverlap = require("../components/doesShipPlacementOverlap");

var _isCorrectNumberOfShips = require("../components/isCorrectNumberOfShips");

var _elementCreators = require("../utilities/elementCreators");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleDestroyerMouseEnter = require("./handleDestroyerMouseEnter");

var _handleDestroyerMouseLeave = require("./handleDestroyerMouseLeave");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var handleDestroyerCellClick = function handleDestroyerCellClick(ev) {
  var _a, _b, _c, _d;

  var playerGameCells = document.querySelectorAll('.player-gameCell'); //grabs the current state of the axis button

  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //initializes the ship object upon first call

  if (!localStorage.getItem('destroyer')) {
    localStorage.setItem('destroyer', JSON.stringify([]));
  }

  var destroyer = JSON.parse((_d = localStorage.getItem('destroyer')) !== null && _d !== void 0 ? _d : '');
  var destroyerCoords = [];
  var ship = 'destroyer';
  var amount = 'double'; //for horizontal placement

  if (currentAxis === 'Axis-X' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //grid boundary detection
    if (Number(currentX) > 8) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(2, currentAxis, currentX, currentY)) return null; //places destroyer on the grid

    for (var i = 0; i < 2; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]")); //prevents duplicate letters being placed

      if (nextCell) nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('D'))(nextCell);
      destroyerCoords.push("".concat(Number(currentX) + i, ",").concat(currentY));
    } //only updates if there are 2 or less ships


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
      destroyer.push({
        head: destroyerCoords[0],
        tail: destroyerCoords[1]
      });
    }
  } //for vertical placement
  else if (currentAxis === 'Axis-Y' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //grid boundary detection
    if (Number(currentY) > 8) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(2, currentAxis, currentX, currentY)) return null;

    for (var _i = 0; _i < 2; _i += 1) {
      //places destroyer on the grid
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //prevents duplicate letters being placed


      if (_nextCell) _nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('D'))(_nextCell);
      destroyerCoords.push("".concat(currentX, ",").concat(Number(currentY) + _i));
    } //only updates if there are 2 or less ships


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
      destroyer.push({
        head: destroyerCoords[0],
        tail: destroyerCoords[1]
      });
    }
  } else if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) return null; //stores destroyer


  localStorage.setItem('destroyer', JSON.stringify(destroyer)); //stores current ship coords to pool of all ship coords

  (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(destroyerCoords);

  if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) {
    //after 'this' button has been clicked, sets the color to grey to visually indicate finished
    var destroyerBttn = document.querySelector('.bttn-destroyer');
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]))(destroyerBttn); //enables events on other shipButtons after both destroyers have been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click

    var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
    if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
    var carrierBttn = document.querySelector('.bttn-carrier');
    if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
    var battleshipBttn = document.querySelector('.bttn-battleship');
    if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
    var frigateBttn = document.querySelector('.bttn-frigate');
    if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn); //removes event listeners after both destroyers have been placed

    playerGameCells.forEach(function (player) {
      (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(handleDestroyerCellClick), (0, _elementCreators.removeEvtListener)('mouseenter')(_handleDestroyerMouseEnter.handleDestroyerMouseEnter), (0, _elementCreators.removeEvtListener)('mouseleave')(_handleDestroyerMouseLeave.handleDestroyerMouseLeave))(player);
    });
  } //if all ships placed, renders start button


  (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

exports.handleDestroyerCellClick = handleDestroyerCellClick;
},{"../components/accumulatePlayerShipCoords":"components/accumulatePlayerShipCoords.ts","../components/checkAllShipsInPlace":"components/checkAllShipsInPlace.ts","../components/doesShipPlacementOverlap":"components/doesShipPlacementOverlap.ts","../components/isCorrectNumberOfShips":"components/isCorrectNumberOfShips.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleDestroyerMouseEnter":"events/handleDestroyerMouseEnter.ts","./handleDestroyerMouseLeave":"events/handleDestroyerMouseLeave.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts"}],"events/handleDestroyerBttnClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDestroyerBttnClick = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _handleDestroyerCellClick = require("./handleDestroyerCellClick");

var _handleDestroyerMouseEnter = require("./handleDestroyerMouseEnter");

var _handleDestroyerMouseLeave = require("./handleDestroyerMouseLeave");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var handleDestroyerBttnClick = function handleDestroyerBttnClick(ev) {
  var playerGameCells = document.querySelectorAll('.player-gameCell'); //assigns event listeners to each player game cell after clicking destroyer button

  playerGameCells.forEach(function (player) {
    return (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handleDestroyerCellClick.handleDestroyerCellClick), (0, _elementCreators.addEvtListener)('mouseenter')(_handleDestroyerMouseEnter.handleDestroyerMouseEnter), (0, _elementCreators.addEvtListener)('mouseleave')(_handleDestroyerMouseLeave.handleDestroyerMouseLeave))(player);
  }); //disables this button after clicking

  this.disabled = true; //visually indicates that 'this' button is selected

  (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #f0a400'], ['color', '#f0a400']]))(this); //disables clicking on other shipButtons while selected
  //prevents double selection

  var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
  if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
  var carrierBttn = document.querySelector('.bttn-carrier');
  if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
  var battleshipBttn = document.querySelector('.bttn-battleship');
  if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
  var frigateBttn = document.querySelector('.bttn-frigate');
  if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn);
};

exports.handleDestroyerBttnClick = handleDestroyerBttnClick;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./handleDestroyerCellClick":"events/handleDestroyerCellClick.ts","./handleDestroyerMouseEnter":"events/handleDestroyerMouseEnter.ts","./handleDestroyerMouseLeave":"events/handleDestroyerMouseLeave.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts"}],"events/handleCarrierCellClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCarrierCellClick = void 0;

var _accumulatePlayerShipCoords = require("../components/accumulatePlayerShipCoords");

var _checkAllShipsInPlace = require("../components/checkAllShipsInPlace");

var _doesShipPlacementOverlap = require("../components/doesShipPlacementOverlap");

var _isCorrectNumberOfShips = require("../components/isCorrectNumberOfShips");

var _elementCreators = require("../utilities/elementCreators");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var _handleCarrierMouseEnter = require("./handleCarrierMouseEnter");

var _handleCarrierMouseLeave = require("./handleCarrierMouseLeave");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var handleCarrierCellClick = function handleCarrierCellClick(ev) {
  var _a, _b, _c, _d;

  var playerGameCells = document.querySelectorAll('.player-gameCell'); //grabs the current state of the axis button

  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //initializes the carrier object upon first call

  if (!localStorage.getItem('carrier')) {
    localStorage.setItem('carrier', JSON.stringify([]));
  }

  var carrier = JSON.parse((_d = localStorage.getItem('carrier')) !== null && _d !== void 0 ? _d : '');
  var carrierCoords = [];
  var ship = 'carrier';
  var amount = 'single'; //for horizontal placement

  if (currentAxis === 'Axis-X' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //grid boundary detection
    if (Number(currentX) > 6) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(4, currentAxis, currentX, currentY)) return null; //places carrier on grid

    for (var i = 0; i < 4; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]")); //prevents duplicate letters being placed

      if (nextCell) nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('C'))(nextCell);
      carrierCoords.push("".concat(Number(currentX) + i, ",").concat(currentY));
    } //prevents updating after first click


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
      //update carrier object attributes
      carrier = {
        head: carrierCoords[0],
        body1: carrierCoords[1],
        body2: carrierCoords[2],
        tail: carrierCoords[3]
      };
    }

    localStorage.setItem('isSingleCarrier', JSON.stringify(false));
  } //for vertical placement
  else if (currentAxis === 'Axis-Y' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //grid boundary detection
    if (Number(currentY) > 6) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(4, currentAxis, currentX, currentY)) return null; //places carrier on grid

    for (var _i = 0; _i < 4; _i += 1) {
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //prevents duplicate letters being placed


      if (_nextCell) _nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('C'))(_nextCell);
      carrierCoords.push("".concat(currentX, ",").concat(Number(currentY) + _i));
    } //prevents updating after first click


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
      //updates carrier object attributes
      carrier = {
        head: carrierCoords[0],
        body1: carrierCoords[1],
        body2: carrierCoords[2],
        tail: carrierCoords[3]
      };
    }

    localStorage.setItem('isSingleCarrier', JSON.stringify(false));
  } //stores carrier


  localStorage.setItem('carrier', JSON.stringify(carrier)); //stores current ship coords to pool of all ship coords

  (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(carrierCoords);

  if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
    //after 'this' button has been clicked, sets the color to grey to visually indicate finished
    var carrierBttn = document.querySelector('.bttn-carrier');
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]))(carrierBttn); //enables events on other shipButtons after carrier has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click

    var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
    if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
    var battleshipBttn = document.querySelector('.bttn-battleship');
    if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
    var destroyerBttn = document.querySelector('.bttn-destroyer');
    if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn);
    var frigateBttn = document.querySelector('.bttn-frigate');
    if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn); //removes event listeners after single carrier has been placed

    playerGameCells.forEach(function (player) {
      (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(handleCarrierCellClick), (0, _elementCreators.removeEvtListener)('mouseenter')(_handleCarrierMouseEnter.handleCarrierMouseEnter), (0, _elementCreators.removeEvtListener)('mouseleave')(_handleCarrierMouseLeave.handleCarrierMouseLeave))(player);
    });
  } //if all ships placed, renders start button


  (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

exports.handleCarrierCellClick = handleCarrierCellClick;
},{"../components/accumulatePlayerShipCoords":"components/accumulatePlayerShipCoords.ts","../components/checkAllShipsInPlace":"components/checkAllShipsInPlace.ts","../components/doesShipPlacementOverlap":"components/doesShipPlacementOverlap.ts","../components/isCorrectNumberOfShips":"components/isCorrectNumberOfShips.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","./handleCarrierMouseEnter":"events/handleCarrierMouseEnter.ts","./handleCarrierMouseLeave":"events/handleCarrierMouseLeave.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts"}],"events/handleCarrierBttnClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCarrierBttnClick = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _handleCarrierCellClick = require("./handleCarrierCellClick");

var _handleCarrierMouseEnter = require("./handleCarrierMouseEnter");

var _handleCarrierMouseLeave = require("./handleCarrierMouseLeave");

var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var handleCarrierBttnClick = function handleCarrierBttnClick(ev) {
  var playerGameCells = document.querySelectorAll('.player-gameCell'); //disables button after clicking once

  this.disabled = true; //visually indicates that 'this' button is selected

  (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #f0a400'], ['color', '#f0a400']]))(this); //disables clicking on other shipButtons while selected
  //prevents double selection

  var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
  if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
  var battleshipBttn = document.querySelector('.bttn-battleship');
  if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick))(battleshipBttn);
  var destroyerBttn = document.querySelector('.bttn-destroyer');
  if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn);
  var frigateBttn = document.querySelector('.bttn-frigate');
  if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn); //assigns event listener to each player game cell after clicking superdreadnought button

  playerGameCells.forEach(function (player) {
    return (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handleCarrierCellClick.handleCarrierCellClick), (0, _elementCreators.addEvtListener)('mouseenter')(_handleCarrierMouseEnter.handleCarrierMouseEnter), (0, _elementCreators.addEvtListener)('mouseleave')(_handleCarrierMouseLeave.handleCarrierMouseLeave))(player);
  });
};

exports.handleCarrierBttnClick = handleCarrierBttnClick;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./handleCarrierCellClick":"events/handleCarrierCellClick.ts","./handleCarrierMouseEnter":"events/handleCarrierMouseEnter.ts","./handleCarrierMouseLeave":"events/handleCarrierMouseLeave.ts","./handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts"}],"events/handleBattleshipCellClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBattleshipCellClick = void 0;

var _accumulatePlayerShipCoords = require("../components/accumulatePlayerShipCoords");

var _checkAllShipsInPlace = require("../components/checkAllShipsInPlace");

var _doesShipPlacementOverlap = require("../components/doesShipPlacementOverlap");

var _isCorrectNumberOfShips = require("../components/isCorrectNumberOfShips");

var _elementCreators = require("../utilities/elementCreators");

var _handleBattleshipMouseEnter = require("./handleBattleshipMouseEnter");

var _handleBattleshipMouseLeave = require("./handleBattleshipMouseLeave");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var handleBattleshipCellClick = function handleBattleshipCellClick(ev) {
  var _a, _b, _c, _d;

  var playerGameCells = document.querySelectorAll('.player-gameCell'); //grabs the current state of the axis button

  var axisSelector = document.querySelector('.bttn-axisSelector');
  var currentAxis = axisSelector === null || axisSelector === void 0 ? void 0 : axisSelector.textContent; //grabs the current cell co-ordinate

  var currentCell = (_a = this.dataset.cellplayer) === null || _a === void 0 ? void 0 : _a.split(',');
  var currentX = (_b = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0]) !== null && _b !== void 0 ? _b : '';
  var currentY = (_c = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1]) !== null && _c !== void 0 ? _c : ''; //initializes the ship object upon first call

  if (!localStorage.getItem('battleship')) {
    localStorage.setItem('battleship', JSON.stringify(''));
  }

  var battleship = JSON.parse((_d = localStorage.getItem('battleship')) !== null && _d !== void 0 ? _d : '');
  var battleshipCoords = [];
  var ship = 'battleship';
  var amount = 'single'; //for horizontal placement

  if (currentAxis === 'Axis-X' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //grid boundary detection
    if (Number(currentX) > 7) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(3, currentAxis, currentX, currentY)) return null; //places battleship on the grid

    for (var i = 0; i < 3; i += 1) {
      var nextCell = document.querySelector("[data-cellplayer=\"".concat(Number(currentX) + i, ",").concat(currentY, "\"]"));
      if (nextCell) nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('B'))(nextCell);
      battleshipCoords.push("".concat(Number(currentX) + i, ",").concat(currentY));
    } //prevents updating after first click


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, 'single')) {
      //updates battleship object attributes
      battleship = {
        head: battleshipCoords[0],
        body: battleshipCoords[1],
        tail: battleshipCoords[2]
      };
    }

    localStorage.setItem('isSingleBattleship', JSON.stringify(false));
  } //for vertical placement
  else if (currentAxis === 'Axis-Y' && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
    //grid boundary detection
    if (Number(currentY) > 7) {
      alert('Please stay within boundaries of the sector (｡•́︿•̀｡)');
      return null;
    } //overlap detection


    if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(3, currentAxis, currentX, currentY)) return null;

    for (var _i = 0; _i < 3; _i += 1) {
      //places battleship on the grid
      var _nextCell = document.querySelector("[data-cellplayer=\"".concat(currentX, ",").concat(Number(currentY) + _i, "\"]")); //prevents duplicate letters being placed


      if (_nextCell) _nextCell.textContent = '';
      (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([['class', 'playerShipPresent player-gameCell']]), (0, _elementCreators.addStyleToElem)([['color', '#f0a400'], ['cursor', 'default']]), (0, _elementCreators.addTextToElem)('B'))(_nextCell);
      battleshipCoords.push("".concat(currentX, ",").concat(Number(currentY) + _i));
    } //prevents updating after first click


    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, 'single')) {
      //updates battleship object attributes
      battleship = {
        head: battleshipCoords[0],
        body: battleshipCoords[1],
        tail: battleshipCoords[2]
      };
    }

    localStorage.setItem('isSingleBattleship', JSON.stringify(false));
  } //stores battleship


  localStorage.setItem('battleship', JSON.stringify(battleship)); //stores current ship coords to pool of all ship coords

  (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(battleshipCoords);

  if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
    //after 'this' button has been clicked, sets the color to grey to visually indicate finished
    var battleshipBttn = document.querySelector('.bttn-battleship');
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]))(battleshipBttn); //enables events on other shipButtons after battleship has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click

    var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
    if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
    var carrierBttn = document.querySelector('.bttn-carrier');
    if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
    var destroyerBttn = document.querySelector('.bttn-destroyer');
    if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn);
    var frigateBttn = document.querySelector('.bttn-frigate');
    if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #00f000'], ['color', '#00f000'], ['cursor', 'pointer']]), (0, _elementCreators.addEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn); //removes event listeners after battleship has been placed

    playerGameCells.forEach(function (player) {
      (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)('click')(handleBattleshipCellClick), (0, _elementCreators.removeEvtListener)('mouseenter')(_handleBattleshipMouseEnter.handleBattleshipMouseEnter), (0, _elementCreators.removeEvtListener)('mouseleave')(_handleBattleshipMouseLeave.handleBattleshipMouseLeave))(player);
    });
  } //if all ships placed, renders start button


  (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

exports.handleBattleshipCellClick = handleBattleshipCellClick;
},{"../components/accumulatePlayerShipCoords":"components/accumulatePlayerShipCoords.ts","../components/checkAllShipsInPlace":"components/checkAllShipsInPlace.ts","../components/doesShipPlacementOverlap":"components/doesShipPlacementOverlap.ts","../components/isCorrectNumberOfShips":"components/isCorrectNumberOfShips.ts","../utilities/elementCreators":"utilities/elementCreators.ts","./handleBattleshipMouseEnter":"events/handleBattleshipMouseEnter.ts","./handleBattleshipMouseLeave":"events/handleBattleshipMouseLeave.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts"}],"events/handleBattleshipBttnClick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBattleshipBttnClick = void 0;

var _elementCreators = require("../utilities/elementCreators");

var _handleBattleshipCellClick = require("./handleBattleshipCellClick");

var _handleBattleshipMouseEnter = require("./handleBattleshipMouseEnter");

var _handleBattleshipMouseLeave = require("./handleBattleshipMouseLeave");

var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");

var _handleCarrierBttnClick = require("./handleCarrierBttnClick");

var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");

var _handleFrigateBttnClick = require("./handleFrigateBttnClick");

var handleBattleshipBttnClick = function handleBattleshipBttnClick(ev) {
  var playerGameCells = document.querySelectorAll('.player-gameCell'); //disables this button after clicking

  this.disabled = true; //visually indicates that 'this' button is selected

  (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid #f0a400'], ['color', '#f0a400']]))(this); //disables clicking on other shipButtons while selected
  //prevents double selection

  var superdreadnoughtBttn = document.querySelector('.bttn-superdreadnought');
  if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick))(superdreadnoughtBttn);
  var carrierBttn = document.querySelector('.bttn-carrier');
  if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick))(carrierBttn);
  var destroyerBttn = document.querySelector('.bttn-destroyer');
  if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick))(destroyerBttn);
  var frigateBttn = document.querySelector('.bttn-frigate');
  if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([['border', '1px solid gainsboro'], ['color', 'gainsboro'], ['cursor', 'not-allowed']]), (0, _elementCreators.removeEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick))(frigateBttn); //assigns event listeners to each player game cell after clicking battleship button

  playerGameCells.forEach(function (player) {
    return (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handleBattleshipCellClick.handleBattleshipCellClick), (0, _elementCreators.addEvtListener)('mouseenter')(_handleBattleshipMouseEnter.handleBattleshipMouseEnter), (0, _elementCreators.addEvtListener)('mouseleave')(_handleBattleshipMouseLeave.handleBattleshipMouseLeave))(player);
  });
};

exports.handleBattleshipBttnClick = handleBattleshipBttnClick;
},{"../utilities/elementCreators":"utilities/elementCreators.ts","./handleBattleshipCellClick":"events/handleBattleshipCellClick.ts","./handleBattleshipMouseEnter":"events/handleBattleshipMouseEnter.ts","./handleBattleshipMouseLeave":"events/handleBattleshipMouseLeave.ts","./handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts","./handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","./handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","./handleFrigateBttnClick":"events/handleFrigateBttnClick.ts"}],"components/renderShipSelectionBttns.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderShipSelectionBttns = void 0;

var _handleAxisToggleClick = require("../events/handleAxisToggleClick");

var _handleBattleshipBttnClick = require("../events/handleBattleshipBttnClick");

var _handleCarrierBttnClick = require("../events/handleCarrierBttnClick");

var _handleDestroyerBttnClick = require("../events/handleDestroyerBttnClick");

var _handleFrigateBttnClick = require("../events/handleFrigateBttnClick");

var _handleSuperdreadnoughtBttnClick = require("../events/handleSuperdreadnoughtBttnClick");

var _elementCreators = require("../utilities/elementCreators");

var renderShipSelectionBttns = function renderShipSelectionBttns() {
  var log = function log(i) {
    return console.log('\n', i, '\n');
  };

  var main = document.querySelector('.main');
  var shipBttnsWrapper = (0, _elementCreators.elemCreator)('div')(['shipBttns-wrapper']);
  (0, _elementCreators.appendElemToParent)(main)(shipBttnsWrapper);
  var shipsBttnContainer = (0, _elementCreators.elemCreator)('div')(['shipsBttn-container']);
  (0, _elementCreators.appendElemToParent)(shipBttnsWrapper)(shipsBttnContainer);
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Superdreadnought'), (0, _elementCreators.addEvtListener)('click')(_handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick), (0, _elementCreators.addAttributeToElem)([['type', 'button'], ['value', 'superdreadnought']]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)('button')(['bttn-superdreadnought']));
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Carrier'), (0, _elementCreators.addEvtListener)('click')(_handleCarrierBttnClick.handleCarrierBttnClick), (0, _elementCreators.addAttributeToElem)([['type', 'button'], ['value', 'carrier']]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)('button')(['bttn-carrier']));
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Battleship'), (0, _elementCreators.addEvtListener)('click')(_handleBattleshipBttnClick.handleBattleshipBttnClick), (0, _elementCreators.addAttributeToElem)([['type', 'button'], ['value', 'battleship']]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)('button')(['bttn-battleship']));
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Destroyer'), (0, _elementCreators.addEvtListener)('click')(_handleDestroyerBttnClick.handleDestroyerBttnClick), (0, _elementCreators.addAttributeToElem)([['type', 'button'], ['value', 'destroyer']]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)('button')(['bttn-destroyer']));
  (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)('Frigate'), (0, _elementCreators.addEvtListener)('click')(_handleFrigateBttnClick.handleFrigateBttnClick), (0, _elementCreators.addAttributeToElem)([['type', 'button'], ['value', 'frigate']]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)('button')(['bttn-frigate'])); //axis selector button

  (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)('click')(_handleAxisToggleClick.handleAxisToggleClick), (0, _elementCreators.addTextToElem)('Axis-X'), (0, _elementCreators.addAttributeToElem)([['type', 'button'], ['value', 'axis-x']]), (0, _elementCreators.appendElemToParent)(shipBttnsWrapper))((0, _elementCreators.elemCreator)('button')(['bttn', 'bttn-axisSelector']));
};

exports.renderShipSelectionBttns = renderShipSelectionBttns;
},{"../events/handleAxisToggleClick":"events/handleAxisToggleClick.ts","../events/handleBattleshipBttnClick":"events/handleBattleshipBttnClick.ts","../events/handleCarrierBttnClick":"events/handleCarrierBttnClick.ts","../events/handleDestroyerBttnClick":"events/handleDestroyerBttnClick.ts","../events/handleFrigateBttnClick":"events/handleFrigateBttnClick.ts","../events/handleSuperdreadnoughtBttnClick":"events/handleSuperdreadnoughtBttnClick.ts","../utilities/elementCreators":"utilities/elementCreators.ts"}],"components/renderGamePage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderGamePage = void 0;

var _renderPlayerBoard = require("./renderPlayerBoard");

var _renderPlayerInfoScreen = require("./renderPlayerInfoScreen");

var _renderShipSelectionBttns = require("./renderShipSelectionBttns");

var renderGamePage = function renderGamePage(playerName_) {
  var playerName = playerName_; //removes main page content

  var greetingsContainer = document.querySelector('.greetings-container');
  greetingsContainer === null || greetingsContainer === void 0 ? void 0 : greetingsContainer.remove();
  var formContainer = document.querySelector('.form-container');
  formContainer === null || formContainer === void 0 ? void 0 : formContainer.remove(); //renders pre-battle speech and ship placement functionality

  (0, _renderPlayerInfoScreen.renderPlayerInfoScreen)(playerName);
  (0, _renderShipSelectionBttns.renderShipSelectionBttns)();
  (0, _renderPlayerBoard.renderPlayerBoard)();
};

exports.renderGamePage = renderGamePage;
},{"./renderPlayerBoard":"components/renderPlayerBoard.ts","./renderPlayerInfoScreen":"components/renderPlayerInfoScreen.ts","./renderShipSelectionBttns":"components/renderShipSelectionBttns.ts"}],"events/receiveFormName.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveFormName = void 0;

var _renderGamePage = require("../components/renderGamePage");

var receiveFormName = function receiveFormName(ev) {
  var _a, _b;

  ev.preventDefault();
  var formData = new FormData(this);
  var playerName = (_b = (_a = formData.get('form-name-input')) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : ''; //stores playerName to use for battle texts

  if (!localStorage.getItem('playerName')) {
    localStorage.setItem('playerName', JSON.stringify(playerName));
  }

  (0, _renderGamePage.renderGamePage)(playerName);
};

exports.receiveFormName = receiveFormName;
},{"../components/renderGamePage":"components/renderGamePage.ts"}],"components/addEvtListenerToForm.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEvtListenerToForm = void 0;

var _receiveFormName = require("../events/receiveFormName");

var addEvtListenerToForm = function addEvtListenerToForm() {
  var formName = document.querySelector('#form-name');
  formName === null || formName === void 0 ? void 0 : formName.addEventListener('submit', _receiveFormName.receiveFormName);
};

exports.addEvtListenerToForm = addEvtListenerToForm;
},{"../events/receiveFormName":"events/receiveFormName.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _addEvtListenerToForm = require("./components/addEvtListenerToForm");

var mainApp = function mainApp() {
  (0, _addEvtListenerToForm.addEvtListenerToForm)(); //clears storage upon refresh

  localStorage.clear();
};

document.addEventListener('DOMContentLoaded', mainApp);
},{"./components/addEvtListenerToForm":"components/addEvtListenerToForm.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34571" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map