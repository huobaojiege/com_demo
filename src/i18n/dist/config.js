"use strict";
exports.__esModule = true;
var i18next_1 = require("i18next");
var react_i18next_1 = require("react-i18next");
var en_json_1 = require("./en.json");
var zh_json_1 = require("./zh.json");
var resources = {
    en: {
        translation: en_json_1["default"]
    },
    zh: {
        translation: zh_json_1["default"]
    }
};
i18next_1["default"].use(react_i18next_1.initReactI18next).init({
    resources: resources,
    lng: "zh",
    interpolation: {
        escapeValue: false
    }
});
exports["default"] = i18next_1["default"];
