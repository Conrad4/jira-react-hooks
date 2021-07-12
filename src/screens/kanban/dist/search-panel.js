"use strict";
exports.__esModule = true;
exports.SearchPanel = void 0;
var react_1 = require("react");
var util_1 = require("screens/kanban/util");
var url_1 = require("utils/url");
var lib_1 = require("components/lib");
var antd_1 = require("antd");
var user_select_1 = require("components/user-select");
var task_type_select_1 = require("components/task-type-select");
exports.SearchPanel = function () {
    var searchParams = util_1.useTasksSearchParams();
    var setSearchParams = url_1.useSetUrlSearchParam();
    var reset = function () {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined
        });
    };
    return (react_1["default"].createElement(lib_1.Row, { marginBottom: 4, gap: true },
        react_1["default"].createElement(antd_1.Input, { style: { width: "20rem" }, placeholder: "任务名", value: searchParams.name, onChange: function (evt) { return setSearchParams({ name: evt.target.value }); } }),
        react_1["default"].createElement(user_select_1.UserSelect, { defaultOptionName: "经办人", value: searchParams.processorId, onChange: function (value) { return setSearchParams({ processorId: value }); } }),
        react_1["default"].createElement(task_type_select_1.TaskTypeSelect, { defaultOptionName: "类型", value: searchParams.typeId, onChange: function (value) { return setSearchParams({ typeId: value }); } }),
        react_1["default"].createElement(antd_1.Button, { onClick: reset }, "\u6E05\u9664\u7B5B\u9009\u5668")));
};
