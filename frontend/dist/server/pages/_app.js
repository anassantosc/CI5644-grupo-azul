/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "__barrel_optimize__?names=Alert,Fade!=!./node_modules/@mui/material/index.js":
/*!************************************************************************************!*\
  !*** __barrel_optimize__?names=Alert,Fade!=!./node_modules/@mui/material/index.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Alert: () => (/* reexport default from dynamic */ _Alert__WEBPACK_IMPORTED_MODULE_0___default.a),\n/* harmony export */   Fade: () => (/* reexport safe */ _Fade__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Alert */ \"./node_modules/@mui/material/node/Alert/index.js\");\n/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Alert__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fade */ \"./node_modules/@mui/material/node/Fade/index.js\");\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX19iYXJyZWxfb3B0aW1pemVfXz9uYW1lcz1BbGVydCxGYWRlIT0hLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDMEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcz9lNWI1Il0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBBbGVydCB9IGZyb20gXCIuL0FsZXJ0XCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRmFkZSB9IGZyb20gXCIuL0ZhZGVcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///__barrel_optimize__?names=Alert,Fade!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "./src/context/AlertContext.js":
/*!*************************************!*\
  !*** ./src/context/AlertContext.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AlertProvider: () => (/* binding */ AlertProvider),\n/* harmony export */   useAlert: () => (/* binding */ useAlert)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Alert_Fade_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Alert,Fade!=!@mui/material */ \"__barrel_optimize__?names=Alert,Fade!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst AlertContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useAlert = ()=>{\n    try {\n        const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AlertContext);\n        if (!context) {\n            throw new Error(\"useAlert must be used within an AlertProvider\");\n        }\n        return context;\n    } catch (error) {\n        console.error(error);\n    }\n};\nconst AlertProvider = ({ children })=>{\n    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [severity, setSeverity] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"info\");\n    const showAlert = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((newMessage, newSeverity = \"info\")=>{\n        setMessage(newMessage);\n        setSeverity(newSeverity);\n        setOpen(true);\n        setTimeout(()=>{\n            setOpen(false);\n        }, 3000);\n    }, [\n        setMessage,\n        setSeverity,\n        setOpen\n    ]);\n    const hideAlert = ()=>{\n        setOpen(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AlertContext.Provider, {\n        value: showAlert,\n        children: [\n            children,\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Fade_mui_material__WEBPACK_IMPORTED_MODULE_3__.Fade, {\n                in: open,\n                timeout: 1000,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Alert_Fade_mui_material__WEBPACK_IMPORTED_MODULE_3__.Alert, {\n                    severity: severity,\n                    onClose: hideAlert,\n                    sx: {\n                        position: \"fixed\",\n                        bottom: 5,\n                        left: 5,\n                        zIndex: 10\n                    },\n                    children: message\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Ana\\\\OneDrive\\\\Documentos\\\\Universidad\\\\Herramientas de Prog en Internet\\\\CI5644-grupo-azul\\\\frontend\\\\src\\\\context\\\\AlertContext.js\",\n                    lineNumber: 45,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Ana\\\\OneDrive\\\\Documentos\\\\Universidad\\\\Herramientas de Prog en Internet\\\\CI5644-grupo-azul\\\\frontend\\\\src\\\\context\\\\AlertContext.js\",\n                lineNumber: 44,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Ana\\\\OneDrive\\\\Documentos\\\\Universidad\\\\Herramientas de Prog en Internet\\\\CI5644-grupo-azul\\\\frontend\\\\src\\\\context\\\\AlertContext.js\",\n        lineNumber: 42,\n        columnNumber: 9\n    }, undefined);\n};\nAlertProvider.propTypes = {\n    children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object)\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC9BbGVydENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFnRjtBQUNwQztBQUNUO0FBRW5DLE1BQU1RLDZCQUFlUCxvREFBYUE7QUFFM0IsTUFBTVEsV0FBVztJQUNwQixJQUFJO1FBQ0EsTUFBTUMsVUFBVVAsaURBQVVBLENBQUNLO1FBQzNCLElBQUksQ0FBQ0UsU0FBUztZQUNWLE1BQU0sSUFBSUMsTUFBTTtRQUNwQjtRQUNBLE9BQU9EO0lBQ1gsRUFBRSxPQUFPRSxPQUFPO1FBQ1pDLFFBQVFELEtBQUssQ0FBQ0E7SUFDbEI7QUFDSixFQUFFO0FBRUssTUFBTUUsZ0JBQWdCLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3RDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHYiwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNjLFNBQVNDLFdBQVcsR0FBR2YsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDZ0IsVUFBVUMsWUFBWSxHQUFHakIsK0NBQVFBLENBQUM7SUFFekMsTUFBTWtCLFlBQVlwQixrREFBV0EsQ0FDekIsQ0FBQ3FCLFlBQVlDLGNBQWMsTUFBTTtRQUM3QkwsV0FBV0k7UUFDWEYsWUFBWUc7UUFDWlAsUUFBUTtRQUVSUSxXQUFXO1lBQ1BSLFFBQVE7UUFDWixHQUFHO0lBQ1AsR0FDQTtRQUFDRTtRQUFZRTtRQUFhSjtLQUFRO0lBR3RDLE1BQU1TLFlBQVk7UUFDZFQsUUFBUTtJQUNaO0lBRUEscUJBQ0ksOERBQUNULGFBQWFtQixRQUFRO1FBQUNDLE9BQU9OOztZQUN6QlA7MEJBQ0QsOERBQUNULGdGQUFJQTtnQkFBQ3VCLElBQUliO2dCQUFNYyxTQUFTOzBCQUNyQiw0RUFBQ3pCLGlGQUFLQTtvQkFDRmUsVUFBVUE7b0JBQ1ZXLFNBQVNMO29CQUNUTSxJQUFJO3dCQUNBQyxVQUFVO3dCQUNWQyxRQUFRO3dCQUNSQyxNQUFNO3dCQUNOQyxRQUFRO29CQUNaOzhCQUVDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS3JCLEVBQUU7QUFFRkosY0FBY3VCLFNBQVMsR0FBRztJQUN0QnRCLFVBQVVSLDBEQUFnQjtBQUM5QiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250ZXh0L0FsZXJ0Q29udGV4dC5qcz80NTU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDYWxsYmFjaywgdXNlQ29udGV4dCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQWxlcnQsIEZhZGUgfSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgUHJvcHR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XHJcblxyXG5jb25zdCBBbGVydENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlQWxlcnQgPSAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KEFsZXJ0Q29udGV4dCk7XHJcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZUFsZXJ0IG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQWxlcnRQcm92aWRlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEFsZXJ0UHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICAgIGNvbnN0IFtzZXZlcml0eSwgc2V0U2V2ZXJpdHldID0gdXNlU3RhdGUoXCJpbmZvXCIpO1xyXG5cclxuICAgIGNvbnN0IHNob3dBbGVydCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgICAgIChuZXdNZXNzYWdlLCBuZXdTZXZlcml0eSA9IFwiaW5mb1wiKSA9PiB7XHJcbiAgICAgICAgICAgIHNldE1lc3NhZ2UobmV3TWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHNldFNldmVyaXR5KG5ld1NldmVyaXR5KTtcclxuICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgW3NldE1lc3NhZ2UsIHNldFNldmVyaXR5LCBzZXRPcGVuXVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBoaWRlQWxlcnQgPSAoKSA9PiB7XHJcbiAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEFsZXJ0Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17c2hvd0FsZXJ0fT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICA8RmFkZSBpbj17b3Blbn0gdGltZW91dD17MTAwMH0+XHJcbiAgICAgICAgICAgICAgICA8QWxlcnRcclxuICAgICAgICAgICAgICAgICAgICBzZXZlcml0eT17c2V2ZXJpdHl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17aGlkZUFsZXJ0fVxyXG4gICAgICAgICAgICAgICAgICAgIHN4PXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHttZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgPC9BbGVydD5cclxuICAgICAgICAgICAgPC9GYWRlPlxyXG4gICAgICAgIDwvQWxlcnRDb250ZXh0LlByb3ZpZGVyPlxyXG4gICAgKTtcclxufTtcclxuXHJcbkFsZXJ0UHJvdmlkZXIucHJvcFR5cGVzID0ge1xyXG4gICAgY2hpbGRyZW46IFByb3B0eXBlcy5vYmplY3QsXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDYWxsYmFjayIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsIkFsZXJ0IiwiRmFkZSIsIlByb3B0eXBlcyIsIkFsZXJ0Q29udGV4dCIsInVzZUFsZXJ0IiwiY29udGV4dCIsIkVycm9yIiwiZXJyb3IiLCJjb25zb2xlIiwiQWxlcnRQcm92aWRlciIsImNoaWxkcmVuIiwib3BlbiIsInNldE9wZW4iLCJtZXNzYWdlIiwic2V0TWVzc2FnZSIsInNldmVyaXR5Iiwic2V0U2V2ZXJpdHkiLCJzaG93QWxlcnQiLCJuZXdNZXNzYWdlIiwibmV3U2V2ZXJpdHkiLCJzZXRUaW1lb3V0IiwiaGlkZUFsZXJ0IiwiUHJvdmlkZXIiLCJ2YWx1ZSIsImluIiwidGltZW91dCIsIm9uQ2xvc2UiLCJzeCIsInBvc2l0aW9uIiwiYm90dG9tIiwibGVmdCIsInpJbmRleCIsInByb3BUeXBlcyIsIm9iamVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/context/AlertContext.js\n");

/***/ }),

/***/ "./src/pages/_app.jsx":
/*!****************************!*\
  !*** ./src/pages/_app.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_AlertContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/AlertContext */ \"./src/context/AlertContext.js\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../styles/global.css */ \"./styles/global.css\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AlertContext__WEBPACK_IMPORTED_MODULE_1__.AlertProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Ana\\\\OneDrive\\\\Documentos\\\\Universidad\\\\Herramientas de Prog en Internet\\\\CI5644-grupo-azul\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n            lineNumber: 8,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Ana\\\\OneDrive\\\\Documentos\\\\Universidad\\\\Herramientas de Prog en Internet\\\\CI5644-grupo-azul\\\\frontend\\\\src\\\\pages\\\\_app.jsx\",\n        lineNumber: 7,\n        columnNumber: 9\n    }, this);\n}\nMyApp.propTypes = {\n    Component: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().elementType).isRequired,\n    pageProps: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object).isRequired\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXdEO0FBQ3JCO0FBQ0E7QUFFcEIsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsRCxxQkFDSSw4REFBQ0osZ0VBQWFBO2tCQUNWLDRFQUFDRztZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBR3BDO0FBRUFGLE1BQU1HLFNBQVMsR0FBRztJQUNkRixXQUFXRiwrREFBcUIsQ0FBQ00sVUFBVTtJQUMzQ0gsV0FBV0gsMERBQWdCLENBQUNNLFVBQVU7QUFDMUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvX2FwcC5qc3g/NGM3NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbGVydFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHQvQWxlcnRDb250ZXh0XCI7XHJcbmltcG9ydCBcIi4vLi4vLi4vc3R5bGVzL2dsb2JhbC5jc3NcIjtcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxBbGVydFByb3ZpZGVyPlxyXG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgPC9BbGVydFByb3ZpZGVyPlxyXG4gICAgKTtcclxufVxyXG5cclxuTXlBcHAucHJvcFR5cGVzID0ge1xyXG4gICAgQ29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudFR5cGUuaXNSZXF1aXJlZCxcclxuICAgIHBhZ2VQcm9wczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG59O1xyXG4iXSwibmFtZXMiOlsiQWxlcnRQcm92aWRlciIsIlByb3BUeXBlcyIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicHJvcFR5cGVzIiwiZWxlbWVudFR5cGUiLCJpc1JlcXVpcmVkIiwib2JqZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.jsx\n");

/***/ }),

/***/ "./styles/global.css":
/*!***************************!*\
  !*** ./styles/global.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "@mui/base/utils":
/*!**********************************!*\
  !*** external "@mui/base/utils" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/base/utils");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system");

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/colorManipulator");

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createStyled");

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createTheme");

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/styleFunctionSx");

/***/ }),

/***/ "@mui/system/useThemeProps":
/*!********************************************!*\
  !*** external "@mui/system/useThemeProps" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/useThemeProps");

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/capitalize");

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/chainPropTypes");

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/composeClasses");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/elementAcceptingRef":
/*!*************************************************!*\
  !*** external "@mui/utils/elementAcceptingRef" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/elementAcceptingRef");

/***/ }),

/***/ "@mui/utils/elementTypeAcceptingRef":
/*!*****************************************************!*\
  !*** external "@mui/utils/elementTypeAcceptingRef" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/elementTypeAcceptingRef");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/generateUtilityClasses");

/***/ }),

/***/ "@mui/utils/integerPropType":
/*!*********************************************!*\
  !*** external "@mui/utils/integerPropType" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/integerPropType");

/***/ }),

/***/ "@mui/utils/refType":
/*!*************************************!*\
  !*** external "@mui/utils/refType" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/refType");

/***/ }),

/***/ "@mui/utils/useEventCallback":
/*!**********************************************!*\
  !*** external "@mui/utils/useEventCallback" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useEventCallback");

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useForkRef");

/***/ }),

/***/ "@mui/utils/useIsFocusVisible":
/*!***********************************************!*\
  !*** external "@mui/utils/useIsFocusVisible" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useIsFocusVisible");

/***/ }),

/***/ "@mui/utils/useTimeout":
/*!****************************************!*\
  !*** external "@mui/utils/useTimeout" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/useTimeout");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("clsx");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-transition-group");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@mui","vendor-chunks/@babel"], () => (__webpack_exec__("./src/pages/_app.jsx")));
module.exports = __webpack_exports__;

})();