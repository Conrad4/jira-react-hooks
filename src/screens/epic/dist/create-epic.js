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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CreateEpic = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var styled_1 = require("@emotion/styled");
var lib_1 = require("components/lib");
var epic_1 = require("utils/epic");
var util_1 = require("screens/epic/util");
var util_2 = require("screens/kanban/util");
exports.CreateEpic = function (props) {
    var _a = epic_1.useAddEpic(util_1.useEpicsQueryKey()), addEpic = _a.mutate, isLoading = _a.isLoading, error = _a.error;
    var form = antd_1.Form.useForm()[0];
    var projectId = util_2.useProjectIdInUrl();
    var onFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addEpic(__assign(__assign({}, values), { projectId: projectId }))];
                case 1:
                    _a.sent();
                    props.onClose();
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        form.resetFields();
    }, [form, props.visible]);
    return (react_1["default"].createElement(antd_1.Drawer, { visible: props.visible, onClose: props.onClose, forceRender: true, destroyOnClose: true, width: "100%" },
        react_1["default"].createElement(Container, null, isLoading ? (react_1["default"].createElement(antd_1.Spin, { size: "large" })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("h1", null, "\u521B\u5EFA\u4EFB\u52A1\u7EC4"),
            react_1["default"].createElement(lib_1.ErrorBox, { error: error }),
            react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", style: { width: "40rem" }, onFinish: onFinish },
                react_1["default"].createElement(antd_1.Form.Item, { label: "名称", name: "name", rules: [{ required: true, message: "请输入任务组名" }] },
                    react_1["default"].createElement(antd_1.Input, { placeholder: "请输入任务组名称" })),
                react_1["default"].createElement(antd_1.Form.Item, { style: { textAlign: "right" } },
                    react_1["default"].createElement(antd_1.Button, { loading: isLoading, type: "primary", htmlType: "submit" }, "\u63D0\u4EA4"))))))));
};
var Container = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"], ["\n  height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"])));
var templateObject_1;
