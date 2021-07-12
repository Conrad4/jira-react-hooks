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
exports.useProjectModal = exports.useProjectsQueryKey = exports.useProjectsSearchParams = void 0;
var url_1 = require("utils/url");
var react_1 = require("react");
var project_1 = require("utils/project");
// 项目列表搜索的参数
exports.useProjectsSearchParams = function () {
    var _a = url_1.useUrlQueryParam(["name", "personId"]), param = _a[0], setParam = _a[1];
    return [
        react_1.useMemo(function () { return (__assign(__assign({}, param), { personId: Number(param.personId) || undefined })); }, [param]),
        setParam,
    ];
};
exports.useProjectsQueryKey = function () {
    var params = exports.useProjectsSearchParams()[0];
    return ["projects", params];
};
exports.useProjectModal = function () {
    var _a = url_1.useUrlQueryParam([
        "projectCreate",
    ]), projectCreate = _a[0].projectCreate, setProjectCreate = _a[1];
    var _b = url_1.useUrlQueryParam([
        "editingProjectId",
    ]), editingProjectId = _b[0].editingProjectId, setEditingProjectId = _b[1];
    var setUrlParams = url_1.useSetUrlSearchParam();
    var _c = project_1.useProject(Number(editingProjectId)), editingProject = _c.data, isLoading = _c.isLoading;
    var open = function () { return setProjectCreate({ projectCreate: true }); };
    var close = function () { return setUrlParams({ projectCreate: "", editingProjectId: "" }); };
    var startEdit = function (id) {
        return setEditingProjectId({ editingProjectId: id });
    };
    return {
        projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
        open: open,
        close: close,
        startEdit: startEdit,
        editingProject: editingProject,
        isLoading: isLoading
    };
};
