"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDelete = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _SetPageTitle = require("../SetPageTitle");
var _auth = require("firebase/auth");
var _Fireact = require("../Fireact");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const UserDelete = () => {
  const [email, setEmail] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)(null);
  const [processing, setProcessing] = (0, _react.useState)(false);
  const title = "Delete Account";
  const navigate = (0, _reactRouterDom.useNavigate)();
  const auth = (0, _auth.getAuth)();
  const {
    config
  } = (0, _react.useContext)(_Fireact.FireactContext);
  const pathnames = config.pathnames;
  return /*#__PURE__*/_react.default.createElement(_material.Container, {
    maxWidth: "md"
  }, /*#__PURE__*/_react.default.createElement(_SetPageTitle.SetPageTitle, {
    title: title
  }), /*#__PURE__*/_react.default.createElement(_material.Paper, null, /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    component: "h1",
    variant: "h4",
    align: "center"
  }, title)), error !== null && /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, error)), /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, null, "Please confirm your email address to delete your user account."), /*#__PURE__*/_react.default.createElement(_material.TextField, {
    required: true,
    fullWidth: true,
    name: "email",
    label: "Email Address",
    type: "email",
    autoComplete: "email",
    margin: "normal",
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    p: 2
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    color: "secondary",
    variant: "outlined",
    disabled: processing,
    onClick: () => {
      navigate(pathnames.UserProfile);
    }
  }, "Back")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    color: "error",
    variant: "contained",
    disabled: processing,
    onClick: () => {
      setProcessing(true);
      setError(null);
      if (auth.currentUser.email !== email) {
        setError("The email address does not match with your email address.");
        setProcessing(false);
      } else {
        (0, _auth.deleteUser)(auth.currentUser).then(() => {
          // refresh page
          document.location.href = "/";
        }).catch(error => {
          switch (error.code) {
            case "auth/requires-recent-login":
              setError("This operation is sensitive and requires recent authentication. Log in again before retrying this request.");
              break;
            default:
              setError(error.message);
              break;
          }
          setProcessing(false);
        });
      }
    }
  }, "Delete User Account"))))));
};
exports.UserDelete = UserDelete;