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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.List = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var dayjs_1 = require("dayjs");
// react-router 和 react-router-dom的关系，类似于 react 和 react-dom/react-native/react-vr...
var react_router_dom_1 = require("react-router-dom");
var pin_1 = require("components/pin");
var project_1 = require("utils/project");
var lib_1 = require("components/lib");
var util_1 = require("screens/project-list/util");
exports.List = function (_a) {
    var users = _a.users, props = __rest(_a, ["users"]);
    var mutate = project_1.useEditProject(util_1.useProjectsQueryKey()).mutate;
    var pinProject = function (id) { return function (pin) { return mutate({ id: id, pin: pin }); }; };
    return (react_1["default"].createElement(antd_1.Table, __assign({ rowKey: "id", pagination: false, columns: [
            {
                title: react_1["default"].createElement(pin_1.Pin, { checked: true, disabled: true }),
                render: function (value, project) {
                    return (react_1["default"].createElement(pin_1.Pin, { checked: project.pin, onCheckedChange: pinProject(project.id) }));
                }
            },
            {
                title: "名称",
                sorter: function (a, b) { return a.name.localeCompare(b.name); },
                render: function (value, project) {
                    return react_1["default"].createElement(react_router_dom_1.Link, { to: String(project.id) }, project.name);
                }
            },
            {
                title: "部门",
                dataIndex: "organization"
            },
            {
                title: "负责人",
                render: function (value, project) {
                    var _a;
                    return (react_1["default"].createElement("span", null, ((_a = users.find(function (user) { return user.id === project.personId; })) === null || _a === void 0 ? void 0 : _a.name) ||
                        "未知"));
                }
            },
            {
                title: "创建时间",
                render: function (value, project) {
                    return (react_1["default"].createElement("span", null, project.created
                        ? dayjs_1["default"](project.created).format("YYYY-MM-DD")
                        : "无"));
                }
            },
            {
                render: function (value, project) {
                    return react_1["default"].createElement(More, { project: project });
                }
            },
        ] }, props)));
};
var More = function (_a) {
    var project = _a.project;
    var startEdit = util_1.useProjectModal().startEdit;
    var editProject = function (id) { return function () { return startEdit(id); }; };
    var deleteProject = project_1.useDeleteProject(util_1.useProjectsQueryKey()).mutate;
    var confirmDeleteProject = function (id) {
        antd_1.Modal.confirm({
            title: "确定删除这个项目吗?",
            content: "点击确定删除",
            okText: "确定",
            onOk: function () {
                deleteProject({ id: id });
            }
        });
    };
    return (react_1["default"].createElement(antd_1.Dropdown, { overlay: react_1["default"].createElement(antd_1.Menu, null,
            react_1["default"].createElement(antd_1.Menu.Item, { onClick: editProject(project.id), key: "edit" }, "\u7F16\u8F91"),
            react_1["default"].createElement(antd_1.Menu.Item, { onClick: function () { return confirmDeleteProject(project.id); }, key: "delete" }, "\u5220\u9664")) },
        react_1["default"].createElement(lib_1.ButtonNoPadding, { type: "link" }, "...")));
};
