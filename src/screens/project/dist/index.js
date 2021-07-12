"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ProjectScreen = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_router_1 = require("react-router");
var kanban_1 = require("screens/kanban");
var epic_1 = require("screens/epic");
var styled_1 = require("@emotion/styled");
var antd_1 = require("antd");
var useRouteType = function () {
    var units = react_router_1.useLocation().pathname.split("/");
    return units[units.length - 1];
};
exports.ProjectScreen = function () {
    var routeType = useRouteType();
    return (react_1["default"].createElement(Container, null,
        react_1["default"].createElement(Aside, null,
            react_1["default"].createElement(antd_1.Menu, { mode: "inline", selectedKeys: [routeType] },
                react_1["default"].createElement(antd_1.Menu.Item, { key: "kanban" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "kanban" }, "\u770B\u677F")),
                react_1["default"].createElement(antd_1.Menu.Item, { key: "epic" },
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "epic" }, "\u4EFB\u52A1\u7EC4")))),
        react_1["default"].createElement(Main, null,
            react_1["default"].createElement(react_router_1.Routes, null,
                react_1["default"].createElement(react_router_1.Route, { path: "/kanban", element: react_1["default"].createElement(kanban_1.KanbanScreen, null) }),
                react_1["default"].createElement(react_router_1.Route, { path: "/epic", element: react_1["default"].createElement(epic_1.EpicScreen, null) }),
                react_1["default"].createElement(react_router_1.Navigate, { to: window.location.pathname + "/kanban", replace: true })))));
};
var Aside = styled_1["default"].aside(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: rgb(244, 245, 247);\n  display: flex;\n"], ["\n  background-color: rgb(244, 245, 247);\n  display: flex;\n"])));
var Main = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);\n  display: flex;\n  overflow: hidden;\n"], ["\n  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);\n  display: flex;\n  overflow: hidden;\n"])));
var Container = styled_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 16rem 1fr;\n  width: 100%;\n"], ["\n  display: grid;\n  grid-template-columns: 16rem 1fr;\n  width: 100%;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
