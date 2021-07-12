"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ColumnsContainer = exports.useDragEnd = exports.KanbanScreen = void 0;
var react_1 = require("react");
var utils_1 = require("utils");
var util_1 = require("screens/kanban/util");
var kanban_column_1 = require("screens/kanban/kanban-column");
var styled_1 = require("@emotion/styled");
var kanban_1 = require("utils/kanban");
var search_panel_1 = require("screens/kanban/search-panel");
var lib_1 = require("components/lib");
var task_1 = require("utils/task");
var antd_1 = require("antd");
var create_kanban_1 = require("screens/kanban/create-kanban");
var task_modal_1 = require("screens/kanban/task-modal");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var drag_and_drop_1 = require("components/drag-and-drop");
exports.KanbanScreen = function () {
    utils_1.useDocumentTitle("看板列表");
    var currentProject = util_1.useProjectInUrl().data;
    var _a = kanban_1.useKanbans(util_1.useKanbanSearchParams()), kanbans = _a.data, kanbanIsLoading = _a.isLoading;
    var taskIsLoading = task_1.useTasks(util_1.useTasksSearchParams()).isLoading;
    var isLoading = taskIsLoading || kanbanIsLoading;
    var onDragEnd = exports.useDragEnd();
    return (react_1["default"].createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: onDragEnd },
        react_1["default"].createElement(lib_1.ScreenContainer, null,
            react_1["default"].createElement("h1", null, currentProject === null || currentProject === void 0 ? void 0 :
                currentProject.name,
                "\u770B\u677F"),
            react_1["default"].createElement(search_panel_1.SearchPanel, null),
            isLoading ? (react_1["default"].createElement(antd_1.Spin, { size: "large" })) : (react_1["default"].createElement(exports.ColumnsContainer, null,
                react_1["default"].createElement(drag_and_drop_1.Drop, { type: "COLUMN", direction: "horizontal", droppableId: "kanban" },
                    react_1["default"].createElement(drag_and_drop_1.DropChild, { style: { display: "flex" } }, kanbans === null || kanbans === void 0 ? void 0 : kanbans.map(function (kanban, index) { return (react_1["default"].createElement(drag_and_drop_1.Drag, { key: kanban.id, draggableId: "kanban" + kanban.id, index: index },
                        react_1["default"].createElement(kanban_column_1.KanbanColumn, { kanban: kanban, key: kanban.id }))); }))),
                react_1["default"].createElement(create_kanban_1.CreateKanban, null))),
            react_1["default"].createElement(task_modal_1.TaskModal, null))));
};
exports.useDragEnd = function () {
    var kanbans = kanban_1.useKanbans(util_1.useKanbanSearchParams()).data;
    var reorderKanban = kanban_1.useReorderKanban(util_1.useKanbansQueryKey()).mutate;
    var reorderTask = task_1.useReorderTask(util_1.useTasksQueryKey()).mutate;
    var _a = task_1.useTasks(util_1.useTasksSearchParams()).data, allTasks = _a === void 0 ? [] : _a;
    return react_1.useCallback(function (_a) {
        var source = _a.source, destination = _a.destination, type = _a.type;
        if (!destination) {
            return;
        }
        // 看板排序
        if (type === "COLUMN") {
            var fromId = kanbans === null || kanbans === void 0 ? void 0 : kanbans[source.index].id;
            var toId = kanbans === null || kanbans === void 0 ? void 0 : kanbans[destination.index].id;
            if (!fromId || !toId || fromId === toId) {
                return;
            }
            var type_1 = destination.index > source.index ? "after" : "before";
            reorderKanban({ fromId: fromId, referenceId: toId, type: type_1 });
        }
        if (type === "ROW") {
            var fromKanbanId_1 = +source.droppableId;
            var toKanbanId_1 = +destination.droppableId;
            if (fromKanbanId_1 === toKanbanId_1) {
                return;
            }
            var fromTask = allTasks.filter(function (task) { return task.kanbanId === fromKanbanId_1; })[source.index];
            var toTask = allTasks.filter(function (task) { return task.kanbanId === toKanbanId_1; })[destination.index];
            if ((fromTask === null || fromTask === void 0 ? void 0 : fromTask.id) === (toTask === null || toTask === void 0 ? void 0 : toTask.id)) {
                return;
            }
            reorderTask({
                fromId: fromTask === null || fromTask === void 0 ? void 0 : fromTask.id,
                referenceId: toTask === null || toTask === void 0 ? void 0 : toTask.id,
                fromKanbanId: fromKanbanId_1,
                toKanbanId: toKanbanId_1,
                type: fromKanbanId_1 === toKanbanId_1 && destination.index > source.index
                    ? "after"
                    : "before"
            });
        }
    }, [kanbans, reorderKanban, allTasks, reorderTask]);
};
exports.ColumnsContainer = styled_1["default"]("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  overflow-x: scroll;\n  flex: 1;\n"], ["\n  display: flex;\n  overflow-x: scroll;\n  flex: 1;\n"])));
var templateObject_1;
