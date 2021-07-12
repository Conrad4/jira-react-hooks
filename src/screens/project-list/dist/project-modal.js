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
exports.__esModule = true;
exports.ProjectModal = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var util_1 = require("screens/project-list/util");
var user_select_1 = require("components/user-select");
var project_1 = require("utils/project");
var lib_1 = require("components/lib");
var styled_1 = require("@emotion/styled");
exports.ProjectModal = function () {
    var _a = util_1.useProjectModal(), projectModalOpen = _a.projectModalOpen, close = _a.close, editingProject = _a.editingProject, isLoading = _a.isLoading;
    var useMutateProject = editingProject ? project_1.useEditProject : project_1.useAddProject;
    var _b = useMutateProject(util_1.useProjectsQueryKey()), mutateAsync = _b.mutateAsync, error = _b.error, mutateLoading = _b.isLoading;
    var form = antd_1.Form.useForm()[0];
    var onFinish = function (values) {
        mutateAsync(__assign(__assign({}, editingProject), values)).then(function () {
            form.resetFields();
            close();
        });
    };
    var closeModal = function () {
        form.resetFields();
        close();
    };
    var title = editingProject ? "编辑项目" : "创建项目";
    react_1.useEffect(function () {
        form.setFieldsValue(editingProject);
    }, [editingProject, form]);
    return (react_1["default"].createElement(antd_1.Drawer, { forceRender: true, onClose: closeModal, visible: projectModalOpen, width: "100%" },
        react_1["default"].createElement(Container, null, isLoading ? (react_1["default"].createElement(antd_1.Spin, { size: "large" })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("h1", null, title),
            react_1["default"].createElement(lib_1.ErrorBox, { error: error }),
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", style: { width: "40rem" }, onFinish: onFinish },
                react_1["default"].createElement(antd_1.Form.Item, { label: "名称", name: "name", rules: [{ required: true, message: "请输入项目名" }] },
                    react_1["default"].createElement(antd_1.Input, { placeholder: "请输入项目名称" })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "部门", name: "organization", rules: [{ required: true, message: "请输入部门名" }] },
                    react_1["default"].createElement(antd_1.Input, { placeholder: "请输入部门名" })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "负责人", name: "personId" },
                    react_1["default"].createElement(user_select_1.UserSelect, { defaultOptionName: "负责人" })),
                react_1["default"].createElement(antd_1.Form.Item, { style: { textAlign: "right" } },
                    react_1["default"].createElement(antd_1.Button, { loading: mutateLoading, type: "primary", htmlType: "submit" }, "\u63D0\u4EA4"))))))));
};
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));
var templateObject_1;
