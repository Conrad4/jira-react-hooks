"use strict";
exports.__esModule = true;
exports.ProjectListScreen = void 0;
var react_1 = require("react");
var search_panel_1 = require("screens/project-list/search-panel");
var list_1 = require("screens/project-list/list");
var utils_1 = require("utils");
var project_1 = require("utils/project");
var user_1 = require("utils/user");
var util_1 = require("screens/project-list/util");
var lib_1 = require("components/lib");
// 状态提升可以让组件共享状态，但是容易造成 prop drilling
// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
// https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
exports.ProjectListScreen = function () {
    utils_1.useDocumentTitle("项目列表", false);
    var open = util_1.useProjectModal().open;
    var _a = util_1.useProjectsSearchParams(), param = _a[0], setParam = _a[1];
    var _b = project_1.useProjects(utils_1.useDebounce(param, 200)), isLoading = _b.isLoading, error = _b.error, list = _b.data;
    var users = user_1.useUsers().data;
    return (react_1["default"].createElement(lib_1.ScreenContainer, null,
        react_1["default"].createElement(lib_1.Row, { marginBottom: 2, between: true },
            react_1["default"].createElement("h1", null, "\u9879\u76EE\u5217\u8868"),
            react_1["default"].createElement(lib_1.ButtonNoPadding, { onClick: open, type: "link" }, "\u521B\u5EFA\u9879\u76EE")),
        react_1["default"].createElement(search_panel_1.SearchPanel, { users: users || [], param: param, setParam: setParam }),
        react_1["default"].createElement(lib_1.ErrorBox, { error: error }),
        react_1["default"].createElement(list_1.List, { loading: isLoading, users: users || [], dataSource: list || [] })));
};
exports.ProjectListScreen.whyDidYouRender = false;
