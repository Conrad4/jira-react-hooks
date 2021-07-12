"use strict";
exports.__esModule = true;
exports.EpicScreen = void 0;
var react_1 = require("react");
var lib_1 = require("components/lib");
var util_1 = require("screens/kanban/util");
var epic_1 = require("utils/epic");
var antd_1 = require("antd");
var dayjs_1 = require("dayjs");
var task_1 = require("utils/task");
var react_router_dom_1 = require("react-router-dom");
var util_2 = require("screens/epic/util");
var create_epic_1 = require("screens/epic/create-epic");
exports.EpicScreen = function () {
    var currentProject = util_1.useProjectInUrl().data;
    var epics = epic_1.useEpics(util_2.useEpicSearchParams()).data;
    var tasks = task_1.useTasks({ projectId: currentProject === null || currentProject === void 0 ? void 0 : currentProject.id }).data;
    var deleteEpic = epic_1.useDeleteEpic(util_2.useEpicsQueryKey()).mutate;
    var _a = react_1.useState(false), epicCreateOpen = _a[0], setEpicCreateOpen = _a[1];
    var confirmDeleteEpic = function (epic) {
        antd_1.Modal.confirm({
            title: "\u786E\u5B9A\u5220\u9664\u9879\u76EE\u7EC4\uFF1A" + epic.name,
            content: "点击确定删除",
            okText: "确定",
            onOk: function () {
                deleteEpic({ id: epic.id });
            }
        });
    };
    return (react_1["default"].createElement(lib_1.ScreenContainer, null,
        react_1["default"].createElement(lib_1.Row, { between: true },
            react_1["default"].createElement("h1", null, currentProject === null || currentProject === void 0 ? void 0 :
                currentProject.name,
                "\u4EFB\u52A1\u7EC4"),
            react_1["default"].createElement(antd_1.Button, { onClick: function () { return setEpicCreateOpen(true); }, type: "link" }, "\u521B\u5EFA\u4EFB\u52A1\u7EC4")),
        react_1["default"].createElement(antd_1.List, { style: { overflow: "scroll" }, dataSource: epics, itemLayout: "vertical", renderItem: function (epic) { return (react_1["default"].createElement(antd_1.List.Item, null,
                react_1["default"].createElement(antd_1.List.Item.Meta, { title: react_1["default"].createElement(lib_1.Row, { between: true },
                        react_1["default"].createElement("span", null, epic.name),
                        react_1["default"].createElement(antd_1.Button, { onClick: function () { return confirmDeleteEpic(epic); }, type: "link" }, "\u5220\u9664")), description: react_1["default"].createElement("div", null,
                        react_1["default"].createElement("div", null,
                            "\u5F00\u59CB\u65F6\u95F4\uFF1A",
                            dayjs_1["default"](epic.start).format("YYYY-MM-DD")),
                        react_1["default"].createElement("div", null,
                            "\u7ED3\u675F\u65F6\u95F4\uFF1A",
                            dayjs_1["default"](epic.end).format("YYYY-MM-DD"))) }),
                react_1["default"].createElement("div", null, tasks === null || tasks === void 0 ? void 0 : tasks.filter(function (task) { return task.epicId === epic.id; }).map(function (task) { return (react_1["default"].createElement(react_router_dom_1.Link, { to: "/projects/" + (currentProject === null || currentProject === void 0 ? void 0 : currentProject.id) + "/kanban?editingTaskId=" + task.id, key: task.id }, task.name)); })))); } }),
        react_1["default"].createElement(create_epic_1.CreateEpic, { onClose: function () { return setEpicCreateOpen(false); }, visible: epicCreateOpen })));
};
