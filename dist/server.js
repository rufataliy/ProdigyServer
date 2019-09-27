/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/firebase/firebase-key.json":
/*!****************************************!*\
  !*** ./src/firebase/firebase-key.json ***!
  \****************************************/
/*! exports provided: type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"type\\\":\\\"service_account\\\",\\\"project_id\\\":\\\"prodigy-b614e\\\",\\\"private_key_id\\\":\\\"61bf0f0a6fe469719d9b93145f10c6dee142eace\\\",\\\"private_key\\\":\\\"-----BEGIN PRIVATE KEY-----\\\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDDpSNbQPjP6fd+\\\\nFQXaf/TGmTlMF+Md65dS4dtakl5tele88LLAg8i0TpTghSYmJntVBLPVIPChTMyE\\\\n031vd5E+C3S+eNvy510e3ey7jtHRAv6YjsFpQUecr9lXU8/DdziDjAaZN2vD/TSu\\\\ntFuE3cVcMd3jdrZtwAci2cOA58PhHOJa0mJ2U6iEV1vF7LnBLxDXTxfql8A80qBS\\\\nS5xWQCTsWxe70WNseDREIAcn7NfOK0wrT0cIR7kuTJRhMnNVLgVRFMpnbi4ODzeN\\\\nNV9eLkcYUh/yri2NfhbdD5cAd8MRcqT91L/Pqrb6TIIp3MNLLiei7IljxmiY5bDq\\\\nx2IZRsrnAgMBAAECggEASgQ93hY0i6Q+Z8rYThO+rSvmy2z2Fam9tDOSYy+g3dY9\\\\nP1PorICu+9gG5vI4vpIscru2tVki8EM31MCWYgdgQZLf9fePbtQtHLJlD4g2xNZX\\\\nL6xCa+mwiAzXMvyYS6DdFpdxH6Ih+SHgPoApZ5jnQ7vx8E5HMjpF+N9d4XTNXGqB\\\\nPtqQ6JLGET/I9aAsLoT8kClolSOCnKN+MLPfNrQhCdNcxKRDOBZv2cuYAW+3jGe/\\\\nyWZ7zStyyW9RQU0nHsDmciGO5v3lGpNTd4cwBMUdLeASeN0cpCt76gebyEj58RXb\\\\nnXmrhfUUI9yyg2oZV1ITXg570cMZ4IpgGWFuMhL9YQKBgQDxUmocn/P8zTU3DPm1\\\\nGZ9dRxU4MgWZtwc8GIH+YEg1PDBGAYE7PK3ASvOA2e58zDSwH0LPgwKdtw0A2j83\\\\nhmM6Ft4O9k6+ymfU+G+Xg3fnOP51x3+57W0aXY6uwYpbCAlfFhjm7MVTGV8rgKqb\\\\n0vdPmlajX5ThG2rxxYEbeUNXbwKBgQDPi38X+3b1IF47tlCl4kH2imcsNBlkFEeN\\\\nZm68jvOfgQoab9vQwBO4bRwRibzCq5IAAKrsfJV/sUt7+sXMhmnEXGPHuRnbrDjI\\\\nS4UMD+/S4i8sHEa9yZJmZaeLrBjPiOL/nnQpA0Tv+vAKMTZRVVzf1oKsqxlkmFe8\\\\n8EU6IwbICQKBgE7oCMRFVO0jWDQg7QFXWHGSjZCrYoNpglcXGGJJrzKg9JPfaBcr\\\\ndxC6MTa/i6iIyO2RuzHI/7D8KqdNtX/9VDKpSYCQ7xyZaCwN88cR+MHFNAbk7ZGo\\\\n3ZTSZJYluIydaxsJSakwYDEUybaawq5i4/TGXW/cD/0vDt/xGY8XLnrHAoGACtCT\\\\nC9XfqgBIyMXESBCVLVqi66u/Uva3j8exp4OvcDVSKHSBuMv5exe8abGKs34rOnLO\\\\ndUo8pA3CCDDWE8VBR6kkzeh4T3kW8GD3Ctzdu1hr6tmCWithxJIxe9a46D+SzI0e\\\\nMnDoK7UgwvczhGN1VnigEI1N4m8Jy1+dy9y9YrkCgYA3LDEs/ol7r+hP2AEoAaiQ\\\\nz0dU8OwaHaF176Pj4zr74HjBdVTnsK8o5v36Vs6Eu1zN4SkdG1t1/WWocBcf6R8q\\\\nQdewrGWZD5FMTPrdyzfVGMP4JIHHOYYUvZvA9ALkrce//ZJuIrG3vpcInXEdTZyt\\\\nJr2yqCmTWGHHMxprlZCF2Q==\\\\n-----END PRIVATE KEY-----\\\\n\\\",\\\"client_email\\\":\\\"firebase-adminsdk-5i6pd@prodigy-b614e.iam.gserviceaccount.com\\\",\\\"client_id\\\":\\\"108161580343033292316\\\",\\\"auth_uri\\\":\\\"https://accounts.google.com/o/oauth2/auth\\\",\\\"token_uri\\\":\\\"https://oauth2.googleapis.com/token\\\",\\\"auth_provider_x509_cert_url\\\":\\\"https://www.googleapis.com/oauth2/v1/certs\\\",\\\"client_x509_cert_url\\\":\\\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5i6pd%40prodigy-b614e.iam.gserviceaccount.com\\\"}\");\n\n//# sourceURL=webpack:///./src/firebase/firebase-key.json?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar jwt = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n\nvar jwks = __webpack_require__(/*! jwks-rsa */ \"jwks-rsa\");\n\nvar firebaseAdmin = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar serviceAccount = __webpack_require__(/*! ../firebase/firebase-key.json */ \"./src/firebase/firebase-key.json\");\n\nvar app = express();\nfirebaseAdmin.initializeApp({\n  credential: firebaseAdmin.credential.cert(serviceAccount),\n  databaseURL: \"https://prodigy-b614e.firebaseio.com\"\n});\napp.use(cors());\napp.use(express[\"static\"]('dist'));\nvar jwtCheck = jwt({\n  secret: jwks.expressJwtSecret({\n    cache: true,\n    rateLimit: true,\n    jwksRequestsPerMinute: 5,\n    jwksUri: \"https://prodigy-gate.auth0.com/.well-known/jwks.json\"\n  }),\n  aud: \"https://prodigy-gate.auth0.com/userinfo\",\n  iss: \"https://prodigy-gate.auth0.com\",\n  alg: 'RS256'\n});\napp.get('/firebase', jwtCheck,\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    var uid, firebaseToken;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            uid = req.user.sub;\n            _context.prev = 1;\n            _context.next = 4;\n            return firebaseAdmin.auth().createCustomToken(uid);\n\n          case 4:\n            firebaseToken = _context.sent;\n            res.json({\n              firebaseToken: firebaseToken\n            });\n            firebaseAdmin.auth().updateUser(uid, req.user);\n            _context.next = 12;\n            break;\n\n          case 9:\n            _context.prev = 9;\n            _context.t0 = _context[\"catch\"](1);\n            res.status(500).send({\n              message: 'Something went wrong acquiring a Firebase token.',\n              error: _context.t0\n            });\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[1, 9]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\napp.get('*', function (req, res) {\n  res.sendFile(__dirname + \"/index.html\", function (err) {\n    console.log(err + \"error\");\n  });\n});\napp.listen(3001, function () {\n  return console.log('Server running on localhost:3001');\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/asyncToGenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/asyncToGenerator%22?");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/regenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/regenerator%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-jwt\");\n\n//# sourceURL=webpack:///external_%22express-jwt%22?");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-admin\");\n\n//# sourceURL=webpack:///external_%22firebase-admin%22?");

/***/ }),

/***/ "jwks-rsa":
/*!***************************!*\
  !*** external "jwks-rsa" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jwks-rsa\");\n\n//# sourceURL=webpack:///external_%22jwks-rsa%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });