"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.Container = exports.KanbanColumn = void 0;
var react_1 = require("react");
var task_type_1 = require("utils/task-type");
var task_svg_1 = require("assets/task.svg");
var bug_svg_1 = require("assets/bug.svg");
var styled_1 = require("@emotion/styled");
var antd_1 = require("antd");
var task_1 = require("utils/task");
var util_1 = require("screens/kanban/util");
var create_task_1 = require("screens/kanban/create-task");
var mark_1 = require("components/mark");
var kanban_1 = require("utils/kanban");
var lib_1 = require("components/lib");
var drag_and_drop_1 = require("components/drag-and-drop");
var TaskTypeIcon = function (_a) {
    var _b;
    var id = _a.id;
    var taskTypes = task_type_1.useTaskTypes().data;
    var name = (_b = taskTypes === null || taskTypes === void 0 ? void 0 : taskTypes.find(function (taskType) { return taskType.id === id; })) === null || _b === void 0 ? void 0 : _b.name;
    if (!name) {
        return null;
    }
    return react_1["default"].createElement("img", { alt: "task-icon", src: name === "task" ? task_svg_1["default"] : bug_svg_1["default"] });
};
var TaskCard = function (_a) {
    var task = _a.task;
    var startEdit = util_1.useTasksModal().startEdit;
    var keyword = util_1.useTasksSearchParams().name;
    return (react_1["default"].createElement(antd_1.Card, { onClick: function () { return startEdit(task.id); }, style: { marginBottom: "0.5rem", cursor: "pointer" }, key: task.id },
        react_1["default"].createElement("p", null,
            react_1["default"].createElement(mark_1.Mark, { keyword: keyword, name: task.name })),
        react_1["default"].createElement(TaskTypeIcon, { id: task.typeId })));
};
exports.KanbanColumn = react_1["default"].forwardRef(function (_a, ref) {
    var kanban = _a.kanban, props = __rest(_a, ["kanban"]);
    var allTasks = task_1.useTasks(util_1.useTasksSearchParams()).data;
    var tasks = allTasks === null || allTasks === void 0 ? void 0 : allTasks.filter(function (task) { return task.kanbanId === kanban.id; });
    return (react_1["default"].createElement(exports.Container, __assign({}, props, { ref: ref }),
        react_1["default"].createElement(lib_1.Row, { between: true },
            react_1["default"].createElement("h3", null, kanban.name),
            react_1["default"].createElement(More, { kanban: kanban, key: kanban.id })),
        react_1["default"].createElement(TasksContainer, null,
            react_1["default"].createElement(drag_and_drop_1.Drop, { type: "ROW", direction: "vertical", droppableId: String(kanban.id) },
                react_1["default"].createElement(drag_and_drop_1.DropChild, { style: { minHeight: "1rem" } }, tasks === null || tasks === void 0 ? void 0 : tasks.map(function (task, taskIndex) { return (react_1["default"].createElement(drag_and_drop_1.Drag, { key: task.id, index: taskIndex, draggableId: "task" + task.id },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(TaskCard, { key: task.id, task: task })))); }))),
            react_1["default"].createElement(create_task_1.CreateTask, { kanbanId: kanban.id }))));
});
var More = function (_a) {
    var kanban = _a.kanban;
    var mutateAsync = kanban_1.useDeleteKanban(util_1.useKanbansQueryKey()).mutateAsync;
    var startDelete = function () {
        antd_1.Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            title: "确定删除看板吗",
            onOk: function () {
                return mutateAsync({ id: kanban.id });
            }
        });
    };
    var overlay = (react_1["default"].createElement(antd_1.Menu, null,
        react_1["default"].createElement(antd_1.Menu.Item, null,
            react_1["default"].createElement(antd_1.Button, { type: "link", onClick: startDelete }, "\u5220\u9664"))));
    return (react_1["default"].createElement(antd_1.Dropdown, { overlay: overlay },
        react_1["default"].createElement(antd_1.Button, { type: "link" }, "...")));
};
exports.Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-width: 27rem;\n  border-radius: 6px;\n  background-color: rgb(244, 245, 247);\n  display: flex;\n  flex-direction: column;\n  padding: 0.7rem 0.7rem 1rem;\n  margin-right: 1.5rem;\n"], ["\n  min-width: 27rem;\n  border-radius: 6px;\n  background-color: rgb(244, 245, 247);\n  display: flex;\n  flex-direction: column;\n  padding: 0.7rem 0.7rem 1rem;\n  margin-right: 1.5rem;\n"])));
var TasksContainer = styled_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  overflow: scroll;\n  flex: 1;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"], ["\n  overflow: scroll;\n  flex: 1;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"])));
var templateObject_1, templateObject_2;
