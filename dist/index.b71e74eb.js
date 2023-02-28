// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"17ZdQ":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, importScripts */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ("reload" in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                if (asset.type === "js") {
                    if (typeof document !== "undefined") {
                        let script = document.createElement("script");
                        script.src = asset.url;
                        return new Promise((resolve, reject)=>{
                            var _document$head;
                            script.onload = ()=>resolve(script);
                            script.onerror = reject;
                            (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
                        });
                    } else if (typeof importScripts === "function") return new Promise((resolve, reject)=>{
                        try {
                            importScripts(asset.url);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h7u1C":[function(require,module,exports) {
var _addEvtListenerToForm = require("./components/addEvtListenerToForm");
const mainApp = function() {
    (0, _addEvtListenerToForm.addEvtListenerToForm)();
    //clears storage upon refresh
    localStorage.clear();
};
document.addEventListener("DOMContentLoaded", mainApp);

},{"./components/addEvtListenerToForm":"lOujp"}],"lOujp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addEvtListenerToForm", ()=>addEvtListenerToForm);
var _receiveFormName = require("../events/receiveFormName");
const addEvtListenerToForm = function() {
    const formName = document.querySelector("#form-name");
    formName?.addEventListener("submit", (0, _receiveFormName.receiveFormName));
};

},{"../events/receiveFormName":"2gRSB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2gRSB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "receiveFormName", ()=>receiveFormName);
var _renderGamePage = require("../components/renderGamePage");
const receiveFormName = function(ev) {
    ev.preventDefault();
    const formData = new FormData(this);
    const playerName = formData.get("form-name-input")?.toString() ?? "";
    //stores playerName to use for battle texts
    if (!localStorage.getItem("playerName")) localStorage.setItem("playerName", JSON.stringify(playerName));
    (0, _renderGamePage.renderGamePage)(playerName);
};

},{"../components/renderGamePage":"3DtTA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3DtTA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderGamePage", ()=>renderGamePage);
var _renderPlayerBoard = require("./renderPlayerBoard");
var _renderPlayerInfoScreen = require("./renderPlayerInfoScreen");
var _renderShipSelectionBttns = require("./renderShipSelectionBttns");
const renderGamePage = function(playerName_) {
    const playerName = playerName_;
    //removes main page content
    const headerLinks = document.querySelector(".header__links");
    headerLinks?.remove();
    const greetingsContainer = document.querySelector(".greetings-container");
    greetingsContainer?.remove();
    const formContainer = document.querySelector("#form-name");
    formContainer?.remove();
    //renders pre-battle speech and ship placement functionality
    (0, _renderPlayerInfoScreen.renderPlayerInfoScreen)(playerName);
    (0, _renderShipSelectionBttns.renderShipSelectionBttns)();
    (0, _renderPlayerBoard.renderPlayerBoard)();
};

},{"./renderPlayerBoard":"fC1Ui","./renderPlayerInfoScreen":"3f75x","./renderShipSelectionBttns":"cYI77","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fC1Ui":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderPlayerBoard", ()=>renderPlayerBoard);
var _elementCreators = require("../utilities/elementCreators");
const renderPlayerBoard = function() {
    const main = document.querySelector(".main");
    const bothBoardsContainer = (0, _elementCreators.elemCreator)("div")([
        "bothBoards-container"
    ]);
    (0, _elementCreators.appendElemToParent)(main)(bothBoardsContainer);
    const playerBoardWrapper = (0, _elementCreators.elemCreator)("div")([
        "playerBoard-wrapper"
    ]);
    (0, _elementCreators.appendElemToParent)(bothBoardsContainer)(playerBoardWrapper);
    const playerBoardContainer = (0, _elementCreators.elemCreator)("div")([
        "playerBoard-container"
    ]);
    (0, _elementCreators.appendElemToParent)(playerBoardWrapper)(playerBoardContainer);
    for(let i = 0; i < 10; i += 1)for(let j = 0; j < 10; j += 1)//renders a div per iteration of for-loop and append
    (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
        [
            "data-cellplayer",
            `${j},${i}`
        ]
    ]), (0, _elementCreators.appendElemToParent)(playerBoardContainer))((0, _elementCreators.elemCreator)("div")([
        "player-gameCell"
    ]));
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"H4ivl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "elemCreator", ()=>elemCreator);
parcelHelpers.export(exports, "appendElemToParent", ()=>appendElemToParent);
parcelHelpers.export(exports, "addTextToElem", ()=>addTextToElem);
parcelHelpers.export(exports, "addAttributeToElem", ()=>addAttributeToElem);
parcelHelpers.export(exports, "createImage", ()=>createImage);
parcelHelpers.export(exports, "addEvtListener", ()=>addEvtListener);
parcelHelpers.export(exports, "removeEvtListener", ()=>removeEvtListener);
parcelHelpers.export(exports, "addStyleToElem", ()=>addStyleToElem);
parcelHelpers.export(exports, "pipe", ()=>pipe);
const elemCreator = (elem_)=>(class_)=>{
        const element = document.createElement(elem_);
        return class_.reduce((elem, currClass)=>{
            elem.classList.add(currClass);
            return elem;
        }, element);
    };
const addAttributeToElem = (attrVals_)=>(elem_)=>{
        return attrVals_.reduce((element, curr)=>{
            if (curr.length > 2) return undefined;
            element?.setAttribute(curr[0], curr[1]);
            return element;
        }, elem_);
    };
const addStyleToElem = (stylePropVals_)=>(elem_)=>{
        return stylePropVals_.reduce((element, curr)=>{
            if (curr.length > 2) return undefined;
            element?.style.setProperty(curr[0], curr[1]);
            return element;
        }, elem_);
    };
const addTextToElem = (text_)=>(elem_)=>{
        const textNode = document.createTextNode(text_);
        elem_?.appendChild(textNode);
        return elem_;
    };
const appendElemToParent = (parent_)=>(child_)=>{
        if (child_) parent_?.appendChild(child_);
    };
const createImage = (source_)=>(class_)=>(alt_)=>(title_)=>{
                const image = new Image();
                image.src = source_;
                image.alt = alt_;
                image.title = title_;
                return class_.reduce((elem, currClass)=>{
                    elem.classList.add(currClass);
                    return elem;
                }, image);
            };
const addEvtListener = (evt_)=>(handleEvt_)=>(elem_)=>{
            elem_?.addEventListener(evt_, handleEvt_);
            return elem_;
        };
const removeEvtListener = (evt_)=>(handleEvt_)=>(elem_)=>{
            elem_?.removeEventListener(evt_, handleEvt_);
            return elem_;
        };
const pipe = (...funcs)=>(value)=>funcs.reduce((res, func)=>func(res), value);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3f75x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderPlayerInfoScreen", ()=>renderPlayerInfoScreen);
var _elementCreators = require("../utilities/elementCreators");
const renderPlayerInfoScreen = function(playerName_) {
    // scroll to top of page
    window.scrollTo(0, 0);
    const main = document.querySelector(".main");
    const infoScreenWrapper = (0, _elementCreators.elemCreator)("div")([
        "preBattle-infoScreen"
    ]);
    (0, _elementCreators.appendElemToParent)(main)(infoScreenWrapper);
    const infoScreenContainer = (0, _elementCreators.elemCreator)("div")([
        "infoScreen-container"
    ]);
    (0, _elementCreators.appendElemToParent)(infoScreenWrapper)(infoScreenContainer);
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Sailors of Manticore!`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`You stand on the precipice of a great battle, a battle that has been months in the making. The galaxy watches with bated breath as we prepare to face our enemy, the tyrannical People's Republic of Haven. But we do not stand alone. The hopes and prayers of all those who cherish freedom and liberty march with us into battle.`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Shall we allow our audacious enemies to violate with impunity the territory of the Kingdom? Will you permit the fleet to escape which has carried terror into your families? You will not!`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Let our enemies tremble at the sound of our thundering grasers! Let them cower before our fierce determination and unbreakable will! For we are the soldiers of Manticore, and we will not allow our kingdom to be violated or our families to be terrorized!`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Our cause is just, our determination unbreakable, and our courage unwavering. We fight not just for our kingdom, but for the ideals that it represents: justice, freedom, and the rule of law. Our enemy seeks to trample these ideals underfoot, but we will not let them!`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`I have faith in you, my fellow sailors. I have seen your bravery, your tenacity, and your skill. You are the best of the best, the defenders of our beloved Manticore. And so I say to you, go forth into battle with heads held high, with hearts filled with the spirit of Manticore. The eyes of the galaxy are upon us, and we will not disappoint. Victory is within our grasp, and we shall seize it with all our might!`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`We are the defenders of the Star Kingdom of Manticore, and we will fight to protect our people and our home. We will stand strong against the enemy, and we will not rest until they are defeated and our kingdom is safe!`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Ready fleet formation, Admiral ${playerName_}.`), (0, _elementCreators.appendElemToParent)(infoScreenContainer))((0, _elementCreators.elemCreator)("p")([
        "infoScreen-preBattleMssg"
    ]));
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cYI77":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderShipSelectionBttns", ()=>renderShipSelectionBttns);
var _handleAxisToggleClick = require("../events/handleAxisToggleClick");
var _handleBattleshipBttnClick = require("../events/handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("../events/handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("../events/handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("../events/handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("../events/handleSuperdreadnoughtBttnClick");
var _elementCreators = require("../utilities/elementCreators");
const renderShipSelectionBttns = function() {
    const main = document.querySelector(".main");
    const shipBttnsWrapper = (0, _elementCreators.elemCreator)("div")([
        "shipBttns-wrapper"
    ]);
    (0, _elementCreators.appendElemToParent)(main)(shipBttnsWrapper);
    const shipsBttnContainer = (0, _elementCreators.elemCreator)("div")([
        "shipsBttn-container"
    ]);
    (0, _elementCreators.appendElemToParent)(shipBttnsWrapper)(shipsBttnContainer);
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Superdreadnought"), (0, _elementCreators.addEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)), (0, _elementCreators.addAttributeToElem)([
        [
            "type",
            "button"
        ],
        [
            "value",
            "superdreadnought"
        ], 
    ]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)("button")([
        "bttn-superdreadnought"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Carrier"), (0, _elementCreators.addEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)), (0, _elementCreators.addAttributeToElem)([
        [
            "type",
            "button"
        ],
        [
            "value",
            "carrier"
        ], 
    ]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)("button")([
        "bttn-carrier"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Battleship"), (0, _elementCreators.addEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)), (0, _elementCreators.addAttributeToElem)([
        [
            "type",
            "button"
        ],
        [
            "value",
            "battleship"
        ], 
    ]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)("button")([
        "bttn-battleship"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Destroyer"), (0, _elementCreators.addEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)), (0, _elementCreators.addAttributeToElem)([
        [
            "type",
            "button"
        ],
        [
            "value",
            "destroyer"
        ], 
    ]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)("button")([
        "bttn-destroyer"
    ]));
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Frigate"), (0, _elementCreators.addEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)), (0, _elementCreators.addAttributeToElem)([
        [
            "type",
            "button"
        ],
        [
            "value",
            "frigate"
        ], 
    ]), (0, _elementCreators.appendElemToParent)(shipsBttnContainer))((0, _elementCreators.elemCreator)("button")([
        "bttn-frigate"
    ]));
    //axis selector button
    (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleAxisToggleClick.handleAxisToggleClick)), (0, _elementCreators.addTextToElem)("Axis-X"), (0, _elementCreators.addAttributeToElem)([
        [
            "type",
            "button"
        ],
        [
            "value",
            "axis-x"
        ], 
    ]), (0, _elementCreators.appendElemToParent)(shipBttnsWrapper))((0, _elementCreators.elemCreator)("button")([
        "bttn",
        "bttn-axisSelector"
    ]));
};

},{"../events/handleAxisToggleClick":"CL021","../events/handleBattleshipBttnClick":"4YxkI","../events/handleCarrierBttnClick":"38NmJ","../events/handleDestroyerBttnClick":"1zjy0","../events/handleFrigateBttnClick":"4QZ7c","../events/handleSuperdreadnoughtBttnClick":"iL6A7","../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"CL021":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleAxisToggleClick", ()=>handleAxisToggleClick);
const handleAxisToggleClick = function(ev) {
    const currentText = this.textContent;
    if (currentText === "Axis-X") {
        this.textContent = "";
        this.textContent = "Axis-Y";
    } else if (currentText === "Axis-Y") {
        this.textContent = "";
        this.textContent = "Axis-X";
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4YxkI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleBattleshipBttnClick", ()=>handleBattleshipBttnClick);
var _elementCreators = require("../utilities/elementCreators");
var _handleBattleshipCellClick = require("./handleBattleshipCellClick");
var _handleBattleshipMouseEnter = require("./handleBattleshipMouseEnter");
var _handleBattleshipMouseLeave = require("./handleBattleshipMouseLeave");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleBattleshipBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //disables this button after clicking
    this.disabled = true;
    //visually indicates that 'this' button is selected
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid #f0a400"
        ],
        [
            "color",
            "#f0a400"
        ], 
    ]))(this);
    //disables clicking on other shipButtons while selected
    //prevents double selection
    const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
    if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
    const carrierBttn = document.querySelector(".bttn-carrier");
    if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
    const destroyerBttn = document.querySelector(".bttn-destroyer");
    if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
    const frigateBttn = document.querySelector(".bttn-frigate");
    if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
    //assigns event listeners to each player game cell after clicking battleship button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleBattleshipCellClick.handleBattleshipCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleBattleshipMouseEnter.handleBattleshipMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleBattleshipMouseLeave.handleBattleshipMouseLeave)))(player));
};

},{"../utilities/elementCreators":"H4ivl","./handleBattleshipCellClick":"8b5eS","./handleBattleshipMouseEnter":"20QiK","./handleBattleshipMouseLeave":"byPhE","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8b5eS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleBattleshipCellClick", ()=>handleBattleshipCellClick);
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
const handleBattleshipCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //initializes the ship object upon first call
    if (!localStorage.getItem("battleship")) localStorage.setItem("battleship", JSON.stringify(""));
    let battleship = JSON.parse(localStorage.getItem("battleship") ?? "");
    const battleshipCoords = [];
    const ship = "battleship";
    const amount = "single";
    //for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentX) > 7) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(3, currentAxis, currentX, currentY)) return null;
        //places battleship on the grid
        for(let i = 0; i < 3; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("B"))(nextCell);
            battleshipCoords.push(`${Number(currentX) + i},${currentY}`);
        }
        //prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, "single")) //updates battleship object attributes
        battleship = {
            head: battleshipCoords[0],
            body: battleshipCoords[1],
            tail: battleshipCoords[2]
        };
        localStorage.setItem("isSingleBattleship", JSON.stringify(false));
    } else if (currentAxis === "Axis-Y" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentY) > 7) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(3, currentAxis, currentX, currentY)) return null;
        for(let i = 0; i < 3; i += 1){
            //places battleship on the grid
            const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i}"]`);
            //prevents duplicate letters being placed
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("B"))(nextCell);
            battleshipCoords.push(`${currentX},${Number(currentY) + i}`);
        }
        //prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, "single")) //updates battleship object attributes
        battleship = {
            head: battleshipCoords[0],
            body: battleshipCoords[1],
            tail: battleshipCoords[2]
        };
        localStorage.setItem("isSingleBattleship", JSON.stringify(false));
    }
    //stores battleship
    localStorage.setItem("battleship", JSON.stringify(battleship));
    //stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(battleshipCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
        //after 'this' button has been clicked, sets the color to grey to visually indicate finished
        const battleshipBttn = document.querySelector(".bttn-battleship");
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid gainsboro"
            ],
            [
                "color",
                "gainsboro"
            ],
            [
                "cursor",
                "not-allowed"
            ], 
        ]))(battleshipBttn);
        //enables events on other shipButtons after battleship has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
        const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
        if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
        const carrierBttn = document.querySelector(".bttn-carrier");
        if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
        const destroyerBttn = document.querySelector(".bttn-destroyer");
        if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
        const frigateBttn = document.querySelector(".bttn-frigate");
        if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
        //removes event listeners after battleship has been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleBattleshipCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleBattleshipMouseEnter.handleBattleshipMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleBattleshipMouseLeave.handleBattleshipMouseLeave)))(player);
        });
    }
    //if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../components/accumulatePlayerShipCoords":"9lJOj","../components/checkAllShipsInPlace":"6FcJc","../components/doesShipPlacementOverlap":"iGKQQ","../components/isCorrectNumberOfShips":"21vDW","../utilities/elementCreators":"H4ivl","./handleBattleshipMouseEnter":"20QiK","./handleBattleshipMouseLeave":"byPhE","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9lJOj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "accumulatePlayerShipCoords", ()=>accumulatePlayerShipCoords);
const accumulatePlayerShipCoords = function(currentShipCoords_) {
    const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "");
    //adds currentship coordinate to rest of ships
    currentShipCoords_.forEach((coord)=>playerShipsCoords.push(coord));
    localStorage.setItem("playerShipsCoords", JSON.stringify(playerShipsCoords));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6FcJc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "checkAllShipsInPlace", ()=>checkAllShipsInPlace);
var _renderStarsInPlayerBoard = require("./renderStarsInPlayerBoard");
var _renderStartButton = require("./renderStartButton");
const checkAllShipsInPlace = function() {
    //if playerShip co-ordinates does not exist, create it to check its length which is the sum total of length of all player ships
    if (localStorage.getItem("playerShipsCoords")) {
        const shipsCoordsArr = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "");
        //if all the player ships have been placed
        if (shipsCoordsArr.length === 18) {
            //adds stars to player board
            (0, _renderStarsInPlayerBoard.renderStarsInPlayerBoard)();
            //STARTS GAME
            (0, _renderStartButton.renderStartButton)();
        }
    }
};

},{"./renderStarsInPlayerBoard":"aZtIU","./renderStartButton":"bfo7r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aZtIU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderStarsInPlayerBoard", ()=>renderStarsInPlayerBoard);
var _elementCreators = require("../utilities/elementCreators");
const renderStarsInPlayerBoard = function() {
    const playerGameCell = document.querySelectorAll(".player-gameCell");
    //adds stars and a corresponding class to differentiate the cells which do not consist of a player ship
    playerGameCell.forEach((cell)=>{
        if (!cell.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("\u2734"), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipNotPresent"
            ]
        ]))(cell);
    });
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bfo7r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderStartButton", ()=>renderStartButton);
var _handleStartButtonClick = require("../events/handleStartButtonClick");
var _elementCreators = require("../utilities/elementCreators");
const renderStartButton = function() {
    //removes the ship selection buttons
    const shipsBttnContainer = document.querySelector(".shipsBttn-container");
    shipsBttnContainer?.remove();
    //removes axis selection button
    const axisSelectorBttn = document.querySelector(".bttn-axisSelector");
    axisSelectorBttn?.remove();
    const shipBttnsWrapper = document.querySelector(".shipBttns-wrapper");
    //renders start game button
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Engage!"), (0, _elementCreators.addAttributeToElem)([
        [
            "type",
            "button"
        ],
        [
            "value",
            "start"
        ], 
    ]), (0, _elementCreators.addEvtListener)("click")((0, _handleStartButtonClick.handleStartButtonClick)), (0, _elementCreators.appendElemToParent)(shipBttnsWrapper))((0, _elementCreators.elemCreator)("button")([
        "bttn",
        "bttn-startGame"
    ]));
};

},{"../events/handleStartButtonClick":"gYeDe","../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gYeDe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleStartButtonClick", ()=>handleStartButtonClick);
var _placeCompShipsOnBoard = require("../components/placeCompShipsOnBoard");
var _randomizeAndStoreShipNames = require("../components/randomizeAndStoreShipNames");
var _renderCompBoard = require("../components/renderCompBoard");
var _compShipsPlacementChoicesArr = require("../data/compShipsPlacementChoicesArr");
var _shipNames = require("../data/shipNames");
var _elementCreators = require("../utilities/elementCreators");
var _handlePlayerClickOnCompMisses = require("./handlePlayerClickOnCompMisses");
var _handlePlayerClickOnCompShips = require("./handlePlayerClickOnCompShips");
const handleStartButtonClick = function(ev) {
    //removes the previous info screen
    const infoScreenWrapper = document.querySelector(".infoScreen-wrapper");
    infoScreenWrapper?.remove();
    const preBattleInfoScreen = document.querySelector(".preBattle-infoScreen");
    preBattleInfoScreen?.remove();
    //removes the ship bttns wrapper
    const shipBttnsWrapper = document.querySelector(".shipBttns-wrapper");
    shipBttnsWrapper?.remove();
    //remove the start button
    this.remove();
    //renders comp board and place the ships
    (0, _renderCompBoard.renderCompBoard)();
    (0, _placeCompShipsOnBoard.placeCompShipsOnBoard)((0, _compShipsPlacementChoicesArr.compShipsPlacementChoicesArr));
    //randomizes and store ship names for each battle
    (0, _randomizeAndStoreShipNames.randomizeAndStoreShipNames)((0, _shipNames.shipNames));
    if (!localStorage.getItem("isGameRunning")) localStorage.setItem("isGameRunning", JSON.stringify(true));
    //adds evt listeners to comp game board cells
    const compShipPresentCells = document.querySelectorAll(".compShipPresent");
    compShipPresentCells.forEach((cell)=>(0, _elementCreators.addEvtListener)("click")((0, _handlePlayerClickOnCompShips.handlePlayerClickOnCompShips))(cell));
    const compShipNotPresentCells = document.querySelectorAll(".compShipNotPresent");
    compShipNotPresentCells.forEach((cell)=>(0, _elementCreators.addEvtListener)("click")((0, _handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses))(cell));
    //renders a new info screen for the battle texts
    const main = document.querySelector(".main");
    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(main))((0, _elementCreators.elemCreator)("div")([
        "infoScreen-wrapper"
    ]));
};

},{"../components/placeCompShipsOnBoard":"dU4Hs","../components/randomizeAndStoreShipNames":"et96r","../components/renderCompBoard":"5e8Dz","../data/compShipsPlacementChoicesArr":"k7Vwa","../data/shipNames":"ekPmF","../utilities/elementCreators":"H4ivl","./handlePlayerClickOnCompMisses":"2HlWb","./handlePlayerClickOnCompShips":"uEG8W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dU4Hs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "placeCompShipsOnBoard", ()=>placeCompShipsOnBoard);
var _renderCompShipsOnBoard = require("./renderCompShipsOnBoard");
const placeCompShipsOnBoard = function(compShipsPlacementChoicesArr_) {
    const compShipsPlacementChoicesArr = compShipsPlacementChoicesArr_;
    //selects a random pre-formed compShipPlacement for every game
    const randCompShipPlacement = compShipsPlacementChoicesArr[Math.floor(Math.random() * compShipsPlacementChoicesArr.length)];
    (0, _renderCompShipsOnBoard.renderCompShipsOnBoard)(randCompShipPlacement);
};

},{"./renderCompShipsOnBoard":"azqRB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"azqRB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCompShipsOnBoard", ()=>renderCompShipsOnBoard);
var _elementCreators = require("../utilities/elementCreators");
const renderCompShipsOnBoard = function(compShipsPlacementChoice_) {
    //used for hit detection
    if (!localStorage.getItem("compShipsCoords")) localStorage.setItem("compShipsCoords", JSON.stringify([]));
    const compShipsCoords = JSON.parse(localStorage.getItem("compShipsCoords") ?? "");
    Object.entries(compShipsPlacementChoice_).forEach(([ship1, shipObj])=>{
        //if the compShips obj does not exist, create it, then store it in camelcase i.e., compCarrier
        if (!localStorage.getItem(`comp${ship1[0].toUpperCase() + ship1.slice(1)}`)) localStorage.setItem(`comp${ship1[0].toUpperCase() + ship1.slice(1)}`, JSON.stringify(shipObj));
        //for superdreadnought, carrier, battleship properties whose attributes do not consist of an array
        if (!Array.isArray(shipObj)) Object.entries(shipObj).forEach(([shipSection, sectionCoords])=>{
            //grab the corresponding game board cell
            const shipCell = document.querySelector(`[data-cellcomp="${sectionCoords}"]`);
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "compShipPresent comp-gameCell"
                ]
            ]), (0, _elementCreators.addTextToElem)("\u2734"), (0, _elementCreators.addStyleToElem)([
                [
                    "border",
                    "1px solid #00f000"
                ]
            ]))(shipCell);
            //store the co-ordinates
            compShipsCoords.push(sectionCoords);
        });
        else //for destroyers and frigates properties whose attributes consist of an array
        shipObj.forEach((ship)=>{
            Object.entries(ship).forEach(([shipSection, sectionCoords])=>{
                //grab the corresponding game board cell
                const shipCell = document.querySelector(`[data-cellcomp="${sectionCoords}"]`);
                (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                    [
                        "class",
                        "compShipPresent comp-gameCell"
                    ]
                ]), (0, _elementCreators.addTextToElem)("\u2734"), (0, _elementCreators.addStyleToElem)([
                    [
                        "border",
                        "1px solid #00f000"
                    ]
                ]))(shipCell);
                //store the co-ordinates
                compShipsCoords.push(sectionCoords);
            });
        });
    });
    const compGameCells = document.querySelectorAll(".comp-gameCell");
    //differentiates between ships and empty spaces
    compGameCells.forEach((cell)=>{
        if (!cell.classList.contains("compShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "compShipNotPresent comp-gameCell"
            ]
        ]), (0, _elementCreators.addTextToElem)("\u2734"))(cell);
    });
    //puts the coordinates in storage for future hit detection checks
    localStorage.setItem("compShipsCoords", JSON.stringify(compShipsCoords));
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"et96r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "randomizeAndStoreShipNames", ()=>randomizeAndStoreShipNames);
const randomizeAndStoreShipNames = function(shipNames_) {
    //used to display a persistent (throughout the game round) name, that corresponds to the type of ship, that is displayed when a hit is registered
    if (!localStorage.getItem("playerShipNames")) localStorage.setItem("playerShipNames", JSON.stringify([]));
    //creates a randomized ship name per game session and stores it to be used for the battle messages
    Object.entries(shipNames_).forEach(([polity, shipTypes])=>{
        if (polity === "haven") {
            const havenShipNames = new Map();
            Object.entries(shipTypes).forEach(([shipType, shipNamesArr])=>{
                //need two names for destroyers and frigates
                if (shipType === "destroyers" || shipType === "frigates") {
                    const tempShipNamesArr = [
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)], 
                    ];
                    havenShipNames.set(shipType, tempShipNamesArr);
                } else //only one name for superdreadnought, cruiser and battleship
                havenShipNames.set(//changes from plural to singular
                shipType.slice(0, -1), shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]);
            });
            localStorage.setItem("havenShipNames", JSON.stringify(Object.fromEntries(havenShipNames)));
        } else if (polity === "manticore") {
            const manticoreShipNames = new Map();
            Object.entries(shipTypes).forEach(([shipType, shipNamesArr])=>{
                //need two names for destroyers and frigates
                if (shipType === "destroyers" || shipType === "frigates") {
                    const tempShipNamesArr = [
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)], 
                    ];
                    manticoreShipNames.set(shipType, tempShipNamesArr);
                } else //only one name for superdreadnought, cruiser and battleship
                manticoreShipNames.set(shipType.slice(0, -1), shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]);
            });
            localStorage.setItem("manticoreShipNames", JSON.stringify(Object.fromEntries(manticoreShipNames)));
        }
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5e8Dz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCompBoard", ()=>renderCompBoard);
var _elementCreators = require("../utilities/elementCreators");
const renderCompBoard = function() {
    const bothBoardsContainer = document.querySelector(".bothBoards-container");
    const compBoardWrapper = (0, _elementCreators.elemCreator)("div")([
        "compBoard-wrapper"
    ]);
    (0, _elementCreators.appendElemToParent)(bothBoardsContainer)(compBoardWrapper);
    const compBoardContainer = (0, _elementCreators.elemCreator)("div")([
        "compBoard-container"
    ]);
    (0, _elementCreators.appendElemToParent)(compBoardWrapper)(compBoardContainer);
    for(let i = 0; i < 10; i += 1)for(let j = 0; j < 10; j += 1)(0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
        [
            "data-cellcomp",
            `${j},${i}`
        ]
    ]), (0, _elementCreators.appendElemToParent)(compBoardContainer))((0, _elementCreators.elemCreator)("div")([
        "comp-gameCell"
    ]));
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k7Vwa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "compShipsPlacementChoicesArr", ()=>compShipsPlacementChoicesArr);
const compShipsPlacementChoicesArr = [
    {
        superdreadnought: {
            head: "1,0",
            body1: "2,0",
            body2: "3,0",
            body3: "4,0",
            tail: "5,0"
        },
        carrier: {
            head: "1,2",
            body1: "2,2",
            body2: "3,2",
            tail: "4,2"
        },
        battleship: {
            head: "1,4",
            body: "2,4",
            tail: "3,4"
        },
        destroyers: [
            {
                head: "1,6",
                tail: "2,6"
            },
            {
                head: "1,8",
                tail: "2,8"
            }, 
        ],
        frigates: [
            {
                body: "4,6"
            },
            {
                body: "4,8"
            }
        ]
    },
    {
        superdreadnought: {
            head: "1,2",
            body1: "1,3",
            body2: "1,4",
            body3: "1,5",
            tail: "1,6"
        },
        carrier: {
            head: "4,2",
            body1: "4,3",
            body2: "4,4",
            tail: "4,5"
        },
        battleship: {
            head: "6,1",
            body: "7,1",
            tail: "8,1"
        },
        destroyers: [
            {
                head: "7,4",
                tail: "8,4"
            },
            {
                head: "3,7",
                tail: "3,8"
            }, 
        ],
        frigates: [
            {
                body: "7,7"
            },
            {
                body: "5,8"
            }
        ]
    },
    {
        superdreadnought: {
            head: "1,1",
            body1: "1,2",
            body2: "1,3",
            body3: "1,4",
            tail: "1,5"
        },
        carrier: {
            head: "3,2",
            body1: "3,3",
            body2: "3,4",
            tail: "3,5"
        },
        battleship: {
            head: "1,7",
            body: "2,7",
            tail: "3,7"
        },
        destroyers: [
            {
                head: "4,0",
                tail: "5,0"
            },
            {
                head: "5,2",
                tail: "5,3"
            }, 
        ],
        frigates: [
            {
                body: "5,5"
            },
            {
                body: "5,7"
            }
        ]
    },
    {
        superdreadnought: {
            head: "1,8",
            body1: "2,8",
            body2: "3,8",
            body3: "4,8",
            tail: "5,8"
        },
        carrier: {
            head: "6,6",
            body1: "7,6",
            body2: "8,6",
            tail: "9,6"
        },
        battleship: {
            head: "6,4",
            body: "7,4",
            tail: "8,4"
        },
        destroyers: [
            {
                head: "2,6",
                tail: "3,6"
            },
            {
                head: "2,4",
                tail: "3,4"
            }, 
        ],
        frigates: [
            {
                body: "3,2"
            },
            {
                body: "7,2"
            }
        ]
    },
    {
        superdreadnought: {
            head: "1,1",
            body1: "1,2",
            body2: "1,3",
            body3: "1,4",
            tail: "1,5"
        },
        carrier: {
            head: "8,6",
            body1: "8,7",
            body2: "8,8",
            tail: "8,9"
        },
        battleship: {
            head: "6,1",
            body: "7,1",
            tail: "8,1"
        },
        destroyers: [
            {
                head: "6,3",
                tail: "7,3"
            },
            {
                head: "1,8",
                tail: "2,8"
            }, 
        ],
        frigates: [
            {
                body: "4,6"
            },
            {
                body: "3,3"
            }
        ]
    },
    {
        superdreadnought: {
            head: "0,0",
            body1: "1,0",
            body2: "2,0",
            body3: "3,0",
            tail: "4,0"
        },
        carrier: {
            head: "2,9",
            body1: "3,9",
            body2: "4,9",
            tail: "5,9"
        },
        battleship: {
            head: "0,5",
            body: "0,6",
            tail: "0,7"
        },
        destroyers: [
            {
                head: "8,3",
                tail: "8,4"
            },
            {
                head: "5,6",
                tail: "5,7"
            }, 
        ],
        frigates: [
            {
                body: "3,2"
            },
            {
                body: "8,9"
            }
        ]
    },
    {
        superdreadnought: {
            head: "0,7",
            body1: "1,7",
            body2: "2,7",
            body3: "3,7",
            tail: "4,7"
        },
        carrier: {
            head: "6,9",
            body1: "7,9",
            body2: "8,9",
            tail: "9,9"
        },
        battleship: {
            head: "7,2",
            body: "7,3",
            tail: "7,4"
        },
        destroyers: [
            {
                head: "0,2",
                tail: "0,3"
            },
            {
                head: "3,1",
                tail: "3,2"
            }, 
        ],
        frigates: [
            {
                body: "3,4"
            },
            {
                body: "9,6"
            }
        ]
    },
    {
        superdreadnought: {
            head: "8,1",
            body1: "8,2",
            body2: "8,3",
            body3: "8,4",
            tail: "8,5"
        },
        carrier: {
            head: "0,5",
            body1: "0,6",
            body2: "0,7",
            tail: "0,8"
        },
        battleship: {
            head: "6,6",
            body: "6,7",
            tail: "6,8"
        },
        destroyers: [
            {
                head: "1,1",
                tail: "1,2"
            },
            {
                head: "3,1",
                tail: "3,2"
            }, 
        ],
        frigates: [
            {
                body: "5,2"
            },
            {
                body: "3,5"
            }
        ]
    },
    {
        superdreadnought: {
            head: "0,8",
            body1: "1,8",
            body2: "2,8",
            body3: "3,8",
            tail: "4,8"
        },
        carrier: {
            head: "6,1",
            body1: "7,1",
            body2: "8,1",
            tail: "9,1"
        },
        battleship: {
            head: "0,3",
            body: "1,3",
            tail: "2,3"
        },
        destroyers: [
            {
                head: "8,8",
                tail: "9,8"
            },
            {
                head: "1,5",
                tail: "2,5"
            }, 
        ],
        frigates: [
            {
                body: "8,3"
            },
            {
                body: "8,5"
            }
        ]
    },
    {
        superdreadnought: {
            head: "1,1",
            body1: "2,1",
            body2: "3,1",
            body3: "4,1",
            tail: "5,1"
        },
        carrier: {
            head: "0,3",
            body1: "0,4",
            body2: "0,5",
            tail: "0,6"
        },
        battleship: {
            head: "8,3",
            body: "8,4",
            tail: "8,5"
        },
        destroyers: [
            {
                head: "3,3",
                tail: "3,4"
            },
            {
                head: "3,7",
                tail: "3,8"
            }, 
        ],
        frigates: [
            {
                body: "8,0"
            },
            {
                body: "6,9"
            }
        ]
    },
    {
        superdreadnought: {
            head: "0,8",
            body1: "1,8",
            body2: "2,8",
            body3: "3,8",
            tail: "4,8"
        },
        carrier: {
            head: "6,1",
            body1: "7,1",
            body2: "8,1",
            tail: "9,1"
        },
        battleship: {
            head: "0,0",
            body: "0,1",
            tail: "0,2"
        },
        destroyers: [
            {
                head: "9,8",
                tail: "9,9"
            },
            {
                head: "7,6",
                tail: "7,7"
            }, 
        ],
        frigates: [
            {
                body: "9,4"
            },
            {
                body: "5,4"
            }
        ]
    },
    {
        superdreadnought: {
            head: "9,0",
            body1: "9,1",
            body2: "9,2",
            body3: "9,3",
            tail: "9,4"
        },
        carrier: {
            head: "3,3",
            body1: "3,4",
            body2: "3,5",
            tail: "3,6"
        },
        battleship: {
            head: "0,7",
            body: "0,8",
            tail: "0,9"
        },
        destroyers: [
            {
                head: "0,0",
                tail: "0,1"
            },
            {
                head: "9,8",
                tail: "9,9"
            }, 
        ],
        frigates: [
            {
                body: "5,4"
            },
            {
                body: "3,9"
            }
        ]
    },
    {
        superdreadnought: {
            head: "2,3",
            body1: "3,3",
            body2: "4,3",
            body3: "5,3",
            tail: "6,3"
        },
        carrier: {
            head: "0,3",
            body1: "0,4",
            body2: "0,5",
            tail: "0,6"
        },
        battleship: {
            head: "8,0",
            body: "8,1",
            tail: "8,2"
        },
        destroyers: [
            {
                head: "2,0",
                tail: "2,1"
            },
            {
                head: "2,6",
                tail: "2,7"
            }, 
        ],
        frigates: [
            {
                body: "7,6"
            },
            {
                body: "7,8"
            }
        ]
    },
    {
        superdreadnought: {
            head: "2,9",
            body1: "3,9",
            body2: "4,9",
            body3: "5,9",
            tail: "6,9"
        },
        carrier: {
            head: "1,2",
            body1: "1,3",
            body2: "1,4",
            tail: "1,5"
        },
        battleship: {
            head: "8,2",
            body: "8,3",
            tail: "8,4"
        },
        destroyers: [
            {
                head: "9,8",
                tail: "9,9"
            },
            {
                head: "0,7",
                tail: "0,8"
            }, 
        ],
        frigates: [
            {
                body: "5,3"
            },
            {
                body: "3,5"
            }
        ]
    },
    {
        superdreadnought: {
            head: "2,5",
            body1: "2,6",
            body2: "2,7",
            body3: "2,8",
            tail: "2,9"
        },
        carrier: {
            head: "1,2",
            body1: "2,2",
            body2: "3,2",
            tail: "4,2"
        },
        battleship: {
            head: "7,2",
            body: "7,3",
            tail: "7,4"
        },
        destroyers: [
            {
                head: "5,6",
                tail: "6,6"
            },
            {
                head: "5,8",
                tail: "6,8"
            }, 
        ],
        frigates: [
            {
                body: "0,0"
            },
            {
                body: "9,9"
            }
        ]
    },
    {
        superdreadnought: {
            head: "4,3",
            body1: "4,4",
            body2: "4,5",
            body3: "4,6",
            tail: "4,7"
        },
        carrier: {
            head: "3,9",
            body1: "4,9",
            body2: "5,9",
            tail: "6,9"
        },
        battleship: {
            head: "3,0",
            body: "4,0",
            tail: "5,0"
        },
        destroyers: [
            {
                head: "0,1",
                tail: "0,2"
            },
            {
                head: "0,8",
                tail: "0,9"
            }, 
        ],
        frigates: [
            {
                body: "7,3"
            },
            {
                body: "7,6"
            }
        ]
    },
    {
        superdreadnought: {
            head: "9,0",
            body1: "9,1",
            body2: "9,2",
            body3: "9,3",
            tail: "9,4"
        },
        carrier: {
            head: "5,2",
            body1: "5,3",
            body2: "5,4",
            tail: "5,5"
        },
        battleship: {
            head: "7,1",
            body: "7,2",
            tail: "7,3"
        },
        destroyers: [
            {
                head: "9,8",
                tail: "9,9"
            },
            {
                head: "7,7",
                tail: "7,8"
            }, 
        ],
        frigates: [
            {
                body: "1,1"
            },
            {
                body: "1,3"
            }
        ]
    },
    {
        superdreadnought: {
            head: "2,6",
            body1: "3,6",
            body2: "4,6",
            body3: "5,6",
            tail: "6,6"
        },
        carrier: {
            head: "2,1",
            body1: "2,2",
            body2: "2,3",
            tail: "2,4"
        },
        battleship: {
            head: "8,6",
            body: "8,7",
            tail: "8,8"
        },
        destroyers: [
            {
                head: "5,2",
                tail: "5,3"
            },
            {
                head: "7,1",
                tail: "7,2"
            }, 
        ],
        frigates: [
            {
                body: "0,9"
            },
            {
                body: "5,8"
            }
        ]
    },
    {
        superdreadnought: {
            head: "6,3",
            body1: "6,4",
            body2: "6,5",
            body3: "6,6",
            tail: "6,7"
        },
        carrier: {
            head: "1,5",
            body1: "2,5",
            body2: "3,5",
            tail: "4,5"
        },
        battleship: {
            head: "4,1",
            body: "4,2",
            tail: "4,3"
        },
        destroyers: [
            {
                head: "1,1",
                tail: "1,2"
            },
            {
                head: "8,1",
                tail: "8,2"
            }, 
        ],
        frigates: [
            {
                body: "1,8"
            },
            {
                body: "5,8"
            }
        ]
    },
    {
        superdreadnought: {
            head: "2,3",
            body1: "3,3",
            body2: "4,3",
            body3: "5,3",
            tail: "6,3"
        },
        carrier: {
            head: "0,3",
            body1: "0,4",
            body2: "0,5",
            tail: "0,6"
        },
        battleship: {
            head: "8,3",
            body: "8,4",
            tail: "8,5"
        },
        destroyers: [
            {
                head: "9,7",
                tail: "9,8"
            },
            {
                head: "8,8",
                tail: "7,8"
            }, 
        ],
        frigates: [
            {
                body: "1,1"
            },
            {
                body: "1,3"
            }
        ]
    },
    // generate random positions of ships from 0,0 to 9,9 in the same pattern as above and with no overlap and in different positions each time
    {
        superdreadnought: {
            head: "2,9",
            body1: "3,9",
            body2: "4,9",
            body3: "5,9",
            tail: "6,9"
        },
        carrier: {
            head: "0,0",
            body1: "0,1",
            body2: "0,2",
            tail: "0,3"
        },
        battleship: {
            head: "8,9",
            body: "8,8",
            tail: "8,7"
        },
        destroyers: [
            {
                head: "4,4",
                tail: "4,5"
            },
            {
                head: "7,4",
                tail: "7,5"
            }, 
        ],
        frigates: [
            {
                body: "1,8"
            },
            {
                body: "5,8"
            }
        ]
    },
    {
        superdreadnought: {
            head: "2,0",
            body1: "3,0",
            body2: "4,0",
            body3: "5,0",
            tail: "6,0"
        },
        carrier: {
            head: "0,9",
            body1: "0,8",
            body2: "0,7",
            tail: "0,6"
        },
        battleship: {
            head: "8,0",
            body: "8,1",
            tail: "8,2"
        },
        destroyers: [
            {
                head: "9,2",
                tail: "9,3"
            },
            {
                head: "8,3",
                tail: "7,3"
            }, 
        ],
        frigates: [
            {
                body: "1,1"
            },
            {
                body: "1,3"
            }
        ]
    },
    {
        superdreadnought: {
            head: "2,6",
            body1: "3,6",
            body2: "4,6",
            body3: "5,6",
            tail: "6,6"
        },
        carrier: {
            head: "0,3",
            body1: "0,4",
            body2: "0,5",
            tail: "0,6"
        },
        battleship: {
            head: "8,6",
            body: "8,7",
            tail: "8,8"
        },
        destroyers: [
            {
                head: "9,7",
                tail: "9,8"
            },
            {
                head: "8,8",
                tail: "7,8"
            }, 
        ],
        frigates: [
            {
                body: "1,1"
            },
            {
                body: "1,3"
            }
        ]
    }, 
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ekPmF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shipNames", ()=>shipNames);
const shipNames = {
    haven: {
        superdreadnoughts: [
            "Nouveau Paris",
            "Danville",
            "Havensport",
            "Juneau",
            "Kaplin",
            "Macrea's Tor",
            "La Martin",
            "LaFayette",
            "Lutetia",
            "Merston",
            "New Boston",
            "Toulon",
            "Tregizva",
            "Waldensville",
            "Kaplan",
            "Merston",
            "Shaldon",
            "Ren\xe9 d'Aiguillon",
            "Du Quesne",
            "D'Allonville",
            "Alphand",
            "Baudin",
            "Charette",
            "Forbin",
            "Guichen",
            "D'Iberville",
            "Lepanto",
            "Mouchez",
            "Tilden",
            "Rouseau",
            "Salamis",
            "Sovereign of Space",
            "Bayard",
            "Cannonade",
            "Conquete",
            "Guerriere",
            "Hero",
            "Lancelot",
            "New Republic",
            "Victorieux",
            "Temeraire", 
        ],
        cruisers: [
            "Sword",
            "Claymore",
            "Cutlass",
            "Dirk",
            "Drusus",
            "Durandal",
            "Epee",
            "Estoc",
            "Excalibur",
            "Falchion",
            "Flamberge",
            "Foil",
            "Gladius",
            "Jian",
            "Katana",
            "Khopesh",
            "Poignard",
            "Raiden",
            "Rapier",
            "Sabre",
            "Scimitar",
            "Shamshir",
            "Wakasashi",
            "Mars",
            "Loki",
            "Marduk",
            "Nurghal",
            "Odin",
            "Thor",
            "Tyr",
            "Anhur",
            "Ares",
            "De Conde",
            "Hachiman",
            "Huan-Ti",
            "Ishtar",
            "Rienzi",
            "Tanit",
            "Krashnark",
            "Morrigan",
            "Yama", 
        ],
        battleships: [
            "Tiger",
            "Bengal",
            "Bobcat",
            "Burmese",
            "Cheetah",
            "Cougar",
            "Jaguar",
            "Leopard",
            "Lion",
            "Lioness",
            "Lynx",
            "Manx",
            "Mountain Lion",
            "Ocelot",
            "Panther",
            "Puma",
            "Sabretooth",
            "Wildcat",
            "Sultan",
            "Abdali",
            "Achmed",
            "Alp Arslan",
            "Bayezid",
            "Fatih",
            "Isa",
            "Kerebin",
            "Malik",
            "Mehmed",
            "Murad",
            "Musa",
            "Rash al-Din",
            "Saladin",
            "Selim",
            "Sinjar",
            "Sulieman",
            "Tinaly",
            "Tolek",
            "Walid",
            "Yavuz",
            "Yildirim",
            "Attila",
            "Barbarosa",
            "Boyar",
            "Cassander",
            "Count Maresuke Nogi",
            "Count Tilly",
            "Cyrus",
            "Farnese",
            "Ivan IV",
            "Kutuzov",
            "MacArthur",
            "Modred",
            "Pappenheim",
            "Roxana",
            "Subutai",
            "Tammerlane",
            "Tepes",
            "Wallenstein",
            "William T. Sherman",
            "Triumphant",
            "Admiral Quinterra",
            "Conquerant",
            "Conquistador",
            "Schaumberg",
            "Theban Warrior",
            "Vindicator",
            "Citizen Admiral Tacosa",
            "Mohawk",
            "Saracen",
            "Veracity", 
        ],
        destroyers: [
            "Bastogne",
            "Arlon",
            "Breslau ",
            "Bruges",
            "Busko",
            "Charleroi",
            "Gorzow",
            "Jaroslaw",
            "Kessler",
            "Krakow",
            "Leuven",
            "Liege",
            "Lubin",
            "Malbork",
            "Poznan",
            "Suwalki",
            "Torun",
            "Toulon",
            "Tournai",
            "Desforge",
            "Alcazar ",
            "Auphan",
            "Baudin",
            "Bouvet",
            "Bruat",
            "Courbet",
            "Decres",
            "Duperre",
            "Hamelin",
            "Kersaint",
            "Linois",
            "Morillot",
            "Muselier",
            "Dainville",
            "Picquet",
            "Requin",
            "Roussin",
            "Toulouse",
            "Hecate",
            "Hector",
            "Racer", 
        ],
        frigates: [
            "Brilliance",
            "Glimmer",
            "Radiance",
            "Solar Flare",
            "Sunspot",
            "Conqueror",
            "Alexander",
            "Alvarado",
            "Babar",
            "Caesar",
            "Cortez",
            "Diaz",
            "Khan",
            "Hannibal",
            "Hideyoshi",
            "Huangdi",
            "Montezuma",
            "Napoleon",
            "Rameses",
            "Valdivia",
            "Vaubon",
            "Wari",
            "William",
            "Charles Wade Pope",
            "Marcus",
            "Beaudway",
            "Thomas Fisher",
            "Wiliam Harting",
            "Isaiah Kenter",
            "Joseph T. Marrone",
            "Kenneth Nastansky",
            "Esperanza de Souza",
            "Jonathan Talbott",
            "Bacchante",
            "Sabine",
            "Seahorse", 
        ]
    },
    manticore: {
        superdreadnoughts: [
            "Invictus",
            "Imperator",
            "Incomparable",
            "Intolerant",
            "Intransigent",
            "Second Yeltsin",
            "Medusa",
            "Barnett",
            "Belisarius",
            "Bellona",
            "Elizabeth I",
            "Ellen D'Orville",
            "Hancock",
            "King Roger III",
            "Marduk",
            "Regulus",
            "Revenge",
            "Troubadour",
            "Thunderer",
            "Trevor's Star",
            "Victorious",
            "Warrior",
            "Yeltsin's Star",
            "King William",
            "King David",
            "King Edward",
            "King George",
            "King Michael",
            "King Roger",
            "Prince Charles",
            "Prince Malachai",
            "Prince Royal",
            "Queen Adrianne",
            "Queen Caitrin",
            "Manticore",
            "Gryphon",
            "Sphinx",
            "Samothrace",
            "Hercules",
            "Majestic",
            "Magnificent",
            "Monarch",
            "Scepter",
            "Sovereign",
            "Bellerophon", 
        ],
        cruisers: [
            "Redoubtable",
            "Champion",
            "Defiant",
            "Formidable",
            "Intolerant",
            "Invincible",
            "Irresistible",
            "Onslaught",
            "Renown",
            "Resolution",
            "Revenge",
            "Homer",
            "Achilles",
            "Agamemnon",
            "Cassandra",
            "Hecate",
            "Hector",
            "Menelaus",
            "Penthesilea",
            "Priam",
            "Reliant",
            "Alcibiades",
            "Amphitrite",
            "Achilles",
            "Dauntless",
            "Hasley",
            "Indomitable",
            "Ishtar",
            "Lysander",
            "Nike",
            "Nelson",
            "Retaliation",
            "Royalist",
            "Truculent",
            "Venom",
            "Victory",
            "Viper",
            "Warspite",
            "Xerxes",
            "Agamemnon",
            "Ajax",
            "Hector",
            "Patrocles",
            "Priam",
            "Nike", 
        ],
        battleships: [
            "Prince Consort",
            "Prince Adrian",
            "Prince Justin",
            "Prince Michael",
            "Prince Roger",
            "Prince Stephen",
            "Prince Harold",
            "Princess Adrienne",
            "Princess Angelique",
            "Princess Aorianna",
            "Princess Caitrin",
            "Princess Joanna",
            "Princess Michelle",
            "Princess Samantha",
            "Princess Solange",
            "Crusader",
            "Alexius",
            "Eleanor",
            "Frederick",
            "Iberiana",
            "Lafroye",
            "Philip",
            "Richard",
            "Tancred",
            "Broadsword",
            "Claymore",
            "Cutlass",
            "Glaive",
            "Guisarm",
            "Halberd",
            "Pike",
            "Schiavone",
            "Alchemist",
            "Cantrip",
            "Circe",
            "Conjurer",
            "Druidess",
            "Enchanter",
            "Fearless ",
            "Magician",
            "Magus",
            "Merlin",
            "Necromancer",
            "Oracle",
            "Runebearer",
            "Santander",
            "Seeress",
            "Shaman",
            "Sorceror",
            "Star Knight",
            "Star Ranger",
            "Thaumaturge",
            "Valiant",
            "Warlock ",
            "Edward Saganami",
            "Jessica Epps",
            "Quentin Saint-James",
            "Hexapuma",
            "Gauntlet", 
        ],
        destroyers: [
            "Culverin",
            "Cannonball",
            "Carronade",
            "Chainshot",
            "Chanson",
            "Aria",
            "Balladeer",
            "Bard",
            "Canticle",
            "Choralist",
            "Glorioso",
            "Madrigal",
            "Minstrel",
            "Nightingale",
            "Plain Song",
            "Rondeau",
            "Serenade",
            "Troubadur",
            "Oracle",
            "Vixen",
            "Windsong",
            "Havoc",
            "Chaos",
            "Devastation",
            "Harrow",
            "Hutspur",
            "Turbulent",
            "Vengeance",
            "Wrack",
            "Falcon",
            "Condor",
            "Goshawk",
            "Harrier",
            "Hawk",
            "Hawkwing3",
            "Kestrel",
            "Kingfisher",
            "Kite",
            "Linnet",
            "Merlin",
            "Nighthawk",
            "Peregrine",
            "Shrike",
            "Arrowhead",
            "Roland", 
        ],
        frigates: [
            "Courageous",
            "Audacious",
            "Fearless",
            "Intransigent",
            "Intrepid",
            "Resolute",
            "Valiant",
            "Defiant",
            "Gallant",
            "Apollo",
            "Adonai",
            "Agni",
            "Amaterasu",
            "Anubis",
            "Aphrodite",
            "Arethusa",
            "Artemis",
            "Athena",
            "Chiron",
            "Hera",
            "Hermes",
            "Iris",
            "Leto",
            "Perseus",
            "Poseidon",
            "Thetis",
            "Xanthus",
            "Ares",
            "Illustrious",
            "Furious",
            "Magnificent",
            "Regal",
            "Avalon",
            "Aegis", 
        ]
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2HlWb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handlePlayerClickOnCompMisses", ()=>handlePlayerClickOnCompMisses);
var _computersTurn = require("../components/computersTurn");
var _renderBattleMessage = require("../components/renderBattleMessage");
var _elementCreators = require("../utilities/elementCreators");
var _handlePlayerClickOnCompShips = require("./handlePlayerClickOnCompShips");
const handlePlayerClickOnCompMisses = function(ev) {
    const currentCellCoord = this.dataset.cellcomp ?? "";
    const currentShipSymbol = this.textContent ?? "";
    const towardsCombatant = "comp";
    const hitOrMiss = "miss";
    (0, _renderBattleMessage.renderBattleMessageElem)(currentCellCoord, currentShipSymbol, towardsCombatant, hitOrMiss);
    //auto-scrolls to the bottom to have the most recent message visible
    const infoScreenWrapper = document.querySelector(".infoScreen-wrapper");
    const scrollHeight = infoScreenWrapper?.scrollHeight ?? 0;
    infoScreenWrapper?.scroll({
        top: scrollHeight,
        left: 0,
        behavior: "smooth"
    });
    //assigns '✖' to currently missed co-ordinate and colors it amber
    this.textContent;
    this.textContent = "\u2716";
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "color",
            "#f0a400"
        ]
    ]))(this);
    //initializse storage for previously missed co-ordinates
    if (!localStorage.getItem("prevPlayerMissOnCompCoord")) localStorage.setItem("prevPlayerMissOnCompCoord", JSON.stringify(""));
    //grabs the previous miss co-ordinates in order to turn them back into gray
    const prevPlayerMissOnCompCoord = JSON.parse(localStorage.getItem("prevPlayerMissOnCompCoord") ?? "");
    const prevPlayerMissOnCompCell = document.querySelector(`[data-cellcomp="${prevPlayerMissOnCompCoord}"]`);
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "color",
            "gainsboro"
        ]
    ]))(prevPlayerMissOnCompCell);
    //stores current miss co-ordinates in order to highlight the current round's co-ordinates
    localStorage.setItem("prevPlayerMissOnCompCoord", JSON.stringify(currentCellCoord));
    //all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
    //the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
    //After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue is empty because there are no promises), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
    //simulates a rudimentary game loop (without a while(boolean) statement) and gives the illusion of time taken for the computer to "think"
    const compShipNotPresent = document.querySelectorAll(".compShipNotPresent");
    const compShipPresent = document.querySelectorAll(".compShipPresent");
    compShipNotPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handlePlayerClickOnCompMisses))(cell);
    });
    compShipPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")((0, _handlePlayerClickOnCompShips.handlePlayerClickOnCompShips)))(cell);
    });
    //computers turn
    setTimeout((0, _computersTurn.computersTurn), 0);
};

},{"../components/computersTurn":"kGr2j","../components/renderBattleMessage":"hDATR","../utilities/elementCreators":"H4ivl","./handlePlayerClickOnCompShips":"uEG8W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kGr2j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "computersTurn", ()=>computersTurn);
var _handlePlayerClickOnCompMisses = require("../events/handlePlayerClickOnCompMisses");
var _handlePlayerClickOnCompShips = require("../events/handlePlayerClickOnCompShips");
var _elementCreators = require("../utilities/elementCreators");
var _generateProbabilisticFiringCoord = require("../utilities/generateProbabilisticFiringCoord");
var _announceGameWinner = require("./announceGameWinner");
var _computerAttacks = require("./computerAttacks");
const computersTurn = function() {
    //checks if game has been won
    if (!localStorage.getItem("isGameWon")) localStorage.setItem("isGameWon", JSON.stringify(""));
    const isGameWon = JSON.parse(localStorage.getItem("isGameWon") ?? "");
    //this conditional check is to prevent computer from having a turn after player has destroyed all computer ships
    if (!isGameWon) {
        if (!localStorage.getItem("totalHitsOnPlayerShips")) localStorage.setItem("totalHitsOnPlayerShips", JSON.stringify(0));
        const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "");
        // const compAttackGuess = genRandCompAttackGuess();
        const compAttackGuess = (0, _generateProbabilisticFiringCoord.generateProbabilisticFiringCoord)();
        //if compAttackGuess is on a playerShipCoord, then checks the hit counter
        //avoids registering a win when the computer misses
        if (playerShipsCoords.includes(compAttackGuess)) {
            const totalHitsOnPlayerShips = JSON.parse(localStorage.getItem("totalHitsOnPlayerShips") ?? "");
            if (totalHitsOnPlayerShips === 17) //calls game winner function
            (0, _announceGameWinner.announceGameWinner)("comp");
        }
        //if no winner, continues attack
        (0, _computerAttacks.computerAttacks)(compAttackGuess);
        //if game win condition has not been reached, adds the event listeners back on to continue round
        const compShipPresent = document.querySelectorAll(".compShipPresent");
        compShipPresent.forEach((cell)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handlePlayerClickOnCompShips.handlePlayerClickOnCompShips)))(cell);
        });
        const compShipNotPresent = document.querySelectorAll(".compShipNotPresent");
        compShipNotPresent.forEach((cell)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses)))(cell);
        });
    }
};

},{"../events/handlePlayerClickOnCompMisses":"2HlWb","../events/handlePlayerClickOnCompShips":"uEG8W","../utilities/elementCreators":"H4ivl","../utilities/generateProbabilisticFiringCoord":"2fd56","./announceGameWinner":"503Ay","./computerAttacks":"6ZQM8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"uEG8W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handlePlayerClickOnCompShips", ()=>handlePlayerClickOnCompShips);
var _announceGameWinner = require("../components/announceGameWinner");
var _computersTurn = require("../components/computersTurn");
var _renderBattleMessage = require("../components/renderBattleMessage");
var _elementCreators = require("../utilities/elementCreators");
var _handlePlayerClickOnCompMisses = require("./handlePlayerClickOnCompMisses");
const handlePlayerClickOnCompShips = function(ev) {
    //initialize the hit counter on first hit
    //when total hits reaches 18, game ends
    if (!localStorage.getItem("totalHitsOnCompShips")) localStorage.setItem("totalHitsOnCompShips", JSON.stringify(0));
    const compShipsCoords = JSON.parse(localStorage.getItem("compShipsCoords") ?? "");
    let totalHitsOnCompShips = JSON.parse(localStorage.getItem("totalHitsOnCompShips") ?? "");
    const currentCellCoord = this.dataset.cellcomp ?? "";
    //prevents winner being called when a miss is registered
    if (compShipsCoords.includes(currentCellCoord)) //checks hit counter to see if its the last hit
    {
        if (totalHitsOnCompShips === 17) {
            const playerName = JSON.parse(localStorage.getItem("playerName") ?? "");
            (0, _announceGameWinner.announceGameWinner)(playerName);
        }
    }
    //required so that the renderBattleMessageElem function can display the appropriate message
    const currentShipSymbol = this.textContent ?? "";
    const towardsCombatant = "comp";
    const hitOrMiss = "hit";
    (0, _renderBattleMessage.renderBattleMessageElem)(currentCellCoord, currentShipSymbol, towardsCombatant, hitOrMiss);
    //auto-scrolls to the bottom to have the most recent message visible
    const infoScreenWrapper = document.querySelector(".infoScreen-wrapper");
    const scrollHeight = infoScreenWrapper?.scrollHeight ?? 0;
    infoScreenWrapper?.scroll({
        top: scrollHeight,
        left: 0,
        behavior: "smooth"
    });
    //updates the comp board cell to visually indicate hit
    this.textContent = "";
    this.textContent = "\uD83D\uDCA5";
    this.style.color = "#f0a400";
    //prevents clicks on previously hit cells counting towards totalHitsOnCompShips
    if (!localStorage.getItem("compShipsHitCoords")) localStorage.setItem("compShipsHitCoords", JSON.stringify([]));
    const compShipsHitCoords = JSON.parse(localStorage.getItem("compShipsHitCoords") ?? "");
    //updates hit counter only when new hit is not on a previously hit cell, and store
    if (!compShipsHitCoords.includes(currentCellCoord)) {
        //stores the unique hit co-ordinate
        compShipsHitCoords.push(currentCellCoord);
        localStorage.setItem("compShipsHitCoords", JSON.stringify(compShipsHitCoords));
        //increments the hit counter and store
        totalHitsOnCompShips = totalHitsOnCompShips + 1;
        localStorage.setItem("totalHitsOnCompShips", JSON.stringify(totalHitsOnCompShips));
    }
    //all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
    //the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
    //After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue is empty because there are no promises), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
    //simulates a rudimentary game loop (without a while(boolean) statement) and gives the illusion of time taken for the computer to "think"
    const compShipPresent = document.querySelectorAll(".compShipPresent");
    const compShipNotPresent = document.querySelectorAll(".compShipNotPresent");
    compShipPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handlePlayerClickOnCompShips))(cell);
    });
    compShipNotPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")((0, _handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses)))(cell);
    });
    setTimeout((0, _computersTurn.computersTurn), 0);
};

},{"../components/announceGameWinner":"503Ay","../components/computersTurn":"kGr2j","../components/renderBattleMessage":"hDATR","../utilities/elementCreators":"H4ivl","./handlePlayerClickOnCompMisses":"2HlWb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"503Ay":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "announceGameWinner", ()=>announceGameWinner);
var _elementCreators = require("../utilities/elementCreators");
var _preventClicksAfterWin = require("./preventClicksAfterWin");
var _restartGame = require("./restartGame");
const announceGameWinner = function(winner_) {
    const main = document.querySelector(".main");
    const infoScreenWrapper = document.querySelector(".infoScreen-wrapper");
    infoScreenWrapper?.remove();
    const winnerContainer = (0, _elementCreators.elemCreator)("div")([
        "winner-container"
    ]);
    (0, _elementCreators.appendElemToParent)(main)(winnerContainer);
    if (winner_ === "comp") {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("With heavy heart and profound regret, we must report a defeat in battle. Our valiant crew fought with all their strength and skill, but alas, the enemy proved too strong for us. We honor the memory of those who gave their lives in defense of the Kingdom, and we pledge to continue the fight with renewed determination. We shall not rest until victory is ours."), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("p")([
            "winner-announcement"
        ]));
        //removes event listeners after win
        (0, _preventClicksAfterWin.preventClicksAfterWin)();
    } else {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`The cheers of the crew fill the bridge as the last enemy ship explodes in a ball of fire. You have emerged victorious from the heat of battle, your ship battered but still flying. Your skill and courage in the face of overwhelming odds have saved the lives of your crew and secured another victory for the Star Kingdom of Manticore. As you survey the wreckage of the enemy fleet, you know that your actions will go down in history as a shining example of the indomitable spirit of the Manticoran Navy. 
				
				Congrats ${winner_}! You have destroyed the Haven Fleet!
				`), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("p")([
            "winner-announcement"
        ]));
        (0, _preventClicksAfterWin.preventClicksAfterWin)();
    }
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Restart"), (0, _elementCreators.addEvtListener)("click")((0, _restartGame.restartGame)), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("button")([
        "bttn-restart"
    ]));
    //prevents computers turn from adding evt listeners back on
    localStorage.setItem("isGameWon", JSON.stringify(true));
};

},{"../utilities/elementCreators":"H4ivl","./preventClicksAfterWin":"8zxk8","./restartGame":"kObX3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8zxk8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "preventClicksAfterWin", ()=>preventClicksAfterWin);
var _handlePlayerClickOnCompMisses = require("../events/handlePlayerClickOnCompMisses");
var _handlePlayerClickOnCompShips = require("../events/handlePlayerClickOnCompShips");
var _elementCreators = require("../utilities/elementCreators");
const preventClicksAfterWin = function() {
    const compShipPresent = document.querySelectorAll(".compShipPresent");
    const compShipNotPresent = document.querySelectorAll(".compShipNotPresent");
    //prevents further clicks after winner is announced
    compShipPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")((0, _handlePlayerClickOnCompShips.handlePlayerClickOnCompShips)))(cell);
    });
    compShipNotPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")((0, _handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses)))(cell);
    });
};

},{"../events/handlePlayerClickOnCompMisses":"2HlWb","../events/handlePlayerClickOnCompShips":"uEG8W","../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kObX3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "restartGame", ()=>restartGame);
const restartGame = function() {
    localStorage.clear();
    window.scrollTo(0, 0);
    self.location.reload();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hDATR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderBattleMessageElem", ()=>renderBattleMessageElem);
var _battleTexts = require("../data/battleTexts");
var _elementCreators = require("../utilities/elementCreators");
var _tossCoin = require("../utilities/tossCoin");
const renderBattleMessageElem = function(currentCellCoord_, currentShipSymbol_, towardsCombatant_, hitOrMiss_) {
    const randHitsStrings = [
        "A hit on",
        "Direct hit on",
        "Shields weak on",
        "Hull integrity is weakening on",
        "Impellers damaged on",
        "Engines are out on",
        "Weapons systems offline on",
        "Life support failing on",
        "Structural damage on",
        "Reactor breach on",
        "Target immobilized on",
        "Power systems fluctuating on",
        "Navigational systems down on",
        "Communication systems disabled on",
        "Gravity generators failing on",
        "Primary sensor array damaged on",
        "Secondary defenses compromised on",
        "Point defense systems offline on",
        "Missile tubes destroyed on", 
    ];
    const hitsPrecursorString = ()=>randHitsStrings[Math.floor(Math.random() * randHitsStrings.length)];
    const havenShipNames = JSON.parse(localStorage.getItem("havenShipNames") ?? "");
    const manticoreShipNames = JSON.parse(localStorage.getItem("manticoreShipNames") ?? "");
    const playerName = JSON.parse(localStorage.getItem("playerName") ?? "");
    const infoScreenWrapper = document.querySelector(".infoScreen-wrapper");
    const battleMessageElem = (0, _elementCreators.elemCreator)("p")([
        "battleMessageElem"
    ]);
    (0, _elementCreators.appendElemToParent)(infoScreenWrapper)(battleMessageElem);
    if (towardsCombatant_ === "comp") {
        //display that its players's turn so the messages are more clearly differentiable
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                `color`,
                `#f0a400`
            ]
        ]), (0, _elementCreators.addTextToElem)(`Players's turn: `))(battleMessageElem);
        //adds a spacer element to separate the player's turn message from the battle message
        for(let i = 0; i < 2; i += 1){
            const spacerElem = (0, _elementCreators.elemCreator)("br")([
                "spacerElem"
            ]);
            (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
        }
        //checks what compShip currentCellCoord_ is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
        const compSuperdreadnought = Object.values(JSON.parse(localStorage.getItem("compSuperdreadnought") ?? ""));
        const compCarrier = Object.values(JSON.parse(localStorage.getItem("compCarrier") ?? ""));
        const compBattleship = Object.values(JSON.parse(localStorage.getItem("compBattleship") ?? ""));
        //destroyers consists of an array of objects
        let compDestroyers = [];
        JSON.parse(localStorage.getItem("compDestroyers") ?? "").forEach((destroyer)=>{
            compDestroyers.push(Object.values(destroyer));
        });
        compDestroyers = compDestroyers.flat();
        //frigates consists of an array of objects
        let compFrigates = [];
        JSON.parse(localStorage.getItem("compFrigates") ?? "").forEach((frigate)=>{
            compFrigates.push(Object.values(frigate));
        });
        compFrigates = compFrigates.flat();
        if (hitOrMiss_ === "hit") {
            //player attacking computer scores a hit
            if (compSuperdreadnought.includes(currentCellCoord_)) {
                //displays hit on superdreadnought with randomized text
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the superdreadnought PNS ${havenShipNames.superdreadnought}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // haven CIC text that indicates damage to their superdreadnought when player scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the superdreadnought PNS ${havenShipNames.superdreadnought}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (compCarrier.includes(currentCellCoord_)) {
                //displays hit on carrier with randomized text
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the carrier PNS ${havenShipNames.cruiser}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // haven CIC text that indicates damage to their carrier when player scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the carrier PNS ${havenShipNames.cruiser}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (compBattleship.includes(currentCellCoord_)) {
                //displays hit on battleship with randomized text
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the battleship PNS ${havenShipNames.battleship}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // haven CIC text that indicates damage to their battleship when player scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the battleship PNS ${havenShipNames.battleship}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (compDestroyers.includes(currentCellCoord_)) {
                //there are two destroyers to connect names
                //checks that current cell that has hit registered is included in either one of the destroyers' or frigates' co-ordinates and assigns corresponding name to the hit rather than randomly calling the names
                const [destroyer1, _] = JSON.parse(localStorage.getItem("compDestroyers") ?? "");
                const destroyer1Coords = [];
                Object.values(destroyer1).forEach((shipPartCoords)=>{
                    destroyer1Coords.push(shipPartCoords);
                });
                //displays hit on destroyer with randomized text
                //only need to check one destroyer
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the destroyer PNS ${destroyer1Coords.includes(currentCellCoord_) ? havenShipNames.destroyers[0] : havenShipNames.destroyers[1]}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // haven CIC text that indicates damage to their destroyer when player scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the destroyer PNS ${destroyer1Coords.includes(currentCellCoord_) ? havenShipNames.destroyers[0] : havenShipNames.destroyers[1]}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (compFrigates.includes(currentCellCoord_)) {
                //there are two frigates to connect names
                const [frigate1, _] = JSON.parse(localStorage.getItem("compFrigates") ?? "");
                const frigate1Coords = [];
                Object.values(frigate1).forEach((shipPartCoords)=>{
                    frigate1Coords.push(shipPartCoords);
                });
                //displays hit on frigate with randomized text
                //only need to check one frigate
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the frigate PNS ${frigate1Coords.includes(currentCellCoord_) ? havenShipNames.frigates[0] : havenShipNames.frigates[1]}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // haven CIC text that indicates damage to their frigate when player scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the frigate PNS ${frigate1Coords.includes(currentCellCoord_) ? havenShipNames.frigates[0] : havenShipNames.frigates[1]}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            }
        } else if (hitOrMiss_ === "miss") //player attacking computer misses
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${(0, _battleTexts.battleTexts).missesOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).missesOnShip.length)]}`))(battleMessageElem);
    } else if (towardsCombatant_ === "player") {
        //display that its computer's turn so the messages are more clearly differentiable
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Computer's turn: `))(battleMessageElem);
        //adds a spacer element to separate the player's turn message from the battle message
        for(let i = 0; i < 2; i += 1){
            const spacerElem = (0, _elementCreators.elemCreator)("br")([
                "spacerElem"
            ]);
            (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
        }
        if (hitOrMiss_ === "hit") {
            //if computer attacking player registers a hit
            if (currentShipSymbol_ === "S") {
                //displays hit on superdreadnought with randomized text
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the superdreadnought RMNS ${manticoreShipNames.superdreadnought}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // player CIC text that indicates damage to their superdreadnought when computer scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the superdreadnought RMNS ${manticoreShipNames.superdreadnought}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (currentShipSymbol_ === "C") {
                //displays hit on carrier with randomized text
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the carrier RMNS ${manticoreShipNames.cruiser}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // player CIC text that indicates damage to their carrier when computer scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the carrier RMNS ${manticoreShipNames.cruiser}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (currentShipSymbol_ === "B") {
                //displays hit on battleship with randomized text
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the battleship RMNS ${manticoreShipNames.battleship}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // player CIC text that indicates damage to their battleship when computer scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the battleship RMNS ${manticoreShipNames.battleship}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (currentShipSymbol_ === "D") {
                //there are two destroyers to connect names
                const [destroyer1, _] = JSON.parse(localStorage.getItem("destroyer") ?? "");
                const destroyer1Coords = [];
                Object.values(destroyer1).forEach((shipPartCoords)=>{
                    destroyer1Coords.push(shipPartCoords);
                });
                //displays hit on destroyer with randomized text
                //only need to check one destroyer
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the destroyer RMNS ${destroyer1Coords.includes(currentCellCoord_) ? manticoreShipNames.destroyers[0] : manticoreShipNames.destroyers[1]}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // player CIC text that indicates damage to their destroyer when computer scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the destroyer RMNS ${destroyer1Coords.includes(currentCellCoord_) ? manticoreShipNames.destroyers[0] : manticoreShipNames.destroyers[1]}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            } else if (currentShipSymbol_ === "F") {
                //there are two frigates to connect names
                const [frigate1, _] = JSON.parse(localStorage.getItem("frigate") ?? "");
                const frigate1Coords = [];
                Object.values(frigate1).forEach((shipPartCoords)=>{
                    frigate1Coords.push(shipPartCoords);
                });
                //displays hit on frigate with randomized text
                //only need to check one frigate
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${hitsPrecursorString()} the frigate RMNS ${frigate1Coords.includes(currentCellCoord_) ? manticoreShipNames.frigates[0] : manticoreShipNames.frigates[1]}! ${(0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)]}`))(battleMessageElem);
                for(let i = 0; i < 2; i += 1){
                    const spacerElem = (0, _elementCreators.elemCreator)("br")([
                        "spacerElem"
                    ]);
                    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(battleMessageElem))(spacerElem);
                }
                // player CIC text that indicates damage to their frigate when computer scores a hit
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Tenth Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the frigate RMNS ${frigate1Coords.includes(currentCellCoord_) ? manticoreShipNames.frigates[0] : manticoreShipNames.frigates[1]}! ${(0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)]}`))(battleMessageElem);
            }
        } else if (hitOrMiss_ === "miss") //computer attacking player misses
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Haven Fleet CIC: ${(0, _tossCoin.tossCoin)() ? `Admiral McQueen!` : ""} ${(0, _battleTexts.battleTexts).missesOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).missesOnShip.length)]}`))(battleMessageElem);
    }
    const dividerElem = (0, _elementCreators.elemCreator)("p")([
        "dividerElem"
    ]);
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("_______________________"), (0, _elementCreators.addStyleToElem)([
        [
            "color",
            "#00f000"
        ]
    ]), (0, _elementCreators.appendElemToParent)(infoScreenWrapper))(dividerElem);
};

},{"../data/battleTexts":"6YoE9","../utilities/elementCreators":"H4ivl","../utilities/tossCoin":"jHvvC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6YoE9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "battleTexts", ()=>battleTexts);
const battleTexts = {
    hitsOnShip: [
        "A hit, Sir!",
        "Direct hit, Sir!",
        "We must have taken out her forward impellers!",
        "Direct hit on their com section!",
        "We just took out most of her missile tracking capability!",
        "One hit, port side aft!",
        "A hit, Sir! At least one, and\u2014",
        "Her forward impellers are down!",
        "Roll port! All batteries, engage!",
        "Engage with forward batteries!",
        "They're taking the bait, Sir!",
        "Formation Reno, Com\u2014get those cruisers in tighter!",
        "Recompute firing pattern.",
        "We just took out their forward impellers!",
        "We've got a hit on their port engines, Sir! They're losing speed!",
        "Direct hit on their main power junction, Sir! Their weapons are offline!",
        "We've hit their fuel tanks, Sir! They're venting plasma!",
        "Their sidewalls are failing, Sir! One more hit and they're done for!",
        "We just took out their bridge, Sir! They're blind and adrift!",
        "Direct hit on their missile tubes, Sir! They're defenseless!",
        "We've knocked out their point defense, Sir! Our missiles are getting through!",
        "They're trying to break off, Sir! Keep up the pressure!",
        "We've taken out their propulsion, Sir! They're dead in the water!",
        "Their forward batteries are destroyed, Sir! They can't return fire!",
        "We've hit their command and control, Sir! They're in chaos!",
        "They're splitting their fire, Sir! Focus on the weaker target!",
        "Their port sidewall's down, Sir! We can take them out!",
        "We've disrupted their sensor array, Sir! They can't get a clear reading on us!",
        "Their maneuvering thrusters are offline, Sir! They can't evade us!", 
    ],
    damageOnShip: [
        "Forward hold open to space! Mooring Tractor One's gone! Heavy casualties in Fusion One!",
        "We've lost Damage Control Three, Sir!",
        "Missile One is down, Sir! We're down to one tube.",
        "Spinal Four gone, Sir!",
        "We've lost the secondary fire control sensors!. Primaries unaffected.",
        "Damage control to the bridge! Corpsman to the bridge!",
        "Fusion One, Sir! The mag bottle's fluctuating and can't be shut down from here\u2014something's cut the circuits!",
        "Sir, we're down to twelve birds for Missile Two, and out of laser heads.",
        "Heavy damage aft! No contact at all with Two-Four or Two-Six.",
        "Sir, we've lost a beta node; our acceleration is dropping.",
        "We've lost another beta node, Sir",
        "Point defense is hurt bad, Sir! We've lost four laser clusters and half our phased radar array.",
        "We've lost an energy torpedo and Number Two Laser out of the starboard broadside, but at least the starboard sidewall is still up.",
        "Tractor Seven is gone!",
        "Compartments Eight-Niner-Two and Niner-Three open to space. No casualties!",
        "Two hits forward! Laser Three and Five destroyed. Radar Five is gone, Sir! Heavy casualties in Laser Three!",
        "Missile Two-One and Graser One gone! Heavy damage in the boat bay and Berthing Compartment Seven-five!",
        "We've taken a hit, but we won't let that break our resolve! Medical teams to the casualties, and everyone else stay focused!",
        //
        "Port torp tubes are down, Sir! We've lost half of our firepower!",
        "Sir, we've lost the entire port quarter! The starboard sidewall is holding, but not for long!",
        "Our starboard broadside is crippled, Sir! We've lost four laser clusters and our neutron cannon!",
        "We've lost Graser Three and Four, Sir! We're down to just two guns!",
        "The port wedge generator's gone, Sir! We're losing acceleration!",
        "Sir, we've lost two-thirds of our point defense capability! The enemy missiles are getting through!",
        "We've lost the aft fusion bottle, Sir! We're down to just one engine!",
        "Sir, we've lost our forward array! We can't get a clear reading on the enemy!",
        "We've lost our main battery, Sir! The enemy ship is still coming!",
        "We've lost three out of four grav plates, Sir! We're adrift!",
        "Sir, we've lost all communication with the forward compartments! We don't know what's happening up there!",
        "The port missile tube's destroyed, Sir! We're down to just one tube and no spares!",
        "The enemy's hit us with a grav lance, Sir! Our hull's buckling!",
        "We've lost the port-side maneuvering thrusters, Sir! We can't dodge their fire!",
        "Sir, we've lost the entire bridge! We're blind and drifting!",
        "We've lost our aft impellers! Brace for impact!",
        "Port engines destroyed! We can't maintain acceleration!",
        "They've taken out our point defense! We're defenseless!",
        "Fusion reactor's gone critical! Abandon ship!",
        "We've lost our port sidewall! They're tearing us apart!",
        "Our maneuvering thrusters are destroyed! We can't dodge their fire!",
        "We've lost our forward impellers! We're drifting into their fire!",
        "Direct hit on our main battery! We're powerless!",
        "They've hit our bridge! We're going down!",
        "Missiles incoming! Brace for impact!",
        "They've taken out our sensors! We can't get a lock on them!",
        "We've lost our main engines! We're dead in the water!",
        "They've breached our hull! We're venting atmosphere!",
        "Our missile tubes are destroyed! We're helpless!",
        "We've lost our port battery! We can't return fire!", 
    ],
    missesOnShip: [
        "Dammit! We missed our target! Recalibrate those weapons and try again!",
        "Target that ship again! We can't let them get away!",
        "They're dodging our fire! Keep your eyes on them and don't let them get away!",
        "We're not giving up that easily! Reload the missiles and try again!",
        "They're faster than we thought! Keep the pressure on them and don't let up!",
        "Don't let them get away! Target their engines and take them out!",
        "We missed the mark that time, but we'll get them next time! Keep those weapons hot!",
        "Target that ship and don't let them out of our sights! We can't let them escape!",
        "We missed them, but they won't get away that easily! Keep the fire coming!",
        "They're too nimble for us! We need to anticipate their movements and adjust our aim!",
        "Don't lose focus, people! Keep those weapons trained on the target and wait for the right moment to strike!",
        "Our sensors are picking up their trajectory! Get those weapons locked in and fire at will!",
        "They're trying to evade us! Stay alert and keep that ship in your crosshairs!",
        "We may have missed them this time, but we'll get another chance! Keep the pressure on!",
        "Don't let their maneuvers distract you! Stay on target and keep up the barrage!",
        "The enemy has returned fire!",
        "Tracking reports sixteen incoming, Sir!",
        "Enemy jamming primary tracking systems!",
        "Enemy countermeasures active!",
        "Crossing minefield attack perimeter\u2014now!",
        //
        "They missed! Counter missiles now!",
        "Ha! Go to rapid fire on all tubes!",
        "We won't get another chance! Get those impellers back for me, Lieutenant!",
        "A miss! Increase acceleration to max!",
        "This is our chance! Close the range. We'll finish her with energy fire!",
        "Missiles at three-five-two! Lucky this time..",
        "Hard a starboard!",
        "Pursuit vector, maximum acceleration!",
        "General signal to all heavy cruisers. Return to formation at once. Repeat, return to formation at once!",
        //
        "Damn! We missed them!",
        "Target evaded, adjust trajectory!",
        "All forward batteries, recalibrate and fire again!",
        "They slipped away, but we'll get them next time!",
        "Missed, but keep those guns trained on them!",
        "They're too quick for us, but we'll catch up eventually!",
        "Continue evasive maneuvers, we'll have another chance!",
        "Fire again, don't let them escape!",
        "They're agile, but we'll find a way to hit them!",
        "We can't let them get away, keep firing!",
        "Target outmaneuvered us, but we're not giving up!",
        "Missed by a hair, but we'll make the next one count!",
        "Don't worry, we'll get them on the next pass!",
        "They're too fast, adjust for their trajectory and try again!",
        "That was too close, but we'll come back around!",
        "We missed, but keep your focus and stay on target!",
        "Their maneuvering is impressive, but we'll take them down eventually!",
        "We need to anticipate their movements and adjust accordingly!",
        "Missed, but keep firing and keep them on the defensive!", 
    ],
    playerShipDestroyed: [
        "Sir, it's gone... Dear God, all those people...",
        "All hands, abandon ship!",
        "They've taken out one of our own! But we won't let their sacrifice be in vain. Keep fighting!",
        "The loss of that ship is a tragedy, but we must stay focused and fight on!",
        "We've lost a valuable ally, but we won't give up this fight! Keep pushing forward!",
        "The enemy has shown us no mercy, but we won't give them any either! Keep the pressure on!",
        "We mourn the loss of our comrades, but we won't let their sacrifice be forgotten. We'll fight on in their memory!",
        "We've lost one of our own, but we won't let their death be in vain. Keep up the fight!",
        "They may have taken out one of our ships, but they won't take us all down! Keep fighting, people!",
        "The loss of that ship is a heavy blow, but we won't let it break our spirit. Keep up the attack!",
        "The enemy thinks they've gained an advantage, but we won't let them win that easily. Stay strong, and stay focused!",
        "Our hearts go out to our fallen comrades, but we won't let their sacrifice be for nothing. Keep fighting, people!",
        "They've taken out one of our own, but we won't let that stop us. We'll avenge them and push on!",
        "The loss of that ship is a painful reminder of the stakes of this battle, but we won't give up. Keep the pressure on!",
        "Our enemy has struck a blow, but we will not be defeated! We will fight on and show them what we're made of!",
        "We've lost one of our own, but we won't let that deter us. We'll avenge them and continue the fight!",
        "The enemy has claimed one of our ships, but they won't claim us all. Keep the battle raging!", 
    ],
    compShipDestroyed: [
        "Yes! She's streaming air, Sir!",
        "Enemy vessel destroyed! Good shooting, people!",
        "That should give them something to think about!",
        "Target eliminated! Move on to the next one!",
        "We've neutralized their threat! On to the next target!",
        "Enemy ship down! Let's keep up the pressure!",
        "That'll teach them to mess with us!",
        "Nice work, everyone! Keep it up!",
        "Enemy vessel neutralized! Let's keep the momentum going!",
        "Target destroyed! Now let's take out their friends!",
        "That's one less enemy to worry about!",
        "Enemy vessel eliminated! Let's keep pushing forward!",
        "Direct hit! Enemy ship destroyed!",
        "Good shooting, gunners! That one's not coming back!",
        "Enemy vessel neutralized! Keep up the good work!",
        "Target eliminated! Let's move on to the next one!",
        "Enemy vessel down! Keep the pressure on!",
        "Another one bites the dust! Great job, everyone!",
        "Enemy ship destroyed! Let's keep up the pace!",
        "Target destroyed! Now onto the next one!",
        "We've taken out an enemy vessel! Let's go for more!",
        "Enemy vessel neutralized! Keep up the good work, crew!",
        "Direct hit! Enemy ship destroyed! Excellent shooting!",
        "We've eliminated an enemy vessel! Let's keep the momentum going!",
        "Enemy ship down! Great work, everyone!",
        "Target destroyed! We're one step closer to victory!",
        "Enemy vessel eliminated! Let's keep pushing forward!", 
    ]
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jHvvC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tossCoin", ()=>tossCoin);
function tossCoin() {
    return Math.random() > 0.5;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2fd56":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateProbabilisticFiringCoord", ()=>generateProbabilisticFiringCoord) /**
 
  if (prevCompHitOrMiss === 'hit') {
		const adjacentCoords: string[] = generateAdjacentCoordArr(
			prevCompFireOnPlayerCoord,
			prevCompFiringCoords
		);

		//if all adjacent coords have been hit, generate a random guess
		newFiringCoordinate =
			adjacentCoords.length === 0
				? genRandCompAttackGuess(prevCompFiringCoords)
				: adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
	} else {
		// either generate a random guess or a random adjacent coord
		// avoids the computer only firing at adjacent coords
		// and simulates a more organic play style

		// first firing coord is always random
		if (!prevCompFireOnPlayerCoord) {
			newFiringCoordinate = genRandCompAttackGuess(prevCompFiringCoords);
		} else {
			const adjacentCoords: string[] = generateAdjacentCoordArr(
				prevCompFireOnPlayerCoord,
				prevCompFiringCoords
			);

			newFiringCoordinate = tossCoin()
				? genRandCompAttackGuess(prevCompFiringCoords)
				: adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
		}

		console.log('else block prevCompFiringCoords', prevCompFiringCoords);
		console.log('else block compHitOnPlayerCoordsArr', compHitOnPlayerCoordsArr);
	}

 */ ;
var _genRandCompAttackGuess = require("../components/genRandCompAttackGuess");
var _generateAdjacentCoordArr = require("./generateAdjacentCoordArr");
function generateProbabilisticFiringCoord() {
    const prevCompHitOrMiss = localStorage.getItem("prevCompHitOrMiss");
    const prevCompFireOnPlayerCoord = prevCompHitOrMiss === "hit" ? localStorage.getItem("prevCompHitOnPlayerCoord") ?? "" : localStorage.getItem("prevCompMissOnPlayerCoord") ?? "";
    const compHitOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compHitOnPlayerCoordsArr") ?? "[]");
    const compMissOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compMissOnPlayerCoordsArr") ?? "[]");
    const prevCompFiringCoords = [
        compHitOnPlayerCoordsArr,
        compMissOnPlayerCoordsArr, 
    ].flat();
    let newFiringCoordinate = "";
    //only runs on first computer turn as prevCompHitOrMiss is undefined
    if (!prevCompHitOrMiss) newFiringCoordinate = (0, _genRandCompAttackGuess.genRandCompAttackGuess)(prevCompFiringCoords);
    else {
        const adjacentCoords = (0, _generateAdjacentCoordArr.generateAdjacentCoordArr)(prevCompFireOnPlayerCoord, compHitOnPlayerCoordsArr, compMissOnPlayerCoordsArr);
        //if all adjacent coords of prev hits have been hit, generate a random guess
        //else generate a random adjacent coord from the prev hits
        newFiringCoordinate = adjacentCoords.length === 0 ? (0, _genRandCompAttackGuess.genRandCompAttackGuess)(prevCompFiringCoords) : adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
    }
    return newFiringCoordinate;
}

},{"../components/genRandCompAttackGuess":"cOUsP","./generateAdjacentCoordArr":"5lblu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cOUsP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "genRandCompAttackGuess", ()=>genRandCompAttackGuess) /**
 
	let compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
		Math.random() * 10
	)}`;
	// //stores comp guesses to avoid hits on previously targeted co-ordinates
	// if (!localStorage.getItem('compAttackGuesses')) {
	// 	localStorage.setItem('compAttackGuesses', JSON.stringify([]));
	// }
	// const compAttackGuesses: string[] = JSON.parse(
	// 	localStorage.getItem('compAttackGuesses') ?? ''
	// );

	//checks if guess is in previous guesses, if so runs the random function again
	//avoids guessing the same co-ordinates
	let isUniqueCoordinate = false;

	while (!isUniqueCoordinate) {
		if (prevCompFiringCoords.includes(compAttackGuess)) {
			//if the guessed co-ordinate has already been tried
			isUniqueCoordinate = false;

			compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(
				Math.random() * 10
			)}`;
		} else {
			isUniqueCoordinate = true;
			// //stores unique co-ordinate
			// compAttackGuesses.push(compAttackGuess);
			// localStorage.setItem('compAttackGuesses', JSON.stringify(compAttackGuesses));
		}
	}

	return compAttackGuess;

 */ ;
const genRandCompAttackGuess = function(prevCompFiringCoords) {
    let compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(Math.random() * 10)}`;
    //checks if guess is in previous guesses, if so runs the random function again
    //avoids guessing the same co-ordinates
    let isUniqueCoordinate = false;
    while(!isUniqueCoordinate)if (prevCompFiringCoords.includes(compAttackGuess)) {
        //if the guessed co-ordinate has already been tried
        isUniqueCoordinate = false;
        compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(Math.random() * 10)}`;
    } else isUniqueCoordinate = true;
    return compAttackGuess;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5lblu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateAdjacentCoordArr", ()=>generateAdjacentCoordArr) /**
 
	{
		//top
		let topCoordStep = 1;
		let topCoord = `${xCoord},${yCoord - topCoordStep}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(topCoord) && !infiniteLoop) {
			// top of the board
			if (yCoord - topCoordStep >= 0) {
				topCoord = `${xCoord},${yCoord - topCoordStep}`;
				topCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (yCoord - topCoordStep >= 0) {
			adjacentCoords.push(topCoord);
		}
		console.log('topCoord', topCoord);
	}

	{
		//right
		let rightCoordStep = 1;
		let rightCoord = `${xCoord + rightCoordStep},${yCoord}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(rightCoord) && !infiniteLoop) {
			// right of the board
			if (xCoord + rightCoordStep <= 9) {
				rightCoord = `${xCoord + rightCoordStep},${yCoord}`;
				rightCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (xCoord + rightCoordStep <= 9) {
			adjacentCoords.push(rightCoord);
		}
		console.log('rightCoord', rightCoord);
	}

	{
		//bottom
		let bottomCoordStep = 1;
		let bottomCoord = `${xCoord},${yCoord + bottomCoordStep}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(bottomCoord) && !infiniteLoop) {
			// bottom of the board
			if (yCoord + bottomCoordStep <= 9) {
				bottomCoord = `${xCoord},${yCoord + bottomCoordStep}`;
				bottomCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (yCoord + bottomCoordStep <= 9) {
			adjacentCoords.push(bottomCoord);
		}
		console.log('bottomCoord', bottomCoord);
	}

	{
		//left
		let leftCoordStep = 1;
		let leftCoord = `${xCoord - leftCoordStep},${yCoord}`;
		let infiniteLoop = false;
		while (compHitOnPlayerCoordsArr.includes(leftCoord) && !infiniteLoop) {
			// left of the board
			if (xCoord - leftCoordStep >= 0) {
				leftCoord = `${xCoord - leftCoordStep},${yCoord}`;
				leftCoordStep += 1;
			} else infiniteLoop = true;
		}
		// only push if within bounds of board
		if (xCoord - leftCoordStep >= 0) {
			adjacentCoords.push(leftCoord);
		}
		console.log('leftCoord', leftCoord);
	}

 */ ;
function generateAdjacentCoordArr(prevCompFireOnPlayerCoord, compHitOnPlayerCoordsArr, compMissOnPlayerCoordsArr) {
    const prevCompHitOnPlayerCoords = prevCompFireOnPlayerCoord.split(",");
    const xCoord1 = parseInt(prevCompHitOnPlayerCoords[0].replace('"', ""));
    const yCoord1 = parseInt(prevCompHitOnPlayerCoords[1].replace('"', ""));
    console.log("prevCompHitOnPlayerCoords", prevCompHitOnPlayerCoords);
    console.log("xCoord", xCoord1);
    console.log("yCoord", yCoord1);
    //generate adjacent coords
    const adjacentCoords = [];
    // loop through each of the previous hits and generate adjacent coords
    compHitOnPlayerCoordsArr.forEach((coord)=>{
        const xyCoords = coord.split(",");
        const xCoord = parseInt(xyCoords[0].replace('"', ""));
        const yCoord = parseInt(xyCoords[1].replace('"', ""));
        //top
        if (yCoord - 1 >= 0) adjacentCoords.push(`${xCoord},${yCoord - 1}`);
        //right
        if (xCoord + 1 <= 9) adjacentCoords.push(`${xCoord + 1},${yCoord}`);
        //bottom
        if (yCoord + 1 <= 9) adjacentCoords.push(`${xCoord},${yCoord + 1}`);
        //left
        if (xCoord - 1 >= 0) adjacentCoords.push(`${xCoord - 1},${yCoord}`);
    });
    //filter the coords that have already been hit or missed
    const uniqueAdjacentCoords = adjacentCoords.filter((coord)=>!compHitOnPlayerCoordsArr.includes(coord) && !compMissOnPlayerCoordsArr.includes(coord));
    return uniqueAdjacentCoords;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6ZQM8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "computerAttacks", ()=>computerAttacks);
var _elementCreators = require("../utilities/elementCreators");
var _storeCompHitsOrMisses = require("../utilities/storeCompHitsOrMisses");
var _storePrevCompHitOrMiss = require("../utilities/storePrevCompHitOrMiss");
var _renderBattleMessage = require("./renderBattleMessage");
const computerAttacks = function(compAttackGuess_) {
    const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "[]");
    let totalHitsOnPlayerShips = JSON.parse(localStorage.getItem("totalHitsOnPlayerShips") ?? "0");
    //compAttackGuess_ is assumed to be unique at this point
    //checks if playerShip is present
    if (playerShipsCoords.includes(compAttackGuess_)) {
        const playerShipCell = document.querySelector(`[data-cellplayer="${compAttackGuess_}"]`);
        //calls function to display battle message when computer registers a hit on a player ship
        const currentCellCoord = compAttackGuess_;
        const currentShipSymbol = playerShipCell?.textContent ?? "";
        const towardsCombatant = "player";
        const hitOrMiss = "hit";
        (0, _renderBattleMessage.renderBattleMessageElem)(currentCellCoord, currentShipSymbol, towardsCombatant, hitOrMiss);
        //updates playercell to visually indicate hit
        if (playerShipCell) {
            playerShipCell.textContent = "";
            playerShipCell.textContent = "\uD83D\uDCA5";
        }
        //updates hit counter and store
        totalHitsOnPlayerShips = totalHitsOnPlayerShips + 1;
        localStorage.setItem("totalHitsOnPlayerShips", JSON.stringify(totalHitsOnPlayerShips));
        //store the current hit co-ordinates and hit type to assist comp firing solution
        (0, _storeCompHitsOrMisses.storeCompHitsOrMisses)(compAttackGuess_, "hit");
        (0, _storePrevCompHitOrMiss.storePrevCompHitOrMiss)("hit", currentCellCoord);
    } else {
        //if its a miss
        const playerShipCell = document.querySelector(`[data-cellplayer="${compAttackGuess_}"]`);
        //calls function to display battle message when computer does not hit a player ship
        const currentCellCoord = compAttackGuess_;
        const currentShipSymbol = playerShipCell?.textContent ?? "";
        const towardsCombatant = "player";
        const hitOrMiss = "miss";
        (0, _renderBattleMessage.renderBattleMessageElem)(currentCellCoord, currentShipSymbol, towardsCombatant, hitOrMiss);
        //auto-scrolls to the bottom to have the most recent message visible
        const infoScreenWrapper = document.querySelector(".infoScreen-wrapper");
        const scrollHeight = infoScreenWrapper?.scrollHeight ?? 0;
        infoScreenWrapper?.scroll({
            top: scrollHeight,
            left: 0,
            behavior: "smooth"
        });
        //assigns '✖' to currently missed co-ordinate and colors it  amber
        if (playerShipCell) {
            playerShipCell.textContent = "";
            playerShipCell.textContent = "\u2716";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ]
            ]))(playerShipCell);
        }
        //initializes storage for previously missed co-ordinates
        if (!localStorage.getItem("prevCompMissOnPlayerCoord")) localStorage.setItem("prevCompMissOnPlayerCoord", JSON.stringify(""));
        //grabs the previous miss co-ordinates in order to turn them back into gray
        const prevCompMissOnPlayerCoord = JSON.parse(localStorage.getItem("prevCompMissOnPlayerCoord") ?? "");
        const prevCompMissOnPlayerCell = document.querySelector(`[data-cellplayer="${prevCompMissOnPlayerCoord}"]`);
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "color",
                "gainsboro"
            ]
        ]))(prevCompMissOnPlayerCell);
        // //stores current miss co-ordinates in order to highlight the current round's co-ordinates
        // localStorage.setItem('prevCompMissOnPlayerCoord', JSON.stringify(currentCellCoord));
        //store the current miss co-ordinates and hit type to assist comp firing solution
        (0, _storeCompHitsOrMisses.storeCompHitsOrMisses)(compAttackGuess_, "miss");
        (0, _storePrevCompHitOrMiss.storePrevCompHitOrMiss)("miss", currentCellCoord);
    }
};

},{"../utilities/elementCreators":"H4ivl","../utilities/storeCompHitsOrMisses":"kX0U2","../utilities/storePrevCompHitOrMiss":"2vwp5","./renderBattleMessage":"hDATR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kX0U2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "storeCompHitsOrMisses", ()=>storeCompHitsOrMisses);
function storeCompHitsOrMisses(compAttackGuess_, hitOrMiss) {
    switch(hitOrMiss){
        case "hit":
            {
                const compHitOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compHitOnPlayerCoordsArr") ?? "[]");
                //adds current hit to array
                compHitOnPlayerCoordsArr.push(compAttackGuess_);
                //updates store
                localStorage.setItem("compHitOnPlayerCoordsArr", JSON.stringify(compHitOnPlayerCoordsArr));
                console.log("compHitOnPlayerCoordsArr", compHitOnPlayerCoordsArr);
                break;
            }
        case "miss":
            {
                const compMissOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compMissOnPlayerCoordsArr") ?? "[]");
                //adds current miss to array
                compMissOnPlayerCoordsArr.push(compAttackGuess_);
                //updates store
                localStorage.setItem("compMissOnPlayerCoordsArr", JSON.stringify(compMissOnPlayerCoordsArr));
                console.log("compMissOnPlayerCoordsArr", compMissOnPlayerCoordsArr);
                break;
            }
        default:
            break;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2vwp5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "storePrevCompHitOrMiss", ()=>storePrevCompHitOrMiss);
function storePrevCompHitOrMiss(prevCompHitOrMiss, coord) {
    localStorage.setItem("prevCompHitOrMiss", prevCompHitOrMiss);
    console.log("storePrevCompHitOrMiss coord", coord);
    switch(prevCompHitOrMiss){
        case "hit":
            localStorage.setItem("prevCompHitOnPlayerCoord", JSON.stringify(coord));
            break;
        case "miss":
            localStorage.setItem("prevCompMissOnPlayerCoord", JSON.stringify(coord));
            break;
        default:
            break;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iGKQQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "doesShipPlacementOverlap", ()=>doesShipPlacementOverlap);
const doesShipPlacementOverlap = function(shipLength_, currentAxis_, currentX_, currentY_) {
    //initializes on first call for overlap detection
    if (!localStorage.getItem("playerShipsCoords")) localStorage.setItem("playerShipsCoords", JSON.stringify([]));
    const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "");
    if (currentAxis_ === "Axis-X") {
        for(let i = 0; i < shipLength_; i += 1)//overlap detection
        if (playerShipsCoords.includes(`${Number(currentX_) + i},${currentY_}`)) {
            alert("A ship is already present at these coordinates. Please choose another area.");
            return true;
        }
    } else if (currentAxis_ === "Axis-Y") {
        for(let i = 0; i < shipLength_; i += 1)if (playerShipsCoords.includes(`${currentX_},${Number(currentY_) + i}`)) {
            alert("A ship is already present at these coordinates. Please choose another area.");
            return true;
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"21vDW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isCorrectNumberOfShips", ()=>isCorrectNumberOfShips);
const isCorrectNumberOfShips = function(ship_, amount_) {
    //capitalizes first letters
    const ship = ship_[0].toUpperCase() + ship_.slice(1);
    const amount = amount_[0].toUpperCase() + amount_.slice(1);
    if (amount_ === "single") {
        // for persistent state and enforces single ship
        if (!localStorage.getItem(`is${amount}${ship}`)) localStorage.setItem(`is${amount}${ship}`, JSON.stringify(true));
        return true;
    } else if (amount_ === "double") {
        const shipObjArr = JSON.parse(localStorage.getItem(`${ship_}`) ?? "");
        if (shipObjArr.length < 2) {
            // for persistent state and enforces double ships
            if (!localStorage.getItem(`is${amount}${ship}`)) localStorage.setItem(`is${amount}${ship}`, JSON.stringify(true));
            return true;
        } else if (shipObjArr.length === 2) {
            localStorage.setItem(`is${amount}${ship}`, JSON.stringify(false));
            return false;
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"20QiK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleBattleshipMouseEnter", ()=>handleBattleshipMouseEnter);
var _elementCreators = require("../utilities/elementCreators");
const handleBattleshipMouseEnter = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 3; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("B"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 3; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("B"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"byPhE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleBattleshipMouseLeave", ()=>handleBattleshipMouseLeave);
var _elementCreators = require("../utilities/elementCreators");
const handleBattleshipMouseLeave = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 3; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 3; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"38NmJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierBttnClick", ()=>handleCarrierBttnClick);
var _elementCreators = require("../utilities/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierCellClick = require("./handleCarrierCellClick");
var _handleCarrierMouseEnter = require("./handleCarrierMouseEnter");
var _handleCarrierMouseLeave = require("./handleCarrierMouseLeave");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleCarrierBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //disables button after clicking once
    this.disabled = true;
    //visually indicates that 'this' button is selected
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid #f0a400"
        ],
        [
            "color",
            "#f0a400"
        ], 
    ]))(this);
    //disables clicking on other shipButtons while selected
    //prevents double selection
    const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
    if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
    const battleshipBttn = document.querySelector(".bttn-battleship");
    if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
    const destroyerBttn = document.querySelector(".bttn-destroyer");
    if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
    const frigateBttn = document.querySelector(".bttn-frigate");
    if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
    //assigns event listener to each player game cell after clicking superdreadnought button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleCarrierCellClick.handleCarrierCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleCarrierMouseEnter.handleCarrierMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleCarrierMouseLeave.handleCarrierMouseLeave)))(player));
};

},{"../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierCellClick":"2p5Tx","./handleCarrierMouseEnter":"g59nL","./handleCarrierMouseLeave":"ehhzX","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2p5Tx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierCellClick", ()=>handleCarrierCellClick);
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
const handleCarrierCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //initializes the carrier object upon first call
    if (!localStorage.getItem("carrier")) localStorage.setItem("carrier", JSON.stringify([]));
    let carrier = JSON.parse(localStorage.getItem("carrier") ?? "");
    const carrierCoords = [];
    const ship = "carrier";
    const amount = "single";
    //for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentX) > 6) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(4, currentAxis, currentX, currentY)) return null;
        //places carrier on grid
        for(let i = 0; i < 4; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
            //prevents duplicate letters being placed
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("C"))(nextCell);
            carrierCoords.push(`${Number(currentX) + i},${currentY}`);
        }
        //prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) //update carrier object attributes
        carrier = {
            head: carrierCoords[0],
            body1: carrierCoords[1],
            body2: carrierCoords[2],
            tail: carrierCoords[3]
        };
        localStorage.setItem("isSingleCarrier", JSON.stringify(false));
    } else if (currentAxis === "Axis-Y" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentY) > 6) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(4, currentAxis, currentX, currentY)) return null;
        //places carrier on grid
        for(let i = 0; i < 4; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i}"]`);
            //prevents duplicate letters being placed
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("C"))(nextCell);
            carrierCoords.push(`${currentX},${Number(currentY) + i}`);
        }
        //prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) //updates carrier object attributes
        carrier = {
            head: carrierCoords[0],
            body1: carrierCoords[1],
            body2: carrierCoords[2],
            tail: carrierCoords[3]
        };
        localStorage.setItem("isSingleCarrier", JSON.stringify(false));
    }
    //stores carrier
    localStorage.setItem("carrier", JSON.stringify(carrier));
    //stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(carrierCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
        //after 'this' button has been clicked, sets the color to grey to visually indicate finished
        const carrierBttn = document.querySelector(".bttn-carrier");
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid gainsboro"
            ],
            [
                "color",
                "gainsboro"
            ],
            [
                "cursor",
                "not-allowed"
            ], 
        ]))(carrierBttn);
        //enables events on other shipButtons after carrier has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
        const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
        if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
        const battleshipBttn = document.querySelector(".bttn-battleship");
        if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
        const destroyerBttn = document.querySelector(".bttn-destroyer");
        if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
        const frigateBttn = document.querySelector(".bttn-frigate");
        if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
        //removes event listeners after single carrier has been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleCarrierCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleCarrierMouseEnter.handleCarrierMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleCarrierMouseLeave.handleCarrierMouseLeave)))(player);
        });
    }
    //if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../components/accumulatePlayerShipCoords":"9lJOj","../components/checkAllShipsInPlace":"6FcJc","../components/doesShipPlacementOverlap":"iGKQQ","../components/isCorrectNumberOfShips":"21vDW","../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierMouseEnter":"g59nL","./handleCarrierMouseLeave":"ehhzX","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g59nL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierMouseEnter", ()=>handleCarrierMouseEnter);
var _elementCreators = require("../utilities/elementCreators");
const handleCarrierMouseEnter = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 4; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("C"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 4; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("C"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ehhzX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierMouseLeave", ()=>handleCarrierMouseLeave);
var _elementCreators = require("../utilities/elementCreators");
const handleCarrierMouseLeave = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 4; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 4; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1zjy0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerBttnClick", ()=>handleDestroyerBttnClick);
var _elementCreators = require("../utilities/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerCellClick = require("./handleDestroyerCellClick");
var _handleDestroyerMouseEnter = require("./handleDestroyerMouseEnter");
var _handleDestroyerMouseLeave = require("./handleDestroyerMouseLeave");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleDestroyerBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //assigns event listeners to each player game cell after clicking destroyer button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleDestroyerCellClick.handleDestroyerCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleDestroyerMouseEnter.handleDestroyerMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleDestroyerMouseLeave.handleDestroyerMouseLeave)))(player));
    //disables this button after clicking
    this.disabled = true;
    //visually indicates that 'this' button is selected
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid #f0a400"
        ],
        [
            "color",
            "#f0a400"
        ], 
    ]))(this);
    //disables clicking on other shipButtons while selected
    //prevents double selection
    const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
    if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
    const carrierBttn = document.querySelector(".bttn-carrier");
    if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
    const battleshipBttn = document.querySelector(".bttn-battleship");
    if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
    const frigateBttn = document.querySelector(".bttn-frigate");
    if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
};

},{"../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerCellClick":"3xwCD","./handleDestroyerMouseEnter":"9ER26","./handleDestroyerMouseLeave":"7Pn09","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3xwCD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerCellClick", ()=>handleDestroyerCellClick);
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
const handleDestroyerCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //initializes the ship object upon first call
    if (!localStorage.getItem("destroyer")) localStorage.setItem("destroyer", JSON.stringify([]));
    const destroyer = JSON.parse(localStorage.getItem("destroyer") ?? "");
    const destroyerCoords = [];
    const ship = "destroyer";
    const amount = "double";
    //for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentX) > 8) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(2, currentAxis, currentX, currentY)) return null;
        //places destroyer on the grid
        for(let i = 0; i < 2; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
            //prevents duplicate letters being placed
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("D"))(nextCell);
            destroyerCoords.push(`${Number(currentX) + i},${currentY}`);
        }
        //only updates if there are 2 or less ships
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) destroyer.push({
            head: destroyerCoords[0],
            tail: destroyerCoords[1]
        });
    } else if (currentAxis === "Axis-Y" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentY) > 8) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(2, currentAxis, currentX, currentY)) return null;
        for(let i = 0; i < 2; i += 1){
            //places destroyer on the grid
            const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i}"]`);
            //prevents duplicate letters being placed
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("D"))(nextCell);
            destroyerCoords.push(`${currentX},${Number(currentY) + i}`);
        }
        //only updates if there are 2 or less ships
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) destroyer.push({
            head: destroyerCoords[0],
            tail: destroyerCoords[1]
        });
    } else if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) return null;
    //stores destroyer
    localStorage.setItem("destroyer", JSON.stringify(destroyer));
    //stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(destroyerCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) {
        //after 'this' button has been clicked, sets the color to grey to visually indicate finished
        const destroyerBttn = document.querySelector(".bttn-destroyer");
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid gainsboro"
            ],
            [
                "color",
                "gainsboro"
            ],
            [
                "cursor",
                "not-allowed"
            ], 
        ]))(destroyerBttn);
        //enables events on other shipButtons after both destroyers have been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
        const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
        if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
        const carrierBttn = document.querySelector(".bttn-carrier");
        if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
        const battleshipBttn = document.querySelector(".bttn-battleship");
        if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
        const frigateBttn = document.querySelector(".bttn-frigate");
        if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
        //removes event listeners after both destroyers have been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleDestroyerCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleDestroyerMouseEnter.handleDestroyerMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleDestroyerMouseLeave.handleDestroyerMouseLeave)))(player);
        });
    }
    //if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../components/accumulatePlayerShipCoords":"9lJOj","../components/checkAllShipsInPlace":"6FcJc","../components/doesShipPlacementOverlap":"iGKQQ","../components/isCorrectNumberOfShips":"21vDW","../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerMouseEnter":"9ER26","./handleDestroyerMouseLeave":"7Pn09","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9ER26":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerMouseEnter", ()=>handleDestroyerMouseEnter);
var _elementCreators = require("../utilities/elementCreators");
const handleDestroyerMouseEnter = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 2; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("D"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 2; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("D"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Pn09":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerMouseLeave", ()=>handleDestroyerMouseLeave);
var _elementCreators = require("../utilities/elementCreators");
const handleDestroyerMouseLeave = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 2; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 2; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4QZ7c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateBttnClick", ()=>handleFrigateBttnClick);
var _elementCreators = require("../utilities/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateCellClick = require("./handleFrigateCellClick");
var _handleFrigateMouseEnter = require("./handleFrigateMouseEnter");
var _handleFrigateMouseLeave = require("./handleFrigateMouseLeave");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleFrigateBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //disables this button after clicking
    this.disabled = true;
    //visually indicates that 'this' button is selected
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid #f0a400"
        ],
        [
            "color",
            "#f0a400"
        ], 
    ]))(this);
    //disables events on other shipButtons while selected
    //prevents double selection
    const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
    if (superdreadnoughtBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
    const carrierBttn = document.querySelector(".bttn-carrier");
    if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
    const battleshipBttn = document.querySelector(".bttn-battleship");
    if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
    const destroyerBttn = document.querySelector(".bttn-destroyer");
    if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
    //assigns event listeners to each player game cell after clicking destroyer button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleFrigateCellClick.handleFrigateCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleFrigateMouseEnter.handleFrigateMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleFrigateMouseLeave.handleFrigateMouseLeave)))(player));
};

},{"../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateCellClick":"cP3IQ","./handleFrigateMouseEnter":"3BZaH","./handleFrigateMouseLeave":"eaXxI","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cP3IQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateCellClick", ()=>handleFrigateCellClick);
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
const handleFrigateCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent ?? "";
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //initializes the ship object upon first call
    if (!localStorage.getItem("frigate")) localStorage.setItem("frigate", JSON.stringify([]));
    const frigate = JSON.parse(localStorage.getItem("frigate") ?? "");
    const frigateCoords = [];
    const ship = "frigate";
    const amount = "double";
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(1, currentAxis, currentX, currentY)) return null;
        //places frigate on the grid
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${currentY}"]`);
        //prevents duplicate letters being placed
        if (nextCell) nextCell.textContent = "";
        (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "playerShipPresent player-gameCell"
            ]
        ]), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "default"
            ], 
        ]), (0, _elementCreators.addTextToElem)("F"))(nextCell);
        frigateCoords.push(`${currentX},${currentY}`);
        //only updates if there are 2 or less ships
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) frigate.push({
            body: frigateCoords[0]
        });
    } else if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) return null;
    //stores frigate
    localStorage.setItem("frigate", JSON.stringify(frigate));
    //stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(frigateCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) {
        //after 'this' button has been clicked, sets the color to grey to visually indicate finished
        const frigateBttn = document.querySelector(".bttn-frigate");
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid gainsboro"
            ],
            [
                "color",
                "gainsboro"
            ], 
        ]))(frigateBttn);
        //enables events on other shipButtons after both frigates have been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
        const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
        if (superdreadnoughtBttn && superdreadnoughtBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleSuperdreadnoughtBttnClick.handleSuperdreadnoughtBttnClick)))(superdreadnoughtBttn);
        const carrierBttn = document.querySelector(".bttn-carrier");
        if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
        const battleshipBttn = document.querySelector(".bttn-battleship");
        if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
        const destroyerBttn = document.querySelector(".bttn-destroyer");
        if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
        //removes event listeners after both frigates have been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleFrigateCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleFrigateMouseEnter.handleFrigateMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleFrigateMouseLeave.handleFrigateMouseLeave)))(player);
        });
    }
    //if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../components/accumulatePlayerShipCoords":"9lJOj","../components/checkAllShipsInPlace":"6FcJc","../components/doesShipPlacementOverlap":"iGKQQ","../components/isCorrectNumberOfShips":"21vDW","../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateMouseEnter":"3BZaH","./handleFrigateMouseLeave":"eaXxI","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3BZaH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateMouseEnter", ()=>handleFrigateMouseEnter);
var _elementCreators = require("../utilities/elementCreators");
const handleFrigateMouseEnter = function(ev) {
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes cell on hover
    const nextCell = document.querySelector(`[data-cellplayer="${currentX},${currentY}"]`);
    if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("F"), (0, _elementCreators.addStyleToElem)([
        [
            "color",
            "#f0a400"
        ],
        [
            "cursor",
            "crosshair"
        ], 
    ]))(nextCell);
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eaXxI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateMouseLeave", ()=>handleFrigateMouseLeave);
var _elementCreators = require("../utilities/elementCreators");
const handleFrigateMouseLeave = function(ev) {
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes cell on hover
    const nextCell = document.querySelector(`[data-cellplayer="${currentX},${currentY}"]`);
    //avoids changing cells of ships already present
    if (!nextCell?.classList.contains("playerShipPresent")) {
        if (nextCell) nextCell.textContent = "";
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "color",
                "gainsboro"
            ],
            [
                "cursor",
                "default"
            ], 
        ]))(nextCell);
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iL6A7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtBttnClick", ()=>handleSuperdreadnoughtBttnClick);
var _elementCreators = require("../utilities/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtCellClick = require("./handleSuperdreadnoughtCellClick");
var _handleSuperdreadnoughtMouseEnter = require("./handleSuperdreadnoughtMouseEnter");
var _handleSuperdreadnoughtMouseLeave = require("./handleSuperdreadnoughtMouseLeave");
const handleSuperdreadnoughtBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //disables this button after clicking
    this.disabled = true;
    //visually indicates that 'this' button is selected
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid #f0a400"
        ],
        [
            "color",
            "#f0a400"
        ], 
    ]))(this);
    //disables clicking on other shipButtons while selected
    //prevents double selection
    const carrierBttn = document.querySelector(".bttn-carrier");
    if (carrierBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
    const battleshipBttn = document.querySelector(".bttn-battleship");
    if (battleshipBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
    const destroyerBttn = document.querySelector(".bttn-destroyer");
    if (destroyerBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
    const frigateBttn = document.querySelector(".bttn-frigate");
    if (frigateBttn) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "border",
            "1px solid gainsboro"
        ],
        [
            "color",
            "gainsboro"
        ],
        [
            "cursor",
            "not-allowed"
        ], 
    ]), (0, _elementCreators.removeEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
    //assigns event listeners to each player game cell after clicking superdreadnought button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleSuperdreadnoughtCellClick.handleSuperdreadnoughtCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleSuperdreadnoughtMouseEnter.handleSuperdreadnoughtMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleSuperdreadnoughtMouseLeave.handleSuperdreadnoughtMouseLeave)))(player));
};

},{"../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtCellClick":"6MyCS","./handleSuperdreadnoughtMouseEnter":"qHolt","./handleSuperdreadnoughtMouseLeave":"4nkbf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6MyCS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtCellClick", ()=>handleSuperdreadnoughtCellClick);
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
const handleSuperdreadnoughtCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //initializes the carrier object upon first call
    if (!localStorage.getItem("superdreadnought")) localStorage.setItem("superdreadnought", JSON.stringify(""));
    let superdreadnought = JSON.parse(localStorage.getItem("superdreadnought") ?? "");
    const superdreadnoughtCoords = [];
    const ship = "superdreadnought";
    const amount = "single";
    //for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentX) > 5) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(5, currentAxis, currentX, currentY)) return null;
        //places superdreadnought on the grid
        for(let i = 0; i < 5; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
            //prevents duplicate letters being placed
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("S"))(nextCell);
            superdreadnoughtCoords.push(`${Number(currentX) + i},${currentY}`);
        }
        //prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) //updates superdreadnought object attributes
        superdreadnought = {
            head: superdreadnoughtCoords[0],
            body1: superdreadnoughtCoords[1],
            body2: superdreadnoughtCoords[2],
            body3: superdreadnoughtCoords[3],
            tail: superdreadnoughtCoords[4]
        };
        localStorage.setItem("isSingleSuperdreadnought", JSON.stringify(false));
    } else if (currentAxis === "Axis-Y" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, "single")) {
        //grid boundary detection
        if (Number(currentY) > 5) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        //overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(5, currentAxis, currentX, currentY)) return null;
        //places superdreadnought on the grid
        for(let i = 0; i < 5; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i}"]`);
            //prevents duplicate letters being placed
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "class",
                    "playerShipPresent player-gameCell"
                ]
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "#f0a400"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]), (0, _elementCreators.addTextToElem)("S"))(nextCell);
            superdreadnoughtCoords.push(`${currentX},${Number(currentY) + i}`);
        }
        //prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) //updates superdreadnought object attributes
        superdreadnought = {
            head: superdreadnoughtCoords[0],
            body1: superdreadnoughtCoords[1],
            body2: superdreadnoughtCoords[2],
            body3: superdreadnoughtCoords[3],
            tail: superdreadnoughtCoords[4]
        };
        localStorage.setItem("isSingleSuperdreadnought", JSON.stringify(false));
    }
    //stores superdreadnought
    localStorage.setItem("superdreadnought", JSON.stringify(superdreadnought));
    //stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(superdreadnoughtCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
        //after 'this' button has been clicked, sets the color to grey to visually indicate finished
        const superdreadnoughtBttn = document.querySelector(".bttn-superdreadnought");
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid gainsboro"
            ],
            [
                "color",
                "gainsboro"
            ],
            [
                "cursor",
                "not-allowed"
            ], 
        ]))(superdreadnoughtBttn);
        //enables events on other shipButtons after superdreadnought has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
        const carrierBttn = document.querySelector(".bttn-carrier");
        if (carrierBttn && carrierBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleCarrierBttnClick.handleCarrierBttnClick)))(carrierBttn);
        const battleshipBttn = document.querySelector(".bttn-battleship");
        if (battleshipBttn && battleshipBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleBattleshipBttnClick.handleBattleshipBttnClick)))(battleshipBttn);
        const destroyerBttn = document.querySelector(".bttn-destroyer");
        if (destroyerBttn && destroyerBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleDestroyerBttnClick.handleDestroyerBttnClick)))(destroyerBttn);
        const frigateBttn = document.querySelector(".bttn-frigate");
        if (frigateBttn && frigateBttn.disabled !== true) (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "border",
                "1px solid #00f000"
            ],
            [
                "color",
                "#00f000"
            ],
            [
                "cursor",
                "pointer"
            ], 
        ]), (0, _elementCreators.addEvtListener)("click")((0, _handleFrigateBttnClick.handleFrigateBttnClick)))(frigateBttn);
        //removes event listeners after single superdreadnought has been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleSuperdreadnoughtCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleSuperdreadnoughtMouseEnter.handleSuperdreadnoughtMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleSuperdreadnoughtMouseLeave.handleSuperdreadnoughtMouseLeave)))(player);
        });
    }
    //if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../components/accumulatePlayerShipCoords":"9lJOj","../components/checkAllShipsInPlace":"6FcJc","../components/doesShipPlacementOverlap":"iGKQQ","../components/isCorrectNumberOfShips":"21vDW","../utilities/elementCreators":"H4ivl","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtMouseEnter":"qHolt","./handleSuperdreadnoughtMouseLeave":"4nkbf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"qHolt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtMouseEnter", ()=>handleSuperdreadnoughtMouseEnter);
var _elementCreators = require("../utilities/elementCreators");
const handleSuperdreadnoughtMouseEnter = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 5; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("S"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 5; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        if (!nextCell?.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("S"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ],
            [
                "cursor",
                "crosshair"
            ], 
        ]))(nextCell);
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4nkbf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtMouseLeave", ()=>handleSuperdreadnoughtMouseLeave);
var _elementCreators = require("../utilities/elementCreators");
const handleSuperdreadnoughtMouseLeave = function(ev) {
    //grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    //grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    //changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 5; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
    else if (currentAxis === "Axis-Y") for(let i1 = 0; i1 < 5; i1 += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i1}"]`);
        //avoids changing cells of ships already present
        if (!nextCell?.classList.contains("playerShipPresent")) {
            if (nextCell) nextCell.textContent = "";
            (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
                [
                    "color",
                    "gainsboro"
                ],
                [
                    "cursor",
                    "default"
                ], 
            ]))(nextCell);
        }
    }
};

},{"../utilities/elementCreators":"H4ivl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["17ZdQ","h7u1C"], "h7u1C", "parcelRequired10b")

//# sourceMappingURL=index.b71e74eb.js.map
