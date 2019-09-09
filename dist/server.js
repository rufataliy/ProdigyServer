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

eval("module.exports = JSON.parse(\"{\\\"type\\\":\\\"service_account\\\",\\\"project_id\\\":\\\"prodigy-b614e\\\",\\\"private_key_id\\\":\\\"332e6136d68391ff4c23ce99b8b11d72c4fd04e2\\\",\\\"private_key\\\":\\\"-----BEGIN PRIVATE KEY-----\\\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDERfjAoX4/EejW\\\\nQJVENKzmQEGI5eOYiV0nCnjHZq9LZ3gWjkrbpcZoZqByia2sbHMb8dFlXqOQT7R1\\\\n2huUMovEeG+IIkXnVQOXik0ThUcyPM9ZMfEmmDSYQJ6xC9tKY2uLGkqxz3Foc3Jr\\\\nhVtrbTih75Fz7oZJZc6aO3yoakv5CK7rRAQIS3cChHp4eFAuPJpYLqd/da7MFq+D\\\\nIDWVLXpV0T0izmXeAEPM7kNOVl8rg18HZgup7NFGA04wgyGaxvJK9sPUC5lhlNNS\\\\nFoxlnFZF5YEYpbSxi3YvC+Om2t+mNHdEgYhrMCdxze+xvKkBDx5+kzzQnsSYNiro\\\\njfATKe+LAgMBAAECggEAAfwAuNapJrNKp45KZ0C7fGFEu43MQ3vxpvX/JJz2kFk0\\\\nDwS439TV10zHIIFUPslvguY3l/VhMZG5h460XeCcJlj4kueUNCa/sFkj0FrpNMPS\\\\noNpvArt7nj9BAeJwNCW7+tF1CEX9pb2zd9mgUMsigHI70tbXISGk+U0F3joJswBA\\\\nuJQjVHAN9+Gm+402JRUqRmt2Chf+dI1oCXK+DV2X5ltinuf/4XOzqdgvjsNBIHgN\\\\nGRn3iWQCec41aIbpd1HqCvC5s/znErOW6V1a3H/TU2ptb7j4u8e3YIi3IoWjLbB8\\\\n0utCadf7DXS36F/un7IVrQSYN+yLboVNfKx4mndQgQKBgQD2SwrFdU6CmL2y2ysY\\\\nNr/xN043q4Kx0pfEJwarHj4zyGZsXTvxmeQEs5ffLDVMwsVrjPqDMZUx1d7rdz5L\\\\nKY3rkK+s86VBovgKJOTckLxXXopNsDclVqo3ZBf1cC9IajUznclSaLepU/7bLzGg\\\\nGJs4DFSGQ/SwrafTQtkLvtb0QQKBgQDMAkIWticQuB8nRl+mMlNCcMzJeutvbyf+\\\\nRSh+IwAYcMtCP3+a4cAr9NireYS3pRlz/7AipI/tjbRWOwnOFanvI4iZRE83DqQy\\\\n5sYxPXeD3y77QD9nHYHU6VyvEYNytpnq8PH1cr+LjCnjVFHG/B1xzdyQfHOeXHq2\\\\nZB6RwCZAywKBgD7zmVI1FJce0UXY7R/oRpEyEKT8CpDHAhGZ5ANy3HVB4KQMBJlR\\\\nO03UVZouY4U2N12xEAreboLpZmwK83okqeiu96geMnwfWoTFP1X9DJbMTE9lHgNG\\\\nLoWv6MvMG9nHg8eoqd+NcnwuQvLlEisYfvwJcsVKs01BZacC7BUrdyfBAoGAeUmC\\\\nZyRGV29PvjbdmN5kl6Sea86zeF26hjYxm8RNQzqT7T/5Kmi6qqd3xYKKf/AdENTb\\\\nr8zscMwFghq5epdwn2cdyBlPiykeP9Dp1c54ZqNiuCd7Sl/Fl4JiAwdDggjDu2Ui\\\\nRM3CyUE8ihXQRKARFV7RmekTh/vtTNB7SCXX2D8CgYEAxdq74uc5Yivf/Z+xzEoN\\\\nskRFM/JXW9hM14ed0wm5qHDh8Y0x7OlBeIOVZs2vYo/cXl5+2ux4EcdbZkKpYo97\\\\n8g9yfQEySNRrD2/x3+PKoozFMhgxPli5oYawrem4vFYH0zHUyfu7toqK2qjjkimj\\\\nWkQ18ujXM8sgn4S/dLG/zAg=\\\\n-----END PRIVATE KEY-----\\\\n\\\",\\\"client_email\\\":\\\"firebase-adminsdk-5i6pd@prodigy-b614e.iam.gserviceaccount.com\\\",\\\"client_id\\\":\\\"108161580343033292316\\\",\\\"auth_uri\\\":\\\"https://accounts.google.com/o/oauth2/auth\\\",\\\"token_uri\\\":\\\"https://oauth2.googleapis.com/token\\\",\\\"auth_provider_x509_cert_url\\\":\\\"https://www.googleapis.com/oauth2/v1/certs\\\",\\\"client_x509_cert_url\\\":\\\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5i6pd%40prodigy-b614e.iam.gserviceaccount.com\\\"}\");\n\n//# sourceURL=webpack:///./src/firebase/firebase-key.json?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar jwt = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n\nvar jwks = __webpack_require__(/*! jwks-rsa */ \"jwks-rsa\");\n\nvar firebaseAdmin = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar serviceAccount = __webpack_require__(/*! ../firebase/firebase-key */ \"./src/firebase/firebase-key.json\");\n\nvar app = express();\napp.use(cors()); // app.use(\"/static\", express.static(path.join(__dirname, 'dist')));\n\napp.use(express[\"static\"]('dist'));\napp.get('*', function (req, res) {\n  res.sendFile(__dirname + \"/index.html\", function (err) {\n    console.log(err + \"error\");\n  });\n});\nvar jwtCheck = jwt({\n  secret: jwks.expressJwtSecret({\n    cache: true,\n    rateLimit: true,\n    jwksRequestsPerMinute: 5,\n    jwksUri: \"https://\".concat(process.env.AUTH0_DOMAIN, \"/.well-known/jwks.json\")\n  }),\n  audience: process.env.AUTH0_API_AUDIENCE,\n  issuer: \"https://\".concat(process.env.AUTH0_DOMAIN, \"/\"),\n  algorithm: 'RS256'\n});\nfirebaseAdmin.initializeApp({\n  credential: firebaseAdmin.credential.cert(serviceAccount),\n  databaseURL: \"https://\".concat(serviceAccount.project_id, \".firebaseio.com\")\n});\napp.get('/firebase', jwtCheck,\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {\n    var uid, firebaseToken;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            uid = req.user.sub;\n            _context.prev = 1;\n            _context.next = 4;\n            return firebaseAdmin.auth().createCustomToken(uid);\n\n          case 4:\n            firebaseToken = _context.sent;\n            res.json({\n              firebaseToken: firebaseToken\n            });\n            _context.next = 11;\n            break;\n\n          case 8:\n            _context.prev = 8;\n            _context.t0 = _context[\"catch\"](1);\n            res.status(500).send({\n              message: 'Something went wrong acquiring a Firebase token.',\n              error: _context.t0\n            });\n\n          case 11:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[1, 8]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\napp.listen(3001, function () {\n  return console.log('Server running on localhost:3001');\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

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