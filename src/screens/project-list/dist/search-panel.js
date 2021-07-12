"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.SearchPanel = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var user_select_1 = require("components/user-select");
exports.SearchPanel = function (_a) {
    var users = _a.users, param = _a.param, setParam = _a.setParam;
    return (react_1["default"].createElement(antd_1.Form, { style: { marginBottom: "2rem" }, layout: "inline" },
        react_1["default"].createElement(antd_1.Form.Item, null,
            react_1["default"].createElement(antd_1.Input, { placeholder: "项目名", type: "text", value: param.name, onChange: function (evt) {
                    return setParam(__assign(__assign({}, param), { name: evt.target.value }));
                } })),
        react_1["default"].createElement(antd_1.Form.Item, null,
            react_1["default"].createElement(user_select_1.UserSelect, { defaultOptionName: "负责人", value: param.personId, onChange: function (value) {
                    return setParam(__assign(__assign({}, param), { personId: value }));
                } }))));
};
