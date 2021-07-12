"use strict";
exports.__esModule = true;
exports.useEpicsQueryKey = exports.useEpicSearchParams = void 0;
var util_1 = require("screens/kanban/util");
exports.useEpicSearchParams = function () { return ({ projectId: util_1.useProjectIdInUrl() }); };
exports.useEpicsQueryKey = function () { return ["epics", exports.useEpicSearchParams()]; };
