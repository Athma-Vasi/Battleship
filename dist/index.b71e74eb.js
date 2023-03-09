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
var _greetingsText = require("./data/greetingsText");
var _addEvtListenerToForm = require("./functions/addEvtListenerToForm");
var _createTypewriterEffect = require("./functions/createTypewriterEffect");
const mainApp = async function() {
    (0, _addEvtListenerToForm.addEvtListenerToForm)();
    const greetingsContainer = document.querySelector(".greetings-container");
    (0, _createTypewriterEffect.createTypewriterEffect)({
        containerElem: greetingsContainer,
        strings: (0, _greetingsText.greetingsText),
        speed: 25
    });
    //clears storage upon refresh
    localStorage.clear();
};
document.addEventListener("DOMContentLoaded", mainApp);

},{"./data/greetingsText":"5lrmx","./functions/createTypewriterEffect":"9yJB4","./functions/addEvtListenerToForm":"c3S9g"}],"5lrmx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "greetingsText", ()=>greetingsText);
const greetingsText = [
    `In a time of crisis, the Star Kingdom of Manticore faces a grave threat from
  the treacherous People's Republic of Haven. Their aggression and lust for
  power has forced us into a war we did not seek. However, as loyal subjects of
  Her Majesty Queen Elizabeth III, it is our duty to defend our homeland and
  protect our people from harm!`,
    //
    `The enemy seeks to destroy our way of life, but we will not falter! Our brave
  sailors and soldiers stand ready to defend the Kingdom with honor and courage.
  We will not rest until the threat of Haven is neutralized, and our people can
  live in peace and prosperity once again.`,
    //
    `People's Republic of Haven has assembled a formidable fleet near the Talbott
  Cluster, commanded by the traitor Admiral Esther McQueen, and are poised to
  launch an invasion of the Rembrandt Trade Union.`,
    //
    `The brave people of Rembrandt
  have reached out to us for assistance in the face of this imminent threat,
  pledging their loyalty to the Kingdom upon the successful repulsion of the
  Haven forces.`,
    //
    `As staunch defenders of peace and justice, we cannot turn a
  blind eye to their plight and will stand by our allies in their hour of need.
  Our fleet has been mobilized and will soon join the battle to ensure the
  safety and sovereignty of the Rembrandt Trade Union.`,
    //
    `You have been called upon to engage and defeat the Haven Fleet and secure
  peace and prosperity for the Star Kingdom and its allies!`, 
];

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

},{}],"9yJB4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createTypewriterEffect", ()=>createTypewriterEffect);
var _elementCreators = require("./elementCreators");
// returns a promise that resolves when the typewriter effect created by iterating
// through each char in the string and adds it to child element
// after each char is added, the parent element is scrolled to the bottom
async function typewriterEffect({ string , childElem , parentElem , speed =50  }) {
    return new Promise((resolve)=>{
        let i = 0;
        const interval = setInterval(()=>{
            if (i >= string.length) {
                clearInterval(interval);
                resolve();
            } else {
                if (childElem) (0, _elementCreators.addTextToElem)(string[i])(childElem);
                i += 1;
            }
            const scrollHeight = parentElem?.scrollHeight ?? 0;
            parentElem?.scroll({
                top: scrollHeight,
                left: 0,
                behavior: "smooth"
            });
        }, speed);
    });
}
// iterates through an array and executes a callback function for each element
// the callback function is awaited before the next element is iterated
// ensures that the callback function is executed in order and not concurrently
async function asyncForEach(arr, callback) {
    for (const [index, val] of arr.entries())await callback(val, index, arr);
}
// creates a typewriter effect for each string in the strings array
// for each string, a new paragraph element is created and appended to the container element
async function createTypewriterEffect({ containerElem , strings , speed =50  }) {
    asyncForEach(strings, async (string, index)=>{
        const typewriterElem = (0, _elementCreators.elemCreator)("p")([
            "typewriter-text"
        ]);
        (0, _elementCreators.appendElemToParent)(containerElem)(typewriterElem);
        await typewriterEffect({
            string,
            childElem: typewriterElem,
            parentElem: containerElem,
            speed
        });
        const length = strings.length;
        if (index < length - 1) (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(containerElem))((0, _elementCreators.elemCreator)("br")([
            "break"
        ]));
        const scrollHeight = containerElem?.scrollHeight ?? 0;
        containerElem?.scroll({
            top: scrollHeight,
            left: 0,
            behavior: "smooth"
        });
    });
}

},{"./elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aeBTs":[function(require,module,exports) {
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
parcelHelpers.export(exports, "removeStyleFromElem", ()=>removeStyleFromElem);
parcelHelpers.export(exports, "pipe", ()=>pipe);
const elemCreator = (elem1)=>(classes)=>{
        const element = document.createElement(elem1);
        return classes.reduce((elem, currClass)=>{
            elem.classList.add(currClass);
            return elem;
        }, element);
    };
const addAttributeToElem = (attrVals)=>(elem)=>{
        return attrVals.reduce((element, curr)=>{
            if (curr.length > 2) return undefined;
            if (element) element.setAttribute(curr[0], curr[1]);
            return element;
        }, elem);
    };
const addStyleToElem = (stylePropVals)=>(elem)=>{
        return stylePropVals.reduce((element, curr)=>{
            if (curr.length > 2) return undefined;
            if (element) element.style.setProperty(curr[0], curr[1]);
            return element;
        }, elem);
    };
const removeStyleFromElem = (styleProp)=>(elem)=>{
        if (elem) elem.style.removeProperty(styleProp);
        return elem;
    };
const addTextToElem = (text)=>(elem)=>{
        const textNode = document.createTextNode(text);
        if (elem) elem.appendChild(textNode);
        return elem;
    };
const appendElemToParent = (parent)=>(child)=>{
        if (child) {
            if (parent) parent.appendChild(child);
        }
    };
const createImage = (source)=>(classes)=>(alt)=>(title)=>{
                const image = new Image();
                image.src = source;
                image.alt = alt;
                image.title = title;
                return classes.reduce((elem, currClass)=>{
                    elem.classList.add(currClass);
                    return elem;
                }, image);
            };
const addEvtListener = (evt)=>(handleEvt)=>(elem)=>{
            if (elem) elem.addEventListener(evt, handleEvt);
            return elem;
        };
const removeEvtListener = (evt)=>(handleEvt)=>(elem)=>{
            if (elem) elem.removeEventListener(evt, handleEvt);
            return elem;
        };
const pipe = (...funcs)=>(value)=>funcs.reduce((res, func)=>func(res), value);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c3S9g":[function(require,module,exports) {
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
var _renderShipSelectionPage = require("../functions/renderShipSelectionPage");
const receiveFormName = function(ev) {
    ev.preventDefault();
    const formData = new FormData(this);
    const playerName = formData.get("form-name-input")?.toString() ?? "";
    // stores playerName to use for battle texts
    if (!localStorage.getItem("playerName")) localStorage.setItem("playerName", JSON.stringify(playerName));
    (0, _renderShipSelectionPage.renderShipSelectionPage)(playerName);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/renderShipSelectionPage":"5tGPc"}],"5tGPc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderShipSelectionPage", ()=>renderShipSelectionPage);
var _renderPlayerInfoScreen = require("./renderPlayerInfoScreen");
var _renderPlayerShipPlacementBoard = require("./renderPlayerShipPlacementBoard");
var _renderShipSelectionBttns = require("./renderShipSelectionBttns");
const renderShipSelectionPage = function(playerName_) {
    const playerName = playerName_;
    // removes main page content
    const headerLinks = document.querySelector(".header__links");
    headerLinks?.remove();
    const greetingsContainer = document.querySelector(".greetings-container");
    greetingsContainer?.remove();
    const formContainer = document.querySelector("#form-name");
    formContainer?.remove();
    // renders pre-battle speech and ship placement functionality
    (0, _renderPlayerInfoScreen.renderPlayerInfoScreen)(playerName);
    (0, _renderShipSelectionBttns.renderShipSelectionBttns)();
    (0, _renderPlayerShipPlacementBoard.renderPlayerShipPlacementBoard)();
};

},{"./renderPlayerInfoScreen":"50Kqt","./renderPlayerShipPlacementBoard":"2VAf7","./renderShipSelectionBttns":"5VAJL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"50Kqt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderPlayerInfoScreen", ()=>renderPlayerInfoScreen);
var _preBattleTexts = require("../data/preBattleTexts");
var _createTypewriterEffect = require("../functions/createTypewriterEffect");
var _elementCreators = require("../functions/elementCreators");
const renderPlayerInfoScreen = function(playerName_) {
    // scroll to top of page
    window.scrollTo(0, 0);
    const main = document.querySelector(".main");
    const infoScreenContainer = (0, _elementCreators.elemCreator)("div")([
        "infoScreen-container"
    ]);
    (0, _elementCreators.appendElemToParent)(main)(infoScreenContainer);
    (0, _preBattleTexts.preBattleTexts).push(`Ready fleet formation, Admiral ${playerName_}.`);
    (0, _createTypewriterEffect.createTypewriterEffect)({
        containerElem: infoScreenContainer,
        strings: (0, _preBattleTexts.preBattleTexts),
        speed: 25
    });
};

},{"../data/preBattleTexts":"5HSa8","../functions/createTypewriterEffect":"9yJB4","../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5HSa8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "preBattleTexts", ()=>preBattleTexts);
const preBattleTexts = [
    `By the Grace of God, Queen of Manticore, Protector of the Realm, Elizabeth III, to all her loyal sailors: `,
    //
    `You stand on the precipice of a great battle, a battle that has been months in the making. The galaxy watches with bated breath as we prepare to face our enemy, the tyrannical People's Republic of Haven. But we do not stand alone. The hopes and prayers of all those who cherish freedom and liberty march with us into battle.`,
    //
    `Shall we allow our audacious enemies to violate with impunity the territory of the Kingdom? Will you permit the fleet to escape which has carried terror into your families? You will not!`,
    //
    `Let our enemies tremble at the sound of our thundering grasers! Let them cower before our fierce determination and unbreakable will! For we are the sailors of Manticore, and we will not allow our kingdom to be violated or our families to be terrorized!`,
    //
    `Our cause is just, our determination unbreakable, and our courage unwavering. We fight not just for our kingdom, but for the ideals that it represents: justice, freedom, and the rule of law. Our enemy seeks to trample these ideals underfoot, but we will not let them!`,
    //
    `I have faith in you, my fellow sailors. I have seen your bravery, your tenacity, and your skill. You are the best of the best, the defenders of our beloved Manticore. And so I say to you, go forth into battle with heads held high, with hearts filled with the spirit of Manticore. The eyes of the galaxy are upon us, and we will not disappoint. Victory is within our grasp, and we shall seize it with all our might!`,
    //
    `We are the defenders of the Star Kingdom of Manticore, and we will fight to protect our people and our home. We will stand strong against the enemy, and we will not rest until they are defeated and our kingdom is safe!`, 
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2VAf7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderPlayerShipPlacementBoard", ()=>renderPlayerShipPlacementBoard);
var _elementCreators = require("../functions/elementCreators");
const renderPlayerShipPlacementBoard = function() {
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
    for(let i = 0; i < 10; i += 1)for(let j = 0; j < 10; j += 1)// renders a div per iteration of for-loop and append
    (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
        [
            "data-cellplayer",
            `${j},${i}`
        ]
    ]), (0, _elementCreators.appendElemToParent)(playerBoardContainer))((0, _elementCreators.elemCreator)("div")([
        "player-gameCell"
    ]));
};

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5VAJL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderShipSelectionBttns", ()=>renderShipSelectionBttns);
var _handleAxisToggleClick = require("../events/handleAxisToggleClick");
var _handleBattleshipBttnClick = require("../events/handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("../events/handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("../events/handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("../events/handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("../events/handleSuperdreadnoughtBttnClick");
var _elementCreators = require("../functions/elementCreators");
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
    // axis selector button
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

},{"../events/handleAxisToggleClick":"CL021","../events/handleBattleshipBttnClick":"4YxkI","../events/handleCarrierBttnClick":"38NmJ","../events/handleDestroyerBttnClick":"1zjy0","../events/handleFrigateBttnClick":"4QZ7c","../events/handleSuperdreadnoughtBttnClick":"iL6A7","../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"CL021":[function(require,module,exports) {
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
var _elementCreators = require("../functions/elementCreators");
var _handleBattleshipCellClick = require("./handleBattleshipCellClick");
var _handleBattleshipMouseEnter = require("./handleBattleshipMouseEnter");
var _handleBattleshipMouseLeave = require("./handleBattleshipMouseLeave");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleBattleshipBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // disables this button after clicking
    this.disabled = true;
    // visually indicates that 'this' button is selected
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
    // disables clicking on other shipButtons while selected
    // prevents double selection
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
    // assigns event listeners to each player game cell after clicking battleship button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleBattleshipCellClick.handleBattleshipCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleBattleshipMouseEnter.handleBattleshipMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleBattleshipMouseLeave.handleBattleshipMouseLeave)))(player));
};

},{"../functions/elementCreators":"aeBTs","./handleBattleshipCellClick":"8b5eS","./handleBattleshipMouseEnter":"20QiK","./handleBattleshipMouseLeave":"byPhE","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8b5eS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleBattleshipCellClick", ()=>handleBattleshipCellClick);
var _accumulatePlayerShipCoords = require("../functions/accumulatePlayerShipCoords");
var _checkAllShipsInPlace = require("../functions/checkAllShipsInPlace");
var _doesShipPlacementOverlap = require("../functions/doesShipPlacementOverlap");
var _elementCreators = require("../functions/elementCreators");
var _isCorrectNumberOfShips = require("../functions/isCorrectNumberOfShips");
var _handleBattleshipMouseEnter = require("./handleBattleshipMouseEnter");
var _handleBattleshipMouseLeave = require("./handleBattleshipMouseLeave");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleBattleshipCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // initializes the ship object upon first call
    if (!localStorage.getItem("battleship")) localStorage.setItem("battleship", JSON.stringify(""));
    let battleship = JSON.parse(localStorage.getItem("battleship") ?? "");
    const battleshipCoords = [];
    const ship = "battleship";
    const amount = "single";
    // for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        // grid boundary detection
        if (Number(currentX) > 7) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(3, currentAxis, currentX, currentY)) return null;
        // places battleship on the grid
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
        // prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, "single")) // updates battleship object attributes
        battleship = {
            head: battleshipCoords[0],
            body: battleshipCoords[1],
            tail: battleshipCoords[2]
        };
        localStorage.setItem("isSingleBattleship", JSON.stringify(false));
    } else if (currentAxis === "Axis-Y" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        // grid boundary detection
        if (Number(currentY) > 7) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(3, currentAxis, currentX, currentY)) return null;
        for(let i = 0; i < 3; i += 1){
            // places battleship on the grid
            const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i}"]`);
            // prevents duplicate letters being placed
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
        // prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, "single")) // updates battleship object attributes
        battleship = {
            head: battleshipCoords[0],
            body: battleshipCoords[1],
            tail: battleshipCoords[2]
        };
        localStorage.setItem("isSingleBattleship", JSON.stringify(false));
    }
    // stores battleship
    localStorage.setItem("battleship", JSON.stringify(battleship));
    // stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(battleshipCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
        // after 'this' button has been clicked, sets the color to grey to visually indicate finished
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
        // enables events on other shipButtons after battleship has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
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
        // removes event listeners after battleship has been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleBattleshipCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleBattleshipMouseEnter.handleBattleshipMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleBattleshipMouseLeave.handleBattleshipMouseLeave)))(player);
        });
    }
    // if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../functions/accumulatePlayerShipCoords":"9d9Cn","../functions/elementCreators":"aeBTs","./handleBattleshipMouseEnter":"20QiK","./handleBattleshipMouseLeave":"byPhE","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/checkAllShipsInPlace":"iOceV","../functions/doesShipPlacementOverlap":"aQTs9","../functions/isCorrectNumberOfShips":"cdvYs"}],"9d9Cn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "accumulatePlayerShipCoords", ()=>accumulatePlayerShipCoords);
const accumulatePlayerShipCoords = function(currentShipCoords_) {
    const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "");
    // adds currentship coordinate to rest of ships
    currentShipCoords_.forEach((coord)=>playerShipsCoords.push(coord));
    localStorage.setItem("playerShipsCoords", JSON.stringify(playerShipsCoords));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"20QiK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleBattleshipMouseEnter", ()=>handleBattleshipMouseEnter);
var _elementCreators = require("../functions/elementCreators");
const handleBattleshipMouseEnter = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"byPhE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleBattleshipMouseLeave", ()=>handleBattleshipMouseLeave);
var _elementCreators = require("../functions/elementCreators");
const handleBattleshipMouseLeave = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 3; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        // avoids changing cells of ships already present
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
        // avoids changing cells of ships already present
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"38NmJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierBttnClick", ()=>handleCarrierBttnClick);
var _elementCreators = require("../functions/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierCellClick = require("./handleCarrierCellClick");
var _handleCarrierMouseEnter = require("./handleCarrierMouseEnter");
var _handleCarrierMouseLeave = require("./handleCarrierMouseLeave");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleCarrierBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // disables button after clicking once
    this.disabled = true;
    // visually indicates that 'this' button is selected
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
    // disables clicking on other shipButtons while selected
    // prevents double selection
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
    // assigns event listener to each player game cell after clicking superdreadnought button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleCarrierCellClick.handleCarrierCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleCarrierMouseEnter.handleCarrierMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleCarrierMouseLeave.handleCarrierMouseLeave)))(player));
};

},{"../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierCellClick":"2p5Tx","./handleCarrierMouseEnter":"g59nL","./handleCarrierMouseLeave":"ehhzX","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2p5Tx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierCellClick", ()=>handleCarrierCellClick);
var _accumulatePlayerShipCoords = require("../functions/accumulatePlayerShipCoords");
var _checkAllShipsInPlace = require("../functions/checkAllShipsInPlace");
var _doesShipPlacementOverlap = require("../functions/doesShipPlacementOverlap");
var _elementCreators = require("../functions/elementCreators");
var _isCorrectNumberOfShips = require("../functions/isCorrectNumberOfShips");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierMouseEnter = require("./handleCarrierMouseEnter");
var _handleCarrierMouseLeave = require("./handleCarrierMouseLeave");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleCarrierCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // initializes the carrier object upon first call
    if (!localStorage.getItem("carrier")) localStorage.setItem("carrier", JSON.stringify([]));
    let carrier = JSON.parse(localStorage.getItem("carrier") ?? "");
    const carrierCoords = [];
    const ship = "carrier";
    const amount = "single";
    // for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        // grid boundary detection
        if (Number(currentX) > 6) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(4, currentAxis, currentX, currentY)) return null;
        // places carrier on grid
        for(let i = 0; i < 4; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
            // prevents duplicate letters being placed
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
        // prevents updating after first click
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
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(4, currentAxis, currentX, currentY)) return null;
        // places carrier on grid
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
        // prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) // updates carrier object attributes
        carrier = {
            head: carrierCoords[0],
            body1: carrierCoords[1],
            body2: carrierCoords[2],
            tail: carrierCoords[3]
        };
        localStorage.setItem("isSingleCarrier", JSON.stringify(false));
    }
    // stores carrier
    localStorage.setItem("carrier", JSON.stringify(carrier));
    // stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(carrierCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
        // after 'this' button has been clicked, sets the color to grey to visually indicate finished
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
        // enables events on other shipButtons after carrier has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
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
        // removes event listeners after single carrier has been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleCarrierCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleCarrierMouseEnter.handleCarrierMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleCarrierMouseLeave.handleCarrierMouseLeave)))(player);
        });
    }
    //if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../functions/accumulatePlayerShipCoords":"9d9Cn","../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierMouseEnter":"g59nL","./handleCarrierMouseLeave":"ehhzX","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/checkAllShipsInPlace":"iOceV","../functions/doesShipPlacementOverlap":"aQTs9","../functions/isCorrectNumberOfShips":"cdvYs"}],"g59nL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierMouseEnter", ()=>handleCarrierMouseEnter);
var _elementCreators = require("../functions/elementCreators");
const handleCarrierMouseEnter = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ehhzX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCarrierMouseLeave", ()=>handleCarrierMouseLeave);
var _elementCreators = require("../functions/elementCreators");
const handleCarrierMouseLeave = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 4; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        // avoids changing cells of ships already present
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
        // avoids changing cells of ships already present
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1zjy0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerBttnClick", ()=>handleDestroyerBttnClick);
var _elementCreators = require("../functions/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerCellClick = require("./handleDestroyerCellClick");
var _handleDestroyerMouseEnter = require("./handleDestroyerMouseEnter");
var _handleDestroyerMouseLeave = require("./handleDestroyerMouseLeave");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleDestroyerBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // assigns event listeners to each player game cell after clicking destroyer button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleDestroyerCellClick.handleDestroyerCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleDestroyerMouseEnter.handleDestroyerMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleDestroyerMouseLeave.handleDestroyerMouseLeave)))(player));
    // disables this button after clicking
    this.disabled = true;
    // visually indicates that 'this' button is selected
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
    // disables clicking on other shipButtons while selected
    // prevents double selection
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

},{"../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerCellClick":"3xwCD","./handleDestroyerMouseEnter":"9ER26","./handleDestroyerMouseLeave":"7Pn09","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3xwCD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerCellClick", ()=>handleDestroyerCellClick);
var _accumulatePlayerShipCoords = require("../functions/accumulatePlayerShipCoords");
var _checkAllShipsInPlace = require("../functions/checkAllShipsInPlace");
var _doesShipPlacementOverlap = require("../functions/doesShipPlacementOverlap");
var _elementCreators = require("../functions/elementCreators");
var _isCorrectNumberOfShips = require("../functions/isCorrectNumberOfShips");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerMouseEnter = require("./handleDestroyerMouseEnter");
var _handleDestroyerMouseLeave = require("./handleDestroyerMouseLeave");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleDestroyerCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // initializes the ship object upon first call
    if (!localStorage.getItem("destroyer")) localStorage.setItem("destroyer", JSON.stringify([]));
    const destroyer = JSON.parse(localStorage.getItem("destroyer") ?? "");
    const destroyerCoords = [];
    const ship = "destroyer";
    const amount = "double";
    // for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        //grid boundary detection
        if (Number(currentX) > 8) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(2, currentAxis, currentX, currentY)) return null;
        // places destroyer on the grid
        for(let i = 0; i < 2; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
            // prevents duplicate letters being placed
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
        // only updates if there are 2 or less ships
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) destroyer.push({
            head: destroyerCoords[0],
            tail: destroyerCoords[1]
        });
    } else if (currentAxis === "Axis-Y" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        // grid boundary detection
        if (Number(currentY) > 8) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(2, currentAxis, currentX, currentY)) return null;
        for(let i = 0; i < 2; i += 1){
            // places destroyer on the grid
            const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i}"]`);
            // prevents duplicate letters being placed
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
        // only updates if there are 2 or less ships
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) destroyer.push({
            head: destroyerCoords[0],
            tail: destroyerCoords[1]
        });
    } else if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) return null;
    // stores destroyer
    localStorage.setItem("destroyer", JSON.stringify(destroyer));
    // stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(destroyerCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) {
        // after 'this' button has been clicked, sets the color to grey to visually indicate finished
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
        // enables events on other shipButtons after both destroyers have been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
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

},{"../functions/accumulatePlayerShipCoords":"9d9Cn","../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerMouseEnter":"9ER26","./handleDestroyerMouseLeave":"7Pn09","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/checkAllShipsInPlace":"iOceV","../functions/doesShipPlacementOverlap":"aQTs9","../functions/isCorrectNumberOfShips":"cdvYs"}],"9ER26":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerMouseEnter", ()=>handleDestroyerMouseEnter);
var _elementCreators = require("../functions/elementCreators");
const handleDestroyerMouseEnter = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Pn09":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleDestroyerMouseLeave", ()=>handleDestroyerMouseLeave);
var _elementCreators = require("../functions/elementCreators");
const handleDestroyerMouseLeave = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 2; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        // avoids changing cells of ships already present
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
        // avoids changing cells of ships already present
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4QZ7c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateBttnClick", ()=>handleFrigateBttnClick);
var _elementCreators = require("../functions/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateCellClick = require("./handleFrigateCellClick");
var _handleFrigateMouseEnter = require("./handleFrigateMouseEnter");
var _handleFrigateMouseLeave = require("./handleFrigateMouseLeave");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleFrigateBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // disables this button after clicking
    this.disabled = true;
    // visually indicates that 'this' button is selected
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
    // disables events on other shipButtons while selected
    // prevents double selection
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
    // assigns event listeners to each player game cell after clicking destroyer button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleFrigateCellClick.handleFrigateCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleFrigateMouseEnter.handleFrigateMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleFrigateMouseLeave.handleFrigateMouseLeave)))(player));
};

},{"../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateCellClick":"cP3IQ","./handleFrigateMouseEnter":"3BZaH","./handleFrigateMouseLeave":"eaXxI","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cP3IQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateCellClick", ()=>handleFrigateCellClick);
var _accumulatePlayerShipCoords = require("../functions/accumulatePlayerShipCoords");
var _checkAllShipsInPlace = require("../functions/checkAllShipsInPlace");
var _doesShipPlacementOverlap = require("../functions/doesShipPlacementOverlap");
var _elementCreators = require("../functions/elementCreators");
var _isCorrectNumberOfShips = require("../functions/isCorrectNumberOfShips");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateMouseEnter = require("./handleFrigateMouseEnter");
var _handleFrigateMouseLeave = require("./handleFrigateMouseLeave");
var _handleSuperdreadnoughtBttnClick = require("./handleSuperdreadnoughtBttnClick");
const handleFrigateCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent ?? "";
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // initializes the ship object upon first call
    if (!localStorage.getItem("frigate")) localStorage.setItem("frigate", JSON.stringify([]));
    const frigate = JSON.parse(localStorage.getItem("frigate") ?? "");
    const frigateCoords = [];
    const ship = "frigate";
    const amount = "double";
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(1, currentAxis, currentX, currentY)) return null;
        // places frigate on the grid
        const nextCell = document.querySelector(`[data-cellplayer="${currentX},${currentY}"]`);
        // prevents duplicate letters being placed
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
        // only updates if there are 2 or less ships
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) frigate.push({
            body: frigateCoords[0]
        });
    } else if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) return null;
    // stores frigate
    localStorage.setItem("frigate", JSON.stringify(frigate));
    // stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(frigateCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === false) {
        // after 'this' button has been clicked, sets the color to grey to visually indicate finished
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
        // enables events on other shipButtons after both frigates have been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
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

},{"../functions/accumulatePlayerShipCoords":"9d9Cn","../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateMouseEnter":"3BZaH","./handleFrigateMouseLeave":"eaXxI","./handleSuperdreadnoughtBttnClick":"iL6A7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/checkAllShipsInPlace":"iOceV","../functions/doesShipPlacementOverlap":"aQTs9","../functions/isCorrectNumberOfShips":"cdvYs"}],"3BZaH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateMouseEnter", ()=>handleFrigateMouseEnter);
var _elementCreators = require("../functions/elementCreators");
const handleFrigateMouseEnter = function(ev) {
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes cell on hover
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eaXxI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleFrigateMouseLeave", ()=>handleFrigateMouseLeave);
var _elementCreators = require("../functions/elementCreators");
const handleFrigateMouseLeave = function(ev) {
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes cell on hover
    const nextCell = document.querySelector(`[data-cellplayer="${currentX},${currentY}"]`);
    // avoids changing cells of ships already present
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iL6A7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtBttnClick", ()=>handleSuperdreadnoughtBttnClick);
var _elementCreators = require("../functions/elementCreators");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtCellClick = require("./handleSuperdreadnoughtCellClick");
var _handleSuperdreadnoughtMouseEnter = require("./handleSuperdreadnoughtMouseEnter");
var _handleSuperdreadnoughtMouseLeave = require("./handleSuperdreadnoughtMouseLeave");
const handleSuperdreadnoughtBttnClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // disables this button after clicking
    this.disabled = true;
    // visually indicates that 'this' button is selected
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
    // disables clicking on other shipButtons while selected
    // prevents double selection
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
    // assigns event listeners to each player game cell after clicking superdreadnought button
    playerGameCells.forEach((player)=>(0, _elementCreators.pipe)((0, _elementCreators.addEvtListener)("click")((0, _handleSuperdreadnoughtCellClick.handleSuperdreadnoughtCellClick)), (0, _elementCreators.addEvtListener)("mouseenter")((0, _handleSuperdreadnoughtMouseEnter.handleSuperdreadnoughtMouseEnter)), (0, _elementCreators.addEvtListener)("mouseleave")((0, _handleSuperdreadnoughtMouseLeave.handleSuperdreadnoughtMouseLeave)))(player));
};

},{"../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtCellClick":"6MyCS","./handleSuperdreadnoughtMouseEnter":"qHolt","./handleSuperdreadnoughtMouseLeave":"4nkbf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6MyCS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtCellClick", ()=>handleSuperdreadnoughtCellClick);
var _accumulatePlayerShipCoords = require("../functions/accumulatePlayerShipCoords");
var _checkAllShipsInPlace = require("../functions/checkAllShipsInPlace");
var _doesShipPlacementOverlap = require("../functions/doesShipPlacementOverlap");
var _elementCreators = require("../functions/elementCreators");
var _isCorrectNumberOfShips = require("../functions/isCorrectNumberOfShips");
var _handleBattleshipBttnClick = require("./handleBattleshipBttnClick");
var _handleCarrierBttnClick = require("./handleCarrierBttnClick");
var _handleDestroyerBttnClick = require("./handleDestroyerBttnClick");
var _handleFrigateBttnClick = require("./handleFrigateBttnClick");
var _handleSuperdreadnoughtMouseEnter = require("./handleSuperdreadnoughtMouseEnter");
var _handleSuperdreadnoughtMouseLeave = require("./handleSuperdreadnoughtMouseLeave");
const handleSuperdreadnoughtCellClick = function(ev) {
    const playerGameCells = document.querySelectorAll(".player-gameCell");
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // initializes the carrier object upon first call
    if (!localStorage.getItem("superdreadnought")) localStorage.setItem("superdreadnought", JSON.stringify(""));
    let superdreadnought = JSON.parse(localStorage.getItem("superdreadnought") ?? "");
    const superdreadnoughtCoords = [];
    const ship = "superdreadnought";
    const amount = "single";
    // for horizontal placement
    if (currentAxis === "Axis-X" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) {
        // grid boundary detection
        if (Number(currentX) > 5) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(5, currentAxis, currentX, currentY)) return null;
        // places superdreadnought on the grid
        for(let i = 0; i < 5; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
            // prevents duplicate letters being placed
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
        // prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) // updates superdreadnought object attributes
        superdreadnought = {
            head: superdreadnoughtCoords[0],
            body1: superdreadnoughtCoords[1],
            body2: superdreadnoughtCoords[2],
            body3: superdreadnoughtCoords[3],
            tail: superdreadnoughtCoords[4]
        };
        localStorage.setItem("isSingleSuperdreadnought", JSON.stringify(false));
    } else if (currentAxis === "Axis-Y" && (0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, "single")) {
        // grid boundary detection
        if (Number(currentY) > 5) {
            alert("Please stay within boundaries of the sector (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61)");
            return null;
        }
        // overlap detection
        if ((0, _doesShipPlacementOverlap.doesShipPlacementOverlap)(5, currentAxis, currentX, currentY)) return null;
        // places superdreadnought on the grid
        for(let i = 0; i < 5; i += 1){
            const nextCell = document.querySelector(`[data-cellplayer="${currentX},${Number(currentY) + i}"]`);
            // prevents duplicate letters being placed
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
        // prevents updating after first click
        if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount)) // updates superdreadnought object attributes
        superdreadnought = {
            head: superdreadnoughtCoords[0],
            body1: superdreadnoughtCoords[1],
            body2: superdreadnoughtCoords[2],
            body3: superdreadnoughtCoords[3],
            tail: superdreadnoughtCoords[4]
        };
        localStorage.setItem("isSingleSuperdreadnought", JSON.stringify(false));
    }
    // stores superdreadnought
    localStorage.setItem("superdreadnought", JSON.stringify(superdreadnought));
    // stores current ship coords to pool of all ship coords
    (0, _accumulatePlayerShipCoords.accumulatePlayerShipCoords)(superdreadnoughtCoords);
    if ((0, _isCorrectNumberOfShips.isCorrectNumberOfShips)(ship, amount) === true) {
        // after 'this' button has been clicked, sets the color to grey to visually indicate finished
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
        // enables events on other shipButtons after superdreadnought has been placed and sets color to green to visually indicate that they can be clicked if they have not been previously disabled after a click
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
        // removes event listeners after single superdreadnought has been placed
        playerGameCells.forEach((player)=>{
            (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handleSuperdreadnoughtCellClick), (0, _elementCreators.removeEvtListener)("mouseenter")((0, _handleSuperdreadnoughtMouseEnter.handleSuperdreadnoughtMouseEnter)), (0, _elementCreators.removeEvtListener)("mouseleave")((0, _handleSuperdreadnoughtMouseLeave.handleSuperdreadnoughtMouseLeave)))(player);
        });
    }
    // if all ships placed, renders start button
    (0, _checkAllShipsInPlace.checkAllShipsInPlace)();
};

},{"../functions/accumulatePlayerShipCoords":"9d9Cn","../functions/elementCreators":"aeBTs","./handleBattleshipBttnClick":"4YxkI","./handleCarrierBttnClick":"38NmJ","./handleDestroyerBttnClick":"1zjy0","./handleFrigateBttnClick":"4QZ7c","./handleSuperdreadnoughtMouseEnter":"qHolt","./handleSuperdreadnoughtMouseLeave":"4nkbf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/checkAllShipsInPlace":"iOceV","../functions/doesShipPlacementOverlap":"aQTs9","../functions/isCorrectNumberOfShips":"cdvYs"}],"qHolt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtMouseEnter", ()=>handleSuperdreadnoughtMouseEnter);
var _elementCreators = require("../functions/elementCreators");
const handleSuperdreadnoughtMouseEnter = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4nkbf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleSuperdreadnoughtMouseLeave", ()=>handleSuperdreadnoughtMouseLeave);
var _elementCreators = require("../functions/elementCreators");
const handleSuperdreadnoughtMouseLeave = function(ev) {
    // grabs the current state of the axis button
    const axisSelector = document.querySelector(".bttn-axisSelector");
    const currentAxis = axisSelector?.textContent;
    // grabs the current cell co-ordinate
    const currentCell = this.dataset.cellplayer?.split(",");
    const currentX = currentCell?.[0] ?? "";
    const currentY = currentCell?.[1] ?? "";
    // changes consecutive cells in corresponding axes on hover
    if (currentAxis === "Axis-X") for(let i = 0; i < 5; i += 1){
        const nextCell = document.querySelector(`[data-cellplayer="${Number(currentX) + i},${currentY}"]`);
        // avoids changing cells of ships already present
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
        // avoids changing cells of ships already present
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iOceV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "checkAllShipsInPlace", ()=>checkAllShipsInPlace);
var _renderStarsInPlayerBoard = require("./renderStarsInPlayerBoard");
var _renderStartButton = require("./renderStartButton");
const checkAllShipsInPlace = function() {
    // if playerShip co-ordinates does not exist, create it to check its length which is the sum total of length of all player ships
    if (localStorage.getItem("playerShipsCoords")) {
        const shipsCoordsArr = JSON.parse(localStorage.getItem("playerShipsCoords") ?? JSON.stringify([]));
        // if all the player ships have been placed
        if (shipsCoordsArr.length === 18) {
            // adds stars to player board
            (0, _renderStarsInPlayerBoard.renderStarsInPlayerBoard)();
            // STARTS GAME
            (0, _renderStartButton.renderStartButton)();
        }
    }
};

},{"./renderStarsInPlayerBoard":"7WJ4g","./renderStartButton":"aRkr9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7WJ4g":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderStarsInPlayerBoard", ()=>renderStarsInPlayerBoard);
var _elementCreators = require("../functions/elementCreators");
const renderStarsInPlayerBoard = function() {
    const playerGameCell = document.querySelectorAll(".player-gameCell");
    // adds stars and a corresponding class to differentiate the cells which do not consist of a player ship
    playerGameCell.forEach((cell)=>{
        if (!cell.classList.contains("playerShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("\u2734"), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipNotPresent"
            ]
        ]))(cell);
    });
};

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aRkr9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderStartButton", ()=>renderStartButton);
var _handleStartButtonClick = require("../events/handleStartButtonClick");
var _elementCreators = require("../functions/elementCreators");
const renderStartButton = function() {
    // removes the ship selection buttons
    const shipsBttnContainer = document.querySelector(".shipsBttn-container");
    shipsBttnContainer?.remove();
    // removes axis selection button
    const axisSelectorBttn = document.querySelector(".bttn-axisSelector");
    axisSelectorBttn?.remove();
    const shipBttnsWrapper = document.querySelector(".shipBttns-wrapper");
    // renders start game button
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

},{"../events/handleStartButtonClick":"gYeDe","../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gYeDe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleStartButtonClick", ()=>handleStartButtonClick);
var _shipNames = require("../data/shipNames");
var _elementCreators = require("../functions/elementCreators");
var _placeCompShipsOnBoard = require("../functions/placeCompShipsOnBoard");
var _randomizeAndStoreShipNames = require("../functions/randomizeAndStoreShipNames");
var _renderCompBoard = require("../functions/renderCompBoard");
var _renderPlayerBoard = require("../functions/renderPlayerBoard");
var _renderTacticalOverview = require("../functions/renderTacticalOverview");
var _handlePlayerClickOnCompMisses = require("./handlePlayerClickOnCompMisses");
var _handlePlayerClickOnCompShips = require("./handlePlayerClickOnCompShips");
const handleStartButtonClick = function(ev) {
    // scroll to top of window
    window.scrollTo(0, 0);
    // removes the previous info screen
    const infoScreenContainer = document.querySelector(".infoScreen-container");
    infoScreenContainer?.remove();
    const preBattleInfoScreen = document.querySelector(".preBattle-infoScreen");
    preBattleInfoScreen?.remove();
    // removes the ship bttns wrapper
    const shipBttnsWrapper = document.querySelector(".shipBttns-wrapper");
    shipBttnsWrapper?.remove();
    const bothBoardsContainer = document.querySelector(".bothBoards-container");
    bothBoardsContainer?.remove();
    // remove the start button
    this.remove();
    // renders player and comp board and places the ships
    (0, _renderPlayerBoard.renderPlayerBoard)();
    (0, _renderCompBoard.renderCompBoard)();
    // placeCompShipsOnBoard(compShipsPlacementChoicesArr);
    (0, _placeCompShipsOnBoard.placeCompShipsOnBoard)();
    //randomizes and store ship names for each battle
    (0, _randomizeAndStoreShipNames.randomizeAndStoreShipNames)((0, _shipNames.shipNames));
    if (!localStorage.getItem("isGameRunning")) localStorage.setItem("isGameRunning", JSON.stringify(true));
    // adds evt listeners to comp game board cells
    const compShipPresentCells = document.querySelectorAll(".compShipPresent");
    compShipPresentCells.forEach((cell)=>(0, _elementCreators.addEvtListener)("click")((0, _handlePlayerClickOnCompShips.handlePlayerClickOnCompShips))(cell));
    const compShipNotPresentCells = document.querySelectorAll(".compShipNotPresent");
    compShipNotPresentCells.forEach((cell)=>(0, _elementCreators.addEvtListener)("click")((0, _handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses))(cell));
    // renders a new info screen for the battle texts
    const main = document.querySelector(".main");
    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(main))((0, _elementCreators.elemCreator)("div")([
        "infoScreen-wrapper"
    ]));
    // render tactical overview
    (0, _renderTacticalOverview.renderTacticalOverview)();
    const gameBoardContainer = document.querySelector(".gameBoard-container");
    // renders a new info screen for the battle texts
    const battleMessageWrapper = (0, _elementCreators.elemCreator)("div")([
        "battleMessage-wrapper"
    ]);
    (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(gameBoardContainer))(battleMessageWrapper);
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Manticoran Tenth Fleet CIC"), (0, _elementCreators.appendElemToParent)(battleMessageWrapper))((0, _elementCreators.elemCreator)("h2")([
        "battleMessageTitleElem"
    ]));
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric"
    });
    const formattedDate = formatter.format(today);
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`Imperial Terran-year 1913 ${formattedDate}`), (0, _elementCreators.appendElemToParent)(battleMessageWrapper))((0, _elementCreators.elemCreator)("h4")([
        "battleMessageElem"
    ]));
    const battleMessageContainer = (0, _elementCreators.elemCreator)("div")([
        "battleMessage-container"
    ]);
    (0, _elementCreators.appendElemToParent)(battleMessageWrapper)(battleMessageContainer);
};

},{"../data/shipNames":"ekPmF","../functions/elementCreators":"aeBTs","../functions/renderPlayerBoard":"isJFB","../functions/renderTacticalOverview":"cpLJC","./handlePlayerClickOnCompMisses":"2HlWb","./handlePlayerClickOnCompShips":"uEG8W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/placeCompShipsOnBoard":"4ghRE","../functions/randomizeAndStoreShipNames":"kBXaE","../functions/renderCompBoard":"chzyQ"}],"ekPmF":[function(require,module,exports) {
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
        carriers: [
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
        carriers: [
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"isJFB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderPlayerBoard", ()=>renderPlayerBoard);
var _elementCreators = require("./elementCreators");
var _renderStarsAndShipsInPlayerBoard = require("./renderStarsAndShipsInPlayerBoard");
function renderPlayerBoard() {
    const main = document.querySelector(".main");
    const gameBoardContainer = (0, _elementCreators.elemCreator)("div")([
        "gameBoard-container"
    ]);
    (0, _elementCreators.appendElemToParent)(main)(gameBoardContainer);
    const gamePlayerBoardWrapper = (0, _elementCreators.elemCreator)("div")([
        "gamePlayerBoard-wrapper"
    ]);
    (0, _elementCreators.appendElemToParent)(gameBoardContainer)(gamePlayerBoardWrapper);
    const playerBoardContainer = (0, _elementCreators.elemCreator)("div")([
        "playerBoard-container"
    ]);
    (0, _elementCreators.appendElemToParent)(gamePlayerBoardWrapper)(playerBoardContainer);
    for(let i = 0; i < 10; i += 1)for(let j = 0; j < 10; j += 1)// renders a div per iteration of for-loop and append
    (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
        [
            "data-cellplayer",
            `${j},${i}`
        ]
    ]), (0, _elementCreators.appendElemToParent)(playerBoardContainer))((0, _elementCreators.elemCreator)("div")([
        "player-gameCell"
    ]));
    (0, _renderStarsAndShipsInPlayerBoard.renderStarsAndShipsInPlayerBoard)();
}

},{"./elementCreators":"aeBTs","./renderStarsAndShipsInPlayerBoard":"cpqBF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cpqBF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderStarsAndShipsInPlayerBoard", ()=>renderStarsAndShipsInPlayerBoard);
var _elementCreators = require("./elementCreators");
function renderStarsAndShipsInPlayerBoard() {
    const superdreadnoughtCoords = JSON.parse(localStorage.getItem("superdreadnought") ?? JSON.stringify([]));
    const superdreadnoughtCoordsArray = Object.values(superdreadnoughtCoords);
    const battleshipCoords = JSON.parse(localStorage.getItem("battleship") ?? JSON.stringify([]));
    const battleshipCoordsArray = Object.values(battleshipCoords);
    const carrierCoords = JSON.parse(localStorage.getItem("carrier") ?? JSON.stringify([]));
    const carrierCoordsArray = Object.values(carrierCoords);
    const destroyerCoords = JSON.parse(localStorage.getItem("destroyer") ?? JSON.stringify([]));
    const destroyerCoordsArray = destroyerCoords.flatMap((destroyer)=>Object.values(destroyer));
    const frigateCoords = JSON.parse(localStorage.getItem("frigate") ?? JSON.stringify([]));
    const frigateCoordsArray = frigateCoords.flatMap((frigate)=>Object.values(frigate));
    // grab the cells for the player's ships and add the corresponding letter
    const playerGameCell = document.querySelectorAll(".player-gameCell");
    // if the cell's data-cellplayer attribute is included in the array of coords for the ship, add the corresponding letter to the cell and add the class playerShipPresent
    // else add a star and class playerShipNotPresent
    playerGameCell.forEach((cell)=>{
        if (superdreadnoughtCoordsArray.includes(cell.dataset.cellplayer ?? "")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("S"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ]
        ]), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipPresent"
            ]
        ]))(cell);
        else if (battleshipCoordsArray.includes(cell.dataset.cellplayer ?? "")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("B"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ]
        ]), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipPresent"
            ]
        ]))(cell);
        else if (carrierCoordsArray.includes(cell.dataset.cellplayer ?? "")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("C"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ]
        ]), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipPresent"
            ]
        ]))(cell);
        else if (destroyerCoordsArray.includes(cell.dataset.cellplayer ?? "")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("D"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ]
        ]), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipPresent"
            ]
        ]))(cell);
        else if (frigateCoordsArray.includes(cell.dataset.cellplayer ?? "")) (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("F"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "#f0a400"
            ]
        ]), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipPresent"
            ]
        ]))(cell);
        else (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("\u2734"), (0, _elementCreators.addStyleToElem)([
            [
                "color",
                "gainsboro"
            ]
        ]), (0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "player-gameCell playerShipNotPresent"
            ]
        ]))(cell);
    });
}

},{"./elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cpLJC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderTacticalOverview", ()=>renderTacticalOverview);
var _elementCreators = require("./elementCreators");
var _returnPlayerCompShipsCoords = require("./returnPlayerCompShipsCoords");
var _shuffleArray = require("./shuffleArray");
function renderTacticalOverview() {
    const gamePlayerBoardWrapper = document.querySelector(".gamePlayerBoard-wrapper");
    const compBoardWrapper = document.querySelector(".compBoard-wrapper");
    const tacticalOverviewWrapperPlayer = (0, _elementCreators.elemCreator)("div")([
        "tacticalOverview-wrapper"
    ]);
    (0, _elementCreators.appendElemToParent)(gamePlayerBoardWrapper)(tacticalOverviewWrapperPlayer);
    const tacticalOverviewWrapperComp = (0, _elementCreators.elemCreator)("div")([
        "tacticalOverview-wrapper"
    ]);
    (0, _elementCreators.appendElemToParent)(compBoardWrapper)(tacticalOverviewWrapperComp);
    const tacticalOverviewContainerPlayer = (0, _elementCreators.elemCreator)("div")([
        "tacticalOverview-container", 
    ]);
    (0, _elementCreators.appendElemToParent)(tacticalOverviewWrapperPlayer)(tacticalOverviewContainerPlayer);
    const tacticalOverviewTitlePlayer = (0, _elementCreators.elemCreator)("h2")([
        "tacticalOverview-title"
    ]);
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Manticoran Navy Tenth Fleet"), (0, _elementCreators.appendElemToParent)(tacticalOverviewContainerPlayer))(tacticalOverviewTitlePlayer);
    const tacticalOverviewContainerComp = (0, _elementCreators.elemCreator)("div")([
        "tacticalOverview-container", 
    ]);
    (0, _elementCreators.appendElemToParent)(tacticalOverviewWrapperComp)(tacticalOverviewContainerComp);
    const tacticalOverviewTitleComp = (0, _elementCreators.elemCreator)("h2")([
        "tacticalOverview-title"
    ]);
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Havenite Navy Grendelsbane Fleet"), (0, _elementCreators.appendElemToParent)(tacticalOverviewContainerComp))(tacticalOverviewTitleComp);
    const manticoreShipNamesCoords = JSON.parse(localStorage.getItem("manticoreShipNames") ?? JSON.stringify([
        {}
    ]));
    // grab the ship coords from the board to use them in the tac overview cells to update hits
    const { playerShipCoords  } = (0, _returnPlayerCompShipsCoords.returnPlayerCompShipsCoords)();
    // loop through the player ship names and render the ship names along with the cells corresponding to the shiptype and coords from the board
    Object.entries(manticoreShipNamesCoords).forEach(([shipType, shipName])=>{
        //handle superdreadnought, carrier, battleship first
        if (!Array.isArray(shipName)) {
            const shipNameContainer = (0, _elementCreators.elemCreator)("div")([
                "shipName-container"
            ]);
            (0, _elementCreators.appendElemToParent)(tacticalOverviewWrapperPlayer)(shipNameContainer);
            const lengthOfCells = shipType === "superdreadnought" ? 5 : shipType === "carrier" ? 4 : 3;
            const shipAndCoords = shipType === "superdreadnought" ? playerShipCoords.superdreadnought : shipType === "carrier" ? playerShipCoords.carrier : playerShipCoords.battleship;
            (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`RMNS ${shipName}`), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("p")([
                "shipName-text"
            ]));
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "data-shiptype",
                    `${shipType}`
                ]
            ]), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("div")([
                "tacticalCells-container"
            ]));
            for(let i = 0; i < lengthOfCells; i += 1)(0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    `data-playership`,
                    `${shipAndCoords[i]}`
                ]
            ]), (0, _elementCreators.addTextToElem)(shipType[0].toUpperCase()), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("div")([
                "player-tacticalCell"
            ]));
        } else {
            const lengthOfCells = shipType === "destroyers" ? 2 : 1;
            const shipAndCoords = shipType === "destroyers" ? playerShipCoords.destroyers : playerShipCoords.frigates;
            for(let i = 0; i < 2; i += 1){
                const shipNameContainer = (0, _elementCreators.elemCreator)("div")([
                    "shipName-container"
                ]);
                (0, _elementCreators.appendElemToParent)(tacticalOverviewWrapperPlayer)(shipNameContainer);
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`RMNS ${shipName[i]}`), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("p")([
                    "shipName-text"
                ]));
                const tacticalCellsContainer = (0, _elementCreators.elemCreator)("div")([
                    "tacticalCells-container"
                ]);
                (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                    [
                        "data-playershiptype",
                        `${shipType}`
                    ]
                ]), (0, _elementCreators.appendElemToParent)(shipNameContainer))(tacticalCellsContainer);
                for(let j = 0; j < lengthOfCells; j += 1)(0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                    [
                        `data-playership`,
                        `${shipAndCoords[i][j]}`
                    ]
                ]), (0, _elementCreators.addTextToElem)(shipType[0].toUpperCase()), (0, _elementCreators.appendElemToParent)(tacticalCellsContainer))((0, _elementCreators.elemCreator)("div")([
                    "player-tacticalCell"
                ]));
            }
        }
    });
    const havenShipNamesCoords = JSON.parse(localStorage.getItem("havenShipNames") ?? JSON.stringify([
        {}
    ]));
    const havenShipTypeNamesArr = Object.entries(havenShipNamesCoords);
    // shuffle array
    const shuffledHavenShipTypeNamesCoordsArr = (0, _shuffleArray.shuffleArray)(havenShipTypeNamesArr);
    // loop through the comp ship names and render the ship names along with the cells corresponding to the shiptype and coords from the board
    shuffledHavenShipTypeNamesCoordsArr.forEach(([shipType, shipName])=>{
        // handle superdreadnought, carrier, battleship first
        if (!Array.isArray(shipName)) {
            const shipNameContainer = (0, _elementCreators.elemCreator)("div")([
                "shipName-container"
            ]);
            (0, _elementCreators.appendElemToParent)(tacticalOverviewWrapperComp)(shipNameContainer);
            const lengthOfCells = shipType === "superdreadnought" ? 5 : shipType === "carrier" ? 4 : 3;
            (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    "data-compshipnamecontainer",
                    `${shipType}`
                ]
            ]), (0, _elementCreators.addTextToElem)(`PNS ${shipName}`), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("p")([
                "shipName-text"
            ]));
            (0, _elementCreators.pipe)((0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("div")([
                "tacticalCells-container"
            ]));
            // add the hidden cells that wil be revealed once the player has fired upon all adjacent cells
            for(let i = 0; i < lengthOfCells; i += 1)(0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                [
                    `data-compshipcell`,
                    `${shipType[0].toUpperCase() + shipType.slice(1)}_${i}`, 
                ], 
            ]), (0, _elementCreators.addStyleToElem)([
                [
                    "display",
                    "none"
                ]
            ]), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("div")([
                "comp-tacticalCell"
            ]));
            (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("?"), (0, _elementCreators.addAttributeToElem)([
                [
                    `data-compshipquestion`,
                    `${shipType[0].toUpperCase() + shipType.slice(1)}`
                ], 
            ]), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("div")([
                "comp-tacticalCell"
            ]));
        } else {
            const lengthOfCells = shipType === "destroyers" ? 2 : 1;
            for(let i = 0; i < 2; i += 1){
                const shipNameContainer = (0, _elementCreators.elemCreator)("div")([
                    "shipName-container"
                ]);
                (0, _elementCreators.appendElemToParent)(tacticalOverviewWrapperComp)(shipNameContainer);
                (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`PNS ${shipName[i]}`), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("p")([
                    "shipName-text"
                ]));
                const tacticalCellsContainer = (0, _elementCreators.elemCreator)("div")([
                    "tacticalCells-container"
                ]);
                (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                    [
                        "data-compshiptype",
                        `${shipType[0].toUpperCase() + shipType.slice(1)}_${i}`, 
                    ], 
                ]), (0, _elementCreators.appendElemToParent)(shipNameContainer))(tacticalCellsContainer);
                (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                    [
                        `data-compshipquestion`,
                        `${shipType[0].toUpperCase() + shipType.slice(1)}_${i}`, 
                    ], 
                ]), (0, _elementCreators.addTextToElem)("?"), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("div")([
                    "comp-tacticalCell"
                ]));
                // add the hidden cells that wil be revealed once the player has fired upon all adjacent cells
                for(let j = 0; j < lengthOfCells; j += 1)(0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
                    [
                        `data-compshipcell`,
                        `${shipType[0].toUpperCase() + shipType.slice(1)}_${i}_${j}`, 
                    ], 
                ]), (0, _elementCreators.addStyleToElem)([
                    [
                        "display",
                        "none"
                    ]
                ]), (0, _elementCreators.appendElemToParent)(shipNameContainer))((0, _elementCreators.elemCreator)("div")([
                    "comp-tacticalCell"
                ]));
            }
        }
    });
}

},{"./elementCreators":"aeBTs","./returnPlayerCompShipsCoords":"gvSOo","./shuffleArray":"uu9YW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gvSOo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "returnPlayerCompShipsCoords", ()=>returnPlayerCompShipsCoords);
function returnPlayerCompShipsCoords() {
    // grab the player and comp ships coords from local storage so we can assign ship cells in the tac overview to the correct ship cells from game board
    // coulda sorted the coords but this is more explicit and easier to read, albeit verbose and also guarantees order sequence
    const playerSuperdreadnought = JSON.parse(localStorage.getItem("superdreadnought") ?? JSON.stringify([
        {}
    ]));
    const playerSuperdreadnoughtCoords = [
        playerSuperdreadnought.head,
        playerSuperdreadnought.body1,
        playerSuperdreadnought.body2,
        playerSuperdreadnought.body3,
        playerSuperdreadnought.tail, 
    ];
    const playerCarrier = JSON.parse(localStorage.getItem("carrier") ?? JSON.stringify([
        {}
    ]));
    const playerCarrierCoords = [
        playerCarrier.head,
        playerCarrier.body1,
        playerCarrier.body2,
        playerCarrier.tail, 
    ];
    const playerBattleship = JSON.parse(localStorage.getItem("battleship") ?? JSON.stringify([
        {}
    ]));
    const playerBattleshipCoords = [
        playerBattleship.head,
        playerBattleship.body,
        playerBattleship.tail, 
    ];
    const playerDestroyers = JSON.parse(localStorage.getItem("destroyer") ?? JSON.stringify([
        {}
    ]));
    const playerDestroyersCoords = [
        [
            playerDestroyers[0].head,
            playerDestroyers[0].tail
        ],
        [
            playerDestroyers[1].head,
            playerDestroyers[1].tail
        ], 
    ];
    const playerFrigates = JSON.parse(localStorage.getItem("frigate") ?? JSON.stringify([
        {}
    ]));
    const playerFrigatesCoords = [
        [
            playerFrigates[0].body
        ],
        [
            playerFrigates[1].body
        ]
    ];
    const compSuperdreadnought = JSON.parse(localStorage.getItem("compSuperdreadnought") ?? JSON.stringify([
        {}
    ]));
    const compSuperdreadnoughtCoords = [
        compSuperdreadnought.head,
        compSuperdreadnought.body1,
        compSuperdreadnought.body2,
        compSuperdreadnought.body3,
        compSuperdreadnought.tail, 
    ];
    const compCarrier = JSON.parse(localStorage.getItem("compCarrier") ?? JSON.stringify([
        {}
    ]));
    const compCarrierCoords = [
        compCarrier.head,
        compCarrier.body1,
        compCarrier.body2,
        compCarrier.tail, 
    ];
    const compBattleship = JSON.parse(localStorage.getItem("compBattleship") ?? JSON.stringify([
        {}
    ]));
    const compBattleshipCoords = [
        compBattleship.head,
        compBattleship.body,
        compBattleship.tail, 
    ];
    const compDestroyers = JSON.parse(localStorage.getItem("compDestroyers") ?? JSON.stringify([
        {}
    ]));
    const compDestroyersCoords = [
        [
            compDestroyers[0].head,
            compDestroyers[0].tail
        ],
        [
            compDestroyers[1].head,
            compDestroyers[1].tail
        ], 
    ];
    const compFrigates = JSON.parse(localStorage.getItem("compFrigates") ?? JSON.stringify([
        {}
    ]));
    const compFrigatesCoords = [
        [
            compFrigates[0].body
        ],
        [
            compFrigates[1].body
        ]
    ];
    return {
        playerShipCoords: {
            superdreadnought: playerSuperdreadnoughtCoords,
            carrier: playerCarrierCoords,
            battleship: playerBattleshipCoords,
            destroyers: playerDestroyersCoords,
            frigates: playerFrigatesCoords
        },
        compShipCoords: {
            superdreadnought: compSuperdreadnoughtCoords,
            carrier: compCarrierCoords,
            battleship: compBattleshipCoords,
            destroyers: compDestroyersCoords,
            frigates: compFrigatesCoords
        }
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"uu9YW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shuffleArray", ()=>shuffleArray);
/**
 * Clones an array using structured clone algorithm
 * then shuffles the cloned array using the Durstenfeld shuffle algorithm (Fisher-Yates shuffle)
 * see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param array of generic type T
 * @returns new array of generic type T
 */ function shuffleArray(array) {
    const shuffledArray = structuredClone(array);
    for(let i = shuffledArray.length - 1; i > 0; i -= 1){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i]
        ];
    }
    return shuffledArray;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2HlWb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handlePlayerClickOnCompMisses", ()=>handlePlayerClickOnCompMisses);
var _computersTurn = require("../functions/computersTurn");
var _elementCreators = require("../functions/elementCreators");
var _renderBattleMessage = require("../functions/renderBattleMessage");
var _updateCompTacticalOverviewShips = require("../functions/updateCompTacticalOverviewShips");
var _handlePlayerClickOnCompShips = require("./handlePlayerClickOnCompShips");
const handlePlayerClickOnCompMisses = function(ev) {
    const currentCellCoord = this.dataset.cellcomp ?? "";
    const currentShipSymbol = this.textContent ?? "";
    const towardsCombatant = "comp";
    const hitOrMiss = "miss";
    (0, _renderBattleMessage.renderBattleMessageElem)({
        currentCellCoord,
        currentShipSymbol,
        towardsCombatant,
        hitOrMiss
    });
    // assigns '✖' to currently missed co-ordinate and colors it amber
    this.textContent;
    this.textContent = "\u2716";
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "color",
            "#f0a400"
        ]
    ]))(this);
    // initializse storage for previously missed co-ordinates
    if (!localStorage.getItem("prevPlayerMissOnCompCoord")) localStorage.setItem("prevPlayerMissOnCompCoord", JSON.stringify(""));
    // grabs the previous miss co-ordinates in order to turn them back into gray
    const prevPlayerMissOnCompCoord = JSON.parse(localStorage.getItem("prevPlayerMissOnCompCoord") ?? "");
    const prevPlayerMissOnCompCell = document.querySelector(`[data-cellcomp="${prevPlayerMissOnCompCoord}"]`);
    (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
        [
            "color",
            "gainsboro"
        ]
    ]))(prevPlayerMissOnCompCell);
    // stores current miss co-ordinates in order to highlight the current round's co-ordinates
    localStorage.setItem("prevPlayerMissOnCompCoord", JSON.stringify(currentCellCoord));
    // store miss coords
    const compShipsMissesCoords = JSON.parse(localStorage.getItem("compShipsMissesCoords") ?? JSON.stringify([]));
    compShipsMissesCoords.push(currentCellCoord);
    localStorage.setItem("compShipsMissesCoords", JSON.stringify(compShipsMissesCoords));
    // update the comp tactical overview
    (0, _updateCompTacticalOverviewShips.updateCompTacticalOverviewShips)();
    // all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
    // the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
    // After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue is empty because there are no promises), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
    // simulates a rudimentary game loop and gives the illusion of time taken for the computer to "think"
    const compShipNotPresent = document.querySelectorAll(".compShipNotPresent");
    const compShipPresent = document.querySelectorAll(".compShipPresent");
    compShipNotPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handlePlayerClickOnCompMisses))(cell);
    });
    compShipPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")((0, _handlePlayerClickOnCompShips.handlePlayerClickOnCompShips)))(cell);
    });
    //computers turn
    setTimeout((0, _computersTurn.computersTurn), 2000);
};

},{"../functions/elementCreators":"aeBTs","../functions/updateCompTacticalOverviewShips":"3dM43","./handlePlayerClickOnCompShips":"uEG8W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/computersTurn":"6iO9p","../functions/renderBattleMessage":"jrIRe"}],"3dM43":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateCompTacticalOverviewShips", ()=>updateCompTacticalOverviewShips);
var _beforeAfterShipCellsFiredUponStatus = require("./beforeAfterShipCellsFiredUponStatus");
var _elementCreators = require("./elementCreators");
function updateCompTacticalOverviewShips() {
    // grab all coords of comp ships
    const superdreadnoughtCoords = JSON.parse(localStorage.getItem("compSuperdreadnought") ?? JSON.stringify([]));
    const superdreadnoughtCoordsArray = Object.values(superdreadnoughtCoords);
    const battleshipCoords = JSON.parse(localStorage.getItem("compBattleship") ?? JSON.stringify([]));
    const battleshipCoordsArray = Object.values(battleshipCoords);
    const carrierCoords = JSON.parse(localStorage.getItem("compCarrier") ?? JSON.stringify([]));
    const carrierCoordsArray = Object.values(carrierCoords);
    const destroyerCoords = JSON.parse(localStorage.getItem("compDestroyers") ?? JSON.stringify([]));
    const destroyerCoordsArray = destroyerCoords.map((destroyer)=>Object.values(destroyer));
    const frigateCoords = JSON.parse(localStorage.getItem("compFrigates") ?? JSON.stringify([]));
    const frigateCoordsArray = frigateCoords.map((frigate)=>Object.values(frigate));
    // coords of player misses on computer ships
    const compShipsMissesCoords = JSON.parse(localStorage.getItem("compShipsMissesCoords") ?? JSON.stringify([]));
    const compShipsMissesCoordsSet = new Set(compShipsMissesCoords);
    // coords of player hits on computer ships
    const compShipsHitCoords = JSON.parse(localStorage.getItem("compShipsHitCoords") ?? JSON.stringify([]));
    const compShipsHitCoordsSet = new Set(compShipsHitCoords);
    const shipTypesCoords = [
        [
            "Superdreadnought",
            superdreadnoughtCoordsArray
        ],
        [
            "Battleship",
            battleshipCoordsArray
        ],
        [
            "Carrier",
            carrierCoordsArray
        ], 
    ];
    shipTypesCoords.forEach(([shipType, coords])=>{
        const isEveryShipCoordHit = coords.reduce((acc, coord)=>{
            if (!compShipsHitCoordsSet.has(coord)) acc = false;
            return acc;
        }, true);
        // if every ship coord is hit, check if the cell before and after the ship is also hit, then the ship is sunk and the ship is displayed as sunk in the tactical overview without prematurely displaying to the player
        if (isEveryShipCoordHit) {
            // sorts the coords, determines direction, and determines the cells just before and after the ship and whether they have been fired upon
            const { isBeforeShipCellFiredUpon , isAfterShipCellFiredUpon  } = (0, _beforeAfterShipCellsFiredUponStatus.beforeAfterShipCellsFiredUponStatus)({
                shipType,
                coordsArr: coords,
                compShipsHitCoordsSet,
                compShipsMissesCoordsSet
            });
            // if the cells just before and just after the ship have been fired upon (either hit or miss), then the ship is confirmed sunk and safe to update the tactical overview
            if (isBeforeShipCellFiredUpon && isAfterShipCellFiredUpon) {
                // grab the tac overview comp '?' cell and remove it
                const questionMarkCell = document.querySelector(`[data-compshipquestion="${shipType}"]`);
                if (questionMarkCell) questionMarkCell.remove();
                const lengthOfCells = shipType === "Superdreadnought" ? 5 : shipType === "Carrier" ? 4 : 3;
                // display sunk ship with '💥' emoji
                for(let i = 0; i < lengthOfCells; i += 1){
                    const hiddenCell = document.querySelector(`[data-compshipcell="${shipType}_${i}"]`);
                    if (hiddenCell && hiddenCell.style.display === "none") (0, _elementCreators.pipe)((0, _elementCreators.removeStyleFromElem)("display"), (0, _elementCreators.addStyleToElem)([
                        [
                            "display",
                            "visible"
                        ],
                        [
                            "color",
                            "#f0a400"
                        ], 
                    ]), (0, _elementCreators.addTextToElem)("\uD83D\uDCA5"))(hiddenCell);
                }
            }
        }
    });
    const shipTypesCoordsArrArr = [
        [
            "Destroyers",
            destroyerCoordsArray
        ],
        [
            "Frigates",
            frigateCoordsArray
        ], 
    ];
    shipTypesCoordsArrArr.forEach(([shipType, coordsArrArr])=>{
        coordsArrArr.forEach((coordsArr, idx)=>{
            const isEveryShipCoordHit = coordsArr.reduce((acc, coord)=>{
                if (!compShipsHitCoordsSet.has(coord)) acc = false;
                return acc;
            }, true);
            // if every ship coord is hit, check if the cell before and after the ship is also hit, then the ship is sunk and the ship is displayed as sunk in the tactical overview without prematurely displaying to the player
            if (isEveryShipCoordHit) {
                // sorts the coords, determines direction, and determines the cells just before and after the ship and whether they have been fired upon
                const { isBeforeShipCellFiredUpon , isAfterShipCellFiredUpon  } = (0, _beforeAfterShipCellsFiredUponStatus.beforeAfterShipCellsFiredUponStatus)({
                    shipType,
                    coordsArr,
                    compShipsHitCoordsSet,
                    compShipsMissesCoordsSet
                });
                // if the cells just before and just after the ship have been fired upon (either hit or miss), then the ship is confirmed sunk and safe to update the tactical overview
                if (isBeforeShipCellFiredUpon && isAfterShipCellFiredUpon) {
                    // grab the tac overview comp '?' cell and remove it
                    const questionMarkCell = document.querySelector(`[data-compshipquestion="${shipType}_${idx}"]`);
                    if (questionMarkCell) questionMarkCell.remove();
                    // display sunk ship with '💥' emoji
                    for(let i = 0; i < coordsArr.length; i += 1){
                        const hiddenCell = document.querySelector(`[data-compshipcell="${shipType}_${idx}_${i}"]`);
                        if (hiddenCell && hiddenCell.style.display === "none") (0, _elementCreators.pipe)((0, _elementCreators.removeStyleFromElem)("display"), (0, _elementCreators.addStyleToElem)([
                            [
                                "display",
                                "visible"
                            ],
                            [
                                "color",
                                "#f0a400"
                            ], 
                        ]), (0, _elementCreators.addTextToElem)("\uD83D\uDCA5"))(hiddenCell);
                    }
                }
            }
        });
    });
}

},{"./beforeAfterShipCellsFiredUponStatus":"2ylZY","./elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2ylZY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "beforeAfterShipCellsFiredUponStatus", ()=>beforeAfterShipCellsFiredUponStatus);
function beforeAfterShipCellsFiredUponStatus({ shipType , coordsArr , compShipsHitCoordsSet , compShipsMissesCoordsSet  }) {
    // since frigates are only one cells each, both directions must be checked
    // to determine if the frigate is surrounded
    if (shipType === "Frigates") {
        // no sorting as frigate coords are only one cell each
        const frigateCell = coordsArr[0];
        const frigateCellX = parseInt(frigateCell.split(",")[0]);
        const frigateCellY = parseInt(frigateCell.split(",")[1]);
        // top cell
        const topCell = `${frigateCellX},${frigateCellY - 1}`;
        const topCellWithinBounds = parseInt(topCell.split(",")[1]) >= 0;
        // right cell
        const rightCell = `${frigateCellX + 1},${frigateCellY}`;
        const rightCellWithinBounds = parseInt(rightCell.split(",")[0]) <= 9;
        // bottom cell
        const bottomCell = `${frigateCellX},${frigateCellY + 1}`;
        const bottomCellWithinBounds = parseInt(bottomCell.split(",")[1]) <= 9;
        // left cell
        const leftCell = `${frigateCellX - 1},${frigateCellY}`;
        const leftCellWithinBounds = parseInt(leftCell.split(",")[0]) >= 0;
        // if the cells are not within bounds, they are considered to have been fired upon
        const isTopCellFiredUpon = topCellWithinBounds ? compShipsHitCoordsSet.has(topCell) || compShipsMissesCoordsSet.has(topCell) : true;
        const isRightCellFiredUpon = rightCellWithinBounds ? compShipsHitCoordsSet.has(rightCell) || compShipsMissesCoordsSet.has(rightCell) : true;
        const isBottomCellFiredUpon = bottomCellWithinBounds ? compShipsHitCoordsSet.has(bottomCell) || compShipsMissesCoordsSet.has(bottomCell) : true;
        const isLeftCellFiredUpon = leftCellWithinBounds ? compShipsHitCoordsSet.has(leftCell) || compShipsMissesCoordsSet.has(leftCell) : true;
        const isBeforeShipCellFiredUpon = isTopCellFiredUpon && isLeftCellFiredUpon;
        const isAfterShipCellFiredUpon = isRightCellFiredUpon && isBottomCellFiredUpon;
        return {
            isBeforeShipCellFiredUpon,
            isAfterShipCellFiredUpon
        };
    }
    // following is for all other ship types except frigates
    // need  to sort the coords because they were grabbed from an object and
    // js does not guarantee the order of the keys in an object
    const coordsArrClone = structuredClone(coordsArr);
    const sortedCoordsArr = coordsArrClone.sort((a, b)=>{
        const aX = parseInt(a.split(",")[0].replace('"', ""));
        const aY = parseInt(a.split(",")[1].replace('"', ""));
        const bX = parseInt(b.split(",")[0].replace('"', ""));
        const bY = parseInt(b.split(",")[1].replace('"', ""));
        if (aX < bX) return -1;
        if (aX > bX) return 1;
        if (aY < bY) return -1;
        if (aY > bY) return 1;
        return 0;
    });
    // determine the direction of the ship
    const firstCoord = sortedCoordsArr[0];
    const lastCoord = sortedCoordsArr[sortedCoordsArr.length - 1];
    const firstCoordXY = firstCoord.split(",");
    const lastCoordXY = lastCoord.split(",");
    const firstCoordX = parseInt(firstCoordXY[0].replace('"', ""));
    const firstCoordY = parseInt(firstCoordXY[1].replace('"', ""));
    const lastCoordX = parseInt(lastCoordXY[0].replace('"', ""));
    const lastCoordY = parseInt(lastCoordXY[1].replace('"', ""));
    const isHorizontal = firstCoordY === lastCoordY;
    // const isVertical = firstCoordX === lastCoordX;
    // determine the cells just before and just after the ship
    const beforeShipCell = isHorizontal ? `${firstCoordX - 1},${firstCoordY}` : `${firstCoordX},${firstCoordY - 1}`;
    const beforeShipCellX = parseInt(beforeShipCell.split(",")[0]);
    const beforeShipCellY = parseInt(beforeShipCell.split(",")[1]);
    const beforeShipCellWithinBounds = isHorizontal ? beforeShipCellX <= 9 && beforeShipCellX >= 0 : beforeShipCellY <= 9 && beforeShipCellY >= 0;
    // if the cell is not within bounds, it is considered to have been fired upon
    const isBeforeShipCellFiredUpon = beforeShipCellWithinBounds ? compShipsHitCoordsSet.has(beforeShipCell) || compShipsMissesCoordsSet.has(beforeShipCell) : true;
    const afterShipCell = isHorizontal ? `${lastCoordX + 1},${lastCoordY}` : `${lastCoordX},${lastCoordY + 1}`;
    const afterShipCellX = parseInt(afterShipCell.split(",")[0]);
    const afterShipCellY = parseInt(afterShipCell.split(",")[1]);
    const afterShipCellWithinBounds = isHorizontal ? afterShipCellX <= 9 && afterShipCellX >= 0 : afterShipCellY <= 9 && afterShipCellY >= 0;
    // if the cell is not within bounds, it is considered to have been fired upon
    const isAfterShipCellFiredUpon = afterShipCellWithinBounds ? compShipsHitCoordsSet.has(afterShipCell) || compShipsMissesCoordsSet.has(afterShipCell) : true;
    return {
        isBeforeShipCellFiredUpon,
        isAfterShipCellFiredUpon
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"uEG8W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handlePlayerClickOnCompShips", ()=>handlePlayerClickOnCompShips);
var _announceGameWinner = require("../functions/announceGameWinner");
var _computersTurn = require("../functions/computersTurn");
var _elementCreators = require("../functions/elementCreators");
var _renderBattleMessage = require("../functions/renderBattleMessage");
var _returnPlayerCompShipsCoords = require("../functions/returnPlayerCompShipsCoords");
var _returnShipSymbolFromCoord = require("../functions/returnShipSymbolFromCoord");
var _returnSunkShipObj = require("../functions/returnSunkShipObj");
var _updateCompTacticalOverviewShips = require("../functions/updateCompTacticalOverviewShips");
var _handlePlayerClickOnCompMisses = require("./handlePlayerClickOnCompMisses");
const handlePlayerClickOnCompShips = function(ev) {
    // initialize the hit counter on first hit
    // when total hits reaches 18, game ends
    if (!localStorage.getItem("totalHitsOnCompShips")) localStorage.setItem("totalHitsOnCompShips", JSON.stringify(0));
    const compShipsCoords = JSON.parse(localStorage.getItem("compShipsCoords") ?? "");
    let totalHitsOnCompShips = JSON.parse(localStorage.getItem("totalHitsOnCompShips") ?? "");
    const currentCellCoord = this.dataset.cellcomp ?? "";
    // prevents winner being called when a miss is registered
    if (compShipsCoords.includes(currentCellCoord)) // checks hit counter to see if its the last hit
    {
        if (totalHitsOnCompShips === 17) {
            const playerName = JSON.parse(localStorage.getItem("playerName") ?? "");
            (0, _announceGameWinner.announceGameWinner)(playerName);
        }
    }
    // used to identify the ship that was hit
    const playerCompShipsCoords = (0, _returnPlayerCompShipsCoords.returnPlayerCompShipsCoords)();
    // required so that the renderBattleMessageElem function can display the appropriate message
    const towardsCombatant = "comp";
    const hitOrMiss = "hit";
    const currentShipSymbol = (0, _returnShipSymbolFromCoord.returnShipSymbolFromCoord)({
        playerCompShipsCoords,
        currentCellCoord,
        towardsCombatant
    });
    // stores hits on corresponding ships to determine if a ship has been sunk
    const sunkShipObj = (0, _returnSunkShipObj.returnSunkShipObj)(currentCellCoord, currentShipSymbol, towardsCombatant);
    const sunkShipName = sunkShipObj.player === null || sunkShipObj.player === undefined ? sunkShipObj.comp : sunkShipObj.player;
    (0, _renderBattleMessage.renderBattleMessageElem)({
        currentCellCoord,
        currentShipSymbol,
        towardsCombatant,
        hitOrMiss,
        sunkShipName
    });
    // updates the comp board cell to visually indicate hit
    this.textContent = "";
    this.textContent = "\uD83D\uDCA5";
    this.style.color = "#f0a400";
    // prevents clicks on previously hit cells counting towards totalHitsOnCompShips
    if (!localStorage.getItem("compShipsHitCoords")) localStorage.setItem("compShipsHitCoords", JSON.stringify([]));
    const compShipsHitCoords = JSON.parse(localStorage.getItem("compShipsHitCoords") ?? "");
    // updates hit counter only when new hit is not on a previously hit cell, and store
    if (!compShipsHitCoords.includes(currentCellCoord)) {
        // stores the unique hit co-ordinate
        compShipsHitCoords.push(currentCellCoord);
        localStorage.setItem("compShipsHitCoords", JSON.stringify(compShipsHitCoords));
        // increments the hit counter and store
        totalHitsOnCompShips = totalHitsOnCompShips + 1;
        localStorage.setItem("totalHitsOnCompShips", JSON.stringify(totalHitsOnCompShips));
    }
    // update the comp tactical overview
    (0, _updateCompTacticalOverviewShips.updateCompTacticalOverviewShips)();
    // all JS synchronous functions run-to-completion and since click callbacks are also synchronous, the setTimeout function is passed to a browser API and immediately starts the timer while the rest of the synchronous functions are run and popped off the call stack.
    // the remove click event listeners callback functions are the last synchronous instructions to be executed preventing the player from clicking any comp board cells for two seconds
    // After two seconds, the event loop pushes the setTimeout callback function to the macrotask queue (the higher priority microtask queue is empty because there are no promises), and once the event loop confirms call stack is empty, pushes the computersTurn function to the stack and is run and then event listeners are added back on
    // simulates a rudimentary game loop  and gives the illusion of time taken for the computer to "think"
    const compShipPresent = document.querySelectorAll(".compShipPresent");
    const compShipNotPresent = document.querySelectorAll(".compShipNotPresent");
    compShipPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")(handlePlayerClickOnCompShips))(cell);
    });
    compShipNotPresent.forEach((cell)=>{
        (0, _elementCreators.pipe)((0, _elementCreators.removeEvtListener)("click")((0, _handlePlayerClickOnCompMisses.handlePlayerClickOnCompMisses)))(cell);
    });
    setTimeout((0, _computersTurn.computersTurn), 2000);
};

},{"../functions/elementCreators":"aeBTs","../functions/returnPlayerCompShipsCoords":"gvSOo","../functions/returnShipSymbolFromCoord":"8gE8M","../functions/returnSunkShipObj":"kI7rO","../functions/updateCompTacticalOverviewShips":"3dM43","./handlePlayerClickOnCompMisses":"2HlWb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../functions/announceGameWinner":"kPsJ9","../functions/computersTurn":"6iO9p","../functions/renderBattleMessage":"jrIRe"}],"8gE8M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "returnShipSymbolFromCoord", ()=>returnShipSymbolFromCoord);
function returnShipSymbolFromCoord({ playerCompShipsCoords , currentCellCoord , towardsCombatant  }) {
    const { playerShipCoords , compShipCoords  } = playerCompShipsCoords;
    let shipSymbol = "";
    if (towardsCombatant === "player") shipSymbol = Object.entries(playerShipCoords).reduce((acc, [shipName, shipCoords])=>{
        const shipCoords_ = shipCoords.flat(3);
        if (shipCoords_.includes(currentCellCoord)) acc = shipName[0].toUpperCase();
        return acc;
    }, "");
    if (towardsCombatant === "comp") shipSymbol = Object.entries(compShipCoords).reduce((acc, [shipName, shipCoords])=>{
        const shipCoords_ = shipCoords.flat(3);
        if (shipCoords_.includes(currentCellCoord)) acc = shipName[0].toUpperCase();
        return acc;
    }, "");
    return shipSymbol;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kI7rO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "returnSunkShipObj", ()=>returnSunkShipObj);
var _returnPlayerCompShipsCoords = require("./returnPlayerCompShipsCoords");
// returns an object with the sunk ship name if a ship has been sunk
function returnSunkShipObj(currentCellCoord, currentShipSymbol, towardsCombatant) {
    const playerCompShipsCoords = (0, _returnPlayerCompShipsCoords.returnPlayerCompShipsCoords)();
    // store hits on ships to determine if a ship has been sunk
    const shipHits = JSON.parse(localStorage.getItem("shipHits") ?? JSON.stringify({
        playerShips: {
            superdreadnought: 0,
            carrier: 0,
            battleship: 0,
            destroyers: [
                0,
                0
            ],
            frigates: [
                0,
                0
            ]
        },
        compShips: {
            superdreadnought: 0,
            carrier: 0,
            battleship: 0,
            destroyers: [
                0,
                0
            ],
            frigates: [
                0,
                0
            ]
        }
    }));
    const havenShipNames = JSON.parse(localStorage.getItem("havenShipNames") ?? "");
    const manticoreShipNames = JSON.parse(localStorage.getItem("manticoreShipNames") ?? "");
    const sunkShipObj = {
        player: null,
        comp: null
    };
    if (towardsCombatant === "player") switch(currentShipSymbol){
        case "S":
            shipHits.playerShips.superdreadnought < 4 ? shipHits.playerShips.superdreadnought += 1 : sunkShipObj.player = manticoreShipNames.superdreadnought;
            break;
        case "C":
            shipHits.playerShips.carrier < 3 ? shipHits.playerShips.carrier += 1 : sunkShipObj.player = manticoreShipNames.carrier;
            break;
        case "B":
            shipHits.playerShips.battleship < 2 ? shipHits.playerShips.battleship += 1 : sunkShipObj.player = manticoreShipNames.battleship;
            break;
        case "D":
            if (playerCompShipsCoords.playerShipCoords.destroyers[0].includes(currentCellCoord)) shipHits.playerShips.destroyers[0] < 1 ? shipHits.playerShips.destroyers[0] += 1 : sunkShipObj.player = manticoreShipNames.destroyers[0];
            else shipHits.playerShips.destroyers[1] < 1 ? shipHits.playerShips.destroyers[1] += 1 : sunkShipObj.player = manticoreShipNames.destroyers[1];
            break;
        case "F":
            if (playerCompShipsCoords.playerShipCoords.frigates[0].includes(currentCellCoord)) sunkShipObj.player = manticoreShipNames.frigates[0];
            else sunkShipObj.player = manticoreShipNames.frigates[1];
            break;
        default:
            break;
    }
    else switch(currentShipSymbol){
        case "S":
            shipHits.compShips.superdreadnought < 4 ? shipHits.compShips.superdreadnought += 1 : sunkShipObj.comp = havenShipNames.superdreadnought;
            break;
        case "C":
            shipHits.compShips.carrier < 3 ? shipHits.compShips.carrier += 1 : sunkShipObj.comp = havenShipNames.carrier;
            break;
        case "B":
            shipHits.compShips.battleship < 2 ? shipHits.compShips.battleship += 1 : sunkShipObj.comp = havenShipNames.battleship;
            break;
        case "D":
            if (playerCompShipsCoords.compShipCoords.destroyers[0].includes(currentCellCoord)) shipHits.compShips.destroyers[0] < 1 ? shipHits.compShips.destroyers[0] += 1 : sunkShipObj.comp = havenShipNames.destroyers[0];
            else shipHits.compShips.destroyers[1] < 1 ? shipHits.compShips.destroyers[1] += 1 : sunkShipObj.comp = havenShipNames.destroyers[1];
            break;
        case "F":
            if (playerCompShipsCoords.compShipCoords.frigates[0].includes(currentCellCoord)) sunkShipObj.comp = havenShipNames.frigates[0];
            else sunkShipObj.comp = havenShipNames.frigates[1];
            break;
        default:
            break;
    }
    localStorage.setItem("shipHits", JSON.stringify(shipHits));
    return sunkShipObj;
}

},{"./returnPlayerCompShipsCoords":"gvSOo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kPsJ9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "announceGameWinner", ()=>announceGameWinner);
var _elementCreators = require("../functions/elementCreators");
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
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("DEFEAT!"), (0, _elementCreators.addStyleToElem)([
            [
                "font-size",
                "2rem"
            ]
        ]), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("p")([
            "winner-announcement"
        ]));
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("With heavy heart and profound regret, we must report a defeat in battle. Our valiant crew fought with all their strength and skill, but alas, the enemy proved too strong for us. We honor the memory of those who gave their lives in defense of the Kingdom, and we pledge to continue the fight with renewed determination. We shall not rest until victory is ours!"), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("p")([
            "winner-announcement"
        ]));
        // removes event listeners after win
        (0, _preventClicksAfterWin.preventClicksAfterWin)();
    } else {
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`VICTORY!`), (0, _elementCreators.addStyleToElem)([
            [
                "font-size",
                "2rem"
            ]
        ]), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("p")([
            "winner-announcement"
        ]));
        (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)(`The cheers of the crew fill the bridge as the last enemy ship explodes in a ball of fire. You have emerged victorious from the heat of battle, your ships battered but still flying. Your skill and courage in the face of overwhelming odds have saved the lives of your crew and secured another victory for the Star Kingdom of Manticore. As you survey the wreckage of the enemy fleet, you know that your actions will go down in history as a shining example of the indomitable spirit of the Manticoran Navy. 
				
				Congrats ${winner_}! You have destroyed the Haven Fleet!
				`), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("p")([
            "winner-announcement"
        ]));
        (0, _preventClicksAfterWin.preventClicksAfterWin)();
    }
    (0, _elementCreators.pipe)((0, _elementCreators.addTextToElem)("Restart"), (0, _elementCreators.addEvtListener)("click")((0, _restartGame.restartGame)), (0, _elementCreators.appendElemToParent)(winnerContainer))((0, _elementCreators.elemCreator)("button")([
        "bttn-restart"
    ]));
    // prevents computers turn from adding evt listeners back on
    localStorage.setItem("isGameWon", JSON.stringify(true));
};

},{"../functions/elementCreators":"aeBTs","./preventClicksAfterWin":"ciegP","./restartGame":"a1pIK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ciegP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "preventClicksAfterWin", ()=>preventClicksAfterWin);
var _handlePlayerClickOnCompMisses = require("../events/handlePlayerClickOnCompMisses");
var _handlePlayerClickOnCompShips = require("../events/handlePlayerClickOnCompShips");
var _elementCreators = require("../functions/elementCreators");
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

},{"../events/handlePlayerClickOnCompMisses":"2HlWb","../events/handlePlayerClickOnCompShips":"uEG8W","../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a1pIK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "restartGame", ()=>restartGame);
const restartGame = function() {
    localStorage.clear();
    window.scrollTo(0, 0);
    self.location.reload();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6iO9p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "computersTurn", ()=>computersTurn);
var _handlePlayerClickOnCompMisses = require("../events/handlePlayerClickOnCompMisses");
var _handlePlayerClickOnCompShips = require("../events/handlePlayerClickOnCompShips");
var _elementCreators = require("../functions/elementCreators");
var _generateProbabilisticFiringCoord = require("../functions/generateProbabilisticFiringCoord");
var _announceGameWinner = require("./announceGameWinner");
var _computerAttacks = require("./computerAttacks");
const computersTurn = function() {
    // checks if game has been won
    if (!localStorage.getItem("isGameWon")) localStorage.setItem("isGameWon", JSON.stringify(""));
    const isGameWon = JSON.parse(localStorage.getItem("isGameWon") ?? "");
    // this conditional check is to prevent computer from having a turn after player has destroyed all computer ships
    if (!isGameWon) {
        if (!localStorage.getItem("totalHitsOnPlayerShips")) localStorage.setItem("totalHitsOnPlayerShips", JSON.stringify(0));
        const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? JSON.stringify([]));
        // const compAttackGuess = genRandCompAttackGuess();
        const compAttackGuess = (0, _generateProbabilisticFiringCoord.generateProbabilisticFiringCoord)();
        // if compAttackGuess is on a playerShipCoord, then checks the hit counter
        // avoids registering a win when the computer misses
        if (playerShipsCoords.includes(compAttackGuess)) {
            const totalHitsOnPlayerShips = JSON.parse(localStorage.getItem("totalHitsOnPlayerShips") ?? "");
            if (totalHitsOnPlayerShips === 17) // calls game winner function
            (0, _announceGameWinner.announceGameWinner)("comp");
        }
        // if no winner, continues attack
        (0, _computerAttacks.computerAttacks)(compAttackGuess);
        // if game win condition has not been reached, adds the event listeners back on to continue round
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

},{"../events/handlePlayerClickOnCompMisses":"2HlWb","../events/handlePlayerClickOnCompShips":"uEG8W","../functions/elementCreators":"aeBTs","../functions/generateProbabilisticFiringCoord":"itekX","./announceGameWinner":"kPsJ9","./computerAttacks":"hACem","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"itekX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateProbabilisticFiringCoord", ()=>generateProbabilisticFiringCoord);
var _generateFiringSolution = require("./generateFiringSolution");
var _genRandCompAttackGuess = require("./genRandCompAttackGuess");
function generateProbabilisticFiringCoord() {
    const prevCompHitOrMiss = localStorage.getItem("prevCompHitOrMiss");
    const compHitOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compHitOnPlayerCoordsArr") ?? "[]");
    const compHitOnPlayerCoordsSet = new Set(compHitOnPlayerCoordsArr);
    const compMissOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compMissOnPlayerCoordsArr") ?? "[]");
    const compMissOnPlayerCoordsSet = new Set(compMissOnPlayerCoordsArr);
    const prevCompFiringCoords = [
        compHitOnPlayerCoordsArr,
        compMissOnPlayerCoordsArr, 
    ].flat();
    let newFiringCoordinate = "";
    // only runs on first computer turn as prevCompHitOrMiss is undefined
    if (!prevCompHitOrMiss) newFiringCoordinate = (0, _genRandCompAttackGuess.genRandCompAttackGuess)(prevCompFiringCoords);
    else // if there havent been any hits yet, generate a random guess
    if (compHitOnPlayerCoordsArr.length === 0) newFiringCoordinate = (0, _genRandCompAttackGuess.genRandCompAttackGuess)(prevCompFiringCoords);
    else {
        newFiringCoordinate = (0, _generateFiringSolution.generateFiringSolution)({
            compHitOnPlayerCoordsSet,
            compMissOnPlayerCoordsSet
        });
        newFiringCoordinate = newFiringCoordinate === "" ? (0, _genRandCompAttackGuess.genRandCompAttackGuess)(prevCompFiringCoords) : newFiringCoordinate;
    }
    return newFiringCoordinate;
}

},{"./generateFiringSolution":"1Zq0M","./genRandCompAttackGuess":"cqQtw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Zq0M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateFiringSolution", ()=>generateFiringSolution);
var _generateAdjacentCoordsArr = require("./generateAdjacentCoordsArr");
function generateFiringSolution({ compHitOnPlayerCoordsSet , compMissOnPlayerCoordsSet  }) {
    // generate a cloud of all adjacent coords of all previous hits
    // each of these adjacent coords that have not been previously fired upon will be used to generate ranked tuples
    const uniqueAdjacentCoords = Array.from(compHitOnPlayerCoordsSet).flatMap((coord)=>(0, _generateAdjacentCoordsArr.generateAdjacentCoordsArr)(coord)).filter((coord)=>!compMissOnPlayerCoordsSet.has(coord) && !compHitOnPlayerCoordsSet.has(coord));
    // if there are no unique adjacent coords, meaning all surrounding coords
    // have been hit, return an empty string so that the caller can call the
    // random coord guess function
    if (uniqueAdjacentCoords.length === 0) return "";
    // create ranked tuples of the adjacent coords
    const adjCoordsRankedTuples = uniqueAdjacentCoords.reduce((rankedTuples, uniqueAdjCoord)=>{
        // for each of the unique adjacent coords, we generate another cloud of
        // adjacent coords but this time with a radius of 2 and we count the
        // number of times these new coords intersect with previous hits
        // this approach favours coords that are on the same axes as prev hits
        // and can more reliably hit the adjacent coord in the same axis rather
        // than hunting in another axis
        const newAdjCoords = (0, _generateAdjacentCoordsArr.generateAdjacentCoordsArr)(uniqueAdjCoord, 2);
        const coordScore = newAdjCoords.reduce((score, newAdjCoord)=>{
            if (compHitOnPlayerCoordsSet.has(newAdjCoord)) score += 1;
            return score;
        }, 0);
        rankedTuples.push([
            uniqueAdjCoord,
            coordScore
        ]);
        return rankedTuples;
    }, []);
    const sortedAdjCoordsRankedTuples = adjCoordsRankedTuples.sort((a, b)=>b[1] - a[1]);
    return sortedAdjCoordsRankedTuples[0][0];
}

},{"./generateAdjacentCoordsArr":"juaMP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"juaMP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateAdjacentCoordsArr", ()=>generateAdjacentCoordsArr);
function generateAdjacentCoordsArr(coord, length = 1) {
    const xyCoords = coord.split(",");
    const xCoord = parseInt(xyCoords[0].replace('"', ""));
    const yCoord = parseInt(xyCoords[1].replace('"', ""));
    // generate adjacent coords of specified length based on coord location
    const adjacentCoords = [];
    for(let i = 1; i <= length; i += 1){
        // top
        const topCoord = `${xCoord},${yCoord - i}`;
        if (yCoord - i >= 0) adjacentCoords.push(topCoord);
        // right
        const rightCoord = `${xCoord + i},${yCoord}`;
        if (xCoord + i <= 9) adjacentCoords.push(rightCoord);
        // bottom
        const bottomCoord = `${xCoord},${yCoord + i}`;
        if (yCoord + i <= 9) adjacentCoords.push(bottomCoord);
        // left
        const leftCoord = `${xCoord - i},${yCoord}`;
        if (xCoord - i >= 0) adjacentCoords.push(leftCoord);
    }
    return adjacentCoords;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cqQtw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "genRandCompAttackGuess", ()=>genRandCompAttackGuess);
const genRandCompAttackGuess = function(prevCompFiringCoords) {
    let compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(Math.random() * 10)}`;
    // checks if guess is in previous guesses, if so runs the random function again
    // avoids guessing the same co-ordinates
    let isUniqueCoordinate = false;
    while(!isUniqueCoordinate)if (prevCompFiringCoords.includes(compAttackGuess)) {
        //if the guessed co-ordinate has already been tried
        isUniqueCoordinate = false;
        compAttackGuess = `${Math.floor(Math.random() * 10)},${Math.floor(Math.random() * 10)}`;
    } else isUniqueCoordinate = true;
    return compAttackGuess;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hACem":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "computerAttacks", ()=>computerAttacks);
var _elementCreators = require("../functions/elementCreators");
var _returnSunkShipObj = require("../functions/returnSunkShipObj");
var _storeCompHitMissCoords = require("../functions/storeCompHitMissCoords");
var _updatePlayerTacticalOverviewCells = require("../functions/updatePlayerTacticalOverviewCells");
var _renderBattleMessage = require("./renderBattleMessage");
const computerAttacks = function(compAttackGuess_) {
    const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "[]");
    let totalHitsOnPlayerShips = JSON.parse(localStorage.getItem("totalHitsOnPlayerShips") ?? "0");
    // compAttackGuess_ is assumed to be unique at this point
    // checks if playerShip is present
    if (playerShipsCoords.includes(compAttackGuess_)) {
        const playerShipCell = document.querySelector(`[data-cellplayer="${compAttackGuess_}"]`);
        const currentCellCoord = compAttackGuess_;
        const currentShipSymbol = playerShipCell?.textContent ?? "";
        const towardsCombatant = "player";
        const hitOrMiss = "hit";
        // update tactical overview ship cells to visually indicate hit
        (0, _updatePlayerTacticalOverviewCells.updatePlayerTacticalOverviewCells)(currentCellCoord);
        // stores hits on corresponding ships to determine if a ship has been sunk
        const sunkShipObj = (0, _returnSunkShipObj.returnSunkShipObj)(currentCellCoord, currentShipSymbol, towardsCombatant);
        const sunkShipName = sunkShipObj.player === null ? sunkShipObj.comp : sunkShipObj.player;
        // calls function to display battle message when computer registers a hit on a player ship
        (0, _renderBattleMessage.renderBattleMessageElem)({
            currentCellCoord,
            currentShipSymbol,
            towardsCombatant,
            hitOrMiss,
            sunkShipName
        });
        // updates playercell to visually indicate hit
        if (playerShipCell) {
            playerShipCell.textContent = "";
            playerShipCell.textContent = "\uD83D\uDCA5";
        }
        // updates hit counter and store
        totalHitsOnPlayerShips = totalHitsOnPlayerShips + 1;
        localStorage.setItem("totalHitsOnPlayerShips", JSON.stringify(totalHitsOnPlayerShips));
        // stores the current hit co-ordinates and hit type to assist comp firing solution
        (0, _storeCompHitMissCoords.storeCompHitMissCoords)(compAttackGuess_, "hit");
    } else {
        //if its a miss
        const playerShipCell = document.querySelector(`[data-cellplayer="${compAttackGuess_}"]`);
        // assigns '✖' to currently missed co-ordinate and colors it  amber
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
        // initializes storage for previously missed co-ordinates
        if (!localStorage.getItem("prevCompMissOnPlayerCoord")) localStorage.setItem("prevCompMissOnPlayerCoord", JSON.stringify(""));
        // grabs the previous miss co-ordinates in order to turn them back into gray
        const prevCompMissOnPlayerCoord = JSON.parse(localStorage.getItem("prevCompMissOnPlayerCoord") ?? "");
        const prevCompMissOnPlayerCell = document.querySelector(`[data-cellplayer="${prevCompMissOnPlayerCoord}"]`);
        (0, _elementCreators.pipe)((0, _elementCreators.addStyleToElem)([
            [
                "color",
                "gainsboro"
            ]
        ]))(prevCompMissOnPlayerCell);
        //store the current miss co-ordinates and hit type to assist comp firing solution
        (0, _storeCompHitMissCoords.storeCompHitMissCoords)(compAttackGuess_, "miss");
    }
};

},{"../functions/elementCreators":"aeBTs","../functions/returnSunkShipObj":"kI7rO","../functions/storeCompHitMissCoords":"6cokW","../functions/updatePlayerTacticalOverviewCells":"ltwMd","./renderBattleMessage":"jrIRe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6cokW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "storeCompHitMissCoords", ()=>storeCompHitMissCoords);
function storeCompHitMissCoords(compAttackGuess_, hitOrMiss) {
    localStorage.setItem("prevCompHitOrMiss", hitOrMiss);
    switch(hitOrMiss){
        case "hit":
            {
                localStorage.setItem("prevCompHitOnPlayerCoord", JSON.stringify(compAttackGuess_));
                const compHitOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compHitOnPlayerCoordsArr") ?? JSON.stringify([]));
                // adds current hit to array
                compHitOnPlayerCoordsArr.push(compAttackGuess_);
                // updates store
                localStorage.setItem("compHitOnPlayerCoordsArr", JSON.stringify(compHitOnPlayerCoordsArr));
                break;
            }
        case "miss":
            {
                localStorage.setItem("prevCompMissOnPlayerCoord", JSON.stringify(compAttackGuess_));
                const compMissOnPlayerCoordsArr = JSON.parse(localStorage.getItem("compMissOnPlayerCoordsArr") ?? JSON.stringify([]));
                // adds current miss to array
                compMissOnPlayerCoordsArr.push(compAttackGuess_);
                // updates store
                localStorage.setItem("compMissOnPlayerCoordsArr", JSON.stringify(compMissOnPlayerCoordsArr));
                break;
            }
        default:
            break;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ltwMd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updatePlayerTacticalOverviewCells", ()=>updatePlayerTacticalOverviewCells);
function updatePlayerTacticalOverviewCells(currentCellCoord) {
    const cellToUpdate = document.querySelector(`[data-playership="${currentCellCoord}"]`);
    if (cellToUpdate) {
        cellToUpdate.textContent = "";
        cellToUpdate.textContent = "\uD83D\uDCA5";
        cellToUpdate.style.color = "#f0a400";
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jrIRe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderBattleMessageElem", ()=>renderBattleMessageElem);
var _elementCreators = require("../functions/elementCreators");
var _renderBattleMessageHelper = require("../functions/renderBattleMessageHelper");
const renderBattleMessageElem = async function({ currentCellCoord , currentShipSymbol , towardsCombatant , hitOrMiss , sunkShipName  }) {
    const manticoreShipNames = JSON.parse(localStorage.getItem("manticoreShipNames") ?? "");
    const battleMessageContainer = document.querySelector(".battleMessage-container");
    const battleMessageElem = (0, _elementCreators.elemCreator)("p")([
        "battleMessageElem"
    ]);
    (0, _elementCreators.appendElemToParent)(battleMessageContainer)(battleMessageElem);
    if (towardsCombatant === "comp") {
        // checks what compShip currentCellCoord is part of, as the compGridCells do not pass in a string textContent to differentiate between the ship types unlike the playerGridCells
        const compSuperdreadnought = Object.values(JSON.parse(localStorage.getItem("compSuperdreadnought") ?? JSON.stringify([])));
        const compCarrier = Object.values(JSON.parse(localStorage.getItem("compCarrier") ?? JSON.stringify([])));
        const compBattleship = Object.values(JSON.parse(localStorage.getItem("compBattleship") ?? JSON.stringify([])));
        // destroyers consists of an array of objects
        const compDestroyers = JSON.parse(localStorage.getItem("compDestroyers") ?? JSON.stringify([])).flatMap((destroyer)=>Object.values(destroyer));
        const compFrigates = JSON.parse(localStorage.getItem("compFrigates") ?? JSON.stringify([])).flatMap((frigate)=>Object.values(frigate));
        if (hitOrMiss === "hit") {
            // player attacking computer scores a hit
            if (compSuperdreadnought.includes(currentCellCoord)) // displays hit on superdreadnought with randomized text
            (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                towardsCombatant: "comp",
                firedStatus: "hit",
                shipTypeHit: "superdreadnought"
            });
            else if (compCarrier.includes(currentCellCoord)) // displays hit on carrier with randomized text
            (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                towardsCombatant: "comp",
                firedStatus: "hit",
                shipTypeHit: "carrier"
            });
            else if (compBattleship.includes(currentCellCoord)) // displays hit on battleship with randomized text
            (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                towardsCombatant: "comp",
                firedStatus: "hit",
                shipTypeHit: "battleship"
            });
            else if (compDestroyers.includes(currentCellCoord)) {
                // there are two destroyers to connect names
                const [destroyer1Coords, _] = JSON.parse(localStorage.getItem("compDestroyers") ?? JSON.stringify([])).map((destroyer)=>Object.values(destroyer));
                // displays hit on destroyer with randomized text
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "comp",
                    firedStatus: "hit",
                    shipTypeHit: "destroyer",
                    shipNumber: destroyer1Coords.includes(currentCellCoord) ? 0 : 1
                });
            } else if (compFrigates.includes(currentCellCoord)) {
                // there are two frigates to connect names
                const [frigate1Coords, _] = JSON.parse(localStorage.getItem("compFrigates") ?? JSON.stringify([])).map((frigate)=>Object.values(frigate));
                // displays hit on frigate with randomized text
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "comp",
                    firedStatus: "hit",
                    shipTypeHit: "frigate",
                    shipNumber: frigate1Coords.includes(currentCellCoord) ? 0 : 1
                });
            }
        } else if (hitOrMiss === "miss") // player attacking computer misses
        // displays miss on computer with randomized text
        (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
            towardsCombatant: "comp",
            firedStatus: "miss"
        });
    } else if (towardsCombatant === "player") {
        if (hitOrMiss === "hit") {
            // if computer attacking player registers a hit
            if (currentShipSymbol === "S") {
                // computer hits player's superdreadnought
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "hit",
                    shipTypeHit: "superdreadnought"
                });
                // comp sinks player's superdreadnought
                if (sunkShipName === manticoreShipNames.superdreadnought) // player CIC text that indicates that computer has sunk their superdreadnought
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "sunk",
                    shipTypeHit: "superdreadnought"
                });
            } else if (currentShipSymbol === "C") {
                // computer hits player's carrier
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "hit",
                    shipTypeHit: "carrier"
                });
                // comp sinks player's carrier
                if (sunkShipName === manticoreShipNames.carrier) // player CIC text that indicates that computer has sunk their carrier
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "sunk",
                    shipTypeHit: "carrier"
                });
            } else if (currentShipSymbol === "B") {
                // computer hits player's battleship
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "hit",
                    shipTypeHit: "battleship"
                });
                // comp sinks player's battleship
                if (sunkShipName === manticoreShipNames.battleship) // player CIC text that indicates that computer has sunk their battleship
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "sunk",
                    shipTypeHit: "battleship"
                });
            } else if (currentShipSymbol === "D") {
                // there are two destroyers to connect names
                const [destroyer1Coords, _] = JSON.parse(localStorage.getItem("destroyer") ?? JSON.stringify([])).map((destroyer)=>Object.values(destroyer));
                // computer hits player's destroyer
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "hit",
                    shipTypeHit: "destroyer",
                    shipNumber: destroyer1Coords.includes(currentCellCoord) ? 0 : 1
                });
                // comp sinks player's destroyer
                if (sunkShipName === manticoreShipNames.destroyers[0] || sunkShipName === manticoreShipNames.destroyers[1]) // player CIC text that indicates that computer has sunk their destroyer
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "sunk",
                    shipTypeHit: "destroyer",
                    shipNumber: destroyer1Coords[0].includes(currentCellCoord) ? 0 : 1
                });
            } else if (currentShipSymbol === "F") {
                // there are two frigates to connect names
                const [frigate1Coords, _] = JSON.parse(localStorage.getItem("frigate") ?? JSON.stringify([])).map((frigate)=>Object.values(frigate));
                // computer hits player's frigate
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "hit",
                    shipTypeHit: "frigate",
                    shipNumber: frigate1Coords.includes(currentCellCoord) ? 0 : 1
                });
                // comp sinks player's frigate
                if (sunkShipName === manticoreShipNames.frigates[0] || sunkShipName === manticoreShipNames.frigates[1]) // player CIC text that indicates that computer has sunk their frigate
                (0, _renderBattleMessageHelper.renderBattleMessageHelper)({
                    towardsCombatant: "player",
                    firedStatus: "sunk",
                    shipTypeHit: "frigate",
                    shipNumber: frigate1Coords[0].includes(currentCellCoord) ? 0 : 1
                });
            }
        }
    }
    //auto-scrolls to the bottom to have the most recent message visible
    const scrollHeight = battleMessageContainer?.scrollHeight ?? 0;
    battleMessageContainer?.scroll({
        top: scrollHeight,
        left: 0,
        behavior: "smooth"
    });
};

},{"../functions/elementCreators":"aeBTs","../functions/renderBattleMessageHelper":"jDEhZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jDEhZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderBattleMessageHelper", ()=>renderBattleMessageHelper);
var _battleTexts = require("../data/battleTexts");
var _createTypewriterEffect = require("./createTypewriterEffect");
var _elementCreators = require("./elementCreators");
var _tossCoin = require("./tossCoin");
async function renderBattleMessageHelper({ towardsCombatant , firedStatus , shipTypeHit , shipNumber  }) {
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
    const battleMessageContainer = document.querySelector(".battleMessage-container");
    const battleMessageElem = (0, _elementCreators.elemCreator)("p")([
        "battleMessageElem"
    ]);
    (0, _elementCreators.appendElemToParent)(battleMessageContainer)(battleMessageElem);
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
    const formattedTime = formatter.format(today);
    let shipName = "";
    if (towardsCombatant === "comp") {
        if (shipTypeHit) switch(shipTypeHit){
            case "superdreadnought":
                shipName = havenShipNames.superdreadnought;
                break;
            case "carrier":
                shipName = havenShipNames.carrier;
                break;
            case "battleship":
                shipName = havenShipNames.battleship;
                break;
            case "destroyer":
                if (shipNumber !== undefined) shipName = havenShipNames.destroyers[shipNumber];
                break;
            case "frigate":
                if (shipNumber !== undefined) shipName = havenShipNames.frigates[shipNumber];
                break;
            default:
                break;
        }
    } else if (towardsCombatant === "player") {
        if (shipTypeHit) switch(shipTypeHit){
            case "superdreadnought":
                shipName = manticoreShipNames.superdreadnought;
                break;
            case "carrier":
                shipName = manticoreShipNames.carrier;
                break;
            case "battleship":
                shipName = manticoreShipNames.battleship;
                break;
            case "destroyer":
                if (shipNumber !== undefined) shipName = manticoreShipNames.destroyers[shipNumber];
                break;
            case "frigate":
                if (shipNumber !== undefined) shipName = manticoreShipNames.frigates[shipNumber];
                break;
            default:
                break;
        }
    }
    if (towardsCombatant === "comp") {
        const statusText = firedStatus === "hit" ? (0, _battleTexts.battleTexts).hitsOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).hitsOnShip.length)] : firedStatus === "miss" ? (0, _battleTexts.battleTexts).missesOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).missesOnShip.length)] : firedStatus === "sunk" ? (0, _battleTexts.battleTexts).compShipDestroyed[Math.floor(Math.random() * (0, _battleTexts.battleTexts).compShipDestroyed.length)] : "";
        // if ship was hit or sunk
        if (shipTypeHit) {
            const battleMessageStrings = [
                `${formattedTime}:: ${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the PNS ${shipName}! ${statusText}`, 
            ];
            (0, _createTypewriterEffect.createTypewriterEffect)({
                containerElem: battleMessageContainer,
                strings: battleMessageStrings,
                speed: 25
            });
        } else {
            const battleMessageStrings = [
                `${formattedTime}::	${statusText}`
            ];
            (0, _createTypewriterEffect.createTypewriterEffect)({
                containerElem: battleMessageContainer,
                strings: battleMessageStrings,
                speed: 25
            });
        }
    } else if (towardsCombatant === "player") {
        // if a miss towards player dont display a message
        if (!shipTypeHit) return;
        // only add text if ship was hit or sunk
        const statusText = firedStatus === "hit" ? (0, _battleTexts.battleTexts).damageOnShip[Math.floor(Math.random() * (0, _battleTexts.battleTexts).damageOnShip.length)] : firedStatus === "sunk" ? (0, _battleTexts.battleTexts).playerShipDestroyed[Math.floor(Math.random() * (0, _battleTexts.battleTexts).playerShipDestroyed.length)] : "";
        if (firedStatus === "hit") {
            const battleMessageStrings = [
                `${formattedTime}::	${(0, _tossCoin.tossCoin)() ? `Admiral ${playerName}!` : ""} ${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! ${statusText}`, 
            ];
            (0, _createTypewriterEffect.createTypewriterEffect)({
                containerElem: battleMessageContainer,
                strings: battleMessageStrings,
                speed: 25
            });
        } else if (firedStatus === "sunk") {
            const battleMessageStrings = [
                `${formattedTime}::	${hitsPrecursorString()} the ${shipTypeHit} RMNS ${shipName}! Admiral ${playerName}! Core breach detected!
				...
				Sir, she's gone... Dear God, all those people... `, 
            ];
            (0, _createTypewriterEffect.createTypewriterEffect)({
                containerElem: battleMessageContainer,
                strings: battleMessageStrings,
                speed: 25
            });
        }
    }
}

},{"../data/battleTexts":"6YoE9","./createTypewriterEffect":"9yJB4","./elementCreators":"aeBTs","./tossCoin":"amf2O","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6YoE9":[function(require,module,exports) {
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
        "Formation Reno, Com\u2014get those carriers in tighter!",
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
        "They've lost Damage Control Three, Sir!",
        "Missile One is down, Sir! They're down to one tube.",
        "Spinal Four gone, Sir!",
        "They've lost the secondary fire control sensors!. Primaries unaffected.",
        "Damage control to the bridge! Corpsman to the bridge!",
        "Fusion One, Sir! The mag bottle's fluctuating and can't be shut down from here\u2014something's cut the circuits!",
        "Sir, They're down to twelve birds for Missile Two, and out of laser heads.",
        "Heavy damage aft! No contact at all with Two-Four or Two-Six.",
        "Sir, They've lost a beta node; their acceleration is dropping.",
        "Theye've lost another beta node, Sir",
        "Point defense is hurt bad, Sir! They've lost four laser clusters and half their phased radar array.",
        "They've lost an energy torpedo and Number Two Laser out of the starboard broadside, but at least the starboard sidewall is still up.",
        "Tractor Seven is gone!",
        "Compartments Eight-Niner-Two and Niner-Three open to space. No casualties!",
        "Two hits forward! Laser Three and Five destroyed. Radar Five is gone, Sir! Heavy casualties in Laser Three!",
        "Missile Two-One and Graser One gone! Heavy damage in the boat bay and Berthing Compartment Seven-five!",
        "They've taken a hit, but we won't let that break our resolve! Medical teams to the casualties, and everyone else stay focused!",
        "Port torp tubes are down, Sir! They've lost half of their firepower!",
        "Sir, They've lost the entire port quarter! The starboard sidewall is holding, but not for long!",
        "Their starboard broadside is crippled, Sir! They've lost four laser clusters and our neutron cannon!",
        "They've lost Graser Three and Four, Sir! They're down to just two guns!",
        "The port wedge generator's gone, Sir! They're losing acceleration!",
        "Sir, They've lost two-thirds of our point defense capability! The enemy missiles are getting through!",
        "They've lost the aft fusion bottle, Sir! They're down to just one engine!",
        "Sir, They've lost our forward array! They can't get a clear reading on the enemy!",
        "They've lost their main battery, Sir! The enemy ship is still coming!",
        "They've lost three out of four grav plates, Sir! They're adrift!",
        "Sir, They've lost all communication with the forward compartments! They don't know what's happening up there!",
        "The port missile tube's destroyed, Sir! They're down to just one tube and no spares!",
        "The enemy's hit them with a grav lance, Sir! The hull's buckling!",
        "They've lost the port-side maneuvering thrusters, Sir! They can't dodge their fire!",
        "Sir, They've lost the entire bridge! They're blind and drifting!",
        "They've lost our aft impellers! They're drifting into enemy fire!",
        "Port engines destroyed! They can't maintain acceleration!",
        "Enemy has taken out their point defense! They're defenseless!",
        "Fusion reactor's gone critical!",
        "They've lost our port sidewall! They're tearing them apart!",
        "They maneuvering thrusters are destroyed! They can't dodge their fire!",
        "They've lost their forward impellers! They're drifting into enemy fire!",
        "Direct hit on their main battery! They're powerless!",
        "They've hit the bridge! They're going down!",
        "Missiles incoming! Brace for impact!",
        "Enemy has taken out their sensors! We can't get a lock on them!",
        "They've lost their main engines! They're dead in the water!",
        "Enemy has breached their hull! They're venting atmosphere!",
        "Their missile tubes are destroyed! They're helpless!",
        "They've lost their port battery! They can't return fire!", 
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
        "General signal to all heavy carriers. Return to formation at once. Repeat, return to formation at once!",
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"amf2O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tossCoin", ()=>tossCoin);
function tossCoin() {
    return Math.random() > 0.5;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4ghRE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "placeCompShipsOnBoard", ()=>placeCompShipsOnBoard);
var _populateCompShipsCoords = require("../functions/populateCompShipsCoords");
var _renderCompShipsOnBoard = require("./renderCompShipsOnBoard");
const placeCompShipsOnBoard = function() {
    const randCompShipPlacement = (0, _populateCompShipsCoords.populateCompShipsCoords)();
    (0, _renderCompShipsOnBoard.renderCompShipsOnBoard)(randCompShipPlacement);
};

},{"../functions/populateCompShipsCoords":"5xy84","./renderCompShipsOnBoard":"1kKMD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5xy84":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "populateCompShipsCoords", ()=>populateCompShipsCoords);
var _returnRandomOrientation = require("./returnRandomOrientation");
// returns an object with the computer's ships' randomly generated coordinates
function populateCompShipsCoords() {
    // creates tuples[] of all possible coordinates
    const allCoords = [];
    for(let i2 = 0; i2 < 10; i2 += 1)for(let j = 0; j < 10; j += 1)allCoords.push([
        j,
        i2
    ]);
    const shipsLengthTuple = [
        [
            "superdreadnought",
            5
        ],
        [
            "carrier",
            4
        ],
        [
            "battleship",
            3
        ],
        [
            "destroyer",
            2
        ],
        [
            "destroyer",
            2
        ],
        [
            "frigate",
            1
        ],
        [
            "frigate",
            1
        ], 
    ];
    const shipsPresentCoordsSet = new Set();
    return Object.fromEntries(shipsLengthTuple.reduce((acc, [shipType, shipLength])=>{
        let withinBounds = false;
        let isAnotherShipPresent = true;
        let shipCoordsArr = [];
        // keeps generating random coordinates and orientation until the ship fits within the board and doesn't overlap with another ship
        while(!withinBounds || isAnotherShipPresent){
            shipCoordsArr = [];
            // returns a random coordinate
            const randCoord = function() {
                let randIndex = Math.floor(Math.random() * allCoords.length);
                let randCoordStr = allCoords[randIndex].join(",");
                while(shipsPresentCoordsSet.has(randCoordStr)){
                    randIndex = Math.floor(Math.random() * allCoords.length);
                    randCoordStr = allCoords[randIndex].join(",");
                }
                return allCoords[randIndex];
            }();
            // returns a random orientation
            const randOrientation = (0, _returnRandomOrientation.returnRandomOrientation)();
            switch(randOrientation){
                case "horizontal":
                    // generates the ship's coordinates of corresponding length based on the random coordinate and orientation
                    for(let i = 0; i < shipLength; i += 1)shipCoordsArr.push([
                        randCoord[0] + i,
                        randCoord[1]
                    ]);
                    // checks if the ship fits within the board
                    withinBounds = shipCoordsArr.every(([x, y])=>x >= 0 && x < 10 && y >= 0 && y < 10);
                    // checks if the ship overlaps with another ship
                    isAnotherShipPresent = shipCoordsArr.some((coord)=>shipsPresentCoordsSet.has(coord.join(",")));
                    break;
                // same as above but for vertical orientation
                case "vertical":
                    for(let i1 = 0; i1 < shipLength; i1 += 1)shipCoordsArr.push([
                        randCoord[0],
                        randCoord[1] + i1
                    ]);
                    withinBounds = shipCoordsArr.every(([x, y])=>x >= 0 && x < 10 && y >= 0 && y < 10);
                    isAnotherShipPresent = shipCoordsArr.some((coord)=>shipsPresentCoordsSet.has(coord.join(",")));
                    break;
                default:
                    break;
            }
        }
        // adds the ship's coords to the shipsPresentCoords
        shipCoordsArr.forEach((coord)=>shipsPresentCoordsSet.add(coord.join(",")));
        let shipTypeCoordsObj;
        // creates a Map object with the ship's type as the key and an object with the ship's coordinates as the value
        // superdreadnought, carrier, and battleship are treated separately because they consist of a single object
        if (shipType === "superdreadnought" || shipType === "carrier" || shipType === "battleship") {
            // creates a Map object with the ship's type as the key and an object with the ship's coordinates as the value
            shipTypeCoordsObj = new Map([
                [
                    "head",
                    shipCoordsArr[0].toString()
                ],
                [
                    "tail",
                    shipCoordsArr[shipCoordsArr.length - 1].toString()
                ], 
            ]);
            // adds the ship's body coordinates to the Map object
            for(let i = 1; i < shipCoordsArr.length - 1; i += 1)shipTypeCoordsObj.set(`${shipType === "battleship" ? `body` : `body${i}`}`, shipCoordsArr[i].toString());
            acc.set(shipType, Object.fromEntries(shipTypeCoordsObj));
        } else if (shipType === "destroyer" || shipType === "frigate") switch(shipType){
            case "destroyer":
                {
                    const destroyerCoordObj = {
                        head: shipCoordsArr[0].toString(),
                        tail: shipCoordsArr[shipCoordsArr.length - 1].toString()
                    };
                    const prevDestroyerCoordObjArr = acc.get("destroyers");
                    if (prevDestroyerCoordObjArr) acc.set("destroyers", prevDestroyerCoordObjArr.concat(destroyerCoordObj));
                    else acc.set("destroyers", [
                        destroyerCoordObj
                    ]);
                    break;
                }
            case "frigate":
                {
                    const frigateCoordObj = {
                        body: shipCoordsArr[0].toString()
                    };
                    const prevFrigateCoordObjArr = acc.get("frigates");
                    if (prevFrigateCoordObjArr) acc.set("frigates", prevFrigateCoordObjArr.concat(frigateCoordObj));
                    else acc.set("frigates", [
                        frigateCoordObj
                    ]);
                    break;
                }
            default:
                break;
        }
        return acc;
    }, new Map()));
}

},{"./returnRandomOrientation":"99baI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"99baI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "returnRandomOrientation", ()=>returnRandomOrientation);
function returnRandomOrientation() {
    const randIndex = Math.floor(Math.random() * 2);
    return randIndex === 0 ? "horizontal" : "vertical";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1kKMD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCompShipsOnBoard", ()=>renderCompShipsOnBoard);
var _elementCreators = require("../functions/elementCreators");
const renderCompShipsOnBoard = function(compShipsPlacementChoice_) {
    // used for hit detection
    const compShipsCoords = JSON.parse(localStorage.getItem("compShipsCoords") ?? JSON.stringify([]));
    Object.entries(compShipsPlacementChoice_).forEach(([ship1, shipObj])=>{
        // if the compShips obj does not exist, create it, then store it in camelcase i.e., compCarrier
        if (!localStorage.getItem(`comp${ship1[0].toUpperCase() + ship1.slice(1)}`)) localStorage.setItem(`comp${ship1[0].toUpperCase() + ship1.slice(1)}`, JSON.stringify(shipObj));
        // for superdreadnought, carrier, battleship properties whose attributes do not consist of an array
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
            // store the co-ordinates
            compShipsCoords.push(sectionCoords);
        });
        else // for destroyers and frigates properties whose attributes consist of an array
        shipObj.forEach((ship)=>{
            Object.entries(ship).forEach(([shipSection, sectionCoords])=>{
                // grab the corresponding game board cell
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
                // store the co-ordinates
                compShipsCoords.push(sectionCoords);
            });
        });
    });
    const compGameCells = document.querySelectorAll(".comp-gameCell");
    // differentiates between ships and empty spaces
    compGameCells.forEach((cell)=>{
        if (!cell.classList.contains("compShipPresent")) (0, _elementCreators.pipe)((0, _elementCreators.addAttributeToElem)([
            [
                "class",
                "compShipNotPresent comp-gameCell"
            ]
        ]), (0, _elementCreators.addTextToElem)("\u2734"))(cell);
    });
    // puts the coordinates in storage for future hit detection checks
    localStorage.setItem("compShipsCoords", JSON.stringify(compShipsCoords));
};

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kBXaE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "randomizeAndStoreShipNames", ()=>randomizeAndStoreShipNames);
const randomizeAndStoreShipNames = function(shipNames_) {
    // used to display a persistent (throughout the game round) name, that corresponds to the type of ship, that is displayed when a hit is registered
    if (!localStorage.getItem("playerShipNames")) localStorage.setItem("playerShipNames", JSON.stringify([]));
    // creates a randomized ship name per game session and stores it to be used for the battle messages
    Object.entries(shipNames_).forEach(([polity, shipTypes])=>{
        if (polity === "haven") {
            const havenShipNames = new Map();
            Object.entries(shipTypes).forEach(([shipType, shipNamesArr])=>{
                // need two names for destroyers and frigates
                if (shipType === "destroyers" || shipType === "frigates") {
                    const tempShipNamesArr = [
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)], 
                    ];
                    havenShipNames.set(shipType, tempShipNamesArr);
                } else // only one name for superdreadnought, carrier and battleship
                havenShipNames.set(//changes from plural to singular
                shipType.slice(0, -1), shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]);
            });
            localStorage.setItem("havenShipNames", JSON.stringify(Object.fromEntries(havenShipNames)));
        } else if (polity === "manticore") {
            const manticoreShipNames = new Map();
            Object.entries(shipTypes).forEach(([shipType, shipNamesArr])=>{
                // need two names for destroyers and frigates
                if (shipType === "destroyers" || shipType === "frigates") {
                    const tempShipNamesArr = [
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)],
                        shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)], 
                    ];
                    manticoreShipNames.set(shipType, tempShipNamesArr);
                } else // only one name for superdreadnought, carrier and battleship
                manticoreShipNames.set(shipType.slice(0, -1), shipNamesArr[Math.floor(Math.random() * shipNamesArr.length)]);
            });
            localStorage.setItem("manticoreShipNames", JSON.stringify(Object.fromEntries(manticoreShipNames)));
        }
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"chzyQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "renderCompBoard", ()=>renderCompBoard);
var _elementCreators = require("../functions/elementCreators");
const renderCompBoard = function() {
    const gameBoardContainer = document.querySelector(".gameBoard-container");
    const compBoardWrapper = (0, _elementCreators.elemCreator)("div")([
        "compBoard-wrapper"
    ]);
    (0, _elementCreators.appendElemToParent)(gameBoardContainer)(compBoardWrapper);
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

},{"../functions/elementCreators":"aeBTs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aQTs9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "doesShipPlacementOverlap", ()=>doesShipPlacementOverlap);
const doesShipPlacementOverlap = function(shipLength_, currentAxis_, currentX_, currentY_) {
    // initializes on first call for overlap detection
    if (!localStorage.getItem("playerShipsCoords")) localStorage.setItem("playerShipsCoords", JSON.stringify([]));
    const playerShipsCoords = JSON.parse(localStorage.getItem("playerShipsCoords") ?? "");
    if (currentAxis_ === "Axis-X") {
        for(let i = 0; i < shipLength_; i += 1)// overlap detection
        if (playerShipsCoords.includes(`${Number(currentX_) + i},${currentY_}`)) {
            alert("A ship is already present at these coordinates. Please choose another area.  (\uFF61 \u2022\u0301\uFE3F\u2022\u0300\uFF61 )");
            return true;
        }
    } else if (currentAxis_ === "Axis-Y") {
        for(let i = 0; i < shipLength_; i += 1)if (playerShipsCoords.includes(`${currentX_},${Number(currentY_) + i}`)) {
            alert("A ship is already present at these coordinates. Please choose another area.  (\uFF61 \u2022\u0301\uFE3F\u2022\u0300\uFF61 )");
            return true;
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cdvYs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isCorrectNumberOfShips", ()=>isCorrectNumberOfShips);
const isCorrectNumberOfShips = function(ship_, amount_) {
    // capitalizes first letters
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["17ZdQ","h7u1C"], "h7u1C", "parcelRequired10b")

//# sourceMappingURL=index.b71e74eb.js.map
