"use strict";
exports.__esModule = true;
exports.useTasksModal = exports.useTasksQueryKey = exports.useTasksSearchParams = exports.useKanbansQueryKey = exports.useKanbanSearchParams = exports.useProjectInUrl = exports.useProjectIdInUrl = void 0;
var react_router_1 = require("react-router");
var project_1 = require("utils/project");
var url_1 = require("utils/url");
var react_1 = require("react");
var task_1 = require("utils/task");
var utils_1 = require("utils");
exports.useProjectIdInUrl = function () {
    var _a;
    var pathname = react_router_1.useLocation().pathname;
    var id = (_a = pathname.match(/projects\/(\d+)/)) === null || _a === void 0 ? void 0 : _a[1];
    return Number(id);
};
exports.useProjectInUrl = function () { return project_1.useProject(exports.useProjectIdInUrl()); };
exports.useKanbanSearchParams = function () { return ({ projectId: exports.useProjectIdInUrl() }); };
exports.useKanbansQueryKey = function () { return ["kanbans", exports.useKanbanSearchParams()]; };
exports.useTasksSearchParams = function () {
    var _a = url_1.useUrlQueryParam([
        "name",
        "typeId",
        "processorId",
        "tagId",
    ]), param = _a[0], setParam = _a[1];
    var projectId = exports.useProjectIdInUrl();
    var debouncedName = utils_1.useDebounce(param.name, 200);
    return react_1.useMemo(function () { return ({
        projectId: projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: debouncedName
    }); }, [projectId, param, debouncedName]);
};
exports.useTasksQueryKey = function () { return ["tasks", exports.useTasksSearchParams()]; };
exports.useTasksModal = function () {
    var _a = url_1.useUrlQueryParam([
        "editingTaskId",
    ]), editingTaskId = _a[0].editingTaskId, setEditingTaskId = _a[1];
    var _b = task_1.useTask(Number(editingTaskId)), editingTask = _b.data, isLoading = _b.isLoading;
    var startEdit = react_1.useCallback(function (id) {
        setEditingTaskId({ editingTaskId: id });
    }, [setEditingTaskId]);
    var close = react_1.useCallback(function () {
        setEditingTaskId({ editingTaskId: "" });
    }, [setEditingTaskId]);
    return {
        editingTaskId: editingTaskId,
        editingTask: editingTask,
        startEdit: startEdit,
        close: close,
        isLoading: isLoading
    };
};
