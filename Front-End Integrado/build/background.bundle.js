/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "27ae948b9c8e99bd30c3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "background";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(5)(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
var alphaIndex = {};
var numIndex = {};
(function () {
    var i = 0;
    var length = HTML_ALPHA.length;
    while (i < length) {
        var a = HTML_ALPHA[i];
        var c = HTML_CODES[i];
        alphaIndex[a] = String.fromCharCode(c);
        numIndex[c] = a;
        i++;
    }
})();
var Html4Entities = /** @class */ (function () {
    function Html4Entities() {
    }
    Html4Entities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
                var code = entity.charAt(1).toLowerCase() === 'x' ?
                    parseInt(entity.substr(2), 16) :
                    parseInt(entity.substr(1));
                if (!(isNaN(code) || code < -32768 || code > 65535)) {
                    chr = String.fromCharCode(code);
                }
            }
            else {
                chr = alphaIndex[entity];
            }
            return chr || s;
        });
    };
    Html4Entities.decode = function (str) {
        return new Html4Entities().decode(str);
    };
    Html4Entities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var alpha = numIndex[str.charCodeAt(i)];
            result += alpha ? "&" + alpha + ";" : str.charAt(i);
            i++;
        }
        return result;
    };
    Html4Entities.encode = function (str) {
        return new Html4Entities().encode(str);
    };
    Html4Entities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var cc = str.charCodeAt(i);
            var alpha = numIndex[cc];
            if (alpha) {
                result += "&" + alpha + ";";
            }
            else if (cc < 32 || cc > 126) {
                result += "&#" + cc + ";";
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    Html4Entities.encodeNonUTF = function (str) {
        return new Html4Entities().encodeNonUTF(str);
    };
    Html4Entities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    Html4Entities.encodeNonASCII = function (str) {
        return new Html4Entities().encodeNonASCII(str);
    };
    return Html4Entities;
}());
exports.Html4Entities = Html4Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
var alphaIndex = {};
var charIndex = {};
createIndexes(alphaIndex, charIndex);
var Html5Entities = /** @class */ (function () {
    function Html5Entities() {
    }
    Html5Entities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
            var chr;
            if (entity.charAt(0) === "#") {
                var code = entity.charAt(1) === 'x' ?
                    parseInt(entity.substr(2).toLowerCase(), 16) :
                    parseInt(entity.substr(1));
                if (!(isNaN(code) || code < -32768 || code > 65535)) {
                    chr = String.fromCharCode(code);
                }
            }
            else {
                chr = alphaIndex[entity];
            }
            return chr || s;
        });
    };
    Html5Entities.decode = function (str) {
        return new Html5Entities().decode(str);
    };
    Html5Entities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var charInfo = charIndex[str.charCodeAt(i)];
            if (charInfo) {
                var alpha = charInfo[str.charCodeAt(i + 1)];
                if (alpha) {
                    i++;
                }
                else {
                    alpha = charInfo[''];
                }
                if (alpha) {
                    result += "&" + alpha + ";";
                    i++;
                    continue;
                }
            }
            result += str.charAt(i);
            i++;
        }
        return result;
    };
    Html5Entities.encode = function (str) {
        return new Html5Entities().encode(str);
    };
    Html5Entities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            var charInfo = charIndex[c];
            if (charInfo) {
                var alpha = charInfo[str.charCodeAt(i + 1)];
                if (alpha) {
                    i++;
                }
                else {
                    alpha = charInfo[''];
                }
                if (alpha) {
                    result += "&" + alpha + ";";
                    i++;
                    continue;
                }
            }
            if (c < 32 || c > 126) {
                result += '&#' + c + ';';
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    Html5Entities.encodeNonUTF = function (str) {
        return new Html5Entities().encodeNonUTF(str);
    };
    Html5Entities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    Html5Entities.encodeNonASCII = function (str) {
        return new Html5Entities().encodeNonASCII(str);
    };
    return Html5Entities;
}());
exports.Html5Entities = Html5Entities;
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo = void 0;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            addChar && (charInfo[chr2] = alpha);
        }
        else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            addChar && (charInfo[''] = alpha);
        }
    }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xml_entities_1 = __webpack_require__(/*! ./xml-entities */ "./node_modules/html-entities/lib/xml-entities.js");
exports.XmlEntities = xml_entities_1.XmlEntities;
var html4_entities_1 = __webpack_require__(/*! ./html4-entities */ "./node_modules/html-entities/lib/html4-entities.js");
exports.Html4Entities = html4_entities_1.Html4Entities;
var html5_entities_1 = __webpack_require__(/*! ./html5-entities */ "./node_modules/html-entities/lib/html5-entities.js");
exports.Html5Entities = html5_entities_1.Html5Entities;
exports.AllHtmlEntities = html5_entities_1.Html5Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};
var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};
var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};
var XmlEntities = /** @class */ (function () {
    function XmlEntities() {
    }
    XmlEntities.prototype.encode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/[<>"'&]/g, function (s) {
            return CHAR_S_INDEX[s];
        });
    };
    XmlEntities.encode = function (str) {
        return new XmlEntities().encode(str);
    };
    XmlEntities.prototype.decode = function (str) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
            if (s.charAt(1) === '#') {
                var code = s.charAt(2).toLowerCase() === 'x' ?
                    parseInt(s.substr(3), 16) :
                    parseInt(s.substr(2));
                if (isNaN(code) || code < -32768 || code > 65535) {
                    return '';
                }
                return String.fromCharCode(code);
            }
            return ALPHA_INDEX[s] || s;
        });
    };
    XmlEntities.decode = function (str) {
        return new XmlEntities().decode(str);
    };
    XmlEntities.prototype.encodeNonUTF = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLength = str.length;
        var result = '';
        var i = 0;
        while (i < strLength) {
            var c = str.charCodeAt(i);
            var alpha = CHAR_INDEX[c];
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
            if (c < 32 || c > 126) {
                result += '&#' + c + ';';
            }
            else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    };
    XmlEntities.encodeNonUTF = function (str) {
        return new XmlEntities().encodeNonUTF(str);
    };
    XmlEntities.prototype.encodeNonASCII = function (str) {
        if (!str || !str.length) {
            return '';
        }
        var strLenght = str.length;
        var result = '';
        var i = 0;
        while (i < strLenght) {
            var c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            result += '&#' + c + ';';
            i++;
        }
        return result;
    };
    XmlEntities.encodeNonASCII = function (str) {
        return new XmlEntities().encodeNonASCII(str);
    };
    return XmlEntities;
}());
exports.XmlEntities = XmlEntities;


/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    return defaultLogger;
}));


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/sockjs-client/dist/sockjs.js":
/*!***************************************************!*\
  !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.4.0 | http://sockjs.org | MIT license */
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

var transportList = require('./transport-list');

module.exports = require('./main')(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./main":14,"./transport-list":16}],2:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

inherits(CloseEvent, Event);

module.exports = CloseEvent;

},{"./event":4,"inherits":57}],3:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventTarget = require('./eventtarget')
  ;

function EventEmitter() {
  EventTarget.call(this);
}

inherits(EventEmitter, EventTarget);

EventEmitter.prototype.removeAllListeners = function(type) {
  if (type) {
    delete this._listeners[type];
  } else {
    this._listeners = {};
  }
};

EventEmitter.prototype.once = function(type, listener) {
  var self = this
    , fired = false;

  function g() {
    self.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  this.on(type, g);
};

EventEmitter.prototype.emit = function() {
  var type = arguments[0];
  var listeners = this._listeners[type];
  if (!listeners) {
    return;
  }
  // equivalent of Array.prototype.slice.call(arguments, 1);
  var l = arguments.length;
  var args = new Array(l - 1);
  for (var ai = 1; ai < l; ai++) {
    args[ai - 1] = arguments[ai];
  }
  for (var i = 0; i < listeners.length; i++) {
    listeners[i].apply(this, args);
  }
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

module.exports.EventEmitter = EventEmitter;

},{"./eventtarget":5,"inherits":57}],4:[function(require,module,exports){
'use strict';

function Event(eventType) {
  this.type = eventType;
}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = +new Date();
  return this;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET = 2;
Event.BUBBLING_PHASE = 3;

module.exports = Event;

},{}],5:[function(require,module,exports){
'use strict';

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function() {
  var event = arguments[0];
  var t = event.type;
  // equivalent of Array.prototype.slice.call(arguments, 0);
  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = EventTarget;

},{}],6:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;

},{"./event":4,"inherits":57}],7:[function(require,module,exports){
'use strict';

var JSON3 = require('json3')
  , iframeUtils = require('./utils/iframe')
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function(code, reason) {
  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
};
FacadeJS.prototype._transportMessage = function(frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function(data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function() {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;

},{"./utils/iframe":47,"json3":58}],8:[function(require,module,exports){
(function (process){
'use strict';

var urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , JSON3 = require('json3')
  , FacadeJS = require('./facade')
  , InfoIframeReceiver = require('./info-iframe-receiver')
  , iframeUtils = require('./utils/iframe')
  , loc = require('./location')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:iframe-bootstrap');
}

module.exports = function(SockJS, availableTransports) {
  var transportMap = {};
  availableTransports.forEach(function(at) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  });

  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  var parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = loc.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof parentOrigin === 'undefined') {
        parentOrigin = e.origin;
      }
      if (e.origin !== parentOrigin) {
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch (iframeMessage.type) {
      case 's':
        var p;
        try {
          p = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          break;
        }
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        debug(version, transport, transUrl, baseUrl);
        // change this to semver logic
        if (version !== SockJS.version) {
          throw new Error('Incompatible SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
          throw new Error('Can\'t connect to different domain from within an ' +
                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(iframeMessage.data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    eventUtils.attachEvent('message', onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};

}).call(this,{ env: {} })

},{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":55,"json3":58}],9:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , objectUtils = require('./utils/object')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-ajax');
}

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = +new Date();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = (+new Date()) - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        } catch (e) {
          debug('bad json', text);
        }
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function() {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;

}).call(this,{ env: {} })

},{"./utils/object":49,"debug":55,"events":3,"inherits":57,"json3":58}],10:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , JSON3 = require('json3')
  , XHRLocalObject = require('./transport/sender/xhr-local')
  , InfoAjax = require('./info-ajax')
  ;

function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);

  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}

inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.transportName = 'iframe-info-receiver';

InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};

module.exports = InfoReceiverIframe;

},{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"inherits":57,"json3":58}],11:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , utils = require('./utils/event')
  , IframeTransport = require('./transport/iframe')
  , InfoReceiverIframe = require('./info-iframe-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-iframe');
}

function InfoIframe(baseUrl, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

    ifr.once('message', function(msg) {
      if (msg) {
        var d;
        try {
          d = JSON3.parse(msg);
        } catch (e) {
          debug('bad json', msg);
          self.emit('finish');
          self.close();
          return;
        }

        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function() {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function() {
  return IframeTransport.enabled();
};

InfoIframe.prototype.close = function() {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":55,"events":3,"inherits":57,"json3":58}],12:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , urlUtils = require('./utils/url')
  , XDR = require('./transport/sender/xdr')
  , XHRCors = require('./transport/sender/xhr-cors')
  , XHRLocal = require('./transport/sender/xhr-local')
  , XHRFake = require('./transport/sender/xhr-fake')
  , InfoIframe = require('./info-iframe')
  , InfoAjax = require('./info-ajax')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-receiver');
}

function InfoReceiver(baseUrl, urlInfo) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.doXhr(baseUrl, urlInfo);
  }, 0);
}

inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
  // determine method of CORS support (if needed)
  if (urlInfo.sameOrigin) {
    return new InfoAjax(url, XHRLocal);
  }
  if (XHRCors.enabled) {
    return new InfoAjax(url, XHRCors);
  }
  if (XDR.enabled && urlInfo.sameScheme) {
    return new InfoAjax(url, XDR);
  }
  if (InfoIframe.enabled()) {
    return new InfoIframe(baseUrl, url);
  }
  return new InfoAjax(url, XHRFake);
};

InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
  var self = this
    , url = urlUtils.addPath(baseUrl, '/info')
    ;
  debug('doXhr', url);

  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;

}).call(this,{ env: {} })

},{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":55,"events":3,"inherits":57}],13:[function(require,module,exports){
(function (global){
'use strict';

module.exports = global.location || {
  origin: 'http://localhost:80'
, protocol: 'http:'
, host: 'localhost'
, port: 80
, href: 'http://localhost/'
, hash: ''
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
(function (process,global){
'use strict';

require('./shims');

var URL = require('url-parse')
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , random = require('./utils/random')
  , escape = require('./utils/escape')
  , urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , transport = require('./utils/transport')
  , objectUtils = require('./utils/object')
  , browser = require('./utils/browser')
  , log = require('./utils/log')
  , Event = require('./event/event')
  , EventTarget = require('./event/eventtarget')
  , loc = require('./location')
  , CloseEvent = require('./event/close')
  , TransportMessageEvent = require('./event/trans-message')
  , InfoReceiver = require('./info-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:main');
}

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, options) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols, options);
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  options = options || {};
  if (options.protocols_whitelist) {
    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
  }
  this._transportsWhitelist = options.transports;
  this._transportOptions = options.transportOptions || {};
  this._timeout = options.timeout || 0;

  var sessionId = options.sessionId || 8;
  if (typeof sessionId === 'function') {
    this._generateSessionId = sessionId;
  } else if (typeof sessionId === 'number') {
    this._generateSessionId = function() {
      return random.string(sessionId);
    };
  } else {
    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
  }

  this._server = options.server || random.numberString(1000);

  // Step 1 of WS spec - parse and validate the url. Issue #8
  var parsedUrl = new URL(url);
  if (!parsedUrl.host || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https:' && !secure) {
    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (!protocols) {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  sortedProtocols.forEach(function(proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  var o = urlUtils.getOrigin(loc.href);
  this._origin = o ? o.toLowerCase() : null;

  // remove the trailing slash
  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

  // store the sanitized url
  this.url = parsedUrl.href;
  debug('using url', this.url);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._urlInfo = {
    nullOrigin: !browser.hasDomain()
  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
  };

  this._ir = new InfoReceiver(this.url, this._urlInfo);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && !userSetCode(code)) {
    throw new Error('InvalidAccessError: Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  // #13 - convert anything non-string to string
  // TODO this currently turns objects into [object Object]
  if (typeof data !== 'string') {
    data = '' + data;
  }
  if (this.readyState === SockJS.CONNECTING) {
    throw new Error('InvalidStateError: The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.version = require('./version');

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  debug('_receiveInfo', rtt);
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info = objectUtils.extend(info, this._urlInfo);
  debug('info', info);
  // determine list of desired and supported transports
  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
  this._transports = enabledTransports.main;
  debug(this._transports.length + ' enabled transports');

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    debug('attempt', Transport.transportName);
    if (Transport.needBody) {
      if (!global.document.body ||
          (typeof global.document.readyState !== 'undefined' &&
            global.document.readyState !== 'complete' &&
            global.document.readyState !== 'interactive')) {
        debug('waiting for body');
        this._transports.unshift(Transport);
        eventUtils.attachEvent('load', this._connect.bind(this));
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    var options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    var transportObj = new Transport(transportUrl, this._transUrl, options);
    transportObj.on('message', this._transportMessage.bind(this));
    transportObj.once('close', this._transportClose.bind(this));
    transportObj.transportName = Transport.transportName;
    this._transport = transportObj;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  debug('_transportTimeout');
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transport) {
      this._transport.close();
    }

    this._transportClose(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  debug('_transportMessage', msg);
  var self = this
    , type = msg.slice(0, 1)
    , content = msg.slice(1)
    , payload
    ;

  // first check for messages that don't need a payload
  switch (type) {
    case 'o':
      this._open();
      return;
    case 'h':
      this.dispatchEvent(new Event('heartbeat'));
      debug('heartbeat', this.transport);
      return;
  }

  if (content) {
    try {
      payload = JSON3.parse(content);
    } catch (e) {
      debug('bad json', content);
    }
  }

  if (typeof payload === 'undefined') {
    debug('empty payload', content);
    return;
  }

  switch (type) {
    case 'a':
      if (Array.isArray(payload)) {
        payload.forEach(function(p) {
          debug('message', self.transport, p);
          self.dispatchEvent(new TransportMessageEvent(p));
        });
      }
      break;
    case 'm':
      debug('message', this.transport, payload);
      this.dispatchEvent(new TransportMessageEvent(payload));
      break;
    case 'c':
      if (Array.isArray(payload) && payload.length === 2) {
        this._close(payload[0], payload[1], true);
      }
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  debug('_transportClose', this.transport, code, reason);
  if (this._transport) {
    this._transport.removeAllListeners();
    this._transport = null;
    this.transport = null;
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this._close(code, reason);
};

SockJS.prototype._open = function() {
  debug('_open', this._transport && this._transport.transportName, this.readyState);
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event('open'));
    debug('connected', this.transport);
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._close = function(code, reason, wasClean) {
  debug('_close', this.transport, code, reason, wasClean, this.readyState);
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    this._transport = null;
    this.transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new Error('InvalidStateError: SockJS has already been closed');
  }

  this.readyState = SockJS.CLOSING;
  setTimeout(function() {
    this.readyState = SockJS.CLOSED;

    if (forceFail) {
      this.dispatchEvent(new Event('error'));
    }

    var e = new CloseEvent('close');
    e.wasClean = wasClean || false;
    e.code = code || 1000;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
    debug('disconnected');
  }.bind(this), 0);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function(rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function(availableTransports) {
  transports = transport(availableTransports);
  require('./iframe-bootstrap')(SockJS, availableTransports);
  return SockJS;
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":55,"inherits":57,"json3":58,"url-parse":61}],15:[function(require,module,exports){
/* eslint-disable */
/* jscs: disable */
'use strict';

// pulled specific shims from https://github.com/es-shims/es5-shim

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;

var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(num) {
    var n = +num;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function ToUint32(x) {
    return x >>> 0;
}

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });


var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline  ? 'm' : '') +
                        (separator.extended   ? 'x' : '') + // Proposed for ES6
                        (separator.sticky     ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);

},{}],16:[function(require,module,exports){
'use strict';

module.exports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xhr-streaming')
, require('./transport/xdr-streaming')
, require('./transport/eventsource')
, require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

  // polling transports
, require('./transport/htmlfile')
, require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
, require('./transport/xhr-polling')
, require('./transport/xdr-polling')
, require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
, require('./transport/jsonp-polling')
];

},{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , utils = require('../../utils/event')
  , urlUtils = require('../../utils/url')
  , XHR = global.XMLHttpRequest
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:browser:xhr');
}

function AbstractXHRObject(method, url, payload, opts) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function () {
    self._start(method, url, payload, opts);
  }, 0);
}

inherits(AbstractXHRObject, EventEmitter);

AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
  var self = this;

  try {
    this.xhr = new XHR();
  } catch (x) {
    // intentionally empty
  }

  if (!this.xhr) {
    debug('no xhr');
    this.emit('finish', 0, 'no xhr support');
    this._cleanup();
    return;
  }

  // several browsers cache POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  // Explorer tends to keep connection open, even after the
  // tab gets closed: http://bugs.jquery.com/ticket/5280
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload cleanup');
    self._cleanup(true);
  });
  try {
    this.xhr.open(method, url, true);
    if (this.timeout && 'timeout' in this.xhr) {
      this.xhr.timeout = this.timeout;
      this.xhr.ontimeout = function() {
        debug('xhr timeout');
        self.emit('finish', 0, '');
        self._cleanup(false);
      };
    }
  } catch (e) {
    debug('exception', e);
    // IE raises an exception on wrong port.
    this.emit('finish', 0, '');
    this._cleanup(false);
    return;
  }

  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
    debug('withCredentials');
    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
    // "This never affects same-site requests."

    this.xhr.withCredentials = true;
  }
  if (opts && opts.headers) {
    for (var key in opts.headers) {
      this.xhr.setRequestHeader(key, opts.headers[key]);
    }
  }

  this.xhr.onreadystatechange = function() {
    if (self.xhr) {
      var x = self.xhr;
      var text, status;
      debug('readyState', x.readyState);
      switch (x.readyState) {
      case 3:
        // IE doesn't like peeking into responseText or status
        // on Microsoft.XMLHTTP and readystate=3
        try {
          status = x.status;
          text = x.responseText;
        } catch (e) {
          // intentionally empty
        }
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        // IE does return readystate == 3 for 404 answers.
        if (status === 200 && text && text.length > 0) {
          debug('chunk');
          self.emit('chunk', status, text);
        }
        break;
      case 4:
        status = x.status;
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }
        // IE returns this for a bad port
        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
        if (status === 12005 || status === 12029) {
          status = 0;
        }

        debug('finish', status, x.responseText);
        self.emit('finish', status, x.responseText);
        self._cleanup(false);
        break;
      }
    }
  };

  try {
    self.xhr.send(payload);
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
};

AbstractXHRObject.prototype._cleanup = function(abort) {
  debug('cleanup');
  if (!this.xhr) {
    return;
  }
  this.removeAllListeners();
  utils.unloadDel(this.unloadRef);

  // IE needs this field to be a function
  this.xhr.onreadystatechange = function() {};
  if (this.xhr.ontimeout) {
    this.xhr.ontimeout = null;
  }

  if (abort) {
    try {
      this.xhr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

AbstractXHRObject.enabled = !!XHR;
// override XMLHttpRequest for IE6/7
// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (!AbstractXHRObject.enabled && (axo in global)) {
  debug('overriding xmlhttprequest');
  XHR = function() {
    try {
      return new global[axo]('Microsoft.XMLHTTP');
    } catch (e) {
      return null;
    }
  };
  AbstractXHRObject.enabled = !!new XHR();
}

var cors = false;
try {
  cors = 'withCredentials' in new XHR();
} catch (ignored) {
  // intentionally empty
}

AbstractXHRObject.supportsCORS = cors;

module.exports = AbstractXHRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],18:[function(require,module,exports){
(function (global){
module.exports = global.EventSource;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(require,module,exports){
(function (global){
'use strict';

var Driver = global.WebSocket || global.MozWebSocket;
if (Driver) {
	module.exports = function WebSocketBrowserDriver(url) {
		return new Driver(url);
	};
} else {
	module.exports = undefined;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , EventSourceReceiver = require('./receiver/eventsource')
  , XHRCorsObject = require('./sender/xhr-cors')
  , EventSourceDriver = require('eventsource')
  ;

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;

},{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18,"inherits":57}],21:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , HtmlfileReceiver = require('./receiver/htmlfile')
  , XHRLocalObject = require('./sender/xhr-local')
  , AjaxBasedTransport = require('./lib/ajax-based')
  ;

function HtmlFileTransport(transUrl) {
  if (!HtmlfileReceiver.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.enabled = function(info) {
  return HtmlfileReceiver.enabled && info.sameOrigin;
};

HtmlFileTransport.transportName = 'htmlfile';
HtmlFileTransport.roundTrips = 2;

module.exports = HtmlFileTransport;

},{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37,"inherits":57}],22:[function(require,module,exports){
(function (process){
'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = require('inherits')
  , JSON3 = require('json3')
  , EventEmitter = require('events').EventEmitter
  , version = require('../version')
  , urlUtils = require('../utils/url')
  , iframeUtils = require('../utils/iframe')
  , eventUtils = require('../utils/event')
  , random = require('../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:transport:iframe');
}

function IframeTransport(transport, transUrl, baseUrl) {
  if (!IframeTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  EventEmitter.call(this);

  var self = this;
  this.origin = urlUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
  debug(transport, transUrl, iframeUrl);

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.close();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {
      // intentionally empty
    }
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }

  var iframeMessage;
  try {
    iframeMessage = JSON3.parse(e.data);
  } catch (ignored) {
    debug('bad json', e.data);
    return;
  }

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  case 'c':
    var cdata;
    try {
      cdata = JSON3.parse(iframeMessage.data);
    } catch (ignored) {
      debug('bad json', iframeMessage.data);
      return;
    }
    this.emit('close', cdata[0], cdata[1]);
    this.close();
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function(message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  return iframeUtils.iframeEnabled;
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":55,"events":3,"inherits":57,"json3":58}],23:[function(require,module,exports){
(function (global){
'use strict';

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var inherits = require('inherits')
  , SenderReceiver = require('./lib/sender-receiver')
  , JsonpReceiver = require('./receiver/jsonp')
  , jsonpSender = require('./sender/jsonp')
  ;

function JsonPTransport(transUrl) {
  if (!JsonPTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
}

inherits(JsonPTransport, SenderReceiver);

JsonPTransport.enabled = function() {
  return !!global.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33,"inherits":57}],24:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , SenderReceiver = require('./sender-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./sender-receiver":28,"debug":55,"inherits":57}],25:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:buffered-sender');
}

function BufferedSender(url, sender) {
  debug(url);
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  debug('send', message);
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  debug('sendScheduleWait');
  var self = this;
  var tref;
  this.sendStop = function() {
    debug('sendStop');
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    debug('timeout');
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  debug('sendSchedule', this.sendBuffer.length);
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        debug('error', err);
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self.close();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

BufferedSender.prototype.close = function() {
  debug('close');
  this._cleanup();
  if (this.sendStop) {
    this.sendStop();
    this.sendStop = null;
  }
};

module.exports = BufferedSender;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],26:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , IframeTransport = require('../iframe')
  , objectUtils = require('../../utils/object')
  ;

module.exports = function(transport) {

  function IframeWrapTransport(transUrl, baseUrl) {
    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
  }

  inherits(IframeWrapTransport, IframeTransport);

  IframeWrapTransport.enabled = function(url, info) {
    if (!global.document) {
      return false;
    }

    var iframeInfo = objectUtils.extend({}, info);
    iframeInfo.sameOrigin = true;
    return transport.enabled(iframeInfo) && IframeTransport.enabled();
  };

  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
  IframeWrapTransport.needBody = true;
  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

  IframeWrapTransport.facadeTransport = transport;

  return IframeWrapTransport;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/object":49,"../iframe":22,"inherits":57}],27:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:polling');
}

function Polling(Receiver, receiveUrl, AjaxObject) {
  debug(receiveUrl);
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  debug('_scheduleReceiver');
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    debug('message', msg);
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    debug('close', code, reason, self.pollIsClosing);
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1006, reason);
        self.removeAllListeners();
      }
    }
  });
};

Polling.prototype.abort = function() {
  debug('abort');
  this.removeAllListeners();
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],28:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./polling')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.emit('close', code, reason);
    self.close();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  BufferedSender.prototype.close.call(this);
  debug('close');
  this.removeAllListeners();
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = SenderReceiver;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":55,"inherits":57}],29:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , EventSourceDriver = require('eventsource')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:eventsource');
}

function EventSourceReceiver(url) {
  debug(url);
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new EventSourceDriver(url);
  es.onmessage = function(e) {
    debug('message', e.data);
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function(e) {
    debug('error', es.readyState, e);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self._close(reason);
  };
}

inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function() {
  debug('cleanup');
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function(reason) {
  debug('close', reason);
  var self = this;
  // Safari and chrome < 15 crash if we close window before
  // waiting for ES cleanup. See:
  // https://code.google.com/p/chromium/issues/detail?id=89155
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"eventsource":18,"inherits":57}],30:[function(require,module,exports){
(function (process,global){
'use strict';

var inherits = require('inherits')
  , iframeUtils = require('../../utils/iframe')
  , urlUtils = require('../../utils/url')
  , EventEmitter = require('events').EventEmitter
  , random = require('../../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:htmlfile');
}

function HtmlfileReceiver(url) {
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function() {
      debug('start');
      self.iframeObj.loaded();
    }
  , message: function(data) {
      debug('message', data);
      self.emit('message', data);
    }
  , stop: function() {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructFunc(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function(reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in global) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}

HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

module.exports = HtmlfileReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],31:[function(require,module,exports){
(function (process,global){
'use strict';

var utils = require('../../utils/iframe')
  , random = require('../../utils/random')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:jsonp');
}

function JsonpReceiver(url) {
  debug(url);
  var self = this;
  EventEmitter.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

  global[utils.WPrefix][this.id] = this._callback.bind(this);
  this._createScript(urlWithId);

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.timeoutId = setTimeout(function() {
    debug('timeout');
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, JsonpReceiver.timeout);
}

inherits(JsonpReceiver, EventEmitter);

JsonpReceiver.prototype.abort = function() {
  debug('abort');
  if (global[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

JsonpReceiver.timeout = 35000;
JsonpReceiver.scriptErrorTimeout = 1000;

JsonpReceiver.prototype._callback = function(data) {
  debug('_callback', data);
  this._cleanup();

  if (this.aborting) {
    return;
  }

  if (data) {
    debug('message', data);
    this.emit('message', data);
  }
  this.emit('close', null, 'network');
  this.removeAllListeners();
};

JsonpReceiver.prototype._abort = function(err) {
  debug('_abort', err);
  this._cleanup();
  this.aborting = true;
  this.emit('close', err.code, err.message);
  this.removeAllListeners();
};

JsonpReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  clearTimeout(this.timeoutId);
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
  delete global[utils.WPrefix][this.id];
};

JsonpReceiver.prototype._scriptError = function() {
  debug('_scriptError');
  var self = this;
  if (this.errorTimer) {
    return;
  }

  this.errorTimer = setTimeout(function() {
    if (!self.loadedOkay) {
      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
    }
  }, JsonpReceiver.scriptErrorTimeout);
};

JsonpReceiver.prototype._createScript = function(url) {
  debug('_createScript', url);
  var self = this;
  var script = this.script = global.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  script.id = 'a' + random.string(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = this._scriptError.bind(this);
  script.onload = function() {
    debug('onload');
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  // IE9 fires 'error' event after onreadystatechange or before, in random order.
  // Use loadedOkay to determine if actually errored
  script.onreadystatechange = function() {
    debug('onreadystatechange', script.readyState);
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        self.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          script.onclick();
        } catch (x) {
          // intentionally empty
        }
      }
      if (script) {
        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };
  // IE: event/htmlFor/onclick trick.
  // One can't rely on proper order for onreadystatechange. In order to
  // make sure, set a 'htmlFor' and 'event' properties, so that
  // script code will be installed as 'onclick' handler for the
  // script object. Later, onreadystatechange, manually execute this
  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
  // set. For reference see:
  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
  // Also, read on that about script ordering:
  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  if (typeof script.async === 'undefined' && global.document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!browser.isOpera()) {
      // Naively assume we're in IE
      try {
        script.htmlFor = script.id;
        script.event = 'onclick';
      } catch (x) {
        // intentionally empty
      }
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = global.document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  var head = global.document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};

module.exports = JsonpReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],32:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:xhr');
}

function XhrReceiver(url, AjaxObject) {
  debug(url);
  EventEmitter.call(this);
  var self = this;

  this.bufferPosition = 0;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.once('finish', function(status, text) {
    debug('finish', status, text);
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    debug('close', reason);
    self.emit('close', null, reason);
    self._cleanup();
  });
}

inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function(status, text) {
  debug('_chunkHandler', status);
  if (status !== 200 || !text) {
    return;
  }

  for (var idx = -1; ; this.bufferPosition += idx + 1) {
    var buf = text.slice(this.bufferPosition);
    idx = buf.indexOf('\n');
    if (idx === -1) {
      break;
    }
    var msg = buf.slice(0, idx);
    if (msg) {
      debug('message', msg);
      this.emit('message', msg);
    }
  }
};

XhrReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  debug('abort');
  if (this.xo) {
    this.xo.close();
    debug('close');
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],33:[function(require,module,exports){
(function (process,global){
'use strict';

var random = require('../../utils/random')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:jsonp');
}

var form, area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return global.document.createElement('<iframe name="' + id + '">');
  } catch (x) {
    var iframe = global.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = global.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = global.document.createElement('textarea');
  area.name = 'd';
  form.appendChild(area);

  global.document.body.appendChild(form);
}

module.exports = function(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

  var iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.appendChild(iframe);

  try {
    area.value = payload;
  } catch (e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function(err) {
    debug('completed', id, err);
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
      debug('cleaning up', id);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(err);
  };
  iframe.onerror = function() {
    debug('onerror', id);
    completed();
  };
  iframe.onload = function() {
    debug('onload', id);
    completed();
  };
  iframe.onreadystatechange = function(e) {
    debug('onreadystatechange', id, iframe.readyState, e);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return function() {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/random":50,"../../utils/url":52,"debug":55}],34:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , eventUtils = require('../../utils/event')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self._start(method, url, payload);
  }, 0);
}

inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  debug('_start');
  var self = this;
  var xdr = new global.XDomainRequest();
  // IE caches even POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  xdr.onerror = function() {
    debug('onerror');
    self._error();
  };
  xdr.ontimeout = function() {
    debug('ontimeout');
    self._error();
  };
  xdr.onprogress = function() {
    debug('progress', xdr.responseText);
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    debug('load');
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = eventUtils.unloadAdd(function() {
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    if (this.timeout) {
      this.xdr.timeout = this.timeout;
    }
    this.xdr.send(payload);
  } catch (x) {
    this._error();
  }
};

XDRObject.prototype._error = function() {
  this.emit('finish', 0, '');
  this._cleanup(false);
};

XDRObject.prototype._cleanup = function(abort) {
  debug('cleanup', abort);
  if (!this.xdr) {
    return;
  }
  this.removeAllListeners();
  eventUtils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

// IE 8/9 if the request target uses the same scheme - #79
XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

module.exports = XDRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],35:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;

},{"../driver/xhr":17,"inherits":57}],36:[function(require,module,exports){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  ;

function XHRFake(/* method, url, payload, opts */) {
  var self = this;
  EventEmitter.call(this);

  this.to = setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, XHRFake.timeout);
}

inherits(XHRFake, EventEmitter);

XHRFake.prototype.close = function() {
  clearTimeout(this.to);
};

XHRFake.timeout = 2000;

module.exports = XHRFake;

},{"events":3,"inherits":57}],37:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;

},{"../driver/xhr":17,"inherits":57}],38:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('../utils/event')
  , urlUtils = require('../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , WebsocketDriver = require('./driver/websocket')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:websocket');
}

function WebSocketTransport(transUrl, ignore, options) {
  if (!WebSocketTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  EventEmitter.call(this);
  debug('constructor', transUrl);

  var self = this;
  var url = urlUtils.addPath(transUrl, '/websocket');
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url, [], options);
  this.ws.onmessage = function(e) {
    debug('message event', e.data);
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload');
    self.ws.close();
  });
  this.ws.onclose = function(e) {
    debug('close event', e.code, e.reason);
    self.emit('close', e.code, e.reason);
    self._cleanup();
  };
  this.ws.onerror = function(e) {
    debug('error event', e);
    self.emit('close', 1006, 'WebSocket connection broken');
    self._cleanup();
  };
}

inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  var msg = '[' + data + ']';
  debug('send', msg);
  this.ws.send(msg);
};

WebSocketTransport.prototype.close = function() {
  debug('close');
  var ws = this.ws;
  this._cleanup();
  if (ws) {
    ws.close();
  }
};

WebSocketTransport.prototype._cleanup = function() {
  debug('_cleanup');
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
  }
  utils.unloadDel(this.unloadRef);
  this.unloadRef = this.ws = null;
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  debug('enabled');
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":55,"events":3,"inherits":57}],39:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XdrStreamingTransport = require('./xdr-streaming')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40,"inherits":57}],40:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(info) {
  if (info.cookie_needed || info.nullOrigin) {
    return false;
  }
  return XDRObject.enabled && info.sameScheme;
};

XdrStreamingTransport.transportName = 'xdr-streaming';
XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"inherits":57}],41:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  ;

function XhrPollingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }

  if (XHRLocalObject.enabled && info.sameOrigin) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],42:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  , browser = require('../utils/browser')
  ;

function XhrStreamingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming #60
  // But it might be able to #92
  if (browser.isOpera()) {
    return false;
  }

  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
XhrStreamingTransport.needBody = !!global.document;

module.exports = XhrStreamingTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],43:[function(require,module,exports){
(function (global){
'use strict';

if (global.crypto && global.crypto.getRandomValues) {
  module.exports.randomBytes = function(length) {
    var bytes = new Uint8Array(length);
    global.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  module.exports.randomBytes = function(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],44:[function(require,module,exports){
(function (global){
'use strict';

module.exports = {
  isOpera: function() {
    return global.navigator &&
      /opera/i.test(global.navigator.userAgent);
  }

, isKonqueror: function() {
    return global.navigator &&
      /konqueror/i.test(global.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!global.document) {
      return true;
    }

    try {
      return !!global.document.domain;
    } catch (e) {
      return false;
    }
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],45:[function(require,module,exports){
'use strict';

var JSON3 = require('json3');

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex
var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
  , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unrollLookup = function(escapable) {
  var i;
  var unrolled = {};
  var c = [];
  for (i = 0; i < 65536; i++) {
    c.push( String.fromCharCode(i) );
  }
  escapable.lastIndex = 0;
  c.join('').replace(escapable, function(a) {
    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
module.exports = {
  quote: function(string) {
    var quoted = JSON3.stringify(string);

    // In most cases this should be very fast and good enough.
    extraEscapable.lastIndex = 0;
    if (!extraEscapable.test(quoted)) {
      return quoted;
    }

    if (!extraLookup) {
      extraLookup = unrollLookup(extraEscapable);
    }

    return quoted.replace(extraEscapable, function(a) {
      return extraLookup[a];
    });
  }
};

},{"json3":58}],46:[function(require,module,exports){
(function (global){
'use strict';

var random = require('./random');

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.addEventListener(event, listener, false);
    } else if (global.document && global.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      global.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      global.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.removeEventListener(event, listener, false);
    } else if (global.document && global.detachEvent) {
      global.document.detachEvent('on' + event, listener);
      global.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./random":50}],47:[function(require,module,exports){
(function (process,global){
'use strict';

var eventUtils = require('./event')
  , JSON3 = require('json3')
  , browser = require('./browser')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:iframe');
}

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(module.exports.WPrefix in global)) {
      global[module.exports.WPrefix] = {};
    }
  }

, postMessage: function(type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(JSON3.stringify({
        windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      debug('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function(iframeUrl, errorCallback) {
    var iframe = global.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      debug('unattach');
      clearTimeout(tref);
      // Explorer had problems with that.
      try {
        iframe.onload = null;
      } catch (x) {
        // intentionally empty
      }
      iframe.onerror = null;
    };
    var cleanup = function() {
      debug('cleanup');
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(err) {
      debug('onerror', err);
      if (iframe) {
        cleanup();
        errorCallback(err);
      }
    };
    var post = function(msg, origin) {
      debug('post', msg, origin);
      setTimeout(function() {
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
          }
        } catch (x) {
          // intentionally empty
        }
      }, 0);
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
      onerror('onerror');
    };
    iframe.onload = function() {
      debug('onload');
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function() {
        onerror('onload timeout');
      }, 2000);
    };
    global.document.body.appendChild(iframe);
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }

/* eslint no-undef: "off", new-cap: "off" */
, createHtmlfile: function(iframeUrl, errorCallback) {
    var axo = ['Active'].concat('Object').join('X');
    var doc = new global[axo]('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
      clearTimeout(tref);
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r) {
      debug('onerror', r);
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + global.document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    iframe.onerror = function() {
      onerror('onerror');
    };
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }
};

module.exports.iframeEnabled = false;
if (global.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
    typeof global.postMessage === 'object') && (!browser.isKonqueror());
}

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./browser":44,"./event":46,"debug":55,"json3":58}],48:[function(require,module,exports){
(function (global){
'use strict';

var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = global.console && global.console[level] && global.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return global.console[level].apply(global.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],49:[function(require,module,exports){
'use strict';

module.exports = {
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

, extend: function(obj) {
    if (!this.isObject(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};

},{}],50:[function(require,module,exports){
'use strict';

/* global crypto:true */
var crypto = require('crypto');

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = crypto.randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};

},{"crypto":43}],51:[function(require,module,exports){
(function (process){
'use strict';

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:transport');
}

module.exports = function(availableTransports) {
  return {
    filterToEnabled: function(transportsWhitelist, info) {
      var transports = {
        main: []
      , facade: []
      };
      if (!transportsWhitelist) {
        transportsWhitelist = [];
      } else if (typeof transportsWhitelist === 'string') {
        transportsWhitelist = [transportsWhitelist];
      }

      availableTransports.forEach(function(trans) {
        if (!trans) {
          return;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          return;
        }

        if (transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1) {
          debug('not in whitelist', trans.transportName);
          return;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      });
      return transports;
    }
  };
};

}).call(this,{ env: {} })

},{"debug":55}],52:[function(require,module,exports){
(function (process){
'use strict';

var URL = require('url-parse');

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:url');
}

module.exports = {
  getOrigin: function(url) {
    if (!url) {
      return null;
    }

    var p = new URL(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isOriginEqual: function(a, b) {
    var res = this.getOrigin(a) === this.getOrigin(b);
    debug('same', a, b, res);
    return res;
  }

, isSchemeEqual: function(a, b) {
    return (a.split(':')[0] === b.split(':')[0]);
  }

, addPath: function (url, path) {
    var qs = url.split('?');
    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
  }

, addQuery: function (url, q) {
    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
  }
};

}).call(this,{ env: {} })

},{"debug":55,"url-parse":61}],53:[function(require,module,exports){
module.exports = '1.4.0';

},{}],54:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],55:[function(require,module,exports){
(function (process){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = require('./common')(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};


}).call(this,{ env: {} })

},{"./common":56}],56:[function(require,module,exports){
"use strict";

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = require('ms');
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;


},{"ms":54}],57:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],58:[function(require,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],59:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

},{}],60:[function(require,module,exports){
'use strict';

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

},{}],61:[function(require,module,exports){
(function (global){
'use strict';

var required = require('requires-port')
  , qs = require('querystringify')
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var location = global && global.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.qs = qs;

module.exports = Url;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"querystringify":59,"requires-port":60}]},{},[1])(1)
});


//# sourceMappingURL=sockjs.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/BaseClient.js":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client/clients/BaseClient.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports = /*#__PURE__*/function () {
  function BaseClient() {
    _classCallCheck(this, BaseClient);
  }

  _createClass(BaseClient, null, [{
    key: "getClientPath",
    value: function getClientPath(options) {
      throw new Error('Client needs implementation');
    }
  }]);

  return BaseClient;
}();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js":
/*!***********************************************************!*\
  !*** (webpack)-dev-server/client/clients/SockJSClient.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable
  no-unused-vars
*/

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");

var BaseClient = __webpack_require__(/*! ./BaseClient */ "./node_modules/webpack-dev-server/client/clients/BaseClient.js");

module.exports = /*#__PURE__*/function (_BaseClient) {
  _inherits(SockJSClient, _BaseClient);

  var _super = _createSuper(SockJSClient);

  function SockJSClient(url) {
    var _this;

    _classCallCheck(this, SockJSClient);

    _this = _super.call(this);
    _this.sock = new SockJS(url);

    _this.sock.onerror = function (err) {// TODO: use logger to log the error event once client and client-src
      // are reorganized to have the same directory structure
    };

    return _this;
  }

  _createClass(SockJSClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.sock.onopen = f;
    }
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.sock.onclose = f;
    } // call f with the message string as the first argument

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.sock.onmessage = function (e) {
        f(e.data);
      };
    }
  }], [{
    key: "getClientPath",
    value: function getClientPath(options) {
      return /*require.resolve*/(/*! ./SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
    }
  }]);

  return SockJSClient;
}(BaseClient);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost":
/*!****************************************************!*\
  !*** (webpack)-dev-server/client?http://localhost ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {
/* global __resourceQuery WorkerGlobalScope self */

/* eslint prefer-destructuring: off */

var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log,
    setLogLevel = _require.setLogLevel;

var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

var status = {
  isUnloading: false,
  currentHash: ''
};
var options = {
  hot: false,
  hotReload: true,
  liveReload: false,
  initial: true,
  useWarningOverlay: false,
  useErrorOverlay: false,
  useProgress: false
};
var socketUrl = createSocketUrl(__resourceQuery);
self.addEventListener('beforeunload', function () {
  status.isUnloading = true;
});

if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  options.hotReload = qs.indexOf('hotreload=false') === -1;
}

var onSocketMessage = {
  hot: function hot() {
    options.hot = true;
    log.info('[WDS] Hot Module Replacement enabled.');
  },
  liveReload: function liveReload() {
    options.liveReload = true;
    log.info('[WDS] Live Reloading enabled.');
  },
  invalid: function invalid() {
    log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('Invalid');
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  'still-ok': function stillOk() {
    log.info('[WDS] Nothing changed.');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('StillOk');
  },
  'log-level': function logLevel(level) {
    var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }

    setLogLevel(level);
  },
  overlay: function overlay(value) {
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        options.useWarningOverlay = false;
        options.useErrorOverlay = value;
      } else if (value) {
        options.useWarningOverlay = value.warnings;
        options.useErrorOverlay = value.errors;
      }
    }
  },
  progress: function progress(_progress) {
    if (typeof document !== 'undefined') {
      options.useProgress = _progress;
    }
  },
  'progress-update': function progressUpdate(data) {
    if (options.useProgress) {
      log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage('Progress', data);
  },
  ok: function ok() {
    sendMessage('Ok');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  'content-changed': function contentChanged() {
    log.info('[WDS] Content base changed. Reloading...');
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('[WDS] Warnings while compiling.');

    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });

    sendMessage('Warnings', strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }

    if (options.useWarningOverlay) {
      overlay.showMessage(_warnings);
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  errors: function errors(_errors) {
    log.error('[WDS] Errors while compiling. Reload prevented.');

    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });

    sendMessage('Errors', strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }

    if (options.useErrorOverlay) {
      overlay.showMessage(_errors);
    }

    options.initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('[WDS] Disconnected!');
    sendMessage('Close');
  }
};
socket(socketUrl, onSocketMessage);
/* WEBPACK VAR INJECTION */}.call(this, "?http://localhost"))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost:3000":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client?http://localhost:3000 ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {
/* global __resourceQuery WorkerGlobalScope self */

/* eslint prefer-destructuring: off */

var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");

var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log,
    setLogLevel = _require.setLogLevel;

var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");

var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");

var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");

var status = {
  isUnloading: false,
  currentHash: ''
};
var options = {
  hot: false,
  hotReload: true,
  liveReload: false,
  initial: true,
  useWarningOverlay: false,
  useErrorOverlay: false,
  useProgress: false
};
var socketUrl = createSocketUrl(__resourceQuery);
self.addEventListener('beforeunload', function () {
  status.isUnloading = true;
});

if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  options.hotReload = qs.indexOf('hotreload=false') === -1;
}

var onSocketMessage = {
  hot: function hot() {
    options.hot = true;
    log.info('[WDS] Hot Module Replacement enabled.');
  },
  liveReload: function liveReload() {
    options.liveReload = true;
    log.info('[WDS] Live Reloading enabled.');
  },
  invalid: function invalid() {
    log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('Invalid');
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  'still-ok': function stillOk() {
    log.info('[WDS] Nothing changed.');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('StillOk');
  },
  'log-level': function logLevel(level) {
    var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");

    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }

    setLogLevel(level);
  },
  overlay: function overlay(value) {
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        options.useWarningOverlay = false;
        options.useErrorOverlay = value;
      } else if (value) {
        options.useWarningOverlay = value.warnings;
        options.useErrorOverlay = value.errors;
      }
    }
  },
  progress: function progress(_progress) {
    if (typeof document !== 'undefined') {
      options.useProgress = _progress;
    }
  },
  'progress-update': function progressUpdate(data) {
    if (options.useProgress) {
      log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage('Progress', data);
  },
  ok: function ok() {
    sendMessage('Ok');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  'content-changed': function contentChanged() {
    log.info('[WDS] Content base changed. Reloading...');
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('[WDS] Warnings while compiling.');

    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });

    sendMessage('Warnings', strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }

    if (options.useWarningOverlay) {
      overlay.showMessage(_warnings);
    }

    if (options.initial) {
      return options.initial = false;
    } // eslint-disable-line no-return-assign


    reloadApp(options, status);
  },
  errors: function errors(_errors) {
    log.error('[WDS] Errors while compiling. Reload prevented.');

    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });

    sendMessage('Errors', strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }

    if (options.useErrorOverlay) {
      overlay.showMessage(_errors);
    }

    options.initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('[WDS] Disconnected!');
    sendMessage('Close');
  }
};
socket(socketUrl, onSocketMessage);
/* WEBPACK VAR INJECTION */}.call(this, "?http://localhost:3000"))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!**********************************************!*\
  !*** (webpack)-dev-server/client/overlay.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");

var _require = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js"),
    AllHtmlEntities = _require.AllHtmlEntities;

var entities = new AllHtmlEntities();
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};
var overlayIframe = null;
var overlayDiv = null;
var lastOnOverlayDivReady = null;
ansiHTML.setColors(colors);

function createOverlayIframe(onIframeLoad) {
  var iframe = document.createElement('iframe');
  iframe.id = 'webpack-dev-server-client-overlay';
  iframe.src = 'about:blank';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.top = 0;
  iframe.style.right = 0;
  iframe.style.bottom = 0;
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.zIndex = 9999999999;
  iframe.onload = onIframeLoad;
  return iframe;
}

function addOverlayDivTo(iframe) {
  var div = iframe.contentDocument.createElement('div');
  div.id = 'webpack-dev-server-client-overlay-div';
  div.style.position = 'fixed';
  div.style.boxSizing = 'border-box';
  div.style.left = 0;
  div.style.top = 0;
  div.style.right = 0;
  div.style.bottom = 0;
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  div.style.color = '#E8E8E8';
  div.style.fontFamily = 'Menlo, Consolas, monospace';
  div.style.fontSize = 'large';
  div.style.padding = '2rem';
  div.style.lineHeight = '1.2';
  div.style.whiteSpace = 'pre-wrap';
  div.style.overflow = 'auto';
  iframe.contentDocument.body.appendChild(div);
  return div;
}

function ensureOverlayDivExists(onOverlayDivReady) {
  if (overlayDiv) {
    // Everything is ready, call the callback right away.
    onOverlayDivReady(overlayDiv);
    return;
  } // Creating an iframe may be asynchronous so we'll schedule the callback.
  // In case of multiple calls, last callback wins.


  lastOnOverlayDivReady = onOverlayDivReady;

  if (overlayIframe) {
    // We've already created it.
    return;
  } // Create iframe and, when it is ready, a div inside it.


  overlayIframe = createOverlayIframe(function () {
    overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!

    lastOnOverlayDivReady(overlayDiv);
  }); // Zalgo alert: onIframeLoad() will be called either synchronously
  // or asynchronously depending on the browser.
  // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.

  document.body.appendChild(overlayIframe);
} // Successful compilation.


function clear() {
  if (!overlayDiv) {
    // It is not there in the first place.
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(overlayIframe);
  overlayDiv = null;
  overlayIframe = null;
  lastOnOverlayDivReady = null;
} // Compilation with errors (e.g. syntax error or missing modules).


function showMessage(messages) {
  ensureOverlayDivExists(function (div) {
    // Make it look similar to our terminal.
    div.innerHTML = "<span style=\"color: #".concat(colors.red, "\">Failed to compile.</span><br><br>").concat(ansiHTML(entities.encode(messages[0])));
  });
}

module.exports = {
  clear: clear,
  showMessage: showMessage
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!*********************************************!*\
  !*** (webpack)-dev-server/client/socket.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_dev_server_client__) {
/* global __webpack_dev_server_client__ */

/* eslint-disable
  camelcase
*/
// this SockJSClient is here as a default fallback, in case inline mode
// is off or the client is not injected. This will be switched to
// WebsocketClient when it becomes the default
// important: the path to SockJSClient here is made to work in the 'client'
// directory, but is updated via the webpack compilation when compiled from
// the 'client-src' directory

var Client = typeof __webpack_dev_server_client__ !== 'undefined' ? __webpack_dev_server_client__ : // eslint-disable-next-line import/no-unresolved
__webpack_require__(/*! ./clients/SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
var retries = 0;
var client = null;

var socket = function initSocket(url, handlers) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries <= 10) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  });
  client.onMessage(function (data) {
    var msg = JSON.parse(data);

    if (handlers[msg.type]) {
      handlers[msg.type](msg.data);
    }
  });
};

module.exports = socket;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)-dev-server/client/clients/SockJSClient.js */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js")))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js":
/*!************************************************************!*\
  !*** (webpack)-dev-server/client/utils/createSocketUrl.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global self */

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var getCurrentScriptSource = __webpack_require__(/*! ./getCurrentScriptSource */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

function createSocketUrl(resourceQuery, currentLocation) {
  var urlParts;

  if (typeof resourceQuery === 'string' && resourceQuery !== '') {
    // If this bundle is inlined, use the resource query to get the correct url.
    // format is like `?http://0.0.0.0:8096&sockPort=8097&sockHost=localhost`
    urlParts = url.parse(resourceQuery // strip leading `?` from query string to get a valid URL
    .substr(1) // replace first `&` with `?` to have a valid query string
    .replace('&', '?'), true);
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptHost = getCurrentScriptSource();
    urlParts = url.parse(scriptHost || '/', true, true);
  } // Use parameter to allow passing location in unit tests


  if (typeof currentLocation === 'string' && currentLocation !== '') {
    currentLocation = url.parse(currentLocation);
  } else {
    currentLocation = self.location;
  }

  return getSocketUrl(urlParts, currentLocation);
}
/*
 * Gets socket URL based on Script Source/Location
 * (scriptSrc: URL, location: URL) -> URL
 */


function getSocketUrl(urlParts, loc) {
  var auth = urlParts.auth,
      query = urlParts.query;
  var hostname = urlParts.hostname,
      protocol = urlParts.protocol,
      port = urlParts.port;

  if (!port || port === '0') {
    port = loc.port;
  } // check ipv4 and ipv6 `all hostname`
  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384


  if ((hostname === '0.0.0.0' || hostname === '::') && loc.hostname && loc.protocol.indexOf('http') === 0) {
    hostname = loc.hostname;
  } // `hostname` can be empty when the script path is relative. In that case, specifying
  // a protocol would result in an invalid URL.
  // When https is used in the app, secure websockets are always necessary
  // because the browser doesn't accept non-secure websockets.


  if (hostname && hostname !== '127.0.0.1' && (loc.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
    protocol = loc.protocol;
  } // all of these sock url params are optionally passed in through
  // resourceQuery, so we need to fall back to the default if
  // they are not provided


  var sockHost = query.sockHost || hostname;
  var sockPath = query.sockPath || '/sockjs-node';
  var sockPort = query.sockPort || port;

  if (sockPort === 'location') {
    sockPort = loc.port;
  }

  return url.format({
    protocol: protocol,
    auth: auth,
    hostname: sockHost,
    port: sockPort,
    // If sockPath is provided it'll be passed in via the resourceQuery as a
    // query param so it has to be parsed out of the querystring in order for the
    // client to open the socket to the correct location.
    pathname: sockPath
  });
}

module.exports = createSocketUrl;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!*******************************************************************!*\
  !*** (webpack)-dev-server/client/utils/getCurrentScriptSource.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute('src');
  } // Fall back to getting all scripts in the document.


  var scriptElements = document.scripts || [];
  var currentScript = scriptElements[scriptElements.length - 1];

  if (currentScript) {
    return currentScript.getAttribute('src');
  } // Fail as there was no script to use.


  throw new Error('[WDS] Failed to get current script source.');
}

module.exports = getCurrentScriptSource;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!************************************************!*\
  !*** (webpack)-dev-server/client/utils/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');

var INFO = 'info';
var WARN = 'warn';
var ERROR = 'error';
var DEBUG = 'debug';
var TRACE = 'trace';
var SILENT = 'silent'; // deprecated
// TODO: remove these at major released
// https://github.com/webpack/webpack-dev-server/pull/1825

var WARNING = 'warning';
var NONE = 'none'; // Set the default log level

log.setDefaultLevel(INFO);

function setLogLevel(level) {
  switch (level) {
    case INFO:
    case WARN:
    case ERROR:
    case DEBUG:
    case TRACE:
      log.setLevel(level);
      break;
    // deprecated

    case WARNING:
      // loglevel's warning name is different from webpack's
      log.setLevel('warn');
      break;
    // deprecated

    case NONE:
    case SILENT:
      log.disableAll();
      break;

    default:
      log.error("[WDS] Unknown clientLogLevel '".concat(level, "'"));
  }
}

module.exports = {
  log: log,
  setLogLevel: setLogLevel
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!******************************************************!*\
  !*** (webpack)-dev-server/client/utils/reloadApp.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global WorkerGlobalScope self */

var _require = __webpack_require__(/*! ./log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
    log = _require.log;

function reloadApp(_ref, _ref2) {
  var hotReload = _ref.hotReload,
      hot = _ref.hot,
      liveReload = _ref.liveReload;
  var isUnloading = _ref2.isUnloading,
      currentHash = _ref2.currentHash;

  if (isUnloading || !hotReload) {
    return;
  }

  if (hot) {
    log.info('[WDS] App hot update...');

    var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");

    hotEmitter.emit('webpackHotUpdate', currentHash);

    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentHash), '*');
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload) {
      var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

      var intervalId = self.setInterval(function () {
        if (rootWindow.location.protocol !== 'about:') {
          // reload immediately if protocol is valid
          applyReload(rootWindow, intervalId);
        } else {
          rootWindow = rootWindow.parent;

          if (rootWindow.parent === rootWindow) {
            // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
            applyReload(rootWindow, intervalId);
          }
        }
      });
    }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    log.info('[WDS] App updated. Reloading...');
    rootWindow.location.reload();
  }
}

module.exports = reloadApp;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!********************************************************!*\
  !*** (webpack)-dev-server/client/utils/sendMessage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global __resourceQuery WorkerGlobalScope self */
// Send messages to the outside, so plugins can consume it.

function sendMsg(type, data) {
  if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, '*');
  }
}

module.exports = sendMsg;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!***********************************!*\
  !*** (webpack)/hot/dev-server.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals window __webpack_hash__ */
if (true) {
	var lastHash;
	var upToDate = function upToDate() {
		return lastHash.indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function(updatedModules) {
				if (!updatedModules) {
					log("warning", "[HMR] Cannot find update. Need to do a full reload!");
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					window.location.reload();
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function(err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. Need to do a full reload!"
					);
					log("warning", "[HMR] " + log.formatError(err));
					window.location.reload();
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function(currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!********************************!*\
  !*** (webpack)/hot/emitter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./src/images/get_started128.png":
/*!***************************************!*\
  !*** ./src/images/get_started128.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "get_started128.png";

/***/ }),

/***/ "./src/images/get_started16.png":
/*!**************************************!*\
  !*** ./src/images/get_started16.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "get_started16.png";

/***/ }),

/***/ "./src/images/get_started32.png":
/*!**************************************!*\
  !*** ./src/images/get_started32.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "get_started32.png";

/***/ }),

/***/ "./src/images/get_started48.png":
/*!**************************************!*\
  !*** ./src/images/get_started48.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "get_started48.png";

/***/ }),

/***/ "./src/ts/background.ts":
/*!******************************!*\
  !*** ./src/ts/background.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../images/get_started16.png */ "./src/images/get_started16.png");
__webpack_require__(/*! ../images/get_started32.png */ "./src/images/get_started32.png");
__webpack_require__(/*! ../images/get_started48.png */ "./src/images/get_started48.png");
__webpack_require__(/*! ../images/get_started128.png */ "./src/images/get_started128.png");


/***/ }),

/***/ 5:
/*!************************************************************************************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost (webpack)/hot/dev-server.js webpack-dev-server/client?http://localhost:3000 webpack/hot/dev-server ./src/ts/background.ts ***!
  \************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Pamela\Desktop\Seminario\Testo_FrontEnd\node_modules\webpack-dev-server\client\index.js?http://localhost */"./node_modules/webpack-dev-server/client/index.js?http://localhost");
__webpack_require__(/*! C:\Users\Pamela\Desktop\Seminario\Testo_FrontEnd\node_modules\webpack\hot\dev-server.js */"./node_modules/webpack/hot/dev-server.js");
__webpack_require__(/*! webpack-dev-server/client?http://localhost:3000 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:3000");
__webpack_require__(/*! webpack/hot/dev-server */"./node_modules/webpack/hot/dev-server.js");
module.exports = __webpack_require__(/*! C:\Users\Pamela\Desktop\Seminario\Testo_FrontEnd\src\ts\background.ts */"./src/ts/background.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2ktaHRtbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvaHRtbDQtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL2h0bWw1LWVudGl0aWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIveG1sLWVudGl0aWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2dsZXZlbC9saWIvbG9nbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wdW55Y29kZS9wdW55Y29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NranMtY2xpZW50L2Rpc3Qvc29ja2pzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91cmwvdXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91cmwvdXRpbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvY2xpZW50L2NsaWVudHMvQmFzZUNsaWVudC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvY2xpZW50L2NsaWVudHMvU29ja0pTQ2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9jbGllbnQiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL2NsaWVudD9lY2Y5Iiwid2VicGFjazovLy8od2VicGFjayktZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvY2xpZW50L3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2NyZWF0ZVNvY2tldFVybC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL2NsaWVudC91dGlscy9sb2cuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL2NsaWVudC91dGlscy9yZWxvYWRBcHAuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1kZXYtc2VydmVyL2NsaWVudC91dGlscy9zZW5kTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3Qgc3luYyBub25yZWN1cnNpdmUgXlxcLlxcL2xvZyQiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvZGV2LXNlcnZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdC9lbWl0dGVyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvaG90L2xvZy1hcHBseS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvbG9nLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvZ2V0X3N0YXJ0ZWQxMjgucG5nIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvZ2V0X3N0YXJ0ZWQxNi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9nZXRfc3RhcnRlZDMyLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2dldF9zdGFydGVkNDgucG5nIiwid2VicGFjazovLy8uL3NyYy90cy9iYWNrZ3JvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRzs7UUFFSDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QjtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0Esa0JBQWtCLDhCQUE4QjtRQUNoRDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxvQkFBb0IsMkJBQTJCO1FBQy9DO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLG1CQUFtQixjQUFjO1FBQ2pDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsS0FBSztRQUNyQjtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixZQUFZO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0EsY0FBYyw0QkFBNEI7UUFDMUM7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJOztRQUVKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHVDQUF1QztRQUN4RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHVDQUF1QztRQUN4RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQixzQkFBc0I7UUFDdkM7UUFDQTtRQUNBO1FBQ0EsUUFBUTtRQUNSO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFVBQVU7UUFDVjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxjQUFjLHdDQUF3QztRQUN0RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFNBQVM7UUFDVDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0EsS0FBSztRQUNMOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZUFBZTtRQUNmO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0Esc0NBQXNDLHVCQUF1Qjs7O1FBRzdEO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2MUJZOztBQUVaOztBQUVBO0FBQ0EsbURBQW1ELElBQUksU0FBUyxNQUFNLElBQUk7O0FBRTFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixHQUFHO0FBQ0g7QUFDQSxzQkFBc0I7QUFDdEIsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QyxVQUFVLCtCQUErQjtBQUNoRjtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUMvS2E7QUFDYjtBQUNBLDZCQUE2QixZQUFZLElBQUksSUFBSSxNQUFNLElBQUk7QUFDM0Q7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHlCQUF5QjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3YmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDN0dhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztB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O0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsYUFBYSxRQUFRLEVBQUUsMEhBQTBIOztBQUVsSixDQUFDLEVBQUUsc0hBQXNIO0FBQ3pIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDLGFBQWEsUUFBUSxFQUFFOztBQUV4QixDQUFDLEVBQUUsd05BQXdOO0FBQzNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLHFJQUFxSTs7QUFFdEksQ0FBQyxHQUFHO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdELFdBQVc7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxhQUFhLFFBQVEsRUFBRSwwSEFBMEg7O0FBRWxKLENBQUMsRUFBRSw4WEFBOFg7QUFDalk7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDLGFBQWEsUUFBUSxFQUFFLDBIQUEwSDs7QUFFbEosQ0FBQyxFQUFFLGdGQUFnRjtBQUNuRjtBQUNBOztBQUVBLENBQUMscUlBQXFJOztBQUV0SSxDQUFDLEdBQUc7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQSxDQUFDLHFJQUFxSTs7QUFFdEksQ0FBQyxHQUFHO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLHdHQUF3RztBQUMzRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLEVBQUUscUZBQXFGO0FBQ3hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLENBQUMsYUFB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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQSxDQUFDLGFBQWEsUUFBUSxFQUFFOztBQUV4QixDQUFDLEVBQUUscURBQXFEO0FBQ3hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxhQUFhLFFBQVEsRUFBRSwwSEFBMEg7O0FBRWxKLENBQUMsRUFBRSx5R0FBeUc7QUFDNUc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDBCQUEwQixxREFBcUQsbUJBQW1CLFdBQVc7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLGFBQWEsUUFBUSxFQUFFLDBIQUEwSDs7QUFFbEosQ0FBQyxFQUFFLGtJQUFrSTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixFQUFFO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLGFBQWEsUUFBUSxFQUFFOztBQUV4QixDQUFDLEVBQUUsb0NBQW9DO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLGFBQWEsUUFBUSxFQUFFLDBIQUEwSDs7QUFFbEosQ0FBQyxFQUFFLHdEQUF3RDtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLENBQUMsYUFBYSxRQUFRLEVBQUUsMEhBQTBIOztBQUVsSixDQUFDLEVBQUUseUdBQXlHO0FBQzVHOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLGlDQUFpQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQyxFQUFFLHlCQUF5QjtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBOztBQUVBOztBQUVBLENBQUMsRUFBRSxpQ0FBaUM7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyxhQUFhLFFBQVEsRUFBRTs7QUFFeEIsQ0FBQyxFQUFFLGtHQUFrRztBQUNyRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DOztBQUVBLENBQUMsRUFBRSwrRkFBK0Y7QUFDbEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQzs7QUFFckM7O0FBRUEsQ0FBQyxFQUFFLDBFQUEwRTtBQUM3RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7O0FBRW5DOztBQUVBLENBQUMsRUFBRSx1R0FBdUc7QUFDMUc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMscUlBQXFJOztBQUV0SSxDQUFDLEVBQUUsNkhBQTZIO0FBQ2hJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMscUlBQXFJOztBQUV0SSxDQUFDLEdBQUc7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxxSUFBcUk7O0FBRXRJLENBQUMsR0FBRztBQUNKOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxDQUFDLEVBQUUsV0FBVztBQUNkO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxxSUFBcUk7O0FBRXRJLENBQUMsRUFBRSxjQUFjO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxrQ0FBa0MsaURBQWlEO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvREFBb0Q7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE1BQU07QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7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QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxREEsaUJBQWlCLHFCQUF1Qix3Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qix1Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qix1Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qix1Qjs7Ozs7Ozs7Ozs7Ozs7QUNBeEMseUZBQW9DO0FBQ3BDLHlGQUFvQztBQUNwQyx5RkFBb0M7QUFDcEMsMkZBQXFDIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMjdhZTk0OGI5YzhlOTliZDMwYzNcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZJbnZhbGlkYXRlZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGludmFsaWRhdGU6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdHN3aXRjaCAoaG90U3RhdHVzKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJpZGxlXCI6XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwicmVhZHlcIjpcbiBcdFx0XHRcdFx0XHRob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInByZXBhcmVcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImNoZWNrXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJhcHBseVwiOlxuIFx0XHRcdFx0XHRcdChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPVxuIFx0XHRcdFx0XHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIHx8IFtdKS5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2gsIGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImJhY2tncm91bmRcIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuIFx0XHRyZXR1cm4gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKSB7XG4gXHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0IW1vZHVsZSB8fFxuIFx0XHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG4gXHRcdFx0XHQpXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcbiBcdFx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG4gXHRcdFx0XHQhaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmSW52YWxpZGF0ZWRcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0cGFyZW50czogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0ucGFyZW50cy5zbGljZSgpLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRpZiAoaG90VXBkYXRlTmV3SGFzaCAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1bmRlZmluZWQ7XG4gXHRcdH1cbiBcdFx0aG90VXBkYXRlID0gdW5kZWZpbmVkO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBpdGVtLnBhcmVudHM7XG4gXHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gbW9kdWxlSWQ7XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGlmIChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcbiBcdFx0XHRyZXR1cm4gaG90QXBwbHlJbnRlcm5hbChvcHRpb25zKS50aGVuKGZ1bmN0aW9uKGxpc3QpIHtcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG4gXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cmV0dXJuIGxpc3Q7XG4gXHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuIFx0XHRpZiAoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKCFob3RVcGRhdGUpIGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUpO1xuIFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcbiBcdFx0XHRyZXR1cm4gdHJ1ZTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgbW9kdWxlSWQpKVxuIFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb2R1bGVzW21vZHVsZUlkXTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSg1KShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuc2lIVE1MXG5cbi8vIFJlZmVyZW5jZSB0byBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL2Fuc2ktcmVnZXhcbnZhciBfcmVnQU5TSSA9IC8oPzooPzpcXHUwMDFiXFxbKXxcXHUwMDliKSg/Oig/OlswLTldezEsM30pPyg/Oig/OjtbMC05XXswLDN9KSopP1tBLU18Zi1tXSl8XFx1MDAxYltBLU1dL1xuXG52YXIgX2RlZkNvbG9ycyA9IHtcbiAgcmVzZXQ6IFsnZmZmJywgJzAwMCddLCAvLyBbRk9SRUdST1VEX0NPTE9SLCBCQUNLR1JPVU5EX0NPTE9SXVxuICBibGFjazogJzAwMCcsXG4gIHJlZDogJ2ZmMDAwMCcsXG4gIGdyZWVuOiAnMjA5ODA1JyxcbiAgeWVsbG93OiAnZThiZjAzJyxcbiAgYmx1ZTogJzAwMDBmZicsXG4gIG1hZ2VudGE6ICdmZjAwZmYnLFxuICBjeWFuOiAnMDBmZmVlJyxcbiAgbGlnaHRncmV5OiAnZjBmMGYwJyxcbiAgZGFya2dyZXk6ICc4ODgnXG59XG52YXIgX3N0eWxlcyA9IHtcbiAgMzA6ICdibGFjaycsXG4gIDMxOiAncmVkJyxcbiAgMzI6ICdncmVlbicsXG4gIDMzOiAneWVsbG93JyxcbiAgMzQ6ICdibHVlJyxcbiAgMzU6ICdtYWdlbnRhJyxcbiAgMzY6ICdjeWFuJyxcbiAgMzc6ICdsaWdodGdyZXknXG59XG52YXIgX29wZW5UYWdzID0ge1xuICAnMSc6ICdmb250LXdlaWdodDpib2xkJywgLy8gYm9sZFxuICAnMic6ICdvcGFjaXR5OjAuNScsIC8vIGRpbVxuICAnMyc6ICc8aT4nLCAvLyBpdGFsaWNcbiAgJzQnOiAnPHU+JywgLy8gdW5kZXJzY29yZVxuICAnOCc6ICdkaXNwbGF5Om5vbmUnLCAvLyBoaWRkZW5cbiAgJzknOiAnPGRlbD4nIC8vIGRlbGV0ZVxufVxudmFyIF9jbG9zZVRhZ3MgPSB7XG4gICcyMyc6ICc8L2k+JywgLy8gcmVzZXQgaXRhbGljXG4gICcyNCc6ICc8L3U+JywgLy8gcmVzZXQgdW5kZXJzY29yZVxuICAnMjknOiAnPC9kZWw+JyAvLyByZXNldCBkZWxldGVcbn1cblxuO1swLCAyMSwgMjIsIDI3LCAyOCwgMzksIDQ5XS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gIF9jbG9zZVRhZ3Nbbl0gPSAnPC9zcGFuPidcbn0pXG5cbi8qKlxuICogQ29udmVydHMgdGV4dCB3aXRoIEFOU0kgY29sb3IgY29kZXMgdG8gSFRNTCBtYXJrdXAuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dFxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGFuc2lIVE1MICh0ZXh0KSB7XG4gIC8vIFJldHVybnMgdGhlIHRleHQgaWYgdGhlIHN0cmluZyBoYXMgbm8gQU5TSSBlc2NhcGUgY29kZS5cbiAgaWYgKCFfcmVnQU5TSS50ZXN0KHRleHQpKSB7XG4gICAgcmV0dXJuIHRleHRcbiAgfVxuXG4gIC8vIENhY2hlIG9wZW5lZCBzZXF1ZW5jZS5cbiAgdmFyIGFuc2lDb2RlcyA9IFtdXG4gIC8vIFJlcGxhY2Ugd2l0aCBtYXJrdXAuXG4gIHZhciByZXQgPSB0ZXh0LnJlcGxhY2UoL1xcMDMzXFxbKFxcZCspKm0vZywgZnVuY3Rpb24gKG1hdGNoLCBzZXEpIHtcbiAgICB2YXIgb3QgPSBfb3BlblRhZ3Nbc2VxXVxuICAgIGlmIChvdCkge1xuICAgICAgLy8gSWYgY3VycmVudCBzZXF1ZW5jZSBoYXMgYmVlbiBvcGVuZWQsIGNsb3NlIGl0LlxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcbiAgICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICAgIHJldHVybiAnPC9zcGFuPidcbiAgICAgIH1cbiAgICAgIC8vIE9wZW4gdGFnLlxuICAgICAgYW5zaUNvZGVzLnB1c2goc2VxKVxuICAgICAgcmV0dXJuIG90WzBdID09PSAnPCcgPyBvdCA6ICc8c3BhbiBzdHlsZT1cIicgKyBvdCArICc7XCI+J1xuICAgIH1cblxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXVxuICAgIGlmIChjdCkge1xuICAgICAgLy8gUG9wIHNlcXVlbmNlXG4gICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgIHJldHVybiBjdFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfSlcblxuICAvLyBNYWtlIHN1cmUgdGFncyBhcmUgY2xvc2VkLlxuICB2YXIgbCA9IGFuc2lDb2Rlcy5sZW5ndGhcbiAgOyhsID4gMCkgJiYgKHJldCArPSBBcnJheShsICsgMSkuam9pbignPC9zcGFuPicpKVxuXG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBDdXN0b21pemUgY29sb3JzLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9ycyByZWZlcmVuY2UgdG8gX2RlZkNvbG9yc1xuICovXG5hbnNpSFRNTC5zZXRDb2xvcnMgPSBmdW5jdGlvbiAoY29sb3JzKSB7XG4gIGlmICh0eXBlb2YgY29sb3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGNvbG9yc2AgcGFyYW1ldGVyIG11c3QgYmUgYW4gT2JqZWN0LicpXG4gIH1cblxuICB2YXIgX2ZpbmFsQ29sb3JzID0ge31cbiAgZm9yICh2YXIga2V5IGluIF9kZWZDb2xvcnMpIHtcbiAgICB2YXIgaGV4ID0gY29sb3JzLmhhc093blByb3BlcnR5KGtleSkgPyBjb2xvcnNba2V5XSA6IG51bGxcbiAgICBpZiAoIWhleCkge1xuICAgICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmICgncmVzZXQnID09PSBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgaGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoZXggPSBbaGV4XVxuICAgICAgfVxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGhleCkgfHwgaGV4Lmxlbmd0aCA9PT0gMCB8fCBoZXguc29tZShmdW5jdGlvbiAoaCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGggIT09ICdzdHJpbmcnXG4gICAgICB9KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYW4gQXJyYXkgYW5kIGVhY2ggaXRlbSBjb3VsZCBvbmx5IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICAgIH1cbiAgICAgIHZhciBkZWZIZXhDb2xvciA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgaWYgKCFoZXhbMF0pIHtcbiAgICAgICAgaGV4WzBdID0gZGVmSGV4Q29sb3JbMF1cbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAxIHx8ICFoZXhbMV0pIHtcbiAgICAgICAgaGV4ID0gW2hleFswXV1cbiAgICAgICAgaGV4LnB1c2goZGVmSGV4Q29sb3JbMV0pXG4gICAgICB9XG5cbiAgICAgIGhleCA9IGhleC5zbGljZSgwLCAyKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgfVxuICAgIF9maW5hbENvbG9yc1trZXldID0gaGV4XG4gIH1cbiAgX3NldFRhZ3MoX2ZpbmFsQ29sb3JzKVxufVxuXG4vKipcbiAqIFJlc2V0IGNvbG9ycy5cbiAqL1xuYW5zaUhUTUwucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIF9zZXRUYWdzKF9kZWZDb2xvcnMpXG59XG5cbi8qKlxuICogRXhwb3NlIHRhZ3MsIGluY2x1ZGluZyBvcGVuIGFuZCBjbG9zZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmFuc2lIVE1MLnRhZ3MgPSB7fVxuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnb3BlbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9vcGVuVGFncyB9XG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnY2xvc2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfY2xvc2VUYWdzIH1cbiAgfSlcbn0gZWxzZSB7XG4gIGFuc2lIVE1MLnRhZ3Mub3BlbiA9IF9vcGVuVGFnc1xuICBhbnNpSFRNTC50YWdzLmNsb3NlID0gX2Nsb3NlVGFnc1xufVxuXG5mdW5jdGlvbiBfc2V0VGFncyAoY29sb3JzKSB7XG4gIC8vIHJlc2V0IGFsbFxuICBfb3BlblRhZ3NbJzAnXSA9ICdmb250LXdlaWdodDpub3JtYWw7b3BhY2l0eToxO2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzBdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzFdXG4gIC8vIGludmVyc2VcbiAgX29wZW5UYWdzWyc3J10gPSAnY29sb3I6IycgKyBjb2xvcnMucmVzZXRbMV0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMF1cbiAgLy8gZGFyayBncmV5XG4gIF9vcGVuVGFnc1snOTAnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5kYXJrZ3JleVxuXG4gIGZvciAodmFyIGNvZGUgaW4gX3N0eWxlcykge1xuICAgIHZhciBjb2xvciA9IF9zdHlsZXNbY29kZV1cbiAgICB2YXIgb3JpQ29sb3IgPSBjb2xvcnNbY29sb3JdIHx8ICcwMDAnXG4gICAgX29wZW5UYWdzW2NvZGVdID0gJ2NvbG9yOiMnICsgb3JpQ29sb3JcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSlcbiAgICBfb3BlblRhZ3NbKGNvZGUgKyAxMCkudG9TdHJpbmcoKV0gPSAnYmFja2dyb3VuZDojJyArIG9yaUNvbG9yXG4gIH1cbn1cblxuYW5zaUhUTUwucmVzZXQoKVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiAvW1xcdTAwMWJcXHUwMDliXVtbKCkjOz9dKig/OlswLTldezEsNH0oPzo7WzAtOV17MCw0fSkqKT9bMC05QS1QUlpjZi1ucXJ5PT48XS9nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSFRNTF9BTFBIQSA9IFsnYXBvcycsICduYnNwJywgJ2lleGNsJywgJ2NlbnQnLCAncG91bmQnLCAnY3VycmVuJywgJ3llbicsICdicnZiYXInLCAnc2VjdCcsICd1bWwnLCAnY29weScsICdvcmRmJywgJ2xhcXVvJywgJ25vdCcsICdzaHknLCAncmVnJywgJ21hY3InLCAnZGVnJywgJ3BsdXNtbicsICdzdXAyJywgJ3N1cDMnLCAnYWN1dGUnLCAnbWljcm8nLCAncGFyYScsICdtaWRkb3QnLCAnY2VkaWwnLCAnc3VwMScsICdvcmRtJywgJ3JhcXVvJywgJ2ZyYWMxNCcsICdmcmFjMTInLCAnZnJhYzM0JywgJ2lxdWVzdCcsICdBZ3JhdmUnLCAnQWFjdXRlJywgJ0FjaXJjJywgJ0F0aWxkZScsICdBdW1sJywgJ0FyaW5nJywgJ0FlbGlnJywgJ0NjZWRpbCcsICdFZ3JhdmUnLCAnRWFjdXRlJywgJ0VjaXJjJywgJ0V1bWwnLCAnSWdyYXZlJywgJ0lhY3V0ZScsICdJY2lyYycsICdJdW1sJywgJ0VUSCcsICdOdGlsZGUnLCAnT2dyYXZlJywgJ09hY3V0ZScsICdPY2lyYycsICdPdGlsZGUnLCAnT3VtbCcsICd0aW1lcycsICdPc2xhc2gnLCAnVWdyYXZlJywgJ1VhY3V0ZScsICdVY2lyYycsICdVdW1sJywgJ1lhY3V0ZScsICdUSE9STicsICdzemxpZycsICdhZ3JhdmUnLCAnYWFjdXRlJywgJ2FjaXJjJywgJ2F0aWxkZScsICdhdW1sJywgJ2FyaW5nJywgJ2FlbGlnJywgJ2NjZWRpbCcsICdlZ3JhdmUnLCAnZWFjdXRlJywgJ2VjaXJjJywgJ2V1bWwnLCAnaWdyYXZlJywgJ2lhY3V0ZScsICdpY2lyYycsICdpdW1sJywgJ2V0aCcsICdudGlsZGUnLCAnb2dyYXZlJywgJ29hY3V0ZScsICdvY2lyYycsICdvdGlsZGUnLCAnb3VtbCcsICdkaXZpZGUnLCAnb3NsYXNoJywgJ3VncmF2ZScsICd1YWN1dGUnLCAndWNpcmMnLCAndXVtbCcsICd5YWN1dGUnLCAndGhvcm4nLCAneXVtbCcsICdxdW90JywgJ2FtcCcsICdsdCcsICdndCcsICdPRWxpZycsICdvZWxpZycsICdTY2Fyb24nLCAnc2Nhcm9uJywgJ1l1bWwnLCAnY2lyYycsICd0aWxkZScsICdlbnNwJywgJ2Vtc3AnLCAndGhpbnNwJywgJ3p3bmonLCAnendqJywgJ2xybScsICdybG0nLCAnbmRhc2gnLCAnbWRhc2gnLCAnbHNxdW8nLCAncnNxdW8nLCAnc2JxdW8nLCAnbGRxdW8nLCAncmRxdW8nLCAnYmRxdW8nLCAnZGFnZ2VyJywgJ0RhZ2dlcicsICdwZXJtaWwnLCAnbHNhcXVvJywgJ3JzYXF1bycsICdldXJvJywgJ2Zub2YnLCAnQWxwaGEnLCAnQmV0YScsICdHYW1tYScsICdEZWx0YScsICdFcHNpbG9uJywgJ1pldGEnLCAnRXRhJywgJ1RoZXRhJywgJ0lvdGEnLCAnS2FwcGEnLCAnTGFtYmRhJywgJ011JywgJ051JywgJ1hpJywgJ09taWNyb24nLCAnUGknLCAnUmhvJywgJ1NpZ21hJywgJ1RhdScsICdVcHNpbG9uJywgJ1BoaScsICdDaGknLCAnUHNpJywgJ09tZWdhJywgJ2FscGhhJywgJ2JldGEnLCAnZ2FtbWEnLCAnZGVsdGEnLCAnZXBzaWxvbicsICd6ZXRhJywgJ2V0YScsICd0aGV0YScsICdpb3RhJywgJ2thcHBhJywgJ2xhbWJkYScsICdtdScsICdudScsICd4aScsICdvbWljcm9uJywgJ3BpJywgJ3JobycsICdzaWdtYWYnLCAnc2lnbWEnLCAndGF1JywgJ3Vwc2lsb24nLCAncGhpJywgJ2NoaScsICdwc2knLCAnb21lZ2EnLCAndGhldGFzeW0nLCAndXBzaWgnLCAncGl2JywgJ2J1bGwnLCAnaGVsbGlwJywgJ3ByaW1lJywgJ1ByaW1lJywgJ29saW5lJywgJ2ZyYXNsJywgJ3dlaWVycCcsICdpbWFnZScsICdyZWFsJywgJ3RyYWRlJywgJ2FsZWZzeW0nLCAnbGFycicsICd1YXJyJywgJ3JhcnInLCAnZGFycicsICdoYXJyJywgJ2NyYXJyJywgJ2xBcnInLCAndUFycicsICdyQXJyJywgJ2RBcnInLCAnaEFycicsICdmb3JhbGwnLCAncGFydCcsICdleGlzdCcsICdlbXB0eScsICduYWJsYScsICdpc2luJywgJ25vdGluJywgJ25pJywgJ3Byb2QnLCAnc3VtJywgJ21pbnVzJywgJ2xvd2FzdCcsICdyYWRpYycsICdwcm9wJywgJ2luZmluJywgJ2FuZycsICdhbmQnLCAnb3InLCAnY2FwJywgJ2N1cCcsICdpbnQnLCAndGhlcmU0JywgJ3NpbScsICdjb25nJywgJ2FzeW1wJywgJ25lJywgJ2VxdWl2JywgJ2xlJywgJ2dlJywgJ3N1YicsICdzdXAnLCAnbnN1YicsICdzdWJlJywgJ3N1cGUnLCAnb3BsdXMnLCAnb3RpbWVzJywgJ3BlcnAnLCAnc2RvdCcsICdsY2VpbCcsICdyY2VpbCcsICdsZmxvb3InLCAncmZsb29yJywgJ2xhbmcnLCAncmFuZycsICdsb3onLCAnc3BhZGVzJywgJ2NsdWJzJywgJ2hlYXJ0cycsICdkaWFtcyddO1xudmFyIEhUTUxfQ09ERVMgPSBbMzksIDE2MCwgMTYxLCAxNjIsIDE2MywgMTY0LCAxNjUsIDE2NiwgMTY3LCAxNjgsIDE2OSwgMTcwLCAxNzEsIDE3MiwgMTczLCAxNzQsIDE3NSwgMTc2LCAxNzcsIDE3OCwgMTc5LCAxODAsIDE4MSwgMTgyLCAxODMsIDE4NCwgMTg1LCAxODYsIDE4NywgMTg4LCAxODksIDE5MCwgMTkxLCAxOTIsIDE5MywgMTk0LCAxOTUsIDE5NiwgMTk3LCAxOTgsIDE5OSwgMjAwLCAyMDEsIDIwMiwgMjAzLCAyMDQsIDIwNSwgMjA2LCAyMDcsIDIwOCwgMjA5LCAyMTAsIDIxMSwgMjEyLCAyMTMsIDIxNCwgMjE1LCAyMTYsIDIxNywgMjE4LCAyMTksIDIyMCwgMjIxLCAyMjIsIDIyMywgMjI0LCAyMjUsIDIyNiwgMjI3LCAyMjgsIDIyOSwgMjMwLCAyMzEsIDIzMiwgMjMzLCAyMzQsIDIzNSwgMjM2LCAyMzcsIDIzOCwgMjM5LCAyNDAsIDI0MSwgMjQyLCAyNDMsIDI0NCwgMjQ1LCAyNDYsIDI0NywgMjQ4LCAyNDksIDI1MCwgMjUxLCAyNTIsIDI1MywgMjU0LCAyNTUsIDM0LCAzOCwgNjAsIDYyLCAzMzgsIDMzOSwgMzUyLCAzNTMsIDM3NiwgNzEwLCA3MzIsIDgxOTQsIDgxOTUsIDgyMDEsIDgyMDQsIDgyMDUsIDgyMDYsIDgyMDcsIDgyMTEsIDgyMTIsIDgyMTYsIDgyMTcsIDgyMTgsIDgyMjAsIDgyMjEsIDgyMjIsIDgyMjQsIDgyMjUsIDgyNDAsIDgyNDksIDgyNTAsIDgzNjQsIDQwMiwgOTEzLCA5MTQsIDkxNSwgOTE2LCA5MTcsIDkxOCwgOTE5LCA5MjAsIDkyMSwgOTIyLCA5MjMsIDkyNCwgOTI1LCA5MjYsIDkyNywgOTI4LCA5MjksIDkzMSwgOTMyLCA5MzMsIDkzNCwgOTM1LCA5MzYsIDkzNywgOTQ1LCA5NDYsIDk0NywgOTQ4LCA5NDksIDk1MCwgOTUxLCA5NTIsIDk1MywgOTU0LCA5NTUsIDk1NiwgOTU3LCA5NTgsIDk1OSwgOTYwLCA5NjEsIDk2MiwgOTYzLCA5NjQsIDk2NSwgOTY2LCA5NjcsIDk2OCwgOTY5LCA5NzcsIDk3OCwgOTgyLCA4MjI2LCA4MjMwLCA4MjQyLCA4MjQzLCA4MjU0LCA4MjYwLCA4NDcyLCA4NDY1LCA4NDc2LCA4NDgyLCA4NTAxLCA4NTkyLCA4NTkzLCA4NTk0LCA4NTk1LCA4NTk2LCA4NjI5LCA4NjU2LCA4NjU3LCA4NjU4LCA4NjU5LCA4NjYwLCA4NzA0LCA4NzA2LCA4NzA3LCA4NzA5LCA4NzExLCA4NzEyLCA4NzEzLCA4NzE1LCA4NzE5LCA4NzIxLCA4NzIyLCA4NzI3LCA4NzMwLCA4NzMzLCA4NzM0LCA4NzM2LCA4NzQzLCA4NzQ0LCA4NzQ1LCA4NzQ2LCA4NzQ3LCA4NzU2LCA4NzY0LCA4NzczLCA4Nzc2LCA4ODAwLCA4ODAxLCA4ODA0LCA4ODA1LCA4ODM0LCA4ODM1LCA4ODM2LCA4ODM4LCA4ODM5LCA4ODUzLCA4ODU1LCA4ODY5LCA4OTAxLCA4OTY4LCA4OTY5LCA4OTcwLCA4OTcxLCA5MDAxLCA5MDAyLCA5Njc0LCA5ODI0LCA5ODI3LCA5ODI5LCA5ODMwXTtcbnZhciBhbHBoYUluZGV4ID0ge307XG52YXIgbnVtSW5kZXggPSB7fTtcbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW5ndGggPSBIVE1MX0FMUEhBLmxlbmd0aDtcbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgYSA9IEhUTUxfQUxQSEFbaV07XG4gICAgICAgIHZhciBjID0gSFRNTF9DT0RFU1tpXTtcbiAgICAgICAgYWxwaGFJbmRleFthXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgICAgIG51bUluZGV4W2NdID0gYTtcbiAgICAgICAgaSsrO1xuICAgIH1cbn0pKCk7XG52YXIgSHRtbDRFbnRpdGllcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdG1sNEVudGl0aWVzKCkge1xuICAgIH1cbiAgICBIdG1sNEVudGl0aWVzLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mKCM/W1xcd1xcZF0rKTs/L2csIGZ1bmN0aW9uIChzLCBlbnRpdHkpIHtcbiAgICAgICAgICAgIHZhciBjaHI7XG4gICAgICAgICAgICBpZiAoZW50aXR5LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGVudGl0eS5jaGFyQXQoMSkudG9Mb3dlckNhc2UoKSA9PT0gJ3gnID9cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigyKSwgMTYpIDpcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigxKSk7XG4gICAgICAgICAgICAgICAgaWYgKCEoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNociA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hyID0gYWxwaGFJbmRleFtlbnRpdHldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNociB8fCBzO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEh0bWw0RW50aXRpZXMuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gbmV3IEh0bWw0RW50aXRpZXMoKS5kZWNvZGUoc3RyKTtcbiAgICB9O1xuICAgIEh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgYWxwaGEgPSBudW1JbmRleFtzdHIuY2hhckNvZGVBdChpKV07XG4gICAgICAgICAgICByZXN1bHQgKz0gYWxwaGEgPyBcIiZcIiArIGFscGhhICsgXCI7XCIgOiBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBIdG1sNEVudGl0aWVzLmVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZW5jb2RlKHN0cik7XG4gICAgfTtcbiAgICBIdG1sNEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGNjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICB2YXIgYWxwaGEgPSBudW1JbmRleFtjY107XG4gICAgICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCImXCIgKyBhbHBoYSArIFwiO1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2MgPCAzMiB8fCBjYyA+IDEyNikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiYjXCIgKyBjYyArIFwiO1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIEh0bWw0RW50aXRpZXMuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gbmV3IEh0bWw0RW50aXRpZXMoKS5lbmNvZGVOb25VVEYoc3RyKTtcbiAgICB9O1xuICAgIEh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBpZiAoIXN0ciB8fCAhc3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICBpZiAoYyA8PSAyNTUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gc3RyW2krK107XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIEh0bWw0RW50aXRpZXMuZW5jb2RlTm9uQVNDSUkgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBuZXcgSHRtbDRFbnRpdGllcygpLmVuY29kZU5vbkFTQ0lJKHN0cik7XG4gICAgfTtcbiAgICByZXR1cm4gSHRtbDRFbnRpdGllcztcbn0oKSk7XG5leHBvcnRzLkh0bWw0RW50aXRpZXMgPSBIdG1sNEVudGl0aWVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRU5USVRJRVMgPSBbWydBYWN1dGUnLCBbMTkzXV0sIFsnYWFjdXRlJywgWzIyNV1dLCBbJ0FicmV2ZScsIFsyNThdXSwgWydhYnJldmUnLCBbMjU5XV0sIFsnYWMnLCBbODc2Nl1dLCBbJ2FjZCcsIFs4NzY3XV0sIFsnYWNFJywgWzg3NjYsIDgxOV1dLCBbJ0FjaXJjJywgWzE5NF1dLCBbJ2FjaXJjJywgWzIyNl1dLCBbJ2FjdXRlJywgWzE4MF1dLCBbJ0FjeScsIFsxMDQwXV0sIFsnYWN5JywgWzEwNzJdXSwgWydBRWxpZycsIFsxOThdXSwgWydhZWxpZycsIFsyMzBdXSwgWydhZicsIFs4Mjg5XV0sIFsnQWZyJywgWzEyMDA2OF1dLCBbJ2FmcicsIFsxMjAwOTRdXSwgWydBZ3JhdmUnLCBbMTkyXV0sIFsnYWdyYXZlJywgWzIyNF1dLCBbJ2FsZWZzeW0nLCBbODUwMV1dLCBbJ2FsZXBoJywgWzg1MDFdXSwgWydBbHBoYScsIFs5MTNdXSwgWydhbHBoYScsIFs5NDVdXSwgWydBbWFjcicsIFsyNTZdXSwgWydhbWFjcicsIFsyNTddXSwgWydhbWFsZycsIFsxMDgxNV1dLCBbJ2FtcCcsIFszOF1dLCBbJ0FNUCcsIFszOF1dLCBbJ2FuZGFuZCcsIFsxMDgzN11dLCBbJ0FuZCcsIFsxMDgzNV1dLCBbJ2FuZCcsIFs4NzQzXV0sIFsnYW5kZCcsIFsxMDg0NF1dLCBbJ2FuZHNsb3BlJywgWzEwODQwXV0sIFsnYW5kdicsIFsxMDg0Ml1dLCBbJ2FuZycsIFs4NzM2XV0sIFsnYW5nZScsIFsxMDY2MF1dLCBbJ2FuZ2xlJywgWzg3MzZdXSwgWydhbmdtc2RhYScsIFsxMDY2NF1dLCBbJ2FuZ21zZGFiJywgWzEwNjY1XV0sIFsnYW5nbXNkYWMnLCBbMTA2NjZdXSwgWydhbmdtc2RhZCcsIFsxMDY2N11dLCBbJ2FuZ21zZGFlJywgWzEwNjY4XV0sIFsnYW5nbXNkYWYnLCBbMTA2NjldXSwgWydhbmdtc2RhZycsIFsxMDY3MF1dLCBbJ2FuZ21zZGFoJywgWzEwNjcxXV0sIFsnYW5nbXNkJywgWzg3MzddXSwgWydhbmdydCcsIFs4NzM1XV0sIFsnYW5ncnR2YicsIFs4ODk0XV0sIFsnYW5ncnR2YmQnLCBbMTA2NTNdXSwgWydhbmdzcGgnLCBbODczOF1dLCBbJ2FuZ3N0JywgWzE5N11dLCBbJ2FuZ3phcnInLCBbOTA4NF1dLCBbJ0FvZ29uJywgWzI2MF1dLCBbJ2FvZ29uJywgWzI2MV1dLCBbJ0FvcGYnLCBbMTIwMTIwXV0sIFsnYW9wZicsIFsxMjAxNDZdXSwgWydhcGFjaXInLCBbMTA4NjNdXSwgWydhcCcsIFs4Nzc2XV0sIFsnYXBFJywgWzEwODY0XV0sIFsnYXBlJywgWzg3NzhdXSwgWydhcGlkJywgWzg3NzldXSwgWydhcG9zJywgWzM5XV0sIFsnQXBwbHlGdW5jdGlvbicsIFs4Mjg5XV0sIFsnYXBwcm94JywgWzg3NzZdXSwgWydhcHByb3hlcScsIFs4Nzc4XV0sIFsnQXJpbmcnLCBbMTk3XV0sIFsnYXJpbmcnLCBbMjI5XV0sIFsnQXNjcicsIFsxMTk5NjRdXSwgWydhc2NyJywgWzExOTk5MF1dLCBbJ0Fzc2lnbicsIFs4Nzg4XV0sIFsnYXN0JywgWzQyXV0sIFsnYXN5bXAnLCBbODc3Nl1dLCBbJ2FzeW1wZXEnLCBbODc4MV1dLCBbJ0F0aWxkZScsIFsxOTVdXSwgWydhdGlsZGUnLCBbMjI3XV0sIFsnQXVtbCcsIFsxOTZdXSwgWydhdW1sJywgWzIyOF1dLCBbJ2F3Y29uaW50JywgWzg3NTVdXSwgWydhd2ludCcsIFsxMDc2OV1dLCBbJ2JhY2tjb25nJywgWzg3ODBdXSwgWydiYWNrZXBzaWxvbicsIFsxMDE0XV0sIFsnYmFja3ByaW1lJywgWzgyNDVdXSwgWydiYWNrc2ltJywgWzg3NjVdXSwgWydiYWNrc2ltZXEnLCBbODkwOV1dLCBbJ0JhY2tzbGFzaCcsIFs4NzI2XV0sIFsnQmFydicsIFsxMDk4M11dLCBbJ2JhcnZlZScsIFs4ODkzXV0sIFsnYmFyd2VkJywgWzg5NjVdXSwgWydCYXJ3ZWQnLCBbODk2Nl1dLCBbJ2JhcndlZGdlJywgWzg5NjVdXSwgWydiYnJrJywgWzkxNDFdXSwgWydiYnJrdGJyaycsIFs5MTQyXV0sIFsnYmNvbmcnLCBbODc4MF1dLCBbJ0JjeScsIFsxMDQxXV0sIFsnYmN5JywgWzEwNzNdXSwgWydiZHF1bycsIFs4MjIyXV0sIFsnYmVjYXVzJywgWzg3NTddXSwgWydiZWNhdXNlJywgWzg3NTddXSwgWydCZWNhdXNlJywgWzg3NTddXSwgWydiZW1wdHl2JywgWzEwNjcyXV0sIFsnYmVwc2knLCBbMTAxNF1dLCBbJ2Jlcm5vdScsIFs4NDkyXV0sIFsnQmVybm91bGxpcycsIFs4NDkyXV0sIFsnQmV0YScsIFs5MTRdXSwgWydiZXRhJywgWzk0Nl1dLCBbJ2JldGgnLCBbODUwMl1dLCBbJ2JldHdlZW4nLCBbODgxMl1dLCBbJ0JmcicsIFsxMjAwNjldXSwgWydiZnInLCBbMTIwMDk1XV0sIFsnYmlnY2FwJywgWzg4OThdXSwgWydiaWdjaXJjJywgWzk3MTFdXSwgWydiaWdjdXAnLCBbODg5OV1dLCBbJ2JpZ29kb3QnLCBbMTA3NTJdXSwgWydiaWdvcGx1cycsIFsxMDc1M11dLCBbJ2JpZ290aW1lcycsIFsxMDc1NF1dLCBbJ2JpZ3NxY3VwJywgWzEwNzU4XV0sIFsnYmlnc3RhcicsIFs5NzMzXV0sIFsnYmlndHJpYW5nbGVkb3duJywgWzk2NjFdXSwgWydiaWd0cmlhbmdsZXVwJywgWzk2NTFdXSwgWydiaWd1cGx1cycsIFsxMDc1Nl1dLCBbJ2JpZ3ZlZScsIFs4ODk3XV0sIFsnYmlnd2VkZ2UnLCBbODg5Nl1dLCBbJ2JrYXJvdycsIFsxMDUwOV1dLCBbJ2JsYWNrbG96ZW5nZScsIFsxMDczMV1dLCBbJ2JsYWNrc3F1YXJlJywgWzk2NDJdXSwgWydibGFja3RyaWFuZ2xlJywgWzk2NTJdXSwgWydibGFja3RyaWFuZ2xlZG93bicsIFs5NjYyXV0sIFsnYmxhY2t0cmlhbmdsZWxlZnQnLCBbOTY2Nl1dLCBbJ2JsYWNrdHJpYW5nbGVyaWdodCcsIFs5NjU2XV0sIFsnYmxhbmsnLCBbOTI1MV1dLCBbJ2JsazEyJywgWzk2MThdXSwgWydibGsxNCcsIFs5NjE3XV0sIFsnYmxrMzQnLCBbOTYxOV1dLCBbJ2Jsb2NrJywgWzk2MDhdXSwgWydibmUnLCBbNjEsIDg0MjFdXSwgWydibmVxdWl2JywgWzg4MDEsIDg0MjFdXSwgWydiTm90JywgWzEwOTg5XV0sIFsnYm5vdCcsIFs4OTc2XV0sIFsnQm9wZicsIFsxMjAxMjFdXSwgWydib3BmJywgWzEyMDE0N11dLCBbJ2JvdCcsIFs4ODY5XV0sIFsnYm90dG9tJywgWzg4NjldXSwgWydib3d0aWUnLCBbODkwNF1dLCBbJ2JveGJveCcsIFsxMDY5N11dLCBbJ2JveGRsJywgWzk0ODhdXSwgWydib3hkTCcsIFs5NTU3XV0sIFsnYm94RGwnLCBbOTU1OF1dLCBbJ2JveERMJywgWzk1NTldXSwgWydib3hkcicsIFs5NDg0XV0sIFsnYm94ZFInLCBbOTU1NF1dLCBbJ2JveERyJywgWzk1NTVdXSwgWydib3hEUicsIFs5NTU2XV0sIFsnYm94aCcsIFs5NDcyXV0sIFsnYm94SCcsIFs5NTUyXV0sIFsnYm94aGQnLCBbOTUxNl1dLCBbJ2JveEhkJywgWzk1NzJdXSwgWydib3hoRCcsIFs5NTczXV0sIFsnYm94SEQnLCBbOTU3NF1dLCBbJ2JveGh1JywgWzk1MjRdXSwgWydib3hIdScsIFs5NTc1XV0sIFsnYm94aFUnLCBbOTU3Nl1dLCBbJ2JveEhVJywgWzk1NzddXSwgWydib3htaW51cycsIFs4ODYzXV0sIFsnYm94cGx1cycsIFs4ODYyXV0sIFsnYm94dGltZXMnLCBbODg2NF1dLCBbJ2JveHVsJywgWzk0OTZdXSwgWydib3h1TCcsIFs5NTYzXV0sIFsnYm94VWwnLCBbOTU2NF1dLCBbJ2JveFVMJywgWzk1NjVdXSwgWydib3h1cicsIFs5NDkyXV0sIFsnYm94dVInLCBbOTU2MF1dLCBbJ2JveFVyJywgWzk1NjFdXSwgWydib3hVUicsIFs5NTYyXV0sIFsnYm94dicsIFs5NDc0XV0sIFsnYm94VicsIFs5NTUzXV0sIFsnYm94dmgnLCBbOTUzMl1dLCBbJ2JveHZIJywgWzk1NzhdXSwgWydib3hWaCcsIFs5NTc5XV0sIFsnYm94VkgnLCBbOTU4MF1dLCBbJ2JveHZsJywgWzk1MDhdXSwgWydib3h2TCcsIFs5NTY5XV0sIFsnYm94VmwnLCBbOTU3MF1dLCBbJ2JveFZMJywgWzk1NzFdXSwgWydib3h2cicsIFs5NTAwXV0sIFsnYm94dlInLCBbOTU2Nl1dLCBbJ2JveFZyJywgWzk1NjddXSwgWydib3hWUicsIFs5NTY4XV0sIFsnYnByaW1lJywgWzgyNDVdXSwgWydicmV2ZScsIFs3MjhdXSwgWydCcmV2ZScsIFs3MjhdXSwgWydicnZiYXInLCBbMTY2XV0sIFsnYnNjcicsIFsxMTk5OTFdXSwgWydCc2NyJywgWzg0OTJdXSwgWydic2VtaScsIFs4MjcxXV0sIFsnYnNpbScsIFs4NzY1XV0sIFsnYnNpbWUnLCBbODkwOV1dLCBbJ2Jzb2xiJywgWzEwNjkzXV0sIFsnYnNvbCcsIFs5Ml1dLCBbJ2Jzb2xoc3ViJywgWzEwMTg0XV0sIFsnYnVsbCcsIFs4MjI2XV0sIFsnYnVsbGV0JywgWzgyMjZdXSwgWydidW1wJywgWzg3ODJdXSwgWydidW1wRScsIFsxMDkyNl1dLCBbJ2J1bXBlJywgWzg3ODNdXSwgWydCdW1wZXEnLCBbODc4Ml1dLCBbJ2J1bXBlcScsIFs4NzgzXV0sIFsnQ2FjdXRlJywgWzI2Ml1dLCBbJ2NhY3V0ZScsIFsyNjNdXSwgWydjYXBhbmQnLCBbMTA4MjBdXSwgWydjYXBicmN1cCcsIFsxMDgyNV1dLCBbJ2NhcGNhcCcsIFsxMDgyN11dLCBbJ2NhcCcsIFs4NzQ1XV0sIFsnQ2FwJywgWzg5MTRdXSwgWydjYXBjdXAnLCBbMTA4MjNdXSwgWydjYXBkb3QnLCBbMTA4MTZdXSwgWydDYXBpdGFsRGlmZmVyZW50aWFsRCcsIFs4NTE3XV0sIFsnY2FwcycsIFs4NzQ1LCA2NTAyNF1dLCBbJ2NhcmV0JywgWzgyNTddXSwgWydjYXJvbicsIFs3MTFdXSwgWydDYXlsZXlzJywgWzg0OTNdXSwgWydjY2FwcycsIFsxMDgyOV1dLCBbJ0NjYXJvbicsIFsyNjhdXSwgWydjY2Fyb24nLCBbMjY5XV0sIFsnQ2NlZGlsJywgWzE5OV1dLCBbJ2NjZWRpbCcsIFsyMzFdXSwgWydDY2lyYycsIFsyNjRdXSwgWydjY2lyYycsIFsyNjVdXSwgWydDY29uaW50JywgWzg3NTJdXSwgWydjY3VwcycsIFsxMDgyOF1dLCBbJ2NjdXBzc20nLCBbMTA4MzJdXSwgWydDZG90JywgWzI2Nl1dLCBbJ2Nkb3QnLCBbMjY3XV0sIFsnY2VkaWwnLCBbMTg0XV0sIFsnQ2VkaWxsYScsIFsxODRdXSwgWydjZW1wdHl2JywgWzEwNjc0XV0sIFsnY2VudCcsIFsxNjJdXSwgWydjZW50ZXJkb3QnLCBbMTgzXV0sIFsnQ2VudGVyRG90JywgWzE4M11dLCBbJ2NmcicsIFsxMjAwOTZdXSwgWydDZnInLCBbODQ5M11dLCBbJ0NIY3knLCBbMTA2M11dLCBbJ2NoY3knLCBbMTA5NV1dLCBbJ2NoZWNrJywgWzEwMDAzXV0sIFsnY2hlY2ttYXJrJywgWzEwMDAzXV0sIFsnQ2hpJywgWzkzNV1dLCBbJ2NoaScsIFs5NjddXSwgWydjaXJjJywgWzcxMF1dLCBbJ2NpcmNlcScsIFs4NzkxXV0sIFsnY2lyY2xlYXJyb3dsZWZ0JywgWzg2MzRdXSwgWydjaXJjbGVhcnJvd3JpZ2h0JywgWzg2MzVdXSwgWydjaXJjbGVkYXN0JywgWzg4NTldXSwgWydjaXJjbGVkY2lyYycsIFs4ODU4XV0sIFsnY2lyY2xlZGRhc2gnLCBbODg2MV1dLCBbJ0NpcmNsZURvdCcsIFs4ODU3XV0sIFsnY2lyY2xlZFInLCBbMTc0XV0sIFsnY2lyY2xlZFMnLCBbOTQxNl1dLCBbJ0NpcmNsZU1pbnVzJywgWzg4NTRdXSwgWydDaXJjbGVQbHVzJywgWzg4NTNdXSwgWydDaXJjbGVUaW1lcycsIFs4ODU1XV0sIFsnY2lyJywgWzk2NzVdXSwgWydjaXJFJywgWzEwNjkxXV0sIFsnY2lyZScsIFs4NzkxXV0sIFsnY2lyZm5pbnQnLCBbMTA3NjhdXSwgWydjaXJtaWQnLCBbMTA5OTFdXSwgWydjaXJzY2lyJywgWzEwNjkwXV0sIFsnQ2xvY2t3aXNlQ29udG91ckludGVncmFsJywgWzg3NTRdXSwgWydjbHVicycsIFs5ODI3XV0sIFsnY2x1YnN1aXQnLCBbOTgyN11dLCBbJ2NvbG9uJywgWzU4XV0sIFsnQ29sb24nLCBbODc1OV1dLCBbJ0NvbG9uZScsIFsxMDg2OF1dLCBbJ2NvbG9uZScsIFs4Nzg4XV0sIFsnY29sb25lcScsIFs4Nzg4XV0sIFsnY29tbWEnLCBbNDRdXSwgWydjb21tYXQnLCBbNjRdXSwgWydjb21wJywgWzg3MDVdXSwgWydjb21wZm4nLCBbODcyOF1dLCBbJ2NvbXBsZW1lbnQnLCBbODcwNV1dLCBbJ2NvbXBsZXhlcycsIFs4NDUwXV0sIFsnY29uZycsIFs4NzczXV0sIFsnY29uZ2RvdCcsIFsxMDg2MV1dLCBbJ0NvbmdydWVudCcsIFs4ODAxXV0sIFsnY29uaW50JywgWzg3NTBdXSwgWydDb25pbnQnLCBbODc1MV1dLCBbJ0NvbnRvdXJJbnRlZ3JhbCcsIFs4NzUwXV0sIFsnY29wZicsIFsxMjAxNDhdXSwgWydDb3BmJywgWzg0NTBdXSwgWydjb3Byb2QnLCBbODcyMF1dLCBbJ0NvcHJvZHVjdCcsIFs4NzIwXV0sIFsnY29weScsIFsxNjldXSwgWydDT1BZJywgWzE2OV1dLCBbJ2NvcHlzcicsIFs4NDcxXV0sIFsnQ291bnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbCcsIFs4NzU1XV0sIFsnY3JhcnInLCBbODYyOV1dLCBbJ2Nyb3NzJywgWzEwMDA3XV0sIFsnQ3Jvc3MnLCBbMTA3OTldXSwgWydDc2NyJywgWzExOTk2Nl1dLCBbJ2NzY3InLCBbMTE5OTkyXV0sIFsnY3N1YicsIFsxMDk1OV1dLCBbJ2NzdWJlJywgWzEwOTYxXV0sIFsnY3N1cCcsIFsxMDk2MF1dLCBbJ2NzdXBlJywgWzEwOTYyXV0sIFsnY3Rkb3QnLCBbODk0M11dLCBbJ2N1ZGFycmwnLCBbMTA1NTJdXSwgWydjdWRhcnJyJywgWzEwNTQ5XV0sIFsnY3VlcHInLCBbODkyNl1dLCBbJ2N1ZXNjJywgWzg5MjddXSwgWydjdWxhcnInLCBbODYzMF1dLCBbJ2N1bGFycnAnLCBbMTA1NTddXSwgWydjdXBicmNhcCcsIFsxMDgyNF1dLCBbJ2N1cGNhcCcsIFsxMDgyMl1dLCBbJ0N1cENhcCcsIFs4NzgxXV0sIFsnY3VwJywgWzg3NDZdXSwgWydDdXAnLCBbODkxNV1dLCBbJ2N1cGN1cCcsIFsxMDgyNl1dLCBbJ2N1cGRvdCcsIFs4ODQ1XV0sIFsnY3Vwb3InLCBbMTA4MjFdXSwgWydjdXBzJywgWzg3NDYsIDY1MDI0XV0sIFsnY3VyYXJyJywgWzg2MzFdXSwgWydjdXJhcnJtJywgWzEwNTU2XV0sIFsnY3VybHllcXByZWMnLCBbODkyNl1dLCBbJ2N1cmx5ZXFzdWNjJywgWzg5MjddXSwgWydjdXJseXZlZScsIFs4OTEwXV0sIFsnY3VybHl3ZWRnZScsIFs4OTExXV0sIFsnY3VycmVuJywgWzE2NF1dLCBbJ2N1cnZlYXJyb3dsZWZ0JywgWzg2MzBdXSwgWydjdXJ2ZWFycm93cmlnaHQnLCBbODYzMV1dLCBbJ2N1dmVlJywgWzg5MTBdXSwgWydjdXdlZCcsIFs4OTExXV0sIFsnY3djb25pbnQnLCBbODc1NF1dLCBbJ2N3aW50JywgWzg3NTNdXSwgWydjeWxjdHknLCBbOTAwNV1dLCBbJ2RhZ2dlcicsIFs4MjI0XV0sIFsnRGFnZ2VyJywgWzgyMjVdXSwgWydkYWxldGgnLCBbODUwNF1dLCBbJ2RhcnInLCBbODU5NV1dLCBbJ0RhcnInLCBbODYwOV1dLCBbJ2RBcnInLCBbODY1OV1dLCBbJ2Rhc2gnLCBbODIwOF1dLCBbJ0Rhc2h2JywgWzEwOTgwXV0sIFsnZGFzaHYnLCBbODg2N11dLCBbJ2Ria2Fyb3cnLCBbMTA1MTFdXSwgWydkYmxhYycsIFs3MzNdXSwgWydEY2Fyb24nLCBbMjcwXV0sIFsnZGNhcm9uJywgWzI3MV1dLCBbJ0RjeScsIFsxMDQ0XV0sIFsnZGN5JywgWzEwNzZdXSwgWydkZGFnZ2VyJywgWzgyMjVdXSwgWydkZGFycicsIFs4NjUwXV0sIFsnREQnLCBbODUxN11dLCBbJ2RkJywgWzg1MThdXSwgWydERG90cmFoZCcsIFsxMDUxM11dLCBbJ2Rkb3RzZXEnLCBbMTA4NzFdXSwgWydkZWcnLCBbMTc2XV0sIFsnRGVsJywgWzg3MTFdXSwgWydEZWx0YScsIFs5MTZdXSwgWydkZWx0YScsIFs5NDhdXSwgWydkZW1wdHl2JywgWzEwNjczXV0sIFsnZGZpc2h0JywgWzEwNjIzXV0sIFsnRGZyJywgWzEyMDA3MV1dLCBbJ2RmcicsIFsxMjAwOTddXSwgWydkSGFyJywgWzEwNTk3XV0sIFsnZGhhcmwnLCBbODY0M11dLCBbJ2RoYXJyJywgWzg2NDJdXSwgWydEaWFjcml0aWNhbEFjdXRlJywgWzE4MF1dLCBbJ0RpYWNyaXRpY2FsRG90JywgWzcyOV1dLCBbJ0RpYWNyaXRpY2FsRG91YmxlQWN1dGUnLCBbNzMzXV0sIFsnRGlhY3JpdGljYWxHcmF2ZScsIFs5Nl1dLCBbJ0RpYWNyaXRpY2FsVGlsZGUnLCBbNzMyXV0sIFsnZGlhbScsIFs4OTAwXV0sIFsnZGlhbW9uZCcsIFs4OTAwXV0sIFsnRGlhbW9uZCcsIFs4OTAwXV0sIFsnZGlhbW9uZHN1aXQnLCBbOTgzMF1dLCBbJ2RpYW1zJywgWzk4MzBdXSwgWydkaWUnLCBbMTY4XV0sIFsnRGlmZmVyZW50aWFsRCcsIFs4NTE4XV0sIFsnZGlnYW1tYScsIFs5ODldXSwgWydkaXNpbicsIFs4OTQ2XV0sIFsnZGl2JywgWzI0N11dLCBbJ2RpdmlkZScsIFsyNDddXSwgWydkaXZpZGVvbnRpbWVzJywgWzg5MDNdXSwgWydkaXZvbngnLCBbODkwM11dLCBbJ0RKY3knLCBbMTAyNl1dLCBbJ2RqY3knLCBbMTEwNl1dLCBbJ2RsY29ybicsIFs4OTkwXV0sIFsnZGxjcm9wJywgWzg5NzNdXSwgWydkb2xsYXInLCBbMzZdXSwgWydEb3BmJywgWzEyMDEyM11dLCBbJ2RvcGYnLCBbMTIwMTQ5XV0sIFsnRG90JywgWzE2OF1dLCBbJ2RvdCcsIFs3MjldXSwgWydEb3REb3QnLCBbODQxMl1dLCBbJ2RvdGVxJywgWzg3ODRdXSwgWydkb3RlcWRvdCcsIFs4Nzg1XV0sIFsnRG90RXF1YWwnLCBbODc4NF1dLCBbJ2RvdG1pbnVzJywgWzg3NjBdXSwgWydkb3RwbHVzJywgWzg3MjRdXSwgWydkb3RzcXVhcmUnLCBbODg2NV1dLCBbJ2RvdWJsZWJhcndlZGdlJywgWzg5NjZdXSwgWydEb3VibGVDb250b3VySW50ZWdyYWwnLCBbODc1MV1dLCBbJ0RvdWJsZURvdCcsIFsxNjhdXSwgWydEb3VibGVEb3duQXJyb3cnLCBbODY1OV1dLCBbJ0RvdWJsZUxlZnRBcnJvdycsIFs4NjU2XV0sIFsnRG91YmxlTGVmdFJpZ2h0QXJyb3cnLCBbODY2MF1dLCBbJ0RvdWJsZUxlZnRUZWUnLCBbMTA5ODBdXSwgWydEb3VibGVMb25nTGVmdEFycm93JywgWzEwMjMyXV0sIFsnRG91YmxlTG9uZ0xlZnRSaWdodEFycm93JywgWzEwMjM0XV0sIFsnRG91YmxlTG9uZ1JpZ2h0QXJyb3cnLCBbMTAyMzNdXSwgWydEb3VibGVSaWdodEFycm93JywgWzg2NThdXSwgWydEb3VibGVSaWdodFRlZScsIFs4ODcyXV0sIFsnRG91YmxlVXBBcnJvdycsIFs4NjU3XV0sIFsnRG91YmxlVXBEb3duQXJyb3cnLCBbODY2MV1dLCBbJ0RvdWJsZVZlcnRpY2FsQmFyJywgWzg3NDFdXSwgWydEb3duQXJyb3dCYXInLCBbMTA1MTVdXSwgWydkb3duYXJyb3cnLCBbODU5NV1dLCBbJ0Rvd25BcnJvdycsIFs4NTk1XV0sIFsnRG93bmFycm93JywgWzg2NTldXSwgWydEb3duQXJyb3dVcEFycm93JywgWzg2OTNdXSwgWydEb3duQnJldmUnLCBbNzg1XV0sIFsnZG93bmRvd25hcnJvd3MnLCBbODY1MF1dLCBbJ2Rvd25oYXJwb29ubGVmdCcsIFs4NjQzXV0sIFsnZG93bmhhcnBvb25yaWdodCcsIFs4NjQyXV0sIFsnRG93bkxlZnRSaWdodFZlY3RvcicsIFsxMDU3Nl1dLCBbJ0Rvd25MZWZ0VGVlVmVjdG9yJywgWzEwNTkwXV0sIFsnRG93bkxlZnRWZWN0b3JCYXInLCBbMTA1ODJdXSwgWydEb3duTGVmdFZlY3RvcicsIFs4NjM3XV0sIFsnRG93blJpZ2h0VGVlVmVjdG9yJywgWzEwNTkxXV0sIFsnRG93blJpZ2h0VmVjdG9yQmFyJywgWzEwNTgzXV0sIFsnRG93blJpZ2h0VmVjdG9yJywgWzg2NDFdXSwgWydEb3duVGVlQXJyb3cnLCBbODYxNV1dLCBbJ0Rvd25UZWUnLCBbODg2OF1dLCBbJ2RyYmthcm93JywgWzEwNTEyXV0sIFsnZHJjb3JuJywgWzg5OTFdXSwgWydkcmNyb3AnLCBbODk3Ml1dLCBbJ0RzY3InLCBbMTE5OTY3XV0sIFsnZHNjcicsIFsxMTk5OTNdXSwgWydEU2N5JywgWzEwMjldXSwgWydkc2N5JywgWzExMDldXSwgWydkc29sJywgWzEwNzQyXV0sIFsnRHN0cm9rJywgWzI3Ml1dLCBbJ2RzdHJvaycsIFsyNzNdXSwgWydkdGRvdCcsIFs4OTQ1XV0sIFsnZHRyaScsIFs5NjYzXV0sIFsnZHRyaWYnLCBbOTY2Ml1dLCBbJ2R1YXJyJywgWzg2OTNdXSwgWydkdWhhcicsIFsxMDYwN11dLCBbJ2R3YW5nbGUnLCBbMTA2NjJdXSwgWydEWmN5JywgWzEwMzldXSwgWydkemN5JywgWzExMTldXSwgWydkemlncmFycicsIFsxMDIzOV1dLCBbJ0VhY3V0ZScsIFsyMDFdXSwgWydlYWN1dGUnLCBbMjMzXV0sIFsnZWFzdGVyJywgWzEwODYyXV0sIFsnRWNhcm9uJywgWzI4Ml1dLCBbJ2VjYXJvbicsIFsyODNdXSwgWydFY2lyYycsIFsyMDJdXSwgWydlY2lyYycsIFsyMzRdXSwgWydlY2lyJywgWzg3OTBdXSwgWydlY29sb24nLCBbODc4OV1dLCBbJ0VjeScsIFsxMDY5XV0sIFsnZWN5JywgWzExMDFdXSwgWydlRERvdCcsIFsxMDg3MV1dLCBbJ0Vkb3QnLCBbMjc4XV0sIFsnZWRvdCcsIFsyNzldXSwgWydlRG90JywgWzg3ODVdXSwgWydlZScsIFs4NTE5XV0sIFsnZWZEb3QnLCBbODc4Nl1dLCBbJ0VmcicsIFsxMjAwNzJdXSwgWydlZnInLCBbMTIwMDk4XV0sIFsnZWcnLCBbMTA5MDZdXSwgWydFZ3JhdmUnLCBbMjAwXV0sIFsnZWdyYXZlJywgWzIzMl1dLCBbJ2VncycsIFsxMDkwMl1dLCBbJ2Vnc2RvdCcsIFsxMDkwNF1dLCBbJ2VsJywgWzEwOTA1XV0sIFsnRWxlbWVudCcsIFs4NzEyXV0sIFsnZWxpbnRlcnMnLCBbOTE5MV1dLCBbJ2VsbCcsIFs4NDY3XV0sIFsnZWxzJywgWzEwOTAxXV0sIFsnZWxzZG90JywgWzEwOTAzXV0sIFsnRW1hY3InLCBbMjc0XV0sIFsnZW1hY3InLCBbMjc1XV0sIFsnZW1wdHknLCBbODcwOV1dLCBbJ2VtcHR5c2V0JywgWzg3MDldXSwgWydFbXB0eVNtYWxsU3F1YXJlJywgWzk3MjNdXSwgWydlbXB0eXYnLCBbODcwOV1dLCBbJ0VtcHR5VmVyeVNtYWxsU3F1YXJlJywgWzk2NDNdXSwgWydlbXNwMTMnLCBbODE5Nl1dLCBbJ2Vtc3AxNCcsIFs4MTk3XV0sIFsnZW1zcCcsIFs4MTk1XV0sIFsnRU5HJywgWzMzMF1dLCBbJ2VuZycsIFszMzFdXSwgWydlbnNwJywgWzgxOTRdXSwgWydFb2dvbicsIFsyODBdXSwgWydlb2dvbicsIFsyODFdXSwgWydFb3BmJywgWzEyMDEyNF1dLCBbJ2VvcGYnLCBbMTIwMTUwXV0sIFsnZXBhcicsIFs4OTE3XV0sIFsnZXBhcnNsJywgWzEwNzIzXV0sIFsnZXBsdXMnLCBbMTA4NjVdXSwgWydlcHNpJywgWzk0OV1dLCBbJ0Vwc2lsb24nLCBbOTE3XV0sIFsnZXBzaWxvbicsIFs5NDldXSwgWydlcHNpdicsIFsxMDEzXV0sIFsnZXFjaXJjJywgWzg3OTBdXSwgWydlcWNvbG9uJywgWzg3ODldXSwgWydlcXNpbScsIFs4NzcwXV0sIFsnZXFzbGFudGd0cicsIFsxMDkwMl1dLCBbJ2Vxc2xhbnRsZXNzJywgWzEwOTAxXV0sIFsnRXF1YWwnLCBbMTA4NjldXSwgWydlcXVhbHMnLCBbNjFdXSwgWydFcXVhbFRpbGRlJywgWzg3NzBdXSwgWydlcXVlc3QnLCBbODc5OV1dLCBbJ0VxdWlsaWJyaXVtJywgWzg2NTJdXSwgWydlcXVpdicsIFs4ODAxXV0sIFsnZXF1aXZERCcsIFsxMDg3Ml1dLCBbJ2VxdnBhcnNsJywgWzEwNzI1XV0sIFsnZXJhcnInLCBbMTA2MDldXSwgWydlckRvdCcsIFs4Nzg3XV0sIFsnZXNjcicsIFs4NDk1XV0sIFsnRXNjcicsIFs4NDk2XV0sIFsnZXNkb3QnLCBbODc4NF1dLCBbJ0VzaW0nLCBbMTA4NjddXSwgWydlc2ltJywgWzg3NzBdXSwgWydFdGEnLCBbOTE5XV0sIFsnZXRhJywgWzk1MV1dLCBbJ0VUSCcsIFsyMDhdXSwgWydldGgnLCBbMjQwXV0sIFsnRXVtbCcsIFsyMDNdXSwgWydldW1sJywgWzIzNV1dLCBbJ2V1cm8nLCBbODM2NF1dLCBbJ2V4Y2wnLCBbMzNdXSwgWydleGlzdCcsIFs4NzA3XV0sIFsnRXhpc3RzJywgWzg3MDddXSwgWydleHBlY3RhdGlvbicsIFs4NDk2XV0sIFsnZXhwb25lbnRpYWxlJywgWzg1MTldXSwgWydFeHBvbmVudGlhbEUnLCBbODUxOV1dLCBbJ2ZhbGxpbmdkb3RzZXEnLCBbODc4Nl1dLCBbJ0ZjeScsIFsxMDYwXV0sIFsnZmN5JywgWzEwOTJdXSwgWydmZW1hbGUnLCBbOTc5Ml1dLCBbJ2ZmaWxpZycsIFs2NDI1OV1dLCBbJ2ZmbGlnJywgWzY0MjU2XV0sIFsnZmZsbGlnJywgWzY0MjYwXV0sIFsnRmZyJywgWzEyMDA3M11dLCBbJ2ZmcicsIFsxMjAwOTldXSwgWydmaWxpZycsIFs2NDI1N11dLCBbJ0ZpbGxlZFNtYWxsU3F1YXJlJywgWzk3MjRdXSwgWydGaWxsZWRWZXJ5U21hbGxTcXVhcmUnLCBbOTY0Ml1dLCBbJ2ZqbGlnJywgWzEwMiwgMTA2XV0sIFsnZmxhdCcsIFs5ODM3XV0sIFsnZmxsaWcnLCBbNjQyNThdXSwgWydmbHRucycsIFs5NjQ5XV0sIFsnZm5vZicsIFs0MDJdXSwgWydGb3BmJywgWzEyMDEyNV1dLCBbJ2ZvcGYnLCBbMTIwMTUxXV0sIFsnZm9yYWxsJywgWzg3MDRdXSwgWydGb3JBbGwnLCBbODcwNF1dLCBbJ2ZvcmsnLCBbODkxNl1dLCBbJ2Zvcmt2JywgWzEwOTY5XV0sIFsnRm91cmllcnRyZicsIFs4NDk3XV0sIFsnZnBhcnRpbnQnLCBbMTA3NjVdXSwgWydmcmFjMTInLCBbMTg5XV0sIFsnZnJhYzEzJywgWzg1MzFdXSwgWydmcmFjMTQnLCBbMTg4XV0sIFsnZnJhYzE1JywgWzg1MzNdXSwgWydmcmFjMTYnLCBbODUzN11dLCBbJ2ZyYWMxOCcsIFs4NTM5XV0sIFsnZnJhYzIzJywgWzg1MzJdXSwgWydmcmFjMjUnLCBbODUzNF1dLCBbJ2ZyYWMzNCcsIFsxOTBdXSwgWydmcmFjMzUnLCBbODUzNV1dLCBbJ2ZyYWMzOCcsIFs4NTQwXV0sIFsnZnJhYzQ1JywgWzg1MzZdXSwgWydmcmFjNTYnLCBbODUzOF1dLCBbJ2ZyYWM1OCcsIFs4NTQxXV0sIFsnZnJhYzc4JywgWzg1NDJdXSwgWydmcmFzbCcsIFs4MjYwXV0sIFsnZnJvd24nLCBbODk5NF1dLCBbJ2ZzY3InLCBbMTE5OTk1XV0sIFsnRnNjcicsIFs4NDk3XV0sIFsnZ2FjdXRlJywgWzUwMV1dLCBbJ0dhbW1hJywgWzkxNV1dLCBbJ2dhbW1hJywgWzk0N11dLCBbJ0dhbW1hZCcsIFs5ODhdXSwgWydnYW1tYWQnLCBbOTg5XV0sIFsnZ2FwJywgWzEwODg2XV0sIFsnR2JyZXZlJywgWzI4Nl1dLCBbJ2dicmV2ZScsIFsyODddXSwgWydHY2VkaWwnLCBbMjkwXV0sIFsnR2NpcmMnLCBbMjg0XV0sIFsnZ2NpcmMnLCBbMjg1XV0sIFsnR2N5JywgWzEwNDNdXSwgWydnY3knLCBbMTA3NV1dLCBbJ0dkb3QnLCBbMjg4XV0sIFsnZ2RvdCcsIFsyODldXSwgWydnZScsIFs4ODA1XV0sIFsnZ0UnLCBbODgwN11dLCBbJ2dFbCcsIFsxMDg5Ml1dLCBbJ2dlbCcsIFs4OTIzXV0sIFsnZ2VxJywgWzg4MDVdXSwgWydnZXFxJywgWzg4MDddXSwgWydnZXFzbGFudCcsIFsxMDg3OF1dLCBbJ2dlc2NjJywgWzEwOTIxXV0sIFsnZ2VzJywgWzEwODc4XV0sIFsnZ2VzZG90JywgWzEwODgwXV0sIFsnZ2VzZG90bycsIFsxMDg4Ml1dLCBbJ2dlc2RvdG9sJywgWzEwODg0XV0sIFsnZ2VzbCcsIFs4OTIzLCA2NTAyNF1dLCBbJ2dlc2xlcycsIFsxMDkwMF1dLCBbJ0dmcicsIFsxMjAwNzRdXSwgWydnZnInLCBbMTIwMTAwXV0sIFsnZ2cnLCBbODgxMV1dLCBbJ0dnJywgWzg5MjFdXSwgWydnZ2cnLCBbODkyMV1dLCBbJ2dpbWVsJywgWzg1MDNdXSwgWydHSmN5JywgWzEwMjddXSwgWydnamN5JywgWzExMDddXSwgWydnbGEnLCBbMTA5MTddXSwgWydnbCcsIFs4ODIzXV0sIFsnZ2xFJywgWzEwODk4XV0sIFsnZ2xqJywgWzEwOTE2XV0sIFsnZ25hcCcsIFsxMDg5MF1dLCBbJ2duYXBwcm94JywgWzEwODkwXV0sIFsnZ25lJywgWzEwODg4XV0sIFsnZ25FJywgWzg4MDldXSwgWydnbmVxJywgWzEwODg4XV0sIFsnZ25lcXEnLCBbODgwOV1dLCBbJ2duc2ltJywgWzg5MzVdXSwgWydHb3BmJywgWzEyMDEyNl1dLCBbJ2dvcGYnLCBbMTIwMTUyXV0sIFsnZ3JhdmUnLCBbOTZdXSwgWydHcmVhdGVyRXF1YWwnLCBbODgwNV1dLCBbJ0dyZWF0ZXJFcXVhbExlc3MnLCBbODkyM11dLCBbJ0dyZWF0ZXJGdWxsRXF1YWwnLCBbODgwN11dLCBbJ0dyZWF0ZXJHcmVhdGVyJywgWzEwOTE0XV0sIFsnR3JlYXRlckxlc3MnLCBbODgyM11dLCBbJ0dyZWF0ZXJTbGFudEVxdWFsJywgWzEwODc4XV0sIFsnR3JlYXRlclRpbGRlJywgWzg4MTldXSwgWydHc2NyJywgWzExOTk3MF1dLCBbJ2dzY3InLCBbODQ1OF1dLCBbJ2dzaW0nLCBbODgxOV1dLCBbJ2dzaW1lJywgWzEwODk0XV0sIFsnZ3NpbWwnLCBbMTA4OTZdXSwgWydndGNjJywgWzEwOTE5XV0sIFsnZ3RjaXInLCBbMTA4NzRdXSwgWydndCcsIFs2Ml1dLCBbJ0dUJywgWzYyXV0sIFsnR3QnLCBbODgxMV1dLCBbJ2d0ZG90JywgWzg5MTldXSwgWydndGxQYXInLCBbMTA2NDVdXSwgWydndHF1ZXN0JywgWzEwODc2XV0sIFsnZ3RyYXBwcm94JywgWzEwODg2XV0sIFsnZ3RyYXJyJywgWzEwNjE2XV0sIFsnZ3RyZG90JywgWzg5MTldXSwgWydndHJlcWxlc3MnLCBbODkyM11dLCBbJ2d0cmVxcWxlc3MnLCBbMTA4OTJdXSwgWydndHJsZXNzJywgWzg4MjNdXSwgWydndHJzaW0nLCBbODgxOV1dLCBbJ2d2ZXJ0bmVxcScsIFs4ODA5LCA2NTAyNF1dLCBbJ2d2bkUnLCBbODgwOSwgNjUwMjRdXSwgWydIYWNlaycsIFs3MTFdXSwgWydoYWlyc3AnLCBbODIwMl1dLCBbJ2hhbGYnLCBbMTg5XV0sIFsnaGFtaWx0JywgWzg0NTldXSwgWydIQVJEY3knLCBbMTA2Nl1dLCBbJ2hhcmRjeScsIFsxMDk4XV0sIFsnaGFycmNpcicsIFsxMDU2OF1dLCBbJ2hhcnInLCBbODU5Nl1dLCBbJ2hBcnInLCBbODY2MF1dLCBbJ2hhcnJ3JywgWzg2MjFdXSwgWydIYXQnLCBbOTRdXSwgWydoYmFyJywgWzg0NjNdXSwgWydIY2lyYycsIFsyOTJdXSwgWydoY2lyYycsIFsyOTNdXSwgWydoZWFydHMnLCBbOTgyOV1dLCBbJ2hlYXJ0c3VpdCcsIFs5ODI5XV0sIFsnaGVsbGlwJywgWzgyMzBdXSwgWydoZXJjb24nLCBbODg4OV1dLCBbJ2hmcicsIFsxMjAxMDFdXSwgWydIZnInLCBbODQ2MF1dLCBbJ0hpbGJlcnRTcGFjZScsIFs4NDU5XV0sIFsnaGtzZWFyb3cnLCBbMTA1MzNdXSwgWydoa3N3YXJvdycsIFsxMDUzNF1dLCBbJ2hvYXJyJywgWzg3MDNdXSwgWydob210aHQnLCBbODc2M11dLCBbJ2hvb2tsZWZ0YXJyb3cnLCBbODYxN11dLCBbJ2hvb2tyaWdodGFycm93JywgWzg2MThdXSwgWydob3BmJywgWzEyMDE1M11dLCBbJ0hvcGYnLCBbODQ2MV1dLCBbJ2hvcmJhcicsIFs4MjEzXV0sIFsnSG9yaXpvbnRhbExpbmUnLCBbOTQ3Ml1dLCBbJ2hzY3InLCBbMTE5OTk3XV0sIFsnSHNjcicsIFs4NDU5XV0sIFsnaHNsYXNoJywgWzg0NjNdXSwgWydIc3Ryb2snLCBbMjk0XV0sIFsnaHN0cm9rJywgWzI5NV1dLCBbJ0h1bXBEb3duSHVtcCcsIFs4NzgyXV0sIFsnSHVtcEVxdWFsJywgWzg3ODNdXSwgWydoeWJ1bGwnLCBbODI1OV1dLCBbJ2h5cGhlbicsIFs4MjA4XV0sIFsnSWFjdXRlJywgWzIwNV1dLCBbJ2lhY3V0ZScsIFsyMzddXSwgWydpYycsIFs4MjkxXV0sIFsnSWNpcmMnLCBbMjA2XV0sIFsnaWNpcmMnLCBbMjM4XV0sIFsnSWN5JywgWzEwNDhdXSwgWydpY3knLCBbMTA4MF1dLCBbJ0lkb3QnLCBbMzA0XV0sIFsnSUVjeScsIFsxMDQ1XV0sIFsnaWVjeScsIFsxMDc3XV0sIFsnaWV4Y2wnLCBbMTYxXV0sIFsnaWZmJywgWzg2NjBdXSwgWydpZnInLCBbMTIwMTAyXV0sIFsnSWZyJywgWzg0NjVdXSwgWydJZ3JhdmUnLCBbMjA0XV0sIFsnaWdyYXZlJywgWzIzNl1dLCBbJ2lpJywgWzg1MjBdXSwgWydpaWlpbnQnLCBbMTA3NjRdXSwgWydpaWludCcsIFs4NzQ5XV0sIFsnaWluZmluJywgWzEwNzE2XV0sIFsnaWlvdGEnLCBbODQ4OV1dLCBbJ0lKbGlnJywgWzMwNl1dLCBbJ2lqbGlnJywgWzMwN11dLCBbJ0ltYWNyJywgWzI5OF1dLCBbJ2ltYWNyJywgWzI5OV1dLCBbJ2ltYWdlJywgWzg0NjVdXSwgWydJbWFnaW5hcnlJJywgWzg1MjBdXSwgWydpbWFnbGluZScsIFs4NDY0XV0sIFsnaW1hZ3BhcnQnLCBbODQ2NV1dLCBbJ2ltYXRoJywgWzMwNV1dLCBbJ0ltJywgWzg0NjVdXSwgWydpbW9mJywgWzg4ODddXSwgWydpbXBlZCcsIFs0MzddXSwgWydJbXBsaWVzJywgWzg2NThdXSwgWydpbmNhcmUnLCBbODQ1M11dLCBbJ2luJywgWzg3MTJdXSwgWydpbmZpbicsIFs4NzM0XV0sIFsnaW5maW50aWUnLCBbMTA3MTddXSwgWydpbm9kb3QnLCBbMzA1XV0sIFsnaW50Y2FsJywgWzg4OTBdXSwgWydpbnQnLCBbODc0N11dLCBbJ0ludCcsIFs4NzQ4XV0sIFsnaW50ZWdlcnMnLCBbODQ4NF1dLCBbJ0ludGVncmFsJywgWzg3NDddXSwgWydpbnRlcmNhbCcsIFs4ODkwXV0sIFsnSW50ZXJzZWN0aW9uJywgWzg4OThdXSwgWydpbnRsYXJoaycsIFsxMDc3NV1dLCBbJ2ludHByb2QnLCBbMTA4MTJdXSwgWydJbnZpc2libGVDb21tYScsIFs4MjkxXV0sIFsnSW52aXNpYmxlVGltZXMnLCBbODI5MF1dLCBbJ0lPY3knLCBbMTAyNV1dLCBbJ2lvY3knLCBbMTEwNV1dLCBbJ0lvZ29uJywgWzMwMl1dLCBbJ2lvZ29uJywgWzMwM11dLCBbJ0lvcGYnLCBbMTIwMTI4XV0sIFsnaW9wZicsIFsxMjAxNTRdXSwgWydJb3RhJywgWzkyMV1dLCBbJ2lvdGEnLCBbOTUzXV0sIFsnaXByb2QnLCBbMTA4MTJdXSwgWydpcXVlc3QnLCBbMTkxXV0sIFsnaXNjcicsIFsxMTk5OThdXSwgWydJc2NyJywgWzg0NjRdXSwgWydpc2luJywgWzg3MTJdXSwgWydpc2luZG90JywgWzg5NDldXSwgWydpc2luRScsIFs4OTUzXV0sIFsnaXNpbnMnLCBbODk0OF1dLCBbJ2lzaW5zdicsIFs4OTQ3XV0sIFsnaXNpbnYnLCBbODcxMl1dLCBbJ2l0JywgWzgyOTBdXSwgWydJdGlsZGUnLCBbMjk2XV0sIFsnaXRpbGRlJywgWzI5N11dLCBbJ0l1a2N5JywgWzEwMzBdXSwgWydpdWtjeScsIFsxMTEwXV0sIFsnSXVtbCcsIFsyMDddXSwgWydpdW1sJywgWzIzOV1dLCBbJ0pjaXJjJywgWzMwOF1dLCBbJ2pjaXJjJywgWzMwOV1dLCBbJ0pjeScsIFsxMDQ5XV0sIFsnamN5JywgWzEwODFdXSwgWydKZnInLCBbMTIwMDc3XV0sIFsnamZyJywgWzEyMDEwM11dLCBbJ2ptYXRoJywgWzU2N11dLCBbJ0pvcGYnLCBbMTIwMTI5XV0sIFsnam9wZicsIFsxMjAxNTVdXSwgWydKc2NyJywgWzExOTk3M11dLCBbJ2pzY3InLCBbMTE5OTk5XV0sIFsnSnNlcmN5JywgWzEwMzJdXSwgWydqc2VyY3knLCBbMTExMl1dLCBbJ0p1a2N5JywgWzEwMjhdXSwgWydqdWtjeScsIFsxMTA4XV0sIFsnS2FwcGEnLCBbOTIyXV0sIFsna2FwcGEnLCBbOTU0XV0sIFsna2FwcGF2JywgWzEwMDhdXSwgWydLY2VkaWwnLCBbMzEwXV0sIFsna2NlZGlsJywgWzMxMV1dLCBbJ0tjeScsIFsxMDUwXV0sIFsna2N5JywgWzEwODJdXSwgWydLZnInLCBbMTIwMDc4XV0sIFsna2ZyJywgWzEyMDEwNF1dLCBbJ2tncmVlbicsIFszMTJdXSwgWydLSGN5JywgWzEwNjFdXSwgWydraGN5JywgWzEwOTNdXSwgWydLSmN5JywgWzEwMzZdXSwgWydramN5JywgWzExMTZdXSwgWydLb3BmJywgWzEyMDEzMF1dLCBbJ2tvcGYnLCBbMTIwMTU2XV0sIFsnS3NjcicsIFsxMTk5NzRdXSwgWydrc2NyJywgWzEyMDAwMF1dLCBbJ2xBYXJyJywgWzg2NjZdXSwgWydMYWN1dGUnLCBbMzEzXV0sIFsnbGFjdXRlJywgWzMxNF1dLCBbJ2xhZW1wdHl2JywgWzEwNjc2XV0sIFsnbGFncmFuJywgWzg0NjZdXSwgWydMYW1iZGEnLCBbOTIzXV0sIFsnbGFtYmRhJywgWzk1NV1dLCBbJ2xhbmcnLCBbMTAyMTZdXSwgWydMYW5nJywgWzEwMjE4XV0sIFsnbGFuZ2QnLCBbMTA2NDFdXSwgWydsYW5nbGUnLCBbMTAyMTZdXSwgWydsYXAnLCBbMTA4ODVdXSwgWydMYXBsYWNldHJmJywgWzg0NjZdXSwgWydsYXF1bycsIFsxNzFdXSwgWydsYXJyYicsIFs4Njc2XV0sIFsnbGFycmJmcycsIFsxMDUyN11dLCBbJ2xhcnInLCBbODU5Ml1dLCBbJ0xhcnInLCBbODYwNl1dLCBbJ2xBcnInLCBbODY1Nl1dLCBbJ2xhcnJmcycsIFsxMDUyNV1dLCBbJ2xhcnJoaycsIFs4NjE3XV0sIFsnbGFycmxwJywgWzg2MTldXSwgWydsYXJycGwnLCBbMTA1NTNdXSwgWydsYXJyc2ltJywgWzEwNjExXV0sIFsnbGFycnRsJywgWzg2MTBdXSwgWydsYXRhaWwnLCBbMTA1MjFdXSwgWydsQXRhaWwnLCBbMTA1MjNdXSwgWydsYXQnLCBbMTA5MjNdXSwgWydsYXRlJywgWzEwOTI1XV0sIFsnbGF0ZXMnLCBbMTA5MjUsIDY1MDI0XV0sIFsnbGJhcnInLCBbMTA1MDhdXSwgWydsQmFycicsIFsxMDUxMF1dLCBbJ2xiYnJrJywgWzEwMDk4XV0sIFsnbGJyYWNlJywgWzEyM11dLCBbJ2xicmFjaycsIFs5MV1dLCBbJ2xicmtlJywgWzEwNjM1XV0sIFsnbGJya3NsZCcsIFsxMDYzOV1dLCBbJ2xicmtzbHUnLCBbMTA2MzddXSwgWydMY2Fyb24nLCBbMzE3XV0sIFsnbGNhcm9uJywgWzMxOF1dLCBbJ0xjZWRpbCcsIFszMTVdXSwgWydsY2VkaWwnLCBbMzE2XV0sIFsnbGNlaWwnLCBbODk2OF1dLCBbJ2xjdWInLCBbMTIzXV0sIFsnTGN5JywgWzEwNTFdXSwgWydsY3knLCBbMTA4M11dLCBbJ2xkY2EnLCBbMTA1NTBdXSwgWydsZHF1bycsIFs4MjIwXV0sIFsnbGRxdW9yJywgWzgyMjJdXSwgWydsZHJkaGFyJywgWzEwNTk5XV0sIFsnbGRydXNoYXInLCBbMTA1NzFdXSwgWydsZHNoJywgWzg2MjZdXSwgWydsZScsIFs4ODA0XV0sIFsnbEUnLCBbODgwNl1dLCBbJ0xlZnRBbmdsZUJyYWNrZXQnLCBbMTAyMTZdXSwgWydMZWZ0QXJyb3dCYXInLCBbODY3Nl1dLCBbJ2xlZnRhcnJvdycsIFs4NTkyXV0sIFsnTGVmdEFycm93JywgWzg1OTJdXSwgWydMZWZ0YXJyb3cnLCBbODY1Nl1dLCBbJ0xlZnRBcnJvd1JpZ2h0QXJyb3cnLCBbODY0Nl1dLCBbJ2xlZnRhcnJvd3RhaWwnLCBbODYxMF1dLCBbJ0xlZnRDZWlsaW5nJywgWzg5NjhdXSwgWydMZWZ0RG91YmxlQnJhY2tldCcsIFsxMDIxNF1dLCBbJ0xlZnREb3duVGVlVmVjdG9yJywgWzEwNTkzXV0sIFsnTGVmdERvd25WZWN0b3JCYXInLCBbMTA1ODVdXSwgWydMZWZ0RG93blZlY3RvcicsIFs4NjQzXV0sIFsnTGVmdEZsb29yJywgWzg5NzBdXSwgWydsZWZ0aGFycG9vbmRvd24nLCBbODYzN11dLCBbJ2xlZnRoYXJwb29udXAnLCBbODYzNl1dLCBbJ2xlZnRsZWZ0YXJyb3dzJywgWzg2NDddXSwgWydsZWZ0cmlnaHRhcnJvdycsIFs4NTk2XV0sIFsnTGVmdFJpZ2h0QXJyb3cnLCBbODU5Nl1dLCBbJ0xlZnRyaWdodGFycm93JywgWzg2NjBdXSwgWydsZWZ0cmlnaHRhcnJvd3MnLCBbODY0Nl1dLCBbJ2xlZnRyaWdodGhhcnBvb25zJywgWzg2NTFdXSwgWydsZWZ0cmlnaHRzcXVpZ2Fycm93JywgWzg2MjFdXSwgWydMZWZ0UmlnaHRWZWN0b3InLCBbMTA1NzRdXSwgWydMZWZ0VGVlQXJyb3cnLCBbODYxMl1dLCBbJ0xlZnRUZWUnLCBbODg2N11dLCBbJ0xlZnRUZWVWZWN0b3InLCBbMTA1ODZdXSwgWydsZWZ0dGhyZWV0aW1lcycsIFs4OTA3XV0sIFsnTGVmdFRyaWFuZ2xlQmFyJywgWzEwNzAzXV0sIFsnTGVmdFRyaWFuZ2xlJywgWzg4ODJdXSwgWydMZWZ0VHJpYW5nbGVFcXVhbCcsIFs4ODg0XV0sIFsnTGVmdFVwRG93blZlY3RvcicsIFsxMDU3N11dLCBbJ0xlZnRVcFRlZVZlY3RvcicsIFsxMDU5Ml1dLCBbJ0xlZnRVcFZlY3RvckJhcicsIFsxMDU4NF1dLCBbJ0xlZnRVcFZlY3RvcicsIFs4NjM5XV0sIFsnTGVmdFZlY3RvckJhcicsIFsxMDU3OF1dLCBbJ0xlZnRWZWN0b3InLCBbODYzNl1dLCBbJ2xFZycsIFsxMDg5MV1dLCBbJ2xlZycsIFs4OTIyXV0sIFsnbGVxJywgWzg4MDRdXSwgWydsZXFxJywgWzg4MDZdXSwgWydsZXFzbGFudCcsIFsxMDg3N11dLCBbJ2xlc2NjJywgWzEwOTIwXV0sIFsnbGVzJywgWzEwODc3XV0sIFsnbGVzZG90JywgWzEwODc5XV0sIFsnbGVzZG90bycsIFsxMDg4MV1dLCBbJ2xlc2RvdG9yJywgWzEwODgzXV0sIFsnbGVzZycsIFs4OTIyLCA2NTAyNF1dLCBbJ2xlc2dlcycsIFsxMDg5OV1dLCBbJ2xlc3NhcHByb3gnLCBbMTA4ODVdXSwgWydsZXNzZG90JywgWzg5MThdXSwgWydsZXNzZXFndHInLCBbODkyMl1dLCBbJ2xlc3NlcXFndHInLCBbMTA4OTFdXSwgWydMZXNzRXF1YWxHcmVhdGVyJywgWzg5MjJdXSwgWydMZXNzRnVsbEVxdWFsJywgWzg4MDZdXSwgWydMZXNzR3JlYXRlcicsIFs4ODIyXV0sIFsnbGVzc2d0cicsIFs4ODIyXV0sIFsnTGVzc0xlc3MnLCBbMTA5MTNdXSwgWydsZXNzc2ltJywgWzg4MThdXSwgWydMZXNzU2xhbnRFcXVhbCcsIFsxMDg3N11dLCBbJ0xlc3NUaWxkZScsIFs4ODE4XV0sIFsnbGZpc2h0JywgWzEwNjIwXV0sIFsnbGZsb29yJywgWzg5NzBdXSwgWydMZnInLCBbMTIwMDc5XV0sIFsnbGZyJywgWzEyMDEwNV1dLCBbJ2xnJywgWzg4MjJdXSwgWydsZ0UnLCBbMTA4OTddXSwgWydsSGFyJywgWzEwNTk0XV0sIFsnbGhhcmQnLCBbODYzN11dLCBbJ2xoYXJ1JywgWzg2MzZdXSwgWydsaGFydWwnLCBbMTA2MDJdXSwgWydsaGJsaycsIFs5NjA0XV0sIFsnTEpjeScsIFsxMDMzXV0sIFsnbGpjeScsIFsxMTEzXV0sIFsnbGxhcnInLCBbODY0N11dLCBbJ2xsJywgWzg4MTBdXSwgWydMbCcsIFs4OTIwXV0sIFsnbGxjb3JuZXInLCBbODk5MF1dLCBbJ0xsZWZ0YXJyb3cnLCBbODY2Nl1dLCBbJ2xsaGFyZCcsIFsxMDYwM11dLCBbJ2xsdHJpJywgWzk3MjJdXSwgWydMbWlkb3QnLCBbMzE5XV0sIFsnbG1pZG90JywgWzMyMF1dLCBbJ2xtb3VzdGFjaGUnLCBbOTEzNl1dLCBbJ2xtb3VzdCcsIFs5MTM2XV0sIFsnbG5hcCcsIFsxMDg4OV1dLCBbJ2xuYXBwcm94JywgWzEwODg5XV0sIFsnbG5lJywgWzEwODg3XV0sIFsnbG5FJywgWzg4MDhdXSwgWydsbmVxJywgWzEwODg3XV0sIFsnbG5lcXEnLCBbODgwOF1dLCBbJ2xuc2ltJywgWzg5MzRdXSwgWydsb2FuZycsIFsxMDIyMF1dLCBbJ2xvYXJyJywgWzg3MDFdXSwgWydsb2JyaycsIFsxMDIxNF1dLCBbJ2xvbmdsZWZ0YXJyb3cnLCBbMTAyMjldXSwgWydMb25nTGVmdEFycm93JywgWzEwMjI5XV0sIFsnTG9uZ2xlZnRhcnJvdycsIFsxMDIzMl1dLCBbJ2xvbmdsZWZ0cmlnaHRhcnJvdycsIFsxMDIzMV1dLCBbJ0xvbmdMZWZ0UmlnaHRBcnJvdycsIFsxMDIzMV1dLCBbJ0xvbmdsZWZ0cmlnaHRhcnJvdycsIFsxMDIzNF1dLCBbJ2xvbmdtYXBzdG8nLCBbMTAyMzZdXSwgWydsb25ncmlnaHRhcnJvdycsIFsxMDIzMF1dLCBbJ0xvbmdSaWdodEFycm93JywgWzEwMjMwXV0sIFsnTG9uZ3JpZ2h0YXJyb3cnLCBbMTAyMzNdXSwgWydsb29wYXJyb3dsZWZ0JywgWzg2MTldXSwgWydsb29wYXJyb3dyaWdodCcsIFs4NjIwXV0sIFsnbG9wYXInLCBbMTA2MjldXSwgWydMb3BmJywgWzEyMDEzMV1dLCBbJ2xvcGYnLCBbMTIwMTU3XV0sIFsnbG9wbHVzJywgWzEwNzk3XV0sIFsnbG90aW1lcycsIFsxMDgwNF1dLCBbJ2xvd2FzdCcsIFs4NzI3XV0sIFsnbG93YmFyJywgWzk1XV0sIFsnTG93ZXJMZWZ0QXJyb3cnLCBbODYwMV1dLCBbJ0xvd2VyUmlnaHRBcnJvdycsIFs4NjAwXV0sIFsnbG96JywgWzk2NzRdXSwgWydsb3plbmdlJywgWzk2NzRdXSwgWydsb3pmJywgWzEwNzMxXV0sIFsnbHBhcicsIFs0MF1dLCBbJ2xwYXJsdCcsIFsxMDY0M11dLCBbJ2xyYXJyJywgWzg2NDZdXSwgWydscmNvcm5lcicsIFs4OTkxXV0sIFsnbHJoYXInLCBbODY1MV1dLCBbJ2xyaGFyZCcsIFsxMDYwNV1dLCBbJ2xybScsIFs4MjA2XV0sIFsnbHJ0cmknLCBbODg5NV1dLCBbJ2xzYXF1bycsIFs4MjQ5XV0sIFsnbHNjcicsIFsxMjAwMDFdXSwgWydMc2NyJywgWzg0NjZdXSwgWydsc2gnLCBbODYyNF1dLCBbJ0xzaCcsIFs4NjI0XV0sIFsnbHNpbScsIFs4ODE4XV0sIFsnbHNpbWUnLCBbMTA4OTNdXSwgWydsc2ltZycsIFsxMDg5NV1dLCBbJ2xzcWInLCBbOTFdXSwgWydsc3F1bycsIFs4MjE2XV0sIFsnbHNxdW9yJywgWzgyMThdXSwgWydMc3Ryb2snLCBbMzIxXV0sIFsnbHN0cm9rJywgWzMyMl1dLCBbJ2x0Y2MnLCBbMTA5MThdXSwgWydsdGNpcicsIFsxMDg3M11dLCBbJ2x0JywgWzYwXV0sIFsnTFQnLCBbNjBdXSwgWydMdCcsIFs4ODEwXV0sIFsnbHRkb3QnLCBbODkxOF1dLCBbJ2x0aHJlZScsIFs4OTA3XV0sIFsnbHRpbWVzJywgWzg5MDVdXSwgWydsdGxhcnInLCBbMTA2MTRdXSwgWydsdHF1ZXN0JywgWzEwODc1XV0sIFsnbHRyaScsIFs5NjY3XV0sIFsnbHRyaWUnLCBbODg4NF1dLCBbJ2x0cmlmJywgWzk2NjZdXSwgWydsdHJQYXInLCBbMTA2NDZdXSwgWydsdXJkc2hhcicsIFsxMDU3MF1dLCBbJ2x1cnVoYXInLCBbMTA1OThdXSwgWydsdmVydG5lcXEnLCBbODgwOCwgNjUwMjRdXSwgWydsdm5FJywgWzg4MDgsIDY1MDI0XV0sIFsnbWFjcicsIFsxNzVdXSwgWydtYWxlJywgWzk3OTRdXSwgWydtYWx0JywgWzEwMDE2XV0sIFsnbWFsdGVzZScsIFsxMDAxNl1dLCBbJ01hcCcsIFsxMDUwMV1dLCBbJ21hcCcsIFs4NjE0XV0sIFsnbWFwc3RvJywgWzg2MTRdXSwgWydtYXBzdG9kb3duJywgWzg2MTVdXSwgWydtYXBzdG9sZWZ0JywgWzg2MTJdXSwgWydtYXBzdG91cCcsIFs4NjEzXV0sIFsnbWFya2VyJywgWzk2NDZdXSwgWydtY29tbWEnLCBbMTA3OTNdXSwgWydNY3knLCBbMTA1Ml1dLCBbJ21jeScsIFsxMDg0XV0sIFsnbWRhc2gnLCBbODIxMl1dLCBbJ21ERG90JywgWzg3NjJdXSwgWydtZWFzdXJlZGFuZ2xlJywgWzg3MzddXSwgWydNZWRpdW1TcGFjZScsIFs4Mjg3XV0sIFsnTWVsbGludHJmJywgWzg0OTldXSwgWydNZnInLCBbMTIwMDgwXV0sIFsnbWZyJywgWzEyMDEwNl1dLCBbJ21obycsIFs4NDg3XV0sIFsnbWljcm8nLCBbMTgxXV0sIFsnbWlkYXN0JywgWzQyXV0sIFsnbWlkY2lyJywgWzEwOTkyXV0sIFsnbWlkJywgWzg3MzldXSwgWydtaWRkb3QnLCBbMTgzXV0sIFsnbWludXNiJywgWzg4NjNdXSwgWydtaW51cycsIFs4NzIyXV0sIFsnbWludXNkJywgWzg3NjBdXSwgWydtaW51c2R1JywgWzEwNzk0XV0sIFsnTWludXNQbHVzJywgWzg3MjNdXSwgWydtbGNwJywgWzEwOTcxXV0sIFsnbWxkcicsIFs4MjMwXV0sIFsnbW5wbHVzJywgWzg3MjNdXSwgWydtb2RlbHMnLCBbODg3MV1dLCBbJ01vcGYnLCBbMTIwMTMyXV0sIFsnbW9wZicsIFsxMjAxNThdXSwgWydtcCcsIFs4NzIzXV0sIFsnbXNjcicsIFsxMjAwMDJdXSwgWydNc2NyJywgWzg0OTldXSwgWydtc3Rwb3MnLCBbODc2Nl1dLCBbJ011JywgWzkyNF1dLCBbJ211JywgWzk1Nl1dLCBbJ211bHRpbWFwJywgWzg4ODhdXSwgWydtdW1hcCcsIFs4ODg4XV0sIFsnbmFibGEnLCBbODcxMV1dLCBbJ05hY3V0ZScsIFszMjNdXSwgWyduYWN1dGUnLCBbMzI0XV0sIFsnbmFuZycsIFs4NzM2LCA4NDAyXV0sIFsnbmFwJywgWzg3NzddXSwgWyduYXBFJywgWzEwODY0LCA4MjRdXSwgWyduYXBpZCcsIFs4Nzc5LCA4MjRdXSwgWyduYXBvcycsIFszMjldXSwgWyduYXBwcm94JywgWzg3NzddXSwgWyduYXR1cmFsJywgWzk4MzhdXSwgWyduYXR1cmFscycsIFs4NDY5XV0sIFsnbmF0dXInLCBbOTgzOF1dLCBbJ25ic3AnLCBbMTYwXV0sIFsnbmJ1bXAnLCBbODc4MiwgODI0XV0sIFsnbmJ1bXBlJywgWzg3ODMsIDgyNF1dLCBbJ25jYXAnLCBbMTA4MTldXSwgWydOY2Fyb24nLCBbMzI3XV0sIFsnbmNhcm9uJywgWzMyOF1dLCBbJ05jZWRpbCcsIFszMjVdXSwgWyduY2VkaWwnLCBbMzI2XV0sIFsnbmNvbmcnLCBbODc3NV1dLCBbJ25jb25nZG90JywgWzEwODYxLCA4MjRdXSwgWyduY3VwJywgWzEwODE4XV0sIFsnTmN5JywgWzEwNTNdXSwgWyduY3knLCBbMTA4NV1dLCBbJ25kYXNoJywgWzgyMTFdXSwgWyduZWFyaGsnLCBbMTA1MzJdXSwgWyduZWFycicsIFs4NTk5XV0sIFsnbmVBcnInLCBbODY2M11dLCBbJ25lYXJyb3cnLCBbODU5OV1dLCBbJ25lJywgWzg4MDBdXSwgWyduZWRvdCcsIFs4Nzg0LCA4MjRdXSwgWydOZWdhdGl2ZU1lZGl1bVNwYWNlJywgWzgyMDNdXSwgWydOZWdhdGl2ZVRoaWNrU3BhY2UnLCBbODIwM11dLCBbJ05lZ2F0aXZlVGhpblNwYWNlJywgWzgyMDNdXSwgWydOZWdhdGl2ZVZlcnlUaGluU3BhY2UnLCBbODIwM11dLCBbJ25lcXVpdicsIFs4ODAyXV0sIFsnbmVzZWFyJywgWzEwNTM2XV0sIFsnbmVzaW0nLCBbODc3MCwgODI0XV0sIFsnTmVzdGVkR3JlYXRlckdyZWF0ZXInLCBbODgxMV1dLCBbJ05lc3RlZExlc3NMZXNzJywgWzg4MTBdXSwgWyduZXhpc3QnLCBbODcwOF1dLCBbJ25leGlzdHMnLCBbODcwOF1dLCBbJ05mcicsIFsxMjAwODFdXSwgWyduZnInLCBbMTIwMTA3XV0sIFsnbmdFJywgWzg4MDcsIDgyNF1dLCBbJ25nZScsIFs4ODE3XV0sIFsnbmdlcScsIFs4ODE3XV0sIFsnbmdlcXEnLCBbODgwNywgODI0XV0sIFsnbmdlcXNsYW50JywgWzEwODc4LCA4MjRdXSwgWyduZ2VzJywgWzEwODc4LCA4MjRdXSwgWyduR2cnLCBbODkyMSwgODI0XV0sIFsnbmdzaW0nLCBbODgyMV1dLCBbJ25HdCcsIFs4ODExLCA4NDAyXV0sIFsnbmd0JywgWzg4MTVdXSwgWyduZ3RyJywgWzg4MTVdXSwgWyduR3R2JywgWzg4MTEsIDgyNF1dLCBbJ25oYXJyJywgWzg2MjJdXSwgWyduaEFycicsIFs4NjU0XV0sIFsnbmhwYXInLCBbMTA5OTRdXSwgWyduaScsIFs4NzE1XV0sIFsnbmlzJywgWzg5NTZdXSwgWyduaXNkJywgWzg5NTRdXSwgWyduaXYnLCBbODcxNV1dLCBbJ05KY3knLCBbMTAzNF1dLCBbJ25qY3knLCBbMTExNF1dLCBbJ25sYXJyJywgWzg2MDJdXSwgWydubEFycicsIFs4NjUzXV0sIFsnbmxkcicsIFs4MjI5XV0sIFsnbmxFJywgWzg4MDYsIDgyNF1dLCBbJ25sZScsIFs4ODE2XV0sIFsnbmxlZnRhcnJvdycsIFs4NjAyXV0sIFsnbkxlZnRhcnJvdycsIFs4NjUzXV0sIFsnbmxlZnRyaWdodGFycm93JywgWzg2MjJdXSwgWyduTGVmdHJpZ2h0YXJyb3cnLCBbODY1NF1dLCBbJ25sZXEnLCBbODgxNl1dLCBbJ25sZXFxJywgWzg4MDYsIDgyNF1dLCBbJ25sZXFzbGFudCcsIFsxMDg3NywgODI0XV0sIFsnbmxlcycsIFsxMDg3NywgODI0XV0sIFsnbmxlc3MnLCBbODgxNF1dLCBbJ25MbCcsIFs4OTIwLCA4MjRdXSwgWydubHNpbScsIFs4ODIwXV0sIFsnbkx0JywgWzg4MTAsIDg0MDJdXSwgWydubHQnLCBbODgxNF1dLCBbJ25sdHJpJywgWzg5MzhdXSwgWydubHRyaWUnLCBbODk0MF1dLCBbJ25MdHYnLCBbODgxMCwgODI0XV0sIFsnbm1pZCcsIFs4NzQwXV0sIFsnTm9CcmVhaycsIFs4Mjg4XV0sIFsnTm9uQnJlYWtpbmdTcGFjZScsIFsxNjBdXSwgWydub3BmJywgWzEyMDE1OV1dLCBbJ05vcGYnLCBbODQ2OV1dLCBbJ05vdCcsIFsxMDk4OF1dLCBbJ25vdCcsIFsxNzJdXSwgWydOb3RDb25ncnVlbnQnLCBbODgwMl1dLCBbJ05vdEN1cENhcCcsIFs4ODEzXV0sIFsnTm90RG91YmxlVmVydGljYWxCYXInLCBbODc0Ml1dLCBbJ05vdEVsZW1lbnQnLCBbODcxM11dLCBbJ05vdEVxdWFsJywgWzg4MDBdXSwgWydOb3RFcXVhbFRpbGRlJywgWzg3NzAsIDgyNF1dLCBbJ05vdEV4aXN0cycsIFs4NzA4XV0sIFsnTm90R3JlYXRlcicsIFs4ODE1XV0sIFsnTm90R3JlYXRlckVxdWFsJywgWzg4MTddXSwgWydOb3RHcmVhdGVyRnVsbEVxdWFsJywgWzg4MDcsIDgyNF1dLCBbJ05vdEdyZWF0ZXJHcmVhdGVyJywgWzg4MTEsIDgyNF1dLCBbJ05vdEdyZWF0ZXJMZXNzJywgWzg4MjVdXSwgWydOb3RHcmVhdGVyU2xhbnRFcXVhbCcsIFsxMDg3OCwgODI0XV0sIFsnTm90R3JlYXRlclRpbGRlJywgWzg4MjFdXSwgWydOb3RIdW1wRG93bkh1bXAnLCBbODc4MiwgODI0XV0sIFsnTm90SHVtcEVxdWFsJywgWzg3ODMsIDgyNF1dLCBbJ25vdGluJywgWzg3MTNdXSwgWydub3RpbmRvdCcsIFs4OTQ5LCA4MjRdXSwgWydub3RpbkUnLCBbODk1MywgODI0XV0sIFsnbm90aW52YScsIFs4NzEzXV0sIFsnbm90aW52YicsIFs4OTUxXV0sIFsnbm90aW52YycsIFs4OTUwXV0sIFsnTm90TGVmdFRyaWFuZ2xlQmFyJywgWzEwNzAzLCA4MjRdXSwgWydOb3RMZWZ0VHJpYW5nbGUnLCBbODkzOF1dLCBbJ05vdExlZnRUcmlhbmdsZUVxdWFsJywgWzg5NDBdXSwgWydOb3RMZXNzJywgWzg4MTRdXSwgWydOb3RMZXNzRXF1YWwnLCBbODgxNl1dLCBbJ05vdExlc3NHcmVhdGVyJywgWzg4MjRdXSwgWydOb3RMZXNzTGVzcycsIFs4ODEwLCA4MjRdXSwgWydOb3RMZXNzU2xhbnRFcXVhbCcsIFsxMDg3NywgODI0XV0sIFsnTm90TGVzc1RpbGRlJywgWzg4MjBdXSwgWydOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlcicsIFsxMDkxNCwgODI0XV0sIFsnTm90TmVzdGVkTGVzc0xlc3MnLCBbMTA5MTMsIDgyNF1dLCBbJ25vdG5pJywgWzg3MTZdXSwgWydub3RuaXZhJywgWzg3MTZdXSwgWydub3RuaXZiJywgWzg5NThdXSwgWydub3RuaXZjJywgWzg5NTddXSwgWydOb3RQcmVjZWRlcycsIFs4ODMyXV0sIFsnTm90UHJlY2VkZXNFcXVhbCcsIFsxMDkyNywgODI0XV0sIFsnTm90UHJlY2VkZXNTbGFudEVxdWFsJywgWzg5MjhdXSwgWydOb3RSZXZlcnNlRWxlbWVudCcsIFs4NzE2XV0sIFsnTm90UmlnaHRUcmlhbmdsZUJhcicsIFsxMDcwNCwgODI0XV0sIFsnTm90UmlnaHRUcmlhbmdsZScsIFs4OTM5XV0sIFsnTm90UmlnaHRUcmlhbmdsZUVxdWFsJywgWzg5NDFdXSwgWydOb3RTcXVhcmVTdWJzZXQnLCBbODg0NywgODI0XV0sIFsnTm90U3F1YXJlU3Vic2V0RXF1YWwnLCBbODkzMF1dLCBbJ05vdFNxdWFyZVN1cGVyc2V0JywgWzg4NDgsIDgyNF1dLCBbJ05vdFNxdWFyZVN1cGVyc2V0RXF1YWwnLCBbODkzMV1dLCBbJ05vdFN1YnNldCcsIFs4ODM0LCA4NDAyXV0sIFsnTm90U3Vic2V0RXF1YWwnLCBbODg0MF1dLCBbJ05vdFN1Y2NlZWRzJywgWzg4MzNdXSwgWydOb3RTdWNjZWVkc0VxdWFsJywgWzEwOTI4LCA4MjRdXSwgWydOb3RTdWNjZWVkc1NsYW50RXF1YWwnLCBbODkyOV1dLCBbJ05vdFN1Y2NlZWRzVGlsZGUnLCBbODgzMSwgODI0XV0sIFsnTm90U3VwZXJzZXQnLCBbODgzNSwgODQwMl1dLCBbJ05vdFN1cGVyc2V0RXF1YWwnLCBbODg0MV1dLCBbJ05vdFRpbGRlJywgWzg3NjldXSwgWydOb3RUaWxkZUVxdWFsJywgWzg3NzJdXSwgWydOb3RUaWxkZUZ1bGxFcXVhbCcsIFs4Nzc1XV0sIFsnTm90VGlsZGVUaWxkZScsIFs4Nzc3XV0sIFsnTm90VmVydGljYWxCYXInLCBbODc0MF1dLCBbJ25wYXJhbGxlbCcsIFs4NzQyXV0sIFsnbnBhcicsIFs4NzQyXV0sIFsnbnBhcnNsJywgWzExMDA1LCA4NDIxXV0sIFsnbnBhcnQnLCBbODcwNiwgODI0XV0sIFsnbnBvbGludCcsIFsxMDc3Ml1dLCBbJ25wcicsIFs4ODMyXV0sIFsnbnByY3VlJywgWzg5MjhdXSwgWyducHJlYycsIFs4ODMyXV0sIFsnbnByZWNlcScsIFsxMDkyNywgODI0XV0sIFsnbnByZScsIFsxMDkyNywgODI0XV0sIFsnbnJhcnJjJywgWzEwNTQ3LCA4MjRdXSwgWyducmFycicsIFs4NjAzXV0sIFsnbnJBcnInLCBbODY1NV1dLCBbJ25yYXJydycsIFs4NjA1LCA4MjRdXSwgWyducmlnaHRhcnJvdycsIFs4NjAzXV0sIFsnblJpZ2h0YXJyb3cnLCBbODY1NV1dLCBbJ25ydHJpJywgWzg5MzldXSwgWyducnRyaWUnLCBbODk0MV1dLCBbJ25zYycsIFs4ODMzXV0sIFsnbnNjY3VlJywgWzg5MjldXSwgWyduc2NlJywgWzEwOTI4LCA4MjRdXSwgWydOc2NyJywgWzExOTk3N11dLCBbJ25zY3InLCBbMTIwMDAzXV0sIFsnbnNob3J0bWlkJywgWzg3NDBdXSwgWyduc2hvcnRwYXJhbGxlbCcsIFs4NzQyXV0sIFsnbnNpbScsIFs4NzY5XV0sIFsnbnNpbWUnLCBbODc3Ml1dLCBbJ25zaW1lcScsIFs4NzcyXV0sIFsnbnNtaWQnLCBbODc0MF1dLCBbJ25zcGFyJywgWzg3NDJdXSwgWyduc3FzdWJlJywgWzg5MzBdXSwgWyduc3FzdXBlJywgWzg5MzFdXSwgWyduc3ViJywgWzg4MzZdXSwgWyduc3ViRScsIFsxMDk0OSwgODI0XV0sIFsnbnN1YmUnLCBbODg0MF1dLCBbJ25zdWJzZXQnLCBbODgzNCwgODQwMl1dLCBbJ25zdWJzZXRlcScsIFs4ODQwXV0sIFsnbnN1YnNldGVxcScsIFsxMDk0OSwgODI0XV0sIFsnbnN1Y2MnLCBbODgzM11dLCBbJ25zdWNjZXEnLCBbMTA5MjgsIDgyNF1dLCBbJ25zdXAnLCBbODgzN11dLCBbJ25zdXBFJywgWzEwOTUwLCA4MjRdXSwgWyduc3VwZScsIFs4ODQxXV0sIFsnbnN1cHNldCcsIFs4ODM1LCA4NDAyXV0sIFsnbnN1cHNldGVxJywgWzg4NDFdXSwgWyduc3Vwc2V0ZXFxJywgWzEwOTUwLCA4MjRdXSwgWydudGdsJywgWzg4MjVdXSwgWydOdGlsZGUnLCBbMjA5XV0sIFsnbnRpbGRlJywgWzI0MV1dLCBbJ250bGcnLCBbODgyNF1dLCBbJ250cmlhbmdsZWxlZnQnLCBbODkzOF1dLCBbJ250cmlhbmdsZWxlZnRlcScsIFs4OTQwXV0sIFsnbnRyaWFuZ2xlcmlnaHQnLCBbODkzOV1dLCBbJ250cmlhbmdsZXJpZ2h0ZXEnLCBbODk0MV1dLCBbJ051JywgWzkyNV1dLCBbJ251JywgWzk1N11dLCBbJ251bScsIFszNV1dLCBbJ251bWVybycsIFs4NDcwXV0sIFsnbnVtc3AnLCBbODE5OV1dLCBbJ252YXAnLCBbODc4MSwgODQwMl1dLCBbJ252ZGFzaCcsIFs4ODc2XV0sIFsnbnZEYXNoJywgWzg4NzddXSwgWyduVmRhc2gnLCBbODg3OF1dLCBbJ25WRGFzaCcsIFs4ODc5XV0sIFsnbnZnZScsIFs4ODA1LCA4NDAyXV0sIFsnbnZndCcsIFs2MiwgODQwMl1dLCBbJ252SGFycicsIFsxMDUwMF1dLCBbJ252aW5maW4nLCBbMTA3MThdXSwgWydudmxBcnInLCBbMTA0OThdXSwgWydudmxlJywgWzg4MDQsIDg0MDJdXSwgWydudmx0JywgWzYwLCA4NDAyXV0sIFsnbnZsdHJpZScsIFs4ODg0LCA4NDAyXV0sIFsnbnZyQXJyJywgWzEwNDk5XV0sIFsnbnZydHJpZScsIFs4ODg1LCA4NDAyXV0sIFsnbnZzaW0nLCBbODc2NCwgODQwMl1dLCBbJ253YXJoaycsIFsxMDUzMV1dLCBbJ253YXJyJywgWzg1OThdXSwgWydud0FycicsIFs4NjYyXV0sIFsnbndhcnJvdycsIFs4NTk4XV0sIFsnbnduZWFyJywgWzEwNTM1XV0sIFsnT2FjdXRlJywgWzIxMV1dLCBbJ29hY3V0ZScsIFsyNDNdXSwgWydvYXN0JywgWzg4NTldXSwgWydPY2lyYycsIFsyMTJdXSwgWydvY2lyYycsIFsyNDRdXSwgWydvY2lyJywgWzg4NThdXSwgWydPY3knLCBbMTA1NF1dLCBbJ29jeScsIFsxMDg2XV0sIFsnb2Rhc2gnLCBbODg2MV1dLCBbJ09kYmxhYycsIFszMzZdXSwgWydvZGJsYWMnLCBbMzM3XV0sIFsnb2RpdicsIFsxMDgwOF1dLCBbJ29kb3QnLCBbODg1N11dLCBbJ29kc29sZCcsIFsxMDY4NF1dLCBbJ09FbGlnJywgWzMzOF1dLCBbJ29lbGlnJywgWzMzOV1dLCBbJ29mY2lyJywgWzEwNjg3XV0sIFsnT2ZyJywgWzEyMDA4Ml1dLCBbJ29mcicsIFsxMjAxMDhdXSwgWydvZ29uJywgWzczMV1dLCBbJ09ncmF2ZScsIFsyMTBdXSwgWydvZ3JhdmUnLCBbMjQyXV0sIFsnb2d0JywgWzEwNjg5XV0sIFsnb2hiYXInLCBbMTA2NzddXSwgWydvaG0nLCBbOTM3XV0sIFsnb2ludCcsIFs4NzUwXV0sIFsnb2xhcnInLCBbODYzNF1dLCBbJ29sY2lyJywgWzEwNjg2XV0sIFsnb2xjcm9zcycsIFsxMDY4M11dLCBbJ29saW5lJywgWzgyNTRdXSwgWydvbHQnLCBbMTA2ODhdXSwgWydPbWFjcicsIFszMzJdXSwgWydvbWFjcicsIFszMzNdXSwgWydPbWVnYScsIFs5MzddXSwgWydvbWVnYScsIFs5NjldXSwgWydPbWljcm9uJywgWzkyN11dLCBbJ29taWNyb24nLCBbOTU5XV0sIFsnb21pZCcsIFsxMDY3OF1dLCBbJ29taW51cycsIFs4ODU0XV0sIFsnT29wZicsIFsxMjAxMzRdXSwgWydvb3BmJywgWzEyMDE2MF1dLCBbJ29wYXInLCBbMTA2NzldXSwgWydPcGVuQ3VybHlEb3VibGVRdW90ZScsIFs4MjIwXV0sIFsnT3BlbkN1cmx5UXVvdGUnLCBbODIxNl1dLCBbJ29wZXJwJywgWzEwNjgxXV0sIFsnb3BsdXMnLCBbODg1M11dLCBbJ29yYXJyJywgWzg2MzVdXSwgWydPcicsIFsxMDgzNl1dLCBbJ29yJywgWzg3NDRdXSwgWydvcmQnLCBbMTA4NDVdXSwgWydvcmRlcicsIFs4NTAwXV0sIFsnb3JkZXJvZicsIFs4NTAwXV0sIFsnb3JkZicsIFsxNzBdXSwgWydvcmRtJywgWzE4Nl1dLCBbJ29yaWdvZicsIFs4ODg2XV0sIFsnb3JvcicsIFsxMDgzOF1dLCBbJ29yc2xvcGUnLCBbMTA4MzldXSwgWydvcnYnLCBbMTA4NDNdXSwgWydvUycsIFs5NDE2XV0sIFsnT3NjcicsIFsxMTk5NzhdXSwgWydvc2NyJywgWzg1MDBdXSwgWydPc2xhc2gnLCBbMjE2XV0sIFsnb3NsYXNoJywgWzI0OF1dLCBbJ29zb2wnLCBbODg1Nl1dLCBbJ090aWxkZScsIFsyMTNdXSwgWydvdGlsZGUnLCBbMjQ1XV0sIFsnb3RpbWVzYXMnLCBbMTA4MDZdXSwgWydPdGltZXMnLCBbMTA4MDddXSwgWydvdGltZXMnLCBbODg1NV1dLCBbJ091bWwnLCBbMjE0XV0sIFsnb3VtbCcsIFsyNDZdXSwgWydvdmJhcicsIFs5MDIxXV0sIFsnT3ZlckJhcicsIFs4MjU0XV0sIFsnT3ZlckJyYWNlJywgWzkxODJdXSwgWydPdmVyQnJhY2tldCcsIFs5MTQwXV0sIFsnT3ZlclBhcmVudGhlc2lzJywgWzkxODBdXSwgWydwYXJhJywgWzE4Ml1dLCBbJ3BhcmFsbGVsJywgWzg3NDFdXSwgWydwYXInLCBbODc0MV1dLCBbJ3BhcnNpbScsIFsxMDk5NV1dLCBbJ3BhcnNsJywgWzExMDA1XV0sIFsncGFydCcsIFs4NzA2XV0sIFsnUGFydGlhbEQnLCBbODcwNl1dLCBbJ1BjeScsIFsxMDU1XV0sIFsncGN5JywgWzEwODddXSwgWydwZXJjbnQnLCBbMzddXSwgWydwZXJpb2QnLCBbNDZdXSwgWydwZXJtaWwnLCBbODI0MF1dLCBbJ3BlcnAnLCBbODg2OV1dLCBbJ3BlcnRlbmsnLCBbODI0MV1dLCBbJ1BmcicsIFsxMjAwODNdXSwgWydwZnInLCBbMTIwMTA5XV0sIFsnUGhpJywgWzkzNF1dLCBbJ3BoaScsIFs5NjZdXSwgWydwaGl2JywgWzk4MV1dLCBbJ3BobW1hdCcsIFs4NDk5XV0sIFsncGhvbmUnLCBbOTc0Ml1dLCBbJ1BpJywgWzkyOF1dLCBbJ3BpJywgWzk2MF1dLCBbJ3BpdGNoZm9yaycsIFs4OTE2XV0sIFsncGl2JywgWzk4Ml1dLCBbJ3BsYW5jaycsIFs4NDYzXV0sIFsncGxhbmNraCcsIFs4NDYyXV0sIFsncGxhbmt2JywgWzg0NjNdXSwgWydwbHVzYWNpcicsIFsxMDc4N11dLCBbJ3BsdXNiJywgWzg4NjJdXSwgWydwbHVzY2lyJywgWzEwNzg2XV0sIFsncGx1cycsIFs0M11dLCBbJ3BsdXNkbycsIFs4NzI0XV0sIFsncGx1c2R1JywgWzEwNzg5XV0sIFsncGx1c2UnLCBbMTA4NjZdXSwgWydQbHVzTWludXMnLCBbMTc3XV0sIFsncGx1c21uJywgWzE3N11dLCBbJ3BsdXNzaW0nLCBbMTA3OTBdXSwgWydwbHVzdHdvJywgWzEwNzkxXV0sIFsncG0nLCBbMTc3XV0sIFsnUG9pbmNhcmVwbGFuZScsIFs4NDYwXV0sIFsncG9pbnRpbnQnLCBbMTA3NzNdXSwgWydwb3BmJywgWzEyMDE2MV1dLCBbJ1BvcGYnLCBbODQ3M11dLCBbJ3BvdW5kJywgWzE2M11dLCBbJ3ByYXAnLCBbMTA5MzVdXSwgWydQcicsIFsxMDkzOV1dLCBbJ3ByJywgWzg4MjZdXSwgWydwcmN1ZScsIFs4ODI4XV0sIFsncHJlY2FwcHJveCcsIFsxMDkzNV1dLCBbJ3ByZWMnLCBbODgyNl1dLCBbJ3ByZWNjdXJseWVxJywgWzg4MjhdXSwgWydQcmVjZWRlcycsIFs4ODI2XV0sIFsnUHJlY2VkZXNFcXVhbCcsIFsxMDkyN11dLCBbJ1ByZWNlZGVzU2xhbnRFcXVhbCcsIFs4ODI4XV0sIFsnUHJlY2VkZXNUaWxkZScsIFs4ODMwXV0sIFsncHJlY2VxJywgWzEwOTI3XV0sIFsncHJlY25hcHByb3gnLCBbMTA5MzddXSwgWydwcmVjbmVxcScsIFsxMDkzM11dLCBbJ3ByZWNuc2ltJywgWzg5MzZdXSwgWydwcmUnLCBbMTA5MjddXSwgWydwckUnLCBbMTA5MzFdXSwgWydwcmVjc2ltJywgWzg4MzBdXSwgWydwcmltZScsIFs4MjQyXV0sIFsnUHJpbWUnLCBbODI0M11dLCBbJ3ByaW1lcycsIFs4NDczXV0sIFsncHJuYXAnLCBbMTA5MzddXSwgWydwcm5FJywgWzEwOTMzXV0sIFsncHJuc2ltJywgWzg5MzZdXSwgWydwcm9kJywgWzg3MTldXSwgWydQcm9kdWN0JywgWzg3MTldXSwgWydwcm9mYWxhcicsIFs5MDA2XV0sIFsncHJvZmxpbmUnLCBbODk3OF1dLCBbJ3Byb2ZzdXJmJywgWzg5NzldXSwgWydwcm9wJywgWzg3MzNdXSwgWydQcm9wb3J0aW9uYWwnLCBbODczM11dLCBbJ1Byb3BvcnRpb24nLCBbODc1OV1dLCBbJ3Byb3B0bycsIFs4NzMzXV0sIFsncHJzaW0nLCBbODgzMF1dLCBbJ3BydXJlbCcsIFs4ODgwXV0sIFsnUHNjcicsIFsxMTk5NzldXSwgWydwc2NyJywgWzEyMDAwNV1dLCBbJ1BzaScsIFs5MzZdXSwgWydwc2knLCBbOTY4XV0sIFsncHVuY3NwJywgWzgyMDBdXSwgWydRZnInLCBbMTIwMDg0XV0sIFsncWZyJywgWzEyMDExMF1dLCBbJ3FpbnQnLCBbMTA3NjRdXSwgWydxb3BmJywgWzEyMDE2Ml1dLCBbJ1FvcGYnLCBbODQ3NF1dLCBbJ3FwcmltZScsIFs4Mjc5XV0sIFsnUXNjcicsIFsxMTk5ODBdXSwgWydxc2NyJywgWzEyMDAwNl1dLCBbJ3F1YXRlcm5pb25zJywgWzg0NjFdXSwgWydxdWF0aW50JywgWzEwNzc0XV0sIFsncXVlc3QnLCBbNjNdXSwgWydxdWVzdGVxJywgWzg3OTldXSwgWydxdW90JywgWzM0XV0sIFsnUVVPVCcsIFszNF1dLCBbJ3JBYXJyJywgWzg2NjddXSwgWydyYWNlJywgWzg3NjUsIDgxN11dLCBbJ1JhY3V0ZScsIFszNDBdXSwgWydyYWN1dGUnLCBbMzQxXV0sIFsncmFkaWMnLCBbODczMF1dLCBbJ3JhZW1wdHl2JywgWzEwNjc1XV0sIFsncmFuZycsIFsxMDIxN11dLCBbJ1JhbmcnLCBbMTAyMTldXSwgWydyYW5nZCcsIFsxMDY0Ml1dLCBbJ3JhbmdlJywgWzEwNjYxXV0sIFsncmFuZ2xlJywgWzEwMjE3XV0sIFsncmFxdW8nLCBbMTg3XV0sIFsncmFycmFwJywgWzEwNjEzXV0sIFsncmFycmInLCBbODY3N11dLCBbJ3JhcnJiZnMnLCBbMTA1MjhdXSwgWydyYXJyYycsIFsxMDU0N11dLCBbJ3JhcnInLCBbODU5NF1dLCBbJ1JhcnInLCBbODYwOF1dLCBbJ3JBcnInLCBbODY1OF1dLCBbJ3JhcnJmcycsIFsxMDUyNl1dLCBbJ3JhcnJoaycsIFs4NjE4XV0sIFsncmFycmxwJywgWzg2MjBdXSwgWydyYXJycGwnLCBbMTA1NjVdXSwgWydyYXJyc2ltJywgWzEwNjEyXV0sIFsnUmFycnRsJywgWzEwNTE4XV0sIFsncmFycnRsJywgWzg2MTFdXSwgWydyYXJydycsIFs4NjA1XV0sIFsncmF0YWlsJywgWzEwNTIyXV0sIFsnckF0YWlsJywgWzEwNTI0XV0sIFsncmF0aW8nLCBbODc1OF1dLCBbJ3JhdGlvbmFscycsIFs4NDc0XV0sIFsncmJhcnInLCBbMTA1MDldXSwgWydyQmFycicsIFsxMDUxMV1dLCBbJ1JCYXJyJywgWzEwNTEyXV0sIFsncmJicmsnLCBbMTAwOTldXSwgWydyYnJhY2UnLCBbMTI1XV0sIFsncmJyYWNrJywgWzkzXV0sIFsncmJya2UnLCBbMTA2MzZdXSwgWydyYnJrc2xkJywgWzEwNjM4XV0sIFsncmJya3NsdScsIFsxMDY0MF1dLCBbJ1JjYXJvbicsIFszNDRdXSwgWydyY2Fyb24nLCBbMzQ1XV0sIFsnUmNlZGlsJywgWzM0Ml1dLCBbJ3JjZWRpbCcsIFszNDNdXSwgWydyY2VpbCcsIFs4OTY5XV0sIFsncmN1YicsIFsxMjVdXSwgWydSY3knLCBbMTA1Nl1dLCBbJ3JjeScsIFsxMDg4XV0sIFsncmRjYScsIFsxMDU1MV1dLCBbJ3JkbGRoYXInLCBbMTA2MDFdXSwgWydyZHF1bycsIFs4MjIxXV0sIFsncmRxdW9yJywgWzgyMjFdXSwgWydDbG9zZUN1cmx5RG91YmxlUXVvdGUnLCBbODIyMV1dLCBbJ3Jkc2gnLCBbODYyN11dLCBbJ3JlYWwnLCBbODQ3Nl1dLCBbJ3JlYWxpbmUnLCBbODQ3NV1dLCBbJ3JlYWxwYXJ0JywgWzg0NzZdXSwgWydyZWFscycsIFs4NDc3XV0sIFsnUmUnLCBbODQ3Nl1dLCBbJ3JlY3QnLCBbOTY0NV1dLCBbJ3JlZycsIFsxNzRdXSwgWydSRUcnLCBbMTc0XV0sIFsnUmV2ZXJzZUVsZW1lbnQnLCBbODcxNV1dLCBbJ1JldmVyc2VFcXVpbGlicml1bScsIFs4NjUxXV0sIFsnUmV2ZXJzZVVwRXF1aWxpYnJpdW0nLCBbMTA2MDddXSwgWydyZmlzaHQnLCBbMTA2MjFdXSwgWydyZmxvb3InLCBbODk3MV1dLCBbJ3JmcicsIFsxMjAxMTFdXSwgWydSZnInLCBbODQ3Nl1dLCBbJ3JIYXInLCBbMTA1OTZdXSwgWydyaGFyZCcsIFs4NjQxXV0sIFsncmhhcnUnLCBbODY0MF1dLCBbJ3JoYXJ1bCcsIFsxMDYwNF1dLCBbJ1JobycsIFs5MjldXSwgWydyaG8nLCBbOTYxXV0sIFsncmhvdicsIFsxMDA5XV0sIFsnUmlnaHRBbmdsZUJyYWNrZXQnLCBbMTAyMTddXSwgWydSaWdodEFycm93QmFyJywgWzg2NzddXSwgWydyaWdodGFycm93JywgWzg1OTRdXSwgWydSaWdodEFycm93JywgWzg1OTRdXSwgWydSaWdodGFycm93JywgWzg2NThdXSwgWydSaWdodEFycm93TGVmdEFycm93JywgWzg2NDRdXSwgWydyaWdodGFycm93dGFpbCcsIFs4NjExXV0sIFsnUmlnaHRDZWlsaW5nJywgWzg5NjldXSwgWydSaWdodERvdWJsZUJyYWNrZXQnLCBbMTAyMTVdXSwgWydSaWdodERvd25UZWVWZWN0b3InLCBbMTA1ODldXSwgWydSaWdodERvd25WZWN0b3JCYXInLCBbMTA1ODFdXSwgWydSaWdodERvd25WZWN0b3InLCBbODY0Ml1dLCBbJ1JpZ2h0Rmxvb3InLCBbODk3MV1dLCBbJ3JpZ2h0aGFycG9vbmRvd24nLCBbODY0MV1dLCBbJ3JpZ2h0aGFycG9vbnVwJywgWzg2NDBdXSwgWydyaWdodGxlZnRhcnJvd3MnLCBbODY0NF1dLCBbJ3JpZ2h0bGVmdGhhcnBvb25zJywgWzg2NTJdXSwgWydyaWdodHJpZ2h0YXJyb3dzJywgWzg2NDldXSwgWydyaWdodHNxdWlnYXJyb3cnLCBbODYwNV1dLCBbJ1JpZ2h0VGVlQXJyb3cnLCBbODYxNF1dLCBbJ1JpZ2h0VGVlJywgWzg4NjZdXSwgWydSaWdodFRlZVZlY3RvcicsIFsxMDU4N11dLCBbJ3JpZ2h0dGhyZWV0aW1lcycsIFs4OTA4XV0sIFsnUmlnaHRUcmlhbmdsZUJhcicsIFsxMDcwNF1dLCBbJ1JpZ2h0VHJpYW5nbGUnLCBbODg4M11dLCBbJ1JpZ2h0VHJpYW5nbGVFcXVhbCcsIFs4ODg1XV0sIFsnUmlnaHRVcERvd25WZWN0b3InLCBbMTA1NzVdXSwgWydSaWdodFVwVGVlVmVjdG9yJywgWzEwNTg4XV0sIFsnUmlnaHRVcFZlY3RvckJhcicsIFsxMDU4MF1dLCBbJ1JpZ2h0VXBWZWN0b3InLCBbODYzOF1dLCBbJ1JpZ2h0VmVjdG9yQmFyJywgWzEwNTc5XV0sIFsnUmlnaHRWZWN0b3InLCBbODY0MF1dLCBbJ3JpbmcnLCBbNzMwXV0sIFsncmlzaW5nZG90c2VxJywgWzg3ODddXSwgWydybGFycicsIFs4NjQ0XV0sIFsncmxoYXInLCBbODY1Ml1dLCBbJ3JsbScsIFs4MjA3XV0sIFsncm1vdXN0YWNoZScsIFs5MTM3XV0sIFsncm1vdXN0JywgWzkxMzddXSwgWydybm1pZCcsIFsxMDk5MF1dLCBbJ3JvYW5nJywgWzEwMjIxXV0sIFsncm9hcnInLCBbODcwMl1dLCBbJ3JvYnJrJywgWzEwMjE1XV0sIFsncm9wYXInLCBbMTA2MzBdXSwgWydyb3BmJywgWzEyMDE2M11dLCBbJ1JvcGYnLCBbODQ3N11dLCBbJ3JvcGx1cycsIFsxMDc5OF1dLCBbJ3JvdGltZXMnLCBbMTA4MDVdXSwgWydSb3VuZEltcGxpZXMnLCBbMTA2MDhdXSwgWydycGFyJywgWzQxXV0sIFsncnBhcmd0JywgWzEwNjQ0XV0sIFsncnBwb2xpbnQnLCBbMTA3NzBdXSwgWydycmFycicsIFs4NjQ5XV0sIFsnUnJpZ2h0YXJyb3cnLCBbODY2N11dLCBbJ3JzYXF1bycsIFs4MjUwXV0sIFsncnNjcicsIFsxMjAwMDddXSwgWydSc2NyJywgWzg0NzVdXSwgWydyc2gnLCBbODYyNV1dLCBbJ1JzaCcsIFs4NjI1XV0sIFsncnNxYicsIFs5M11dLCBbJ3JzcXVvJywgWzgyMTddXSwgWydyc3F1b3InLCBbODIxN11dLCBbJ0Nsb3NlQ3VybHlRdW90ZScsIFs4MjE3XV0sIFsncnRocmVlJywgWzg5MDhdXSwgWydydGltZXMnLCBbODkwNl1dLCBbJ3J0cmknLCBbOTY1N11dLCBbJ3J0cmllJywgWzg4ODVdXSwgWydydHJpZicsIFs5NjU2XV0sIFsncnRyaWx0cmknLCBbMTA3MDJdXSwgWydSdWxlRGVsYXllZCcsIFsxMDc0MF1dLCBbJ3J1bHVoYXInLCBbMTA2MDBdXSwgWydyeCcsIFs4NDc4XV0sIFsnU2FjdXRlJywgWzM0Nl1dLCBbJ3NhY3V0ZScsIFszNDddXSwgWydzYnF1bycsIFs4MjE4XV0sIFsnc2NhcCcsIFsxMDkzNl1dLCBbJ1NjYXJvbicsIFszNTJdXSwgWydzY2Fyb24nLCBbMzUzXV0sIFsnU2MnLCBbMTA5NDBdXSwgWydzYycsIFs4ODI3XV0sIFsnc2NjdWUnLCBbODgyOV1dLCBbJ3NjZScsIFsxMDkyOF1dLCBbJ3NjRScsIFsxMDkzMl1dLCBbJ1NjZWRpbCcsIFszNTBdXSwgWydzY2VkaWwnLCBbMzUxXV0sIFsnU2NpcmMnLCBbMzQ4XV0sIFsnc2NpcmMnLCBbMzQ5XV0sIFsnc2NuYXAnLCBbMTA5MzhdXSwgWydzY25FJywgWzEwOTM0XV0sIFsnc2Nuc2ltJywgWzg5MzddXSwgWydzY3BvbGludCcsIFsxMDc3MV1dLCBbJ3Njc2ltJywgWzg4MzFdXSwgWydTY3knLCBbMTA1N11dLCBbJ3NjeScsIFsxMDg5XV0sIFsnc2RvdGInLCBbODg2NV1dLCBbJ3Nkb3QnLCBbODkwMV1dLCBbJ3Nkb3RlJywgWzEwODU0XV0sIFsnc2VhcmhrJywgWzEwNTMzXV0sIFsnc2VhcnInLCBbODYwMF1dLCBbJ3NlQXJyJywgWzg2NjRdXSwgWydzZWFycm93JywgWzg2MDBdXSwgWydzZWN0JywgWzE2N11dLCBbJ3NlbWknLCBbNTldXSwgWydzZXN3YXInLCBbMTA1MzddXSwgWydzZXRtaW51cycsIFs4NzI2XV0sIFsnc2V0bW4nLCBbODcyNl1dLCBbJ3NleHQnLCBbMTAwMzhdXSwgWydTZnInLCBbMTIwMDg2XV0sIFsnc2ZyJywgWzEyMDExMl1dLCBbJ3Nmcm93bicsIFs4OTk0XV0sIFsnc2hhcnAnLCBbOTgzOV1dLCBbJ1NIQ0hjeScsIFsxMDY1XV0sIFsnc2hjaGN5JywgWzEwOTddXSwgWydTSGN5JywgWzEwNjRdXSwgWydzaGN5JywgWzEwOTZdXSwgWydTaG9ydERvd25BcnJvdycsIFs4NTk1XV0sIFsnU2hvcnRMZWZ0QXJyb3cnLCBbODU5Ml1dLCBbJ3Nob3J0bWlkJywgWzg3MzldXSwgWydzaG9ydHBhcmFsbGVsJywgWzg3NDFdXSwgWydTaG9ydFJpZ2h0QXJyb3cnLCBbODU5NF1dLCBbJ1Nob3J0VXBBcnJvdycsIFs4NTkzXV0sIFsnc2h5JywgWzE3M11dLCBbJ1NpZ21hJywgWzkzMV1dLCBbJ3NpZ21hJywgWzk2M11dLCBbJ3NpZ21hZicsIFs5NjJdXSwgWydzaWdtYXYnLCBbOTYyXV0sIFsnc2ltJywgWzg3NjRdXSwgWydzaW1kb3QnLCBbMTA4NThdXSwgWydzaW1lJywgWzg3NzFdXSwgWydzaW1lcScsIFs4NzcxXV0sIFsnc2ltZycsIFsxMDkxMF1dLCBbJ3NpbWdFJywgWzEwOTEyXV0sIFsnc2ltbCcsIFsxMDkwOV1dLCBbJ3NpbWxFJywgWzEwOTExXV0sIFsnc2ltbmUnLCBbODc3NF1dLCBbJ3NpbXBsdXMnLCBbMTA3ODhdXSwgWydzaW1yYXJyJywgWzEwNjEwXV0sIFsnc2xhcnInLCBbODU5Ml1dLCBbJ1NtYWxsQ2lyY2xlJywgWzg3MjhdXSwgWydzbWFsbHNldG1pbnVzJywgWzg3MjZdXSwgWydzbWFzaHAnLCBbMTA4MDNdXSwgWydzbWVwYXJzbCcsIFsxMDcyNF1dLCBbJ3NtaWQnLCBbODczOV1dLCBbJ3NtaWxlJywgWzg5OTVdXSwgWydzbXQnLCBbMTA5MjJdXSwgWydzbXRlJywgWzEwOTI0XV0sIFsnc210ZXMnLCBbMTA5MjQsIDY1MDI0XV0sIFsnU09GVGN5JywgWzEwNjhdXSwgWydzb2Z0Y3knLCBbMTEwMF1dLCBbJ3NvbGJhcicsIFs5MDIzXV0sIFsnc29sYicsIFsxMDY5Ml1dLCBbJ3NvbCcsIFs0N11dLCBbJ1NvcGYnLCBbMTIwMTM4XV0sIFsnc29wZicsIFsxMjAxNjRdXSwgWydzcGFkZXMnLCBbOTgyNF1dLCBbJ3NwYWRlc3VpdCcsIFs5ODI0XV0sIFsnc3BhcicsIFs4NzQxXV0sIFsnc3FjYXAnLCBbODg1MV1dLCBbJ3NxY2FwcycsIFs4ODUxLCA2NTAyNF1dLCBbJ3NxY3VwJywgWzg4NTJdXSwgWydzcWN1cHMnLCBbODg1MiwgNjUwMjRdXSwgWydTcXJ0JywgWzg3MzBdXSwgWydzcXN1YicsIFs4ODQ3XV0sIFsnc3FzdWJlJywgWzg4NDldXSwgWydzcXN1YnNldCcsIFs4ODQ3XV0sIFsnc3FzdWJzZXRlcScsIFs4ODQ5XV0sIFsnc3FzdXAnLCBbODg0OF1dLCBbJ3Nxc3VwZScsIFs4ODUwXV0sIFsnc3FzdXBzZXQnLCBbODg0OF1dLCBbJ3Nxc3Vwc2V0ZXEnLCBbODg1MF1dLCBbJ3NxdWFyZScsIFs5NjMzXV0sIFsnU3F1YXJlJywgWzk2MzNdXSwgWydTcXVhcmVJbnRlcnNlY3Rpb24nLCBbODg1MV1dLCBbJ1NxdWFyZVN1YnNldCcsIFs4ODQ3XV0sIFsnU3F1YXJlU3Vic2V0RXF1YWwnLCBbODg0OV1dLCBbJ1NxdWFyZVN1cGVyc2V0JywgWzg4NDhdXSwgWydTcXVhcmVTdXBlcnNldEVxdWFsJywgWzg4NTBdXSwgWydTcXVhcmVVbmlvbicsIFs4ODUyXV0sIFsnc3F1YXJmJywgWzk2NDJdXSwgWydzcXUnLCBbOTYzM11dLCBbJ3NxdWYnLCBbOTY0Ml1dLCBbJ3NyYXJyJywgWzg1OTRdXSwgWydTc2NyJywgWzExOTk4Ml1dLCBbJ3NzY3InLCBbMTIwMDA4XV0sIFsnc3NldG1uJywgWzg3MjZdXSwgWydzc21pbGUnLCBbODk5NV1dLCBbJ3NzdGFyZicsIFs4OTAyXV0sIFsnU3RhcicsIFs4OTAyXV0sIFsnc3RhcicsIFs5NzM0XV0sIFsnc3RhcmYnLCBbOTczM11dLCBbJ3N0cmFpZ2h0ZXBzaWxvbicsIFsxMDEzXV0sIFsnc3RyYWlnaHRwaGknLCBbOTgxXV0sIFsnc3RybnMnLCBbMTc1XV0sIFsnc3ViJywgWzg4MzRdXSwgWydTdWInLCBbODkxMl1dLCBbJ3N1YmRvdCcsIFsxMDk0MV1dLCBbJ3N1YkUnLCBbMTA5NDldXSwgWydzdWJlJywgWzg4MzhdXSwgWydzdWJlZG90JywgWzEwOTQ3XV0sIFsnc3VibXVsdCcsIFsxMDk0NV1dLCBbJ3N1Ym5FJywgWzEwOTU1XV0sIFsnc3VibmUnLCBbODg0Ml1dLCBbJ3N1YnBsdXMnLCBbMTA5NDNdXSwgWydzdWJyYXJyJywgWzEwNjE3XV0sIFsnc3Vic2V0JywgWzg4MzRdXSwgWydTdWJzZXQnLCBbODkxMl1dLCBbJ3N1YnNldGVxJywgWzg4MzhdXSwgWydzdWJzZXRlcXEnLCBbMTA5NDldXSwgWydTdWJzZXRFcXVhbCcsIFs4ODM4XV0sIFsnc3Vic2V0bmVxJywgWzg4NDJdXSwgWydzdWJzZXRuZXFxJywgWzEwOTU1XV0sIFsnc3Vic2ltJywgWzEwOTUxXV0sIFsnc3Vic3ViJywgWzEwOTY1XV0sIFsnc3Vic3VwJywgWzEwOTYzXV0sIFsnc3VjY2FwcHJveCcsIFsxMDkzNl1dLCBbJ3N1Y2MnLCBbODgyN11dLCBbJ3N1Y2NjdXJseWVxJywgWzg4MjldXSwgWydTdWNjZWVkcycsIFs4ODI3XV0sIFsnU3VjY2VlZHNFcXVhbCcsIFsxMDkyOF1dLCBbJ1N1Y2NlZWRzU2xhbnRFcXVhbCcsIFs4ODI5XV0sIFsnU3VjY2VlZHNUaWxkZScsIFs4ODMxXV0sIFsnc3VjY2VxJywgWzEwOTI4XV0sIFsnc3VjY25hcHByb3gnLCBbMTA5MzhdXSwgWydzdWNjbmVxcScsIFsxMDkzNF1dLCBbJ3N1Y2Nuc2ltJywgWzg5MzddXSwgWydzdWNjc2ltJywgWzg4MzFdXSwgWydTdWNoVGhhdCcsIFs4NzE1XV0sIFsnc3VtJywgWzg3MjFdXSwgWydTdW0nLCBbODcyMV1dLCBbJ3N1bmcnLCBbOTgzNF1dLCBbJ3N1cDEnLCBbMTg1XV0sIFsnc3VwMicsIFsxNzhdXSwgWydzdXAzJywgWzE3OV1dLCBbJ3N1cCcsIFs4ODM1XV0sIFsnU3VwJywgWzg5MTNdXSwgWydzdXBkb3QnLCBbMTA5NDJdXSwgWydzdXBkc3ViJywgWzEwOTY4XV0sIFsnc3VwRScsIFsxMDk1MF1dLCBbJ3N1cGUnLCBbODgzOV1dLCBbJ3N1cGVkb3QnLCBbMTA5NDhdXSwgWydTdXBlcnNldCcsIFs4ODM1XV0sIFsnU3VwZXJzZXRFcXVhbCcsIFs4ODM5XV0sIFsnc3VwaHNvbCcsIFsxMDE4NV1dLCBbJ3N1cGhzdWInLCBbMTA5NjddXSwgWydzdXBsYXJyJywgWzEwNjE5XV0sIFsnc3VwbXVsdCcsIFsxMDk0Nl1dLCBbJ3N1cG5FJywgWzEwOTU2XV0sIFsnc3VwbmUnLCBbODg0M11dLCBbJ3N1cHBsdXMnLCBbMTA5NDRdXSwgWydzdXBzZXQnLCBbODgzNV1dLCBbJ1N1cHNldCcsIFs4OTEzXV0sIFsnc3Vwc2V0ZXEnLCBbODgzOV1dLCBbJ3N1cHNldGVxcScsIFsxMDk1MF1dLCBbJ3N1cHNldG5lcScsIFs4ODQzXV0sIFsnc3Vwc2V0bmVxcScsIFsxMDk1Nl1dLCBbJ3N1cHNpbScsIFsxMDk1Ml1dLCBbJ3N1cHN1YicsIFsxMDk2NF1dLCBbJ3N1cHN1cCcsIFsxMDk2Nl1dLCBbJ3N3YXJoaycsIFsxMDUzNF1dLCBbJ3N3YXJyJywgWzg2MDFdXSwgWydzd0FycicsIFs4NjY1XV0sIFsnc3dhcnJvdycsIFs4NjAxXV0sIFsnc3dud2FyJywgWzEwNTM4XV0sIFsnc3psaWcnLCBbMjIzXV0sIFsnVGFiJywgWzldXSwgWyd0YXJnZXQnLCBbODk4Ml1dLCBbJ1RhdScsIFs5MzJdXSwgWyd0YXUnLCBbOTY0XV0sIFsndGJyaycsIFs5MTQwXV0sIFsnVGNhcm9uJywgWzM1Nl1dLCBbJ3RjYXJvbicsIFszNTddXSwgWydUY2VkaWwnLCBbMzU0XV0sIFsndGNlZGlsJywgWzM1NV1dLCBbJ1RjeScsIFsxMDU4XV0sIFsndGN5JywgWzEwOTBdXSwgWyd0ZG90JywgWzg0MTFdXSwgWyd0ZWxyZWMnLCBbODk4MV1dLCBbJ1RmcicsIFsxMjAwODddXSwgWyd0ZnInLCBbMTIwMTEzXV0sIFsndGhlcmU0JywgWzg3NTZdXSwgWyd0aGVyZWZvcmUnLCBbODc1Nl1dLCBbJ1RoZXJlZm9yZScsIFs4NzU2XV0sIFsnVGhldGEnLCBbOTIwXV0sIFsndGhldGEnLCBbOTUyXV0sIFsndGhldGFzeW0nLCBbOTc3XV0sIFsndGhldGF2JywgWzk3N11dLCBbJ3RoaWNrYXBwcm94JywgWzg3NzZdXSwgWyd0aGlja3NpbScsIFs4NzY0XV0sIFsnVGhpY2tTcGFjZScsIFs4Mjg3LCA4MjAyXV0sIFsnVGhpblNwYWNlJywgWzgyMDFdXSwgWyd0aGluc3AnLCBbODIwMV1dLCBbJ3Roa2FwJywgWzg3NzZdXSwgWyd0aGtzaW0nLCBbODc2NF1dLCBbJ1RIT1JOJywgWzIyMl1dLCBbJ3Rob3JuJywgWzI1NF1dLCBbJ3RpbGRlJywgWzczMl1dLCBbJ1RpbGRlJywgWzg3NjRdXSwgWydUaWxkZUVxdWFsJywgWzg3NzFdXSwgWydUaWxkZUZ1bGxFcXVhbCcsIFs4NzczXV0sIFsnVGlsZGVUaWxkZScsIFs4Nzc2XV0sIFsndGltZXNiYXInLCBbMTA4MDFdXSwgWyd0aW1lc2InLCBbODg2NF1dLCBbJ3RpbWVzJywgWzIxNV1dLCBbJ3RpbWVzZCcsIFsxMDgwMF1dLCBbJ3RpbnQnLCBbODc0OV1dLCBbJ3RvZWEnLCBbMTA1MzZdXSwgWyd0b3Bib3QnLCBbOTAxNF1dLCBbJ3RvcGNpcicsIFsxMDk5M11dLCBbJ3RvcCcsIFs4ODY4XV0sIFsnVG9wZicsIFsxMjAxMzldXSwgWyd0b3BmJywgWzEyMDE2NV1dLCBbJ3RvcGZvcmsnLCBbMTA5NzBdXSwgWyd0b3NhJywgWzEwNTM3XV0sIFsndHByaW1lJywgWzgyNDRdXSwgWyd0cmFkZScsIFs4NDgyXV0sIFsnVFJBREUnLCBbODQ4Ml1dLCBbJ3RyaWFuZ2xlJywgWzk2NTNdXSwgWyd0cmlhbmdsZWRvd24nLCBbOTY2M11dLCBbJ3RyaWFuZ2xlbGVmdCcsIFs5NjY3XV0sIFsndHJpYW5nbGVsZWZ0ZXEnLCBbODg4NF1dLCBbJ3RyaWFuZ2xlcScsIFs4Nzk2XV0sIFsndHJpYW5nbGVyaWdodCcsIFs5NjU3XV0sIFsndHJpYW5nbGVyaWdodGVxJywgWzg4ODVdXSwgWyd0cmlkb3QnLCBbOTcwOF1dLCBbJ3RyaWUnLCBbODc5Nl1dLCBbJ3RyaW1pbnVzJywgWzEwODEwXV0sIFsnVHJpcGxlRG90JywgWzg0MTFdXSwgWyd0cmlwbHVzJywgWzEwODA5XV0sIFsndHJpc2InLCBbMTA3MDFdXSwgWyd0cml0aW1lJywgWzEwODExXV0sIFsndHJwZXppdW0nLCBbOTE4Nl1dLCBbJ1RzY3InLCBbMTE5OTgzXV0sIFsndHNjcicsIFsxMjAwMDldXSwgWydUU2N5JywgWzEwNjJdXSwgWyd0c2N5JywgWzEwOTRdXSwgWydUU0hjeScsIFsxMDM1XV0sIFsndHNoY3knLCBbMTExNV1dLCBbJ1RzdHJvaycsIFszNThdXSwgWyd0c3Ryb2snLCBbMzU5XV0sIFsndHdpeHQnLCBbODgxMl1dLCBbJ3R3b2hlYWRsZWZ0YXJyb3cnLCBbODYwNl1dLCBbJ3R3b2hlYWRyaWdodGFycm93JywgWzg2MDhdXSwgWydVYWN1dGUnLCBbMjE4XV0sIFsndWFjdXRlJywgWzI1MF1dLCBbJ3VhcnInLCBbODU5M11dLCBbJ1VhcnInLCBbODYwN11dLCBbJ3VBcnInLCBbODY1N11dLCBbJ1VhcnJvY2lyJywgWzEwNTY5XV0sIFsnVWJyY3knLCBbMTAzOF1dLCBbJ3VicmN5JywgWzExMThdXSwgWydVYnJldmUnLCBbMzY0XV0sIFsndWJyZXZlJywgWzM2NV1dLCBbJ1VjaXJjJywgWzIxOV1dLCBbJ3VjaXJjJywgWzI1MV1dLCBbJ1VjeScsIFsxMDU5XV0sIFsndWN5JywgWzEwOTFdXSwgWyd1ZGFycicsIFs4NjQ1XV0sIFsnVWRibGFjJywgWzM2OF1dLCBbJ3VkYmxhYycsIFszNjldXSwgWyd1ZGhhcicsIFsxMDYwNl1dLCBbJ3VmaXNodCcsIFsxMDYyMl1dLCBbJ1VmcicsIFsxMjAwODhdXSwgWyd1ZnInLCBbMTIwMTE0XV0sIFsnVWdyYXZlJywgWzIxN11dLCBbJ3VncmF2ZScsIFsyNDldXSwgWyd1SGFyJywgWzEwNTk1XV0sIFsndWhhcmwnLCBbODYzOV1dLCBbJ3VoYXJyJywgWzg2MzhdXSwgWyd1aGJsaycsIFs5NjAwXV0sIFsndWxjb3JuJywgWzg5ODhdXSwgWyd1bGNvcm5lcicsIFs4OTg4XV0sIFsndWxjcm9wJywgWzg5NzVdXSwgWyd1bHRyaScsIFs5NzIwXV0sIFsnVW1hY3InLCBbMzYyXV0sIFsndW1hY3InLCBbMzYzXV0sIFsndW1sJywgWzE2OF1dLCBbJ1VuZGVyQmFyJywgWzk1XV0sIFsnVW5kZXJCcmFjZScsIFs5MTgzXV0sIFsnVW5kZXJCcmFja2V0JywgWzkxNDFdXSwgWydVbmRlclBhcmVudGhlc2lzJywgWzkxODFdXSwgWydVbmlvbicsIFs4ODk5XV0sIFsnVW5pb25QbHVzJywgWzg4NDZdXSwgWydVb2dvbicsIFszNzBdXSwgWyd1b2dvbicsIFszNzFdXSwgWydVb3BmJywgWzEyMDE0MF1dLCBbJ3VvcGYnLCBbMTIwMTY2XV0sIFsnVXBBcnJvd0JhcicsIFsxMDUxNF1dLCBbJ3VwYXJyb3cnLCBbODU5M11dLCBbJ1VwQXJyb3cnLCBbODU5M11dLCBbJ1VwYXJyb3cnLCBbODY1N11dLCBbJ1VwQXJyb3dEb3duQXJyb3cnLCBbODY0NV1dLCBbJ3VwZG93bmFycm93JywgWzg1OTddXSwgWydVcERvd25BcnJvdycsIFs4NTk3XV0sIFsnVXBkb3duYXJyb3cnLCBbODY2MV1dLCBbJ1VwRXF1aWxpYnJpdW0nLCBbMTA2MDZdXSwgWyd1cGhhcnBvb25sZWZ0JywgWzg2MzldXSwgWyd1cGhhcnBvb25yaWdodCcsIFs4NjM4XV0sIFsndXBsdXMnLCBbODg0Nl1dLCBbJ1VwcGVyTGVmdEFycm93JywgWzg1OThdXSwgWydVcHBlclJpZ2h0QXJyb3cnLCBbODU5OV1dLCBbJ3Vwc2knLCBbOTY1XV0sIFsnVXBzaScsIFs5NzhdXSwgWyd1cHNpaCcsIFs5NzhdXSwgWydVcHNpbG9uJywgWzkzM11dLCBbJ3Vwc2lsb24nLCBbOTY1XV0sIFsnVXBUZWVBcnJvdycsIFs4NjEzXV0sIFsnVXBUZWUnLCBbODg2OV1dLCBbJ3VwdXBhcnJvd3MnLCBbODY0OF1dLCBbJ3VyY29ybicsIFs4OTg5XV0sIFsndXJjb3JuZXInLCBbODk4OV1dLCBbJ3VyY3JvcCcsIFs4OTc0XV0sIFsnVXJpbmcnLCBbMzY2XV0sIFsndXJpbmcnLCBbMzY3XV0sIFsndXJ0cmknLCBbOTcyMV1dLCBbJ1VzY3InLCBbMTE5OTg0XV0sIFsndXNjcicsIFsxMjAwMTBdXSwgWyd1dGRvdCcsIFs4OTQ0XV0sIFsnVXRpbGRlJywgWzM2MF1dLCBbJ3V0aWxkZScsIFszNjFdXSwgWyd1dHJpJywgWzk2NTNdXSwgWyd1dHJpZicsIFs5NjUyXV0sIFsndXVhcnInLCBbODY0OF1dLCBbJ1V1bWwnLCBbMjIwXV0sIFsndXVtbCcsIFsyNTJdXSwgWyd1d2FuZ2xlJywgWzEwNjYzXV0sIFsndmFuZ3J0JywgWzEwNjUyXV0sIFsndmFyZXBzaWxvbicsIFsxMDEzXV0sIFsndmFya2FwcGEnLCBbMTAwOF1dLCBbJ3Zhcm5vdGhpbmcnLCBbODcwOV1dLCBbJ3ZhcnBoaScsIFs5ODFdXSwgWyd2YXJwaScsIFs5ODJdXSwgWyd2YXJwcm9wdG8nLCBbODczM11dLCBbJ3ZhcnInLCBbODU5N11dLCBbJ3ZBcnInLCBbODY2MV1dLCBbJ3ZhcnJobycsIFsxMDA5XV0sIFsndmFyc2lnbWEnLCBbOTYyXV0sIFsndmFyc3Vic2V0bmVxJywgWzg4NDIsIDY1MDI0XV0sIFsndmFyc3Vic2V0bmVxcScsIFsxMDk1NSwgNjUwMjRdXSwgWyd2YXJzdXBzZXRuZXEnLCBbODg0MywgNjUwMjRdXSwgWyd2YXJzdXBzZXRuZXFxJywgWzEwOTU2LCA2NTAyNF1dLCBbJ3ZhcnRoZXRhJywgWzk3N11dLCBbJ3ZhcnRyaWFuZ2xlbGVmdCcsIFs4ODgyXV0sIFsndmFydHJpYW5nbGVyaWdodCcsIFs4ODgzXV0sIFsndkJhcicsIFsxMDk4NF1dLCBbJ1ZiYXInLCBbMTA5ODddXSwgWyd2QmFydicsIFsxMDk4NV1dLCBbJ1ZjeScsIFsxMDQyXV0sIFsndmN5JywgWzEwNzRdXSwgWyd2ZGFzaCcsIFs4ODY2XV0sIFsndkRhc2gnLCBbODg3Ml1dLCBbJ1ZkYXNoJywgWzg4NzNdXSwgWydWRGFzaCcsIFs4ODc1XV0sIFsnVmRhc2hsJywgWzEwOTgyXV0sIFsndmVlYmFyJywgWzg4OTFdXSwgWyd2ZWUnLCBbODc0NF1dLCBbJ1ZlZScsIFs4ODk3XV0sIFsndmVlZXEnLCBbODc5NF1dLCBbJ3ZlbGxpcCcsIFs4OTQyXV0sIFsndmVyYmFyJywgWzEyNF1dLCBbJ1ZlcmJhcicsIFs4MjE0XV0sIFsndmVydCcsIFsxMjRdXSwgWydWZXJ0JywgWzgyMTRdXSwgWydWZXJ0aWNhbEJhcicsIFs4NzM5XV0sIFsnVmVydGljYWxMaW5lJywgWzEyNF1dLCBbJ1ZlcnRpY2FsU2VwYXJhdG9yJywgWzEwMDcyXV0sIFsnVmVydGljYWxUaWxkZScsIFs4NzY4XV0sIFsnVmVyeVRoaW5TcGFjZScsIFs4MjAyXV0sIFsnVmZyJywgWzEyMDA4OV1dLCBbJ3ZmcicsIFsxMjAxMTVdXSwgWyd2bHRyaScsIFs4ODgyXV0sIFsndm5zdWInLCBbODgzNCwgODQwMl1dLCBbJ3Zuc3VwJywgWzg4MzUsIDg0MDJdXSwgWydWb3BmJywgWzEyMDE0MV1dLCBbJ3ZvcGYnLCBbMTIwMTY3XV0sIFsndnByb3AnLCBbODczM11dLCBbJ3ZydHJpJywgWzg4ODNdXSwgWydWc2NyJywgWzExOTk4NV1dLCBbJ3ZzY3InLCBbMTIwMDExXV0sIFsndnN1Ym5FJywgWzEwOTU1LCA2NTAyNF1dLCBbJ3ZzdWJuZScsIFs4ODQyLCA2NTAyNF1dLCBbJ3ZzdXBuRScsIFsxMDk1NiwgNjUwMjRdXSwgWyd2c3VwbmUnLCBbODg0MywgNjUwMjRdXSwgWydWdmRhc2gnLCBbODg3NF1dLCBbJ3Z6aWd6YWcnLCBbMTA2NTBdXSwgWydXY2lyYycsIFszNzJdXSwgWyd3Y2lyYycsIFszNzNdXSwgWyd3ZWRiYXInLCBbMTA4NDddXSwgWyd3ZWRnZScsIFs4NzQzXV0sIFsnV2VkZ2UnLCBbODg5Nl1dLCBbJ3dlZGdlcScsIFs4NzkzXV0sIFsnd2VpZXJwJywgWzg0NzJdXSwgWydXZnInLCBbMTIwMDkwXV0sIFsnd2ZyJywgWzEyMDExNl1dLCBbJ1dvcGYnLCBbMTIwMTQyXV0sIFsnd29wZicsIFsxMjAxNjhdXSwgWyd3cCcsIFs4NDcyXV0sIFsnd3InLCBbODc2OF1dLCBbJ3dyZWF0aCcsIFs4NzY4XV0sIFsnV3NjcicsIFsxMTk5ODZdXSwgWyd3c2NyJywgWzEyMDAxMl1dLCBbJ3hjYXAnLCBbODg5OF1dLCBbJ3hjaXJjJywgWzk3MTFdXSwgWyd4Y3VwJywgWzg4OTldXSwgWyd4ZHRyaScsIFs5NjYxXV0sIFsnWGZyJywgWzEyMDA5MV1dLCBbJ3hmcicsIFsxMjAxMTddXSwgWyd4aGFycicsIFsxMDIzMV1dLCBbJ3hoQXJyJywgWzEwMjM0XV0sIFsnWGknLCBbOTI2XV0sIFsneGknLCBbOTU4XV0sIFsneGxhcnInLCBbMTAyMjldXSwgWyd4bEFycicsIFsxMDIzMl1dLCBbJ3htYXAnLCBbMTAyMzZdXSwgWyd4bmlzJywgWzg5NTVdXSwgWyd4b2RvdCcsIFsxMDc1Ml1dLCBbJ1hvcGYnLCBbMTIwMTQzXV0sIFsneG9wZicsIFsxMjAxNjldXSwgWyd4b3BsdXMnLCBbMTA3NTNdXSwgWyd4b3RpbWUnLCBbMTA3NTRdXSwgWyd4cmFycicsIFsxMDIzMF1dLCBbJ3hyQXJyJywgWzEwMjMzXV0sIFsnWHNjcicsIFsxMTk5ODddXSwgWyd4c2NyJywgWzEyMDAxM11dLCBbJ3hzcWN1cCcsIFsxMDc1OF1dLCBbJ3h1cGx1cycsIFsxMDc1Nl1dLCBbJ3h1dHJpJywgWzk2NTFdXSwgWyd4dmVlJywgWzg4OTddXSwgWyd4d2VkZ2UnLCBbODg5Nl1dLCBbJ1lhY3V0ZScsIFsyMjFdXSwgWyd5YWN1dGUnLCBbMjUzXV0sIFsnWUFjeScsIFsxMDcxXV0sIFsneWFjeScsIFsxMTAzXV0sIFsnWWNpcmMnLCBbMzc0XV0sIFsneWNpcmMnLCBbMzc1XV0sIFsnWWN5JywgWzEwNjddXSwgWyd5Y3knLCBbMTA5OV1dLCBbJ3llbicsIFsxNjVdXSwgWydZZnInLCBbMTIwMDkyXV0sIFsneWZyJywgWzEyMDExOF1dLCBbJ1lJY3knLCBbMTAzMV1dLCBbJ3lpY3knLCBbMTExMV1dLCBbJ1lvcGYnLCBbMTIwMTQ0XV0sIFsneW9wZicsIFsxMjAxNzBdXSwgWydZc2NyJywgWzExOTk4OF1dLCBbJ3lzY3InLCBbMTIwMDE0XV0sIFsnWVVjeScsIFsxMDcwXV0sIFsneXVjeScsIFsxMTAyXV0sIFsneXVtbCcsIFsyNTVdXSwgWydZdW1sJywgWzM3Nl1dLCBbJ1phY3V0ZScsIFszNzddXSwgWyd6YWN1dGUnLCBbMzc4XV0sIFsnWmNhcm9uJywgWzM4MV1dLCBbJ3pjYXJvbicsIFszODJdXSwgWydaY3knLCBbMTA0N11dLCBbJ3pjeScsIFsxMDc5XV0sIFsnWmRvdCcsIFszNzldXSwgWyd6ZG90JywgWzM4MF1dLCBbJ3plZXRyZicsIFs4NDg4XV0sIFsnWmVyb1dpZHRoU3BhY2UnLCBbODIwM11dLCBbJ1pldGEnLCBbOTE4XV0sIFsnemV0YScsIFs5NTBdXSwgWyd6ZnInLCBbMTIwMTE5XV0sIFsnWmZyJywgWzg0ODhdXSwgWydaSGN5JywgWzEwNDZdXSwgWyd6aGN5JywgWzEwNzhdXSwgWyd6aWdyYXJyJywgWzg2NjldXSwgWyd6b3BmJywgWzEyMDE3MV1dLCBbJ1pvcGYnLCBbODQ4NF1dLCBbJ1pzY3InLCBbMTE5OTg5XV0sIFsnenNjcicsIFsxMjAwMTVdXSwgWyd6d2onLCBbODIwNV1dLCBbJ3p3bmonLCBbODIwNF1dXTtcbnZhciBhbHBoYUluZGV4ID0ge307XG52YXIgY2hhckluZGV4ID0ge307XG5jcmVhdGVJbmRleGVzKGFscGhhSW5kZXgsIGNoYXJJbmRleCk7XG52YXIgSHRtbDVFbnRpdGllcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdG1sNUVudGl0aWVzKCkge1xuICAgIH1cbiAgICBIdG1sNUVudGl0aWVzLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mKCM/W1xcd1xcZF0rKTs/L2csIGZ1bmN0aW9uIChzLCBlbnRpdHkpIHtcbiAgICAgICAgICAgIHZhciBjaHI7XG4gICAgICAgICAgICBpZiAoZW50aXR5LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGVudGl0eS5jaGFyQXQoMSkgPT09ICd4JyA/XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgMTYpIDpcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigxKSk7XG4gICAgICAgICAgICAgICAgaWYgKCEoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNociA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hyID0gYWxwaGFJbmRleFtlbnRpdHldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNociB8fCBzO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEh0bWw1RW50aXRpZXMuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gbmV3IEh0bWw1RW50aXRpZXMoKS5kZWNvZGUoc3RyKTtcbiAgICB9O1xuICAgIEh0bWw1RW50aXRpZXMucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgY2hhckluZm8gPSBjaGFySW5kZXhbc3RyLmNoYXJDb2RlQXQoaSldO1xuICAgICAgICAgICAgaWYgKGNoYXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFscGhhID0gY2hhckluZm9bc3RyLmNoYXJDb2RlQXQoaSArIDEpXTtcbiAgICAgICAgICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxwaGEgPSBjaGFySW5mb1snJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCImXCIgKyBhbHBoYSArIFwiO1wiO1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBIdG1sNUVudGl0aWVzLmVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlKHN0cik7XG4gICAgfTtcbiAgICBIdG1sNUVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIHZhciBjaGFySW5mbyA9IGNoYXJJbmRleFtjXTtcbiAgICAgICAgICAgIGlmIChjaGFySW5mbykge1xuICAgICAgICAgICAgICAgIHZhciBhbHBoYSA9IGNoYXJJbmZvW3N0ci5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgICAgICAgICAgaWYgKGFscGhhKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFscGhhID0gY2hhckluZm9bJyddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYyA8IDMyIHx8IGMgPiAxMjYpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSHRtbDVFbnRpdGllcy5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xuICAgIH07XG4gICAgSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlTm9uQVNDSUkgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIGlmIChjIDw9IDI1NSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBzdHJbaSsrXTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSHRtbDVFbnRpdGllcy5lbmNvZGVOb25BU0NJSSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcbiAgICB9O1xuICAgIHJldHVybiBIdG1sNUVudGl0aWVzO1xufSgpKTtcbmV4cG9ydHMuSHRtbDVFbnRpdGllcyA9IEh0bWw1RW50aXRpZXM7XG5mdW5jdGlvbiBjcmVhdGVJbmRleGVzKGFscGhhSW5kZXgsIGNoYXJJbmRleCkge1xuICAgIHZhciBpID0gRU5USVRJRVMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIGUgPSBFTlRJVElFU1tpXTtcbiAgICAgICAgdmFyIGFscGhhID0gZVswXTtcbiAgICAgICAgdmFyIGNoYXJzID0gZVsxXTtcbiAgICAgICAgdmFyIGNociA9IGNoYXJzWzBdO1xuICAgICAgICB2YXIgYWRkQ2hhciA9IChjaHIgPCAzMiB8fCBjaHIgPiAxMjYpIHx8IGNociA9PT0gNjIgfHwgY2hyID09PSA2MCB8fCBjaHIgPT09IDM4IHx8IGNociA9PT0gMzQgfHwgY2hyID09PSAzOTtcbiAgICAgICAgdmFyIGNoYXJJbmZvID0gdm9pZCAwO1xuICAgICAgICBpZiAoYWRkQ2hhcikge1xuICAgICAgICAgICAgY2hhckluZm8gPSBjaGFySW5kZXhbY2hyXSA9IGNoYXJJbmRleFtjaHJdIHx8IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyc1sxXSkge1xuICAgICAgICAgICAgdmFyIGNocjIgPSBjaGFyc1sxXTtcbiAgICAgICAgICAgIGFscGhhSW5kZXhbYWxwaGFdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIyKTtcbiAgICAgICAgICAgIGFkZENoYXIgJiYgKGNoYXJJbmZvW2NocjJdID0gYWxwaGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxwaGFJbmRleFthbHBoYV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocik7XG4gICAgICAgICAgICBhZGRDaGFyICYmIChjaGFySW5mb1snJ10gPSBhbHBoYSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB4bWxfZW50aXRpZXNfMSA9IHJlcXVpcmUoXCIuL3htbC1lbnRpdGllc1wiKTtcbmV4cG9ydHMuWG1sRW50aXRpZXMgPSB4bWxfZW50aXRpZXNfMS5YbWxFbnRpdGllcztcbnZhciBodG1sNF9lbnRpdGllc18xID0gcmVxdWlyZShcIi4vaHRtbDQtZW50aXRpZXNcIik7XG5leHBvcnRzLkh0bWw0RW50aXRpZXMgPSBodG1sNF9lbnRpdGllc18xLkh0bWw0RW50aXRpZXM7XG52YXIgaHRtbDVfZW50aXRpZXNfMSA9IHJlcXVpcmUoXCIuL2h0bWw1LWVudGl0aWVzXCIpO1xuZXhwb3J0cy5IdG1sNUVudGl0aWVzID0gaHRtbDVfZW50aXRpZXNfMS5IdG1sNUVudGl0aWVzO1xuZXhwb3J0cy5BbGxIdG1sRW50aXRpZXMgPSBodG1sNV9lbnRpdGllc18xLkh0bWw1RW50aXRpZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBBTFBIQV9JTkRFWCA9IHtcbiAgICAnJmx0JzogJzwnLFxuICAgICcmZ3QnOiAnPicsXG4gICAgJyZxdW90JzogJ1wiJyxcbiAgICAnJmFwb3MnOiAnXFwnJyxcbiAgICAnJmFtcCc6ICcmJyxcbiAgICAnJmx0Oyc6ICc8JyxcbiAgICAnJmd0Oyc6ICc+JyxcbiAgICAnJnF1b3Q7JzogJ1wiJyxcbiAgICAnJmFwb3M7JzogJ1xcJycsXG4gICAgJyZhbXA7JzogJyYnXG59O1xudmFyIENIQVJfSU5ERVggPSB7XG4gICAgNjA6ICdsdCcsXG4gICAgNjI6ICdndCcsXG4gICAgMzQ6ICdxdW90JyxcbiAgICAzOTogJ2Fwb3MnLFxuICAgIDM4OiAnYW1wJ1xufTtcbnZhciBDSEFSX1NfSU5ERVggPSB7XG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJ1xcJyc6ICcmYXBvczsnLFxuICAgICcmJzogJyZhbXA7J1xufTtcbnZhciBYbWxFbnRpdGllcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBYbWxFbnRpdGllcygpIHtcbiAgICB9XG4gICAgWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1s8PlwiJyZdL2csIGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gQ0hBUl9TX0lOREVYW3NdO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFhtbEVudGl0aWVzLmVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmVuY29kZShzdHIpO1xuICAgIH07XG4gICAgWG1sRW50aXRpZXMucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYjP1swLTlhLXpBLVpdKzs/L2csIGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBpZiAocy5jaGFyQXQoMSkgPT09ICcjJykge1xuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gcy5jaGFyQXQoMikudG9Mb3dlckNhc2UoKSA9PT0gJ3gnID9cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQocy5zdWJzdHIoMyksIDE2KSA6XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KHMuc3Vic3RyKDIpKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBBTFBIQV9JTkRFWFtzXSB8fCBzO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFhtbEVudGl0aWVzLmRlY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmRlY29kZShzdHIpO1xuICAgIH07XG4gICAgWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgdmFyIGFscGhhID0gQ0hBUl9JTkRFWFtjXTtcbiAgICAgICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiZcIiArIGFscGhhICsgXCI7XCI7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPCAzMiB8fCBjID4gMTI2KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICcmIycgKyBjICsgJzsnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFhtbEVudGl0aWVzLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xuICAgIH07XG4gICAgWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBpZiAoIXN0ciB8fCAhc3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdHJMZW5naHQgPSBzdHIubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzdHJMZW5naHQpIHtcbiAgICAgICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICBpZiAoYyA8PSAyNTUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gc3RyW2krK107XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFhtbEVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcbiAgICB9O1xuICAgIHJldHVybiBYbWxFbnRpdGllcztcbn0oKSk7XG5leHBvcnRzLlhtbEVudGl0aWVzID0gWG1sRW50aXRpZXM7XG4iLCIvKlxuKiBsb2dsZXZlbCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9waW10ZXJyeS9sb2dsZXZlbFxuKlxuKiBDb3B5cmlnaHQgKGMpIDIwMTMgVGltIFBlcnJ5XG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiovXG4oZnVuY3Rpb24gKHJvb3QsIGRlZmluaXRpb24pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShkZWZpbml0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QubG9nID0gZGVmaW5pdGlvbigpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gU2xpZ2h0bHkgZHViaW91cyB0cmlja3MgdG8gY3V0IGRvd24gbWluaW1pemVkIGZpbGUgc2l6ZVxuICAgIHZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcbiAgICB2YXIgdW5kZWZpbmVkVHlwZSA9IFwidW5kZWZpbmVkXCI7XG4gICAgdmFyIGlzSUUgPSAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSkgJiYgKHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yICE9PSB1bmRlZmluZWRUeXBlKSAmJiAoXG4gICAgICAgIC9UcmlkZW50XFwvfE1TSUUgLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgICk7XG5cbiAgICB2YXIgbG9nTWV0aG9kcyA9IFtcbiAgICAgICAgXCJ0cmFjZVwiLFxuICAgICAgICBcImRlYnVnXCIsXG4gICAgICAgIFwiaW5mb1wiLFxuICAgICAgICBcIndhcm5cIixcbiAgICAgICAgXCJlcnJvclwiXG4gICAgXTtcblxuICAgIC8vIENyb3NzLWJyb3dzZXIgYmluZCBlcXVpdmFsZW50IHRoYXQgd29ya3MgYXQgbGVhc3QgYmFjayB0byBJRTZcbiAgICBmdW5jdGlvbiBiaW5kTWV0aG9kKG9iaiwgbWV0aG9kTmFtZSkge1xuICAgICAgICB2YXIgbWV0aG9kID0gb2JqW21ldGhvZE5hbWVdO1xuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZC5iaW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmJpbmQob2JqKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwobWV0aG9kLCBvYmopO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIE1pc3NpbmcgYmluZCBzaGltIG9yIElFOCArIE1vZGVybml6ciwgZmFsbGJhY2sgdG8gd3JhcHBpbmdcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuYXBwbHkobWV0aG9kLCBbb2JqLCBhcmd1bWVudHNdKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhY2UoKSBkb2Vzbid0IHByaW50IHRoZSBtZXNzYWdlIGluIElFLCBzbyBmb3IgdGhhdCBjYXNlIHdlIG5lZWQgdG8gd3JhcCBpdFxuICAgIGZ1bmN0aW9uIHRyYWNlRm9ySUUoKSB7XG4gICAgICAgIGlmIChjb25zb2xlLmxvZykge1xuICAgICAgICAgICAgaWYgKGNvbnNvbGUubG9nLmFwcGx5KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW4gb2xkIElFLCBuYXRpdmUgY29uc29sZSBtZXRob2RzIHRoZW1zZWx2ZXMgZG9uJ3QgaGF2ZSBhcHBseSgpLlxuICAgICAgICAgICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5hcHBseShjb25zb2xlLmxvZywgW2NvbnNvbGUsIGFyZ3VtZW50c10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb25zb2xlLnRyYWNlKSBjb25zb2xlLnRyYWNlKCk7XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgdGhlIGJlc3QgbG9nZ2luZyBtZXRob2QgcG9zc2libGUgZm9yIHRoaXMgZW52XG4gICAgLy8gV2hlcmV2ZXIgcG9zc2libGUgd2Ugd2FudCB0byBiaW5kLCBub3Qgd3JhcCwgdG8gcHJlc2VydmUgc3RhY2sgdHJhY2VzXG4gICAgZnVuY3Rpb24gcmVhbE1ldGhvZChtZXRob2ROYW1lKSB7XG4gICAgICAgIGlmIChtZXRob2ROYW1lID09PSAnZGVidWcnKSB7XG4gICAgICAgICAgICBtZXRob2ROYW1lID0gJ2xvZyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09IHVuZGVmaW5lZFR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm8gbWV0aG9kIHBvc3NpYmxlLCBmb3Igbm93IC0gZml4ZWQgbGF0ZXIgYnkgZW5hYmxlTG9nZ2luZ1doZW5Db25zb2xlQXJyaXZlc1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZE5hbWUgPT09ICd0cmFjZScgJiYgaXNJRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNlRm9ySUU7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uc29sZVttZXRob2ROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYmluZE1ldGhvZChjb25zb2xlLCBtZXRob2ROYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25zb2xlLmxvZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYmluZE1ldGhvZChjb25zb2xlLCAnbG9nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbm9vcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoZXNlIHByaXZhdGUgZnVuY3Rpb25zIGFsd2F5cyBuZWVkIGB0aGlzYCB0byBiZSBzZXQgcHJvcGVybHlcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VMb2dnaW5nTWV0aG9kcyhsZXZlbCwgbG9nZ2VyTmFtZSkge1xuICAgICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvZ01ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtZXRob2ROYW1lID0gbG9nTWV0aG9kc1tpXTtcbiAgICAgICAgICAgIHRoaXNbbWV0aG9kTmFtZV0gPSAoaSA8IGxldmVsKSA/XG4gICAgICAgICAgICAgICAgbm9vcCA6XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RGYWN0b3J5KG1ldGhvZE5hbWUsIGxldmVsLCBsb2dnZXJOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmluZSBsb2cubG9nIGFzIGFuIGFsaWFzIGZvciBsb2cuZGVidWdcbiAgICAgICAgdGhpcy5sb2cgPSB0aGlzLmRlYnVnO1xuICAgIH1cblxuICAgIC8vIEluIG9sZCBJRSB2ZXJzaW9ucywgdGhlIGNvbnNvbGUgaXNuJ3QgcHJlc2VudCB1bnRpbCB5b3UgZmlyc3Qgb3BlbiBpdC5cbiAgICAvLyBXZSBidWlsZCByZWFsTWV0aG9kKCkgcmVwbGFjZW1lbnRzIGhlcmUgdGhhdCByZWdlbmVyYXRlIGxvZ2dpbmcgbWV0aG9kc1xuICAgIGZ1bmN0aW9uIGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXMobWV0aG9kTmFtZSwgbGV2ZWwsIGxvZ2dlck5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gdW5kZWZpbmVkVHlwZSkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VMb2dnaW5nTWV0aG9kcy5jYWxsKHRoaXMsIGxldmVsLCBsb2dnZXJOYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzW21ldGhvZE5hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQnkgZGVmYXVsdCwgd2UgdXNlIGNsb3NlbHkgYm91bmQgcmVhbCBtZXRob2RzIHdoZXJldmVyIHBvc3NpYmxlLCBhbmRcbiAgICAvLyBvdGhlcndpc2Ugd2Ugd2FpdCBmb3IgYSBjb25zb2xlIHRvIGFwcGVhciwgYW5kIHRoZW4gdHJ5IGFnYWluLlxuICAgIGZ1bmN0aW9uIGRlZmF1bHRNZXRob2RGYWN0b3J5KG1ldGhvZE5hbWUsIGxldmVsLCBsb2dnZXJOYW1lKSB7XG4gICAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICAgIHJldHVybiByZWFsTWV0aG9kKG1ldGhvZE5hbWUpIHx8XG4gICAgICAgICAgICAgICBlbmFibGVMb2dnaW5nV2hlbkNvbnNvbGVBcnJpdmVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTG9nZ2VyKG5hbWUsIGRlZmF1bHRMZXZlbCwgZmFjdG9yeSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGN1cnJlbnRMZXZlbDtcbiAgICAgIHZhciBzdG9yYWdlS2V5ID0gXCJsb2dsZXZlbFwiO1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgc3RvcmFnZUtleSArPSBcIjpcIiArIG5hbWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBlcnNpc3RMZXZlbElmUG9zc2libGUobGV2ZWxOdW0pIHtcbiAgICAgICAgICB2YXIgbGV2ZWxOYW1lID0gKGxvZ01ldGhvZHNbbGV2ZWxOdW1dIHx8ICdzaWxlbnQnKS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IHVuZGVmaW5lZFR5cGUpIHJldHVybjtcblxuICAgICAgICAgIC8vIFVzZSBsb2NhbFN0b3JhZ2UgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVtzdG9yYWdlS2V5XSA9IGxldmVsTmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cblxuICAgICAgICAgIC8vIFVzZSBzZXNzaW9uIGNvb2tpZSBhcyBmYWxsYmFja1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPVxuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdG9yYWdlS2V5KSArIFwiPVwiICsgbGV2ZWxOYW1lICsgXCI7XCI7XG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRQZXJzaXN0ZWRMZXZlbCgpIHtcbiAgICAgICAgICB2YXIgc3RvcmVkTGV2ZWw7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gdW5kZWZpbmVkVHlwZSkgcmV0dXJuO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSB3aW5kb3cubG9jYWxTdG9yYWdlW3N0b3JhZ2VLZXldO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cblxuICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIGNvb2tpZXMgaWYgbG9jYWwgc3RvcmFnZSBnaXZlcyB1cyBub3RoaW5nXG4gICAgICAgICAgaWYgKHR5cGVvZiBzdG9yZWRMZXZlbCA9PT0gdW5kZWZpbmVkVHlwZSkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNvb2tpZSA9IHdpbmRvdy5kb2N1bWVudC5jb29raWU7XG4gICAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBjb29raWUuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RvcmFnZUtleSkgKyBcIj1cIik7XG4gICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24gIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSAvXihbXjtdKykvLmV4ZWMoY29va2llLnNsaWNlKGxvY2F0aW9uKSlbMV07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiB0aGUgc3RvcmVkIGxldmVsIGlzIG5vdCB2YWxpZCwgdHJlYXQgaXQgYXMgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuICAgICAgICAgIGlmIChzZWxmLmxldmVsc1tzdG9yZWRMZXZlbF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBzdG9yZWRMZXZlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3RvcmVkTGV2ZWw7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKlxuICAgICAgICogUHVibGljIGxvZ2dlciBBUEkgLSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BpbXRlcnJ5L2xvZ2xldmVsIGZvciBkZXRhaWxzXG4gICAgICAgKlxuICAgICAgICovXG5cbiAgICAgIHNlbGYubmFtZSA9IG5hbWU7XG5cbiAgICAgIHNlbGYubGV2ZWxzID0geyBcIlRSQUNFXCI6IDAsIFwiREVCVUdcIjogMSwgXCJJTkZPXCI6IDIsIFwiV0FSTlwiOiAzLFxuICAgICAgICAgIFwiRVJST1JcIjogNCwgXCJTSUxFTlRcIjogNX07XG5cbiAgICAgIHNlbGYubWV0aG9kRmFjdG9yeSA9IGZhY3RvcnkgfHwgZGVmYXVsdE1ldGhvZEZhY3Rvcnk7XG5cbiAgICAgIHNlbGYuZ2V0TGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRMZXZlbDtcbiAgICAgIH07XG5cbiAgICAgIHNlbGYuc2V0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwsIHBlcnNpc3QpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGxldmVsID09PSBcInN0cmluZ1wiICYmIHNlbGYubGV2ZWxzW2xldmVsLnRvVXBwZXJDYXNlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgbGV2ZWwgPSBzZWxmLmxldmVsc1tsZXZlbC50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gXCJudW1iZXJcIiAmJiBsZXZlbCA+PSAwICYmIGxldmVsIDw9IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xuICAgICAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgICAgaWYgKHBlcnNpc3QgIT09IGZhbHNlKSB7ICAvLyBkZWZhdWx0cyB0byB0cnVlXG4gICAgICAgICAgICAgICAgICBwZXJzaXN0TGV2ZWxJZlBvc3NpYmxlKGxldmVsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXBsYWNlTG9nZ2luZ01ldGhvZHMuY2FsbChzZWxmLCBsZXZlbCwgbmFtZSk7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gdW5kZWZpbmVkVHlwZSAmJiBsZXZlbCA8IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTm8gY29uc29sZSBhdmFpbGFibGUgZm9yIGxvZ2dpbmdcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IFwibG9nLnNldExldmVsKCkgY2FsbGVkIHdpdGggaW52YWxpZCBsZXZlbDogXCIgKyBsZXZlbDtcbiAgICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZWxmLnNldERlZmF1bHRMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICAgIGlmICghZ2V0UGVyc2lzdGVkTGV2ZWwoKSkge1xuICAgICAgICAgICAgICBzZWxmLnNldExldmVsKGxldmVsLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2VsZi5lbmFibGVBbGwgPSBmdW5jdGlvbihwZXJzaXN0KSB7XG4gICAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5UUkFDRSwgcGVyc2lzdCk7XG4gICAgICB9O1xuXG4gICAgICBzZWxmLmRpc2FibGVBbGwgPSBmdW5jdGlvbihwZXJzaXN0KSB7XG4gICAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5TSUxFTlQsIHBlcnNpc3QpO1xuICAgICAgfTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSB3aXRoIHRoZSByaWdodCBsZXZlbFxuICAgICAgdmFyIGluaXRpYWxMZXZlbCA9IGdldFBlcnNpc3RlZExldmVsKCk7XG4gICAgICBpZiAoaW5pdGlhbExldmVsID09IG51bGwpIHtcbiAgICAgICAgICBpbml0aWFsTGV2ZWwgPSBkZWZhdWx0TGV2ZWwgPT0gbnVsbCA/IFwiV0FSTlwiIDogZGVmYXVsdExldmVsO1xuICAgICAgfVxuICAgICAgc2VsZi5zZXRMZXZlbChpbml0aWFsTGV2ZWwsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqXG4gICAgICogVG9wLWxldmVsIEFQSVxuICAgICAqXG4gICAgICovXG5cbiAgICB2YXIgZGVmYXVsdExvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuICAgIHZhciBfbG9nZ2Vyc0J5TmFtZSA9IHt9O1xuICAgIGRlZmF1bHRMb2dnZXIuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gZ2V0TG9nZ2VyKG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiIHx8IG5hbWUgPT09IFwiXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiWW91IG11c3Qgc3VwcGx5IGEgbmFtZSB3aGVuIGNyZWF0aW5nIGEgbG9nZ2VyLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsb2dnZXIgPSBfbG9nZ2Vyc0J5TmFtZVtuYW1lXTtcbiAgICAgICAgaWYgKCFsb2dnZXIpIHtcbiAgICAgICAgICBsb2dnZXIgPSBfbG9nZ2Vyc0J5TmFtZVtuYW1lXSA9IG5ldyBMb2dnZXIoXG4gICAgICAgICAgICBuYW1lLCBkZWZhdWx0TG9nZ2VyLmdldExldmVsKCksIGRlZmF1bHRMb2dnZXIubWV0aG9kRmFjdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvZ2dlcjtcbiAgICB9O1xuXG4gICAgLy8gR3JhYiB0aGUgY3VycmVudCBnbG9iYWwgbG9nIHZhcmlhYmxlIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gICAgdmFyIF9sb2cgPSAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSkgPyB3aW5kb3cubG9nIDogdW5kZWZpbmVkO1xuICAgIGRlZmF1bHRMb2dnZXIubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSAmJlxuICAgICAgICAgICAgICAgd2luZG93LmxvZyA9PT0gZGVmYXVsdExvZ2dlcikge1xuICAgICAgICAgICAgd2luZG93LmxvZyA9IF9sb2c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmYXVsdExvZ2dlcjtcbiAgICB9O1xuXG4gICAgZGVmYXVsdExvZ2dlci5nZXRMb2dnZXJzID0gZnVuY3Rpb24gZ2V0TG9nZ2VycygpIHtcbiAgICAgICAgcmV0dXJuIF9sb2dnZXJzQnlOYW1lO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVmYXVsdExvZ2dlcjtcbn0pKTtcbiIsIi8qISBodHRwczovL210aHMuYmUvcHVueWNvZGUgdjEuNC4xIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGVzICovXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiZcblx0XHQhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0IW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChcblx0XHRmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsXG5cdCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgcHVueWNvZGVgIG9iamVjdC5cblx0ICogQG5hbWUgcHVueWNvZGVcblx0ICogQHR5cGUgT2JqZWN0XG5cdCAqL1xuXHR2YXIgcHVueWNvZGUsXG5cblx0LyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXHRtYXhJbnQgPSAyMTQ3NDgzNjQ3LCAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cblx0LyoqIEJvb3RzdHJpbmcgcGFyYW1ldGVycyAqL1xuXHRiYXNlID0gMzYsXG5cdHRNaW4gPSAxLFxuXHR0TWF4ID0gMjYsXG5cdHNrZXcgPSAzOCxcblx0ZGFtcCA9IDcwMCxcblx0aW5pdGlhbEJpYXMgPSA3Mixcblx0aW5pdGlhbE4gPSAxMjgsIC8vIDB4ODBcblx0ZGVsaW1pdGVyID0gJy0nLCAvLyAnXFx4MkQnXG5cblx0LyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cblx0cmVnZXhQdW55Y29kZSA9IC9eeG4tLS8sXG5cdHJlZ2V4Tm9uQVNDSUkgPSAvW15cXHgyMC1cXHg3RV0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cblx0LyoqIEVycm9yIG1lc3NhZ2VzICovXG5cdGVycm9ycyA9IHtcblx0XHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHRcdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0fSxcblxuXHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbixcblx0Zmxvb3IgPSBNYXRoLmZsb29yLFxuXHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXG5cdC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgKi9cblx0a2V5O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG5cdCAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cblx0ICovXG5cdGZ1bmN0aW9uIGVycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuNC4xJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykge1xuXHRcdFx0Ly8gaW4gTm9kZS5qcywgaW8uanMsIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKGtleSBpbiBwdW55Y29kZSkge1xuXHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG1hcChvYmplY3RLZXlzKG9iaiksIGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBtYXAob2JqW2tdLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsIi8qIHNvY2tqcy1jbGllbnQgdjEuNC4wIHwgaHR0cDovL3NvY2tqcy5vcmcgfCBNSVQgbGljZW5zZSAqL1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuU29ja0pTID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciB0cmFuc3BvcnRMaXN0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQtbGlzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbWFpbicpKHRyYW5zcG9ydExpc3QpO1xuXG4vLyBUT0RPIGNhbid0IGdldCByaWQgb2YgdGhpcyB1bnRpbCBhbGwgc2VydmVycyBkb1xuaWYgKCdfc29ja2pzX29ubG9hZCcgaW4gZ2xvYmFsKSB7XG4gIHNldFRpbWVvdXQoZ2xvYmFsLl9zb2NranNfb25sb2FkLCAxKTtcbn1cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wiLi9tYWluXCI6MTQsXCIuL3RyYW5zcG9ydC1saXN0XCI6MTZ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudCcpXG4gIDtcblxuZnVuY3Rpb24gQ2xvc2VFdmVudCgpIHtcbiAgRXZlbnQuY2FsbCh0aGlzKTtcbiAgdGhpcy5pbml0RXZlbnQoJ2Nsb3NlJywgZmFsc2UsIGZhbHNlKTtcbiAgdGhpcy53YXNDbGVhbiA9IGZhbHNlO1xuICB0aGlzLmNvZGUgPSAwO1xuICB0aGlzLnJlYXNvbiA9ICcnO1xufVxuXG5pbmhlcml0cyhDbG9zZUV2ZW50LCBFdmVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xvc2VFdmVudDtcblxufSx7XCIuL2V2ZW50XCI6NCxcImluaGVyaXRzXCI6NTd9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9ldmVudHRhcmdldCcpXG4gIDtcblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xufVxuXG5pbmhlcml0cyhFdmVudEVtaXR0ZXIsIEV2ZW50VGFyZ2V0KTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0eXBlKSB7XG4gICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gICAgLCBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5vbih0eXBlLCBnKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdHlwZSA9IGFyZ3VtZW50c1swXTtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZXF1aXZhbGVudCBvZiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcbiAgZm9yICh2YXIgYWkgPSAxOyBhaSA8IGw7IGFpKyspIHtcbiAgICBhcmdzW2FpIC0gMV0gPSBhcmd1bWVudHNbYWldO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuXG5tb2R1bGUuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbn0se1wiLi9ldmVudHRhcmdldFwiOjUsXCJpbmhlcml0c1wiOjU3fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEV2ZW50KGV2ZW50VHlwZSkge1xuICB0aGlzLnR5cGUgPSBldmVudFR5cGU7XG59XG5cbkV2ZW50LnByb3RvdHlwZS5pbml0RXZlbnQgPSBmdW5jdGlvbihldmVudFR5cGUsIGNhbkJ1YmJsZSwgY2FuY2VsYWJsZSkge1xuICB0aGlzLnR5cGUgPSBldmVudFR5cGU7XG4gIHRoaXMuYnViYmxlcyA9IGNhbkJ1YmJsZTtcbiAgdGhpcy5jYW5jZWxhYmxlID0gY2FuY2VsYWJsZTtcbiAgdGhpcy50aW1lU3RhbXAgPSArbmV3IERhdGUoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oKSB7fTtcbkV2ZW50LnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge307XG5cbkV2ZW50LkNBUFRVUklOR19QSEFTRSA9IDE7XG5FdmVudC5BVF9UQVJHRVQgPSAyO1xuRXZlbnQuQlVCQkxJTkdfUEhBU0UgPSAzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50O1xuXG59LHt9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyogU2ltcGxpZmllZCBpbXBsZW1lbnRhdGlvbiBvZiBET00yIEV2ZW50VGFyZ2V0LlxuICogICBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1FdmVudHMvZXZlbnRzLmh0bWwjRXZlbnRzLUV2ZW50VGFyZ2V0XG4gKi9cblxuZnVuY3Rpb24gRXZlbnRUYXJnZXQoKSB7XG4gIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xufVxuXG5FdmVudFRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCEoZXZlbnRUeXBlIGluIHRoaXMuX2xpc3RlbmVycykpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnRUeXBlXSA9IFtdO1xuICB9XG4gIHZhciBhcnIgPSB0aGlzLl9saXN0ZW5lcnNbZXZlbnRUeXBlXTtcbiAgLy8gIzRcbiAgaWYgKGFyci5pbmRleE9mKGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAvLyBNYWtlIGEgY29weSBzbyBhcyBub3QgdG8gaW50ZXJmZXJlIHdpdGggYSBjdXJyZW50IGRpc3BhdGNoRXZlbnQuXG4gICAgYXJyID0gYXJyLmNvbmNhdChbbGlzdGVuZXJdKTtcbiAgfVxuICB0aGlzLl9saXN0ZW5lcnNbZXZlbnRUeXBlXSA9IGFycjtcbn07XG5cbkV2ZW50VGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBsaXN0ZW5lcikge1xuICB2YXIgYXJyID0gdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gIGlmICghYXJyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpZHggPSBhcnIuaW5kZXhPZihsaXN0ZW5lcik7XG4gIGlmIChpZHggIT09IC0xKSB7XG4gICAgaWYgKGFyci5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBNYWtlIGEgY29weSBzbyBhcyBub3QgdG8gaW50ZXJmZXJlIHdpdGggYSBjdXJyZW50IGRpc3BhdGNoRXZlbnQuXG4gICAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnRUeXBlXSA9IGFyci5zbGljZSgwLCBpZHgpLmNvbmNhdChhcnIuc2xpY2UoaWR4ICsgMSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxufTtcblxuRXZlbnRUYXJnZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGV2ZW50ID0gYXJndW1lbnRzWzBdO1xuICB2YXIgdCA9IGV2ZW50LnR5cGU7XG4gIC8vIGVxdWl2YWxlbnQgb2YgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gW2V2ZW50XSA6IEFycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIC8vIFRPRE86IFRoaXMgZG9lc24ndCBtYXRjaCB0aGUgcmVhbCBiZWhhdmlvcjsgcGVyIHNwZWMsIG9uZm9vIGdldFxuICAvLyB0aGVpciBwbGFjZSBpbiBsaW5lIGZyb20gdGhlIC9maXJzdC8gdGltZSB0aGV5J3JlIHNldCBmcm9tXG4gIC8vIG5vbi1udWxsLiBBbHRob3VnaCBXZWJLaXQgYnVtcHMgaXQgdG8gdGhlIGVuZCBldmVyeSB0aW1lIGl0J3NcbiAgLy8gc2V0LlxuICBpZiAodGhpc1snb24nICsgdF0pIHtcbiAgICB0aGlzWydvbicgKyB0XS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuICBpZiAodCBpbiB0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAvLyBHcmFiIGEgcmVmZXJlbmNlIHRvIHRoZSBsaXN0ZW5lcnMgbGlzdC4gcmVtb3ZlRXZlbnRMaXN0ZW5lciBtYXkgYWx0ZXIgdGhlIGxpc3QuXG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1t0XTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFRhcmdldDtcblxufSx7fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBFdmVudCA9IHJlcXVpcmUoJy4vZXZlbnQnKVxuICA7XG5cbmZ1bmN0aW9uIFRyYW5zcG9ydE1lc3NhZ2VFdmVudChkYXRhKSB7XG4gIEV2ZW50LmNhbGwodGhpcyk7XG4gIHRoaXMuaW5pdEV2ZW50KCdtZXNzYWdlJywgZmFsc2UsIGZhbHNlKTtcbiAgdGhpcy5kYXRhID0gZGF0YTtcbn1cblxuaW5oZXJpdHMoVHJhbnNwb3J0TWVzc2FnZUV2ZW50LCBFdmVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0TWVzc2FnZUV2ZW50O1xuXG59LHtcIi4vZXZlbnRcIjo0LFwiaW5oZXJpdHNcIjo1N31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpXG4gICwgaWZyYW1lVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL2lmcmFtZScpXG4gIDtcblxuZnVuY3Rpb24gRmFjYWRlSlModHJhbnNwb3J0KSB7XG4gIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgdHJhbnNwb3J0Lm9uKCdtZXNzYWdlJywgdGhpcy5fdHJhbnNwb3J0TWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgdHJhbnNwb3J0Lm9uKCdjbG9zZScsIHRoaXMuX3RyYW5zcG9ydENsb3NlLmJpbmQodGhpcykpO1xufVxuXG5GYWNhZGVKUy5wcm90b3R5cGUuX3RyYW5zcG9ydENsb3NlID0gZnVuY3Rpb24oY29kZSwgcmVhc29uKSB7XG4gIGlmcmFtZVV0aWxzLnBvc3RNZXNzYWdlKCdjJywgSlNPTjMuc3RyaW5naWZ5KFtjb2RlLCByZWFzb25dKSk7XG59O1xuRmFjYWRlSlMucHJvdG90eXBlLl90cmFuc3BvcnRNZXNzYWdlID0gZnVuY3Rpb24oZnJhbWUpIHtcbiAgaWZyYW1lVXRpbHMucG9zdE1lc3NhZ2UoJ3QnLCBmcmFtZSk7XG59O1xuRmFjYWRlSlMucHJvdG90eXBlLl9zZW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLl90cmFuc3BvcnQuc2VuZChkYXRhKTtcbn07XG5GYWNhZGVKUy5wcm90b3R5cGUuX2Nsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3RyYW5zcG9ydC5jbG9zZSgpO1xuICB0aGlzLl90cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZhY2FkZUpTO1xuXG59LHtcIi4vdXRpbHMvaWZyYW1lXCI6NDcsXCJqc29uM1wiOjU4fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXJsVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL3VybCcpXG4gICwgZXZlbnRVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnQnKVxuICAsIEpTT04zID0gcmVxdWlyZSgnanNvbjMnKVxuICAsIEZhY2FkZUpTID0gcmVxdWlyZSgnLi9mYWNhZGUnKVxuICAsIEluZm9JZnJhbWVSZWNlaXZlciA9IHJlcXVpcmUoJy4vaW5mby1pZnJhbWUtcmVjZWl2ZXInKVxuICAsIGlmcmFtZVV0aWxzID0gcmVxdWlyZSgnLi91dGlscy9pZnJhbWUnKVxuICAsIGxvYyA9IHJlcXVpcmUoJy4vbG9jYXRpb24nKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6aWZyYW1lLWJvb3RzdHJhcCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFNvY2tKUywgYXZhaWxhYmxlVHJhbnNwb3J0cykge1xuICB2YXIgdHJhbnNwb3J0TWFwID0ge307XG4gIGF2YWlsYWJsZVRyYW5zcG9ydHMuZm9yRWFjaChmdW5jdGlvbihhdCkge1xuICAgIGlmIChhdC5mYWNhZGVUcmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zcG9ydE1hcFthdC5mYWNhZGVUcmFuc3BvcnQudHJhbnNwb3J0TmFtZV0gPSBhdC5mYWNhZGVUcmFuc3BvcnQ7XG4gICAgfVxuICB9KTtcblxuICAvLyBoYXJkLWNvZGVkIGZvciB0aGUgaW5mbyBpZnJhbWVcbiAgLy8gVE9ETyBzZWUgaWYgd2UgY2FuIG1ha2UgdGhpcyBtb3JlIGR5bmFtaWNcbiAgdHJhbnNwb3J0TWFwW0luZm9JZnJhbWVSZWNlaXZlci50cmFuc3BvcnROYW1lXSA9IEluZm9JZnJhbWVSZWNlaXZlcjtcbiAgdmFyIHBhcmVudE9yaWdpbjtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgU29ja0pTLmJvb3RzdHJhcF9pZnJhbWUgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuICAgIHZhciBmYWNhZGU7XG4gICAgaWZyYW1lVXRpbHMuY3VycmVudFdpbmRvd0lkID0gbG9jLmhhc2guc2xpY2UoMSk7XG4gICAgdmFyIG9uTWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLnNvdXJjZSAhPT0gcGFyZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGFyZW50T3JpZ2luID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJlbnRPcmlnaW4gPSBlLm9yaWdpbjtcbiAgICAgIH1cbiAgICAgIGlmIChlLm9yaWdpbiAhPT0gcGFyZW50T3JpZ2luKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGlmcmFtZU1lc3NhZ2U7XG4gICAgICB0cnkge1xuICAgICAgICBpZnJhbWVNZXNzYWdlID0gSlNPTjMucGFyc2UoZS5kYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICAgICAgZGVidWcoJ2JhZCBqc29uJywgZS5kYXRhKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaWZyYW1lTWVzc2FnZS53aW5kb3dJZCAhPT0gaWZyYW1lVXRpbHMuY3VycmVudFdpbmRvd0lkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoaWZyYW1lTWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgdmFyIHA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcCA9IEpTT04zLnBhcnNlKGlmcmFtZU1lc3NhZ2UuZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICAgICAgICBkZWJ1ZygnYmFkIGpzb24nLCBpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2ZXJzaW9uID0gcFswXTtcbiAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHBbMV07XG4gICAgICAgIHZhciB0cmFuc1VybCA9IHBbMl07XG4gICAgICAgIHZhciBiYXNlVXJsID0gcFszXTtcbiAgICAgICAgZGVidWcodmVyc2lvbiwgdHJhbnNwb3J0LCB0cmFuc1VybCwgYmFzZVVybCk7XG4gICAgICAgIC8vIGNoYW5nZSB0aGlzIHRvIHNlbXZlciBsb2dpY1xuICAgICAgICBpZiAodmVyc2lvbiAhPT0gU29ja0pTLnZlcnNpb24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29tcGF0aWJsZSBTb2NrSlMhIE1haW4gc2l0ZSB1c2VzOicgK1xuICAgICAgICAgICAgICAgICAgICAnIFwiJyArIHZlcnNpb24gKyAnXCIsIHRoZSBpZnJhbWU6JyArXG4gICAgICAgICAgICAgICAgICAgICcgXCInICsgU29ja0pTLnZlcnNpb24gKyAnXCIuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXVybFV0aWxzLmlzT3JpZ2luRXF1YWwodHJhbnNVcmwsIGxvYy5ocmVmKSB8fFxuICAgICAgICAgICAgIXVybFV0aWxzLmlzT3JpZ2luRXF1YWwoYmFzZVVybCwgbG9jLmhyZWYpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IGNvbm5lY3QgdG8gZGlmZmVyZW50IGRvbWFpbiBmcm9tIHdpdGhpbiBhbiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2lmcmFtZS4gKCcgKyBsb2MuaHJlZiArICcsICcgKyB0cmFuc1VybCArICcsICcgKyBiYXNlVXJsICsgJyknKTtcbiAgICAgICAgfVxuICAgICAgICBmYWNhZGUgPSBuZXcgRmFjYWRlSlMobmV3IHRyYW5zcG9ydE1hcFt0cmFuc3BvcnRdKHRyYW5zVXJsLCBiYXNlVXJsKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIGZhY2FkZS5fc2VuZChpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2MnOlxuICAgICAgICBpZiAoZmFjYWRlKSB7XG4gICAgICAgICAgZmFjYWRlLl9jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZhY2FkZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdtZXNzYWdlJywgb25NZXNzYWdlKTtcblxuICAgIC8vIFN0YXJ0XG4gICAgaWZyYW1lVXRpbHMucG9zdE1lc3NhZ2UoJ3MnKTtcbiAgfTtcbn07XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSlcblxufSx7XCIuL2ZhY2FkZVwiOjcsXCIuL2luZm8taWZyYW1lLXJlY2VpdmVyXCI6MTAsXCIuL2xvY2F0aW9uXCI6MTMsXCIuL3V0aWxzL2V2ZW50XCI6NDYsXCIuL3V0aWxzL2lmcmFtZVwiOjQ3LFwiLi91dGlscy91cmxcIjo1MixcImRlYnVnXCI6NTUsXCJqc29uM1wiOjU4fV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gICwgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpXG4gICwgb2JqZWN0VXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL29iamVjdCcpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDppbmZvLWFqYXgnKTtcbn1cblxuZnVuY3Rpb24gSW5mb0FqYXgodXJsLCBBamF4T2JqZWN0KSB7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHQwID0gK25ldyBEYXRlKCk7XG4gIHRoaXMueG8gPSBuZXcgQWpheE9iamVjdCgnR0VUJywgdXJsKTtcblxuICB0aGlzLnhvLm9uY2UoJ2ZpbmlzaCcsIGZ1bmN0aW9uKHN0YXR1cywgdGV4dCkge1xuICAgIHZhciBpbmZvLCBydHQ7XG4gICAgaWYgKHN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBydHQgPSAoK25ldyBEYXRlKCkpIC0gdDA7XG4gICAgICBpZiAodGV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGluZm8gPSBKU09OMy5wYXJzZSh0ZXh0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnKCdiYWQganNvbicsIHRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghb2JqZWN0VXRpbHMuaXNPYmplY3QoaW5mbykpIHtcbiAgICAgICAgaW5mbyA9IHt9O1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gICAgc2VsZi5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgfSk7XG59XG5cbmluaGVyaXRzKEluZm9BamF4LCBFdmVudEVtaXR0ZXIpO1xuXG5JbmZvQWpheC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgdGhpcy54by5jbG9zZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmZvQWpheDtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9KVxuXG59LHtcIi4vdXRpbHMvb2JqZWN0XCI6NDksXCJkZWJ1Z1wiOjU1LFwiZXZlbnRzXCI6MyxcImluaGVyaXRzXCI6NTcsXCJqc29uM1wiOjU4fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gICwgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpXG4gICwgWEhSTG9jYWxPYmplY3QgPSByZXF1aXJlKCcuL3RyYW5zcG9ydC9zZW5kZXIveGhyLWxvY2FsJylcbiAgLCBJbmZvQWpheCA9IHJlcXVpcmUoJy4vaW5mby1hamF4JylcbiAgO1xuXG5mdW5jdGlvbiBJbmZvUmVjZWl2ZXJJZnJhbWUodHJhbnNVcmwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICB0aGlzLmlyID0gbmV3IEluZm9BamF4KHRyYW5zVXJsLCBYSFJMb2NhbE9iamVjdCk7XG4gIHRoaXMuaXIub25jZSgnZmluaXNoJywgZnVuY3Rpb24oaW5mbywgcnR0KSB7XG4gICAgc2VsZi5pciA9IG51bGw7XG4gICAgc2VsZi5lbWl0KCdtZXNzYWdlJywgSlNPTjMuc3RyaW5naWZ5KFtpbmZvLCBydHRdKSk7XG4gIH0pO1xufVxuXG5pbmhlcml0cyhJbmZvUmVjZWl2ZXJJZnJhbWUsIEV2ZW50RW1pdHRlcik7XG5cbkluZm9SZWNlaXZlcklmcmFtZS50cmFuc3BvcnROYW1lID0gJ2lmcmFtZS1pbmZvLXJlY2VpdmVyJztcblxuSW5mb1JlY2VpdmVySWZyYW1lLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pcikge1xuICAgIHRoaXMuaXIuY2xvc2UoKTtcbiAgICB0aGlzLmlyID0gbnVsbDtcbiAgfVxuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmZvUmVjZWl2ZXJJZnJhbWU7XG5cbn0se1wiLi9pbmZvLWFqYXhcIjo5LFwiLi90cmFuc3BvcnQvc2VuZGVyL3hoci1sb2NhbFwiOjM3LFwiZXZlbnRzXCI6MyxcImluaGVyaXRzXCI6NTcsXCJqc29uM1wiOjU4fV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJylcbiAgLCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnQnKVxuICAsIElmcmFtZVRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0L2lmcmFtZScpXG4gICwgSW5mb1JlY2VpdmVySWZyYW1lID0gcmVxdWlyZSgnLi9pbmZvLWlmcmFtZS1yZWNlaXZlcicpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDppbmZvLWlmcmFtZScpO1xufVxuXG5mdW5jdGlvbiBJbmZvSWZyYW1lKGJhc2VVcmwsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHZhciBnbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpZnIgPSBzZWxmLmlmciA9IG5ldyBJZnJhbWVUcmFuc3BvcnQoSW5mb1JlY2VpdmVySWZyYW1lLnRyYW5zcG9ydE5hbWUsIHVybCwgYmFzZVVybCk7XG5cbiAgICBpZnIub25jZSgnbWVzc2FnZScsIGZ1bmN0aW9uKG1zZykge1xuICAgICAgaWYgKG1zZykge1xuICAgICAgICB2YXIgZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkID0gSlNPTjMucGFyc2UobXNnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnKCdiYWQganNvbicsIG1zZyk7XG4gICAgICAgICAgc2VsZi5lbWl0KCdmaW5pc2gnKTtcbiAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZm8gPSBkWzBdLCBydHQgPSBkWzFdO1xuICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gICAgICB9XG4gICAgICBzZWxmLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpZnIub25jZSgnY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuZW1pdCgnZmluaXNoJyk7XG4gICAgICBzZWxmLmNsb3NlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gVE9ETyB0aGlzIHNlZW1zIHRoZSBzYW1lIGFzIHRoZSAnbmVlZEJvZHknIGZyb20gdHJhbnNwb3J0c1xuICBpZiAoIWdsb2JhbC5kb2N1bWVudC5ib2R5KSB7XG4gICAgdXRpbHMuYXR0YWNoRXZlbnQoJ2xvYWQnLCBnbyk7XG4gIH0gZWxzZSB7XG4gICAgZ28oKTtcbiAgfVxufVxuXG5pbmhlcml0cyhJbmZvSWZyYW1lLCBFdmVudEVtaXR0ZXIpO1xuXG5JbmZvSWZyYW1lLmVuYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIElmcmFtZVRyYW5zcG9ydC5lbmFibGVkKCk7XG59O1xuXG5JbmZvSWZyYW1lLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pZnIpIHtcbiAgICB0aGlzLmlmci5jbG9zZSgpO1xuICB9XG4gIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIHRoaXMuaWZyID0gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb0lmcmFtZTtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9LHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wiLi9pbmZvLWlmcmFtZS1yZWNlaXZlclwiOjEwLFwiLi90cmFuc3BvcnQvaWZyYW1lXCI6MjIsXCIuL3V0aWxzL2V2ZW50XCI6NDYsXCJkZWJ1Z1wiOjU1LFwiZXZlbnRzXCI6MyxcImluaGVyaXRzXCI6NTcsXCJqc29uM1wiOjU4fV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIHVybFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy91cmwnKVxuICAsIFhEUiA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0L3NlbmRlci94ZHInKVxuICAsIFhIUkNvcnMgPSByZXF1aXJlKCcuL3RyYW5zcG9ydC9zZW5kZXIveGhyLWNvcnMnKVxuICAsIFhIUkxvY2FsID0gcmVxdWlyZSgnLi90cmFuc3BvcnQvc2VuZGVyL3hoci1sb2NhbCcpXG4gICwgWEhSRmFrZSA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0L3NlbmRlci94aHItZmFrZScpXG4gICwgSW5mb0lmcmFtZSA9IHJlcXVpcmUoJy4vaW5mby1pZnJhbWUnKVxuICAsIEluZm9BamF4ID0gcmVxdWlyZSgnLi9pbmZvLWFqYXgnKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6aW5mby1yZWNlaXZlcicpO1xufVxuXG5mdW5jdGlvbiBJbmZvUmVjZWl2ZXIoYmFzZVVybCwgdXJsSW5mbykge1xuICBkZWJ1ZyhiYXNlVXJsKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuZG9YaHIoYmFzZVVybCwgdXJsSW5mbyk7XG4gIH0sIDApO1xufVxuXG5pbmhlcml0cyhJbmZvUmVjZWl2ZXIsIEV2ZW50RW1pdHRlcik7XG5cbi8vIFRPRE8gdGhpcyBpcyBjdXJyZW50bHkgaWdub3JpbmcgdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIHRyYW5zcG9ydHMgYW5kIHRoZSB3aGl0ZWxpc3RcblxuSW5mb1JlY2VpdmVyLl9nZXRSZWNlaXZlciA9IGZ1bmN0aW9uKGJhc2VVcmwsIHVybCwgdXJsSW5mbykge1xuICAvLyBkZXRlcm1pbmUgbWV0aG9kIG9mIENPUlMgc3VwcG9ydCAoaWYgbmVlZGVkKVxuICBpZiAodXJsSW5mby5zYW1lT3JpZ2luKSB7XG4gICAgcmV0dXJuIG5ldyBJbmZvQWpheCh1cmwsIFhIUkxvY2FsKTtcbiAgfVxuICBpZiAoWEhSQ29ycy5lbmFibGVkKSB7XG4gICAgcmV0dXJuIG5ldyBJbmZvQWpheCh1cmwsIFhIUkNvcnMpO1xuICB9XG4gIGlmIChYRFIuZW5hYmxlZCAmJiB1cmxJbmZvLnNhbWVTY2hlbWUpIHtcbiAgICByZXR1cm4gbmV3IEluZm9BamF4KHVybCwgWERSKTtcbiAgfVxuICBpZiAoSW5mb0lmcmFtZS5lbmFibGVkKCkpIHtcbiAgICByZXR1cm4gbmV3IEluZm9JZnJhbWUoYmFzZVVybCwgdXJsKTtcbiAgfVxuICByZXR1cm4gbmV3IEluZm9BamF4KHVybCwgWEhSRmFrZSk7XG59O1xuXG5JbmZvUmVjZWl2ZXIucHJvdG90eXBlLmRvWGhyID0gZnVuY3Rpb24oYmFzZVVybCwgdXJsSW5mbykge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgICAsIHVybCA9IHVybFV0aWxzLmFkZFBhdGgoYmFzZVVybCwgJy9pbmZvJylcbiAgICA7XG4gIGRlYnVnKCdkb1hocicsIHVybCk7XG5cbiAgdGhpcy54byA9IEluZm9SZWNlaXZlci5fZ2V0UmVjZWl2ZXIoYmFzZVVybCwgdXJsLCB1cmxJbmZvKTtcblxuICB0aGlzLnRpbWVvdXRSZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCd0aW1lb3V0Jyk7XG4gICAgc2VsZi5fY2xlYW51cChmYWxzZSk7XG4gICAgc2VsZi5lbWl0KCdmaW5pc2gnKTtcbiAgfSwgSW5mb1JlY2VpdmVyLnRpbWVvdXQpO1xuXG4gIHRoaXMueG8ub25jZSgnZmluaXNoJywgZnVuY3Rpb24oaW5mbywgcnR0KSB7XG4gICAgZGVidWcoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gICAgc2VsZi5fY2xlYW51cCh0cnVlKTtcbiAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIGluZm8sIHJ0dCk7XG4gIH0pO1xufTtcblxuSW5mb1JlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKHdhc0NsZWFuKSB7XG4gIGRlYnVnKCdfY2xlYW51cCcpO1xuICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0UmVmKTtcbiAgdGhpcy50aW1lb3V0UmVmID0gbnVsbDtcbiAgaWYgKCF3YXNDbGVhbiAmJiB0aGlzLnhvKSB7XG4gICAgdGhpcy54by5jbG9zZSgpO1xuICB9XG4gIHRoaXMueG8gPSBudWxsO1xufTtcblxuSW5mb1JlY2VpdmVyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgdGhpcy5fY2xlYW51cChmYWxzZSk7XG59O1xuXG5JbmZvUmVjZWl2ZXIudGltZW91dCA9IDgwMDA7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb1JlY2VpdmVyO1xuXG59KS5jYWxsKHRoaXMseyBlbnY6IHt9IH0pXG5cbn0se1wiLi9pbmZvLWFqYXhcIjo5LFwiLi9pbmZvLWlmcmFtZVwiOjExLFwiLi90cmFuc3BvcnQvc2VuZGVyL3hkclwiOjM0LFwiLi90cmFuc3BvcnQvc2VuZGVyL3hoci1jb3JzXCI6MzUsXCIuL3RyYW5zcG9ydC9zZW5kZXIveGhyLWZha2VcIjozNixcIi4vdHJhbnNwb3J0L3NlbmRlci94aHItbG9jYWxcIjozNyxcIi4vdXRpbHMvdXJsXCI6NTIsXCJkZWJ1Z1wiOjU1LFwiZXZlbnRzXCI6MyxcImluaGVyaXRzXCI6NTd9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmxvY2F0aW9uIHx8IHtcbiAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDo4MCdcbiwgcHJvdG9jb2w6ICdodHRwOidcbiwgaG9zdDogJ2xvY2FsaG9zdCdcbiwgcG9ydDogODBcbiwgaHJlZjogJ2h0dHA6Ly9sb2NhbGhvc3QvJ1xuLCBoYXNoOiAnJ1xufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se31dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL3NoaW1zJyk7XG5cbnZhciBVUkwgPSByZXF1aXJlKCd1cmwtcGFyc2UnKVxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEpTT04zID0gcmVxdWlyZSgnanNvbjMnKVxuICAsIHJhbmRvbSA9IHJlcXVpcmUoJy4vdXRpbHMvcmFuZG9tJylcbiAgLCBlc2NhcGUgPSByZXF1aXJlKCcuL3V0aWxzL2VzY2FwZScpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzL3VybCcpXG4gICwgZXZlbnRVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnQnKVxuICAsIHRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdXRpbHMvdHJhbnNwb3J0JylcbiAgLCBvYmplY3RVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMvb2JqZWN0JylcbiAgLCBicm93c2VyID0gcmVxdWlyZSgnLi91dGlscy9icm93c2VyJylcbiAgLCBsb2cgPSByZXF1aXJlKCcuL3V0aWxzL2xvZycpXG4gICwgRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50JylcbiAgLCBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnR0YXJnZXQnKVxuICAsIGxvYyA9IHJlcXVpcmUoJy4vbG9jYXRpb24nKVxuICAsIENsb3NlRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50L2Nsb3NlJylcbiAgLCBUcmFuc3BvcnRNZXNzYWdlRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50L3RyYW5zLW1lc3NhZ2UnKVxuICAsIEluZm9SZWNlaXZlciA9IHJlcXVpcmUoJy4vaW5mby1yZWNlaXZlcicpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDptYWluJyk7XG59XG5cbnZhciB0cmFuc3BvcnRzO1xuXG4vLyBmb2xsb3cgY29uc3RydWN0b3Igc3RlcHMgZGVmaW5lZCBhdCBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJzb2NrZXRzLyN0aGUtd2Vic29ja2V0LWludGVyZmFjZVxuZnVuY3Rpb24gU29ja0pTKHVybCwgcHJvdG9jb2xzLCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTb2NrSlMpKSB7XG4gICAgcmV0dXJuIG5ldyBTb2NrSlModXJsLCBwcm90b2NvbHMsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdTb2NrSlM6IDEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudFwiKTtcbiAgfVxuICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuXG4gIHRoaXMucmVhZHlTdGF0ZSA9IFNvY2tKUy5DT05ORUNUSU5HO1xuICB0aGlzLmV4dGVuc2lvbnMgPSAnJztcbiAgdGhpcy5wcm90b2NvbCA9ICcnO1xuXG4gIC8vIG5vbi1zdGFuZGFyZCBleHRlbnNpb25cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGlmIChvcHRpb25zLnByb3RvY29sc193aGl0ZWxpc3QpIHtcbiAgICBsb2cud2FybihcIidwcm90b2NvbHNfd2hpdGVsaXN0JyBpcyBERVBSRUNBVEVELiBVc2UgJ3RyYW5zcG9ydHMnIGluc3RlYWQuXCIpO1xuICB9XG4gIHRoaXMuX3RyYW5zcG9ydHNXaGl0ZWxpc3QgPSBvcHRpb25zLnRyYW5zcG9ydHM7XG4gIHRoaXMuX3RyYW5zcG9ydE9wdGlvbnMgPSBvcHRpb25zLnRyYW5zcG9ydE9wdGlvbnMgfHwge307XG4gIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgMDtcblxuICB2YXIgc2Vzc2lvbklkID0gb3B0aW9ucy5zZXNzaW9uSWQgfHwgODtcbiAgaWYgKHR5cGVvZiBzZXNzaW9uSWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLl9nZW5lcmF0ZVNlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc2Vzc2lvbklkID09PSAnbnVtYmVyJykge1xuICAgIHRoaXMuX2dlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmFuZG9tLnN0cmluZyhzZXNzaW9uSWQpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWYgc2Vzc2lvbklkIGlzIHVzZWQgaW4gdGhlIG9wdGlvbnMsIGl0IG5lZWRzIHRvIGJlIGEgbnVtYmVyIG9yIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB0aGlzLl9zZXJ2ZXIgPSBvcHRpb25zLnNlcnZlciB8fCByYW5kb20ubnVtYmVyU3RyaW5nKDEwMDApO1xuXG4gIC8vIFN0ZXAgMSBvZiBXUyBzcGVjIC0gcGFyc2UgYW5kIHZhbGlkYXRlIHRoZSB1cmwuIElzc3VlICM4XG4gIHZhciBwYXJzZWRVcmwgPSBuZXcgVVJMKHVybCk7XG4gIGlmICghcGFyc2VkVXJsLmhvc3QgfHwgIXBhcnNlZFVybC5wcm90b2NvbCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBVUkwgJ1wiICsgdXJsICsgXCInIGlzIGludmFsaWRcIik7XG4gIH0gZWxzZSBpZiAocGFyc2VkVXJsLmhhc2gpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1RoZSBVUkwgbXVzdCBub3QgY29udGFpbiBhIGZyYWdtZW50Jyk7XG4gIH0gZWxzZSBpZiAocGFyc2VkVXJsLnByb3RvY29sICE9PSAnaHR0cDonICYmIHBhcnNlZFVybC5wcm90b2NvbCAhPT0gJ2h0dHBzOicpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUaGUgVVJMJ3Mgc2NoZW1lIG11c3QgYmUgZWl0aGVyICdodHRwOicgb3IgJ2h0dHBzOicuICdcIiArIHBhcnNlZFVybC5wcm90b2NvbCArIFwiJyBpcyBub3QgYWxsb3dlZC5cIik7XG4gIH1cblxuICB2YXIgc2VjdXJlID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgLy8gU3RlcCAyIC0gZG9uJ3QgYWxsb3cgc2VjdXJlIG9yaWdpbiB3aXRoIGFuIGluc2VjdXJlIHByb3RvY29sXG4gIGlmIChsb2MucHJvdG9jb2wgPT09ICdodHRwczonICYmICFzZWN1cmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlY3VyaXR5RXJyb3I6IEFuIGluc2VjdXJlIFNvY2tKUyBjb25uZWN0aW9uIG1heSBub3QgYmUgaW5pdGlhdGVkIGZyb20gYSBwYWdlIGxvYWRlZCBvdmVyIEhUVFBTJyk7XG4gIH1cblxuICAvLyBTdGVwIDMgLSBjaGVjayBwb3J0IGFjY2VzcyAtIG5vIG5lZWQgaGVyZVxuICAvLyBTdGVwIDQgLSBwYXJzZSBwcm90b2NvbHMgYXJndW1lbnRcbiAgaWYgKCFwcm90b2NvbHMpIHtcbiAgICBwcm90b2NvbHMgPSBbXTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShwcm90b2NvbHMpKSB7XG4gICAgcHJvdG9jb2xzID0gW3Byb3RvY29sc107XG4gIH1cblxuICAvLyBTdGVwIDUgLSBjaGVjayBwcm90b2NvbHMgYXJndW1lbnRcbiAgdmFyIHNvcnRlZFByb3RvY29scyA9IHByb3RvY29scy5zb3J0KCk7XG4gIHNvcnRlZFByb3RvY29scy5mb3JFYWNoKGZ1bmN0aW9uKHByb3RvLCBpKSB7XG4gICAgaWYgKCFwcm90bykge1xuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGhlIHByb3RvY29scyBlbnRyeSAnXCIgKyBwcm90byArIFwiJyBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG4gICAgaWYgKGkgPCAoc29ydGVkUHJvdG9jb2xzLmxlbmd0aCAtIDEpICYmIHByb3RvID09PSBzb3J0ZWRQcm90b2NvbHNbaSArIDFdKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUaGUgcHJvdG9jb2xzIGVudHJ5ICdcIiArIHByb3RvICsgXCInIGlzIGR1cGxpY2F0ZWQuXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gU3RlcCA2IC0gY29udmVydCBvcmlnaW5cbiAgdmFyIG8gPSB1cmxVdGlscy5nZXRPcmlnaW4obG9jLmhyZWYpO1xuICB0aGlzLl9vcmlnaW4gPSBvID8gby50b0xvd2VyQ2FzZSgpIDogbnVsbDtcblxuICAvLyByZW1vdmUgdGhlIHRyYWlsaW5nIHNsYXNoXG4gIHBhcnNlZFVybC5zZXQoJ3BhdGhuYW1lJywgcGFyc2VkVXJsLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyskLywgJycpKTtcblxuICAvLyBzdG9yZSB0aGUgc2FuaXRpemVkIHVybFxuICB0aGlzLnVybCA9IHBhcnNlZFVybC5ocmVmO1xuICBkZWJ1ZygndXNpbmcgdXJsJywgdGhpcy51cmwpO1xuXG4gIC8vIFN0ZXAgNyAtIHN0YXJ0IGNvbm5lY3Rpb24gaW4gYmFja2dyb3VuZFxuICAvLyBvYnRhaW4gc2VydmVyIGluZm9cbiAgLy8gaHR0cDovL3NvY2tqcy5naXRodWIuaW8vc29ja2pzLXByb3RvY29sL3NvY2tqcy1wcm90b2NvbC0wLjMuMy5odG1sI3NlY3Rpb24tMjZcbiAgdGhpcy5fdXJsSW5mbyA9IHtcbiAgICBudWxsT3JpZ2luOiAhYnJvd3Nlci5oYXNEb21haW4oKVxuICAsIHNhbWVPcmlnaW46IHVybFV0aWxzLmlzT3JpZ2luRXF1YWwodGhpcy51cmwsIGxvYy5ocmVmKVxuICAsIHNhbWVTY2hlbWU6IHVybFV0aWxzLmlzU2NoZW1lRXF1YWwodGhpcy51cmwsIGxvYy5ocmVmKVxuICB9O1xuXG4gIHRoaXMuX2lyID0gbmV3IEluZm9SZWNlaXZlcih0aGlzLnVybCwgdGhpcy5fdXJsSW5mbyk7XG4gIHRoaXMuX2lyLm9uY2UoJ2ZpbmlzaCcsIHRoaXMuX3JlY2VpdmVJbmZvLmJpbmQodGhpcykpO1xufVxuXG5pbmhlcml0cyhTb2NrSlMsIEV2ZW50VGFyZ2V0KTtcblxuZnVuY3Rpb24gdXNlclNldENvZGUoY29kZSkge1xuICByZXR1cm4gY29kZSA9PT0gMTAwMCB8fCAoY29kZSA+PSAzMDAwICYmIGNvZGUgPD0gNDk5OSk7XG59XG5cblNvY2tKUy5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihjb2RlLCByZWFzb24pIHtcbiAgLy8gU3RlcCAxXG4gIGlmIChjb2RlICYmICF1c2VyU2V0Q29kZShjb2RlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yOiBJbnZhbGlkIGNvZGUnKTtcbiAgfVxuICAvLyBTdGVwIDIuNCBzdGF0ZXMgdGhlIG1heCBpcyAxMjMgYnl0ZXMsIGJ1dCB3ZSBhcmUganVzdCBjaGVja2luZyBsZW5ndGhcbiAgaWYgKHJlYXNvbiAmJiByZWFzb24ubGVuZ3RoID4gMTIzKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdyZWFzb24gYXJndW1lbnQgaGFzIGFuIGludmFsaWQgbGVuZ3RoJyk7XG4gIH1cblxuICAvLyBTdGVwIDMuMVxuICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBTb2NrSlMuQ0xPU0lORyB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNvY2tKUy5DTE9TRUQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUT0RPIGxvb2sgYXQgZG9jcyB0byBkZXRlcm1pbmUgaG93IHRvIHNldCB0aGlzXG4gIHZhciB3YXNDbGVhbiA9IHRydWU7XG4gIHRoaXMuX2Nsb3NlKGNvZGUgfHwgMTAwMCwgcmVhc29uIHx8ICdOb3JtYWwgY2xvc3VyZScsIHdhc0NsZWFuKTtcbn07XG5cblNvY2tKUy5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy8gIzEzIC0gY29udmVydCBhbnl0aGluZyBub24tc3RyaW5nIHRvIHN0cmluZ1xuICAvLyBUT0RPIHRoaXMgY3VycmVudGx5IHR1cm5zIG9iamVjdHMgaW50byBbb2JqZWN0IE9iamVjdF1cbiAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gIH1cbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNPTk5FQ1RJTkcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yOiBUaGUgY29ubmVjdGlvbiBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWQgeWV0Jyk7XG4gIH1cbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gU29ja0pTLk9QRU4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fdHJhbnNwb3J0LnNlbmQoZXNjYXBlLnF1b3RlKGRhdGEpKTtcbn07XG5cblNvY2tKUy52ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cblNvY2tKUy5DT05ORUNUSU5HID0gMDtcblNvY2tKUy5PUEVOID0gMTtcblNvY2tKUy5DTE9TSU5HID0gMjtcblNvY2tKUy5DTE9TRUQgPSAzO1xuXG5Tb2NrSlMucHJvdG90eXBlLl9yZWNlaXZlSW5mbyA9IGZ1bmN0aW9uKGluZm8sIHJ0dCkge1xuICBkZWJ1ZygnX3JlY2VpdmVJbmZvJywgcnR0KTtcbiAgdGhpcy5faXIgPSBudWxsO1xuICBpZiAoIWluZm8pIHtcbiAgICB0aGlzLl9jbG9zZSgxMDAyLCAnQ2Fubm90IGNvbm5lY3QgdG8gc2VydmVyJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZXN0YWJsaXNoIGEgcm91bmQtdHJpcCB0aW1lb3V0IChSVE8pIGJhc2VkIG9uIHRoZVxuICAvLyByb3VuZC10cmlwIHRpbWUgKFJUVClcbiAgdGhpcy5fcnRvID0gdGhpcy5jb3VudFJUTyhydHQpO1xuICAvLyBhbGxvdyBzZXJ2ZXIgdG8gb3ZlcnJpZGUgdXJsIHVzZWQgZm9yIHRoZSBhY3R1YWwgdHJhbnNwb3J0XG4gIHRoaXMuX3RyYW5zVXJsID0gaW5mby5iYXNlX3VybCA/IGluZm8uYmFzZV91cmwgOiB0aGlzLnVybDtcbiAgaW5mbyA9IG9iamVjdFV0aWxzLmV4dGVuZChpbmZvLCB0aGlzLl91cmxJbmZvKTtcbiAgZGVidWcoJ2luZm8nLCBpbmZvKTtcbiAgLy8gZGV0ZXJtaW5lIGxpc3Qgb2YgZGVzaXJlZCBhbmQgc3VwcG9ydGVkIHRyYW5zcG9ydHNcbiAgdmFyIGVuYWJsZWRUcmFuc3BvcnRzID0gdHJhbnNwb3J0cy5maWx0ZXJUb0VuYWJsZWQodGhpcy5fdHJhbnNwb3J0c1doaXRlbGlzdCwgaW5mbyk7XG4gIHRoaXMuX3RyYW5zcG9ydHMgPSBlbmFibGVkVHJhbnNwb3J0cy5tYWluO1xuICBkZWJ1Zyh0aGlzLl90cmFuc3BvcnRzLmxlbmd0aCArICcgZW5hYmxlZCB0cmFuc3BvcnRzJyk7XG5cbiAgdGhpcy5fY29ubmVjdCgpO1xufTtcblxuU29ja0pTLnByb3RvdHlwZS5fY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBUcmFuc3BvcnQgPSB0aGlzLl90cmFuc3BvcnRzLnNoaWZ0KCk7IFRyYW5zcG9ydDsgVHJhbnNwb3J0ID0gdGhpcy5fdHJhbnNwb3J0cy5zaGlmdCgpKSB7XG4gICAgZGVidWcoJ2F0dGVtcHQnLCBUcmFuc3BvcnQudHJhbnNwb3J0TmFtZSk7XG4gICAgaWYgKFRyYW5zcG9ydC5uZWVkQm9keSkge1xuICAgICAgaWYgKCFnbG9iYWwuZG9jdW1lbnQuYm9keSB8fFxuICAgICAgICAgICh0eXBlb2YgZ2xvYmFsLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBnbG9iYWwuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2NvbXBsZXRlJyAmJlxuICAgICAgICAgICAgZ2xvYmFsLmRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdpbnRlcmFjdGl2ZScpKSB7XG4gICAgICAgIGRlYnVnKCd3YWl0aW5nIGZvciBib2R5Jyk7XG4gICAgICAgIHRoaXMuX3RyYW5zcG9ydHMudW5zaGlmdChUcmFuc3BvcnQpO1xuICAgICAgICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdsb2FkJywgdGhpcy5fY29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZSB0aW1lb3V0IGJhc2VkIG9uIFJUTyBhbmQgcm91bmQgdHJpcHMuIERlZmF1bHQgdG8gNXNcbiAgICB2YXIgdGltZW91dE1zID0gTWF0aC5tYXgodGhpcy5fdGltZW91dCwgKHRoaXMuX3J0byAqIFRyYW5zcG9ydC5yb3VuZFRyaXBzKSB8fCA1MDAwKTtcbiAgICB0aGlzLl90cmFuc3BvcnRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KHRoaXMuX3RyYW5zcG9ydFRpbWVvdXQuYmluZCh0aGlzKSwgdGltZW91dE1zKTtcbiAgICBkZWJ1ZygndXNpbmcgdGltZW91dCcsIHRpbWVvdXRNcyk7XG5cbiAgICB2YXIgdHJhbnNwb3J0VXJsID0gdXJsVXRpbHMuYWRkUGF0aCh0aGlzLl90cmFuc1VybCwgJy8nICsgdGhpcy5fc2VydmVyICsgJy8nICsgdGhpcy5fZ2VuZXJhdGVTZXNzaW9uSWQoKSk7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLl90cmFuc3BvcnRPcHRpb25zW1RyYW5zcG9ydC50cmFuc3BvcnROYW1lXTtcbiAgICBkZWJ1ZygndHJhbnNwb3J0IHVybCcsIHRyYW5zcG9ydFVybCk7XG4gICAgdmFyIHRyYW5zcG9ydE9iaiA9IG5ldyBUcmFuc3BvcnQodHJhbnNwb3J0VXJsLCB0aGlzLl90cmFuc1VybCwgb3B0aW9ucyk7XG4gICAgdHJhbnNwb3J0T2JqLm9uKCdtZXNzYWdlJywgdGhpcy5fdHJhbnNwb3J0TWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgICB0cmFuc3BvcnRPYmoub25jZSgnY2xvc2UnLCB0aGlzLl90cmFuc3BvcnRDbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB0cmFuc3BvcnRPYmoudHJhbnNwb3J0TmFtZSA9IFRyYW5zcG9ydC50cmFuc3BvcnROYW1lO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IHRyYW5zcG9ydE9iajtcblxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9jbG9zZSgyMDAwLCAnQWxsIHRyYW5zcG9ydHMgZmFpbGVkJywgZmFsc2UpO1xufTtcblxuU29ja0pTLnByb3RvdHlwZS5fdHJhbnNwb3J0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX3RyYW5zcG9ydFRpbWVvdXQnKTtcbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNPTk5FQ1RJTkcpIHtcbiAgICBpZiAodGhpcy5fdHJhbnNwb3J0KSB7XG4gICAgICB0aGlzLl90cmFuc3BvcnQuY2xvc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLl90cmFuc3BvcnRDbG9zZSgyMDA3LCAnVHJhbnNwb3J0IHRpbWVkIG91dCcpO1xuICB9XG59O1xuXG5Tb2NrSlMucHJvdG90eXBlLl90cmFuc3BvcnRNZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7XG4gIGRlYnVnKCdfdHJhbnNwb3J0TWVzc2FnZScsIG1zZyk7XG4gIHZhciBzZWxmID0gdGhpc1xuICAgICwgdHlwZSA9IG1zZy5zbGljZSgwLCAxKVxuICAgICwgY29udGVudCA9IG1zZy5zbGljZSgxKVxuICAgICwgcGF5bG9hZFxuICAgIDtcblxuICAvLyBmaXJzdCBjaGVjayBmb3IgbWVzc2FnZXMgdGhhdCBkb24ndCBuZWVkIGEgcGF5bG9hZFxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdvJzpcbiAgICAgIHRoaXMuX29wZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdoJzpcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2hlYXJ0YmVhdCcpKTtcbiAgICAgIGRlYnVnKCdoZWFydGJlYXQnLCB0aGlzLnRyYW5zcG9ydCk7XG4gICAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY29udGVudCkge1xuICAgIHRyeSB7XG4gICAgICBwYXlsb2FkID0gSlNPTjMucGFyc2UoY29udGVudCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVidWcoJ2JhZCBqc29uJywgY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAndW5kZWZpbmVkJykge1xuICAgIGRlYnVnKCdlbXB0eSBwYXlsb2FkJywgY29udGVudCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnYSc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgICAgICBwYXlsb2FkLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGRlYnVnKCdtZXNzYWdlJywgc2VsZi50cmFuc3BvcnQsIHApO1xuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hFdmVudChuZXcgVHJhbnNwb3J0TWVzc2FnZUV2ZW50KHApKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtJzpcbiAgICAgIGRlYnVnKCdtZXNzYWdlJywgdGhpcy50cmFuc3BvcnQsIHBheWxvYWQpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBUcmFuc3BvcnRNZXNzYWdlRXZlbnQocGF5bG9hZCkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYyc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJiBwYXlsb2FkLmxlbmd0aCA9PT0gMikge1xuICAgICAgICB0aGlzLl9jbG9zZShwYXlsb2FkWzBdLCBwYXlsb2FkWzFdLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG5Tb2NrSlMucHJvdG90eXBlLl90cmFuc3BvcnRDbG9zZSA9IGZ1bmN0aW9uKGNvZGUsIHJlYXNvbikge1xuICBkZWJ1ZygnX3RyYW5zcG9ydENsb3NlJywgdGhpcy50cmFuc3BvcnQsIGNvZGUsIHJlYXNvbik7XG4gIGlmICh0aGlzLl90cmFuc3BvcnQpIHtcbiAgICB0aGlzLl90cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fdHJhbnNwb3J0ID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG51bGw7XG4gIH1cblxuICBpZiAoIXVzZXJTZXRDb2RlKGNvZGUpICYmIGNvZGUgIT09IDIwMDAgJiYgdGhpcy5yZWFkeVN0YXRlID09PSBTb2NrSlMuQ09OTkVDVElORykge1xuICAgIHRoaXMuX2Nvbm5lY3QoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9jbG9zZShjb2RlLCByZWFzb24pO1xufTtcblxuU29ja0pTLnByb3RvdHlwZS5fb3BlbiA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX29wZW4nLCB0aGlzLl90cmFuc3BvcnQgJiYgdGhpcy5fdHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFNvY2tKUy5DT05ORUNUSU5HKSB7XG4gICAgaWYgKHRoaXMuX3RyYW5zcG9ydFRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RyYW5zcG9ydFRpbWVvdXRJZCk7XG4gICAgICB0aGlzLl90cmFuc3BvcnRUaW1lb3V0SWQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTb2NrSlMuT1BFTjtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IHRoaXMuX3RyYW5zcG9ydC50cmFuc3BvcnROYW1lO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ29wZW4nKSk7XG4gICAgZGVidWcoJ2Nvbm5lY3RlZCcsIHRoaXMudHJhbnNwb3J0KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGUgc2VydmVyIG1pZ2h0IGhhdmUgYmVlbiByZXN0YXJ0ZWQsIGFuZCBsb3N0IHRyYWNrIG9mIG91clxuICAgIC8vIGNvbm5lY3Rpb24uXG4gICAgdGhpcy5fY2xvc2UoMTAwNiwgJ1NlcnZlciBsb3N0IHNlc3Npb24nKTtcbiAgfVxufTtcblxuU29ja0pTLnByb3RvdHlwZS5fY2xvc2UgPSBmdW5jdGlvbihjb2RlLCByZWFzb24sIHdhc0NsZWFuKSB7XG4gIGRlYnVnKCdfY2xvc2UnLCB0aGlzLnRyYW5zcG9ydCwgY29kZSwgcmVhc29uLCB3YXNDbGVhbiwgdGhpcy5yZWFkeVN0YXRlKTtcbiAgdmFyIGZvcmNlRmFpbCA9IGZhbHNlO1xuXG4gIGlmICh0aGlzLl9pcikge1xuICAgIGZvcmNlRmFpbCA9IHRydWU7XG4gICAgdGhpcy5faXIuY2xvc2UoKTtcbiAgICB0aGlzLl9pciA9IG51bGw7XG4gIH1cbiAgaWYgKHRoaXMuX3RyYW5zcG9ydCkge1xuICAgIHRoaXMuX3RyYW5zcG9ydC5jbG9zZSgpO1xuICAgIHRoaXMuX3RyYW5zcG9ydCA9IG51bGw7XG4gICAgdGhpcy50cmFuc3BvcnQgPSBudWxsO1xuICB9XG5cbiAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gU29ja0pTLkNMT1NFRCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZFN0YXRlRXJyb3I6IFNvY2tKUyBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCcpO1xuICB9XG5cbiAgdGhpcy5yZWFkeVN0YXRlID0gU29ja0pTLkNMT1NJTkc7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU29ja0pTLkNMT1NFRDtcblxuICAgIGlmIChmb3JjZUZhaWwpIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Vycm9yJykpO1xuICAgIH1cblxuICAgIHZhciBlID0gbmV3IENsb3NlRXZlbnQoJ2Nsb3NlJyk7XG4gICAgZS53YXNDbGVhbiA9IHdhc0NsZWFuIHx8IGZhbHNlO1xuICAgIGUuY29kZSA9IGNvZGUgfHwgMTAwMDtcbiAgICBlLnJlYXNvbiA9IHJlYXNvbjtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB0aGlzLm9ubWVzc2FnZSA9IHRoaXMub25jbG9zZSA9IHRoaXMub25lcnJvciA9IG51bGw7XG4gICAgZGVidWcoJ2Rpc2Nvbm5lY3RlZCcpO1xuICB9LmJpbmQodGhpcyksIDApO1xufTtcblxuLy8gU2VlOiBodHRwOi8vd3d3LmVyZy5hYmRuLmFjLnVrL35nZXJyaXQvZGNjcC9ub3Rlcy9jY2lkMi9ydG9fZXN0aW1hdG9yL1xuLy8gYW5kIFJGQyAyOTg4LlxuU29ja0pTLnByb3RvdHlwZS5jb3VudFJUTyA9IGZ1bmN0aW9uKHJ0dCkge1xuICAvLyBJbiBhIGxvY2FsIGVudmlyb25tZW50LCB3aGVuIHVzaW5nIElFOC85IGFuZCB0aGUgYGpzb25wLXBvbGxpbmdgXG4gIC8vIHRyYW5zcG9ydCB0aGUgdGltZSBuZWVkZWQgdG8gZXN0YWJsaXNoIGEgY29ubmVjdGlvbiAodGhlIHRpbWUgdGhhdCBwYXNzXG4gIC8vIGZyb20gdGhlIG9wZW5pbmcgb2YgdGhlIHRyYW5zcG9ydCB0byB0aGUgY2FsbCBvZiBgX2Rpc3BhdGNoT3BlbmApIGlzXG4gIC8vIGFyb3VuZCAyMDBtc2VjICh0aGUgbG93ZXIgYm91bmQgdXNlZCBpbiB0aGUgYXJ0aWNsZSBhYm92ZSkgYW5kIHRoaXNcbiAgLy8gY2F1c2VzIHNwdXJpb3VzIHRpbWVvdXRzLiBGb3IgdGhpcyByZWFzb24gd2UgY2FsY3VsYXRlIGEgdmFsdWUgc2xpZ2h0bHlcbiAgLy8gbGFyZ2VyIHRoYW4gdGhhdCB1c2VkIGluIHRoZSBhcnRpY2xlLlxuICBpZiAocnR0ID4gMTAwKSB7XG4gICAgcmV0dXJuIDQgKiBydHQ7IC8vIHJ0byA+IDQwMG1zZWNcbiAgfVxuICByZXR1cm4gMzAwICsgcnR0OyAvLyAzMDBtc2VjIDwgcnRvIDw9IDQwMG1zZWNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXZhaWxhYmxlVHJhbnNwb3J0cykge1xuICB0cmFuc3BvcnRzID0gdHJhbnNwb3J0KGF2YWlsYWJsZVRyYW5zcG9ydHMpO1xuICByZXF1aXJlKCcuL2lmcmFtZS1ib290c3RyYXAnKShTb2NrSlMsIGF2YWlsYWJsZVRyYW5zcG9ydHMpO1xuICByZXR1cm4gU29ja0pTO1xufTtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9LHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wiLi9ldmVudC9jbG9zZVwiOjIsXCIuL2V2ZW50L2V2ZW50XCI6NCxcIi4vZXZlbnQvZXZlbnR0YXJnZXRcIjo1LFwiLi9ldmVudC90cmFucy1tZXNzYWdlXCI6NixcIi4vaWZyYW1lLWJvb3RzdHJhcFwiOjgsXCIuL2luZm8tcmVjZWl2ZXJcIjoxMixcIi4vbG9jYXRpb25cIjoxMyxcIi4vc2hpbXNcIjoxNSxcIi4vdXRpbHMvYnJvd3NlclwiOjQ0LFwiLi91dGlscy9lc2NhcGVcIjo0NSxcIi4vdXRpbHMvZXZlbnRcIjo0NixcIi4vdXRpbHMvbG9nXCI6NDgsXCIuL3V0aWxzL29iamVjdFwiOjQ5LFwiLi91dGlscy9yYW5kb21cIjo1MCxcIi4vdXRpbHMvdHJhbnNwb3J0XCI6NTEsXCIuL3V0aWxzL3VybFwiOjUyLFwiLi92ZXJzaW9uXCI6NTMsXCJkZWJ1Z1wiOjU1LFwiaW5oZXJpdHNcIjo1NyxcImpzb24zXCI6NTgsXCJ1cmwtcGFyc2VcIjo2MX1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qIGVzbGludC1kaXNhYmxlICovXG4vKiBqc2NzOiBkaXNhYmxlICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIHB1bGxlZCBzcGVjaWZpYyBzaGltcyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBTdHJpbmdQcm90b3R5cGUgPSBTdHJpbmcucHJvdG90eXBlO1xudmFyIGFycmF5X3NsaWNlID0gQXJyYXlQcm90b3R5cGUuc2xpY2U7XG5cbnZhciBfdG9TdHJpbmcgPSBPYmplY3RQcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0UHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIF90b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xudmFyIGlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIF90b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufTtcblxudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4Jywge30pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7IC8qIHRoaXMgaXMgRVMzICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KCkpO1xuXG4vLyBEZWZpbmUgY29uZmlndXJhYmxlLCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUgcHJvcHNcbi8vIGlmIHRoZXkgZG9uJ3QgZXhpc3QuXG52YXIgZGVmaW5lUHJvcGVydHk7XG5pZiAoc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuICAgIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgbWV0aG9kLCBmb3JjZUFzc2lnbikge1xuICAgICAgICBpZiAoIWZvcmNlQXNzaWduICYmIChuYW1lIGluIG9iamVjdCkpIHsgcmV0dXJuOyB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogbWV0aG9kXG4gICAgICAgIH0pO1xuICAgIH07XG59IGVsc2Uge1xuICAgIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgbWV0aG9kLCBmb3JjZUFzc2lnbikge1xuICAgICAgICBpZiAoIWZvcmNlQXNzaWduICYmIChuYW1lIGluIG9iamVjdCkpIHsgcmV0dXJuOyB9XG4gICAgICAgIG9iamVjdFtuYW1lXSA9IG1ldGhvZDtcbiAgICB9O1xufVxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqZWN0LCBtYXAsIGZvcmNlQXNzaWduKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBtYXApIHtcbiAgICAgICAgaWYgKE9iamVjdFByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1hcCwgbmFtZSkpIHtcbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIG1hcFtuYW1lXSwgZm9yY2VBc3NpZ24pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIHRvT2JqZWN0ID0gZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAobyA9PSBudWxsKSB7IC8vIHRoaXMgbWF0Y2hlcyBib3RoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FuJ3QgY29udmVydCBcIiArIG8gKyAnIHRvIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0KG8pO1xufTtcblxuLy9cbi8vIFV0aWxcbi8vID09PT09PVxuLy9cblxuLy8gRVM1IDkuNFxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4OS40XG4vLyBodHRwOi8vanNwZXJmLmNvbS90by1pbnRlZ2VyXG5cbmZ1bmN0aW9uIHRvSW50ZWdlcihudW0pIHtcbiAgICB2YXIgbiA9ICtudW07XG4gICAgaWYgKG4gIT09IG4pIHsgLy8gaXNOYU5cbiAgICAgICAgbiA9IDA7XG4gICAgfSBlbHNlIGlmIChuICE9PSAwICYmIG4gIT09ICgxIC8gMCkgJiYgbiAhPT0gLSgxIC8gMCkpIHtcbiAgICAgICAgbiA9IChuID4gMCB8fCAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKG4pKTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIFRvVWludDMyKHgpIHtcbiAgICByZXR1cm4geCA+Pj4gMDtcbn1cblxuLy9cbi8vIEZ1bmN0aW9uXG4vLyA9PT09PT09PVxuLy9cblxuLy8gRVMtNSAxNS4zLjQuNVxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMy40LjVcblxuZnVuY3Rpb24gRW1wdHkoKSB7fVxuXG5kZWZpbmVQcm9wZXJ0aWVzKEZ1bmN0aW9uUHJvdG90eXBlLCB7XG4gICAgYmluZDogZnVuY3Rpb24gYmluZCh0aGF0KSB7IC8vIC5sZW5ndGggaXMgMVxuICAgICAgICAvLyAxLiBMZXQgVGFyZ2V0IGJlIHRoZSB0aGlzIHZhbHVlLlxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgLy8gMi4gSWYgSXNDYWxsYWJsZShUYXJnZXQpIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uXG4gICAgICAgIGlmICghaXNGdW5jdGlvbih0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICcgKyB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuIExldCBBIGJlIGEgbmV3IChwb3NzaWJseSBlbXB0eSkgaW50ZXJuYWwgbGlzdCBvZiBhbGwgb2YgdGhlXG4gICAgICAgIC8vICAgYXJndW1lbnQgdmFsdWVzIHByb3ZpZGVkIGFmdGVyIHRoaXNBcmcgKGFyZzEsIGFyZzIgZXRjKSwgaW4gb3JkZXIuXG4gICAgICAgIC8vIFhYWCBzbGljZWRBcmdzIHdpbGwgc3RhbmQgaW4gZm9yIFwiQVwiIGlmIHVzZWRcbiAgICAgICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7IC8vIGZvciBub3JtYWwgY2FsbFxuICAgICAgICAvLyA0LiBMZXQgRiBiZSBhIG5ldyBuYXRpdmUgRUNNQVNjcmlwdCBvYmplY3QuXG4gICAgICAgIC8vIDExLiBTZXQgdGhlIFtbUHJvdG90eXBlXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgRiB0byB0aGUgc3RhbmRhcmRcbiAgICAgICAgLy8gICBidWlsdC1pbiBGdW5jdGlvbiBwcm90b3R5cGUgb2JqZWN0IGFzIHNwZWNpZmllZCBpbiAxNS4zLjMuMS5cbiAgICAgICAgLy8gMTIuIFNldCB0aGUgW1tDYWxsXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgRiBhcyBkZXNjcmliZWQgaW5cbiAgICAgICAgLy8gICAxNS4zLjQuNS4xLlxuICAgICAgICAvLyAxMy4gU2V0IHRoZSBbW0NvbnN0cnVjdF1dIGludGVybmFsIHByb3BlcnR5IG9mIEYgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgIC8vICAgMTUuMy40LjUuMi5cbiAgICAgICAgLy8gMTQuIFNldCB0aGUgW1tIYXNJbnN0YW5jZV1dIGludGVybmFsIHByb3BlcnR5IG9mIEYgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgIC8vICAgMTUuMy40LjUuMy5cbiAgICAgICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgICAgIC8vIDE1LjMuNC41LjIgW1tDb25zdHJ1Y3RdXVxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kIG9mIGEgZnVuY3Rpb24gb2JqZWN0LFxuICAgICAgICAgICAgICAgIC8vIEYgdGhhdCB3YXMgY3JlYXRlZCB1c2luZyB0aGUgYmluZCBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBhXG4gICAgICAgICAgICAgICAgLy8gbGlzdCBvZiBhcmd1bWVudHMgRXh0cmFBcmdzLCB0aGUgZm9sbG93aW5nIHN0ZXBzIGFyZSB0YWtlbjpcbiAgICAgICAgICAgICAgICAvLyAxLiBMZXQgdGFyZ2V0IGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tUYXJnZXRGdW5jdGlvbl1dXG4gICAgICAgICAgICAgICAgLy8gICBpbnRlcm5hbCBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAvLyAyLiBJZiB0YXJnZXQgaGFzIG5vIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kLCBhXG4gICAgICAgICAgICAgICAgLy8gICBUeXBlRXJyb3IgZXhjZXB0aW9uIGlzIHRocm93bi5cbiAgICAgICAgICAgICAgICAvLyAzLiBMZXQgYm91bmRBcmdzIGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tCb3VuZEFyZ3NdXSBpbnRlcm5hbFxuICAgICAgICAgICAgICAgIC8vICAgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgLy8gNC4gTGV0IGFyZ3MgYmUgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBzYW1lIHZhbHVlcyBhcyB0aGVcbiAgICAgICAgICAgICAgICAvLyAgIGxpc3QgYm91bmRBcmdzIGluIHRoZSBzYW1lIG9yZGVyIGZvbGxvd2VkIGJ5IHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgLy8gICB2YWx1ZXMgYXMgdGhlIGxpc3QgRXh0cmFBcmdzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgICAgICAgICAgICAgIC8vIDUuIFJldHVybiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWxcbiAgICAgICAgICAgICAgICAvLyAgIG1ldGhvZCBvZiB0YXJnZXQgcHJvdmlkaW5nIGFyZ3MgYXMgdGhlIGFyZ3VtZW50cy5cblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KGFycmF5X3NsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIDE1LjMuNC41LjEgW1tDYWxsXV1cbiAgICAgICAgICAgICAgICAvLyBXaGVuIHRoZSBbW0NhbGxdXSBpbnRlcm5hbCBtZXRob2Qgb2YgYSBmdW5jdGlvbiBvYmplY3QsIEYsXG4gICAgICAgICAgICAgICAgLy8gd2hpY2ggd2FzIGNyZWF0ZWQgdXNpbmcgdGhlIGJpbmQgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggYVxuICAgICAgICAgICAgICAgIC8vIHRoaXMgdmFsdWUgYW5kIGEgbGlzdCBvZiBhcmd1bWVudHMgRXh0cmFBcmdzLCB0aGUgZm9sbG93aW5nXG4gICAgICAgICAgICAgICAgLy8gc3RlcHMgYXJlIHRha2VuOlxuICAgICAgICAgICAgICAgIC8vIDEuIExldCBib3VuZEFyZ3MgYmUgdGhlIHZhbHVlIG9mIEYncyBbW0JvdW5kQXJnc11dIGludGVybmFsXG4gICAgICAgICAgICAgICAgLy8gICBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAvLyAyLiBMZXQgYm91bmRUaGlzIGJlIHRoZSB2YWx1ZSBvZiBGJ3MgW1tCb3VuZFRoaXNdXSBpbnRlcm5hbFxuICAgICAgICAgICAgICAgIC8vICAgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgLy8gMy4gTGV0IHRhcmdldCBiZSB0aGUgdmFsdWUgb2YgRidzIFtbVGFyZ2V0RnVuY3Rpb25dXSBpbnRlcm5hbFxuICAgICAgICAgICAgICAgIC8vICAgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgLy8gNC4gTGV0IGFyZ3MgYmUgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBzYW1lIHZhbHVlcyBhcyB0aGVcbiAgICAgICAgICAgICAgICAvLyAgIGxpc3QgYm91bmRBcmdzIGluIHRoZSBzYW1lIG9yZGVyIGZvbGxvd2VkIGJ5IHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgLy8gICB2YWx1ZXMgYXMgdGhlIGxpc3QgRXh0cmFBcmdzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgICAgICAgICAgICAgIC8vIDUuIFJldHVybiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ2FsbF1dIGludGVybmFsIG1ldGhvZFxuICAgICAgICAgICAgICAgIC8vICAgb2YgdGFyZ2V0IHByb3ZpZGluZyBib3VuZFRoaXMgYXMgdGhlIHRoaXMgdmFsdWUgYW5kXG4gICAgICAgICAgICAgICAgLy8gICBwcm92aWRpbmcgYXJncyBhcyB0aGUgYXJndW1lbnRzLlxuXG4gICAgICAgICAgICAgICAgLy8gZXF1aXY6IHRhcmdldC5jYWxsKHRoaXMsIC4uLmJvdW5kQXJncywgLi4uYXJncylcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChhcnJheV9zbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gMTUuIElmIHRoZSBbW0NsYXNzXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgVGFyZ2V0IGlzIFwiRnVuY3Rpb25cIiwgdGhlblxuICAgICAgICAvLyAgICAgYS4gTGV0IEwgYmUgdGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiBUYXJnZXQgbWludXMgdGhlIGxlbmd0aCBvZiBBLlxuICAgICAgICAvLyAgICAgYi4gU2V0IHRoZSBsZW5ndGggb3duIHByb3BlcnR5IG9mIEYgdG8gZWl0aGVyIDAgb3IgTCwgd2hpY2hldmVyIGlzXG4gICAgICAgIC8vICAgICAgIGxhcmdlci5cbiAgICAgICAgLy8gMTYuIEVsc2Ugc2V0IHRoZSBsZW5ndGggb3duIHByb3BlcnR5IG9mIEYgdG8gMC5cblxuICAgICAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuXG4gICAgICAgIC8vIDE3LiBTZXQgdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIGxlbmd0aCBvd24gcHJvcGVydHkgb2YgRiB0byB0aGUgdmFsdWVzXG4gICAgICAgIC8vICAgc3BlY2lmaWVkIGluIDE1LjMuNS4xLlxuICAgICAgICB2YXIgYm91bmRBcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBYWFggQnVpbGQgYSBkeW5hbWljIGZ1bmN0aW9uIHdpdGggZGVzaXJlZCBhbW91bnQgb2YgYXJndW1lbnRzIGlzIHRoZSBvbmx5XG4gICAgICAgIC8vIHdheSB0byBzZXQgdGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiBhIGZ1bmN0aW9uLlxuICAgICAgICAvLyBJbiBlbnZpcm9ubWVudHMgd2hlcmUgQ29udGVudCBTZWN1cml0eSBQb2xpY2llcyBlbmFibGVkIChDaHJvbWUgZXh0ZW5zaW9ucyxcbiAgICAgICAgLy8gZm9yIGV4LikgYWxsIHVzZSBvZiBldmFsIG9yIEZ1bmN0aW9uIGNvc3RydWN0b3IgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAgLy8gSG93ZXZlciBpbiBhbGwgb2YgdGhlc2UgZW52aXJvbm1lbnRzIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGV4aXN0c1xuICAgICAgICAvLyBhbmQgc28gdGhpcyBjb2RlIHdpbGwgbmV2ZXIgYmUgZXhlY3V0ZWQuXG4gICAgICAgIHZhciBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgICAgIGlmICh0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBkYW5nbGluZyByZWZlcmVuY2VzLlxuICAgICAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gMTguIFNldCB0aGUgW1tFeHRlbnNpYmxlXV0gaW50ZXJuYWwgcHJvcGVydHkgb2YgRiB0byB0cnVlLlxuXG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gMTkuIExldCB0aHJvd2VyIGJlIHRoZSBbW1Rocm93VHlwZUVycm9yXV0gZnVuY3Rpb24gT2JqZWN0ICgxMy4yLjMpLlxuICAgICAgICAvLyAyMC4gQ2FsbCB0aGUgW1tEZWZpbmVPd25Qcm9wZXJ0eV1dIGludGVybmFsIG1ldGhvZCBvZiBGIHdpdGhcbiAgICAgICAgLy8gICBhcmd1bWVudHMgXCJjYWxsZXJcIiwgUHJvcGVydHlEZXNjcmlwdG9yIHtbW0dldF1dOiB0aHJvd2VyLCBbW1NldF1dOlxuICAgICAgICAvLyAgIHRocm93ZXIsIFtbRW51bWVyYWJsZV1dOiBmYWxzZSwgW1tDb25maWd1cmFibGVdXTogZmFsc2V9LCBhbmRcbiAgICAgICAgLy8gICBmYWxzZS5cbiAgICAgICAgLy8gMjEuIENhbGwgdGhlIFtbRGVmaW5lT3duUHJvcGVydHldXSBpbnRlcm5hbCBtZXRob2Qgb2YgRiB3aXRoXG4gICAgICAgIC8vICAgYXJndW1lbnRzIFwiYXJndW1lbnRzXCIsIFByb3BlcnR5RGVzY3JpcHRvciB7W1tHZXRdXTogdGhyb3dlcixcbiAgICAgICAgLy8gICBbW1NldF1dOiB0aHJvd2VyLCBbW0VudW1lcmFibGVdXTogZmFsc2UsIFtbQ29uZmlndXJhYmxlXV06IGZhbHNlfSxcbiAgICAgICAgLy8gICBhbmQgZmFsc2UuXG5cbiAgICAgICAgLy8gVE9ET1xuICAgICAgICAvLyBOT1RFIEZ1bmN0aW9uIG9iamVjdHMgY3JlYXRlZCB1c2luZyBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBkbyBub3RcbiAgICAgICAgLy8gaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eSBvciB0aGUgW1tDb2RlXV0sIFtbRm9ybWFsUGFyYW1ldGVyc11dLCBhbmRcbiAgICAgICAgLy8gW1tTY29wZV1dIGludGVybmFsIHByb3BlcnRpZXMuXG4gICAgICAgIC8vIFhYWCBjYW4ndCBkZWxldGUgcHJvdG90eXBlIGluIHB1cmUtanMuXG5cbiAgICAgICAgLy8gMjIuIFJldHVybiBGLlxuICAgICAgICByZXR1cm4gYm91bmQ7XG4gICAgfVxufSk7XG5cbi8vXG4vLyBBcnJheVxuLy8gPT09PT1cbi8vXG5cbi8vIEVTNSAxNS40LjMuMlxuLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuNC4zLjJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2lzQXJyYXlcbmRlZmluZVByb3BlcnRpZXMoQXJyYXksIHsgaXNBcnJheTogaXNBcnJheSB9KTtcblxuXG52YXIgYm94ZWRTdHJpbmcgPSBPYmplY3QoJ2EnKTtcbnZhciBzcGxpdFN0cmluZyA9IGJveGVkU3RyaW5nWzBdICE9PSAnYScgfHwgISgwIGluIGJveGVkU3RyaW5nKTtcblxudmFyIHByb3Blcmx5Qm94ZXNDb250ZXh0ID0gZnVuY3Rpb24gcHJvcGVybHlCb3hlZChtZXRob2QpIHtcbiAgICAvLyBDaGVjayBub2RlIDAuNi4yMSBidWcgd2hlcmUgdGhpcmQgcGFyYW1ldGVyIGlzIG5vdCBib3hlZFxuICAgIHZhciBwcm9wZXJseUJveGVzTm9uU3RyaWN0ID0gdHJ1ZTtcbiAgICB2YXIgcHJvcGVybHlCb3hlc1N0cmljdCA9IHRydWU7XG4gICAgaWYgKG1ldGhvZCkge1xuICAgICAgICBtZXRob2QuY2FsbCgnZm9vJywgZnVuY3Rpb24gKF8sIF9fLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICdvYmplY3QnKSB7IHByb3Blcmx5Qm94ZXNOb25TdHJpY3QgPSBmYWxzZTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZXRob2QuY2FsbChbMV0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgICAgIHByb3Blcmx5Qm94ZXNTdHJpY3QgPSB0eXBlb2YgdGhpcyA9PT0gJ3N0cmluZyc7XG4gICAgICAgIH0sICd4Jyk7XG4gICAgfVxuICAgIHJldHVybiAhIW1ldGhvZCAmJiBwcm9wZXJseUJveGVzTm9uU3RyaWN0ICYmIHByb3Blcmx5Qm94ZXNTdHJpY3Q7XG59O1xuXG5kZWZpbmVQcm9wZXJ0aWVzKEFycmF5UHJvdG90eXBlLCB7XG4gICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChmdW4gLyosIHRoaXNwKi8pIHtcbiAgICAgICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KHRoaXMpLFxuICAgICAgICAgICAgc2VsZiA9IHNwbGl0U3RyaW5nICYmIGlzU3RyaW5nKHRoaXMpID8gdGhpcy5zcGxpdCgnJykgOiBvYmplY3QsXG4gICAgICAgICAgICB0aGlzcCA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgIGkgPSAtMSxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwO1xuXG4gICAgICAgIC8vIElmIG5vIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIGlmIGNhbGxiYWNrIGlzIG5vdCBhIGNhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihmdW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7IC8vIFRPRE8gbWVzc2FnZVxuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKCsraSA8IGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGkgaW4gc2VsZikge1xuICAgICAgICAgICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBjYWxsLCBwYXNzaW5nIGFyZ3VtZW50czpcbiAgICAgICAgICAgICAgICAvLyBjb250ZXh0LCBwcm9wZXJ0eSB2YWx1ZSwgcHJvcGVydHkga2V5LCB0aGlzQXJnIG9iamVjdFxuICAgICAgICAgICAgICAgIC8vIGNvbnRleHRcbiAgICAgICAgICAgICAgICBmdW4uY2FsbCh0aGlzcCwgc2VsZltpXSwgaSwgb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0sICFwcm9wZXJseUJveGVzQ29udGV4dChBcnJheVByb3RvdHlwZS5mb3JFYWNoKSk7XG5cbi8vIEVTNSAxNS40LjQuMTRcbi8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjQuNC4xNFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvaW5kZXhPZlxudmFyIGhhc0ZpcmVmb3gySW5kZXhPZkJ1ZyA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mICYmIFswLCAxXS5pbmRleE9mKDEsIDIpICE9PSAtMTtcbmRlZmluZVByb3BlcnRpZXMoQXJyYXlQcm90b3R5cGUsIHtcbiAgICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNvdWdodCAvKiwgZnJvbUluZGV4ICovICkge1xuICAgICAgICB2YXIgc2VsZiA9IHNwbGl0U3RyaW5nICYmIGlzU3RyaW5nKHRoaXMpID8gdGhpcy5zcGxpdCgnJykgOiB0b09iamVjdCh0aGlzKSxcbiAgICAgICAgICAgIGxlbmd0aCA9IHNlbGYubGVuZ3RoID4+PiAwO1xuXG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaSA9IHRvSW50ZWdlcihhcmd1bWVudHNbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIG5lZ2F0aXZlIGluZGljZXNcbiAgICAgICAgaSA9IGkgPj0gMCA/IGkgOiBNYXRoLm1heCgwLCBsZW5ndGggKyBpKTtcbiAgICAgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgaW4gc2VsZiAmJiBzZWxmW2ldID09PSBzb3VnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufSwgaGFzRmlyZWZveDJJbmRleE9mQnVnKTtcblxuLy9cbi8vIFN0cmluZ1xuLy8gPT09PT09XG4vL1xuXG4vLyBFUzUgMTUuNS40LjE0XG4vLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS41LjQuMTRcblxuLy8gW2J1Z2ZpeCwgSUUgbHQgOSwgZmlyZWZveCA0LCBLb25xdWVyb3IsIE9wZXJhLCBvYnNjdXJlIGJyb3dzZXJzXVxuLy8gTWFueSBicm93c2VycyBkbyBub3Qgc3BsaXQgcHJvcGVybHkgd2l0aCByZWd1bGFyIGV4cHJlc3Npb25zIG9yIHRoZXlcbi8vIGRvIG5vdCBwZXJmb3JtIHRoZSBzcGxpdCBjb3JyZWN0bHkgdW5kZXIgb2JzY3VyZSBjb25kaXRpb25zLlxuLy8gU2VlIGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9jcm9zcy1icm93c2VyLXNwbGl0XG4vLyBJJ3ZlIHRlc3RlZCBpbiBtYW55IGJyb3dzZXJzIGFuZCB0aGlzIHNlZW1zIHRvIGNvdmVyIHRoZSBkZXZpYW50IG9uZXM6XG4vLyAgICAnYWInLnNwbGl0KC8oPzphYikqLykgc2hvdWxkIGJlIFtcIlwiLCBcIlwiXSwgbm90IFtcIlwiXVxuLy8gICAgJy4nLnNwbGl0KC8oLj8pKC4/KS8pIHNob3VsZCBiZSBbXCJcIiwgXCIuXCIsIFwiXCIsIFwiXCJdLCBub3QgW1wiXCIsIFwiXCJdXG4vLyAgICAndGVzc3QnLnNwbGl0KC8ocykqLykgc2hvdWxkIGJlIFtcInRcIiwgdW5kZWZpbmVkLCBcImVcIiwgXCJzXCIsIFwidFwiXSwgbm90XG4vLyAgICAgICBbdW5kZWZpbmVkLCBcInRcIiwgdW5kZWZpbmVkLCBcImVcIiwgLi4uXVxuLy8gICAgJycuc3BsaXQoLy4/Lykgc2hvdWxkIGJlIFtdLCBub3QgW1wiXCJdXG4vLyAgICAnLicuc3BsaXQoLygpKCkvKSBzaG91bGQgYmUgW1wiLlwiXSwgbm90IFtcIlwiLCBcIlwiLCBcIi5cIl1cblxudmFyIHN0cmluZ19zcGxpdCA9IFN0cmluZ1Byb3RvdHlwZS5zcGxpdDtcbmlmIChcbiAgICAnYWInLnNwbGl0KC8oPzphYikqLykubGVuZ3RoICE9PSAyIHx8XG4gICAgJy4nLnNwbGl0KC8oLj8pKC4/KS8pLmxlbmd0aCAhPT0gNCB8fFxuICAgICd0ZXNzdCcuc3BsaXQoLyhzKSovKVsxXSA9PT0gJ3QnIHx8XG4gICAgJ3Rlc3QnLnNwbGl0KC8oPzopLywgLTEpLmxlbmd0aCAhPT0gNCB8fFxuICAgICcnLnNwbGl0KC8uPy8pLmxlbmd0aCB8fFxuICAgICcuJy5zcGxpdCgvKCkoKS8pLmxlbmd0aCA+IDFcbikge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb21wbGlhbnRFeGVjTnBjZyA9IC8oKT8/Ly5leGVjKCcnKVsxXSA9PT0gdm9pZCAwOyAvLyBOUENHOiBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cFxuXG4gICAgICAgIFN0cmluZ1Byb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nID0gdGhpcztcbiAgICAgICAgICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCAmJiBsaW1pdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgYHNlcGFyYXRvcmAgaXMgbm90IGEgcmVnZXgsIHVzZSBuYXRpdmUgc3BsaXRcbiAgICAgICAgICAgIGlmIChfdG9TdHJpbmcuY2FsbChzZXBhcmF0b3IpICE9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdfc3BsaXQuY2FsbCh0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IFtdLFxuICAgICAgICAgICAgICAgIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IubXVsdGlsaW5lICA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLmV4dGVuZGVkICAgPyAneCcgOiAnJykgKyAvLyBQcm9wb3NlZCBmb3IgRVM2XG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnN0aWNreSAgICAgPyAneScgOiAnJyksIC8vIEZpcmVmb3ggMytcbiAgICAgICAgICAgICAgICBsYXN0TGFzdEluZGV4ID0gMCxcbiAgICAgICAgICAgICAgICAvLyBNYWtlIGBnbG9iYWxgIGFuZCBhdm9pZCBgbGFzdEluZGV4YCBpc3N1ZXMgYnkgd29ya2luZyB3aXRoIGEgY29weVxuICAgICAgICAgICAgICAgIHNlcGFyYXRvcjIsIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgICAgICAgICBzZXBhcmF0b3IgPSBuZXcgUmVnRXhwKHNlcGFyYXRvci5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcbiAgICAgICAgICAgIHN0cmluZyArPSAnJzsgLy8gVHlwZS1jb252ZXJ0XG4gICAgICAgICAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnKSB7XG4gICAgICAgICAgICAgICAgLy8gRG9lc24ndCBuZWVkIGZsYWdzIGd5LCBidXQgdGhleSBkb24ndCBodXJ0XG4gICAgICAgICAgICAgICAgc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoJ14nICsgc2VwYXJhdG9yLnNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogVmFsdWVzIGZvciBgbGltaXRgLCBwZXIgdGhlIHNwZWM6XG4gICAgICAgICAgICAgKiBJZiB1bmRlZmluZWQ6IDQyOTQ5NjcyOTUgLy8gTWF0aC5wb3coMiwgMzIpIC0gMVxuICAgICAgICAgICAgICogSWYgMCwgSW5maW5pdHksIG9yIE5hTjogMFxuICAgICAgICAgICAgICogSWYgcG9zaXRpdmUgbnVtYmVyOiBsaW1pdCA9IE1hdGguZmxvb3IobGltaXQpOyBpZiAobGltaXQgPiA0Mjk0OTY3Mjk1KSBsaW1pdCAtPSA0Mjk0OTY3Mjk2O1xuICAgICAgICAgICAgICogSWYgbmVnYXRpdmUgbnVtYmVyOiA0Mjk0OTY3Mjk2IC0gTWF0aC5mbG9vcihNYXRoLmFicyhsaW1pdCkpXG4gICAgICAgICAgICAgKiBJZiBvdGhlcjogVHlwZS1jb252ZXJ0LCB0aGVuIHVzZSB0aGUgYWJvdmUgcnVsZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbGltaXQgPSBsaW1pdCA9PT0gdm9pZCAwID9cbiAgICAgICAgICAgICAgICAtMSA+Pj4gMCA6IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICAgICAgICAgICAgICBUb1VpbnQzMihsaW1pdCk7XG4gICAgICAgICAgICB3aGlsZSAobWF0Y2ggPSBzZXBhcmF0b3IuZXhlYyhzdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gYHNlcGFyYXRvci5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICAgICAgICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgIGZvclxuICAgICAgICAgICAgICAgICAgICAvLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb21wbGlhbnRFeGVjTnBjZyAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFtpXSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXlQcm90b3R5cGUucHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBsYXN0TGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICAgICAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlcGFyYXRvci5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvci5sYXN0SW5kZXgrKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RMZW5ndGggfHwgIXNlcGFyYXRvci50ZXN0KCcnKSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dC5sZW5ndGggPiBsaW1pdCA/IG91dHB1dC5zbGljZSgwLCBsaW1pdCkgOiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgfSgpKTtcblxuLy8gW2J1Z2ZpeCwgY2hyb21lXVxuLy8gSWYgc2VwYXJhdG9yIGlzIHVuZGVmaW5lZCwgdGhlbiB0aGUgcmVzdWx0IGFycmF5IGNvbnRhaW5zIGp1c3Qgb25lIFN0cmluZyxcbi8vIHdoaWNoIGlzIHRoZSB0aGlzIHZhbHVlIChjb252ZXJ0ZWQgdG8gYSBTdHJpbmcpLiBJZiBsaW1pdCBpcyBub3QgdW5kZWZpbmVkLFxuLy8gdGhlbiB0aGUgb3V0cHV0IGFycmF5IGlzIHRydW5jYXRlZCBzbyB0aGF0IGl0IGNvbnRhaW5zIG5vIG1vcmUgdGhhbiBsaW1pdFxuLy8gZWxlbWVudHMuXG4vLyBcIjBcIi5zcGxpdCh1bmRlZmluZWQsIDApIC0+IFtdXG59IGVsc2UgaWYgKCcwJy5zcGxpdCh2b2lkIDAsIDApLmxlbmd0aCkge1xuICAgIFN0cmluZ1Byb3RvdHlwZS5zcGxpdCA9IGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgICAgaWYgKHNlcGFyYXRvciA9PT0gdm9pZCAwICYmIGxpbWl0ID09PSAwKSB7IHJldHVybiBbXTsgfVxuICAgICAgICByZXR1cm4gc3RyaW5nX3NwbGl0LmNhbGwodGhpcywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfTtcbn1cblxuLy8gRUNNQS0yNjIsIDNyZCBCLjIuM1xuLy8gTm90IGFuIEVDTUFTY3JpcHQgc3RhbmRhcmQsIGFsdGhvdWdoIEVDTUFTY3JpcHQgM3JkIEVkaXRpb24gaGFzIGFcbi8vIG5vbi1ub3JtYXRpdmUgc2VjdGlvbiBzdWdnZXN0aW5nIHVuaWZvcm0gc2VtYW50aWNzIGFuZCBpdCBzaG91bGQgYmVcbi8vIG5vcm1hbGl6ZWQgYWNyb3NzIGFsbCBicm93c2Vyc1xuLy8gW2J1Z2ZpeCwgSUUgbHQgOV0gSUUgPCA5IHN1YnN0cigpIHdpdGggbmVnYXRpdmUgdmFsdWUgbm90IHdvcmtpbmcgaW4gSUVcbnZhciBzdHJpbmdfc3Vic3RyID0gU3RyaW5nUHJvdG90eXBlLnN1YnN0cjtcbnZhciBoYXNOZWdhdGl2ZVN1YnN0ckJ1ZyA9ICcnLnN1YnN0ciAmJiAnMGInLnN1YnN0cigtMSkgIT09ICdiJztcbmRlZmluZVByb3BlcnRpZXMoU3RyaW5nUHJvdG90eXBlLCB7XG4gICAgc3Vic3RyOiBmdW5jdGlvbiBzdWJzdHIoc3RhcnQsIGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc3RyaW5nX3N1YnN0ci5jYWxsKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHN0YXJ0IDwgMCA/ICgoc3RhcnQgPSB0aGlzLmxlbmd0aCArIHN0YXJ0KSA8IDAgPyAwIDogc3RhcnQpIDogc3RhcnQsXG4gICAgICAgICAgICBsZW5ndGhcbiAgICAgICAgKTtcbiAgICB9XG59LCBoYXNOZWdhdGl2ZVN1YnN0ckJ1Zyk7XG5cbn0se31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gIC8vIHN0cmVhbWluZyB0cmFuc3BvcnRzXG4gIHJlcXVpcmUoJy4vdHJhbnNwb3J0L3dlYnNvY2tldCcpXG4sIHJlcXVpcmUoJy4vdHJhbnNwb3J0L3hoci1zdHJlYW1pbmcnKVxuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC94ZHItc3RyZWFtaW5nJylcbiwgcmVxdWlyZSgnLi90cmFuc3BvcnQvZXZlbnRzb3VyY2UnKVxuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC9saWIvaWZyYW1lLXdyYXAnKShyZXF1aXJlKCcuL3RyYW5zcG9ydC9ldmVudHNvdXJjZScpKVxuXG4gIC8vIHBvbGxpbmcgdHJhbnNwb3J0c1xuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC9odG1sZmlsZScpXG4sIHJlcXVpcmUoJy4vdHJhbnNwb3J0L2xpYi9pZnJhbWUtd3JhcCcpKHJlcXVpcmUoJy4vdHJhbnNwb3J0L2h0bWxmaWxlJykpXG4sIHJlcXVpcmUoJy4vdHJhbnNwb3J0L3hoci1wb2xsaW5nJylcbiwgcmVxdWlyZSgnLi90cmFuc3BvcnQveGRyLXBvbGxpbmcnKVxuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC9saWIvaWZyYW1lLXdyYXAnKShyZXF1aXJlKCcuL3RyYW5zcG9ydC94aHItcG9sbGluZycpKVxuLCByZXF1aXJlKCcuL3RyYW5zcG9ydC9qc29ucC1wb2xsaW5nJylcbl07XG5cbn0se1wiLi90cmFuc3BvcnQvZXZlbnRzb3VyY2VcIjoyMCxcIi4vdHJhbnNwb3J0L2h0bWxmaWxlXCI6MjEsXCIuL3RyYW5zcG9ydC9qc29ucC1wb2xsaW5nXCI6MjMsXCIuL3RyYW5zcG9ydC9saWIvaWZyYW1lLXdyYXBcIjoyNixcIi4vdHJhbnNwb3J0L3dlYnNvY2tldFwiOjM4LFwiLi90cmFuc3BvcnQveGRyLXBvbGxpbmdcIjozOSxcIi4vdHJhbnNwb3J0L3hkci1zdHJlYW1pbmdcIjo0MCxcIi4vdHJhbnNwb3J0L3hoci1wb2xsaW5nXCI6NDEsXCIuL3RyYW5zcG9ydC94aHItc3RyZWFtaW5nXCI6NDJ9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZXZlbnQnKVxuICAsIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXJsJylcbiAgLCBYSFIgPSBnbG9iYWwuWE1MSHR0cFJlcXVlc3RcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OmJyb3dzZXI6eGhyJyk7XG59XG5cbmZ1bmN0aW9uIEFic3RyYWN0WEhST2JqZWN0KG1ldGhvZCwgdXJsLCBwYXlsb2FkLCBvcHRzKSB7XG4gIGRlYnVnKG1ldGhvZCwgdXJsKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLl9zdGFydChtZXRob2QsIHVybCwgcGF5bG9hZCwgb3B0cyk7XG4gIH0sIDApO1xufVxuXG5pbmhlcml0cyhBYnN0cmFjdFhIUk9iamVjdCwgRXZlbnRFbWl0dGVyKTtcblxuQWJzdHJhY3RYSFJPYmplY3QucHJvdG90eXBlLl9zdGFydCA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBwYXlsb2FkLCBvcHRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0cnkge1xuICAgIHRoaXMueGhyID0gbmV3IFhIUigpO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxuICB9XG5cbiAgaWYgKCF0aGlzLnhocikge1xuICAgIGRlYnVnKCdubyB4aHInKTtcbiAgICB0aGlzLmVtaXQoJ2ZpbmlzaCcsIDAsICdubyB4aHIgc3VwcG9ydCcpO1xuICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXZlcmFsIGJyb3dzZXJzIGNhY2hlIFBPU1RzXG4gIHVybCA9IHVybFV0aWxzLmFkZFF1ZXJ5KHVybCwgJ3Q9JyArICgrbmV3IERhdGUoKSkpO1xuXG4gIC8vIEV4cGxvcmVyIHRlbmRzIHRvIGtlZXAgY29ubmVjdGlvbiBvcGVuLCBldmVuIGFmdGVyIHRoZVxuICAvLyB0YWIgZ2V0cyBjbG9zZWQ6IGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzUyODBcbiAgdGhpcy51bmxvYWRSZWYgPSB1dGlscy51bmxvYWRBZGQoZnVuY3Rpb24oKSB7XG4gICAgZGVidWcoJ3VubG9hZCBjbGVhbnVwJyk7XG4gICAgc2VsZi5fY2xlYW51cCh0cnVlKTtcbiAgfSk7XG4gIHRyeSB7XG4gICAgdGhpcy54aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgaWYgKHRoaXMudGltZW91dCAmJiAndGltZW91dCcgaW4gdGhpcy54aHIpIHtcbiAgICAgIHRoaXMueGhyLnRpbWVvdXQgPSB0aGlzLnRpbWVvdXQ7XG4gICAgICB0aGlzLnhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVidWcoJ3hociB0aW1lb3V0Jyk7XG4gICAgICAgIHNlbGYuZW1pdCgnZmluaXNoJywgMCwgJycpO1xuICAgICAgICBzZWxmLl9jbGVhbnVwKGZhbHNlKTtcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgZGVidWcoJ2V4Y2VwdGlvbicsIGUpO1xuICAgIC8vIElFIHJhaXNlcyBhbiBleGNlcHRpb24gb24gd3JvbmcgcG9ydC5cbiAgICB0aGlzLmVtaXQoJ2ZpbmlzaCcsIDAsICcnKTtcbiAgICB0aGlzLl9jbGVhbnVwKGZhbHNlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoKCFvcHRzIHx8ICFvcHRzLm5vQ3JlZGVudGlhbHMpICYmIEFic3RyYWN0WEhST2JqZWN0LnN1cHBvcnRzQ09SUykge1xuICAgIGRlYnVnKCd3aXRoQ3JlZGVudGlhbHMnKTtcbiAgICAvLyBNb3ppbGxhIGRvY3Mgc2F5cyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9YTUxIdHRwUmVxdWVzdCA6XG4gICAgLy8gXCJUaGlzIG5ldmVyIGFmZmVjdHMgc2FtZS1zaXRlIHJlcXVlc3RzLlwiXG5cbiAgICB0aGlzLnhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICB9XG4gIGlmIChvcHRzICYmIG9wdHMuaGVhZGVycykge1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMueGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBvcHRzLmhlYWRlcnNba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICB2YXIgeCA9IHNlbGYueGhyO1xuICAgICAgdmFyIHRleHQsIHN0YXR1cztcbiAgICAgIGRlYnVnKCdyZWFkeVN0YXRlJywgeC5yZWFkeVN0YXRlKTtcbiAgICAgIHN3aXRjaCAoeC5yZWFkeVN0YXRlKSB7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIC8vIElFIGRvZXNuJ3QgbGlrZSBwZWVraW5nIGludG8gcmVzcG9uc2VUZXh0IG9yIHN0YXR1c1xuICAgICAgICAvLyBvbiBNaWNyb3NvZnQuWE1MSFRUUCBhbmQgcmVhZHlzdGF0ZT0zXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3RhdHVzID0geC5zdGF0dXM7XG4gICAgICAgICAgdGV4dCA9IHgucmVzcG9uc2VUZXh0O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxuICAgICAgICB9XG4gICAgICAgIGRlYnVnKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICAvLyBJRSByZXR1cm5zIDEyMjMgZm9yIDIwNDogaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MFxuICAgICAgICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgICAgICAgc3RhdHVzID0gMjA0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSUUgZG9lcyByZXR1cm4gcmVhZHlzdGF0ZSA9PSAzIGZvciA0MDQgYW5zd2Vycy5cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMjAwICYmIHRleHQgJiYgdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZGVidWcoJ2NodW5rJyk7XG4gICAgICAgICAgc2VsZi5lbWl0KCdjaHVuaycsIHN0YXR1cywgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHN0YXR1cyA9IHguc3RhdHVzO1xuICAgICAgICBkZWJ1Zygnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgLy8gSUUgcmV0dXJucyAxMjIzIGZvciAyMDQ6IGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzE0NTBcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgICAgICAgIHN0YXR1cyA9IDIwNDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJRSByZXR1cm5zIHRoaXMgZm9yIGEgYmFkIHBvcnRcbiAgICAgICAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3dpbmRvd3MvZGVza3RvcC9hYTM4Mzc3MCh2PXZzLjg1KS5hc3B4XG4gICAgICAgIGlmIChzdGF0dXMgPT09IDEyMDA1IHx8IHN0YXR1cyA9PT0gMTIwMjkpIHtcbiAgICAgICAgICBzdGF0dXMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVidWcoJ2ZpbmlzaCcsIHN0YXR1cywgeC5yZXNwb25zZVRleHQpO1xuICAgICAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIHN0YXR1cywgeC5yZXNwb25zZVRleHQpO1xuICAgICAgICBzZWxmLl9jbGVhbnVwKGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRyeSB7XG4gICAgc2VsZi54aHIuc2VuZChwYXlsb2FkKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNlbGYuZW1pdCgnZmluaXNoJywgMCwgJycpO1xuICAgIHNlbGYuX2NsZWFudXAoZmFsc2UpO1xuICB9XG59O1xuXG5BYnN0cmFjdFhIUk9iamVjdC5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbihhYm9ydCkge1xuICBkZWJ1ZygnY2xlYW51cCcpO1xuICBpZiAoIXRoaXMueGhyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIHV0aWxzLnVubG9hZERlbCh0aGlzLnVubG9hZFJlZik7XG5cbiAgLy8gSUUgbmVlZHMgdGhpcyBmaWVsZCB0byBiZSBhIGZ1bmN0aW9uXG4gIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge307XG4gIGlmICh0aGlzLnhoci5vbnRpbWVvdXQpIHtcbiAgICB0aGlzLnhoci5vbnRpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgaWYgKGFib3J0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgfSBjYXRjaCAoeCkge1xuICAgICAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxuICAgIH1cbiAgfVxuICB0aGlzLnVubG9hZFJlZiA9IHRoaXMueGhyID0gbnVsbDtcbn07XG5cbkFic3RyYWN0WEhST2JqZWN0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5fY2xlYW51cCh0cnVlKTtcbn07XG5cbkFic3RyYWN0WEhST2JqZWN0LmVuYWJsZWQgPSAhIVhIUjtcbi8vIG92ZXJyaWRlIFhNTEh0dHBSZXF1ZXN0IGZvciBJRTYvN1xuLy8gb2JmdXNjYXRlIHRvIGF2b2lkIGZpcmV3YWxsc1xudmFyIGF4byA9IFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJyk7XG5pZiAoIUFic3RyYWN0WEhST2JqZWN0LmVuYWJsZWQgJiYgKGF4byBpbiBnbG9iYWwpKSB7XG4gIGRlYnVnKCdvdmVycmlkaW5nIHhtbGh0dHByZXF1ZXN0Jyk7XG4gIFhIUiA9IGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IGdsb2JhbFtheG9dKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgQWJzdHJhY3RYSFJPYmplY3QuZW5hYmxlZCA9ICEhbmV3IFhIUigpO1xufVxuXG52YXIgY29ycyA9IGZhbHNlO1xudHJ5IHtcbiAgY29ycyA9ICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYSFIoKTtcbn0gY2F0Y2ggKGlnbm9yZWQpIHtcbiAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxufVxuXG5BYnN0cmFjdFhIUk9iamVjdC5zdXBwb3J0c0NPUlMgPSBjb3JzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0WEhST2JqZWN0O1xuXG59KS5jYWxsKHRoaXMseyBlbnY6IHt9IH0sdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcblxufSx7XCIuLi8uLi91dGlscy9ldmVudFwiOjQ2LFwiLi4vLi4vdXRpbHMvdXJsXCI6NTIsXCJkZWJ1Z1wiOjU1LFwiZXZlbnRzXCI6MyxcImluaGVyaXRzXCI6NTd9XSwxODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5FdmVudFNvdXJjZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se31dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIERyaXZlciA9IGdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDtcbmlmIChEcml2ZXIpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBXZWJTb2NrZXRCcm93c2VyRHJpdmVyKHVybCkge1xuXHRcdHJldHVybiBuZXcgRHJpdmVyKHVybCk7XG5cdH07XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHVuZGVmaW5lZDtcbn1cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se31dLDIwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEFqYXhCYXNlZFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vbGliL2FqYXgtYmFzZWQnKVxuICAsIEV2ZW50U291cmNlUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyL2V2ZW50c291cmNlJylcbiAgLCBYSFJDb3JzT2JqZWN0ID0gcmVxdWlyZSgnLi9zZW5kZXIveGhyLWNvcnMnKVxuICAsIEV2ZW50U291cmNlRHJpdmVyID0gcmVxdWlyZSgnZXZlbnRzb3VyY2UnKVxuICA7XG5cbmZ1bmN0aW9uIEV2ZW50U291cmNlVHJhbnNwb3J0KHRyYW5zVXJsKSB7XG4gIGlmICghRXZlbnRTb3VyY2VUcmFuc3BvcnQuZW5hYmxlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cblxuICBBamF4QmFzZWRUcmFuc3BvcnQuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy9ldmVudHNvdXJjZScsIEV2ZW50U291cmNlUmVjZWl2ZXIsIFhIUkNvcnNPYmplY3QpO1xufVxuXG5pbmhlcml0cyhFdmVudFNvdXJjZVRyYW5zcG9ydCwgQWpheEJhc2VkVHJhbnNwb3J0KTtcblxuRXZlbnRTb3VyY2VUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gISFFdmVudFNvdXJjZURyaXZlcjtcbn07XG5cbkV2ZW50U291cmNlVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAnZXZlbnRzb3VyY2UnO1xuRXZlbnRTb3VyY2VUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRTb3VyY2VUcmFuc3BvcnQ7XG5cbn0se1wiLi9saWIvYWpheC1iYXNlZFwiOjI0LFwiLi9yZWNlaXZlci9ldmVudHNvdXJjZVwiOjI5LFwiLi9zZW5kZXIveGhyLWNvcnNcIjozNSxcImV2ZW50c291cmNlXCI6MTgsXCJpbmhlcml0c1wiOjU3fV0sMjE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgSHRtbGZpbGVSZWNlaXZlciA9IHJlcXVpcmUoJy4vcmVjZWl2ZXIvaHRtbGZpbGUnKVxuICAsIFhIUkxvY2FsT2JqZWN0ID0gcmVxdWlyZSgnLi9zZW5kZXIveGhyLWxvY2FsJylcbiAgLCBBamF4QmFzZWRUcmFuc3BvcnQgPSByZXF1aXJlKCcuL2xpYi9hamF4LWJhc2VkJylcbiAgO1xuXG5mdW5jdGlvbiBIdG1sRmlsZVRyYW5zcG9ydCh0cmFuc1VybCkge1xuICBpZiAoIUh0bWxmaWxlUmVjZWl2ZXIuZW5hYmxlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGNyZWF0ZWQgd2hlbiBkaXNhYmxlZCcpO1xuICB9XG4gIEFqYXhCYXNlZFRyYW5zcG9ydC5jYWxsKHRoaXMsIHRyYW5zVXJsLCAnL2h0bWxmaWxlJywgSHRtbGZpbGVSZWNlaXZlciwgWEhSTG9jYWxPYmplY3QpO1xufVxuXG5pbmhlcml0cyhIdG1sRmlsZVRyYW5zcG9ydCwgQWpheEJhc2VkVHJhbnNwb3J0KTtcblxuSHRtbEZpbGVUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKGluZm8pIHtcbiAgcmV0dXJuIEh0bWxmaWxlUmVjZWl2ZXIuZW5hYmxlZCAmJiBpbmZvLnNhbWVPcmlnaW47XG59O1xuXG5IdG1sRmlsZVRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2h0bWxmaWxlJztcbkh0bWxGaWxlVHJhbnNwb3J0LnJvdW5kVHJpcHMgPSAyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWxGaWxlVHJhbnNwb3J0O1xuXG59LHtcIi4vbGliL2FqYXgtYmFzZWRcIjoyNCxcIi4vcmVjZWl2ZXIvaHRtbGZpbGVcIjozMCxcIi4vc2VuZGVyL3hoci1sb2NhbFwiOjM3LFwiaW5oZXJpdHNcIjo1N31dLDIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAocHJvY2Vzcyl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIEZldyBjb29sIHRyYW5zcG9ydHMgZG8gd29yayBvbmx5IGZvciBzYW1lLW9yaWdpbi4gSW4gb3JkZXIgdG8gbWFrZVxuLy8gdGhlbSB3b3JrIGNyb3NzLWRvbWFpbiB3ZSBzaGFsbCB1c2UgaWZyYW1lLCBzZXJ2ZWQgZnJvbSB0aGVcbi8vIHJlbW90ZSBkb21haW4uIE5ldyBicm93c2VycyBoYXZlIGNhcGFiaWxpdGllcyB0byBjb21tdW5pY2F0ZSB3aXRoXG4vLyBjcm9zcyBkb21haW4gaWZyYW1lIHVzaW5nIHBvc3RNZXNzYWdlKCkuIEluIElFIGl0IHdhcyBpbXBsZW1lbnRlZFxuLy8gZnJvbSBJRSA4KywgYnV0IG9mIGNvdXJzZSwgSUUgZ290IHNvbWUgZGV0YWlscyB3cm9uZzpcbi8vICAgIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9jYzE5NzAxNSh2PVZTLjg1KS5hc3B4XG4vLyAgICBodHRwOi8vc3RldmVzb3VkZXJzLmNvbS9taXNjL3Rlc3QtcG9zdG1lc3NhZ2UucGhwXG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJylcbiAgLCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgLCB2ZXJzaW9uID0gcmVxdWlyZSgnLi4vdmVyc2lvbicpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy91cmwnKVxuICAsIGlmcmFtZVV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvaWZyYW1lJylcbiAgLCBldmVudFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvZXZlbnQnKVxuICAsIHJhbmRvbSA9IHJlcXVpcmUoJy4uL3V0aWxzL3JhbmRvbScpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp0cmFuc3BvcnQ6aWZyYW1lJyk7XG59XG5cbmZ1bmN0aW9uIElmcmFtZVRyYW5zcG9ydCh0cmFuc3BvcnQsIHRyYW5zVXJsLCBiYXNlVXJsKSB7XG4gIGlmICghSWZyYW1lVHJhbnNwb3J0LmVuYWJsZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGNyZWF0ZWQgd2hlbiBkaXNhYmxlZCcpO1xuICB9XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5vcmlnaW4gPSB1cmxVdGlscy5nZXRPcmlnaW4oYmFzZVVybCk7XG4gIHRoaXMuYmFzZVVybCA9IGJhc2VVcmw7XG4gIHRoaXMudHJhbnNVcmwgPSB0cmFuc1VybDtcbiAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gIHRoaXMud2luZG93SWQgPSByYW5kb20uc3RyaW5nKDgpO1xuXG4gIHZhciBpZnJhbWVVcmwgPSB1cmxVdGlscy5hZGRQYXRoKGJhc2VVcmwsICcvaWZyYW1lLmh0bWwnKSArICcjJyArIHRoaXMud2luZG93SWQ7XG4gIGRlYnVnKHRyYW5zcG9ydCwgdHJhbnNVcmwsIGlmcmFtZVVybCk7XG5cbiAgdGhpcy5pZnJhbWVPYmogPSBpZnJhbWVVdGlscy5jcmVhdGVJZnJhbWUoaWZyYW1lVXJsLCBmdW5jdGlvbihyKSB7XG4gICAgZGVidWcoJ2VyciBjYWxsYmFjaycpO1xuICAgIHNlbGYuZW1pdCgnY2xvc2UnLCAxMDA2LCAnVW5hYmxlIHRvIGxvYWQgYW4gaWZyYW1lICgnICsgciArICcpJyk7XG4gICAgc2VsZi5jbG9zZSgpO1xuICB9KTtcblxuICB0aGlzLm9ubWVzc2FnZUNhbGxiYWNrID0gdGhpcy5fbWVzc2FnZS5iaW5kKHRoaXMpO1xuICBldmVudFV0aWxzLmF0dGFjaEV2ZW50KCdtZXNzYWdlJywgdGhpcy5vbm1lc3NhZ2VDYWxsYmFjayk7XG59XG5cbmluaGVyaXRzKElmcmFtZVRyYW5zcG9ydCwgRXZlbnRFbWl0dGVyKTtcblxuSWZyYW1lVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgaWYgKHRoaXMuaWZyYW1lT2JqKSB7XG4gICAgZXZlbnRVdGlscy5kZXRhY2hFdmVudCgnbWVzc2FnZScsIHRoaXMub25tZXNzYWdlQ2FsbGJhY2spO1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHRoZSBpZnJhbWUgaXMgbm90IGxvYWRlZCwgSUUgcmFpc2VzIGFuIGV4Y2VwdGlvblxuICAgICAgLy8gb24gJ2NvbnRlbnRXaW5kb3cnLlxuICAgICAgdGhpcy5wb3N0TWVzc2FnZSgnYycpO1xuICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICB9XG4gICAgdGhpcy5pZnJhbWVPYmouY2xlYW51cCgpO1xuICAgIHRoaXMuaWZyYW1lT2JqID0gbnVsbDtcbiAgICB0aGlzLm9ubWVzc2FnZUNhbGxiYWNrID0gdGhpcy5pZnJhbWVPYmogPSBudWxsO1xuICB9XG59O1xuXG5JZnJhbWVUcmFuc3BvcnQucHJvdG90eXBlLl9tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICBkZWJ1ZygnbWVzc2FnZScsIGUuZGF0YSk7XG4gIGlmICghdXJsVXRpbHMuaXNPcmlnaW5FcXVhbChlLm9yaWdpbiwgdGhpcy5vcmlnaW4pKSB7XG4gICAgZGVidWcoJ25vdCBzYW1lIG9yaWdpbicsIGUub3JpZ2luLCB0aGlzLm9yaWdpbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGlmcmFtZU1lc3NhZ2U7XG4gIHRyeSB7XG4gICAgaWZyYW1lTWVzc2FnZSA9IEpTT04zLnBhcnNlKGUuZGF0YSk7XG4gIH0gY2F0Y2ggKGlnbm9yZWQpIHtcbiAgICBkZWJ1ZygnYmFkIGpzb24nLCBlLmRhdGEpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpZnJhbWVNZXNzYWdlLndpbmRvd0lkICE9PSB0aGlzLndpbmRvd0lkKSB7XG4gICAgZGVidWcoJ21pc21hdGNoZWQgd2luZG93IGlkJywgaWZyYW1lTWVzc2FnZS53aW5kb3dJZCwgdGhpcy53aW5kb3dJZCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3dpdGNoIChpZnJhbWVNZXNzYWdlLnR5cGUpIHtcbiAgY2FzZSAncyc6XG4gICAgdGhpcy5pZnJhbWVPYmoubG9hZGVkKCk7XG4gICAgLy8gd2luZG93IGdsb2JhbCBkZXBlbmRlbmN5XG4gICAgdGhpcy5wb3N0TWVzc2FnZSgncycsIEpTT04zLnN0cmluZ2lmeShbXG4gICAgICB2ZXJzaW9uXG4gICAgLCB0aGlzLnRyYW5zcG9ydFxuICAgICwgdGhpcy50cmFuc1VybFxuICAgICwgdGhpcy5iYXNlVXJsXG4gICAgXSkpO1xuICAgIGJyZWFrO1xuICBjYXNlICd0JzpcbiAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgIGJyZWFrO1xuICBjYXNlICdjJzpcbiAgICB2YXIgY2RhdGE7XG4gICAgdHJ5IHtcbiAgICAgIGNkYXRhID0gSlNPTjMucGFyc2UoaWZyYW1lTWVzc2FnZS5kYXRhKTtcbiAgICB9IGNhdGNoIChpZ25vcmVkKSB7XG4gICAgICBkZWJ1ZygnYmFkIGpzb24nLCBpZnJhbWVNZXNzYWdlLmRhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgY2RhdGFbMF0sIGNkYXRhWzFdKTtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgYnJlYWs7XG4gIH1cbn07XG5cbklmcmFtZVRyYW5zcG9ydC5wcm90b3R5cGUucG9zdE1lc3NhZ2UgPSBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XG4gIGRlYnVnKCdwb3N0TWVzc2FnZScsIHR5cGUsIGRhdGEpO1xuICB0aGlzLmlmcmFtZU9iai5wb3N0KEpTT04zLnN0cmluZ2lmeSh7XG4gICAgd2luZG93SWQ6IHRoaXMud2luZG93SWRcbiAgLCB0eXBlOiB0eXBlXG4gICwgZGF0YTogZGF0YSB8fCAnJ1xuICB9KSwgdGhpcy5vcmlnaW4pO1xufTtcblxuSWZyYW1lVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICBkZWJ1Zygnc2VuZCcsIG1lc3NhZ2UpO1xuICB0aGlzLnBvc3RNZXNzYWdlKCdtJywgbWVzc2FnZSk7XG59O1xuXG5JZnJhbWVUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gaWZyYW1lVXRpbHMuaWZyYW1lRW5hYmxlZDtcbn07XG5cbklmcmFtZVRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2lmcmFtZSc7XG5JZnJhbWVUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7XG5cbm1vZHVsZS5leHBvcnRzID0gSWZyYW1lVHJhbnNwb3J0O1xuXG59KS5jYWxsKHRoaXMseyBlbnY6IHt9IH0pXG5cbn0se1wiLi4vdXRpbHMvZXZlbnRcIjo0NixcIi4uL3V0aWxzL2lmcmFtZVwiOjQ3LFwiLi4vdXRpbHMvcmFuZG9tXCI6NTAsXCIuLi91dGlscy91cmxcIjo1MixcIi4uL3ZlcnNpb25cIjo1MyxcImRlYnVnXCI6NTUsXCJldmVudHNcIjozLFwiaW5oZXJpdHNcIjo1NyxcImpzb24zXCI6NTh9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBzaW1wbGVzdCBhbmQgbW9zdCByb2J1c3QgdHJhbnNwb3J0LCB1c2luZyB0aGUgd2VsbC1rbm93IGNyb3NzXG4vLyBkb21haW4gaGFjayAtIEpTT05QLiBUaGlzIHRyYW5zcG9ydCBpcyBxdWl0ZSBpbmVmZmljaWVudCAtIG9uZVxuLy8gbWVzc2FnZSBjb3VsZCB1c2UgdXAgdG8gb25lIGh0dHAgcmVxdWVzdC4gQnV0IGF0IGxlYXN0IGl0IHdvcmtzIGFsbW9zdFxuLy8gZXZlcnl3aGVyZS5cbi8vIEtub3duIGxpbWl0YXRpb25zOlxuLy8gICBvIHlvdSB3aWxsIGdldCBhIHNwaW5uaW5nIGN1cnNvclxuLy8gICBvIGZvciBLb25xdWVyb3IgYSBkdW1iIHRpbWVyIGlzIG5lZWRlZCB0byBkZXRlY3QgZXJyb3JzXG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBTZW5kZXJSZWNlaXZlciA9IHJlcXVpcmUoJy4vbGliL3NlbmRlci1yZWNlaXZlcicpXG4gICwgSnNvbnBSZWNlaXZlciA9IHJlcXVpcmUoJy4vcmVjZWl2ZXIvanNvbnAnKVxuICAsIGpzb25wU2VuZGVyID0gcmVxdWlyZSgnLi9zZW5kZXIvanNvbnAnKVxuICA7XG5cbmZ1bmN0aW9uIEpzb25QVHJhbnNwb3J0KHRyYW5zVXJsKSB7XG4gIGlmICghSnNvblBUcmFuc3BvcnQuZW5hYmxlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cbiAgU2VuZGVyUmVjZWl2ZXIuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy9qc29ucCcsIGpzb25wU2VuZGVyLCBKc29ucFJlY2VpdmVyKTtcbn1cblxuaW5oZXJpdHMoSnNvblBUcmFuc3BvcnQsIFNlbmRlclJlY2VpdmVyKTtcblxuSnNvblBUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gISFnbG9iYWwuZG9jdW1lbnQ7XG59O1xuXG5Kc29uUFRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2pzb25wLXBvbGxpbmcnO1xuSnNvblBUcmFuc3BvcnQucm91bmRUcmlwcyA9IDE7XG5Kc29uUFRyYW5zcG9ydC5uZWVkQm9keSA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gSnNvblBUcmFuc3BvcnQ7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHtcIi4vbGliL3NlbmRlci1yZWNlaXZlclwiOjI4LFwiLi9yZWNlaXZlci9qc29ucFwiOjMxLFwiLi9zZW5kZXIvanNvbnBcIjozMyxcImluaGVyaXRzXCI6NTd9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIFNlbmRlclJlY2VpdmVyID0gcmVxdWlyZSgnLi9zZW5kZXItcmVjZWl2ZXInKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6YWpheC1iYXNlZCcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBamF4U2VuZGVyKEFqYXhPYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHVybCwgcGF5bG9hZCwgY2FsbGJhY2spIHtcbiAgICBkZWJ1ZygnY3JlYXRlIGFqYXggc2VuZGVyJywgdXJsLCBwYXlsb2FkKTtcbiAgICB2YXIgb3B0ID0ge307XG4gICAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0LmhlYWRlcnMgPSB7J0NvbnRlbnQtdHlwZSc6ICd0ZXh0L3BsYWluJ307XG4gICAgfVxuICAgIHZhciBhamF4VXJsID0gdXJsVXRpbHMuYWRkUGF0aCh1cmwsICcveGhyX3NlbmQnKTtcbiAgICB2YXIgeG8gPSBuZXcgQWpheE9iamVjdCgnUE9TVCcsIGFqYXhVcmwsIHBheWxvYWQsIG9wdCk7XG4gICAgeG8ub25jZSgnZmluaXNoJywgZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICBkZWJ1ZygnZmluaXNoJywgc3RhdHVzKTtcbiAgICAgIHhvID0gbnVsbDtcblxuICAgICAgaWYgKHN0YXR1cyAhPT0gMjAwICYmIHN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoJ2h0dHAgc3RhdHVzICcgKyBzdGF0dXMpKTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ2Fib3J0Jyk7XG4gICAgICB4by5jbG9zZSgpO1xuICAgICAgeG8gPSBudWxsO1xuXG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICBlcnIuY29kZSA9IDEwMDA7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIEFqYXhCYXNlZFRyYW5zcG9ydCh0cmFuc1VybCwgdXJsU3VmZml4LCBSZWNlaXZlciwgQWpheE9iamVjdCkge1xuICBTZW5kZXJSZWNlaXZlci5jYWxsKHRoaXMsIHRyYW5zVXJsLCB1cmxTdWZmaXgsIGNyZWF0ZUFqYXhTZW5kZXIoQWpheE9iamVjdCksIFJlY2VpdmVyLCBBamF4T2JqZWN0KTtcbn1cblxuaW5oZXJpdHMoQWpheEJhc2VkVHJhbnNwb3J0LCBTZW5kZXJSZWNlaXZlcik7XG5cbm1vZHVsZS5leHBvcnRzID0gQWpheEJhc2VkVHJhbnNwb3J0O1xuXG59KS5jYWxsKHRoaXMseyBlbnY6IHt9IH0pXG5cbn0se1wiLi4vLi4vdXRpbHMvdXJsXCI6NTIsXCIuL3NlbmRlci1yZWNlaXZlclwiOjI4LFwiZGVidWdcIjo1NSxcImluaGVyaXRzXCI6NTd9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDpidWZmZXJlZC1zZW5kZXInKTtcbn1cblxuZnVuY3Rpb24gQnVmZmVyZWRTZW5kZXIodXJsLCBzZW5kZXIpIHtcbiAgZGVidWcodXJsKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcbiAgdGhpcy51cmwgPSB1cmw7XG59XG5cbmluaGVyaXRzKEJ1ZmZlcmVkU2VuZGVyLCBFdmVudEVtaXR0ZXIpO1xuXG5CdWZmZXJlZFNlbmRlci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgZGVidWcoJ3NlbmQnLCBtZXNzYWdlKTtcbiAgdGhpcy5zZW5kQnVmZmVyLnB1c2gobWVzc2FnZSk7XG4gIGlmICghdGhpcy5zZW5kU3RvcCkge1xuICAgIHRoaXMuc2VuZFNjaGVkdWxlKCk7XG4gIH1cbn07XG5cbi8vIEZvciBwb2xsaW5nIHRyYW5zcG9ydHMgaW4gYSBzaXR1YXRpb24gd2hlbiBpbiB0aGUgbWVzc2FnZSBjYWxsYmFjayxcbi8vIG5ldyBtZXNzYWdlIGlzIGJlaW5nIHNlbmQuIElmIHRoZSBzZW5kaW5nIGNvbm5lY3Rpb24gd2FzIHN0YXJ0ZWRcbi8vIGJlZm9yZSByZWNlaXZpbmcgb25lLCBpdCBpcyBwb3NzaWJsZSB0byBzYXR1cmF0ZSB0aGUgbmV0d29yayBhbmRcbi8vIHRpbWVvdXQgZHVlIHRvIHRoZSBsYWNrIG9mIHJlY2VpdmluZyBzb2NrZXQuIFRvIGF2b2lkIHRoYXQgd2UgZGVsYXlcbi8vIHNlbmRpbmcgbWVzc2FnZXMgYnkgc29tZSBzbWFsbCB0aW1lLCBpbiBvcmRlciB0byBsZXQgcmVjZWl2aW5nXG4vLyBjb25uZWN0aW9uIGJlIHN0YXJ0ZWQgYmVmb3JlaGFuZC4gVGhpcyBpcyBvbmx5IGEgaGFsZm1lYXN1cmUgYW5kXG4vLyBkb2VzIG5vdCBmaXggdGhlIGJpZyBwcm9ibGVtLCBidXQgaXQgZG9lcyBtYWtlIHRoZSB0ZXN0cyBnbyBtb3JlXG4vLyBzdGFibGUgb24gc2xvdyBuZXR3b3Jrcy5cbkJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5zZW5kU2NoZWR1bGVXYWl0ID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdzZW5kU2NoZWR1bGVXYWl0Jyk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHRyZWY7XG4gIHRoaXMuc2VuZFN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnc2VuZFN0b3AnKTtcbiAgICBzZWxmLnNlbmRTdG9wID0gbnVsbDtcbiAgICBjbGVhclRpbWVvdXQodHJlZik7XG4gIH07XG4gIHRyZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCd0aW1lb3V0Jyk7XG4gICAgc2VsZi5zZW5kU3RvcCA9IG51bGw7XG4gICAgc2VsZi5zZW5kU2NoZWR1bGUoKTtcbiAgfSwgMjUpO1xufTtcblxuQnVmZmVyZWRTZW5kZXIucHJvdG90eXBlLnNlbmRTY2hlZHVsZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1Zygnc2VuZFNjaGVkdWxlJywgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgdmFyIHBheWxvYWQgPSAnWycgKyB0aGlzLnNlbmRCdWZmZXIuam9pbignLCcpICsgJ10nO1xuICAgIHRoaXMuc2VuZFN0b3AgPSB0aGlzLnNlbmRlcih0aGlzLnVybCwgcGF5bG9hZCwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBzZWxmLnNlbmRTdG9wID0gbnVsbDtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZGVidWcoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgc2VsZi5lbWl0KCdjbG9zZScsIGVyci5jb2RlIHx8IDEwMDYsICdTZW5kaW5nIGVycm9yOiAnICsgZXJyKTtcbiAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5zZW5kU2NoZWR1bGVXYWl0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gIH1cbn07XG5cbkJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX2NsZWFudXAnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbn07XG5cbkJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5fY2xlYW51cCgpO1xuICBpZiAodGhpcy5zZW5kU3RvcCkge1xuICAgIHRoaXMuc2VuZFN0b3AoKTtcbiAgICB0aGlzLnNlbmRTdG9wID0gbnVsbDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJlZFNlbmRlcjtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9KVxuXG59LHtcImRlYnVnXCI6NTUsXCJldmVudHNcIjozLFwiaW5oZXJpdHNcIjo1N31dLDI2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIElmcmFtZVRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL2lmcmFtZScpXG4gICwgb2JqZWN0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9vYmplY3QnKVxuICA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odHJhbnNwb3J0KSB7XG5cbiAgZnVuY3Rpb24gSWZyYW1lV3JhcFRyYW5zcG9ydCh0cmFuc1VybCwgYmFzZVVybCkge1xuICAgIElmcmFtZVRyYW5zcG9ydC5jYWxsKHRoaXMsIHRyYW5zcG9ydC50cmFuc3BvcnROYW1lLCB0cmFuc1VybCwgYmFzZVVybCk7XG4gIH1cblxuICBpbmhlcml0cyhJZnJhbWVXcmFwVHJhbnNwb3J0LCBJZnJhbWVUcmFuc3BvcnQpO1xuXG4gIElmcmFtZVdyYXBUcmFuc3BvcnQuZW5hYmxlZCA9IGZ1bmN0aW9uKHVybCwgaW5mbykge1xuICAgIGlmICghZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGlmcmFtZUluZm8gPSBvYmplY3RVdGlscy5leHRlbmQoe30sIGluZm8pO1xuICAgIGlmcmFtZUluZm8uc2FtZU9yaWdpbiA9IHRydWU7XG4gICAgcmV0dXJuIHRyYW5zcG9ydC5lbmFibGVkKGlmcmFtZUluZm8pICYmIElmcmFtZVRyYW5zcG9ydC5lbmFibGVkKCk7XG4gIH07XG5cbiAgSWZyYW1lV3JhcFRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ2lmcmFtZS0nICsgdHJhbnNwb3J0LnRyYW5zcG9ydE5hbWU7XG4gIElmcmFtZVdyYXBUcmFuc3BvcnQubmVlZEJvZHkgPSB0cnVlO1xuICBJZnJhbWVXcmFwVHJhbnNwb3J0LnJvdW5kVHJpcHMgPSBJZnJhbWVUcmFuc3BvcnQucm91bmRUcmlwcyArIHRyYW5zcG9ydC5yb3VuZFRyaXBzIC0gMTsgLy8gaHRtbCwgamF2YXNjcmlwdCAoMikgKyB0cmFuc3BvcnQgLSBubyBDT1JTICgxKVxuXG4gIElmcmFtZVdyYXBUcmFuc3BvcnQuZmFjYWRlVHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gIHJldHVybiBJZnJhbWVXcmFwVHJhbnNwb3J0O1xufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wiLi4vLi4vdXRpbHMvb2JqZWN0XCI6NDksXCIuLi9pZnJhbWVcIjoyMixcImluaGVyaXRzXCI6NTd9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDpwb2xsaW5nJyk7XG59XG5cbmZ1bmN0aW9uIFBvbGxpbmcoUmVjZWl2ZXIsIHJlY2VpdmVVcmwsIEFqYXhPYmplY3QpIHtcbiAgZGVidWcocmVjZWl2ZVVybCk7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuICB0aGlzLlJlY2VpdmVyID0gUmVjZWl2ZXI7XG4gIHRoaXMucmVjZWl2ZVVybCA9IHJlY2VpdmVVcmw7XG4gIHRoaXMuQWpheE9iamVjdCA9IEFqYXhPYmplY3Q7XG4gIHRoaXMuX3NjaGVkdWxlUmVjZWl2ZXIoKTtcbn1cblxuaW5oZXJpdHMoUG9sbGluZywgRXZlbnRFbWl0dGVyKTtcblxuUG9sbGluZy5wcm90b3R5cGUuX3NjaGVkdWxlUmVjZWl2ZXIgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ19zY2hlZHVsZVJlY2VpdmVyJyk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHBvbGwgPSB0aGlzLnBvbGwgPSBuZXcgdGhpcy5SZWNlaXZlcih0aGlzLnJlY2VpdmVVcmwsIHRoaXMuQWpheE9iamVjdCk7XG5cbiAgcG9sbC5vbignbWVzc2FnZScsIGZ1bmN0aW9uKG1zZykge1xuICAgIGRlYnVnKCdtZXNzYWdlJywgbXNnKTtcbiAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xuICB9KTtcblxuICBwb2xsLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24oY29kZSwgcmVhc29uKSB7XG4gICAgZGVidWcoJ2Nsb3NlJywgY29kZSwgcmVhc29uLCBzZWxmLnBvbGxJc0Nsb3NpbmcpO1xuICAgIHNlbGYucG9sbCA9IHBvbGwgPSBudWxsO1xuXG4gICAgaWYgKCFzZWxmLnBvbGxJc0Nsb3NpbmcpIHtcbiAgICAgIGlmIChyZWFzb24gPT09ICduZXR3b3JrJykge1xuICAgICAgICBzZWxmLl9zY2hlZHVsZVJlY2VpdmVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmVtaXQoJ2Nsb3NlJywgY29kZSB8fCAxMDA2LCByZWFzb24pO1xuICAgICAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnYWJvcnQnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgdGhpcy5wb2xsSXNDbG9zaW5nID0gdHJ1ZTtcbiAgaWYgKHRoaXMucG9sbCkge1xuICAgIHRoaXMucG9sbC5hYm9ydCgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvbGxpbmc7XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSlcblxufSx7XCJkZWJ1Z1wiOjU1LFwiZXZlbnRzXCI6MyxcImluaGVyaXRzXCI6NTd9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIEJ1ZmZlcmVkU2VuZGVyID0gcmVxdWlyZSgnLi9idWZmZXJlZC1zZW5kZXInKVxuICAsIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6c2VuZGVyLXJlY2VpdmVyJyk7XG59XG5cbmZ1bmN0aW9uIFNlbmRlclJlY2VpdmVyKHRyYW5zVXJsLCB1cmxTdWZmaXgsIHNlbmRlckZ1bmMsIFJlY2VpdmVyLCBBamF4T2JqZWN0KSB7XG4gIHZhciBwb2xsVXJsID0gdXJsVXRpbHMuYWRkUGF0aCh0cmFuc1VybCwgdXJsU3VmZml4KTtcbiAgZGVidWcocG9sbFVybCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgQnVmZmVyZWRTZW5kZXIuY2FsbCh0aGlzLCB0cmFuc1VybCwgc2VuZGVyRnVuYyk7XG5cbiAgdGhpcy5wb2xsID0gbmV3IFBvbGxpbmcoUmVjZWl2ZXIsIHBvbGxVcmwsIEFqYXhPYmplY3QpO1xuICB0aGlzLnBvbGwub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtc2cpIHtcbiAgICBkZWJ1ZygncG9sbCBtZXNzYWdlJywgbXNnKTtcbiAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xuICB9KTtcbiAgdGhpcy5wb2xsLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24oY29kZSwgcmVhc29uKSB7XG4gICAgZGVidWcoJ3BvbGwgY2xvc2UnLCBjb2RlLCByZWFzb24pO1xuICAgIHNlbGYucG9sbCA9IG51bGw7XG4gICAgc2VsZi5lbWl0KCdjbG9zZScsIGNvZGUsIHJlYXNvbik7XG4gICAgc2VsZi5jbG9zZSgpO1xuICB9KTtcbn1cblxuaW5oZXJpdHMoU2VuZGVyUmVjZWl2ZXIsIEJ1ZmZlcmVkU2VuZGVyKTtcblxuU2VuZGVyUmVjZWl2ZXIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIEJ1ZmZlcmVkU2VuZGVyLnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpO1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgaWYgKHRoaXMucG9sbCkge1xuICAgIHRoaXMucG9sbC5hYm9ydCgpO1xuICAgIHRoaXMucG9sbCA9IG51bGw7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VuZGVyUmVjZWl2ZXI7XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSlcblxufSx7XCIuLi8uLi91dGlscy91cmxcIjo1MixcIi4vYnVmZmVyZWQtc2VuZGVyXCI6MjUsXCIuL3BvbGxpbmdcIjoyNyxcImRlYnVnXCI6NTUsXCJpbmhlcml0c1wiOjU3fV0sMjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIEV2ZW50U291cmNlRHJpdmVyID0gcmVxdWlyZSgnZXZlbnRzb3VyY2UnKVxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6cmVjZWl2ZXI6ZXZlbnRzb3VyY2UnKTtcbn1cblxuZnVuY3Rpb24gRXZlbnRTb3VyY2VSZWNlaXZlcih1cmwpIHtcbiAgZGVidWcodXJsKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZXMgPSB0aGlzLmVzID0gbmV3IEV2ZW50U291cmNlRHJpdmVyKHVybCk7XG4gIGVzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBkZWJ1ZygnbWVzc2FnZScsIGUuZGF0YSk7XG4gICAgc2VsZi5lbWl0KCdtZXNzYWdlJywgZGVjb2RlVVJJKGUuZGF0YSkpO1xuICB9O1xuICBlcy5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgIGRlYnVnKCdlcnJvcicsIGVzLnJlYWR5U3RhdGUsIGUpO1xuICAgIC8vIEVTIG9uIHJlY29ubmVjdGlvbiBoYXMgcmVhZHlTdGF0ZSA9IDAgb3IgMS5cbiAgICAvLyBvbiBuZXR3b3JrIGVycm9yIGl0J3MgQ0xPU0VEID0gMlxuICAgIHZhciByZWFzb24gPSAoZXMucmVhZHlTdGF0ZSAhPT0gMiA/ICduZXR3b3JrJyA6ICdwZXJtYW5lbnQnKTtcbiAgICBzZWxmLl9jbGVhbnVwKCk7XG4gICAgc2VsZi5fY2xvc2UocmVhc29uKTtcbiAgfTtcbn1cblxuaW5oZXJpdHMoRXZlbnRTb3VyY2VSZWNlaXZlciwgRXZlbnRFbWl0dGVyKTtcblxuRXZlbnRTb3VyY2VSZWNlaXZlci5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ2Fib3J0Jyk7XG4gIHRoaXMuX2NsZWFudXAoKTtcbiAgdGhpcy5fY2xvc2UoJ3VzZXInKTtcbn07XG5cbkV2ZW50U291cmNlUmVjZWl2ZXIucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdjbGVhbnVwJyk7XG4gIHZhciBlcyA9IHRoaXMuZXM7XG4gIGlmIChlcykge1xuICAgIGVzLm9ubWVzc2FnZSA9IGVzLm9uZXJyb3IgPSBudWxsO1xuICAgIGVzLmNsb3NlKCk7XG4gICAgdGhpcy5lcyA9IG51bGw7XG4gIH1cbn07XG5cbkV2ZW50U291cmNlUmVjZWl2ZXIucHJvdG90eXBlLl9jbG9zZSA9IGZ1bmN0aW9uKHJlYXNvbikge1xuICBkZWJ1ZygnY2xvc2UnLCByZWFzb24pO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIC8vIFNhZmFyaSBhbmQgY2hyb21lIDwgMTUgY3Jhc2ggaWYgd2UgY2xvc2Ugd2luZG93IGJlZm9yZVxuICAvLyB3YWl0aW5nIGZvciBFUyBjbGVhbnVwLiBTZWU6XG4gIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04OTE1NVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuZW1pdCgnY2xvc2UnLCBudWxsLCByZWFzb24pO1xuICAgIHNlbGYucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIH0sIDIwMCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50U291cmNlUmVjZWl2ZXI7XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSlcblxufSx7XCJkZWJ1Z1wiOjU1LFwiZXZlbnRzXCI6MyxcImV2ZW50c291cmNlXCI6MTgsXCJpbmhlcml0c1wiOjU3fV0sMzA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBpZnJhbWVVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2lmcmFtZScpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIHJhbmRvbSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3JhbmRvbScpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDpyZWNlaXZlcjpodG1sZmlsZScpO1xufVxuXG5mdW5jdGlvbiBIdG1sZmlsZVJlY2VpdmVyKHVybCkge1xuICBkZWJ1Zyh1cmwpO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZnJhbWVVdGlscy5wb2xsdXRlR2xvYmFsTmFtZXNwYWNlKCk7XG5cbiAgdGhpcy5pZCA9ICdhJyArIHJhbmRvbS5zdHJpbmcoNik7XG4gIHVybCA9IHVybFV0aWxzLmFkZFF1ZXJ5KHVybCwgJ2M9JyArIGRlY29kZVVSSUNvbXBvbmVudChpZnJhbWVVdGlscy5XUHJlZml4ICsgJy4nICsgdGhpcy5pZCkpO1xuXG4gIGRlYnVnKCd1c2luZyBodG1sZmlsZScsIEh0bWxmaWxlUmVjZWl2ZXIuaHRtbGZpbGVFbmFibGVkKTtcbiAgdmFyIGNvbnN0cnVjdEZ1bmMgPSBIdG1sZmlsZVJlY2VpdmVyLmh0bWxmaWxlRW5hYmxlZCA/XG4gICAgICBpZnJhbWVVdGlscy5jcmVhdGVIdG1sZmlsZSA6IGlmcmFtZVV0aWxzLmNyZWF0ZUlmcmFtZTtcblxuICBnbG9iYWxbaWZyYW1lVXRpbHMuV1ByZWZpeF1bdGhpcy5pZF0gPSB7XG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ3N0YXJ0Jyk7XG4gICAgICBzZWxmLmlmcmFtZU9iai5sb2FkZWQoKTtcbiAgICB9XG4gICwgbWVzc2FnZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgZGVidWcoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgICAgIHNlbGYuZW1pdCgnbWVzc2FnZScsIGRhdGEpO1xuICAgIH1cbiAgLCBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIGRlYnVnKCdzdG9wJyk7XG4gICAgICBzZWxmLl9jbGVhbnVwKCk7XG4gICAgICBzZWxmLl9jbG9zZSgnbmV0d29yaycpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5pZnJhbWVPYmogPSBjb25zdHJ1Y3RGdW5jKHVybCwgZnVuY3Rpb24oKSB7XG4gICAgZGVidWcoJ2NhbGxiYWNrJyk7XG4gICAgc2VsZi5fY2xlYW51cCgpO1xuICAgIHNlbGYuX2Nsb3NlKCdwZXJtYW5lbnQnKTtcbiAgfSk7XG59XG5cbmluaGVyaXRzKEh0bWxmaWxlUmVjZWl2ZXIsIEV2ZW50RW1pdHRlcik7XG5cbkh0bWxmaWxlUmVjZWl2ZXIucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdhYm9ydCcpO1xuICB0aGlzLl9jbGVhbnVwKCk7XG4gIHRoaXMuX2Nsb3NlKCd1c2VyJyk7XG59O1xuXG5IdG1sZmlsZVJlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX2NsZWFudXAnKTtcbiAgaWYgKHRoaXMuaWZyYW1lT2JqKSB7XG4gICAgdGhpcy5pZnJhbWVPYmouY2xlYW51cCgpO1xuICAgIHRoaXMuaWZyYW1lT2JqID0gbnVsbDtcbiAgfVxuICBkZWxldGUgZ2xvYmFsW2lmcmFtZVV0aWxzLldQcmVmaXhdW3RoaXMuaWRdO1xufTtcblxuSHRtbGZpbGVSZWNlaXZlci5wcm90b3R5cGUuX2Nsb3NlID0gZnVuY3Rpb24ocmVhc29uKSB7XG4gIGRlYnVnKCdfY2xvc2UnLCByZWFzb24pO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJywgbnVsbCwgcmVhc29uKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbn07XG5cbkh0bWxmaWxlUmVjZWl2ZXIuaHRtbGZpbGVFbmFibGVkID0gZmFsc2U7XG5cbi8vIG9iZnVzY2F0ZSB0byBhdm9pZCBmaXJld2FsbHNcbnZhciBheG8gPSBbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpO1xuaWYgKGF4byBpbiBnbG9iYWwpIHtcbiAgdHJ5IHtcbiAgICBIdG1sZmlsZVJlY2VpdmVyLmh0bWxmaWxlRW5hYmxlZCA9ICEhbmV3IGdsb2JhbFtheG9dKCdodG1sZmlsZScpO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxuICB9XG59XG5cbkh0bWxmaWxlUmVjZWl2ZXIuZW5hYmxlZCA9IEh0bWxmaWxlUmVjZWl2ZXIuaHRtbGZpbGVFbmFibGVkIHx8IGlmcmFtZVV0aWxzLmlmcmFtZUVuYWJsZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gSHRtbGZpbGVSZWNlaXZlcjtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9LHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wiLi4vLi4vdXRpbHMvaWZyYW1lXCI6NDcsXCIuLi8uLi91dGlscy9yYW5kb21cIjo1MCxcIi4uLy4uL3V0aWxzL3VybFwiOjUyLFwiZGVidWdcIjo1NSxcImV2ZW50c1wiOjMsXCJpbmhlcml0c1wiOjU3fV0sMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2lmcmFtZScpXG4gICwgcmFuZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmFuZG9tJylcbiAgLCBicm93c2VyID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvYnJvd3NlcicpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy91cmwnKVxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICA7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6cmVjZWl2ZXI6anNvbnAnKTtcbn1cblxuZnVuY3Rpb24gSnNvbnBSZWNlaXZlcih1cmwpIHtcbiAgZGVidWcodXJsKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICB1dGlscy5wb2xsdXRlR2xvYmFsTmFtZXNwYWNlKCk7XG5cbiAgdGhpcy5pZCA9ICdhJyArIHJhbmRvbS5zdHJpbmcoNik7XG4gIHZhciB1cmxXaXRoSWQgPSB1cmxVdGlscy5hZGRRdWVyeSh1cmwsICdjPScgKyBlbmNvZGVVUklDb21wb25lbnQodXRpbHMuV1ByZWZpeCArICcuJyArIHRoaXMuaWQpKTtcblxuICBnbG9iYWxbdXRpbHMuV1ByZWZpeF1bdGhpcy5pZF0gPSB0aGlzLl9jYWxsYmFjay5iaW5kKHRoaXMpO1xuICB0aGlzLl9jcmVhdGVTY3JpcHQodXJsV2l0aElkKTtcblxuICAvLyBGYWxsYmFjayBtb3N0bHkgZm9yIEtvbnF1ZXJvciAtIHN0dXBpZCB0aW1lciwgMzUgc2Vjb25kcyBzaGFsbCBiZSBwbGVudHkuXG4gIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBkZWJ1ZygndGltZW91dCcpO1xuICAgIHNlbGYuX2Fib3J0KG5ldyBFcnJvcignSlNPTlAgc2NyaXB0IGxvYWRlZCBhYm5vcm1hbGx5ICh0aW1lb3V0KScpKTtcbiAgfSwgSnNvbnBSZWNlaXZlci50aW1lb3V0KTtcbn1cblxuaW5oZXJpdHMoSnNvbnBSZWNlaXZlciwgRXZlbnRFbWl0dGVyKTtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ2Fib3J0Jyk7XG4gIGlmIChnbG9iYWxbdXRpbHMuV1ByZWZpeF1bdGhpcy5pZF0pIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdKU09OUCB1c2VyIGFib3J0ZWQgcmVhZCcpO1xuICAgIGVyci5jb2RlID0gMTAwMDtcbiAgICB0aGlzLl9hYm9ydChlcnIpO1xuICB9XG59O1xuXG5Kc29ucFJlY2VpdmVyLnRpbWVvdXQgPSAzNTAwMDtcbkpzb25wUmVjZWl2ZXIuc2NyaXB0RXJyb3JUaW1lb3V0ID0gMTAwMDtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX2NhbGxiYWNrID0gZnVuY3Rpb24oZGF0YSkge1xuICBkZWJ1ZygnX2NhbGxiYWNrJywgZGF0YSk7XG4gIHRoaXMuX2NsZWFudXAoKTtcblxuICBpZiAodGhpcy5hYm9ydGluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkYXRhKSB7XG4gICAgZGVidWcoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgfVxuICB0aGlzLmVtaXQoJ2Nsb3NlJywgbnVsbCwgJ25ldHdvcmsnKTtcbiAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbn07XG5cbkpzb25wUmVjZWl2ZXIucHJvdG90eXBlLl9hYm9ydCA9IGZ1bmN0aW9uKGVycikge1xuICBkZWJ1ZygnX2Fib3J0JywgZXJyKTtcbiAgdGhpcy5fY2xlYW51cCgpO1xuICB0aGlzLmFib3J0aW5nID0gdHJ1ZTtcbiAgdGhpcy5lbWl0KCdjbG9zZScsIGVyci5jb2RlLCBlcnIubWVzc2FnZSk7XG4gIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG59O1xuXG5Kc29ucFJlY2VpdmVyLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnX2NsZWFudXAnKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKTtcbiAgaWYgKHRoaXMuc2NyaXB0Mikge1xuICAgIHRoaXMuc2NyaXB0Mi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0Mik7XG4gICAgdGhpcy5zY3JpcHQyID0gbnVsbDtcbiAgfVxuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB2YXIgc2NyaXB0ID0gdGhpcy5zY3JpcHQ7XG4gICAgLy8gVW5mb3J0dW5hdGVseSwgeW91IGNhbid0IHJlYWxseSBhYm9ydCBzY3JpcHQgbG9hZGluZyBvZlxuICAgIC8vIHRoZSBzY3JpcHQuXG4gICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gc2NyaXB0Lm9uZXJyb3IgPVxuICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9uY2xpY2sgPSBudWxsO1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgfVxuICBkZWxldGUgZ2xvYmFsW3V0aWxzLldQcmVmaXhdW3RoaXMuaWRdO1xufTtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX3NjcmlwdEVycm9yID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdfc2NyaXB0RXJyb3InKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAodGhpcy5lcnJvclRpbWVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5lcnJvclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBpZiAoIXNlbGYubG9hZGVkT2theSkge1xuICAgICAgc2VsZi5fYWJvcnQobmV3IEVycm9yKCdKU09OUCBzY3JpcHQgbG9hZGVkIGFibm9ybWFsbHkgKG9uZXJyb3IpJykpO1xuICAgIH1cbiAgfSwgSnNvbnBSZWNlaXZlci5zY3JpcHRFcnJvclRpbWVvdXQpO1xufTtcblxuSnNvbnBSZWNlaXZlci5wcm90b3R5cGUuX2NyZWF0ZVNjcmlwdCA9IGZ1bmN0aW9uKHVybCkge1xuICBkZWJ1ZygnX2NyZWF0ZVNjcmlwdCcsIHVybCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNjcmlwdCA9IHRoaXMuc2NyaXB0ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICB2YXIgc2NyaXB0MjsgIC8vIE9wZXJhIHN5bmNocm9ub3VzIGxvYWQgdHJpY2suXG5cbiAgc2NyaXB0LmlkID0gJ2EnICsgcmFuZG9tLnN0cmluZyg4KTtcbiAgc2NyaXB0LnNyYyA9IHVybDtcbiAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgc2NyaXB0LmNoYXJzZXQgPSAnVVRGLTgnO1xuICBzY3JpcHQub25lcnJvciA9IHRoaXMuX3NjcmlwdEVycm9yLmJpbmQodGhpcyk7XG4gIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnb25sb2FkJyk7XG4gICAgc2VsZi5fYWJvcnQobmV3IEVycm9yKCdKU09OUCBzY3JpcHQgbG9hZGVkIGFibm9ybWFsbHkgKG9ubG9hZCknKSk7XG4gIH07XG5cbiAgLy8gSUU5IGZpcmVzICdlcnJvcicgZXZlbnQgYWZ0ZXIgb25yZWFkeXN0YXRlY2hhbmdlIG9yIGJlZm9yZSwgaW4gcmFuZG9tIG9yZGVyLlxuICAvLyBVc2UgbG9hZGVkT2theSB0byBkZXRlcm1pbmUgaWYgYWN0dWFsbHkgZXJyb3JlZFxuICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgZGVidWcoJ29ucmVhZHlzdGF0ZWNoYW5nZScsIHNjcmlwdC5yZWFkeVN0YXRlKTtcbiAgICBpZiAoL2xvYWRlZHxjbG9zZWQvLnRlc3Qoc2NyaXB0LnJlYWR5U3RhdGUpKSB7XG4gICAgICBpZiAoc2NyaXB0ICYmIHNjcmlwdC5odG1sRm9yICYmIHNjcmlwdC5vbmNsaWNrKSB7XG4gICAgICAgIHNlbGYubG9hZGVkT2theSA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gSW4gSUUsIGFjdHVhbGx5IGV4ZWN1dGUgdGhlIHNjcmlwdC5cbiAgICAgICAgICBzY3JpcHQub25jbGljaygpO1xuICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgLy8gaW50ZW50aW9uYWxseSBlbXB0eVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgIHNlbGYuX2Fib3J0KG5ldyBFcnJvcignSlNPTlAgc2NyaXB0IGxvYWRlZCBhYm5vcm1hbGx5IChvbnJlYWR5c3RhdGVjaGFuZ2UpJykpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLy8gSUU6IGV2ZW50L2h0bWxGb3Ivb25jbGljayB0cmljay5cbiAgLy8gT25lIGNhbid0IHJlbHkgb24gcHJvcGVyIG9yZGVyIGZvciBvbnJlYWR5c3RhdGVjaGFuZ2UuIEluIG9yZGVyIHRvXG4gIC8vIG1ha2Ugc3VyZSwgc2V0IGEgJ2h0bWxGb3InIGFuZCAnZXZlbnQnIHByb3BlcnRpZXMsIHNvIHRoYXRcbiAgLy8gc2NyaXB0IGNvZGUgd2lsbCBiZSBpbnN0YWxsZWQgYXMgJ29uY2xpY2snIGhhbmRsZXIgZm9yIHRoZVxuICAvLyBzY3JpcHQgb2JqZWN0LiBMYXRlciwgb25yZWFkeXN0YXRlY2hhbmdlLCBtYW51YWxseSBleGVjdXRlIHRoaXNcbiAgLy8gY29kZS4gRkYgYW5kIENocm9tZSBkb2Vzbid0IHdvcmsgd2l0aCAnZXZlbnQnIGFuZCAnaHRtbEZvcidcbiAgLy8gc2V0LiBGb3IgcmVmZXJlbmNlIHNlZTpcbiAgLy8gICBodHRwOi8vamF1Ym91cmcubmV0LzIwMTAvMDcvbG9hZGluZy1zY3JpcHQtYXMtb25jbGljay1oYW5kbGVyLW9mLmh0bWxcbiAgLy8gQWxzbywgcmVhZCBvbiB0aGF0IGFib3V0IHNjcmlwdCBvcmRlcmluZzpcbiAgLy8gICBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvRHluYW1pY19TY3JpcHRfRXhlY3V0aW9uX09yZGVyXG4gIGlmICh0eXBlb2Ygc2NyaXB0LmFzeW5jID09PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICAvLyBBY2NvcmRpbmcgdG8gbW96aWxsYSBkb2NzLCBpbiByZWNlbnQgYnJvd3NlcnMgc2NyaXB0LmFzeW5jIGRlZmF1bHRzXG4gICAgLy8gdG8gJ3RydWUnLCBzbyB3ZSBtYXkgdXNlIGl0IHRvIGRldGVjdCBhIGdvb2QgYnJvd3NlcjpcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9IVE1ML0VsZW1lbnQvc2NyaXB0XG4gICAgaWYgKCFicm93c2VyLmlzT3BlcmEoKSkge1xuICAgICAgLy8gTmFpdmVseSBhc3N1bWUgd2UncmUgaW4gSUVcbiAgICAgIHRyeSB7XG4gICAgICAgIHNjcmlwdC5odG1sRm9yID0gc2NyaXB0LmlkO1xuICAgICAgICBzY3JpcHQuZXZlbnQgPSAnb25jbGljayc7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgIH1cbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9wZXJhLCBzZWNvbmQgc3luYyBzY3JpcHQgaGFja1xuICAgICAgc2NyaXB0MiA9IHRoaXMuc2NyaXB0MiA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdDIudGV4dCA9IFwidHJ5e3ZhciBhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1wiICsgc2NyaXB0LmlkICsgXCInKTsgaWYoYSlhLm9uZXJyb3IoKTt9Y2F0Y2goeCl7fTtcIjtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHNjcmlwdDIuYXN5bmMgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiBzY3JpcHQuYXN5bmMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBoZWFkID0gZ2xvYmFsLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIGhlYWQuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaGVhZC5maXJzdENoaWxkKTtcbiAgaWYgKHNjcmlwdDIpIHtcbiAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQyLCBoZWFkLmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEpzb25wUmVjZWl2ZXI7XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHtcIi4uLy4uL3V0aWxzL2Jyb3dzZXJcIjo0NCxcIi4uLy4uL3V0aWxzL2lmcmFtZVwiOjQ3LFwiLi4vLi4vdXRpbHMvcmFuZG9tXCI6NTAsXCIuLi8uLi91dGlscy91cmxcIjo1MixcImRlYnVnXCI6NTUsXCJldmVudHNcIjozLFwiaW5oZXJpdHNcIjo1N31dLDMyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAocHJvY2Vzcyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXJcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnJlY2VpdmVyOnhocicpO1xufVxuXG5mdW5jdGlvbiBYaHJSZWNlaXZlcih1cmwsIEFqYXhPYmplY3QpIHtcbiAgZGVidWcodXJsKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLmJ1ZmZlclBvc2l0aW9uID0gMDtcblxuICB0aGlzLnhvID0gbmV3IEFqYXhPYmplY3QoJ1BPU1QnLCB1cmwsIG51bGwpO1xuICB0aGlzLnhvLm9uKCdjaHVuaycsIHRoaXMuX2NodW5rSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgdGhpcy54by5vbmNlKCdmaW5pc2gnLCBmdW5jdGlvbihzdGF0dXMsIHRleHQpIHtcbiAgICBkZWJ1ZygnZmluaXNoJywgc3RhdHVzLCB0ZXh0KTtcbiAgICBzZWxmLl9jaHVua0hhbmRsZXIoc3RhdHVzLCB0ZXh0KTtcbiAgICBzZWxmLnhvID0gbnVsbDtcbiAgICB2YXIgcmVhc29uID0gc3RhdHVzID09PSAyMDAgPyAnbmV0d29yaycgOiAncGVybWFuZW50JztcbiAgICBkZWJ1ZygnY2xvc2UnLCByZWFzb24pO1xuICAgIHNlbGYuZW1pdCgnY2xvc2UnLCBudWxsLCByZWFzb24pO1xuICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgfSk7XG59XG5cbmluaGVyaXRzKFhoclJlY2VpdmVyLCBFdmVudEVtaXR0ZXIpO1xuXG5YaHJSZWNlaXZlci5wcm90b3R5cGUuX2NodW5rSGFuZGxlciA9IGZ1bmN0aW9uKHN0YXR1cywgdGV4dCkge1xuICBkZWJ1ZygnX2NodW5rSGFuZGxlcicsIHN0YXR1cyk7XG4gIGlmIChzdGF0dXMgIT09IDIwMCB8fCAhdGV4dCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGlkeCA9IC0xOyA7IHRoaXMuYnVmZmVyUG9zaXRpb24gKz0gaWR4ICsgMSkge1xuICAgIHZhciBidWYgPSB0ZXh0LnNsaWNlKHRoaXMuYnVmZmVyUG9zaXRpb24pO1xuICAgIGlkeCA9IGJ1Zi5pbmRleE9mKCdcXG4nKTtcbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBtc2cgPSBidWYuc2xpY2UoMCwgaWR4KTtcbiAgICBpZiAobXNnKSB7XG4gICAgICBkZWJ1ZygnbWVzc2FnZScsIG1zZyk7XG4gICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBtc2cpO1xuICAgIH1cbiAgfVxufTtcblxuWGhyUmVjZWl2ZXIucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdfY2xlYW51cCcpO1xuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxuWGhyUmVjZWl2ZXIucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdhYm9ydCcpO1xuICBpZiAodGhpcy54bykge1xuICAgIHRoaXMueG8uY2xvc2UoKTtcbiAgICBkZWJ1ZygnY2xvc2UnKTtcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgbnVsbCwgJ3VzZXInKTtcbiAgICB0aGlzLnhvID0gbnVsbDtcbiAgfVxuICB0aGlzLl9jbGVhbnVwKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhoclJlY2VpdmVyO1xuXG59KS5jYWxsKHRoaXMseyBlbnY6IHt9IH0pXG5cbn0se1wiZGVidWdcIjo1NSxcImV2ZW50c1wiOjMsXCJpbmhlcml0c1wiOjU3fV0sMzM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb20gPSByZXF1aXJlKCcuLi8uLi91dGlscy9yYW5kb20nKVxuICAsIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXJsJylcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnNlbmRlcjpqc29ucCcpO1xufVxuXG52YXIgZm9ybSwgYXJlYTtcblxuZnVuY3Rpb24gY3JlYXRlSWZyYW1lKGlkKSB7XG4gIGRlYnVnKCdjcmVhdGVJZnJhbWUnLCBpZCk7XG4gIHRyeSB7XG4gICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgcmV0dXJuIGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8aWZyYW1lIG5hbWU9XCInICsgaWQgKyAnXCI+Jyk7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICB2YXIgaWZyYW1lID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5uYW1lID0gaWQ7XG4gICAgcmV0dXJuIGlmcmFtZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtKCkge1xuICBkZWJ1ZygnY3JlYXRlRm9ybScpO1xuICBmb3JtID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gIGZvcm0uZW5jdHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICBmb3JtLmFjY2VwdENoYXJzZXQgPSAnVVRGLTgnO1xuXG4gIGFyZWEgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgYXJlYS5uYW1lID0gJ2QnO1xuICBmb3JtLmFwcGVuZENoaWxkKGFyZWEpO1xuXG4gIGdsb2JhbC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybCwgcGF5bG9hZCwgY2FsbGJhY2spIHtcbiAgZGVidWcodXJsLCBwYXlsb2FkKTtcbiAgaWYgKCFmb3JtKSB7XG4gICAgY3JlYXRlRm9ybSgpO1xuICB9XG4gIHZhciBpZCA9ICdhJyArIHJhbmRvbS5zdHJpbmcoOCk7XG4gIGZvcm0udGFyZ2V0ID0gaWQ7XG4gIGZvcm0uYWN0aW9uID0gdXJsVXRpbHMuYWRkUXVlcnkodXJsVXRpbHMuYWRkUGF0aCh1cmwsICcvanNvbnBfc2VuZCcpLCAnaT0nICsgaWQpO1xuXG4gIHZhciBpZnJhbWUgPSBjcmVhdGVJZnJhbWUoaWQpO1xuICBpZnJhbWUuaWQgPSBpZDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoaWZyYW1lKTtcblxuICB0cnkge1xuICAgIGFyZWEudmFsdWUgPSBwYXlsb2FkO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gc2VyaW91c2x5IGJyb2tlbiBicm93c2VycyBnZXQgaGVyZVxuICB9XG4gIGZvcm0uc3VibWl0KCk7XG5cbiAgdmFyIGNvbXBsZXRlZCA9IGZ1bmN0aW9uKGVycikge1xuICAgIGRlYnVnKCdjb21wbGV0ZWQnLCBpZCwgZXJyKTtcbiAgICBpZiAoIWlmcmFtZS5vbmVycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBpZnJhbWUub25lcnJvciA9IGlmcmFtZS5vbmxvYWQgPSBudWxsO1xuICAgIC8vIE9wZXJhIG1pbmkgZG9lc24ndCBsaWtlIGlmIHdlIEdDIGlmcmFtZVxuICAgIC8vIGltbWVkaWF0ZWx5LCB0aHVzIHRoaXMgdGltZW91dC5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ2NsZWFuaW5nIHVwJywgaWQpO1xuICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgIGlmcmFtZSA9IG51bGw7XG4gICAgfSwgNTAwKTtcbiAgICBhcmVhLnZhbHVlID0gJyc7XG4gICAgLy8gSXQgaXMgbm90IHBvc3NpYmxlIHRvIGRldGVjdCBpZiB0aGUgaWZyYW1lIHN1Y2NlZWRlZCBvclxuICAgIC8vIGZhaWxlZCB0byBzdWJtaXQgb3VyIGZvcm0uXG4gICAgY2FsbGJhY2soZXJyKTtcbiAgfTtcbiAgaWZyYW1lLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zygnb25lcnJvcicsIGlkKTtcbiAgICBjb21wbGV0ZWQoKTtcbiAgfTtcbiAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCdvbmxvYWQnLCBpZCk7XG4gICAgY29tcGxldGVkKCk7XG4gIH07XG4gIGlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgZGVidWcoJ29ucmVhZHlzdGF0ZWNoYW5nZScsIGlkLCBpZnJhbWUucmVhZHlTdGF0ZSwgZSk7XG4gICAgaWYgKGlmcmFtZS5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICBjb21wbGV0ZWQoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkZWJ1ZygnYWJvcnRlZCcsIGlkKTtcbiAgICBjb21wbGV0ZWQobmV3IEVycm9yKCdBYm9ydGVkJykpO1xuICB9O1xufTtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9LHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wiLi4vLi4vdXRpbHMvcmFuZG9tXCI6NTAsXCIuLi8uLi91dGlscy91cmxcIjo1MixcImRlYnVnXCI6NTV9XSwzNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIGV2ZW50VXRpbHMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9ldmVudCcpXG4gICwgYnJvd3NlciA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2Jyb3dzZXInKVxuICAsIHVybFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXJsJylcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnNlbmRlcjp4ZHInKTtcbn1cblxuLy8gUmVmZXJlbmNlczpcbi8vICAgaHR0cDovL2FqYXhpYW4uY29tL2FyY2hpdmVzLzEwMC1saW5lLWFqYXgtd3JhcHBlclxuLy8gICBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvY2MyODgwNjAodj1WUy44NSkuYXNweFxuXG5mdW5jdGlvbiBYRFJPYmplY3QobWV0aG9kLCB1cmwsIHBheWxvYWQpIHtcbiAgZGVidWcobWV0aG9kLCB1cmwpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5fc3RhcnQobWV0aG9kLCB1cmwsIHBheWxvYWQpO1xuICB9LCAwKTtcbn1cblxuaW5oZXJpdHMoWERST2JqZWN0LCBFdmVudEVtaXR0ZXIpO1xuXG5YRFJPYmplY3QucHJvdG90eXBlLl9zdGFydCA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBwYXlsb2FkKSB7XG4gIGRlYnVnKCdfc3RhcnQnKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGRyID0gbmV3IGdsb2JhbC5YRG9tYWluUmVxdWVzdCgpO1xuICAvLyBJRSBjYWNoZXMgZXZlbiBQT1NUc1xuICB1cmwgPSB1cmxVdGlscy5hZGRRdWVyeSh1cmwsICd0PScgKyAoK25ldyBEYXRlKCkpKTtcblxuICB4ZHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCdvbmVycm9yJyk7XG4gICAgc2VsZi5fZXJyb3IoKTtcbiAgfTtcbiAgeGRyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCdvbnRpbWVvdXQnKTtcbiAgICBzZWxmLl9lcnJvcigpO1xuICB9O1xuICB4ZHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCdwcm9ncmVzcycsIHhkci5yZXNwb25zZVRleHQpO1xuICAgIHNlbGYuZW1pdCgnY2h1bmsnLCAyMDAsIHhkci5yZXNwb25zZVRleHQpO1xuICB9O1xuICB4ZHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgZGVidWcoJ2xvYWQnKTtcbiAgICBzZWxmLmVtaXQoJ2ZpbmlzaCcsIDIwMCwgeGRyLnJlc3BvbnNlVGV4dCk7XG4gICAgc2VsZi5fY2xlYW51cChmYWxzZSk7XG4gIH07XG4gIHRoaXMueGRyID0geGRyO1xuICB0aGlzLnVubG9hZFJlZiA9IGV2ZW50VXRpbHMudW5sb2FkQWRkKGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX2NsZWFudXAodHJ1ZSk7XG4gIH0pO1xuICB0cnkge1xuICAgIC8vIEZhaWxzIHdpdGggQWNjZXNzRGVuaWVkIGlmIHBvcnQgbnVtYmVyIGlzIGJvZ3VzXG4gICAgdGhpcy54ZHIub3BlbihtZXRob2QsIHVybCk7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgdGhpcy54ZHIudGltZW91dCA9IHRoaXMudGltZW91dDtcbiAgICB9XG4gICAgdGhpcy54ZHIuc2VuZChwYXlsb2FkKTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIHRoaXMuX2Vycm9yKCk7XG4gIH1cbn07XG5cblhEUk9iamVjdC5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZW1pdCgnZmluaXNoJywgMCwgJycpO1xuICB0aGlzLl9jbGVhbnVwKGZhbHNlKTtcbn07XG5cblhEUk9iamVjdC5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbihhYm9ydCkge1xuICBkZWJ1ZygnY2xlYW51cCcsIGFib3J0KTtcbiAgaWYgKCF0aGlzLnhkcikge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICBldmVudFV0aWxzLnVubG9hZERlbCh0aGlzLnVubG9hZFJlZik7XG5cbiAgdGhpcy54ZHIub250aW1lb3V0ID0gdGhpcy54ZHIub25lcnJvciA9IHRoaXMueGRyLm9ucHJvZ3Jlc3MgPSB0aGlzLnhkci5vbmxvYWQgPSBudWxsO1xuICBpZiAoYWJvcnQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy54ZHIuYWJvcnQoKTtcbiAgICB9IGNhdGNoICh4KSB7XG4gICAgICAvLyBpbnRlbnRpb25hbGx5IGVtcHR5XG4gICAgfVxuICB9XG4gIHRoaXMudW5sb2FkUmVmID0gdGhpcy54ZHIgPSBudWxsO1xufTtcblxuWERST2JqZWN0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBkZWJ1ZygnY2xvc2UnKTtcbiAgdGhpcy5fY2xlYW51cCh0cnVlKTtcbn07XG5cbi8vIElFIDgvOSBpZiB0aGUgcmVxdWVzdCB0YXJnZXQgdXNlcyB0aGUgc2FtZSBzY2hlbWUgLSAjNzlcblhEUk9iamVjdC5lbmFibGVkID0gISEoZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmIGJyb3dzZXIuaGFzRG9tYWluKCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhEUk9iamVjdDtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9LHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wiLi4vLi4vdXRpbHMvYnJvd3NlclwiOjQ0LFwiLi4vLi4vdXRpbHMvZXZlbnRcIjo0NixcIi4uLy4uL3V0aWxzL3VybFwiOjUyLFwiZGVidWdcIjo1NSxcImV2ZW50c1wiOjMsXCJpbmhlcml0c1wiOjU3fV0sMzU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgWGhyRHJpdmVyID0gcmVxdWlyZSgnLi4vZHJpdmVyL3hocicpXG4gIDtcblxuZnVuY3Rpb24gWEhSQ29yc09iamVjdChtZXRob2QsIHVybCwgcGF5bG9hZCwgb3B0cykge1xuICBYaHJEcml2ZXIuY2FsbCh0aGlzLCBtZXRob2QsIHVybCwgcGF5bG9hZCwgb3B0cyk7XG59XG5cbmluaGVyaXRzKFhIUkNvcnNPYmplY3QsIFhockRyaXZlcik7XG5cblhIUkNvcnNPYmplY3QuZW5hYmxlZCA9IFhockRyaXZlci5lbmFibGVkICYmIFhockRyaXZlci5zdXBwb3J0c0NPUlM7XG5cbm1vZHVsZS5leHBvcnRzID0gWEhSQ29yc09iamVjdDtcblxufSx7XCIuLi9kcml2ZXIveGhyXCI6MTcsXCJpbmhlcml0c1wiOjU3fV0sMzY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyXG4gICwgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gIDtcblxuZnVuY3Rpb24gWEhSRmFrZSgvKiBtZXRob2QsIHVybCwgcGF5bG9hZCwgb3B0cyAqLykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gIHRoaXMudG8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuZW1pdCgnZmluaXNoJywgMjAwLCAne30nKTtcbiAgfSwgWEhSRmFrZS50aW1lb3V0KTtcbn1cblxuaW5oZXJpdHMoWEhSRmFrZSwgRXZlbnRFbWl0dGVyKTtcblxuWEhSRmFrZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgY2xlYXJUaW1lb3V0KHRoaXMudG8pO1xufTtcblxuWEhSRmFrZS50aW1lb3V0ID0gMjAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSBYSFJGYWtlO1xuXG59LHtcImV2ZW50c1wiOjMsXCJpbmhlcml0c1wiOjU3fV0sMzc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgWGhyRHJpdmVyID0gcmVxdWlyZSgnLi4vZHJpdmVyL3hocicpXG4gIDtcblxuZnVuY3Rpb24gWEhSTG9jYWxPYmplY3QobWV0aG9kLCB1cmwsIHBheWxvYWQgLyosIG9wdHMgKi8pIHtcbiAgWGhyRHJpdmVyLmNhbGwodGhpcywgbWV0aG9kLCB1cmwsIHBheWxvYWQsIHtcbiAgICBub0NyZWRlbnRpYWxzOiB0cnVlXG4gIH0pO1xufVxuXG5pbmhlcml0cyhYSFJMb2NhbE9iamVjdCwgWGhyRHJpdmVyKTtcblxuWEhSTG9jYWxPYmplY3QuZW5hYmxlZCA9IFhockRyaXZlci5lbmFibGVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUkxvY2FsT2JqZWN0O1xuXG59LHtcIi4uL2RyaXZlci94aHJcIjoxNyxcImluaGVyaXRzXCI6NTd9XSwzODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9ldmVudCcpXG4gICwgdXJsVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy91cmwnKVxuICAsIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuICAsIFdlYnNvY2tldERyaXZlciA9IHJlcXVpcmUoJy4vZHJpdmVyL3dlYnNvY2tldCcpXG4gIDtcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp3ZWJzb2NrZXQnKTtcbn1cblxuZnVuY3Rpb24gV2ViU29ja2V0VHJhbnNwb3J0KHRyYW5zVXJsLCBpZ25vcmUsIG9wdGlvbnMpIHtcbiAgaWYgKCFXZWJTb2NrZXRUcmFuc3BvcnQuZW5hYmxlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cblxuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgZGVidWcoJ2NvbnN0cnVjdG9yJywgdHJhbnNVcmwpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHVybCA9IHVybFV0aWxzLmFkZFBhdGgodHJhbnNVcmwsICcvd2Vic29ja2V0Jyk7XG4gIGlmICh1cmwuc2xpY2UoMCwgNSkgPT09ICdodHRwcycpIHtcbiAgICB1cmwgPSAnd3NzJyArIHVybC5zbGljZSg1KTtcbiAgfSBlbHNlIHtcbiAgICB1cmwgPSAnd3MnICsgdXJsLnNsaWNlKDQpO1xuICB9XG4gIHRoaXMudXJsID0gdXJsO1xuXG4gIHRoaXMud3MgPSBuZXcgV2Vic29ja2V0RHJpdmVyKHRoaXMudXJsLCBbXSwgb3B0aW9ucyk7XG4gIHRoaXMud3Mub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgIGRlYnVnKCdtZXNzYWdlIGV2ZW50JywgZS5kYXRhKTtcbiAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBlLmRhdGEpO1xuICB9O1xuICAvLyBGaXJlZm94IGhhcyBhbiBpbnRlcmVzdGluZyBidWcuIElmIGEgd2Vic29ja2V0IGNvbm5lY3Rpb24gaXNcbiAgLy8gY3JlYXRlZCBhZnRlciBvbnVubG9hZCwgaXQgc3RheXMgYWxpdmUgZXZlbiB3aGVuIHVzZXJcbiAgLy8gbmF2aWdhdGVzIGF3YXkgZnJvbSB0aGUgcGFnZS4gSW4gc3VjaCBzaXR1YXRpb24gbGV0J3MgbGllIC1cbiAgLy8gbGV0J3Mgbm90IG9wZW4gdGhlIHdzIGNvbm5lY3Rpb24gYXQgYWxsLiBTZWU6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NranMvc29ja2pzLWNsaWVudC9pc3N1ZXMvMjhcbiAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk2MDg1XG4gIHRoaXMudW5sb2FkUmVmID0gdXRpbHMudW5sb2FkQWRkKGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKCd1bmxvYWQnKTtcbiAgICBzZWxmLndzLmNsb3NlKCk7XG4gIH0pO1xuICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgZGVidWcoJ2Nsb3NlIGV2ZW50JywgZS5jb2RlLCBlLnJlYXNvbik7XG4gICAgc2VsZi5lbWl0KCdjbG9zZScsIGUuY29kZSwgZS5yZWFzb24pO1xuICAgIHNlbGYuX2NsZWFudXAoKTtcbiAgfTtcbiAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgIGRlYnVnKCdlcnJvciBldmVudCcsIGUpO1xuICAgIHNlbGYuZW1pdCgnY2xvc2UnLCAxMDA2LCAnV2ViU29ja2V0IGNvbm5lY3Rpb24gYnJva2VuJyk7XG4gICAgc2VsZi5fY2xlYW51cCgpO1xuICB9O1xufVxuXG5pbmhlcml0cyhXZWJTb2NrZXRUcmFuc3BvcnQsIEV2ZW50RW1pdHRlcik7XG5cbldlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdmFyIG1zZyA9ICdbJyArIGRhdGEgKyAnXSc7XG4gIGRlYnVnKCdzZW5kJywgbXNnKTtcbiAgdGhpcy53cy5zZW5kKG1zZyk7XG59O1xuXG5XZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIGRlYnVnKCdjbG9zZScpO1xuICB2YXIgd3MgPSB0aGlzLndzO1xuICB0aGlzLl9jbGVhbnVwKCk7XG4gIGlmICh3cykge1xuICAgIHdzLmNsb3NlKCk7XG4gIH1cbn07XG5cbldlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ19jbGVhbnVwJyk7XG4gIHZhciB3cyA9IHRoaXMud3M7XG4gIGlmICh3cykge1xuICAgIHdzLm9ubWVzc2FnZSA9IHdzLm9uY2xvc2UgPSB3cy5vbmVycm9yID0gbnVsbDtcbiAgfVxuICB1dGlscy51bmxvYWREZWwodGhpcy51bmxvYWRSZWYpO1xuICB0aGlzLnVubG9hZFJlZiA9IHRoaXMud3MgPSBudWxsO1xuICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxuV2ViU29ja2V0VHJhbnNwb3J0LmVuYWJsZWQgPSBmdW5jdGlvbigpIHtcbiAgZGVidWcoJ2VuYWJsZWQnKTtcbiAgcmV0dXJuICEhV2Vic29ja2V0RHJpdmVyO1xufTtcbldlYlNvY2tldFRyYW5zcG9ydC50cmFuc3BvcnROYW1lID0gJ3dlYnNvY2tldCc7XG5cbi8vIEluIHRoZW9yeSwgd3Mgc2hvdWxkIHJlcXVpcmUgMSByb3VuZCB0cmlwLiBCdXQgaW4gY2hyb21lLCB0aGlzIGlzXG4vLyBub3QgdmVyeSBzdGFibGUgb3ZlciBTU0wuIE1vc3QgbGlrZWx5IGEgd3MgY29ubmVjdGlvbiByZXF1aXJlcyBhXG4vLyBzZXBhcmF0ZSBTU0wgY29ubmVjdGlvbiwgaW4gd2hpY2ggY2FzZSAyIHJvdW5kIHRyaXBzIGFyZSBhblxuLy8gYWJzb2x1dGUgbWludW11bS5cbldlYlNvY2tldFRyYW5zcG9ydC5yb3VuZFRyaXBzID0gMjtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXRUcmFuc3BvcnQ7XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSlcblxufSx7XCIuLi91dGlscy9ldmVudFwiOjQ2LFwiLi4vdXRpbHMvdXJsXCI6NTIsXCIuL2RyaXZlci93ZWJzb2NrZXRcIjoxOSxcImRlYnVnXCI6NTUsXCJldmVudHNcIjozLFwiaW5oZXJpdHNcIjo1N31dLDM5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxuICAsIEFqYXhCYXNlZFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vbGliL2FqYXgtYmFzZWQnKVxuICAsIFhkclN0cmVhbWluZ1RyYW5zcG9ydCA9IHJlcXVpcmUoJy4veGRyLXN0cmVhbWluZycpXG4gICwgWGhyUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyL3hocicpXG4gICwgWERST2JqZWN0ID0gcmVxdWlyZSgnLi9zZW5kZXIveGRyJylcbiAgO1xuXG5mdW5jdGlvbiBYZHJQb2xsaW5nVHJhbnNwb3J0KHRyYW5zVXJsKSB7XG4gIGlmICghWERST2JqZWN0LmVuYWJsZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBjcmVhdGVkIHdoZW4gZGlzYWJsZWQnKTtcbiAgfVxuICBBamF4QmFzZWRUcmFuc3BvcnQuY2FsbCh0aGlzLCB0cmFuc1VybCwgJy94aHInLCBYaHJSZWNlaXZlciwgWERST2JqZWN0KTtcbn1cblxuaW5oZXJpdHMoWGRyUG9sbGluZ1RyYW5zcG9ydCwgQWpheEJhc2VkVHJhbnNwb3J0KTtcblxuWGRyUG9sbGluZ1RyYW5zcG9ydC5lbmFibGVkID0gWGRyU3RyZWFtaW5nVHJhbnNwb3J0LmVuYWJsZWQ7XG5YZHJQb2xsaW5nVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAneGRyLXBvbGxpbmcnO1xuWGRyUG9sbGluZ1RyYW5zcG9ydC5yb3VuZFRyaXBzID0gMjsgLy8gcHJlZmxpZ2h0LCBhamF4XG5cbm1vZHVsZS5leHBvcnRzID0gWGRyUG9sbGluZ1RyYW5zcG9ydDtcblxufSx7XCIuL2xpYi9hamF4LWJhc2VkXCI6MjQsXCIuL3JlY2VpdmVyL3hoclwiOjMyLFwiLi9zZW5kZXIveGRyXCI6MzQsXCIuL3hkci1zdHJlYW1pbmdcIjo0MCxcImluaGVyaXRzXCI6NTd9XSw0MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbiAgLCBBamF4QmFzZWRUcmFuc3BvcnQgPSByZXF1aXJlKCcuL2xpYi9hamF4LWJhc2VkJylcbiAgLCBYaHJSZWNlaXZlciA9IHJlcXVpcmUoJy4vcmVjZWl2ZXIveGhyJylcbiAgLCBYRFJPYmplY3QgPSByZXF1aXJlKCcuL3NlbmRlci94ZHInKVxuICA7XG5cbi8vIEFjY29yZGluZyB0bzpcbi8vICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjQxNTA3L2RldGVjdC1icm93c2VyLXN1cHBvcnQtZm9yLWNyb3NzLWRvbWFpbi14bWxodHRwcmVxdWVzdHNcbi8vICAgaHR0cDovL2hhY2tzLm1vemlsbGEub3JnLzIwMDkvMDcvY3Jvc3Mtc2l0ZS14bWxodHRwcmVxdWVzdC13aXRoLWNvcnMvXG5cbmZ1bmN0aW9uIFhkclN0cmVhbWluZ1RyYW5zcG9ydCh0cmFuc1VybCkge1xuICBpZiAoIVhEUk9iamVjdC5lbmFibGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgY3JlYXRlZCB3aGVuIGRpc2FibGVkJyk7XG4gIH1cbiAgQWpheEJhc2VkVHJhbnNwb3J0LmNhbGwodGhpcywgdHJhbnNVcmwsICcveGhyX3N0cmVhbWluZycsIFhoclJlY2VpdmVyLCBYRFJPYmplY3QpO1xufVxuXG5pbmhlcml0cyhYZHJTdHJlYW1pbmdUcmFuc3BvcnQsIEFqYXhCYXNlZFRyYW5zcG9ydCk7XG5cblhkclN0cmVhbWluZ1RyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24oaW5mbykge1xuICBpZiAoaW5mby5jb29raWVfbmVlZGVkIHx8IGluZm8ubnVsbE9yaWdpbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gWERST2JqZWN0LmVuYWJsZWQgJiYgaW5mby5zYW1lU2NoZW1lO1xufTtcblxuWGRyU3RyZWFtaW5nVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAneGRyLXN0cmVhbWluZyc7XG5YZHJTdHJlYW1pbmdUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7IC8vIHByZWZsaWdodCwgYWpheFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhkclN0cmVhbWluZ1RyYW5zcG9ydDtcblxufSx7XCIuL2xpYi9hamF4LWJhc2VkXCI6MjQsXCIuL3JlY2VpdmVyL3hoclwiOjMyLFwiLi9zZW5kZXIveGRyXCI6MzQsXCJpbmhlcml0c1wiOjU3fV0sNDE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgQWpheEJhc2VkVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi9saWIvYWpheC1iYXNlZCcpXG4gICwgWGhyUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyL3hocicpXG4gICwgWEhSQ29yc09iamVjdCA9IHJlcXVpcmUoJy4vc2VuZGVyL3hoci1jb3JzJylcbiAgLCBYSFJMb2NhbE9iamVjdCA9IHJlcXVpcmUoJy4vc2VuZGVyL3hoci1sb2NhbCcpXG4gIDtcblxuZnVuY3Rpb24gWGhyUG9sbGluZ1RyYW5zcG9ydCh0cmFuc1VybCkge1xuICBpZiAoIVhIUkxvY2FsT2JqZWN0LmVuYWJsZWQgJiYgIVhIUkNvcnNPYmplY3QuZW5hYmxlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGNyZWF0ZWQgd2hlbiBkaXNhYmxlZCcpO1xuICB9XG4gIEFqYXhCYXNlZFRyYW5zcG9ydC5jYWxsKHRoaXMsIHRyYW5zVXJsLCAnL3hocicsIFhoclJlY2VpdmVyLCBYSFJDb3JzT2JqZWN0KTtcbn1cblxuaW5oZXJpdHMoWGhyUG9sbGluZ1RyYW5zcG9ydCwgQWpheEJhc2VkVHJhbnNwb3J0KTtcblxuWGhyUG9sbGluZ1RyYW5zcG9ydC5lbmFibGVkID0gZnVuY3Rpb24oaW5mbykge1xuICBpZiAoaW5mby5udWxsT3JpZ2luKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKFhIUkxvY2FsT2JqZWN0LmVuYWJsZWQgJiYgaW5mby5zYW1lT3JpZ2luKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIFhIUkNvcnNPYmplY3QuZW5hYmxlZDtcbn07XG5cblhoclBvbGxpbmdUcmFuc3BvcnQudHJhbnNwb3J0TmFtZSA9ICd4aHItcG9sbGluZyc7XG5YaHJQb2xsaW5nVHJhbnNwb3J0LnJvdW5kVHJpcHMgPSAyOyAvLyBwcmVmbGlnaHQsIGFqYXhcblxubW9kdWxlLmV4cG9ydHMgPSBYaHJQb2xsaW5nVHJhbnNwb3J0O1xuXG59LHtcIi4vbGliL2FqYXgtYmFzZWRcIjoyNCxcIi4vcmVjZWl2ZXIveGhyXCI6MzIsXCIuL3NlbmRlci94aHItY29yc1wiOjM1LFwiLi9zZW5kZXIveGhyLWxvY2FsXCI6MzcsXCJpbmhlcml0c1wiOjU3fV0sNDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpXG4gICwgQWpheEJhc2VkVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi9saWIvYWpheC1iYXNlZCcpXG4gICwgWGhyUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyL3hocicpXG4gICwgWEhSQ29yc09iamVjdCA9IHJlcXVpcmUoJy4vc2VuZGVyL3hoci1jb3JzJylcbiAgLCBYSFJMb2NhbE9iamVjdCA9IHJlcXVpcmUoJy4vc2VuZGVyL3hoci1sb2NhbCcpXG4gICwgYnJvd3NlciA9IHJlcXVpcmUoJy4uL3V0aWxzL2Jyb3dzZXInKVxuICA7XG5cbmZ1bmN0aW9uIFhoclN0cmVhbWluZ1RyYW5zcG9ydCh0cmFuc1VybCkge1xuICBpZiAoIVhIUkxvY2FsT2JqZWN0LmVuYWJsZWQgJiYgIVhIUkNvcnNPYmplY3QuZW5hYmxlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGNyZWF0ZWQgd2hlbiBkaXNhYmxlZCcpO1xuICB9XG4gIEFqYXhCYXNlZFRyYW5zcG9ydC5jYWxsKHRoaXMsIHRyYW5zVXJsLCAnL3hocl9zdHJlYW1pbmcnLCBYaHJSZWNlaXZlciwgWEhSQ29yc09iamVjdCk7XG59XG5cbmluaGVyaXRzKFhoclN0cmVhbWluZ1RyYW5zcG9ydCwgQWpheEJhc2VkVHJhbnNwb3J0KTtcblxuWGhyU3RyZWFtaW5nVHJhbnNwb3J0LmVuYWJsZWQgPSBmdW5jdGlvbihpbmZvKSB7XG4gIGlmIChpbmZvLm51bGxPcmlnaW4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gT3BlcmEgZG9lc24ndCBzdXBwb3J0IHhoci1zdHJlYW1pbmcgIzYwXG4gIC8vIEJ1dCBpdCBtaWdodCBiZSBhYmxlIHRvICM5MlxuICBpZiAoYnJvd3Nlci5pc09wZXJhKCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gWEhSQ29yc09iamVjdC5lbmFibGVkO1xufTtcblxuWGhyU3RyZWFtaW5nVHJhbnNwb3J0LnRyYW5zcG9ydE5hbWUgPSAneGhyLXN0cmVhbWluZyc7XG5YaHJTdHJlYW1pbmdUcmFuc3BvcnQucm91bmRUcmlwcyA9IDI7IC8vIHByZWZsaWdodCwgYWpheFxuXG4vLyBTYWZhcmkgZ2V0cyBjb25mdXNlZCB3aGVuIGEgc3RyZWFtaW5nIGFqYXggcmVxdWVzdCBpcyBzdGFydGVkXG4vLyBiZWZvcmUgb25sb2FkLiBUaGlzIGNhdXNlcyB0aGUgbG9hZCBpbmRpY2F0b3IgdG8gc3BpbiBpbmRlZmluZXRlbHkuXG4vLyBPbmx5IHJlcXVpcmUgYm9keSB3aGVuIHVzZWQgaW4gYSBicm93c2VyXG5YaHJTdHJlYW1pbmdUcmFuc3BvcnQubmVlZEJvZHkgPSAhIWdsb2JhbC5kb2N1bWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBYaHJTdHJlYW1pbmdUcmFuc3BvcnQ7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHtcIi4uL3V0aWxzL2Jyb3dzZXJcIjo0NCxcIi4vbGliL2FqYXgtYmFzZWRcIjoyNCxcIi4vcmVjZWl2ZXIveGhyXCI6MzIsXCIuL3NlbmRlci94aHItY29yc1wiOjM1LFwiLi9zZW5kZXIveGhyLWxvY2FsXCI6MzcsXCJpbmhlcml0c1wiOjU3fV0sNDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuXG5pZiAoZ2xvYmFsLmNyeXB0byAmJiBnbG9iYWwuY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICBtb2R1bGUuZXhwb3J0cy5yYW5kb21CeXRlcyA9IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZ2xvYmFsLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgIHJldHVybiBieXRlcztcbiAgfTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzLnJhbmRvbUJ5dGVzID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnl0ZXNbaV0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xuICAgIH1cbiAgICByZXR1cm4gYnl0ZXM7XG4gIH07XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHt9XSw0NDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc09wZXJhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2xvYmFsLm5hdmlnYXRvciAmJlxuICAgICAgL29wZXJhL2kudGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIH1cblxuLCBpc0tvbnF1ZXJvcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGdsb2JhbC5uYXZpZ2F0b3IgJiZcbiAgICAgIC9rb25xdWVyb3IvaS50ZXN0KGdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgfVxuXG4gIC8vICMxODcgd3JhcCBkb2N1bWVudC5kb21haW4gaW4gdHJ5L2NhdGNoIGJlY2F1c2Ugb2YgV1A4IGZyb20gZmlsZTovLy9cbiwgaGFzRG9tYWluOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gbm9uLWJyb3dzZXIgY2xpZW50IGFsd2F5cyBoYXMgYSBkb21haW5cbiAgICBpZiAoIWdsb2JhbC5kb2N1bWVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAhIWdsb2JhbC5kb2N1bWVudC5kb21haW47XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se31dLDQ1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEpTT04zID0gcmVxdWlyZSgnanNvbjMnKTtcblxuLy8gU29tZSBleHRyYSBjaGFyYWN0ZXJzIHRoYXQgQ2hyb21lIGdldHMgd3JvbmcsIGFuZCBzdWJzdGl0dXRlcyB3aXRoXG4vLyBzb21ldGhpbmcgZWxzZSBvbiB0aGUgd2lyZS5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG52YXIgZXh0cmFFc2NhcGFibGUgPSAvW1xceDAwLVxceDFmXFx1ZDgwMC1cXHVkZmZmXFx1ZmZmZVxcdWZmZmZcXHUwMzAwLVxcdTAzMzNcXHUwMzNkLVxcdTAzNDZcXHUwMzRhLVxcdTAzNGNcXHUwMzUwLVxcdTAzNTJcXHUwMzU3LVxcdTAzNThcXHUwMzVjLVxcdTAzNjJcXHUwMzc0XFx1MDM3ZVxcdTAzODdcXHUwNTkxLVxcdTA1YWZcXHUwNWM0XFx1MDYxMC1cXHUwNjE3XFx1MDY1My1cXHUwNjU0XFx1MDY1Ny1cXHUwNjViXFx1MDY1ZC1cXHUwNjVlXFx1MDZkZi1cXHUwNmUyXFx1MDZlYi1cXHUwNmVjXFx1MDczMFxcdTA3MzItXFx1MDczM1xcdTA3MzUtXFx1MDczNlxcdTA3M2FcXHUwNzNkXFx1MDczZi1cXHUwNzQxXFx1MDc0M1xcdTA3NDVcXHUwNzQ3XFx1MDdlYi1cXHUwN2YxXFx1MDk1MVxcdTA5NTgtXFx1MDk1ZlxcdTA5ZGMtXFx1MDlkZFxcdTA5ZGZcXHUwYTMzXFx1MGEzNlxcdTBhNTktXFx1MGE1YlxcdTBhNWVcXHUwYjVjLVxcdTBiNWRcXHUwZTM4LVxcdTBlMzlcXHUwZjQzXFx1MGY0ZFxcdTBmNTJcXHUwZjU3XFx1MGY1Y1xcdTBmNjlcXHUwZjcyLVxcdTBmNzZcXHUwZjc4XFx1MGY4MC1cXHUwZjgzXFx1MGY5M1xcdTBmOWRcXHUwZmEyXFx1MGZhN1xcdTBmYWNcXHUwZmI5XFx1MTkzOS1cXHUxOTNhXFx1MWExN1xcdTFiNmJcXHUxY2RhLVxcdTFjZGJcXHUxZGMwLVxcdTFkY2ZcXHUxZGZjXFx1MWRmZVxcdTFmNzFcXHUxZjczXFx1MWY3NVxcdTFmNzdcXHUxZjc5XFx1MWY3YlxcdTFmN2RcXHUxZmJiXFx1MWZiZVxcdTFmYzlcXHUxZmNiXFx1MWZkM1xcdTFmZGJcXHUxZmUzXFx1MWZlYlxcdTFmZWUtXFx1MWZlZlxcdTFmZjlcXHUxZmZiXFx1MWZmZFxcdTIwMDAtXFx1MjAwMVxcdTIwZDAtXFx1MjBkMVxcdTIwZDQtXFx1MjBkN1xcdTIwZTctXFx1MjBlOVxcdTIxMjZcXHUyMTJhLVxcdTIxMmJcXHUyMzI5LVxcdTIzMmFcXHUyYWRjXFx1MzAyYi1cXHUzMDJjXFx1YWFiMi1cXHVhYWIzXFx1ZjkwMC1cXHVmYTBkXFx1ZmExMFxcdWZhMTJcXHVmYTE1LVxcdWZhMWVcXHVmYTIwXFx1ZmEyMlxcdWZhMjUtXFx1ZmEyNlxcdWZhMmEtXFx1ZmEyZFxcdWZhMzAtXFx1ZmE2ZFxcdWZhNzAtXFx1ZmFkOVxcdWZiMWRcXHVmYjFmXFx1ZmIyYS1cXHVmYjM2XFx1ZmIzOC1cXHVmYjNjXFx1ZmIzZVxcdWZiNDAtXFx1ZmI0MVxcdWZiNDMtXFx1ZmI0NFxcdWZiNDYtXFx1ZmI0ZVxcdWZmZjAtXFx1ZmZmZl0vZ1xuICAsIGV4dHJhTG9va3VwO1xuXG4vLyBUaGlzIG1heSBiZSBxdWl0ZSBzbG93LCBzbyBsZXQncyBkZWxheSB1bnRpbCB1c2VyIGFjdHVhbGx5IHVzZXMgYmFkXG4vLyBjaGFyYWN0ZXJzLlxudmFyIHVucm9sbExvb2t1cCA9IGZ1bmN0aW9uKGVzY2FwYWJsZSkge1xuICB2YXIgaTtcbiAgdmFyIHVucm9sbGVkID0ge307XG4gIHZhciBjID0gW107XG4gIGZvciAoaSA9IDA7IGkgPCA2NTUzNjsgaSsrKSB7XG4gICAgYy5wdXNoKCBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICk7XG4gIH1cbiAgZXNjYXBhYmxlLmxhc3RJbmRleCA9IDA7XG4gIGMuam9pbignJykucmVwbGFjZShlc2NhcGFibGUsIGZ1bmN0aW9uKGEpIHtcbiAgICB1bnJvbGxlZFsgYSBdID0gJ1xcXFx1JyArICgnMDAwMCcgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbiAgZXNjYXBhYmxlLmxhc3RJbmRleCA9IDA7XG4gIHJldHVybiB1bnJvbGxlZDtcbn07XG5cbi8vIFF1b3RlIHN0cmluZywgYWxzbyB0YWtpbmcgY2FyZSBvZiB1bmljb2RlIGNoYXJhY3RlcnMgdGhhdCBicm93c2Vyc1xuLy8gb2Z0ZW4gYnJlYWsuIEVzcGVjaWFsbHksIHRha2UgY2FyZSBvZiB1bmljb2RlIHN1cnJvZ2F0ZXM6XG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01hcHBpbmdfb2ZfVW5pY29kZV9jaGFyYWN0ZXJzI1N1cnJvZ2F0ZXNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBxdW90ZTogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgdmFyIHF1b3RlZCA9IEpTT04zLnN0cmluZ2lmeShzdHJpbmcpO1xuXG4gICAgLy8gSW4gbW9zdCBjYXNlcyB0aGlzIHNob3VsZCBiZSB2ZXJ5IGZhc3QgYW5kIGdvb2QgZW5vdWdoLlxuICAgIGV4dHJhRXNjYXBhYmxlLmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKCFleHRyYUVzY2FwYWJsZS50ZXN0KHF1b3RlZCkpIHtcbiAgICAgIHJldHVybiBxdW90ZWQ7XG4gICAgfVxuXG4gICAgaWYgKCFleHRyYUxvb2t1cCkge1xuICAgICAgZXh0cmFMb29rdXAgPSB1bnJvbGxMb29rdXAoZXh0cmFFc2NhcGFibGUpO1xuICAgIH1cblxuICAgIHJldHVybiBxdW90ZWQucmVwbGFjZShleHRyYUVzY2FwYWJsZSwgZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIGV4dHJhTG9va3VwW2FdO1xuICAgIH0pO1xuICB9XG59O1xuXG59LHtcImpzb24zXCI6NTh9XSw0NjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciByYW5kb20gPSByZXF1aXJlKCcuL3JhbmRvbScpO1xuXG52YXIgb25VbmxvYWQgPSB7fVxuICAsIGFmdGVyVW5sb2FkID0gZmFsc2VcbiAgICAvLyBkZXRlY3QgZ29vZ2xlIGNocm9tZSBwYWNrYWdlZCBhcHBzIGJlY2F1c2UgdGhleSBkb24ndCBhbGxvdyB0aGUgJ3VubG9hZCcgZXZlbnRcbiAgLCBpc0Nocm9tZVBhY2thZ2VkQXBwID0gZ2xvYmFsLmNocm9tZSAmJiBnbG9iYWwuY2hyb21lLmFwcCAmJiBnbG9iYWwuY2hyb21lLmFwcC5ydW50aW1lXG4gIDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF0dGFjaEV2ZW50OiBmdW5jdGlvbihldmVudCwgbGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmF0dGFjaEV2ZW50KSB7XG4gICAgICAvLyBJRSBxdWlya3MuXG4gICAgICAvLyBBY2NvcmRpbmcgdG86IGh0dHA6Ly9zdGV2ZXNvdWRlcnMuY29tL21pc2MvdGVzdC1wb3N0bWVzc2FnZS5waHBcbiAgICAgIC8vIHRoZSBtZXNzYWdlIGdldHMgZGVsaXZlcmVkIG9ubHkgdG8gJ2RvY3VtZW50Jywgbm90ICd3aW5kb3cnLlxuICAgICAgZ2xvYmFsLmRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICAgICAgLy8gSSBnZXQgJ3dpbmRvdycgZm9yIGllOC5cbiAgICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH1cblxuLCBkZXRhY2hFdmVudDogZnVuY3Rpb24oZXZlbnQsIGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLmRvY3VtZW50ICYmIGdsb2JhbC5kZXRhY2hFdmVudCkge1xuICAgICAgZ2xvYmFsLmRvY3VtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICAgICAgZ2xvYmFsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuXG4sIHVubG9hZEFkZDogZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICBpZiAoaXNDaHJvbWVQYWNrYWdlZEFwcCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHJlZiA9IHJhbmRvbS5zdHJpbmcoOCk7XG4gICAgb25VbmxvYWRbcmVmXSA9IGxpc3RlbmVyO1xuICAgIGlmIChhZnRlclVubG9hZCkge1xuICAgICAgc2V0VGltZW91dCh0aGlzLnRyaWdnZXJVbmxvYWRDYWxsYmFja3MsIDApO1xuICAgIH1cbiAgICByZXR1cm4gcmVmO1xuICB9XG5cbiwgdW5sb2FkRGVsOiBmdW5jdGlvbihyZWYpIHtcbiAgICBpZiAocmVmIGluIG9uVW5sb2FkKSB7XG4gICAgICBkZWxldGUgb25VbmxvYWRbcmVmXTtcbiAgICB9XG4gIH1cblxuLCB0cmlnZ2VyVW5sb2FkQ2FsbGJhY2tzOiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciByZWYgaW4gb25VbmxvYWQpIHtcbiAgICAgIG9uVW5sb2FkW3JlZl0oKTtcbiAgICAgIGRlbGV0ZSBvblVubG9hZFtyZWZdO1xuICAgIH1cbiAgfVxufTtcblxudmFyIHVubG9hZFRyaWdnZXJlZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoYWZ0ZXJVbmxvYWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgYWZ0ZXJVbmxvYWQgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cy50cmlnZ2VyVW5sb2FkQ2FsbGJhY2tzKCk7XG59O1xuXG4vLyAndW5sb2FkJyBhbG9uZSBpcyBub3QgcmVsaWFibGUgaW4gb3BlcmEgd2l0aGluIGFuIGlmcmFtZSwgYnV0IHdlXG4vLyBjYW4ndCB1c2UgYGJlZm9yZXVubG9hZGAgYXMgSUUgZmlyZXMgaXQgb24gamF2YXNjcmlwdDogbGlua3MuXG5pZiAoIWlzQ2hyb21lUGFja2FnZWRBcHApIHtcbiAgbW9kdWxlLmV4cG9ydHMuYXR0YWNoRXZlbnQoJ3VubG9hZCcsIHVubG9hZFRyaWdnZXJlZCk7XG59XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHtcIi4vcmFuZG9tXCI6NTB9XSw0NzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGV2ZW50VXRpbHMgPSByZXF1aXJlKCcuL2V2ZW50JylcbiAgLCBKU09OMyA9IHJlcXVpcmUoJ2pzb24zJylcbiAgLCBicm93c2VyID0gcmVxdWlyZSgnLi9icm93c2VyJylcbiAgO1xuXG52YXIgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NranMtY2xpZW50OnV0aWxzOmlmcmFtZScpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgV1ByZWZpeDogJ19qcCdcbiwgY3VycmVudFdpbmRvd0lkOiBudWxsXG5cbiwgcG9sbHV0ZUdsb2JhbE5hbWVzcGFjZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEobW9kdWxlLmV4cG9ydHMuV1ByZWZpeCBpbiBnbG9iYWwpKSB7XG4gICAgICBnbG9iYWxbbW9kdWxlLmV4cG9ydHMuV1ByZWZpeF0gPSB7fTtcbiAgICB9XG4gIH1cblxuLCBwb3N0TWVzc2FnZTogZnVuY3Rpb24odHlwZSwgZGF0YSkge1xuICAgIGlmIChnbG9iYWwucGFyZW50ICE9PSBnbG9iYWwpIHtcbiAgICAgIGdsb2JhbC5wYXJlbnQucG9zdE1lc3NhZ2UoSlNPTjMuc3RyaW5naWZ5KHtcbiAgICAgICAgd2luZG93SWQ6IG1vZHVsZS5leHBvcnRzLmN1cnJlbnRXaW5kb3dJZFxuICAgICAgLCB0eXBlOiB0eXBlXG4gICAgICAsIGRhdGE6IGRhdGEgfHwgJydcbiAgICAgIH0pLCAnKicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1ZygnQ2Fubm90IHBvc3RNZXNzYWdlLCBubyBwYXJlbnQgd2luZG93LicsIHR5cGUsIGRhdGEpO1xuICAgIH1cbiAgfVxuXG4sIGNyZWF0ZUlmcmFtZTogZnVuY3Rpb24oaWZyYW1lVXJsLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgdmFyIGlmcmFtZSA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICB2YXIgdHJlZiwgdW5sb2FkUmVmO1xuICAgIHZhciB1bmF0dGFjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ3VuYXR0YWNoJyk7XG4gICAgICBjbGVhclRpbWVvdXQodHJlZik7XG4gICAgICAvLyBFeHBsb3JlciBoYWQgcHJvYmxlbXMgd2l0aCB0aGF0LlxuICAgICAgdHJ5IHtcbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9IG51bGw7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgIH1cbiAgICAgIGlmcmFtZS5vbmVycm9yID0gbnVsbDtcbiAgICB9O1xuICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICBkZWJ1ZygnY2xlYW51cCcpO1xuICAgICAgaWYgKGlmcmFtZSkge1xuICAgICAgICB1bmF0dGFjaCgpO1xuICAgICAgICAvLyBUaGlzIHRpbWVvdXQgbWFrZXMgY2hyb21lIGZpcmUgb25iZWZvcmV1bmxvYWQgZXZlbnRcbiAgICAgICAgLy8gd2l0aGluIGlmcmFtZS4gV2l0aG91dCB0aGUgdGltZW91dCBpdCBnb2VzIHN0cmFpZ2h0IHRvXG4gICAgICAgIC8vIG9udW5sb2FkLlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmcmFtZSA9IG51bGw7XG4gICAgICAgIH0sIDApO1xuICAgICAgICBldmVudFV0aWxzLnVubG9hZERlbCh1bmxvYWRSZWYpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG9uZXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGRlYnVnKCdvbmVycm9yJywgZXJyKTtcbiAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcG9zdCA9IGZ1bmN0aW9uKG1zZywgb3JpZ2luKSB7XG4gICAgICBkZWJ1ZygncG9zdCcsIG1zZywgb3JpZ2luKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIG5vdCBsb2FkZWQsIElFIHJhaXNlcyBhbiBleGNlcHRpb25cbiAgICAgICAgICAvLyBvbiAnY29udGVudFdpbmRvdycuXG4gICAgICAgICAgaWYgKGlmcmFtZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobXNnLCBvcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfTtcblxuICAgIGlmcmFtZS5zcmMgPSBpZnJhbWVVcmw7XG4gICAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBpZnJhbWUub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgb25lcnJvcignb25lcnJvcicpO1xuICAgIH07XG4gICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWcoJ29ubG9hZCcpO1xuICAgICAgLy8gYG9ubG9hZGAgaXMgdHJpZ2dlcmVkIGJlZm9yZSBzY3JpcHRzIG9uIHRoZSBpZnJhbWUgYXJlXG4gICAgICAvLyBleGVjdXRlZC4gR2l2ZSBpdCBmZXcgc2Vjb25kcyB0byBhY3R1YWxseSBsb2FkIHN0dWZmLlxuICAgICAgY2xlYXJUaW1lb3V0KHRyZWYpO1xuICAgICAgdHJlZiA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uZXJyb3IoJ29ubG9hZCB0aW1lb3V0Jyk7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9O1xuICAgIGdsb2JhbC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgdHJlZiA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBvbmVycm9yKCd0aW1lb3V0Jyk7XG4gICAgfSwgMTUwMDApO1xuICAgIHVubG9hZFJlZiA9IGV2ZW50VXRpbHMudW5sb2FkQWRkKGNsZWFudXApO1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0OiBwb3N0XG4gICAgLCBjbGVhbnVwOiBjbGVhbnVwXG4gICAgLCBsb2FkZWQ6IHVuYXR0YWNoXG4gICAgfTtcbiAgfVxuXG4vKiBlc2xpbnQgbm8tdW5kZWY6IFwib2ZmXCIsIG5ldy1jYXA6IFwib2ZmXCIgKi9cbiwgY3JlYXRlSHRtbGZpbGU6IGZ1bmN0aW9uKGlmcmFtZVVybCwgZXJyb3JDYWxsYmFjaykge1xuICAgIHZhciBheG8gPSBbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpO1xuICAgIHZhciBkb2MgPSBuZXcgZ2xvYmFsW2F4b10oJ2h0bWxmaWxlJyk7XG4gICAgdmFyIHRyZWYsIHVubG9hZFJlZjtcbiAgICB2YXIgaWZyYW1lO1xuICAgIHZhciB1bmF0dGFjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRyZWYpO1xuICAgICAgaWZyYW1lLm9uZXJyb3IgPSBudWxsO1xuICAgIH07XG4gICAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgdW5hdHRhY2goKTtcbiAgICAgICAgZXZlbnRVdGlscy51bmxvYWREZWwodW5sb2FkUmVmKTtcbiAgICAgICAgaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgaWZyYW1lID0gZG9jID0gbnVsbDtcbiAgICAgICAgQ29sbGVjdEdhcmJhZ2UoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvbmVycm9yID0gZnVuY3Rpb24ocikge1xuICAgICAgZGVidWcoJ29uZXJyb3InLCByKTtcbiAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICBlcnJvckNhbGxiYWNrKHIpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHBvc3QgPSBmdW5jdGlvbihtc2csIG9yaWdpbikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIG5vdCBsb2FkZWQsIElFIHJhaXNlcyBhbiBleGNlcHRpb25cbiAgICAgICAgLy8gb24gJ2NvbnRlbnRXaW5kb3cnLlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpZnJhbWUgJiYgaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UobXNnLCBvcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIC8vIGludGVudGlvbmFsbHkgZW1wdHlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jLm9wZW4oKTtcbiAgICBkb2Mud3JpdGUoJzxodG1sPjxzJyArICdjcmlwdD4nICtcbiAgICAgICAgICAgICAgJ2RvY3VtZW50LmRvbWFpbj1cIicgKyBnbG9iYWwuZG9jdW1lbnQuZG9tYWluICsgJ1wiOycgK1xuICAgICAgICAgICAgICAnPC9zJyArICdjcmlwdD48L2h0bWw+Jyk7XG4gICAgZG9jLmNsb3NlKCk7XG4gICAgZG9jLnBhcmVudFdpbmRvd1ttb2R1bGUuZXhwb3J0cy5XUHJlZml4XSA9IGdsb2JhbFttb2R1bGUuZXhwb3J0cy5XUHJlZml4XTtcbiAgICB2YXIgYyA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChjKTtcbiAgICBpZnJhbWUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgYy5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIGlmcmFtZS5zcmMgPSBpZnJhbWVVcmw7XG4gICAgaWZyYW1lLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIG9uZXJyb3IoJ29uZXJyb3InKTtcbiAgICB9O1xuICAgIHRyZWYgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgb25lcnJvcigndGltZW91dCcpO1xuICAgIH0sIDE1MDAwKTtcbiAgICB1bmxvYWRSZWYgPSBldmVudFV0aWxzLnVubG9hZEFkZChjbGVhbnVwKTtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zdDogcG9zdFxuICAgICwgY2xlYW51cDogY2xlYW51cFxuICAgICwgbG9hZGVkOiB1bmF0dGFjaFxuICAgIH07XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmlmcmFtZUVuYWJsZWQgPSBmYWxzZTtcbmlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgLy8gcG9zdE1lc3NhZ2UgbWlzYmVoYXZlcyBpbiBrb25xdWVyb3IgNC42LjUgLSB0aGUgbWVzc2FnZXMgYXJlIGRlbGl2ZXJlZCB3aXRoXG4gIC8vIGh1Z2UgZGVsYXksIG9yIG5vdCBhdCBhbGwuXG4gIG1vZHVsZS5leHBvcnRzLmlmcmFtZUVuYWJsZWQgPSAodHlwZW9mIGdsb2JhbC5wb3N0TWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgIHR5cGVvZiBnbG9iYWwucG9zdE1lc3NhZ2UgPT09ICdvYmplY3QnKSAmJiAoIWJyb3dzZXIuaXNLb25xdWVyb3IoKSk7XG59XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHtcIi4vYnJvd3NlclwiOjQ0LFwiLi9ldmVudFwiOjQ2LFwiZGVidWdcIjo1NSxcImpzb24zXCI6NTh9XSw0ODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBsb2dPYmplY3QgPSB7fTtcblsnbG9nJywgJ2RlYnVnJywgJ3dhcm4nXS5mb3JFYWNoKGZ1bmN0aW9uIChsZXZlbCkge1xuICB2YXIgbGV2ZWxFeGlzdHM7XG5cbiAgdHJ5IHtcbiAgICBsZXZlbEV4aXN0cyA9IGdsb2JhbC5jb25zb2xlICYmIGdsb2JhbC5jb25zb2xlW2xldmVsXSAmJiBnbG9iYWwuY29uc29sZVtsZXZlbF0uYXBwbHk7XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuXG4gIGxvZ09iamVjdFtsZXZlbF0gPSBsZXZlbEV4aXN0cyA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsLmNvbnNvbGVbbGV2ZWxdLmFwcGx5KGdsb2JhbC5jb25zb2xlLCBhcmd1bWVudHMpO1xuICB9IDogKGxldmVsID09PSAnbG9nJyA/IGZ1bmN0aW9uICgpIHt9IDogbG9nT2JqZWN0LmxvZyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2dPYmplY3Q7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHt9XSw0OTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xuICB9XG5cbiwgZXh0ZW5kOiBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIXRoaXMuaXNPYmplY3Qob2JqKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdmFyIHNvdXJjZSwgcHJvcDtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBwcm9wKSkge1xuICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG59O1xuXG59LHt9XSw1MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBjcnlwdG86dHJ1ZSAqL1xudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG4vLyBUaGlzIHN0cmluZyBoYXMgbGVuZ3RoIDMyLCBhIHBvd2VyIG9mIDIsIHNvIHRoZSBtb2R1bHVzIGRvZXNuJ3QgaW50cm9kdWNlIGFcbi8vIGJpYXMuXG52YXIgX3JhbmRvbVN0cmluZ0NoYXJzID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Jztcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzdHJpbmc6IGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgIHZhciBtYXggPSBfcmFuZG9tU3RyaW5nQ2hhcnMubGVuZ3RoO1xuICAgIHZhciBieXRlcyA9IGNyeXB0by5yYW5kb21CeXRlcyhsZW5ndGgpO1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXQucHVzaChfcmFuZG9tU3RyaW5nQ2hhcnMuc3Vic3RyKGJ5dGVzW2ldICUgbWF4LCAxKSk7XG4gICAgfVxuICAgIHJldHVybiByZXQuam9pbignJyk7XG4gIH1cblxuLCBudW1iZXI6IGZ1bmN0aW9uKG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xuICB9XG5cbiwgbnVtYmVyU3RyaW5nOiBmdW5jdGlvbihtYXgpIHtcbiAgICB2YXIgdCA9ICgnJyArIChtYXggLSAxKSkubGVuZ3RoO1xuICAgIHZhciBwID0gbmV3IEFycmF5KHQgKyAxKS5qb2luKCcwJyk7XG4gICAgcmV0dXJuIChwICsgdGhpcy5udW1iZXIobWF4KSkuc2xpY2UoLXQpO1xuICB9XG59O1xuXG59LHtcImNyeXB0b1wiOjQzfV0sNTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2pzLWNsaWVudDp1dGlsczp0cmFuc3BvcnQnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhdmFpbGFibGVUcmFuc3BvcnRzKSB7XG4gIHJldHVybiB7XG4gICAgZmlsdGVyVG9FbmFibGVkOiBmdW5jdGlvbih0cmFuc3BvcnRzV2hpdGVsaXN0LCBpbmZvKSB7XG4gICAgICB2YXIgdHJhbnNwb3J0cyA9IHtcbiAgICAgICAgbWFpbjogW11cbiAgICAgICwgZmFjYWRlOiBbXVxuICAgICAgfTtcbiAgICAgIGlmICghdHJhbnNwb3J0c1doaXRlbGlzdCkge1xuICAgICAgICB0cmFuc3BvcnRzV2hpdGVsaXN0ID0gW107XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0cmFuc3BvcnRzV2hpdGVsaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cmFuc3BvcnRzV2hpdGVsaXN0ID0gW3RyYW5zcG9ydHNXaGl0ZWxpc3RdO1xuICAgICAgfVxuXG4gICAgICBhdmFpbGFibGVUcmFuc3BvcnRzLmZvckVhY2goZnVuY3Rpb24odHJhbnMpIHtcbiAgICAgICAgaWYgKCF0cmFucykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmFucy50cmFuc3BvcnROYW1lID09PSAnd2Vic29ja2V0JyAmJiBpbmZvLndlYnNvY2tldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBkZWJ1ZygnZGlzYWJsZWQgZnJvbSBzZXJ2ZXInLCAnd2Vic29ja2V0Jyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zcG9ydHNXaGl0ZWxpc3QubGVuZ3RoICYmXG4gICAgICAgICAgICB0cmFuc3BvcnRzV2hpdGVsaXN0LmluZGV4T2YodHJhbnMudHJhbnNwb3J0TmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgZGVidWcoJ25vdCBpbiB3aGl0ZWxpc3QnLCB0cmFucy50cmFuc3BvcnROYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJhbnMuZW5hYmxlZChpbmZvKSkge1xuICAgICAgICAgIGRlYnVnKCdlbmFibGVkJywgdHJhbnMudHJhbnNwb3J0TmFtZSk7XG4gICAgICAgICAgdHJhbnNwb3J0cy5tYWluLnB1c2godHJhbnMpO1xuICAgICAgICAgIGlmICh0cmFucy5mYWNhZGVUcmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydHMuZmFjYWRlLnB1c2godHJhbnMuZmFjYWRlVHJhbnNwb3J0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVidWcoJ2Rpc2FibGVkJywgdHJhbnMudHJhbnNwb3J0TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyYW5zcG9ydHM7XG4gICAgfVxuICB9O1xufTtcblxufSkuY2FsbCh0aGlzLHsgZW52OiB7fSB9KVxuXG59LHtcImRlYnVnXCI6NTV9XSw1MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVVJMID0gcmVxdWlyZSgndXJsLXBhcnNlJyk7XG5cbnZhciBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tqcy1jbGllbnQ6dXRpbHM6dXJsJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRPcmlnaW46IGZ1bmN0aW9uKHVybCkge1xuICAgIGlmICghdXJsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgcCA9IG5ldyBVUkwodXJsKTtcbiAgICBpZiAocC5wcm90b2NvbCA9PT0gJ2ZpbGU6Jykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHBvcnQgPSBwLnBvcnQ7XG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBwb3J0ID0gKHAucHJvdG9jb2wgPT09ICdodHRwczonKSA/ICc0NDMnIDogJzgwJztcbiAgICB9XG5cbiAgICByZXR1cm4gcC5wcm90b2NvbCArICcvLycgKyBwLmhvc3RuYW1lICsgJzonICsgcG9ydDtcbiAgfVxuXG4sIGlzT3JpZ2luRXF1YWw6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgcmVzID0gdGhpcy5nZXRPcmlnaW4oYSkgPT09IHRoaXMuZ2V0T3JpZ2luKGIpO1xuICAgIGRlYnVnKCdzYW1lJywgYSwgYiwgcmVzKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiwgaXNTY2hlbWVFcXVhbDogZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiAoYS5zcGxpdCgnOicpWzBdID09PSBiLnNwbGl0KCc6JylbMF0pO1xuICB9XG5cbiwgYWRkUGF0aDogZnVuY3Rpb24gKHVybCwgcGF0aCkge1xuICAgIHZhciBxcyA9IHVybC5zcGxpdCgnPycpO1xuICAgIHJldHVybiBxc1swXSArIHBhdGggKyAocXNbMV0gPyAnPycgKyBxc1sxXSA6ICcnKTtcbiAgfVxuXG4sIGFkZFF1ZXJ5OiBmdW5jdGlvbiAodXJsLCBxKSB7XG4gICAgcmV0dXJuIHVybCArICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICgnPycgKyBxKSA6ICgnJicgKyBxKSk7XG4gIH1cbn07XG5cbn0pLmNhbGwodGhpcyx7IGVudjoge30gfSlcblxufSx7XCJkZWJ1Z1wiOjU1LFwidXJsLXBhcnNlXCI6NjF9XSw1MzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9ICcxLjQuMCc7XG5cbn0se31dLDU0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwtP1xcZD9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICd3ZWVrcyc6XG4gICAgY2FzZSAnd2Vlayc6XG4gICAgY2FzZSAndyc6XG4gICAgICByZXR1cm4gbiAqIHc7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGQsICdkYXknKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBoLCAnaG91cicpO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIG0sICdtaW51dGUnKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBzLCAnc2Vjb25kJyk7XG4gIH1cbiAgcmV0dXJuIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBtc0FicywgbiwgbmFtZSkge1xuICB2YXIgaXNQbHVyYWwgPSBtc0FicyA+PSBuICogMS41O1xuICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG4pICsgJyAnICsgbmFtZSArIChpc1BsdXJhbCA/ICdzJyA6ICcnKTtcbn1cblxufSx7fV0sNTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSBsb2NhbHN0b3JhZ2UoKTtcbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gWycjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJywgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLCAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJywgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLCAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JywgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLCAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJywgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ107XG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgKHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgd2luZG93LnByb2Nlc3MuX19ud2pzKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cblxuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBJcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuXG5cbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSB8fCAvLyBJcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8IHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkgfHwgLy8gSXMgZmlyZWZveCA+PSB2MzE/XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxIHx8IC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLyk7XG59XG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIGFyZ3NbMF0gPSAodGhpcy51c2VDb2xvcnMgPyAnJWMnIDogJycpICsgdGhpcy5uYW1lc3BhY2UgKyAodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgKyBhcmdzWzBdICsgKHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICsgJysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKTsgLy8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblxuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgaWYgKG1hdGNoID09PSAnJSUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW5kZXgrKztcblxuICAgIGlmIChtYXRjaCA9PT0gJyVjJykge1xuICAgICAgLy8gV2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblxuZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgLy8gVGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICh0eXBlb2YgY29uc29sZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGNvbnNvbGUpKSA9PT0gJ29iamVjdCcgJiYgY29uc29sZS5sb2cgJiYgKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpO1xufVxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnNldEl0ZW0oJ2RlYnVnJywgbmFtZXNwYWNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHsvLyBTd2FsbG93XG4gICAgLy8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG4gIH1cbn1cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcblxuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHt9IC8vIFN3YWxsb3dcbiAgLy8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblxuXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICAvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG4gICAgLy8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlcnJvcikgey8vIFN3YWxsb3dcbiAgICAvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG52YXIgZm9ybWF0dGVycyA9IG1vZHVsZS5leHBvcnRzLmZvcm1hdHRlcnM7XG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcbiAgfVxufTtcblxuXG59KS5jYWxsKHRoaXMseyBlbnY6IHt9IH0pXG5cbn0se1wiLi9jb21tb25cIjo1Nn1dLDU2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuICBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuICBjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG4gIGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcbiAgY3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG4gIGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcbiAgY3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG4gIGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcbiAgT2JqZWN0LmtleXMoZW52KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBjcmVhdGVEZWJ1Z1trZXldID0gZW52W2tleV07XG4gIH0pO1xuICAvKipcbiAgKiBBY3RpdmUgYGRlYnVnYCBpbnN0YW5jZXMuXG4gICovXG5cbiAgY3JlYXRlRGVidWcuaW5zdGFuY2VzID0gW107XG4gIC8qKlxuICAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICAqL1xuXG4gIGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG4gIGNyZWF0ZURlYnVnLnNraXBzID0gW107XG4gIC8qKlxuICAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAgKlxuICAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAgKi9cblxuICBjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzID0ge307XG4gIC8qKlxuICAqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2VcbiAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG4gICogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbiAgZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gICAgdmFyIGhhc2ggPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lc3BhY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIGhhc2ggPSAoaGFzaCA8PCA1KSAtIGhhc2ggKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuICB9XG5cbiAgY3JlYXRlRGVidWcuc2VsZWN0Q29sb3IgPSBzZWxlY3RDb2xvcjtcbiAgLyoqXG4gICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gICogQHJldHVybiB7RnVuY3Rpb259XG4gICogQGFwaSBwdWJsaWNcbiAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcbiAgICB2YXIgcHJldlRpbWU7XG5cbiAgICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICAvLyBEaXNhYmxlZD9cbiAgICAgIGlmICghZGVidWcuZW5hYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzZWxmID0gZGVidWc7IC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cbiAgICAgIHZhciBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuICAgICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgICAgcHJldlRpbWUgPSBjdXJyO1xuICAgICAgYXJnc1swXSA9IGNyZWF0ZURlYnVnLmNvZXJjZShhcmdzWzBdKTtcblxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBBbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgICB9IC8vIEFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG5cblxuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbiAobWF0Y2gsIGZvcm1hdCkge1xuICAgICAgICAvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykge1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIHZhciBmb3JtYXR0ZXIgPSBjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpOyAvLyBOb3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG5cbiAgICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH0pOyAvLyBBcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuXG4gICAgICBjcmVhdGVEZWJ1Zy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG4gICAgICB2YXIgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG4gICAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9XG5cbiAgICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgZGVidWcuZW5hYmxlZCA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgICBkZWJ1Zy51c2VDb2xvcnMgPSBjcmVhdGVEZWJ1Zy51c2VDb2xvcnMoKTtcbiAgICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gICAgZGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG4gICAgZGVidWcuZXh0ZW5kID0gZXh0ZW5kOyAvLyBEZWJ1Zy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbiAgICAvLyBkZWJ1Zy5yYXdMb2cgPSByYXdMb2c7XG4gICAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblxuICAgIGlmICh0eXBlb2YgY3JlYXRlRGVidWcuaW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3JlYXRlRGVidWcuaW5pdChkZWJ1Zyk7XG4gICAgfVxuXG4gICAgY3JlYXRlRGVidWcuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuICAgIHJldHVybiBkZWJ1ZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdmFyIGluZGV4ID0gY3JlYXRlRGVidWcuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZChuYW1lc3BhY2UsIGRlbGltaXRlcikge1xuICAgIHJldHVybiBjcmVhdGVEZWJ1Zyh0aGlzLm5hbWVzcGFjZSArICh0eXBlb2YgZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/ICc6JyA6IGRlbGltaXRlcikgKyBuYW1lc3BhY2UpO1xuICB9XG4gIC8qKlxuICAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAgKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAgKiBAYXBpIHB1YmxpY1xuICAqL1xuXG5cbiAgZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgICBjcmVhdGVEZWJ1Zy5zYXZlKG5hbWVzcGFjZXMpO1xuICAgIGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG4gICAgY3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcbiAgICB2YXIgaTtcbiAgICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICAgIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICghc3BsaXRbaV0pIHtcbiAgICAgICAgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuXG4gICAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICAgIGNyZWF0ZURlYnVnLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JlYXRlRGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY3JlYXRlRGVidWcuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXNbaV07XG4gICAgICBpbnN0YW5jZS5lbmFibGVkID0gY3JlYXRlRGVidWcuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAgKlxuICAqIEBhcGkgcHVibGljXG4gICovXG5cblxuICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgIGNyZWF0ZURlYnVnLmVuYWJsZSgnJyk7XG4gIH1cbiAgLyoqXG4gICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAqIEBhcGkgcHVibGljXG4gICovXG5cblxuICBmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBpO1xuICAgIHZhciBsZW47XG5cbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGNyZWF0ZURlYnVnLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoY3JlYXRlRGVidWcubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLyoqXG4gICogQ29lcmNlIGB2YWxgLlxuICAqXG4gICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gICogQHJldHVybiB7TWl4ZWR9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cblxuICBmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcbiAgcmV0dXJuIGNyZWF0ZURlYnVnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldHVwO1xuXG5cbn0se1wibXNcIjo1NH1dLDU3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbmlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuXG59LHt9XSw1ODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4vKiEgSlNPTiB2My4zLjIgfCBodHRwOi8vYmVzdGllanMuZ2l0aHViLmlvL2pzb24zIHwgQ29weXJpZ2h0IDIwMTItMjAxNCwgS2l0IENhbWJyaWRnZSB8IGh0dHA6Ly9raXQubWl0LWxpY2Vuc2Uub3JnICovXG47KGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IHRoZSBgZGVmaW5lYCBmdW5jdGlvbiBleHBvc2VkIGJ5IGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy4gVGhlXG4gIC8vIHN0cmljdCBgZGVmaW5lYCBjaGVjayBpcyBuZWNlc3NhcnkgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBgci5qc2AuXG4gIHZhciBpc0xvYWRlciA9IHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kO1xuXG4gIC8vIEEgc2V0IG9mIHR5cGVzIHVzZWQgdG8gZGlzdGluZ3Vpc2ggb2JqZWN0cyBmcm9tIHByaW1pdGl2ZXMuXG4gIHZhciBvYmplY3RUeXBlcyA9IHtcbiAgICBcImZ1bmN0aW9uXCI6IHRydWUsXG4gICAgXCJvYmplY3RcIjogdHJ1ZVxuICB9O1xuXG4gIC8vIERldGVjdCB0aGUgYGV4cG9ydHNgIG9iamVjdCBleHBvc2VkIGJ5IENvbW1vbkpTIGltcGxlbWVudGF0aW9ucy5cbiAgdmFyIGZyZWVFeHBvcnRzID0gb2JqZWN0VHlwZXNbdHlwZW9mIGV4cG9ydHNdICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuICAvLyBVc2UgdGhlIGBnbG9iYWxgIG9iamVjdCBleHBvc2VkIGJ5IE5vZGUgKGluY2x1ZGluZyBCcm93c2VyaWZ5IHZpYVxuICAvLyBgaW5zZXJ0LW1vZHVsZS1nbG9iYWxzYCksIE5hcndoYWwsIGFuZCBSaW5nbyBhcyB0aGUgZGVmYXVsdCBjb250ZXh0LFxuICAvLyBhbmQgdGhlIGB3aW5kb3dgIG9iamVjdCBpbiBicm93c2Vycy4gUmhpbm8gZXhwb3J0cyBhIGBnbG9iYWxgIGZ1bmN0aW9uXG4gIC8vIGluc3RlYWQuXG4gIHZhciByb290ID0gb2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93IHx8IHRoaXMsXG4gICAgICBmcmVlR2xvYmFsID0gZnJlZUV4cG9ydHMgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG1vZHVsZV0gJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgdHlwZW9mIGdsb2JhbCA9PSBcIm9iamVjdFwiICYmIGdsb2JhbDtcblxuICBpZiAoZnJlZUdsb2JhbCAmJiAoZnJlZUdsb2JhbFtcImdsb2JhbFwiXSA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsW1wid2luZG93XCJdID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWxbXCJzZWxmXCJdID09PSBmcmVlR2xvYmFsKSkge1xuICAgIHJvb3QgPSBmcmVlR2xvYmFsO1xuICB9XG5cbiAgLy8gUHVibGljOiBJbml0aWFsaXplcyBKU09OIDMgdXNpbmcgdGhlIGdpdmVuIGBjb250ZXh0YCBvYmplY3QsIGF0dGFjaGluZyB0aGVcbiAgLy8gYHN0cmluZ2lmeWAgYW5kIGBwYXJzZWAgZnVuY3Rpb25zIHRvIHRoZSBzcGVjaWZpZWQgYGV4cG9ydHNgIG9iamVjdC5cbiAgZnVuY3Rpb24gcnVuSW5Db250ZXh0KGNvbnRleHQsIGV4cG9ydHMpIHtcbiAgICBjb250ZXh0IHx8IChjb250ZXh0ID0gcm9vdFtcIk9iamVjdFwiXSgpKTtcbiAgICBleHBvcnRzIHx8IChleHBvcnRzID0gcm9vdFtcIk9iamVjdFwiXSgpKTtcblxuICAgIC8vIE5hdGl2ZSBjb25zdHJ1Y3RvciBhbGlhc2VzLlxuICAgIHZhciBOdW1iZXIgPSBjb250ZXh0W1wiTnVtYmVyXCJdIHx8IHJvb3RbXCJOdW1iZXJcIl0sXG4gICAgICAgIFN0cmluZyA9IGNvbnRleHRbXCJTdHJpbmdcIl0gfHwgcm9vdFtcIlN0cmluZ1wiXSxcbiAgICAgICAgT2JqZWN0ID0gY29udGV4dFtcIk9iamVjdFwiXSB8fCByb290W1wiT2JqZWN0XCJdLFxuICAgICAgICBEYXRlID0gY29udGV4dFtcIkRhdGVcIl0gfHwgcm9vdFtcIkRhdGVcIl0sXG4gICAgICAgIFN5bnRheEVycm9yID0gY29udGV4dFtcIlN5bnRheEVycm9yXCJdIHx8IHJvb3RbXCJTeW50YXhFcnJvclwiXSxcbiAgICAgICAgVHlwZUVycm9yID0gY29udGV4dFtcIlR5cGVFcnJvclwiXSB8fCByb290W1wiVHlwZUVycm9yXCJdLFxuICAgICAgICBNYXRoID0gY29udGV4dFtcIk1hdGhcIl0gfHwgcm9vdFtcIk1hdGhcIl0sXG4gICAgICAgIG5hdGl2ZUpTT04gPSBjb250ZXh0W1wiSlNPTlwiXSB8fCByb290W1wiSlNPTlwiXTtcblxuICAgIC8vIERlbGVnYXRlIHRvIHRoZSBuYXRpdmUgYHN0cmluZ2lmeWAgYW5kIGBwYXJzZWAgaW1wbGVtZW50YXRpb25zLlxuICAgIGlmICh0eXBlb2YgbmF0aXZlSlNPTiA9PSBcIm9iamVjdFwiICYmIG5hdGl2ZUpTT04pIHtcbiAgICAgIGV4cG9ydHMuc3RyaW5naWZ5ID0gbmF0aXZlSlNPTi5zdHJpbmdpZnk7XG4gICAgICBleHBvcnRzLnBhcnNlID0gbmF0aXZlSlNPTi5wYXJzZTtcbiAgICB9XG5cbiAgICAvLyBDb252ZW5pZW5jZSBhbGlhc2VzLlxuICAgIHZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgICAgIGdldENsYXNzID0gb2JqZWN0UHJvdG8udG9TdHJpbmcsXG4gICAgICAgIGlzUHJvcGVydHksIGZvckVhY2gsIHVuZGVmO1xuXG4gICAgLy8gVGVzdCB0aGUgYERhdGUjZ2V0VVRDKmAgbWV0aG9kcy4gQmFzZWQgb24gd29yayBieSBAWWFmZmxlLlxuICAgIHZhciBpc0V4dGVuZGVkID0gbmV3IERhdGUoLTM1MDk4MjczMzQ1NzMyOTIpO1xuICAgIHRyeSB7XG4gICAgICAvLyBUaGUgYGdldFVUQ0Z1bGxZZWFyYCwgYE1vbnRoYCwgYW5kIGBEYXRlYCBtZXRob2RzIHJldHVybiBub25zZW5zaWNhbFxuICAgICAgLy8gcmVzdWx0cyBmb3IgY2VydGFpbiBkYXRlcyBpbiBPcGVyYSA+PSAxMC41My5cbiAgICAgIGlzRXh0ZW5kZWQgPSBpc0V4dGVuZGVkLmdldFVUQ0Z1bGxZZWFyKCkgPT0gLTEwOTI1MiAmJiBpc0V4dGVuZGVkLmdldFVUQ01vbnRoKCkgPT09IDAgJiYgaXNFeHRlbmRlZC5nZXRVVENEYXRlKCkgPT09IDEgJiZcbiAgICAgICAgLy8gU2FmYXJpIDwgMi4wLjIgc3RvcmVzIHRoZSBpbnRlcm5hbCBtaWxsaXNlY29uZCB0aW1lIHZhbHVlIGNvcnJlY3RseSxcbiAgICAgICAgLy8gYnV0IGNsaXBzIHRoZSB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGRhdGUgbWV0aG9kcyB0byB0aGUgcmFuZ2Ugb2ZcbiAgICAgICAgLy8gc2lnbmVkIDMyLWJpdCBpbnRlZ2VycyAoWy0yICoqIDMxLCAyICoqIDMxIC0gMV0pLlxuICAgICAgICBpc0V4dGVuZGVkLmdldFVUQ0hvdXJzKCkgPT0gMTAgJiYgaXNFeHRlbmRlZC5nZXRVVENNaW51dGVzKCkgPT0gMzcgJiYgaXNFeHRlbmRlZC5nZXRVVENTZWNvbmRzKCkgPT0gNiAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbGxpc2Vjb25kcygpID09IDcwODtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG5cbiAgICAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBuYXRpdmUgYEpTT04uc3RyaW5naWZ5YCBhbmQgYHBhcnNlYFxuICAgIC8vIGltcGxlbWVudGF0aW9ucyBhcmUgc3BlYy1jb21wbGlhbnQuIEJhc2VkIG9uIHdvcmsgYnkgS2VuIFNueWRlci5cbiAgICBmdW5jdGlvbiBoYXMobmFtZSkge1xuICAgICAgaWYgKGhhc1tuYW1lXSAhPT0gdW5kZWYpIHtcbiAgICAgICAgLy8gUmV0dXJuIGNhY2hlZCBmZWF0dXJlIHRlc3QgcmVzdWx0LlxuICAgICAgICByZXR1cm4gaGFzW25hbWVdO1xuICAgICAgfVxuICAgICAgdmFyIGlzU3VwcG9ydGVkO1xuICAgICAgaWYgKG5hbWUgPT0gXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIikge1xuICAgICAgICAvLyBJRSA8PSA3IGRvZXNuJ3Qgc3VwcG9ydCBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgdXNpbmcgc3F1YXJlXG4gICAgICAgIC8vIGJyYWNrZXQgbm90YXRpb24uIElFIDggb25seSBzdXBwb3J0cyB0aGlzIGZvciBwcmltaXRpdmVzLlxuICAgICAgICBpc1N1cHBvcnRlZCA9IFwiYVwiWzBdICE9IFwiYVwiO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09IFwianNvblwiKSB7XG4gICAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIGJvdGggYEpTT04uc3RyaW5naWZ5YCBhbmQgYEpTT04ucGFyc2VgIGFyZVxuICAgICAgICAvLyBzdXBwb3J0ZWQuXG4gICAgICAgIGlzU3VwcG9ydGVkID0gaGFzKFwianNvbi1zdHJpbmdpZnlcIikgJiYgaGFzKFwianNvbi1wYXJzZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB2YWx1ZSwgc2VyaWFsaXplZCA9ICd7XCJhXCI6WzEsdHJ1ZSxmYWxzZSxudWxsLFwiXFxcXHUwMDAwXFxcXGJcXFxcblxcXFxmXFxcXHJcXFxcdFwiXX0nO1xuICAgICAgICAvLyBUZXN0IGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgIGlmIChuYW1lID09IFwianNvbi1zdHJpbmdpZnlcIikge1xuICAgICAgICAgIHZhciBzdHJpbmdpZnkgPSBleHBvcnRzLnN0cmluZ2lmeSwgc3RyaW5naWZ5U3VwcG9ydGVkID0gdHlwZW9mIHN0cmluZ2lmeSA9PSBcImZ1bmN0aW9uXCIgJiYgaXNFeHRlbmRlZDtcbiAgICAgICAgICBpZiAoc3RyaW5naWZ5U3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAvLyBBIHRlc3QgZnVuY3Rpb24gb2JqZWN0IHdpdGggYSBjdXN0b20gYHRvSlNPTmAgbWV0aG9kLlxuICAgICAgICAgICAgKHZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH0pLnRvSlNPTiA9IHZhbHVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc3RyaW5naWZ5U3VwcG9ydGVkID1cbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IDMuMWIxIGFuZCBiMiBzZXJpYWxpemUgc3RyaW5nLCBudW1iZXIsIGFuZCBib29sZWFuXG4gICAgICAgICAgICAgICAgLy8gcHJpbWl0aXZlcyBhcyBvYmplY3QgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KDApID09PSBcIjBcIiAmJlxuICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCBiMiwgYW5kIEpTT04gMiBzZXJpYWxpemUgd3JhcHBlZCBwcmltaXRpdmVzIGFzIG9iamVjdFxuICAgICAgICAgICAgICAgIC8vIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgTnVtYmVyKCkpID09PSBcIjBcIiAmJlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgU3RyaW5nKCkpID09ICdcIlwiJyAmJlxuICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvclxuICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IGRlZmluZSBhIGNhbm9uaWNhbCBKU09OIHJlcHJlc2VudGF0aW9uICh0aGlzIGFwcGxpZXMgdG9cbiAgICAgICAgICAgICAgICAvLyBvYmplY3RzIHdpdGggYHRvSlNPTmAgcHJvcGVydGllcyBhcyB3ZWxsLCAqdW5sZXNzKiB0aGV5IGFyZSBuZXN0ZWRcbiAgICAgICAgICAgICAgICAvLyB3aXRoaW4gYW4gb2JqZWN0IG9yIGFycmF5KS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoZ2V0Q2xhc3MpID09PSB1bmRlZiAmJlxuICAgICAgICAgICAgICAgIC8vIElFIDggc2VyaWFsaXplcyBgdW5kZWZpbmVkYCBhcyBgXCJ1bmRlZmluZWRcImAuIFNhZmFyaSA8PSA1LjEuNyBhbmRcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMyBwYXNzIHRoaXMgdGVzdC5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkodW5kZWYpID09PSB1bmRlZiAmJlxuICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuNyBhbmQgRkYgMy4xYjMgdGhyb3cgYEVycm9yYHMgYW5kIGBUeXBlRXJyb3JgcyxcbiAgICAgICAgICAgICAgICAvLyByZXNwZWN0aXZlbHksIGlmIHRoZSB2YWx1ZSBpcyBvbWl0dGVkIGVudGlyZWx5LlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSgpID09PSB1bmRlZiAmJlxuICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgYSBudW1iZXIsXG4gICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBhcnJheSwgb2JqZWN0LCBCb29sZWFuLCBvciBgbnVsbGAgbGl0ZXJhbC4gVGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgICAgLy8gb2JqZWN0cyB3aXRoIGN1c3RvbSBgdG9KU09OYCBtZXRob2RzIGFzIHdlbGwsIHVubGVzcyB0aGV5IGFyZSBuZXN0ZWRcbiAgICAgICAgICAgICAgICAvLyBpbnNpZGUgb2JqZWN0IG9yIGFycmF5IGxpdGVyYWxzLiBZVUkgMy4wLjBiMSBpZ25vcmVzIGN1c3RvbSBgdG9KU09OYFxuICAgICAgICAgICAgICAgIC8vIG1ldGhvZHMgZW50aXJlbHkuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KHZhbHVlKSA9PT0gXCIxXCIgJiZcbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoW3ZhbHVlXSkgPT0gXCJbMV1cIiAmJlxuICAgICAgICAgICAgICAgIC8vIFByb3RvdHlwZSA8PSAxLjYuMSBzZXJpYWxpemVzIGBbdW5kZWZpbmVkXWAgYXMgYFwiW11cImAgaW5zdGVhZCBvZlxuICAgICAgICAgICAgICAgIC8vIGBcIltudWxsXVwiYC5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoW3VuZGVmXSkgPT0gXCJbbnVsbF1cIiAmJlxuICAgICAgICAgICAgICAgIC8vIFlVSSAzLjAuMGIxIGZhaWxzIHRvIHNlcmlhbGl6ZSBgbnVsbGAgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG51bGwpID09IFwibnVsbFwiICYmXG4gICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIDIgaGFsdHMgc2VyaWFsaXphdGlvbiBpZiBhbiBhcnJheSBjb250YWlucyBhIGZ1bmN0aW9uOlxuICAgICAgICAgICAgICAgIC8vIGBbMSwgdHJ1ZSwgZ2V0Q2xhc3MsIDFdYCBzZXJpYWxpemVzIGFzIFwiWzEsdHJ1ZSxdLFwiLiBGRiAzLjFiM1xuICAgICAgICAgICAgICAgIC8vIGVsaWRlcyBub24tSlNPTiB2YWx1ZXMgZnJvbSBvYmplY3RzIGFuZCBhcnJheXMsIHVubGVzcyB0aGV5XG4gICAgICAgICAgICAgICAgLy8gZGVmaW5lIGN1c3RvbSBgdG9KU09OYCBtZXRob2RzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShbdW5kZWYsIGdldENsYXNzLCBudWxsXSkgPT0gXCJbbnVsbCxudWxsLG51bGxdXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGUgc2VyaWFsaXphdGlvbiB0ZXN0LiBGRiAzLjFiMSB1c2VzIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xuICAgICAgICAgICAgICAgIC8vIHdoZXJlIGNoYXJhY3RlciBlc2NhcGUgY29kZXMgYXJlIGV4cGVjdGVkIChlLmcuLCBgXFxiYCA9PiBgXFx1MDAwOGApLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh7IFwiYVwiOiBbdmFsdWUsIHRydWUsIGZhbHNlLCBudWxsLCBcIlxceDAwXFxiXFxuXFxmXFxyXFx0XCJdIH0pID09IHNlcmlhbGl6ZWQgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSBhbmQgYjIgaWdub3JlIHRoZSBgZmlsdGVyYCBhbmQgYHdpZHRoYCBhcmd1bWVudHMuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG51bGwsIHZhbHVlKSA9PT0gXCIxXCIgJiZcbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoWzEsIDJdLCBudWxsLCAxKSA9PSBcIltcXG4gMSxcXG4gMlxcbl1cIiAmJlxuICAgICAgICAgICAgICAgIC8vIEpTT04gMiwgUHJvdG90eXBlIDw9IDEuNywgYW5kIG9sZGVyIFdlYktpdCBidWlsZHMgaW5jb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAvLyBzZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC04LjY0ZTE1KSkgPT0gJ1wiLTI3MTgyMS0wNC0yMFQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgICAgLy8gVGhlIG1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNSwgYnV0IHJlcXVpcmVkIGluIDUuMS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoOC42NGUxNSkpID09ICdcIisyNzU3NjAtMDktMTNUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggPD0gMTEuMCBpbmNvcnJlY3RseSBzZXJpYWxpemVzIHllYXJzIHByaW9yIHRvIDAgYXMgbmVnYXRpdmVcbiAgICAgICAgICAgICAgICAvLyBmb3VyLWRpZ2l0IHllYXJzIGluc3RlYWQgb2Ygc2l4LWRpZ2l0IHllYXJzLiBDcmVkaXRzOiBAWWFmZmxlLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtNjIxOTg3NTUyZTUpKSA9PSAnXCItMDAwMDAxLTAxLTAxVDAwOjAwOjAwLjAwMFpcIicgJiZcbiAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjUgYW5kIE9wZXJhID49IDEwLjUzIGluY29ycmVjdGx5IHNlcmlhbGl6ZSBtaWxsaXNlY29uZFxuICAgICAgICAgICAgICAgIC8vIHZhbHVlcyBsZXNzIHRoYW4gMTAwMC4gQ3JlZGl0czogQFlhZmZsZS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoLTEpKSA9PSAnXCIxOTY5LTEyLTMxVDIzOjU5OjU5Ljk5OVpcIic7XG4gICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgc3RyaW5naWZ5U3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzU3VwcG9ydGVkID0gc3RyaW5naWZ5U3VwcG9ydGVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRlc3QgYEpTT04ucGFyc2VgLlxuICAgICAgICBpZiAobmFtZSA9PSBcImpzb24tcGFyc2VcIikge1xuICAgICAgICAgIHZhciBwYXJzZSA9IGV4cG9ydHMucGFyc2U7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwYXJzZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCBiMiB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhIGJhcmUgbGl0ZXJhbCBpcyBwcm92aWRlZC5cbiAgICAgICAgICAgICAgLy8gQ29uZm9ybWluZyBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIGFsc28gY29lcmNlIHRoZSBpbml0aWFsIGFyZ3VtZW50IHRvXG4gICAgICAgICAgICAgIC8vIGEgc3RyaW5nIHByaW9yIHRvIHBhcnNpbmcuXG4gICAgICAgICAgICAgIGlmIChwYXJzZShcIjBcIikgPT09IDAgJiYgIXBhcnNlKGZhbHNlKSkge1xuICAgICAgICAgICAgICAgIC8vIFNpbXBsZSBwYXJzaW5nIHRlc3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZShzZXJpYWxpemVkKTtcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VTdXBwb3J0ZWQgPSB2YWx1ZVtcImFcIl0ubGVuZ3RoID09IDUgJiYgdmFsdWVbXCJhXCJdWzBdID09PSAxO1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDUuMS4yIGFuZCBGRiAzLjFiMSBhbGxvdyB1bmVzY2FwZWQgdGFicyBpbiBzdHJpbmdzLlxuICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9ICFwYXJzZSgnXCJcXHRcIicpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gRkYgNC4wIGFuZCA0LjAuMSBhbGxvdyBsZWFkaW5nIGArYCBzaWducyBhbmQgbGVhZGluZ1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGRlY2ltYWwgcG9pbnRzLiBGRiA0LjAsIDQuMC4xLCBhbmQgSUUgOS0xMCBhbHNvIGFsbG93XG4gICAgICAgICAgICAgICAgICAgICAgLy8gY2VydGFpbiBvY3RhbCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMDFcIikgIT09IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCwgNC4wLjEsIGFuZCBSaGlubyAxLjdSMy1SNCBhbGxvdyB0cmFpbGluZyBkZWNpbWFsXG4gICAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnRzLiBUaGVzZSBlbnZpcm9ubWVudHMsIGFsb25nIHdpdGggRkYgMy4xYjEgYW5kIDIsXG4gICAgICAgICAgICAgICAgICAgICAgLy8gYWxzbyBhbGxvdyB0cmFpbGluZyBjb21tYXMgaW4gSlNPTiBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjEuXCIpICE9PSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaXNTdXBwb3J0ZWQgPSBwYXJzZVN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc1tuYW1lXSA9ICEhaXNTdXBwb3J0ZWQ7XG4gICAgfVxuXG4gICAgaWYgKCFoYXMoXCJqc29uXCIpKSB7XG4gICAgICAvLyBDb21tb24gYFtbQ2xhc3NdXWAgbmFtZSBhbGlhc2VzLlxuICAgICAgdmFyIGZ1bmN0aW9uQ2xhc3MgPSBcIltvYmplY3QgRnVuY3Rpb25dXCIsXG4gICAgICAgICAgZGF0ZUNsYXNzID0gXCJbb2JqZWN0IERhdGVdXCIsXG4gICAgICAgICAgbnVtYmVyQ2xhc3MgPSBcIltvYmplY3QgTnVtYmVyXVwiLFxuICAgICAgICAgIHN0cmluZ0NsYXNzID0gXCJbb2JqZWN0IFN0cmluZ11cIixcbiAgICAgICAgICBhcnJheUNsYXNzID0gXCJbb2JqZWN0IEFycmF5XVwiLFxuICAgICAgICAgIGJvb2xlYW5DbGFzcyA9IFwiW29iamVjdCBCb29sZWFuXVwiO1xuXG4gICAgICAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG4gICAgICB2YXIgY2hhckluZGV4QnVnZ3kgPSBoYXMoXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIik7XG5cbiAgICAgIC8vIERlZmluZSBhZGRpdGlvbmFsIHV0aWxpdHkgbWV0aG9kcyBpZiB0aGUgYERhdGVgIG1ldGhvZHMgYXJlIGJ1Z2d5LlxuICAgICAgaWYgKCFpc0V4dGVuZGVkKSB7XG4gICAgICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgICAgIC8vIEEgbWFwcGluZyBiZXR3ZWVuIHRoZSBtb250aHMgb2YgdGhlIHllYXIgYW5kIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuXG4gICAgICAgIC8vIEphbnVhcnkgMXN0IGFuZCB0aGUgZmlyc3Qgb2YgdGhlIHJlc3BlY3RpdmUgbW9udGguXG4gICAgICAgIHZhciBNb250aHMgPSBbMCwgMzEsIDU5LCA5MCwgMTIwLCAxNTEsIDE4MSwgMjEyLCAyNDMsIDI3MywgMzA0LCAzMzRdO1xuICAgICAgICAvLyBJbnRlcm5hbDogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlbiB0aGUgVW5peCBlcG9jaCBhbmQgdGhlXG4gICAgICAgIC8vIGZpcnN0IGRheSBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICAgIHZhciBnZXREYXkgPSBmdW5jdGlvbiAoeWVhciwgbW9udGgpIHtcbiAgICAgICAgICByZXR1cm4gTW9udGhzW21vbnRoXSArIDM2NSAqICh5ZWFyIC0gMTk3MCkgKyBmbG9vcigoeWVhciAtIDE5NjkgKyAobW9udGggPSArKG1vbnRoID4gMSkpKSAvIDQpIC0gZmxvb3IoKHllYXIgLSAxOTAxICsgbW9udGgpIC8gMTAwKSArIGZsb29yKCh5ZWFyIC0gMTYwMSArIG1vbnRoKSAvIDQwMCk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEludGVybmFsOiBEZXRlcm1pbmVzIGlmIGEgcHJvcGVydHkgaXMgYSBkaXJlY3QgcHJvcGVydHkgb2YgdGhlIGdpdmVuXG4gICAgICAvLyBvYmplY3QuIERlbGVnYXRlcyB0byB0aGUgbmF0aXZlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIG1ldGhvZC5cbiAgICAgIGlmICghKGlzUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eSkpIHtcbiAgICAgICAgaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sIGNvbnN0cnVjdG9yO1xuICAgICAgICAgIGlmICgobWVtYmVycy5fX3Byb3RvX18gPSBudWxsLCBtZW1iZXJzLl9fcHJvdG9fXyA9IHtcbiAgICAgICAgICAgIC8vIFRoZSAqcHJvdG8qIHByb3BlcnR5IGNhbm5vdCBiZSBzZXQgbXVsdGlwbGUgdGltZXMgaW4gcmVjZW50XG4gICAgICAgICAgICAvLyB2ZXJzaW9ucyBvZiBGaXJlZm94IGFuZCBTZWFNb25rZXkuXG4gICAgICAgICAgICBcInRvU3RyaW5nXCI6IDFcbiAgICAgICAgICB9LCBtZW1iZXJzKS50b1N0cmluZyAhPSBnZXRDbGFzcykge1xuICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDIuMC4zIGRvZXNuJ3QgaW1wbGVtZW50IGBPYmplY3QjaGFzT3duUHJvcGVydHlgLCBidXRcbiAgICAgICAgICAgIC8vIHN1cHBvcnRzIHRoZSBtdXRhYmxlICpwcm90byogcHJvcGVydHkuXG4gICAgICAgICAgICBpc1Byb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgIC8vIENhcHR1cmUgYW5kIGJyZWFrIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4gKHNlZSBzZWN0aW9uIDguNi4yXG4gICAgICAgICAgICAgIC8vIG9mIHRoZSBFUyA1LjEgc3BlYykuIFRoZSBwYXJlbnRoZXNpemVkIGV4cHJlc3Npb24gcHJldmVudHMgYW5cbiAgICAgICAgICAgICAgLy8gdW5zYWZlIHRyYW5zZm9ybWF0aW9uIGJ5IHRoZSBDbG9zdXJlIENvbXBpbGVyLlxuICAgICAgICAgICAgICB2YXIgb3JpZ2luYWwgPSB0aGlzLl9fcHJvdG9fXywgcmVzdWx0ID0gcHJvcGVydHkgaW4gKHRoaXMuX19wcm90b19fID0gbnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICAgICAgdGhpcy5fX3Byb3RvX18gPSBvcmlnaW5hbDtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIENhcHR1cmUgYSByZWZlcmVuY2UgdG8gdGhlIHRvcC1sZXZlbCBgT2JqZWN0YCBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yID0gbWVtYmVycy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSB0byBzaW11bGF0ZSBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpblxuICAgICAgICAgICAgLy8gb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gKHRoaXMuY29uc3RydWN0b3IgfHwgY29uc3RydWN0b3IpLnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRoaXMgJiYgIShwcm9wZXJ0eSBpbiBwYXJlbnQgJiYgdGhpc1twcm9wZXJ0eV0gPT09IHBhcmVudFtwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVtYmVycyA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIGlzUHJvcGVydHkuY2FsbCh0aGlzLCBwcm9wZXJ0eSk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEludGVybmFsOiBOb3JtYWxpemVzIHRoZSBgZm9yLi4uaW5gIGl0ZXJhdGlvbiBhbGdvcml0aG0gYWNyb3NzXG4gICAgICAvLyBlbnZpcm9ubWVudHMuIEVhY2ggZW51bWVyYXRlZCBrZXkgaXMgeWllbGRlZCB0byBhIGBjYWxsYmFja2AgZnVuY3Rpb24uXG4gICAgICBmb3JFYWNoID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNpemUgPSAwLCBQcm9wZXJ0aWVzLCBtZW1iZXJzLCBwcm9wZXJ0eTtcblxuICAgICAgICAvLyBUZXN0cyBmb3IgYnVncyBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudCdzIGBmb3IuLi5pbmAgYWxnb3JpdGhtLiBUaGVcbiAgICAgICAgLy8gYHZhbHVlT2ZgIHByb3BlcnR5IGluaGVyaXRzIHRoZSBub24tZW51bWVyYWJsZSBmbGFnIGZyb21cbiAgICAgICAgLy8gYE9iamVjdC5wcm90b3R5cGVgIGluIG9sZGVyIHZlcnNpb25zIG9mIElFLCBOZXRzY2FwZSwgYW5kIE1vemlsbGEuXG4gICAgICAgIChQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMudmFsdWVPZiA9IDA7XG4gICAgICAgIH0pLnByb3RvdHlwZS52YWx1ZU9mID0gMDtcblxuICAgICAgICAvLyBJdGVyYXRlIG92ZXIgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGBQcm9wZXJ0aWVzYCBjbGFzcy5cbiAgICAgICAgbWVtYmVycyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgICAgIGZvciAocHJvcGVydHkgaW4gbWVtYmVycykge1xuICAgICAgICAgIC8vIElnbm9yZSBhbGwgcHJvcGVydGllcyBpbmhlcml0ZWQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuXG4gICAgICAgICAgaWYgKGlzUHJvcGVydHkuY2FsbChtZW1iZXJzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIHNpemUrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgUHJvcGVydGllcyA9IG1lbWJlcnMgPSBudWxsO1xuXG4gICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgaXRlcmF0aW9uIGFsZ29yaXRobS5cbiAgICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgICAgLy8gQSBsaXN0IG9mIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxuICAgICAgICAgIG1lbWJlcnMgPSBbXCJ2YWx1ZU9mXCIsIFwidG9TdHJpbmdcIiwgXCJ0b0xvY2FsZVN0cmluZ1wiLCBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIFwiaXNQcm90b3R5cGVPZlwiLCBcImhhc093blByb3BlcnR5XCIsIFwiY29uc3RydWN0b3JcIl07XG4gICAgICAgICAgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4gICAgICAgICAgLy8gcHJvcGVydGllcy5cbiAgICAgICAgICBmb3JFYWNoID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBsZW5ndGg7XG4gICAgICAgICAgICB2YXIgaGFzUHJvcGVydHkgPSAhaXNGdW5jdGlvbiAmJiB0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yICE9IFwiZnVuY3Rpb25cIiAmJiBvYmplY3RUeXBlc1t0eXBlb2Ygb2JqZWN0Lmhhc093blByb3BlcnR5XSAmJiBvYmplY3QuaGFzT3duUHJvcGVydHkgfHwgaXNQcm9wZXJ0eTtcbiAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICAgIC8vIEdlY2tvIDw9IDEuMCBlbnVtZXJhdGVzIHRoZSBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgdW5kZXJcbiAgICAgICAgICAgICAgLy8gY2VydGFpbiBjb25kaXRpb25zOyBJRSBkb2VzIG5vdC5cbiAgICAgICAgICAgICAgaWYgKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiBoYXNQcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LlxuICAgICAgICAgICAgZm9yIChsZW5ndGggPSBtZW1iZXJzLmxlbmd0aDsgcHJvcGVydHkgPSBtZW1iZXJzWy0tbGVuZ3RoXTsgaGFzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiBjYWxsYmFjayhwcm9wZXJ0eSkpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoc2l6ZSA9PSAyKSB7XG4gICAgICAgICAgLy8gU2FmYXJpIDw9IDIuMC40IGVudW1lcmF0ZXMgc2hhZG93ZWQgcHJvcGVydGllcyB0d2ljZS5cbiAgICAgICAgICBmb3JFYWNoID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNldCBvZiBpdGVyYXRlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICAgdmFyIG1lbWJlcnMgPSB7fSwgaXNGdW5jdGlvbiA9IGdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLCBwcm9wZXJ0eTtcbiAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICAgIC8vIFN0b3JlIGVhY2ggcHJvcGVydHkgbmFtZSB0byBwcmV2ZW50IGRvdWJsZSBlbnVtZXJhdGlvbi4gVGhlXG4gICAgICAgICAgICAgIC8vIGBwcm90b3R5cGVgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyBpcyBub3QgZW51bWVyYXRlZCBkdWUgdG8gY3Jvc3MtXG4gICAgICAgICAgICAgIC8vIGVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbiAgICAgICAgICAgICAgaWYgKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiAhaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMsIHByb3BlcnR5KSAmJiAobWVtYmVyc1twcm9wZXJ0eV0gPSAxKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG4gICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IGdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLCBwcm9wZXJ0eSwgaXNDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICAgIGlmICghKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpICYmICEoaXNDb25zdHJ1Y3RvciA9IHByb3BlcnR5ID09PSBcImNvbnN0cnVjdG9yXCIpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciB0aGUgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBkdWUgdG9cbiAgICAgICAgICAgIC8vIGNyb3NzLWVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbiAgICAgICAgICAgIGlmIChpc0NvbnN0cnVjdG9yIHx8IGlzUHJvcGVydHkuY2FsbChvYmplY3QsIChwcm9wZXJ0eSA9IFwiY29uc3RydWN0b3JcIikpKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JFYWNoKG9iamVjdCwgY2FsbGJhY2spO1xuICAgICAgfTtcblxuICAgICAgLy8gUHVibGljOiBTZXJpYWxpemVzIGEgSmF2YVNjcmlwdCBgdmFsdWVgIGFzIGEgSlNPTiBzdHJpbmcuIFRoZSBvcHRpb25hbFxuICAgICAgLy8gYGZpbHRlcmAgYXJndW1lbnQgbWF5IHNwZWNpZnkgZWl0aGVyIGEgZnVuY3Rpb24gdGhhdCBhbHRlcnMgaG93IG9iamVjdCBhbmRcbiAgICAgIC8vIGFycmF5IG1lbWJlcnMgYXJlIHNlcmlhbGl6ZWQsIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIG51bWJlcnMgdGhhdFxuICAgICAgLy8gaW5kaWNhdGVzIHdoaWNoIHByb3BlcnRpZXMgc2hvdWxkIGJlIHNlcmlhbGl6ZWQuIFRoZSBvcHRpb25hbCBgd2lkdGhgXG4gICAgICAvLyBhcmd1bWVudCBtYXkgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbiAgICAgIC8vIGxldmVsIG9mIHRoZSBvdXRwdXQuXG4gICAgICBpZiAoIWhhcyhcImpzb24tc3RyaW5naWZ5XCIpKSB7XG4gICAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG4gICAgICAgIHZhciBFc2NhcGVzID0ge1xuICAgICAgICAgIDkyOiBcIlxcXFxcXFxcXCIsXG4gICAgICAgICAgMzQ6ICdcXFxcXCInLFxuICAgICAgICAgIDg6IFwiXFxcXGJcIixcbiAgICAgICAgICAxMjogXCJcXFxcZlwiLFxuICAgICAgICAgIDEwOiBcIlxcXFxuXCIsXG4gICAgICAgICAgMTM6IFwiXFxcXHJcIixcbiAgICAgICAgICA5OiBcIlxcXFx0XCJcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogQ29udmVydHMgYHZhbHVlYCBpbnRvIGEgemVyby1wYWRkZWQgc3RyaW5nIHN1Y2ggdGhhdCBpdHNcbiAgICAgICAgLy8gbGVuZ3RoIGlzIGF0IGxlYXN0IGVxdWFsIHRvIGB3aWR0aGAuIFRoZSBgd2lkdGhgIG11c3QgYmUgPD0gNi5cbiAgICAgICAgdmFyIGxlYWRpbmdaZXJvZXMgPSBcIjAwMDAwMFwiO1xuICAgICAgICB2YXIgdG9QYWRkZWRTdHJpbmcgPSBmdW5jdGlvbiAod2lkdGgsIHZhbHVlKSB7XG4gICAgICAgICAgLy8gVGhlIGB8fCAwYCBleHByZXNzaW9uIGlzIG5lY2Vzc2FyeSB0byB3b3JrIGFyb3VuZCBhIGJ1ZyBpblxuICAgICAgICAgIC8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxuICAgICAgICAgIHJldHVybiAobGVhZGluZ1plcm9lcyArICh2YWx1ZSB8fCAwKSkuc2xpY2UoLXdpZHRoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbiAgICAgICAgLy8gY2hhcmFjdGVycyAoY2hhcmFjdGVycyB3aXRoIGNvZGUgdW5pdCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAzMSkgd2l0aFxuICAgICAgICAvLyB0aGVpciBlc2NhcGVkIGVxdWl2YWxlbnRzLiBUaGlzIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuICAgICAgICAvLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgICB2YXIgdW5pY29kZVByZWZpeCA9IFwiXFxcXHUwMFwiO1xuICAgICAgICB2YXIgcXVvdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gJ1wiJywgaW5kZXggPSAwLCBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsIHVzZUNoYXJJbmRleCA9ICFjaGFySW5kZXhCdWdneSB8fCBsZW5ndGggPiAxMDtcbiAgICAgICAgICB2YXIgc3ltYm9scyA9IHVzZUNoYXJJbmRleCAmJiAoY2hhckluZGV4QnVnZ3kgPyB2YWx1ZS5zcGxpdChcIlwiKSA6IHZhbHVlKTtcbiAgICAgICAgICBmb3IgKDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBjaGFyQ29kZSA9IHZhbHVlLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGNoYXJhY3RlciBpcyBhIGNvbnRyb2wgY2hhcmFjdGVyLCBhcHBlbmQgaXRzIFVuaWNvZGUgb3JcbiAgICAgICAgICAgIC8vIHNob3J0aGFuZCBlc2NhcGUgc2VxdWVuY2U7IG90aGVyd2lzZSwgYXBwZW5kIHRoZSBjaGFyYWN0ZXIgYXMtaXMuXG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgODogY2FzZSA5OiBjYXNlIDEwOiBjYXNlIDEyOiBjYXNlIDEzOiBjYXNlIDM0OiBjYXNlIDkyOlxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBFc2NhcGVzW2NoYXJDb2RlXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPCAzMikge1xuICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHVuaWNvZGVQcmVmaXggKyB0b1BhZGRlZFN0cmluZygyLCBjaGFyQ29kZS50b1N0cmluZygxNikpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB1c2VDaGFySW5kZXggPyBzeW1ib2xzW2luZGV4XSA6IHZhbHVlLmNoYXJBdChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQgKyAnXCInO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEludGVybmFsOiBSZWN1cnNpdmVseSBzZXJpYWxpemVzIGFuIG9iamVjdC4gSW1wbGVtZW50cyB0aGVcbiAgICAgICAgLy8gYFN0cihrZXksIGhvbGRlcilgLCBgSk8odmFsdWUpYCwgYW5kIGBKQSh2YWx1ZSlgIG9wZXJhdGlvbnMuXG4gICAgICAgIHZhciBzZXJpYWxpemUgPSBmdW5jdGlvbiAocHJvcGVydHksIG9iamVjdCwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjaykge1xuICAgICAgICAgIHZhciB2YWx1ZSwgY2xhc3NOYW1lLCB5ZWFyLCBtb250aCwgZGF0ZSwgdGltZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcywgcmVzdWx0cywgZWxlbWVudCwgaW5kZXgsIGxlbmd0aCwgcHJlZml4LCByZXN1bHQ7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5lY2Vzc2FyeSBmb3IgaG9zdCBvYmplY3Qgc3VwcG9ydC5cbiAgICAgICAgICAgIHZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUgPT0gZGF0ZUNsYXNzICYmICFpc1Byb3BlcnR5LmNhbGwodmFsdWUsIFwidG9KU09OXCIpKSB7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA+IC0xIC8gMCAmJiB2YWx1ZSA8IDEgLyAwKSB7XG4gICAgICAgICAgICAgICAgLy8gRGF0ZXMgYXJlIHNlcmlhbGl6ZWQgYWNjb3JkaW5nIHRvIHRoZSBgRGF0ZSN0b0pTT05gIG1ldGhvZFxuICAgICAgICAgICAgICAgIC8vIHNwZWNpZmllZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS45LjUuNDQuIFNlZSBzZWN0aW9uIDE1LjkuMS4xNVxuICAgICAgICAgICAgICAgIC8vIGZvciB0aGUgSVNPIDg2MDEgZGF0ZSB0aW1lIHN0cmluZyBmb3JtYXQuXG4gICAgICAgICAgICAgICAgaWYgKGdldERheSkge1xuICAgICAgICAgICAgICAgICAgLy8gTWFudWFsbHkgY29tcHV0ZSB0aGUgeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLFxuICAgICAgICAgICAgICAgICAgLy8gc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBpZiB0aGUgYGdldFVUQypgIG1ldGhvZHMgYXJlXG4gICAgICAgICAgICAgICAgICAvLyBidWdneS4gQWRhcHRlZCBmcm9tIEBZYWZmbGUncyBgZGF0ZS1zaGltYCBwcm9qZWN0LlxuICAgICAgICAgICAgICAgICAgZGF0ZSA9IGZsb29yKHZhbHVlIC8gODY0ZTUpO1xuICAgICAgICAgICAgICAgICAgZm9yICh5ZWFyID0gZmxvb3IoZGF0ZSAvIDM2NS4yNDI1KSArIDE5NzAgLSAxOyBnZXREYXkoeWVhciArIDEsIDApIDw9IGRhdGU7IHllYXIrKyk7XG4gICAgICAgICAgICAgICAgICBmb3IgKG1vbnRoID0gZmxvb3IoKGRhdGUgLSBnZXREYXkoeWVhciwgMCkpIC8gMzAuNDIpOyBnZXREYXkoeWVhciwgbW9udGggKyAxKSA8PSBkYXRlOyBtb250aCsrKTtcbiAgICAgICAgICAgICAgICAgIGRhdGUgPSAxICsgZGF0ZSAtIGdldERheSh5ZWFyLCBtb250aCk7XG4gICAgICAgICAgICAgICAgICAvLyBUaGUgYHRpbWVgIHZhbHVlIHNwZWNpZmllcyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheSAoc2VlIEVTXG4gICAgICAgICAgICAgICAgICAvLyA1LjEgc2VjdGlvbiAxNS45LjEuMikuIFRoZSBmb3JtdWxhIGAoQSAlIEIgKyBCKSAlIEJgIGlzIHVzZWRcbiAgICAgICAgICAgICAgICAgIC8vIHRvIGNvbXB1dGUgYEEgbW9kdWxvIEJgLCBhcyB0aGUgYCVgIG9wZXJhdG9yIGRvZXMgbm90XG4gICAgICAgICAgICAgICAgICAvLyBjb3JyZXNwb25kIHRvIHRoZSBgbW9kdWxvYCBvcGVyYXRpb24gZm9yIG5lZ2F0aXZlIG51bWJlcnMuXG4gICAgICAgICAgICAgICAgICB0aW1lID0gKHZhbHVlICUgODY0ZTUgKyA4NjRlNSkgJSA4NjRlNTtcbiAgICAgICAgICAgICAgICAgIC8vIFRoZSBob3VycywgbWludXRlcywgc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBhcmUgb2J0YWluZWQgYnlcbiAgICAgICAgICAgICAgICAgIC8vIGRlY29tcG9zaW5nIHRoZSB0aW1lIHdpdGhpbiB0aGUgZGF5LiBTZWUgc2VjdGlvbiAxNS45LjEuMTAuXG4gICAgICAgICAgICAgICAgICBob3VycyA9IGZsb29yKHRpbWUgLyAzNmU1KSAlIDI0O1xuICAgICAgICAgICAgICAgICAgbWludXRlcyA9IGZsb29yKHRpbWUgLyA2ZTQpICUgNjA7XG4gICAgICAgICAgICAgICAgICBzZWNvbmRzID0gZmxvb3IodGltZSAvIDFlMykgJSA2MDtcbiAgICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHRpbWUgJSAxZTM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHllYXIgPSB2YWx1ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgbW9udGggPSB2YWx1ZS5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgICAgICAgZGF0ZSA9IHZhbHVlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgICAgICAgIGhvdXJzID0gdmFsdWUuZ2V0VVRDSG91cnMoKTtcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSB2YWx1ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgICAgICAgICAgICAgICBzZWNvbmRzID0gdmFsdWUuZ2V0VVRDU2Vjb25kcygpO1xuICAgICAgICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gdmFsdWUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycyBjb3JyZWN0bHkuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAoeWVhciA8PSAwIHx8IHllYXIgPj0gMWU0ID8gKHllYXIgPCAwID8gXCItXCIgOiBcIitcIikgKyB0b1BhZGRlZFN0cmluZyg2LCB5ZWFyIDwgMCA/IC15ZWFyIDogeWVhcikgOiB0b1BhZGRlZFN0cmluZyg0LCB5ZWFyKSkgK1xuICAgICAgICAgICAgICAgICAgXCItXCIgKyB0b1BhZGRlZFN0cmluZygyLCBtb250aCArIDEpICsgXCItXCIgKyB0b1BhZGRlZFN0cmluZygyLCBkYXRlKSArXG4gICAgICAgICAgICAgICAgICAvLyBNb250aHMsIGRhdGVzLCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgc2hvdWxkIGhhdmUgdHdvXG4gICAgICAgICAgICAgICAgICAvLyBkaWdpdHM7IG1pbGxpc2Vjb25kcyBzaG91bGQgaGF2ZSB0aHJlZS5cbiAgICAgICAgICAgICAgICAgIFwiVFwiICsgdG9QYWRkZWRTdHJpbmcoMiwgaG91cnMpICsgXCI6XCIgKyB0b1BhZGRlZFN0cmluZygyLCBtaW51dGVzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMiwgc2Vjb25kcykgK1xuICAgICAgICAgICAgICAgICAgLy8gTWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LjAsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgICAgICBcIi5cIiArIHRvUGFkZGVkU3RyaW5nKDMsIG1pbGxpc2Vjb25kcykgKyBcIlpcIjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PSBcImZ1bmN0aW9uXCIgJiYgKChjbGFzc05hbWUgIT0gbnVtYmVyQ2xhc3MgJiYgY2xhc3NOYW1lICE9IHN0cmluZ0NsYXNzICYmIGNsYXNzTmFtZSAhPSBhcnJheUNsYXNzKSB8fCBpc1Byb3BlcnR5LmNhbGwodmFsdWUsIFwidG9KU09OXCIpKSkge1xuICAgICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgYWRkcyBub24tc3RhbmRhcmQgYHRvSlNPTmAgbWV0aG9kcyB0byB0aGVcbiAgICAgICAgICAgICAgLy8gYE51bWJlcmAsIGBTdHJpbmdgLCBgRGF0ZWAsIGFuZCBgQXJyYXlgIHByb3RvdHlwZXMuIEpTT04gM1xuICAgICAgICAgICAgICAvLyBpZ25vcmVzIGFsbCBgdG9KU09OYCBtZXRob2RzIG9uIHRoZXNlIG9iamVjdHMgdW5sZXNzIHRoZXkgYXJlXG4gICAgICAgICAgICAgIC8vIGRlZmluZWQgZGlyZWN0bHkgb24gYW4gaW5zdGFuY2UuXG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKHByb3BlcnR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBJZiBhIHJlcGxhY2VtZW50IGZ1bmN0aW9uIHdhcyBwcm92aWRlZCwgY2FsbCBpdCB0byBvYnRhaW4gdGhlIHZhbHVlXG4gICAgICAgICAgICAvLyBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGJvb2xlYW5DbGFzcykge1xuICAgICAgICAgICAgLy8gQm9vbGVhbnMgYXJlIHJlcHJlc2VudGVkIGxpdGVyYWxseS5cbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpIHtcbiAgICAgICAgICAgIC8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gYEluZmluaXR5YCBhbmQgYE5hTmAgYXJlIHNlcmlhbGl6ZWQgYXNcbiAgICAgICAgICAgIC8vIGBcIm51bGxcImAuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCA/IFwiXCIgKyB2YWx1ZSA6IFwibnVsbFwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzKSB7XG4gICAgICAgICAgICAvLyBTdHJpbmdzIGFyZSBkb3VibGUtcXVvdGVkIGFuZCBlc2NhcGVkLlxuICAgICAgICAgICAgcmV0dXJuIHF1b3RlKFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoaXMgaXMgYSBsaW5lYXIgc2VhcmNoOyBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgLy8gaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mIHVuaXF1ZSBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICAgIGZvciAobGVuZ3RoID0gc3RhY2subGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgaWYgKHN0YWNrW2xlbmd0aF0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3ljbGljIHN0cnVjdHVyZXMgY2Fubm90IGJlIHNlcmlhbGl6ZWQgYnkgYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWRkIHRoZSBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgICAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IGluZGVudGF0aW9uIGxldmVsIGFuZCBpbmRlbnQgb25lIGFkZGl0aW9uYWwgbGV2ZWwuXG4gICAgICAgICAgICBwcmVmaXggPSBpbmRlbnRhdGlvbjtcbiAgICAgICAgICAgIGluZGVudGF0aW9uICs9IHdoaXRlc3BhY2U7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIGFycmF5IGVsZW1lbnRzLlxuICAgICAgICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBzZXJpYWxpemUoaW5kZXgsIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZWxlbWVudCA9PT0gdW5kZWYgPyBcIm51bGxcIiA6IGVsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoID8gKHdoaXRlc3BhY2UgPyBcIltcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwiXVwiIDogKFwiW1wiICsgcmVzdWx0cy5qb2luKFwiLFwiKSArIFwiXVwiKSkgOiBcIltdXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgb2JqZWN0IG1lbWJlcnMuIE1lbWJlcnMgYXJlIHNlbGVjdGVkIGZyb21cbiAgICAgICAgICAgICAgLy8gZWl0aGVyIGEgdXNlci1zcGVjaWZpZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcywgb3IgdGhlIG9iamVjdFxuICAgICAgICAgICAgICAvLyBpdHNlbGYuXG4gICAgICAgICAgICAgIGZvckVhY2gocHJvcGVydGllcyB8fCB2YWx1ZSwgZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBzZXJpYWxpemUocHJvcGVydHksIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWYpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEFjY29yZGluZyB0byBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zOiBcIklmIGBnYXBgIHt3aGl0ZXNwYWNlfVxuICAgICAgICAgICAgICAgICAgLy8gaXMgbm90IHRoZSBlbXB0eSBzdHJpbmcsIGxldCBgbWVtYmVyYCB7cXVvdGUocHJvcGVydHkpICsgXCI6XCJ9XG4gICAgICAgICAgICAgICAgICAvLyBiZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBgbWVtYmVyYCBhbmQgdGhlIGBzcGFjZWAgY2hhcmFjdGVyLlwiXG4gICAgICAgICAgICAgICAgICAvLyBUaGUgXCJgc3BhY2VgIGNoYXJhY3RlclwiIHJlZmVycyB0byB0aGUgbGl0ZXJhbCBzcGFjZVxuICAgICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyLCBub3QgdGhlIGBzcGFjZWAge3dpZHRofSBhcmd1bWVudCBwcm92aWRlZCB0b1xuICAgICAgICAgICAgICAgICAgLy8gYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChxdW90ZShwcm9wZXJ0eSkgKyBcIjpcIiArICh3aGl0ZXNwYWNlID8gXCIgXCIgOiBcIlwiKSArIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoID8gKHdoaXRlc3BhY2UgPyBcIntcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwifVwiIDogKFwie1wiICsgcmVzdWx0cy5qb2luKFwiLFwiKSArIFwifVwiKSkgOiBcInt9XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIG9iamVjdCBmcm9tIHRoZSB0cmF2ZXJzZWQgb2JqZWN0IHN0YWNrLlxuICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBQdWJsaWM6IGBKU09OLnN0cmluZ2lmeWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgICBleHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChzb3VyY2UsIGZpbHRlciwgd2lkdGgpIHtcbiAgICAgICAgICB2YXIgd2hpdGVzcGFjZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIGNsYXNzTmFtZTtcbiAgICAgICAgICBpZiAob2JqZWN0VHlwZXNbdHlwZW9mIGZpbHRlcl0gJiYgZmlsdGVyKSB7XG4gICAgICAgICAgICBpZiAoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwoZmlsdGVyKSkgPT0gZnVuY3Rpb25DbGFzcykge1xuICAgICAgICAgICAgICBjYWxsYmFjayA9IGZpbHRlcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgcHJvcGVydHkgbmFtZXMgYXJyYXkgaW50byBhIG1ha2VzaGlmdCBzZXQuXG4gICAgICAgICAgICAgIHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBmaWx0ZXIubGVuZ3RoLCB2YWx1ZTsgaW5kZXggPCBsZW5ndGg7IHZhbHVlID0gZmlsdGVyW2luZGV4KytdLCAoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpKSwgY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzIHx8IGNsYXNzTmFtZSA9PSBudW1iZXJDbGFzcykgJiYgKHByb3BlcnRpZXNbdmFsdWVdID0gMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgICAgIGlmICgoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh3aWR0aCkpID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIGB3aWR0aGAgdG8gYW4gaW50ZWdlciBhbmQgY3JlYXRlIGEgc3RyaW5nIGNvbnRhaW5pbmdcbiAgICAgICAgICAgICAgLy8gYHdpZHRoYCBudW1iZXIgb2Ygc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgaWYgKCh3aWR0aCAtPSB3aWR0aCAlIDEpID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAod2hpdGVzcGFjZSA9IFwiXCIsIHdpZHRoID4gMTAgJiYgKHdpZHRoID0gMTApOyB3aGl0ZXNwYWNlLmxlbmd0aCA8IHdpZHRoOyB3aGl0ZXNwYWNlICs9IFwiIFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MpIHtcbiAgICAgICAgICAgICAgd2hpdGVzcGFjZSA9IHdpZHRoLmxlbmd0aCA8PSAxMCA/IHdpZHRoIDogd2lkdGguc2xpY2UoMCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBPcGVyYSA8PSA3LjU0dTIgZGlzY2FyZHMgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggZW1wdHkgc3RyaW5nIGtleXNcbiAgICAgICAgICAvLyAoYFwiXCJgKSBvbmx5IGlmIHRoZXkgYXJlIHVzZWQgZGlyZWN0bHkgd2l0aGluIGFuIG9iamVjdCBtZW1iZXIgbGlzdFxuICAgICAgICAgIC8vIChlLmcuLCBgIShcIlwiIGluIHsgXCJcIjogMX0pYCkuXG4gICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZShcIlwiLCAodmFsdWUgPSB7fSwgdmFsdWVbXCJcIl0gPSBzb3VyY2UsIHZhbHVlKSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIFwiXCIsIFtdKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gUHVibGljOiBQYXJzZXMgYSBKU09OIHNvdXJjZSBzdHJpbmcuXG4gICAgICBpZiAoIWhhcyhcImpzb24tcGFyc2VcIikpIHtcbiAgICAgICAgdmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IEEgbWFwIG9mIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciB1bmVzY2FwZWRcbiAgICAgICAgLy8gZXF1aXZhbGVudHMuXG4gICAgICAgIHZhciBVbmVzY2FwZXMgPSB7XG4gICAgICAgICAgOTI6IFwiXFxcXFwiLFxuICAgICAgICAgIDM0OiAnXCInLFxuICAgICAgICAgIDQ3OiBcIi9cIixcbiAgICAgICAgICA5ODogXCJcXGJcIixcbiAgICAgICAgICAxMTY6IFwiXFx0XCIsXG4gICAgICAgICAgMTEwOiBcIlxcblwiLFxuICAgICAgICAgIDEwMjogXCJcXGZcIixcbiAgICAgICAgICAxMTQ6IFwiXFxyXCJcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogU3RvcmVzIHRoZSBwYXJzZXIgc3RhdGUuXG4gICAgICAgIHZhciBJbmRleCwgU291cmNlO1xuXG4gICAgICAgIC8vIEludGVybmFsOiBSZXNldHMgdGhlIHBhcnNlciBzdGF0ZSBhbmQgdGhyb3dzIGEgYFN5bnRheEVycm9yYC5cbiAgICAgICAgdmFyIGFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIEluZGV4ID0gU291cmNlID0gbnVsbDtcbiAgICAgICAgICB0aHJvdyBTeW50YXhFcnJvcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEludGVybmFsOiBSZXR1cm5zIHRoZSBuZXh0IHRva2VuLCBvciBgXCIkXCJgIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWRcbiAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgc291cmNlIHN0cmluZy4gQSB0b2tlbiBtYXkgYmUgYSBzdHJpbmcsIG51bWJlciwgYG51bGxgXG4gICAgICAgIC8vIGxpdGVyYWwsIG9yIEJvb2xlYW4gbGl0ZXJhbC5cbiAgICAgICAgdmFyIGxleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgc291cmNlID0gU291cmNlLCBsZW5ndGggPSBzb3VyY2UubGVuZ3RoLCB2YWx1ZSwgYmVnaW4sIHBvc2l0aW9uLCBpc1NpZ25lZCwgY2hhckNvZGU7XG4gICAgICAgICAgd2hpbGUgKEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSA5OiBjYXNlIDEwOiBjYXNlIDEzOiBjYXNlIDMyOlxuICAgICAgICAgICAgICAgIC8vIFNraXAgd2hpdGVzcGFjZSB0b2tlbnMsIGluY2x1ZGluZyB0YWJzLCBjYXJyaWFnZSByZXR1cm5zLCBsaW5lXG4gICAgICAgICAgICAgICAgLy8gZmVlZHMsIGFuZCBzcGFjZSBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMTIzOiBjYXNlIDEyNTogY2FzZSA5MTogY2FzZSA5MzogY2FzZSA1ODogY2FzZSA0NDpcbiAgICAgICAgICAgICAgICAvLyBQYXJzZSBhIHB1bmN0dWF0b3IgdG9rZW4gKGB7YCwgYH1gLCBgW2AsIGBdYCwgYDpgLCBvciBgLGApIGF0XG4gICAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjaGFySW5kZXhCdWdneSA/IHNvdXJjZS5jaGFyQXQoSW5kZXgpIDogc291cmNlW0luZGV4XTtcbiAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgICAgICAvLyBgXCJgIGRlbGltaXRzIGEgSlNPTiBzdHJpbmc7IGFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZFxuICAgICAgICAgICAgICAgIC8vIGJlZ2luIHBhcnNpbmcgdGhlIHN0cmluZy4gU3RyaW5nIHRva2VucyBhcmUgcHJlZml4ZWQgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAvLyBzZW50aW5lbCBgQGAgY2hhcmFjdGVyIHRvIGRpc3Rpbmd1aXNoIHRoZW0gZnJvbSBwdW5jdHVhdG9ycyBhbmRcbiAgICAgICAgICAgICAgICAvLyBlbmQtb2Ytc3RyaW5nIHRva2Vucy5cbiAgICAgICAgICAgICAgICBmb3IgKHZhbHVlID0gXCJAXCIsIEluZGV4Kys7IEluZGV4IDwgbGVuZ3RoOykge1xuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPCAzMikge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbmVzY2FwZWQgQVNDSUkgY29udHJvbCBjaGFyYWN0ZXJzICh0aG9zZSB3aXRoIGEgY29kZSB1bml0XG4gICAgICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhhbiB0aGUgc3BhY2UgY2hhcmFjdGVyKSBhcmUgbm90IHBlcm1pdHRlZC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPT0gOTIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSByZXZlcnNlIHNvbGlkdXMgKGBcXGApIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYW4gZXNjYXBlZFxuICAgICAgICAgICAgICAgICAgICAvLyBjb250cm9sIGNoYXJhY3RlciAoaW5jbHVkaW5nIGBcImAsIGBcXGAsIGFuZCBgL2ApIG9yIFVuaWNvZGVcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSA5MjogY2FzZSAzNDogY2FzZSA0NzogY2FzZSA5ODogY2FzZSAxMTY6IGNhc2UgMTEwOiBjYXNlIDEwMjogY2FzZSAxMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXZpdmUgZXNjYXBlZCBjb250cm9sIGNoYXJhY3RlcnMuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBVbmVzY2FwZXNbY2hhckNvZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYFxcdWAgbWFya3MgdGhlIGJlZ2lubmluZyBvZiBhIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIGFuZCB2YWxpZGF0ZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvdXItZGlnaXQgY29kZSBwb2ludC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gKytJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAocG9zaXRpb24gPSBJbmRleCArIDQ7IEluZGV4IDwgcG9zaXRpb247IEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgdmFsaWQgc2VxdWVuY2UgY29tcHJpc2VzIGZvdXIgaGV4ZGlnaXRzIChjYXNlLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnNlbnNpdGl2ZSkgdGhhdCBmb3JtIGEgc2luZ2xlIGhleGFkZWNpbWFsIHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NyB8fCBjaGFyQ29kZSA+PSA5NyAmJiBjaGFyQ29kZSA8PSAxMDIgfHwgY2hhckNvZGUgPj0gNjUgJiYgY2hhckNvZGUgPD0gNzApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXZpdmUgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gZnJvbUNoYXJDb2RlKFwiMHhcIiArIHNvdXJjZS5zbGljZShiZWdpbiwgSW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSAzNCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIEFuIHVuZXNjYXBlZCBkb3VibGUtcXVvdGUgY2hhcmFjdGVyIG1hcmtzIHRoZSBlbmQgb2YgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAvLyBPcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiBjYXNlIHdoZXJlIGEgc3RyaW5nIGlzIHZhbGlkLlxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2hhckNvZGUgPj0gMzIgJiYgY2hhckNvZGUgIT0gOTIgJiYgY2hhckNvZGUgIT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgc3RyaW5nIGFzLWlzLlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSAzNCkge1xuICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kIHJldHVybiB0aGUgcmV2aXZlZCBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVbnRlcm1pbmF0ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgbnVtYmVycyBhbmQgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIHBhc3QgdGhlIG5lZ2F0aXZlIHNpZ24sIGlmIG9uZSBpcyBzcGVjaWZpZWQuXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQ1KSB7XG4gICAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBQYXJzZSBhbiBpbnRlZ2VyIG9yIGZsb2F0aW5nLXBvaW50IHZhbHVlLlxuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nykge1xuICAgICAgICAgICAgICAgICAgLy8gTGVhZGluZyB6ZXJvZXMgYXJlIGludGVycHJldGVkIGFzIG9jdGFsIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQ4ICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCArIDEpKSwgY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgb2N0YWwgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlzU2lnbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgaW50ZWdlciBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICBmb3IgKDsgSW5kZXggPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgSW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAvLyBGbG9hdHMgY2Fubm90IGNvbnRhaW4gYSBsZWFkaW5nIGRlY2ltYWwgcG9pbnQ7IGhvd2V2ZXIsIHRoaXNcbiAgICAgICAgICAgICAgICAgIC8vIGNhc2UgaXMgYWxyZWFkeSBhY2NvdW50ZWQgZm9yIGJ5IHRoZSBwYXJzZXIuXG4gICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDQ2KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gKytJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGRlY2ltYWwgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgcG9zaXRpb24gPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgcG9zaXRpb24rKyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PSBJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgdHJhaWxpbmcgZGVjaW1hbC5cbiAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyBQYXJzZSBleHBvbmVudHMuIFRoZSBgZWAgZGVub3RpbmcgdGhlIGV4cG9uZW50IGlzXG4gICAgICAgICAgICAgICAgICAvLyBjYXNlLWluc2Vuc2l0aXZlLlxuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMTAxIHx8IGNoYXJDb2RlID09IDY5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNraXAgcGFzdCB0aGUgc2lnbiBmb2xsb3dpbmcgdGhlIGV4cG9uZW50LCBpZiBvbmUgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lmaWVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gNDMgfHwgY2hhckNvZGUgPT0gNDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBleHBvbmVudGlhbCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGZvciAocG9zaXRpb24gPSBJbmRleDsgcG9zaXRpb24gPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgcG9zaXRpb24rKyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PSBJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgZW1wdHkgZXhwb25lbnQuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBJbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gQ29lcmNlIHRoZSBwYXJzZWQgdmFsdWUgdG8gYSBKYXZhU2NyaXB0IG51bWJlci5cbiAgICAgICAgICAgICAgICAgIHJldHVybiArc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEEgbmVnYXRpdmUgc2lnbiBtYXkgb25seSBwcmVjZWRlIG51bWJlcnMuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2lnbmVkKSB7XG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBgdHJ1ZWAsIGBmYWxzZWAsIGFuZCBgbnVsbGAgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgSW5kZXggKz0gNDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlLnNsaWNlKEluZGV4LCBJbmRleCArIDUpID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgICAgSW5kZXggKz0gNTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgICAgICAgSW5kZXggKz0gNDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVbnJlY29nbml6ZWQgdG9rZW4uXG4gICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmV0dXJuIHRoZSBzZW50aW5lbCBgJGAgY2hhcmFjdGVyIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWQgdGhlIGVuZFxuICAgICAgICAgIC8vIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLlxuICAgICAgICAgIHJldHVybiBcIiRcIjtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUGFyc2VzIGEgSlNPTiBgdmFsdWVgIHRva2VuLlxuICAgICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdHMsIGhhc01lbWJlcnM7XG4gICAgICAgICAgaWYgKHZhbHVlID09IFwiJFwiKSB7XG4gICAgICAgICAgICAvLyBVbmV4cGVjdGVkIGVuZCBvZiBpbnB1dC5cbiAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKChjaGFySW5kZXhCdWdneSA/IHZhbHVlLmNoYXJBdCgwKSA6IHZhbHVlWzBdKSA9PSBcIkBcIikge1xuICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNlbnRpbmVsIGBAYCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFBhcnNlIG9iamVjdCBhbmQgYXJyYXkgbGl0ZXJhbHMuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJbXCIpIHtcbiAgICAgICAgICAgICAgLy8gUGFyc2VzIGEgSlNPTiBhcnJheSwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgYXJyYXkuXG4gICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgZm9yICg7OyBoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGxleCgpO1xuICAgICAgICAgICAgICAgIC8vIEEgY2xvc2luZyBzcXVhcmUgYnJhY2tldCBtYXJrcyB0aGUgZW5kIG9mIHRoZSBhcnJheSBsaXRlcmFsLlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBhcnJheSBsaXRlcmFsIGNvbnRhaW5zIGVsZW1lbnRzLCB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRpbmcgdGhlIHByZXZpb3VzIGVsZW1lbnQgZnJvbSB0aGVcbiAgICAgICAgICAgICAgICAvLyBuZXh0LlxuICAgICAgICAgICAgICAgIGlmIChoYXNNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiXVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVW5leHBlY3RlZCB0cmFpbGluZyBgLGAgaW4gYXJyYXkgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggYXJyYXkgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRWxpc2lvbnMgYW5kIGxlYWRpbmcgY29tbWFzIGFyZSBub3QgcGVybWl0dGVkLlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGdldCh2YWx1ZSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBcIntcIikge1xuICAgICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIG9iamVjdCwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICAgICAgICAgICByZXN1bHRzID0ge307XG4gICAgICAgICAgICAgIGZvciAoOzsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAvLyBBIGNsb3NpbmcgY3VybHkgYnJhY2UgbWFya3MgdGhlIGVuZCBvZiB0aGUgb2JqZWN0IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIG9iamVjdCBsaXRlcmFsIGNvbnRhaW5zIG1lbWJlcnMsIHRoZSBjdXJyZW50IHRva2VuXG4gICAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdG9yLlxuICAgICAgICAgICAgICAgIGlmIChoYXNNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVW5leHBlY3RlZCB0cmFpbGluZyBgLGAgaW4gb2JqZWN0IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIG9iamVjdCBtZW1iZXIuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIExlYWRpbmcgY29tbWFzIGFyZSBub3QgcGVybWl0dGVkLCBvYmplY3QgcHJvcGVydHkgbmFtZXMgbXVzdCBiZVxuICAgICAgICAgICAgICAgIC8vIGRvdWJsZS1xdW90ZWQgc3RyaW5ncywgYW5kIGEgYDpgIG11c3Qgc2VwYXJhdGUgZWFjaCBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgIC8vIG5hbWUgYW5kIHZhbHVlLlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIiB8fCB0eXBlb2YgdmFsdWUgIT0gXCJzdHJpbmdcIiB8fCAoY2hhckluZGV4QnVnZ3kgPyB2YWx1ZS5jaGFyQXQoMCkgOiB2YWx1ZVswXSkgIT0gXCJAXCIgfHwgbGV4KCkgIT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdHNbdmFsdWUuc2xpY2UoMSldID0gZ2V0KGxleCgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdG9rZW4gZW5jb3VudGVyZWQuXG4gICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IFVwZGF0ZXMgYSB0cmF2ZXJzZWQgb2JqZWN0IG1lbWJlci5cbiAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIChzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBlbGVtZW50ID0gd2Fsayhzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjayk7XG4gICAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmKSB7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlW3Byb3BlcnR5XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEludGVybmFsOiBSZWN1cnNpdmVseSB0cmF2ZXJzZXMgYSBwYXJzZWQgSlNPTiBvYmplY3QsIGludm9raW5nIHRoZVxuICAgICAgICAvLyBgY2FsbGJhY2tgIGZ1bmN0aW9uIGZvciBlYWNoIHZhbHVlLiBUaGlzIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuICAgICAgICAvLyBgV2Fsayhob2xkZXIsIG5hbWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgICB2YXIgd2FsayA9IGZ1bmN0aW9uIChzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtwcm9wZXJ0eV0sIGxlbmd0aDtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIGBmb3JFYWNoYCBjYW4ndCBiZSB1c2VkIHRvIHRyYXZlcnNlIGFuIGFycmF5IGluIE9wZXJhIDw9IDguNTRcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgaXRzIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGltcGxlbWVudGF0aW9uIHJldHVybnMgYGZhbHNlYFxuICAgICAgICAgICAgLy8gZm9yIGFycmF5IGluZGljZXMgKGUuZy4sIGAhWzEsIDIsIDNdLmhhc093blByb3BlcnR5KFwiMFwiKWApLlxuICAgICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwodmFsdWUpID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgICAgZm9yIChsZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGxlbmd0aC0tOykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZSh2YWx1ZSwgbGVuZ3RoLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZSh2YWx1ZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHNvdXJjZSwgcHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBQdWJsaWM6IGBKU09OLnBhcnNlYC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG4gICAgICAgIGV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciByZXN1bHQsIHZhbHVlO1xuICAgICAgICAgIEluZGV4ID0gMDtcbiAgICAgICAgICBTb3VyY2UgPSBcIlwiICsgc291cmNlO1xuICAgICAgICAgIHJlc3VsdCA9IGdldChsZXgoKSk7XG4gICAgICAgICAgLy8gSWYgYSBKU09OIHN0cmluZyBjb250YWlucyBtdWx0aXBsZSB0b2tlbnMsIGl0IGlzIGludmFsaWQuXG4gICAgICAgICAgaWYgKGxleCgpICE9IFwiJFwiKSB7XG4gICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZXNldCB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgICAgIEluZGV4ID0gU291cmNlID0gbnVsbDtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgJiYgZ2V0Q2xhc3MuY2FsbChjYWxsYmFjaykgPT0gZnVuY3Rpb25DbGFzcyA/IHdhbGsoKHZhbHVlID0ge30sIHZhbHVlW1wiXCJdID0gcmVzdWx0LCB2YWx1ZSksIFwiXCIsIGNhbGxiYWNrKSA6IHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnRzW1wicnVuSW5Db250ZXh0XCJdID0gcnVuSW5Db250ZXh0O1xuICAgIHJldHVybiBleHBvcnRzO1xuICB9XG5cbiAgaWYgKGZyZWVFeHBvcnRzICYmICFpc0xvYWRlcikge1xuICAgIC8vIEV4cG9ydCBmb3IgQ29tbW9uSlMgZW52aXJvbm1lbnRzLlxuICAgIHJ1bkluQ29udGV4dChyb290LCBmcmVlRXhwb3J0cyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRXhwb3J0IGZvciB3ZWIgYnJvd3NlcnMgYW5kIEphdmFTY3JpcHQgZW5naW5lcy5cbiAgICB2YXIgbmF0aXZlSlNPTiA9IHJvb3QuSlNPTixcbiAgICAgICAgcHJldmlvdXNKU09OID0gcm9vdFtcIkpTT04zXCJdLFxuICAgICAgICBpc1Jlc3RvcmVkID0gZmFsc2U7XG5cbiAgICB2YXIgSlNPTjMgPSBydW5JbkNvbnRleHQocm9vdCwgKHJvb3RbXCJKU09OM1wiXSA9IHtcbiAgICAgIC8vIFB1YmxpYzogUmVzdG9yZXMgdGhlIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSBnbG9iYWwgYEpTT05gIG9iamVjdCBhbmRcbiAgICAgIC8vIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIGBKU09OM2Agb2JqZWN0LlxuICAgICAgXCJub0NvbmZsaWN0XCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpc1Jlc3RvcmVkKSB7XG4gICAgICAgICAgaXNSZXN0b3JlZCA9IHRydWU7XG4gICAgICAgICAgcm9vdC5KU09OID0gbmF0aXZlSlNPTjtcbiAgICAgICAgICByb290W1wiSlNPTjNcIl0gPSBwcmV2aW91c0pTT047XG4gICAgICAgICAgbmF0aXZlSlNPTiA9IHByZXZpb3VzSlNPTiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04zO1xuICAgICAgfVxuICAgIH0pKTtcblxuICAgIHJvb3QuSlNPTiA9IHtcbiAgICAgIFwicGFyc2VcIjogSlNPTjMucGFyc2UsXG4gICAgICBcInN0cmluZ2lmeVwiOiBKU09OMy5zdHJpbmdpZnlcbiAgICB9O1xuICB9XG5cbiAgLy8gRXhwb3J0IGZvciBhc3luY2hyb25vdXMgbW9kdWxlIGxvYWRlcnMuXG4gIGlmIChpc0xvYWRlcikge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gSlNPTjM7XG4gICAgfSk7XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuXG59LHt9XSw1OTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIERlY29kZSBhIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBkZWNvZGVkIHN0cmluZy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcbiAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpbnB1dC5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG59XG5cbi8qKlxuICogU2ltcGxlIHF1ZXJ5IHN0cmluZyBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSBzdHJpbmcgdGhhdCBuZWVkcyB0byBiZSBwYXJzZWQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmcocXVlcnkpIHtcbiAgdmFyIHBhcnNlciA9IC8oW149PyZdKyk9PyhbXiZdKikvZ1xuICAgICwgcmVzdWx0ID0ge31cbiAgICAsIHBhcnQ7XG5cbiAgd2hpbGUgKHBhcnQgPSBwYXJzZXIuZXhlYyhxdWVyeSkpIHtcbiAgICB2YXIga2V5ID0gZGVjb2RlKHBhcnRbMV0pXG4gICAgICAsIHZhbHVlID0gZGVjb2RlKHBhcnRbMl0pO1xuXG4gICAgLy9cbiAgICAvLyBQcmV2ZW50IG92ZXJyaWRpbmcgb2YgZXhpc3RpbmcgcHJvcGVydGllcy4gVGhpcyBlbnN1cmVzIHRoYXQgYnVpbGQtaW5cbiAgICAvLyBtZXRob2RzIGxpa2UgYHRvU3RyaW5nYCBvciBfX3Byb3RvX18gYXJlIG5vdCBvdmVycmlkZW4gYnkgbWFsaWNpb3VzXG4gICAgLy8gcXVlcnlzdHJpbmdzLlxuICAgIC8vXG4gICAgaWYgKGtleSBpbiByZXN1bHQpIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4IE9wdGlvbmFsIHByZWZpeC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZ2lmeShvYmosIHByZWZpeCkge1xuICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG5cbiAgdmFyIHBhaXJzID0gW107XG5cbiAgLy9cbiAgLy8gT3B0aW9uYWxseSBwcmVmaXggd2l0aCBhICc/JyBpZiBuZWVkZWRcbiAgLy9cbiAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgcHJlZml4KSBwcmVmaXggPSAnPyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyc9JysgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHByZWZpeCArIHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xufVxuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuZXhwb3J0cy5zdHJpbmdpZnkgPSBxdWVyeXN0cmluZ2lmeTtcbmV4cG9ydHMucGFyc2UgPSBxdWVyeXN0cmluZztcblxufSx7fV0sNjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlJ3JlIHJlcXVpcmVkIHRvIGFkZCBhIHBvcnQgbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkZWZhdWx0LXBvcnRcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gcG9ydCBQb3J0IG51bWJlciB3ZSBuZWVkIHRvIGNoZWNrXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgd2UgbmVlZCB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IElzIGl0IGEgZGVmYXVsdCBwb3J0IGZvciB0aGUgZ2l2ZW4gcHJvdG9jb2xcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcXVpcmVkKHBvcnQsIHByb3RvY29sKSB7XG4gIHByb3RvY29sID0gcHJvdG9jb2wuc3BsaXQoJzonKVswXTtcbiAgcG9ydCA9ICtwb3J0O1xuXG4gIGlmICghcG9ydCkgcmV0dXJuIGZhbHNlO1xuXG4gIHN3aXRjaCAocHJvdG9jb2wpIHtcbiAgICBjYXNlICdodHRwJzpcbiAgICBjYXNlICd3cyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDgwO1xuXG4gICAgY2FzZSAnaHR0cHMnOlxuICAgIGNhc2UgJ3dzcyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDQ0MztcblxuICAgIGNhc2UgJ2Z0cCc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDIxO1xuXG4gICAgY2FzZSAnZ29waGVyJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNzA7XG5cbiAgICBjYXNlICdmaWxlJzpcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcG9ydCAhPT0gMDtcbn07XG5cbn0se31dLDYxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXVpcmVkID0gcmVxdWlyZSgncmVxdWlyZXMtcG9ydCcpXG4gICwgcXMgPSByZXF1aXJlKCdxdWVyeXN0cmluZ2lmeScpXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFNcXHNdKikvaVxuICAsIHNsYXNoZXMgPSAvXltBLVphLXpdW0EtWmEtejAtOSstLl0qOlxcL1xcLy87XG5cbi8qKlxuICogVGhlc2UgYXJlIHRoZSBwYXJzZSBydWxlcyBmb3IgdGhlIFVSTCBwYXJzZXIsIGl0IGluZm9ybXMgdGhlIHBhcnNlclxuICogYWJvdXQ6XG4gKlxuICogMC4gVGhlIGNoYXIgaXQgTmVlZHMgdG8gcGFyc2UsIGlmIGl0J3MgYSBzdHJpbmcgaXQgc2hvdWxkIGJlIGRvbmUgdXNpbmdcbiAqICAgIGluZGV4T2YsIFJlZ0V4cCB1c2luZyBleGVjIGFuZCBOYU4gbWVhbnMgc2V0IGFzIGN1cnJlbnQgdmFsdWUuXG4gKiAxLiBUaGUgcHJvcGVydHkgd2Ugc2hvdWxkIHNldCB3aGVuIHBhcnNpbmcgdGhpcyB2YWx1ZS5cbiAqIDIuIEluZGljYXRpb24gaWYgaXQncyBiYWNrd2FyZHMgb3IgZm9yd2FyZCBwYXJzaW5nLCB3aGVuIHNldCBhcyBudW1iZXIgaXQnc1xuICogICAgdGhlIHZhbHVlIG9mIGV4dHJhIGNoYXJzIHRoYXQgc2hvdWxkIGJlIHNwbGl0IG9mZi5cbiAqIDMuIEluaGVyaXQgZnJvbSBsb2NhdGlvbiBpZiBub24gZXhpc3RpbmcgaW4gdGhlIHBhcnNlci5cbiAqIDQuIGB0b0xvd2VyQ2FzZWAgdGhlIHJlc3VsdGluZyB2YWx1ZS5cbiAqL1xudmFyIHJ1bGVzID0gW1xuICBbJyMnLCAnaGFzaCddLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWyc/JywgJ3F1ZXJ5J10sICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIGZ1bmN0aW9uIHNhbml0aXplKGFkZHJlc3MpIHsgICAgICAgICAgLy8gU2FuaXRpemUgd2hhdCBpcyBsZWZ0IG9mIHRoZSBhZGRyZXNzXG4gICAgcmV0dXJuIGFkZHJlc3MucmVwbGFjZSgnXFxcXCcsICcvJyk7XG4gIH0sXG4gIFsnLycsICdwYXRobmFtZSddLCAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJ0AnLCAnYXV0aCcsIDFdLCAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgZnJvbnQuXG4gIFtOYU4sICdob3N0JywgdW5kZWZpbmVkLCAxLCAxXSwgICAgICAgLy8gU2V0IGxlZnQgb3ZlciB2YWx1ZS5cbiAgWy86KFxcZCspJC8sICdwb3J0JywgdW5kZWZpbmVkLCAxXSwgICAgLy8gUmVnRXhwIHRoZSBiYWNrLlxuICBbTmFOLCAnaG9zdG5hbWUnLCB1bmRlZmluZWQsIDEsIDFdICAgIC8vIFNldCBsZWZ0IG92ZXIuXG5dO1xuXG4vKipcbiAqIFRoZXNlIHByb3BlcnRpZXMgc2hvdWxkIG5vdCBiZSBjb3BpZWQgb3IgaW5oZXJpdGVkIGZyb20uIFRoaXMgaXMgb25seSBuZWVkZWRcbiAqIGZvciBhbGwgbm9uIGJsb2IgVVJMJ3MgYXMgYSBibG9iIFVSTCBkb2VzIG5vdCBpbmNsdWRlIGEgaGFzaCwgb25seSB0aGVcbiAqIG9yaWdpbi5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIGlnbm9yZSA9IHsgaGFzaDogMSwgcXVlcnk6IDEgfTtcblxuLyoqXG4gKiBUaGUgbG9jYXRpb24gb2JqZWN0IGRpZmZlcnMgd2hlbiB5b3VyIGNvZGUgaXMgbG9hZGVkIHRocm91Z2ggYSBub3JtYWwgcGFnZSxcbiAqIFdvcmtlciBvciB0aHJvdWdoIGEgd29ya2VyIHVzaW5nIGEgYmxvYi4gQW5kIHdpdGggdGhlIGJsb2JibGUgYmVnaW5zIHRoZVxuICogdHJvdWJsZSBhcyB0aGUgbG9jYXRpb24gb2JqZWN0IHdpbGwgY29udGFpbiB0aGUgVVJMIG9mIHRoZSBibG9iLCBub3QgdGhlXG4gKiBsb2NhdGlvbiBvZiB0aGUgcGFnZSB3aGVyZSBvdXIgY29kZSBpcyBsb2FkZWQgaW4uIFRoZSBhY3R1YWwgb3JpZ2luIGlzXG4gKiBlbmNvZGVkIGluIHRoZSBgcGF0aG5hbWVgIHNvIHdlIGNhbiB0aGFua2Z1bGx5IGdlbmVyYXRlIGEgZ29vZCBcImRlZmF1bHRcIlxuICogbG9jYXRpb24gZnJvbSBpdCBzbyB3ZSBjYW4gZ2VuZXJhdGUgcHJvcGVyIHJlbGF0aXZlIFVSTCdzIGFnYWluLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jIE9wdGlvbmFsIGRlZmF1bHQgbG9jYXRpb24gb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gbG9sY2F0aW9uIG9iamVjdC5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gbG9sY2F0aW9uKGxvYykge1xuICB2YXIgbG9jYXRpb24gPSBnbG9iYWwgJiYgZ2xvYmFsLmxvY2F0aW9uIHx8IHt9O1xuICBsb2MgPSBsb2MgfHwgbG9jYXRpb247XG5cbiAgdmFyIGZpbmFsZGVzdGluYXRpb24gPSB7fVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NcbiAgICAsIGtleTtcblxuICBpZiAoJ2Jsb2I6JyA9PT0gbG9jLnByb3RvY29sKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVcmwodW5lc2NhcGUobG9jLnBhdGhuYW1lKSwge30pO1xuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVcmwobG9jLCB7fSk7XG4gICAgZm9yIChrZXkgaW4gaWdub3JlKSBkZWxldGUgZmluYWxkZXN0aW5hdGlvbltrZXldO1xuICB9IGVsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlKSB7XG4gICAgZm9yIChrZXkgaW4gbG9jKSB7XG4gICAgICBpZiAoa2V5IGluIGlnbm9yZSkgY29udGludWU7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uW2tleV0gPSBsb2Nba2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9IHNsYXNoZXMudGVzdChsb2MuaHJlZik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbmFsZGVzdGluYXRpb247XG59XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvdG9jb2xFeHRyYWN0XG4gKiBAdHlwZSBPYmplY3RcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCBtYXRjaGVkIGluIHRoZSBVUkwsIGluIGxvd2VyY2FzZS5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2xhc2hlcyBgdHJ1ZWAgaWYgcHJvdG9jb2wgaXMgZm9sbG93ZWQgYnkgXCIvL1wiLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmVzdCBSZXN0IG9mIHRoZSBVUkwgdGhhdCBpcyBub3QgcGFydCBvZiB0aGUgcHJvdG9jb2wuXG4gKi9cblxuLyoqXG4gKiBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGZyb20gYSBVUkwgd2l0aC93aXRob3V0IGRvdWJsZSBzbGFzaCAoXCIvL1wiKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBleHRyYWN0IGZyb20uXG4gKiBAcmV0dXJuIHtQcm90b2NvbEV4dHJhY3R9IEV4dHJhY3RlZCBpbmZvcm1hdGlvbi5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RQcm90b2NvbChhZGRyZXNzKSB7XG4gIHZhciBtYXRjaCA9IHByb3RvY29scmUuZXhlYyhhZGRyZXNzKTtcblxuICByZXR1cm4ge1xuICAgIHByb3RvY29sOiBtYXRjaFsxXSA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiAnJyxcbiAgICBzbGFzaGVzOiAhIW1hdGNoWzJdLFxuICAgIHJlc3Q6IG1hdGNoWzNdXG4gIH07XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIHJlbGF0aXZlIFVSTCBwYXRobmFtZSBhZ2FpbnN0IGEgYmFzZSBVUkwgcGF0aG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aXZlIFBhdGhuYW1lIG9mIHRoZSByZWxhdGl2ZSBVUkwuXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZSBQYXRobmFtZSBvZiB0aGUgYmFzZSBVUkwuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJlc29sdmVkIHBhdGhuYW1lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZShyZWxhdGl2ZSwgYmFzZSkge1xuICB2YXIgcGF0aCA9IChiYXNlIHx8ICcvJykuc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuY29uY2F0KHJlbGF0aXZlLnNwbGl0KCcvJykpXG4gICAgLCBpID0gcGF0aC5sZW5ndGhcbiAgICAsIGxhc3QgPSBwYXRoW2kgLSAxXVxuICAgICwgdW5zaGlmdCA9IGZhbHNlXG4gICAgLCB1cCA9IDA7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmIChwYXRoW2ldID09PSAnLicpIHtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAocGF0aFtpXSA9PT0gJy4uJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIGlmIChpID09PSAwKSB1bnNoaWZ0ID0gdHJ1ZTtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAodW5zaGlmdCkgcGF0aC51bnNoaWZ0KCcnKTtcbiAgaWYgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSBwYXRoLnB1c2goJycpO1xuXG4gIHJldHVybiBwYXRoLmpvaW4oJy8nKTtcbn1cblxuLyoqXG4gKiBUaGUgYWN0dWFsIFVSTCBpbnN0YW5jZS4gSW5zdGVhZCBvZiByZXR1cm5pbmcgYW4gb2JqZWN0IHdlJ3ZlIG9wdGVkLWluIHRvXG4gKiBjcmVhdGUgYW4gYWN0dWFsIGNvbnN0cnVjdG9yIGFzIGl0J3MgbXVjaCBtb3JlIG1lbW9yeSBlZmZpY2llbnQgYW5kXG4gKiBmYXN0ZXIgYW5kIGl0IHBsZWFzZXMgbXkgT0NELlxuICpcbiAqIEl0IGlzIHdvcnRoIG5vdGluZyB0aGF0IHdlIHNob3VsZCBub3QgdXNlIGBVUkxgIGFzIGNsYXNzIG5hbWUgdG8gcHJldmVudFxuICogY2xhc2hlcyB3aXRoIHRoZSBnbG9iYWwgVVJMIGluc3RhbmNlIHRoYXQgZ290IGludHJvZHVjZWQgaW4gYnJvd3NlcnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBwYXJzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jYXRpb24gTG9jYXRpb24gZGVmYXVsdHMgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBwYXJzZXIgUGFyc2VyIGZvciB0aGUgcXVlcnkgc3RyaW5nLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gVXJsKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFVybCkpIHtcbiAgICByZXR1cm4gbmV3IFVybChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKTtcbiAgfVxuXG4gIHZhciByZWxhdGl2ZSwgZXh0cmFjdGVkLCBwYXJzZSwgaW5zdHJ1Y3Rpb24sIGluZGV4LCBrZXlcbiAgICAsIGluc3RydWN0aW9ucyA9IHJ1bGVzLnNsaWNlKClcbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jYXRpb25cbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIGkgPSAwO1xuXG4gIC8vXG4gIC8vIFRoZSBmb2xsb3dpbmcgaWYgc3RhdGVtZW50cyBhbGxvd3MgdGhpcyBtb2R1bGUgdHdvIGhhdmUgY29tcGF0aWJpbGl0eSB3aXRoXG4gIC8vIDIgZGlmZmVyZW50IEFQSTpcbiAgLy9cbiAgLy8gMS4gTm9kZS5qcydzIGB1cmwucGFyc2VgIGFwaSB3aGljaCBhY2NlcHRzIGEgVVJMLCBib29sZWFuIGFzIGFyZ3VtZW50c1xuICAvLyAgICB3aGVyZSB0aGUgYm9vbGVhbiBpbmRpY2F0ZXMgdGhhdCB0aGUgcXVlcnkgc3RyaW5nIHNob3VsZCBhbHNvIGJlIHBhcnNlZC5cbiAgLy9cbiAgLy8gMi4gVGhlIGBVUkxgIGludGVyZmFjZSBvZiB0aGUgYnJvd3NlciB3aGljaCBhY2NlcHRzIGEgVVJMLCBvYmplY3QgYXNcbiAgLy8gICAgYXJndW1lbnRzLiBUaGUgc3VwcGxpZWQgb2JqZWN0IHdpbGwgYmUgdXNlZCBhcyBkZWZhdWx0IHZhbHVlcyAvIGZhbGwtYmFja1xuICAvLyAgICBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gIC8vXG4gIGlmICgnb2JqZWN0JyAhPT0gdHlwZSAmJiAnc3RyaW5nJyAhPT0gdHlwZSkge1xuICAgIHBhcnNlciA9IGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbnVsbDtcbiAgfVxuXG4gIGlmIChwYXJzZXIgJiYgJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHBhcnNlcikgcGFyc2VyID0gcXMucGFyc2U7XG5cbiAgbG9jYXRpb24gPSBsb2xjYXRpb24obG9jYXRpb24pO1xuXG4gIC8vXG4gIC8vIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gYmVmb3JlIHJ1bm5pbmcgdGhlIGluc3RydWN0aW9ucy5cbiAgLy9cbiAgZXh0cmFjdGVkID0gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MgfHwgJycpO1xuICByZWxhdGl2ZSA9ICFleHRyYWN0ZWQucHJvdG9jb2wgJiYgIWV4dHJhY3RlZC5zbGFzaGVzO1xuICB1cmwuc2xhc2hlcyA9IGV4dHJhY3RlZC5zbGFzaGVzIHx8IHJlbGF0aXZlICYmIGxvY2F0aW9uLnNsYXNoZXM7XG4gIHVybC5wcm90b2NvbCA9IGV4dHJhY3RlZC5wcm90b2NvbCB8fCBsb2NhdGlvbi5wcm90b2NvbCB8fCAnJztcbiAgYWRkcmVzcyA9IGV4dHJhY3RlZC5yZXN0O1xuXG4gIC8vXG4gIC8vIFdoZW4gdGhlIGF1dGhvcml0eSBjb21wb25lbnQgaXMgYWJzZW50IHRoZSBVUkwgc3RhcnRzIHdpdGggYSBwYXRoXG4gIC8vIGNvbXBvbmVudC5cbiAgLy9cbiAgaWYgKCFleHRyYWN0ZWQuc2xhc2hlcykgaW5zdHJ1Y3Rpb25zWzNdID0gWy8oLiopLywgJ3BhdGhuYW1lJ107XG5cbiAgZm9yICg7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXTtcblxuICAgIGlmICh0eXBlb2YgaW5zdHJ1Y3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFkZHJlc3MgPSBpbnN0cnVjdGlvbihhZGRyZXNzKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHBhcnNlID0gaW5zdHJ1Y3Rpb25bMF07XG4gICAga2V5ID0gaW5zdHJ1Y3Rpb25bMV07XG5cbiAgICBpZiAocGFyc2UgIT09IHBhcnNlKSB7XG4gICAgICB1cmxba2V5XSA9IGFkZHJlc3M7XG4gICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhcnNlKSB7XG4gICAgICBpZiAofihpbmRleCA9IGFkZHJlc3MuaW5kZXhPZihwYXJzZSkpKSB7XG4gICAgICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIGluc3RydWN0aW9uWzJdKSB7XG4gICAgICAgICAgdXJsW2tleV0gPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZShpbmRleCArIGluc3RydWN0aW9uWzJdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKGluZGV4ID0gcGFyc2UuZXhlYyhhZGRyZXNzKSkpIHtcbiAgICAgIHVybFtrZXldID0gaW5kZXhbMV07XG4gICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleC5pbmRleCk7XG4gICAgfVxuXG4gICAgdXJsW2tleV0gPSB1cmxba2V5XSB8fCAoXG4gICAgICByZWxhdGl2ZSAmJiBpbnN0cnVjdGlvblszXSA/IGxvY2F0aW9uW2tleV0gfHwgJycgOiAnJ1xuICAgICk7XG5cbiAgICAvL1xuICAgIC8vIEhvc3RuYW1lLCBob3N0IGFuZCBwcm90b2NvbCBzaG91bGQgYmUgbG93ZXJjYXNlZCBzbyB0aGV5IGNhbiBiZSB1c2VkIHRvXG4gICAgLy8gY3JlYXRlIGEgcHJvcGVyIGBvcmlnaW5gLlxuICAgIC8vXG4gICAgaWYgKGluc3RydWN0aW9uWzRdKSB1cmxba2V5XSA9IHVybFtrZXldLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvL1xuICAvLyBBbHNvIHBhcnNlIHRoZSBzdXBwbGllZCBxdWVyeSBzdHJpbmcgaW4gdG8gYW4gb2JqZWN0LiBJZiB3ZSdyZSBzdXBwbGllZFxuICAvLyB3aXRoIGEgY3VzdG9tIHBhcnNlciBhcyBmdW5jdGlvbiB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGJ1aWxkLWluXG4gIC8vIHBhcnNlci5cbiAgLy9cbiAgaWYgKHBhcnNlcikgdXJsLnF1ZXJ5ID0gcGFyc2VyKHVybC5xdWVyeSk7XG5cbiAgLy9cbiAgLy8gSWYgdGhlIFVSTCBpcyByZWxhdGl2ZSwgcmVzb2x2ZSB0aGUgcGF0aG5hbWUgYWdhaW5zdCB0aGUgYmFzZSBVUkwuXG4gIC8vXG4gIGlmIChcbiAgICAgIHJlbGF0aXZlXG4gICAgJiYgbG9jYXRpb24uc2xhc2hlc1xuICAgICYmIHVybC5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJ1xuICAgICYmICh1cmwucGF0aG5hbWUgIT09ICcnIHx8IGxvY2F0aW9uLnBhdGhuYW1lICE9PSAnJylcbiAgKSB7XG4gICAgdXJsLnBhdGhuYW1lID0gcmVzb2x2ZSh1cmwucGF0aG5hbWUsIGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIC8vXG4gIC8vIFdlIHNob3VsZCBub3QgYWRkIHBvcnQgbnVtYmVycyBpZiB0aGV5IGFyZSBhbHJlYWR5IHRoZSBkZWZhdWx0IHBvcnQgbnVtYmVyXG4gIC8vIGZvciBhIGdpdmVuIHByb3RvY29sLiBBcyB0aGUgaG9zdCBhbHNvIGNvbnRhaW5zIHRoZSBwb3J0IG51bWJlciB3ZSdyZSBnb2luZ1xuICAvLyBvdmVycmlkZSBpdCB3aXRoIHRoZSBob3N0bmFtZSB3aGljaCBjb250YWlucyBubyBwb3J0IG51bWJlci5cbiAgLy9cbiAgaWYgKCFyZXF1aXJlZCh1cmwucG9ydCwgdXJsLnByb3RvY29sKSkge1xuICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgIHVybC5wb3J0ID0gJyc7XG4gIH1cblxuICAvL1xuICAvLyBQYXJzZSBkb3duIHRoZSBgYXV0aGAgZm9yIHRoZSB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXG4gIC8vXG4gIHVybC51c2VybmFtZSA9IHVybC5wYXNzd29yZCA9ICcnO1xuICBpZiAodXJsLmF1dGgpIHtcbiAgICBpbnN0cnVjdGlvbiA9IHVybC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgdXJsLnVzZXJuYW1lID0gaW5zdHJ1Y3Rpb25bMF0gfHwgJyc7XG4gICAgdXJsLnBhc3N3b3JkID0gaW5zdHJ1Y3Rpb25bMV0gfHwgJyc7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICYmIHVybC5ob3N0ICYmIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6J1xuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIC8vXG4gIC8vIFRoZSBocmVmIGlzIGp1c3QgdGhlIGNvbXBpbGVkIHJlc3VsdC5cbiAgLy9cbiAgdXJsLmhyZWYgPSB1cmwudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY2hhbmdpbmcgcHJvcGVydGllcyBpbiB0aGUgVVJMIGluc3RhbmNlIHRvXG4gKiBpbnN1cmUgdGhhdCB0aGV5IGFsbCBwcm9wYWdhdGUgY29ycmVjdGx5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJ0ICAgICAgICAgIFByb3BlcnR5IHdlIG5lZWQgdG8gYWRqdXN0LlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgICAgICAgICAgVGhlIG5ld2x5IGFzc2lnbmVkIHZhbHVlLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBmbiAgV2hlbiBzZXR0aW5nIHRoZSBxdWVyeSwgaXQgd2lsbCBiZSB0aGUgZnVuY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQgdG8gcGFyc2UgdGhlIHF1ZXJ5LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2hlbiBzZXR0aW5nIHRoZSBwcm90b2NvbCwgZG91YmxlIHNsYXNoIHdpbGwgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgZnJvbSB0aGUgZmluYWwgdXJsIGlmIGl0IGlzIHRydWUuXG4gKiBAcmV0dXJucyB7VVJMfSBVUkwgaW5zdGFuY2UgZm9yIGNoYWluaW5nLlxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBzZXQocGFydCwgdmFsdWUsIGZuKSB7XG4gIHZhciB1cmwgPSB0aGlzO1xuXG4gIHN3aXRjaCAocGFydCkge1xuICAgIGNhc2UgJ3F1ZXJ5JzpcbiAgICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHZhbHVlICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB2YWx1ZSA9IChmbiB8fCBxcy5wYXJzZSkodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncG9ydCc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKCFyZXF1aXJlZCh2YWx1ZSwgdXJsLnByb3RvY29sKSkge1xuICAgICAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZTtcbiAgICAgICAgdXJsW3BhcnRdID0gJyc7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lICsnOicrIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3RuYW1lJzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAodXJsLnBvcnQpIHZhbHVlICs9ICc6JysgdXJsLnBvcnQ7XG4gICAgICB1cmwuaG9zdCA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdob3N0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoLzpcXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICB1cmwucG9ydCA9IHZhbHVlLnBvcCgpO1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZS5qb2luKCc6Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZTtcbiAgICAgICAgdXJsLnBvcnQgPSAnJztcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwcm90b2NvbCc6XG4gICAgICB1cmwucHJvdG9jb2wgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdXJsLnNsYXNoZXMgPSAhZm47XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BhdGhuYW1lJzpcbiAgICBjYXNlICdoYXNoJzpcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB2YXIgY2hhciA9IHBhcnQgPT09ICdwYXRobmFtZScgPyAnLycgOiAnIyc7XG4gICAgICAgIHVybFtwYXJ0XSA9IHZhbHVlLmNoYXJBdCgwKSAhPT0gY2hhciA/IGNoYXIgKyB2YWx1ZSA6IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zID0gcnVsZXNbaV07XG5cbiAgICBpZiAoaW5zWzRdKSB1cmxbaW5zWzFdXSA9IHVybFtpbnNbMV1dLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICYmIHVybC5ob3N0ICYmIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6J1xuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIHByb3BlcnRpZXMgYmFjayBpbiB0byBhIHZhbGlkIGFuZCBmdWxsIFVSTCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5naWZ5IE9wdGlvbmFsIHF1ZXJ5IHN0cmluZ2lmeSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IENvbXBpbGVkIHZlcnNpb24gb2YgdGhlIFVSTC5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoc3RyaW5naWZ5KSB7XG4gIGlmICghc3RyaW5naWZ5IHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiBzdHJpbmdpZnkpIHN0cmluZ2lmeSA9IHFzLnN0cmluZ2lmeTtcblxuICB2YXIgcXVlcnlcbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIHByb3RvY29sID0gdXJsLnByb3RvY29sO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5jaGFyQXQocHJvdG9jb2wubGVuZ3RoIC0gMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIHZhciByZXN1bHQgPSBwcm90b2NvbCArICh1cmwuc2xhc2hlcyA/ICcvLycgOiAnJyk7XG5cbiAgaWYgKHVybC51c2VybmFtZSkge1xuICAgIHJlc3VsdCArPSB1cmwudXNlcm5hbWU7XG4gICAgaWYgKHVybC5wYXNzd29yZCkgcmVzdWx0ICs9ICc6JysgdXJsLnBhc3N3b3JkO1xuICAgIHJlc3VsdCArPSAnQCc7XG4gIH1cblxuICByZXN1bHQgKz0gdXJsLmhvc3QgKyB1cmwucGF0aG5hbWU7XG5cbiAgcXVlcnkgPSAnb2JqZWN0JyA9PT0gdHlwZW9mIHVybC5xdWVyeSA/IHN0cmluZ2lmeSh1cmwucXVlcnkpIDogdXJsLnF1ZXJ5O1xuICBpZiAocXVlcnkpIHJlc3VsdCArPSAnPycgIT09IHF1ZXJ5LmNoYXJBdCgwKSA/ICc/JysgcXVlcnkgOiBxdWVyeTtcblxuICBpZiAodXJsLmhhc2gpIHJlc3VsdCArPSB1cmwuaGFzaDtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5VcmwucHJvdG90eXBlID0geyBzZXQ6IHNldCwgdG9TdHJpbmc6IHRvU3RyaW5nIH07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIFVSTCBwYXJzZXIgYW5kIHNvbWUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRoYXQgbWlnaHQgYmUgdXNlZnVsIGZvclxuLy8gb3RoZXJzIG9yIHRlc3RpbmcuXG4vL1xuVXJsLmV4dHJhY3RQcm90b2NvbCA9IGV4dHJhY3RQcm90b2NvbDtcblVybC5sb2NhdGlvbiA9IGxvbGNhdGlvbjtcblVybC5xcyA9IHFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVybDtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG5cbn0se1wicXVlcnlzdHJpbmdpZnlcIjo1OSxcInJlcXVpcmVzLXBvcnRcIjo2MH1dfSx7fSxbMV0pKDEpXG59KTtcblxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb2NranMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5zaVJlZ2V4ID0gcmVxdWlyZSgnYW5zaS1yZWdleCcpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRyZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIucmVwbGFjZShhbnNpUmVnZXgsICcnKSA6IHN0cjtcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSBzaW1wbGUgcGF0aCBVUkxcbiAgICBzaW1wbGVQYXRoUGF0dGVybiA9IC9eKFxcL1xcLz8oPyFcXC8pW15cXD9cXHNdKikoXFw/W15cXHNdKik/JC8sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyByZXNlcnZlZCBmb3IgZGVsaW1pdGluZyBVUkxzLlxuICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG4gICAgZGVsaW1zID0gWyc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0J10sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuICAgIHVud2lzZSA9IFsneycsICd9JywgJ3wnLCAnXFxcXCcsICdeJywgJ2AnXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWydcXCcnXS5jb25jYXQodW53aXNlKSxcbiAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgYXJlIG5ldmVyIGV2ZXIgYWxsb3dlZCBpbiBhIGhvc3RuYW1lLlxuICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2VcbiAgICAvLyBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgKmV4cGVjdGVkKiB0byBiZSBzZWVuLCBzbyB3ZSBmYXN0LXBhdGhcbiAgICAvLyB0aGVtLlxuICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIGhvc3RFbmRpbmdDaGFycyA9IFsnLycsICc/JywgJyMnXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIHV0aWwuaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCF1dGlsLmlzU3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuICB9XG5cbiAgLy8gQ29weSBjaHJvbWUsIElFLCBvcGVyYSBiYWNrc2xhc2gtaGFuZGxpbmcgYmVoYXZpb3IuXG4gIC8vIEJhY2sgc2xhc2hlcyBiZWZvcmUgdGhlIHF1ZXJ5IHN0cmluZyBnZXQgY29udmVydGVkIHRvIGZvcndhcmQgc2xhc2hlc1xuICAvLyBTZWU6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNTkxNlxuICB2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/JyksXG4gICAgICBzcGxpdHRlciA9XG4gICAgICAgICAgKHF1ZXJ5SW5kZXggIT09IC0xICYmIHF1ZXJ5SW5kZXggPCB1cmwuaW5kZXhPZignIycpKSA/ICc/JyA6ICcjJyxcbiAgICAgIHVTcGxpdCA9IHVybC5zcGxpdChzcGxpdHRlciksXG4gICAgICBzbGFzaFJlZ2V4ID0gL1xcXFwvZztcbiAgdVNwbGl0WzBdID0gdVNwbGl0WzBdLnJlcGxhY2Uoc2xhc2hSZWdleCwgJy8nKTtcbiAgdXJsID0gdVNwbGl0LmpvaW4oc3BsaXR0ZXIpO1xuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIGlmICghc2xhc2hlc0Rlbm90ZUhvc3QgJiYgdXJsLnNwbGl0KCcjJykubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gVHJ5IGZhc3QgcGF0aCByZWdleHBcbiAgICB2YXIgc2ltcGxlUGF0aCA9IHNpbXBsZVBhdGhQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gICAgaWYgKHNpbXBsZVBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHJlc3Q7XG4gICAgICB0aGlzLmhyZWYgPSByZXN0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMuc2VhcmNoLnN1YnN0cigxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55Y29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhdmUgbm9uLUFTQ0lJIGNoYXJhY3RlcnMsIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIEFTQ0lJLW9ubHkuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gcHVueWNvZGUudG9BU0NJSSh0aGlzLmhvc3RuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICBpZiAocmVzdC5pbmRleE9mKGFlKSA9PT0gLTEpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmICh1dGlsLmlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIHV0aWwuaXNPYmplY3QodGhpcy5xdWVyeSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnkpLmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmICh0aGlzLnNsYXNoZXMgfHxcbiAgICAgICghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29sW3Byb3RvY29sXSkgJiYgaG9zdCAhPT0gZmFsc2UpIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJyc7XG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaDtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlKHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmUocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIGlmICghc291cmNlKSByZXR1cm4gcmVsYXRpdmU7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlT2JqZWN0KHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlT2JqZWN0ID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIHZhciB0a2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICBmb3IgKHZhciB0ayA9IDA7IHRrIDwgdGtleXMubGVuZ3RoOyB0aysrKSB7XG4gICAgdmFyIHRrZXkgPSB0a2V5c1t0a107XG4gICAgcmVzdWx0W3RrZXldID0gdGhpc1t0a2V5XTtcbiAgfVxuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgdmFyIHJrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgIGZvciAodmFyIHJrID0gMDsgcmsgPCBya2V5cy5sZW5ndGg7IHJrKyspIHtcbiAgICAgIHZhciBya2V5ID0gcmtleXNbcmtdO1xuICAgICAgaWYgKHJrZXkgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtya2V5XSA9IHJlbGF0aXZlW3JrZXldO1xuICAgIH1cblxuICAgIC8vdXJsUGFyc2UgYXBwZW5kcyB0cmFpbGluZyAvIHRvIHVybHMgbGlrZSBodHRwOi8vd3d3LmV4YW1wbGUuY29tXG4gICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG4gICAgICAgIHJlc3VsdC5ob3N0bmFtZSAmJiAhcmVzdWx0LnBhdGhuYW1lKSB7XG4gICAgICByZXN1bHQucGF0aCA9IHJlc3VsdC5wYXRobmFtZSA9ICcvJztcbiAgICB9XG5cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcbiAgICAvLyBpZiBpdCdzIGEga25vd24gdXJsIHByb3RvY29sLCB0aGVuIGNoYW5naW5nXG4gICAgLy8gdGhlIHByb3RvY29sIGRvZXMgd2VpcmQgdGhpbmdzXG4gICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG4gICAgLy8gYW5kIGlmIHRoZXJlIHdhcyBhIHBhdGhcbiAgICAvLyB0byBiZWdpbiB3aXRoLCB0aGVuIHdlIE1VU1QgaGF2ZSBhIHBhdGguXG4gICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcbiAgICAvLyBiZWNhdXNlIHRoYXQncyBrbm93biB0byBiZSBob3N0bGVzcy5cbiAgICAvLyBhbnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYWJzb2x1dGUuXG4gICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICAgIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgICAgICB2YXIgayA9IGtleXNbdl07XG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChyZWxhdGl2ZS5zZWFyY2gpKSB7XG4gICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuICAgIC8vIGxpa2UgaHJlZj0nP2ZvbycuXG4gICAgLy8gUHV0IHRoaXMgYWZ0ZXIgdGhlIG90aGVyIHR3byBjYXNlcyBiZWNhdXNlIGl0IHNpbXBsaWZpZXMgdGhlIGJvb2xlYW5zXG4gICAgaWYgKHBzeWNob3RpYykge1xuICAgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBzcmNQYXRoLnNoaWZ0KCk7XG4gICAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgfHwgc3JjUGF0aC5sZW5ndGggPiAxKSAmJlxuICAgICAgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fCBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgfVxuICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGggfHwgcmVzdWx0LmF1dGg7XG4gIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzU3RyaW5nOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsT3JVbmRlZmluZWQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT0gbnVsbDtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlXG4gIG5vLXVudXNlZC12YXJzXG4qL1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQmFzZUNsaWVudCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmFzZUNsaWVudCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQmFzZUNsaWVudCwgbnVsbCwgW3tcbiAgICBrZXk6IFwiZ2V0Q2xpZW50UGF0aFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGllbnRQYXRoKG9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IG5lZWRzIGltcGxlbWVudGF0aW9uJyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJhc2VDbGllbnQ7XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGVcbiAgbm8tdW51c2VkLXZhcnNcbiovXG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbnZhciBTb2NrSlMgPSByZXF1aXJlKCdzb2NranMtY2xpZW50L2Rpc3Qvc29ja2pzJyk7XG5cbnZhciBCYXNlQ2xpZW50ID0gcmVxdWlyZSgnLi9CYXNlQ2xpZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQmFzZUNsaWVudCkge1xuICBfaW5oZXJpdHMoU29ja0pTQ2xpZW50LCBfQmFzZUNsaWVudCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihTb2NrSlNDbGllbnQpO1xuXG4gIGZ1bmN0aW9uIFNvY2tKU0NsaWVudCh1cmwpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU29ja0pTQ2xpZW50KTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgX3RoaXMuc29jayA9IG5ldyBTb2NrSlModXJsKTtcblxuICAgIF90aGlzLnNvY2sub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHsvLyBUT0RPOiB1c2UgbG9nZ2VyIHRvIGxvZyB0aGUgZXJyb3IgZXZlbnQgb25jZSBjbGllbnQgYW5kIGNsaWVudC1zcmNcbiAgICAgIC8vIGFyZSByZW9yZ2FuaXplZCB0byBoYXZlIHRoZSBzYW1lIGRpcmVjdG9yeSBzdHJ1Y3R1cmVcbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFNvY2tKU0NsaWVudCwgW3tcbiAgICBrZXk6IFwib25PcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3BlbihmKSB7XG4gICAgICB0aGlzLnNvY2sub25vcGVuID0gZjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25DbG9zZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsb3NlKGYpIHtcbiAgICAgIHRoaXMuc29jay5vbmNsb3NlID0gZjtcbiAgICB9IC8vIGNhbGwgZiB3aXRoIHRoZSBtZXNzYWdlIHN0cmluZyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcblxuICB9LCB7XG4gICAga2V5OiBcIm9uTWVzc2FnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk1lc3NhZ2UoZikge1xuICAgICAgdGhpcy5zb2NrLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGYoZS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiZ2V0Q2xpZW50UGF0aFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbGllbnRQYXRoKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiByZXF1aXJlLnJlc29sdmUoJy4vU29ja0pTQ2xpZW50Jyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNvY2tKU0NsaWVudDtcbn0oQmFzZUNsaWVudCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBXb3JrZXJHbG9iYWxTY29wZSBzZWxmICovXG5cbi8qIGVzbGludCBwcmVmZXItZGVzdHJ1Y3R1cmluZzogb2ZmICovXG5cbnZhciBzdHJpcEFuc2kgPSByZXF1aXJlKCdzdHJpcC1hbnNpJyk7XG5cbnZhciBzb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xuXG52YXIgb3ZlcmxheSA9IHJlcXVpcmUoJy4vb3ZlcmxheScpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL3V0aWxzL2xvZycpLFxuICAgIGxvZyA9IF9yZXF1aXJlLmxvZyxcbiAgICBzZXRMb2dMZXZlbCA9IF9yZXF1aXJlLnNldExvZ0xldmVsO1xuXG52YXIgc2VuZE1lc3NhZ2UgPSByZXF1aXJlKCcuL3V0aWxzL3NlbmRNZXNzYWdlJyk7XG5cbnZhciByZWxvYWRBcHAgPSByZXF1aXJlKCcuL3V0aWxzL3JlbG9hZEFwcCcpO1xuXG52YXIgY3JlYXRlU29ja2V0VXJsID0gcmVxdWlyZSgnLi91dGlscy9jcmVhdGVTb2NrZXRVcmwnKTtcblxudmFyIHN0YXR1cyA9IHtcbiAgaXNVbmxvYWRpbmc6IGZhbHNlLFxuICBjdXJyZW50SGFzaDogJydcbn07XG52YXIgb3B0aW9ucyA9IHtcbiAgaG90OiBmYWxzZSxcbiAgaG90UmVsb2FkOiB0cnVlLFxuICBsaXZlUmVsb2FkOiBmYWxzZSxcbiAgaW5pdGlhbDogdHJ1ZSxcbiAgdXNlV2FybmluZ092ZXJsYXk6IGZhbHNlLFxuICB1c2VFcnJvck92ZXJsYXk6IGZhbHNlLFxuICB1c2VQcm9ncmVzczogZmFsc2Vcbn07XG52YXIgc29ja2V0VXJsID0gY3JlYXRlU29ja2V0VXJsKF9fcmVzb3VyY2VRdWVyeSk7XG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgc3RhdHVzLmlzVW5sb2FkaW5nID0gdHJ1ZTtcbn0pO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgdmFyIHFzID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICBvcHRpb25zLmhvdFJlbG9hZCA9IHFzLmluZGV4T2YoJ2hvdHJlbG9hZD1mYWxzZScpID09PSAtMTtcbn1cblxudmFyIG9uU29ja2V0TWVzc2FnZSA9IHtcbiAgaG90OiBmdW5jdGlvbiBob3QoKSB7XG4gICAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICAgIGxvZy5pbmZvKCdbV0RTXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQuJyk7XG4gIH0sXG4gIGxpdmVSZWxvYWQ6IGZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gICAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgICBsb2cuaW5mbygnW1dEU10gTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZC4nKTtcbiAgfSxcbiAgaW52YWxpZDogZnVuY3Rpb24gaW52YWxpZCgpIHtcbiAgICBsb2cuaW5mbygnW1dEU10gQXBwIHVwZGF0ZWQuIFJlY29tcGlsaW5nLi4uJyk7IC8vIGZpeGVzICMxMDQyLiBvdmVybGF5IGRvZXNuJ3QgY2xlYXIgaWYgZXJyb3JzIGFyZSBmaXhlZCBidXQgd2FybmluZ3MgcmVtYWluLlxuXG4gICAgaWYgKG9wdGlvbnMudXNlV2FybmluZ092ZXJsYXkgfHwgb3B0aW9ucy51c2VFcnJvck92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZSgnSW52YWxpZCcpO1xuICB9LFxuICBoYXNoOiBmdW5jdGlvbiBoYXNoKF9oYXNoKSB7XG4gICAgc3RhdHVzLmN1cnJlbnRIYXNoID0gX2hhc2g7XG4gIH0sXG4gICdzdGlsbC1vayc6IGZ1bmN0aW9uIHN0aWxsT2soKSB7XG4gICAgbG9nLmluZm8oJ1tXRFNdIE5vdGhpbmcgY2hhbmdlZC4nKTtcblxuICAgIGlmIChvcHRpb25zLnVzZVdhcm5pbmdPdmVybGF5IHx8IG9wdGlvbnMudXNlRXJyb3JPdmVybGF5KSB7XG4gICAgICBvdmVybGF5LmNsZWFyKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoJ1N0aWxsT2snKTtcbiAgfSxcbiAgJ2xvZy1sZXZlbCc6IGZ1bmN0aW9uIGxvZ0xldmVsKGxldmVsKSB7XG4gICAgdmFyIGhvdEN0eCA9IHJlcXVpcmUuY29udGV4dCgnd2VicGFjay9ob3QnLCBmYWxzZSwgL15cXC5cXC9sb2ckLyk7XG5cbiAgICBpZiAoaG90Q3R4LmtleXMoKS5pbmRleE9mKCcuL2xvZycpICE9PSAtMSkge1xuICAgICAgaG90Q3R4KCcuL2xvZycpLnNldExvZ0xldmVsKGxldmVsKTtcbiAgICB9XG5cbiAgICBzZXRMb2dMZXZlbChsZXZlbCk7XG4gIH0sXG4gIG92ZXJsYXk6IGZ1bmN0aW9uIG92ZXJsYXkodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIG9wdGlvbnMudXNlV2FybmluZ092ZXJsYXkgPSBmYWxzZTtcbiAgICAgICAgb3B0aW9ucy51c2VFcnJvck92ZXJsYXkgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgb3B0aW9ucy51c2VXYXJuaW5nT3ZlcmxheSA9IHZhbHVlLndhcm5pbmdzO1xuICAgICAgICBvcHRpb25zLnVzZUVycm9yT3ZlcmxheSA9IHZhbHVlLmVycm9ycztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHByb2dyZXNzOiBmdW5jdGlvbiBwcm9ncmVzcyhfcHJvZ3Jlc3MpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgb3B0aW9ucy51c2VQcm9ncmVzcyA9IF9wcm9ncmVzcztcbiAgICB9XG4gIH0sXG4gICdwcm9ncmVzcy11cGRhdGUnOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMudXNlUHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiW1dEU10gXCIuY29uY2F0KGRhdGEucGVyY2VudCwgXCIlIC0gXCIpLmNvbmNhdChkYXRhLm1zZywgXCIuXCIpKTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZSgnUHJvZ3Jlc3MnLCBkYXRhKTtcbiAgfSxcbiAgb2s6IGZ1bmN0aW9uIG9rKCkge1xuICAgIHNlbmRNZXNzYWdlKCdPaycpO1xuXG4gICAgaWYgKG9wdGlvbnMudXNlV2FybmluZ092ZXJsYXkgfHwgb3B0aW9ucy51c2VFcnJvck92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5pbml0aWFsKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbml0aWFsID0gZmFsc2U7XG4gICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJldHVybi1hc3NpZ25cblxuXG4gICAgcmVsb2FkQXBwKG9wdGlvbnMsIHN0YXR1cyk7XG4gIH0sXG4gICdjb250ZW50LWNoYW5nZWQnOiBmdW5jdGlvbiBjb250ZW50Q2hhbmdlZCgpIHtcbiAgICBsb2cuaW5mbygnW1dEU10gQ29udGVudCBiYXNlIGNoYW5nZWQuIFJlbG9hZGluZy4uLicpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MpIHtcbiAgICBsb2cud2FybignW1dEU10gV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLicpO1xuXG4gICAgdmFyIHN0cmlwcGVkV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uICh3YXJuaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaXBBbnNpKHdhcm5pbmcpO1xuICAgIH0pO1xuXG4gICAgc2VuZE1lc3NhZ2UoJ1dhcm5pbmdzJywgc3RyaXBwZWRXYXJuaW5ncyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmlwcGVkV2FybmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxvZy53YXJuKHN0cmlwcGVkV2FybmluZ3NbaV0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnVzZVdhcm5pbmdPdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNob3dNZXNzYWdlKF93YXJuaW5ncyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuaW5pdGlhbCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW5pdGlhbCA9IGZhbHNlO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICBlcnJvcnM6IGZ1bmN0aW9uIGVycm9ycyhfZXJyb3JzKSB7XG4gICAgbG9nLmVycm9yKCdbV0RTXSBFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLicpO1xuXG4gICAgdmFyIHN0cmlwcGVkRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICByZXR1cm4gc3RyaXBBbnNpKGVycm9yKTtcbiAgICB9KTtcblxuICAgIHNlbmRNZXNzYWdlKCdFcnJvcnMnLCBzdHJpcHBlZEVycm9ycyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmlwcGVkRXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cuZXJyb3Ioc3RyaXBwZWRFcnJvcnNbaV0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnVzZUVycm9yT3ZlcmxheSkge1xuICAgICAgb3ZlcmxheS5zaG93TWVzc2FnZShfZXJyb3JzKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmluaXRpYWwgPSBmYWxzZTtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKF9lcnJvcikge1xuICAgIGxvZy5lcnJvcihfZXJyb3IpO1xuICB9LFxuICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgbG9nLmVycm9yKCdbV0RTXSBEaXNjb25uZWN0ZWQhJyk7XG4gICAgc2VuZE1lc3NhZ2UoJ0Nsb3NlJyk7XG4gIH1cbn07XG5zb2NrZXQoc29ja2V0VXJsLCBvblNvY2tldE1lc3NhZ2UpOyIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCBfX3Jlc291cmNlUXVlcnkgV29ya2VyR2xvYmFsU2NvcGUgc2VsZiAqL1xuXG4vKiBlc2xpbnQgcHJlZmVyLWRlc3RydWN0dXJpbmc6IG9mZiAqL1xuXG52YXIgc3RyaXBBbnNpID0gcmVxdWlyZSgnc3RyaXAtYW5zaScpO1xuXG52YXIgc29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcblxudmFyIG92ZXJsYXkgPSByZXF1aXJlKCcuL292ZXJsYXknKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi91dGlscy9sb2cnKSxcbiAgICBsb2cgPSBfcmVxdWlyZS5sb2csXG4gICAgc2V0TG9nTGV2ZWwgPSBfcmVxdWlyZS5zZXRMb2dMZXZlbDtcblxudmFyIHNlbmRNZXNzYWdlID0gcmVxdWlyZSgnLi91dGlscy9zZW5kTWVzc2FnZScpO1xuXG52YXIgcmVsb2FkQXBwID0gcmVxdWlyZSgnLi91dGlscy9yZWxvYWRBcHAnKTtcblxudmFyIGNyZWF0ZVNvY2tldFVybCA9IHJlcXVpcmUoJy4vdXRpbHMvY3JlYXRlU29ja2V0VXJsJyk7XG5cbnZhciBzdGF0dXMgPSB7XG4gIGlzVW5sb2FkaW5nOiBmYWxzZSxcbiAgY3VycmVudEhhc2g6ICcnXG59O1xudmFyIG9wdGlvbnMgPSB7XG4gIGhvdDogZmFsc2UsXG4gIGhvdFJlbG9hZDogdHJ1ZSxcbiAgbGl2ZVJlbG9hZDogZmFsc2UsXG4gIGluaXRpYWw6IHRydWUsXG4gIHVzZVdhcm5pbmdPdmVybGF5OiBmYWxzZSxcbiAgdXNlRXJyb3JPdmVybGF5OiBmYWxzZSxcbiAgdXNlUHJvZ3Jlc3M6IGZhbHNlXG59O1xudmFyIHNvY2tldFVybCA9IGNyZWF0ZVNvY2tldFVybChfX3Jlc291cmNlUXVlcnkpO1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHZhciBxcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgb3B0aW9ucy5ob3RSZWxvYWQgPSBxcy5pbmRleE9mKCdob3RyZWxvYWQ9ZmFsc2UnKSA9PT0gLTE7XG59XG5cbnZhciBvblNvY2tldE1lc3NhZ2UgPSB7XG4gIGhvdDogZnVuY3Rpb24gaG90KCkge1xuICAgIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgICBsb2cuaW5mbygnW1dEU10gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLicpO1xuICB9LFxuICBsaXZlUmVsb2FkOiBmdW5jdGlvbiBsaXZlUmVsb2FkKCkge1xuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gICAgbG9nLmluZm8oJ1tXRFNdIExpdmUgUmVsb2FkaW5nIGVuYWJsZWQuJyk7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oJ1tXRFNdIEFwcCB1cGRhdGVkLiBSZWNvbXBpbGluZy4uLicpOyAvLyBmaXhlcyAjMTA0Mi4gb3ZlcmxheSBkb2Vzbid0IGNsZWFyIGlmIGVycm9ycyBhcmUgZml4ZWQgYnV0IHdhcm5pbmdzIHJlbWFpbi5cblxuICAgIGlmIChvcHRpb25zLnVzZVdhcm5pbmdPdmVybGF5IHx8IG9wdGlvbnMudXNlRXJyb3JPdmVybGF5KSB7XG4gICAgICBvdmVybGF5LmNsZWFyKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoJ0ludmFsaWQnKTtcbiAgfSxcbiAgaGFzaDogZnVuY3Rpb24gaGFzaChfaGFzaCkge1xuICAgIHN0YXR1cy5jdXJyZW50SGFzaCA9IF9oYXNoO1xuICB9LFxuICAnc3RpbGwtb2snOiBmdW5jdGlvbiBzdGlsbE9rKCkge1xuICAgIGxvZy5pbmZvKCdbV0RTXSBOb3RoaW5nIGNoYW5nZWQuJyk7XG5cbiAgICBpZiAob3B0aW9ucy51c2VXYXJuaW5nT3ZlcmxheSB8fCBvcHRpb25zLnVzZUVycm9yT3ZlcmxheSkge1xuICAgICAgb3ZlcmxheS5jbGVhcigpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKCdTdGlsbE9rJyk7XG4gIH0sXG4gICdsb2ctbGV2ZWwnOiBmdW5jdGlvbiBsb2dMZXZlbChsZXZlbCkge1xuICAgIHZhciBob3RDdHggPSByZXF1aXJlLmNvbnRleHQoJ3dlYnBhY2svaG90JywgZmFsc2UsIC9eXFwuXFwvbG9nJC8pO1xuXG4gICAgaWYgKGhvdEN0eC5rZXlzKCkuaW5kZXhPZignLi9sb2cnKSAhPT0gLTEpIHtcbiAgICAgIGhvdEN0eCgnLi9sb2cnKS5zZXRMb2dMZXZlbChsZXZlbCk7XG4gICAgfVxuXG4gICAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xuICB9LFxuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICBvcHRpb25zLnVzZVdhcm5pbmdPdmVybGF5ID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMudXNlRXJyb3JPdmVybGF5ID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIG9wdGlvbnMudXNlV2FybmluZ092ZXJsYXkgPSB2YWx1ZS53YXJuaW5ncztcbiAgICAgICAgb3B0aW9ucy51c2VFcnJvck92ZXJsYXkgPSB2YWx1ZS5lcnJvcnM7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3MoX3Byb2dyZXNzKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG9wdGlvbnMudXNlUHJvZ3Jlc3MgPSBfcHJvZ3Jlc3M7XG4gICAgfVxuICB9LFxuICAncHJvZ3Jlc3MtdXBkYXRlJzogZnVuY3Rpb24gcHJvZ3Jlc3NVcGRhdGUoZGF0YSkge1xuICAgIGlmIChvcHRpb25zLnVzZVByb2dyZXNzKSB7XG4gICAgICBsb2cuaW5mbyhcIltXRFNdIFwiLmNvbmNhdChkYXRhLnBlcmNlbnQsIFwiJSAtIFwiKS5jb25jYXQoZGF0YS5tc2csIFwiLlwiKSk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoJ1Byb2dyZXNzJywgZGF0YSk7XG4gIH0sXG4gIG9rOiBmdW5jdGlvbiBvaygpIHtcbiAgICBzZW5kTWVzc2FnZSgnT2snKTtcblxuICAgIGlmIChvcHRpb25zLnVzZVdhcm5pbmdPdmVybGF5IHx8IG9wdGlvbnMudXNlRXJyb3JPdmVybGF5KSB7XG4gICAgICBvdmVybGF5LmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuaW5pdGlhbCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW5pdGlhbCA9IGZhbHNlO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXR1cm4tYXNzaWduXG5cblxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAnY29udGVudC1jaGFuZ2VkJzogZnVuY3Rpb24gY29udGVudENoYW5nZWQoKSB7XG4gICAgbG9nLmluZm8oJ1tXRFNdIENvbnRlbnQgYmFzZSBjaGFuZ2VkLiBSZWxvYWRpbmcuLi4nKTtcbiAgICBzZWxmLmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LFxuICB3YXJuaW5nczogZnVuY3Rpb24gd2FybmluZ3MoX3dhcm5pbmdzKSB7XG4gICAgbG9nLndhcm4oJ1tXRFNdIFdhcm5pbmdzIHdoaWxlIGNvbXBpbGluZy4nKTtcblxuICAgIHZhciBzdHJpcHBlZFdhcm5pbmdzID0gX3dhcm5pbmdzLm1hcChmdW5jdGlvbiAod2FybmluZykge1xuICAgICAgcmV0dXJuIHN0cmlwQW5zaSh3YXJuaW5nKTtcbiAgICB9KTtcblxuICAgIHNlbmRNZXNzYWdlKCdXYXJuaW5ncycsIHN0cmlwcGVkV2FybmluZ3MpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpcHBlZFdhcm5pbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cud2FybihzdHJpcHBlZFdhcm5pbmdzW2ldKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy51c2VXYXJuaW5nT3ZlcmxheSkge1xuICAgICAgb3ZlcmxheS5zaG93TWVzc2FnZShfd2FybmluZ3MpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmluaXRpYWwpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmluaXRpYWwgPSBmYWxzZTtcbiAgICB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuXG5cbiAgICByZWxvYWRBcHAob3B0aW9ucywgc3RhdHVzKTtcbiAgfSxcbiAgZXJyb3JzOiBmdW5jdGlvbiBlcnJvcnMoX2Vycm9ycykge1xuICAgIGxvZy5lcnJvcignW1dEU10gRXJyb3JzIHdoaWxlIGNvbXBpbGluZy4gUmVsb2FkIHByZXZlbnRlZC4nKTtcblxuICAgIHZhciBzdHJpcHBlZEVycm9ycyA9IF9lcnJvcnMubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgcmV0dXJuIHN0cmlwQW5zaShlcnJvcik7XG4gICAgfSk7XG5cbiAgICBzZW5kTWVzc2FnZSgnRXJyb3JzJywgc3RyaXBwZWRFcnJvcnMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpcHBlZEVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHN0cmlwcGVkRXJyb3JzW2ldKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy51c2VFcnJvck92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2hvd01lc3NhZ2UoX2Vycm9ycyk7XG4gICAgfVxuXG4gICAgb3B0aW9ucy5pbml0aWFsID0gZmFsc2U7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5lcnJvcignW1dEU10gRGlzY29ubmVjdGVkIScpO1xuICAgIHNlbmRNZXNzYWdlKCdDbG9zZScpO1xuICB9XG59O1xuc29ja2V0KHNvY2tldFVybCwgb25Tb2NrZXRNZXNzYWdlKTsiLCIndXNlIHN0cmljdCc7IC8vIFRoZSBlcnJvciBvdmVybGF5IGlzIGluc3BpcmVkIChhbmQgbW9zdGx5IGNvcGllZCkgZnJvbSBDcmVhdGUgUmVhY3QgQXBwIChodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2tpbmN1YmF0b3IvY3JlYXRlLXJlYWN0LWFwcClcbi8vIFRoZXksIGluIHR1cm4sIGdvdCBpbnNwaXJlZCBieSB3ZWJwYWNrLWhvdC1taWRkbGV3YXJlIChodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmUpLlxuXG52YXIgYW5zaUhUTUwgPSByZXF1aXJlKCdhbnNpLWh0bWwnKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnaHRtbC1lbnRpdGllcycpLFxuICAgIEFsbEh0bWxFbnRpdGllcyA9IF9yZXF1aXJlLkFsbEh0bWxFbnRpdGllcztcblxudmFyIGVudGl0aWVzID0gbmV3IEFsbEh0bWxFbnRpdGllcygpO1xudmFyIGNvbG9ycyA9IHtcbiAgcmVzZXQ6IFsndHJhbnNwYXJlbnQnLCAndHJhbnNwYXJlbnQnXSxcbiAgYmxhY2s6ICcxODE4MTgnLFxuICByZWQ6ICdFMzYwNDknLFxuICBncmVlbjogJ0IzQ0I3NCcsXG4gIHllbGxvdzogJ0ZGRDA4MCcsXG4gIGJsdWU6ICc3Q0FGQzInLFxuICBtYWdlbnRhOiAnN0ZBQ0NBJyxcbiAgY3lhbjogJ0MzQzJFRicsXG4gIGxpZ2h0Z3JleTogJ0VCRTdFMycsXG4gIGRhcmtncmV5OiAnNkQ3ODkxJ1xufTtcbnZhciBvdmVybGF5SWZyYW1lID0gbnVsbDtcbnZhciBvdmVybGF5RGl2ID0gbnVsbDtcbnZhciBsYXN0T25PdmVybGF5RGl2UmVhZHkgPSBudWxsO1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlJZnJhbWUob25JZnJhbWVMb2FkKSB7XG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgaWZyYW1lLmlkID0gJ3dlYnBhY2stZGV2LXNlcnZlci1jbGllbnQtb3ZlcmxheSc7XG4gIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICBpZnJhbWUuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICBpZnJhbWUuc3R5bGUubGVmdCA9IDA7XG4gIGlmcmFtZS5zdHlsZS50b3AgPSAwO1xuICBpZnJhbWUuc3R5bGUucmlnaHQgPSAwO1xuICBpZnJhbWUuc3R5bGUuYm90dG9tID0gMDtcbiAgaWZyYW1lLnN0eWxlLndpZHRoID0gJzEwMHZ3JztcbiAgaWZyYW1lLnN0eWxlLmhlaWdodCA9ICcxMDB2aCc7XG4gIGlmcmFtZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gIGlmcmFtZS5zdHlsZS56SW5kZXggPSA5OTk5OTk5OTk5O1xuICBpZnJhbWUub25sb2FkID0gb25JZnJhbWVMb2FkO1xuICByZXR1cm4gaWZyYW1lO1xufVxuXG5mdW5jdGlvbiBhZGRPdmVybGF5RGl2VG8oaWZyYW1lKSB7XG4gIHZhciBkaXYgPSBpZnJhbWUuY29udGVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaWQgPSAnd2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5LWRpdic7XG4gIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gIGRpdi5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gIGRpdi5zdHlsZS5sZWZ0ID0gMDtcbiAgZGl2LnN0eWxlLnRvcCA9IDA7XG4gIGRpdi5zdHlsZS5yaWdodCA9IDA7XG4gIGRpdi5zdHlsZS5ib3R0b20gPSAwO1xuICBkaXYuc3R5bGUud2lkdGggPSAnMTAwdncnO1xuICBkaXYuc3R5bGUuaGVpZ2h0ID0gJzEwMHZoJztcbiAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuODUpJztcbiAgZGl2LnN0eWxlLmNvbG9yID0gJyNFOEU4RTgnO1xuICBkaXYuc3R5bGUuZm9udEZhbWlseSA9ICdNZW5sbywgQ29uc29sYXMsIG1vbm9zcGFjZSc7XG4gIGRpdi5zdHlsZS5mb250U2l6ZSA9ICdsYXJnZSc7XG4gIGRpdi5zdHlsZS5wYWRkaW5nID0gJzJyZW0nO1xuICBkaXYuc3R5bGUubGluZUhlaWdodCA9ICcxLjInO1xuICBkaXYuc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG4gIGRpdi5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gIHJldHVybiBkaXY7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZU92ZXJsYXlEaXZFeGlzdHMob25PdmVybGF5RGl2UmVhZHkpIHtcbiAgaWYgKG92ZXJsYXlEaXYpIHtcbiAgICAvLyBFdmVyeXRoaW5nIGlzIHJlYWR5LCBjYWxsIHRoZSBjYWxsYmFjayByaWdodCBhd2F5LlxuICAgIG9uT3ZlcmxheURpdlJlYWR5KG92ZXJsYXlEaXYpO1xuICAgIHJldHVybjtcbiAgfSAvLyBDcmVhdGluZyBhbiBpZnJhbWUgbWF5IGJlIGFzeW5jaHJvbm91cyBzbyB3ZSdsbCBzY2hlZHVsZSB0aGUgY2FsbGJhY2suXG4gIC8vIEluIGNhc2Ugb2YgbXVsdGlwbGUgY2FsbHMsIGxhc3QgY2FsbGJhY2sgd2lucy5cblxuXG4gIGxhc3RPbk92ZXJsYXlEaXZSZWFkeSA9IG9uT3ZlcmxheURpdlJlYWR5O1xuXG4gIGlmIChvdmVybGF5SWZyYW1lKSB7XG4gICAgLy8gV2UndmUgYWxyZWFkeSBjcmVhdGVkIGl0LlxuICAgIHJldHVybjtcbiAgfSAvLyBDcmVhdGUgaWZyYW1lIGFuZCwgd2hlbiBpdCBpcyByZWFkeSwgYSBkaXYgaW5zaWRlIGl0LlxuXG5cbiAgb3ZlcmxheUlmcmFtZSA9IGNyZWF0ZU92ZXJsYXlJZnJhbWUoZnVuY3Rpb24gKCkge1xuICAgIG92ZXJsYXlEaXYgPSBhZGRPdmVybGF5RGl2VG8ob3ZlcmxheUlmcmFtZSk7IC8vIE5vdyB3ZSBjYW4gdGFsayFcblxuICAgIGxhc3RPbk92ZXJsYXlEaXZSZWFkeShvdmVybGF5RGl2KTtcbiAgfSk7IC8vIFphbGdvIGFsZXJ0OiBvbklmcmFtZUxvYWQoKSB3aWxsIGJlIGNhbGxlZCBlaXRoZXIgc3luY2hyb25vdXNseVxuICAvLyBvciBhc3luY2hyb25vdXNseSBkZXBlbmRpbmcgb24gdGhlIGJyb3dzZXIuXG4gIC8vIFdlIGRlbGF5IGFkZGluZyBpdCBzbyBgb3ZlcmxheUlmcmFtZWAgaXMgc2V0IHdoZW4gYG9uSWZyYW1lTG9hZGAgZmlyZXMuXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5SWZyYW1lKTtcbn0gLy8gU3VjY2Vzc2Z1bCBjb21waWxhdGlvbi5cblxuXG5mdW5jdGlvbiBjbGVhcigpIHtcbiAgaWYgKCFvdmVybGF5RGl2KSB7XG4gICAgLy8gSXQgaXMgbm90IHRoZXJlIGluIHRoZSBmaXJzdCBwbGFjZS5cbiAgICByZXR1cm47XG4gIH0gLy8gQ2xlYW4gdXAgYW5kIHJlc2V0IGludGVybmFsIHN0YXRlLlxuXG5cbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvdmVybGF5SWZyYW1lKTtcbiAgb3ZlcmxheURpdiA9IG51bGw7XG4gIG92ZXJsYXlJZnJhbWUgPSBudWxsO1xuICBsYXN0T25PdmVybGF5RGl2UmVhZHkgPSBudWxsO1xufSAvLyBDb21waWxhdGlvbiB3aXRoIGVycm9ycyAoZS5nLiBzeW50YXggZXJyb3Igb3IgbWlzc2luZyBtb2R1bGVzKS5cblxuXG5mdW5jdGlvbiBzaG93TWVzc2FnZShtZXNzYWdlcykge1xuICBlbnN1cmVPdmVybGF5RGl2RXhpc3RzKGZ1bmN0aW9uIChkaXYpIHtcbiAgICAvLyBNYWtlIGl0IGxvb2sgc2ltaWxhciB0byBvdXIgdGVybWluYWwuXG4gICAgZGl2LmlubmVySFRNTCA9IFwiPHNwYW4gc3R5bGU9XFxcImNvbG9yOiAjXCIuY29uY2F0KGNvbG9ycy5yZWQsIFwiXFxcIj5GYWlsZWQgdG8gY29tcGlsZS48L3NwYW4+PGJyPjxicj5cIikuY29uY2F0KGFuc2lIVE1MKGVudGl0aWVzLmVuY29kZShtZXNzYWdlc1swXSkpKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjbGVhcjogY2xlYXIsXG4gIHNob3dNZXNzYWdlOiBzaG93TWVzc2FnZVxufTsiLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gKi9cblxuLyogZXNsaW50LWRpc2FibGVcbiAgY2FtZWxjYXNlXG4qL1xuLy8gdGhpcyBTb2NrSlNDbGllbnQgaXMgaGVyZSBhcyBhIGRlZmF1bHQgZmFsbGJhY2ssIGluIGNhc2UgaW5saW5lIG1vZGVcbi8vIGlzIG9mZiBvciB0aGUgY2xpZW50IGlzIG5vdCBpbmplY3RlZC4gVGhpcyB3aWxsIGJlIHN3aXRjaGVkIHRvXG4vLyBXZWJzb2NrZXRDbGllbnQgd2hlbiBpdCBiZWNvbWVzIHRoZSBkZWZhdWx0XG4vLyBpbXBvcnRhbnQ6IHRoZSBwYXRoIHRvIFNvY2tKU0NsaWVudCBoZXJlIGlzIG1hZGUgdG8gd29yayBpbiB0aGUgJ2NsaWVudCdcbi8vIGRpcmVjdG9yeSwgYnV0IGlzIHVwZGF0ZWQgdmlhIHRoZSB3ZWJwYWNrIGNvbXBpbGF0aW9uIHdoZW4gY29tcGlsZWQgZnJvbVxuLy8gdGhlICdjbGllbnQtc3JjJyBkaXJlY3RvcnlcblxudmFyIENsaWVudCA9IHR5cGVvZiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW5yZXNvbHZlZFxucmVxdWlyZSgnLi9jbGllbnRzL1NvY2tKU0NsaWVudCcpO1xudmFyIHJldHJpZXMgPSAwO1xudmFyIGNsaWVudCA9IG51bGw7XG5cbnZhciBzb2NrZXQgPSBmdW5jdGlvbiBpbml0U29ja2V0KHVybCwgaGFuZGxlcnMpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcbiAgfSk7XG4gIGNsaWVudC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gMCkge1xuICAgICAgaGFuZGxlcnMuY2xvc2UoKTtcbiAgICB9IC8vIFRyeSB0byByZWNvbm5lY3QuXG5cblxuICAgIGNsaWVudCA9IG51bGw7IC8vIEFmdGVyIDEwIHJldHJpZXMgc3RvcCB0cnlpbmcsIHRvIHByZXZlbnQgbG9nc3BhbS5cblxuICAgIGlmIChyZXRyaWVzIDw9IDEwKSB7XG4gICAgICAvLyBFeHBvbmVudGlhbGx5IGluY3JlYXNlIHRpbWVvdXQgdG8gcmVjb25uZWN0LlxuICAgICAgLy8gUmVzcGVjdGZ1bGx5IGNvcGllZCBmcm9tIHRoZSBwYWNrYWdlIGBnb3RgLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW1peGVkLW9wZXJhdG9ycywgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG4gICAgICB2YXIgcmV0cnlJbk1zID0gMTAwMCAqIE1hdGgucG93KDIsIHJldHJpZXMpICsgTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgIHJldHJpZXMgKz0gMTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzb2NrZXQodXJsLCBoYW5kbGVycyk7XG4gICAgICB9LCByZXRyeUluTXMpO1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbk1lc3NhZ2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgbXNnID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIGlmIChoYW5kbGVyc1ttc2cudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21zZy50eXBlXShtc2cuZGF0YSk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ja2V0OyIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCBzZWxmICovXG5cbnZhciB1cmwgPSByZXF1aXJlKCd1cmwnKTtcblxudmFyIGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgPSByZXF1aXJlKCcuL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UnKTtcblxuZnVuY3Rpb24gY3JlYXRlU29ja2V0VXJsKHJlc291cmNlUXVlcnksIGN1cnJlbnRMb2NhdGlvbikge1xuICB2YXIgdXJsUGFydHM7XG5cbiAgaWYgKHR5cGVvZiByZXNvdXJjZVF1ZXJ5ID09PSAnc3RyaW5nJyAmJiByZXNvdXJjZVF1ZXJ5ICE9PSAnJykge1xuICAgIC8vIElmIHRoaXMgYnVuZGxlIGlzIGlubGluZWQsIHVzZSB0aGUgcmVzb3VyY2UgcXVlcnkgdG8gZ2V0IHRoZSBjb3JyZWN0IHVybC5cbiAgICAvLyBmb3JtYXQgaXMgbGlrZSBgP2h0dHA6Ly8wLjAuMC4wOjgwOTYmc29ja1BvcnQ9ODA5NyZzb2NrSG9zdD1sb2NhbGhvc3RgXG4gICAgdXJsUGFydHMgPSB1cmwucGFyc2UocmVzb3VyY2VRdWVyeSAvLyBzdHJpcCBsZWFkaW5nIGA/YCBmcm9tIHF1ZXJ5IHN0cmluZyB0byBnZXQgYSB2YWxpZCBVUkxcbiAgICAuc3Vic3RyKDEpIC8vIHJlcGxhY2UgZmlyc3QgYCZgIHdpdGggYD9gIHRvIGhhdmUgYSB2YWxpZCBxdWVyeSBzdHJpbmdcbiAgICAucmVwbGFjZSgnJicsICc/JyksIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIC8vIEVsc2UsIGdldCB0aGUgdXJsIGZyb20gdGhlIDxzY3JpcHQ+IHRoaXMgZmlsZSB3YXMgY2FsbGVkIHdpdGguXG4gICAgdmFyIHNjcmlwdEhvc3QgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlKCk7XG4gICAgdXJsUGFydHMgPSB1cmwucGFyc2Uoc2NyaXB0SG9zdCB8fCAnLycsIHRydWUsIHRydWUpO1xuICB9IC8vIFVzZSBwYXJhbWV0ZXIgdG8gYWxsb3cgcGFzc2luZyBsb2NhdGlvbiBpbiB1bml0IHRlc3RzXG5cblxuICBpZiAodHlwZW9mIGN1cnJlbnRMb2NhdGlvbiA9PT0gJ3N0cmluZycgJiYgY3VycmVudExvY2F0aW9uICE9PSAnJykge1xuICAgIGN1cnJlbnRMb2NhdGlvbiA9IHVybC5wYXJzZShjdXJyZW50TG9jYXRpb24pO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRMb2NhdGlvbiA9IHNlbGYubG9jYXRpb247XG4gIH1cblxuICByZXR1cm4gZ2V0U29ja2V0VXJsKHVybFBhcnRzLCBjdXJyZW50TG9jYXRpb24pO1xufVxuLypcbiAqIEdldHMgc29ja2V0IFVSTCBiYXNlZCBvbiBTY3JpcHQgU291cmNlL0xvY2F0aW9uXG4gKiAoc2NyaXB0U3JjOiBVUkwsIGxvY2F0aW9uOiBVUkwpIC0+IFVSTFxuICovXG5cblxuZnVuY3Rpb24gZ2V0U29ja2V0VXJsKHVybFBhcnRzLCBsb2MpIHtcbiAgdmFyIGF1dGggPSB1cmxQYXJ0cy5hdXRoLFxuICAgICAgcXVlcnkgPSB1cmxQYXJ0cy5xdWVyeTtcbiAgdmFyIGhvc3RuYW1lID0gdXJsUGFydHMuaG9zdG5hbWUsXG4gICAgICBwcm90b2NvbCA9IHVybFBhcnRzLnByb3RvY29sLFxuICAgICAgcG9ydCA9IHVybFBhcnRzLnBvcnQ7XG5cbiAgaWYgKCFwb3J0IHx8IHBvcnQgPT09ICcwJykge1xuICAgIHBvcnQgPSBsb2MucG9ydDtcbiAgfSAvLyBjaGVjayBpcHY0IGFuZCBpcHY2IGBhbGwgaG9zdG5hbWVgXG4gIC8vIHdoeSBkbyB3ZSBuZWVkIHRoaXMgY2hlY2s/XG4gIC8vIGhvc3RuYW1lIG4vYSBmb3IgZmlsZSBwcm90b2NvbCAoZXhhbXBsZSwgd2hlbiB1c2luZyBlbGVjdHJvbiwgaW9uaWMpXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay1kZXYtc2VydmVyL3B1bGwvMzg0XG5cblxuICBpZiAoKGhvc3RuYW1lID09PSAnMC4wLjAuMCcgfHwgaG9zdG5hbWUgPT09ICc6OicpICYmIGxvYy5ob3N0bmFtZSAmJiBsb2MucHJvdG9jb2wuaW5kZXhPZignaHR0cCcpID09PSAwKSB7XG4gICAgaG9zdG5hbWUgPSBsb2MuaG9zdG5hbWU7XG4gIH0gLy8gYGhvc3RuYW1lYCBjYW4gYmUgZW1wdHkgd2hlbiB0aGUgc2NyaXB0IHBhdGggaXMgcmVsYXRpdmUuIEluIHRoYXQgY2FzZSwgc3BlY2lmeWluZ1xuICAvLyBhIHByb3RvY29sIHdvdWxkIHJlc3VsdCBpbiBhbiBpbnZhbGlkIFVSTC5cbiAgLy8gV2hlbiBodHRwcyBpcyB1c2VkIGluIHRoZSBhcHAsIHNlY3VyZSB3ZWJzb2NrZXRzIGFyZSBhbHdheXMgbmVjZXNzYXJ5XG4gIC8vIGJlY2F1c2UgdGhlIGJyb3dzZXIgZG9lc24ndCBhY2NlcHQgbm9uLXNlY3VyZSB3ZWJzb2NrZXRzLlxuXG5cbiAgaWYgKGhvc3RuYW1lICYmIGhvc3RuYW1lICE9PSAnMTI3LjAuMC4xJyAmJiAobG9jLnByb3RvY29sID09PSAnaHR0cHM6JyB8fCB1cmxQYXJ0cy5ob3N0bmFtZSA9PT0gJzAuMC4wLjAnKSkge1xuICAgIHByb3RvY29sID0gbG9jLnByb3RvY29sO1xuICB9IC8vIGFsbCBvZiB0aGVzZSBzb2NrIHVybCBwYXJhbXMgYXJlIG9wdGlvbmFsbHkgcGFzc2VkIGluIHRocm91Z2hcbiAgLy8gcmVzb3VyY2VRdWVyeSwgc28gd2UgbmVlZCB0byBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgaWZcbiAgLy8gdGhleSBhcmUgbm90IHByb3ZpZGVkXG5cblxuICB2YXIgc29ja0hvc3QgPSBxdWVyeS5zb2NrSG9zdCB8fCBob3N0bmFtZTtcbiAgdmFyIHNvY2tQYXRoID0gcXVlcnkuc29ja1BhdGggfHwgJy9zb2NranMtbm9kZSc7XG4gIHZhciBzb2NrUG9ydCA9IHF1ZXJ5LnNvY2tQb3J0IHx8IHBvcnQ7XG5cbiAgaWYgKHNvY2tQb3J0ID09PSAnbG9jYXRpb24nKSB7XG4gICAgc29ja1BvcnQgPSBsb2MucG9ydDtcbiAgfVxuXG4gIHJldHVybiB1cmwuZm9ybWF0KHtcbiAgICBwcm90b2NvbDogcHJvdG9jb2wsXG4gICAgYXV0aDogYXV0aCxcbiAgICBob3N0bmFtZTogc29ja0hvc3QsXG4gICAgcG9ydDogc29ja1BvcnQsXG4gICAgLy8gSWYgc29ja1BhdGggaXMgcHJvdmlkZWQgaXQnbGwgYmUgcGFzc2VkIGluIHZpYSB0aGUgcmVzb3VyY2VRdWVyeSBhcyBhXG4gICAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgICAvLyBjbGllbnQgdG8gb3BlbiB0aGUgc29ja2V0IHRvIHRoZSBjb3JyZWN0IGxvY2F0aW9uLlxuICAgIHBhdGhuYW1lOiBzb2NrUGF0aFxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTb2NrZXRVcmw7IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0U291cmNlKCkge1xuICAvLyBgZG9jdW1lbnQuY3VycmVudFNjcmlwdGAgaXMgdGhlIG1vc3QgYWNjdXJhdGUgd2F5IHRvIGZpbmQgdGhlIGN1cnJlbnQgc2NyaXB0LFxuICAvLyBidXQgaXMgbm90IHN1cHBvcnRlZCBpbiBhbGwgYnJvd3NlcnMuXG4gIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgfSAvLyBGYWxsIGJhY2sgdG8gZ2V0dGluZyBhbGwgc2NyaXB0cyBpbiB0aGUgZG9jdW1lbnQuXG5cblxuICB2YXIgc2NyaXB0RWxlbWVudHMgPSBkb2N1bWVudC5zY3JpcHRzIHx8IFtdO1xuICB2YXIgY3VycmVudFNjcmlwdCA9IHNjcmlwdEVsZW1lbnRzW3NjcmlwdEVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuXG4gIGlmIChjdXJyZW50U2NyaXB0KSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgfSAvLyBGYWlsIGFzIHRoZXJlIHdhcyBubyBzY3JpcHQgdG8gdXNlLlxuXG5cbiAgdGhyb3cgbmV3IEVycm9yKCdbV0RTXSBGYWlsZWQgdG8gZ2V0IGN1cnJlbnQgc2NyaXB0IHNvdXJjZS4nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDdXJyZW50U2NyaXB0U291cmNlOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGxvZyA9IHJlcXVpcmUoJ2xvZ2xldmVsJykuZ2V0TG9nZ2VyKCd3ZWJwYWNrLWRldi1zZXJ2ZXInKTtcblxudmFyIElORk8gPSAnaW5mbyc7XG52YXIgV0FSTiA9ICd3YXJuJztcbnZhciBFUlJPUiA9ICdlcnJvcic7XG52YXIgREVCVUcgPSAnZGVidWcnO1xudmFyIFRSQUNFID0gJ3RyYWNlJztcbnZhciBTSUxFTlQgPSAnc2lsZW50JzsgLy8gZGVwcmVjYXRlZFxuLy8gVE9ETzogcmVtb3ZlIHRoZXNlIGF0IG1ham9yIHJlbGVhc2VkXG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8xODI1XG5cbnZhciBXQVJOSU5HID0gJ3dhcm5pbmcnO1xudmFyIE5PTkUgPSAnbm9uZSc7IC8vIFNldCB0aGUgZGVmYXVsdCBsb2cgbGV2ZWxcblxubG9nLnNldERlZmF1bHRMZXZlbChJTkZPKTtcblxuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHtcbiAgc3dpdGNoIChsZXZlbCkge1xuICAgIGNhc2UgSU5GTzpcbiAgICBjYXNlIFdBUk46XG4gICAgY2FzZSBFUlJPUjpcbiAgICBjYXNlIERFQlVHOlxuICAgIGNhc2UgVFJBQ0U6XG4gICAgICBsb2cuc2V0TGV2ZWwobGV2ZWwpO1xuICAgICAgYnJlYWs7XG4gICAgLy8gZGVwcmVjYXRlZFxuXG4gICAgY2FzZSBXQVJOSU5HOlxuICAgICAgLy8gbG9nbGV2ZWwncyB3YXJuaW5nIG5hbWUgaXMgZGlmZmVyZW50IGZyb20gd2VicGFjaydzXG4gICAgICBsb2cuc2V0TGV2ZWwoJ3dhcm4nKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIGRlcHJlY2F0ZWRcblxuICAgIGNhc2UgTk9ORTpcbiAgICBjYXNlIFNJTEVOVDpcbiAgICAgIGxvZy5kaXNhYmxlQWxsKCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBsb2cuZXJyb3IoXCJbV0RTXSBVbmtub3duIGNsaWVudExvZ0xldmVsICdcIi5jb25jYXQobGV2ZWwsIFwiJ1wiKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxvZzogbG9nLFxuICBzZXRMb2dMZXZlbDogc2V0TG9nTGV2ZWxcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIFdvcmtlckdsb2JhbFNjb3BlIHNlbGYgKi9cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9sb2cnKSxcbiAgICBsb2cgPSBfcmVxdWlyZS5sb2c7XG5cbmZ1bmN0aW9uIHJlbG9hZEFwcChfcmVmLCBfcmVmMikge1xuICB2YXIgaG90UmVsb2FkID0gX3JlZi5ob3RSZWxvYWQsXG4gICAgICBob3QgPSBfcmVmLmhvdCxcbiAgICAgIGxpdmVSZWxvYWQgPSBfcmVmLmxpdmVSZWxvYWQ7XG4gIHZhciBpc1VubG9hZGluZyA9IF9yZWYyLmlzVW5sb2FkaW5nLFxuICAgICAgY3VycmVudEhhc2ggPSBfcmVmMi5jdXJyZW50SGFzaDtcblxuICBpZiAoaXNVbmxvYWRpbmcgfHwgIWhvdFJlbG9hZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChob3QpIHtcbiAgICBsb2cuaW5mbygnW1dEU10gQXBwIGhvdCB1cGRhdGUuLi4nKTtcblxuICAgIHZhciBob3RFbWl0dGVyID0gcmVxdWlyZSgnd2VicGFjay9ob3QvZW1pdHRlcicpO1xuXG4gICAgaG90RW1pdHRlci5lbWl0KCd3ZWJwYWNrSG90VXBkYXRlJywgY3VycmVudEhhc2gpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KGN1cnJlbnRIYXNoKSwgJyonKTtcbiAgICB9XG4gIH0gLy8gYWxsb3cgcmVmcmVzaGluZyB0aGUgcGFnZSBvbmx5IGlmIGxpdmVSZWxvYWQgaXNuJ3QgZGlzYWJsZWRcbiAgZWxzZSBpZiAobGl2ZVJlbG9hZCkge1xuICAgICAgdmFyIHJvb3RXaW5kb3cgPSBzZWxmOyAvLyB1c2UgcGFyZW50IHdpbmRvdyBmb3IgcmVsb2FkIChpbiBjYXNlIHdlJ3JlIGluIGFuIGlmcmFtZSB3aXRoIG5vIHZhbGlkIHNyYylcblxuICAgICAgdmFyIGludGVydmFsSWQgPSBzZWxmLnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHJvb3RXaW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09ICdhYm91dDonKSB7XG4gICAgICAgICAgLy8gcmVsb2FkIGltbWVkaWF0ZWx5IGlmIHByb3RvY29sIGlzIHZhbGlkXG4gICAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm9vdFdpbmRvdyA9IHJvb3RXaW5kb3cucGFyZW50O1xuXG4gICAgICAgICAgaWYgKHJvb3RXaW5kb3cucGFyZW50ID09PSByb290V2luZG93KSB7XG4gICAgICAgICAgICAvLyBpZiBwYXJlbnQgZXF1YWxzIGN1cnJlbnQgd2luZG93IHdlJ3ZlIHJlYWNoZWQgdGhlIHJvb3Qgd2hpY2ggd291bGQgY29udGludWUgZm9yZXZlciwgc28gdHJpZ2dlciBhIHJlbG9hZCBhbnl3YXlzXG4gICAgICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbygnW1dEU10gQXBwIHVwZGF0ZWQuIFJlbG9hZGluZy4uLicpO1xuICAgIHJvb3RXaW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWxvYWRBcHA7IiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBXb3JrZXJHbG9iYWxTY29wZSBzZWxmICovXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvdXRzaWRlLCBzbyBwbHVnaW5zIGNhbiBjb25zdW1lIGl0LlxuXG5mdW5jdGlvbiBzZW5kTXNnKHR5cGUsIGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlID09PSAndW5kZWZpbmVkJyB8fCAhKHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkpKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIndlYnBhY2tcIi5jb25jYXQodHlwZSksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgJyonKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRNc2c7IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdCBzeW5jIF5cXFxcLlxcXFwvbG9nJFwiOyIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vKmdsb2JhbHMgd2luZG93IF9fd2VicGFja19oYXNoX18gKi9cbmlmIChtb2R1bGUuaG90KSB7XG5cdHZhciBsYXN0SGFzaDtcblx0dmFyIHVwVG9EYXRlID0gZnVuY3Rpb24gdXBUb0RhdGUoKSB7XG5cdFx0cmV0dXJuIGxhc3RIYXNoLmluZGV4T2YoX193ZWJwYWNrX2hhc2hfXykgPj0gMDtcblx0fTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblx0dmFyIGNoZWNrID0gZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0bW9kdWxlLmhvdFxuXHRcdFx0LmNoZWNrKHRydWUpXG5cdFx0XHQudGhlbihmdW5jdGlvbih1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRpZiAoIXVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIENhbm5vdCBmaW5kIHVwZGF0ZS4gTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiKTtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gKFByb2JhYmx5IGJlY2F1c2Ugb2YgcmVzdGFydGluZyB0aGUgd2VicGFjay1kZXYtc2VydmVyKVwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcXVpcmUoXCIuL2xvZy1hcHBseS1yZXN1bHRcIikodXBkYXRlZE1vZHVsZXMsIHVwZGF0ZWRNb2R1bGVzKTtcblxuXHRcdFx0XHRpZiAodXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBBcHAgaXMgdXAgdG8gZGF0ZS5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xuXHRcdFx0XHRpZiAoW1wiYWJvcnRcIiwgXCJmYWlsXCJdLmluZGV4T2Yoc3RhdHVzKSA+PSAwKSB7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIENhbm5vdCBhcHBseSB1cGRhdGUuIE5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gVXBkYXRlIGZhaWxlZDogXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9O1xuXHR2YXIgaG90RW1pdHRlciA9IHJlcXVpcmUoXCIuL2VtaXR0ZXJcIik7XG5cdGhvdEVtaXR0ZXIub24oXCJ3ZWJwYWNrSG90VXBkYXRlXCIsIGZ1bmN0aW9uKGN1cnJlbnRIYXNoKSB7XG5cdFx0bGFzdEhhc2ggPSBjdXJyZW50SGFzaDtcblx0XHRpZiAoIXVwVG9EYXRlKCkgJiYgbW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJpZGxlXCIpIHtcblx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBDaGVja2luZyBmb3IgdXBkYXRlcyBvbiB0aGUgc2VydmVyLi4uXCIpO1xuXHRcdFx0Y2hlY2soKTtcblx0XHR9XG5cdH0pO1xuXHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gV2FpdGluZyBmb3IgdXBkYXRlIHNpZ25hbCBmcm9tIFdEUy4uLlwiKTtcbn0gZWxzZSB7XG5cdHRocm93IG5ldyBFcnJvcihcIltITVJdIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuXCIpO1xufVxuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xuXHR2YXIgdW5hY2NlcHRlZE1vZHVsZXMgPSB1cGRhdGVkTW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24obW9kdWxlSWQpIHtcblx0XHRyZXR1cm4gcmVuZXdlZE1vZHVsZXMgJiYgcmVuZXdlZE1vZHVsZXMuaW5kZXhPZihtb2R1bGVJZCkgPCAwO1xuXHR9KTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblxuXHRpZiAodW5hY2NlcHRlZE1vZHVsZXMubGVuZ3RoID4gMCkge1xuXHRcdGxvZyhcblx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XCJbSE1SXSBUaGUgZm9sbG93aW5nIG1vZHVsZXMgY291bGRuJ3QgYmUgaG90IHVwZGF0ZWQ6IChUaGV5IHdvdWxkIG5lZWQgYSBmdWxsIHJlbG9hZCEpXCJcblx0XHQpO1xuXHRcdHVuYWNjZXB0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcblx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICghcmVuZXdlZE1vZHVsZXMgfHwgcmVuZXdlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIE5vdGhpbmcgaG90IHVwZGF0ZWQuXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGVkIG1vZHVsZXM6XCIpO1xuXHRcdHJlbmV3ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcblx0XHRcdGlmICh0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIgJiYgbW9kdWxlSWQuaW5kZXhPZihcIiFcIikgIT09IC0xKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IG1vZHVsZUlkLnNwbGl0KFwiIVwiKTtcblx0XHRcdFx0bG9nLmdyb3VwQ29sbGFwc2VkKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgcGFydHMucG9wKCkpO1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHRcdGxvZy5ncm91cEVuZChcImluZm9cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIG51bWJlcklkcyA9IHJlbmV3ZWRNb2R1bGVzLmV2ZXJ5KGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG5cdFx0XHRyZXR1cm4gdHlwZW9mIG1vZHVsZUlkID09PSBcIm51bWJlclwiO1xuXHRcdH0pO1xuXHRcdGlmIChudW1iZXJJZHMpXG5cdFx0XHRsb2coXG5cdFx0XHRcdFwiaW5mb1wiLFxuXHRcdFx0XHRcIltITVJdIENvbnNpZGVyIHVzaW5nIHRoZSBOYW1lZE1vZHVsZXNQbHVnaW4gZm9yIG1vZHVsZSBuYW1lcy5cIlxuXHRcdFx0KTtcblx0fVxufTtcbiIsInZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xuXG5mdW5jdGlvbiBkdW1teSgpIHt9XG5cbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xuXHR2YXIgc2hvdWxkTG9nID1cblx0XHQobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcblx0cmV0dXJuIHNob3VsZExvZztcbn1cblxuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uKGxldmVsLCBtc2cpIHtcblx0XHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdFx0bG9nRm4obXNnKTtcblx0XHR9XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGV2ZWwsIG1zZykge1xuXHRpZiAoc2hvdWxkTG9nKGxldmVsKSkge1xuXHRcdGlmIChsZXZlbCA9PT0gXCJpbmZvXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHtcblx0XHRcdGNvbnNvbGUud2Fybihtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwiZXJyb3JcIikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xuXHRcdH1cblx0fVxufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zICovXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGlucyAqL1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cCA9IGxvZ0dyb3VwKGdyb3VwKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBDb2xsYXBzZWQgPSBsb2dHcm91cChncm91cENvbGxhcHNlZCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwRW5kID0gbG9nR3JvdXAoZ3JvdXBFbmQpO1xuXG5tb2R1bGUuZXhwb3J0cy5zZXRMb2dMZXZlbCA9IGZ1bmN0aW9uKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uKGVycikge1xuXHR2YXIgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuXHR2YXIgc3RhY2sgPSBlcnIuc3RhY2s7XG5cdGlmICghc3RhY2spIHtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSBlbHNlIGlmIChzdGFjay5pbmRleE9mKG1lc3NhZ2UpIDwgMCkge1xuXHRcdHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBzdGFjaztcblx0fVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImdldF9zdGFydGVkMTI4LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImdldF9zdGFydGVkMTYucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZ2V0X3N0YXJ0ZWQzMi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJnZXRfc3RhcnRlZDQ4LnBuZ1wiOyIsImltcG9ydCAnLi4vaW1hZ2VzL2dldF9zdGFydGVkMTYucG5nJ1xyXG5pbXBvcnQgJy4uL2ltYWdlcy9nZXRfc3RhcnRlZDMyLnBuZydcclxuaW1wb3J0ICcuLi9pbWFnZXMvZ2V0X3N0YXJ0ZWQ0OC5wbmcnXHJcbmltcG9ydCAnLi4vaW1hZ2VzL2dldF9zdGFydGVkMTI4LnBuZydcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==