"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchResults = ({ results, loading }) => {
    if (loading) {
        return react_1.default.createElement("p", null, "Loading...");
    }
    const resultData = Array.isArray(results)
        ? results
        : 'result' in results
            ? results.result
            : [];
    if (!resultData || resultData.length === 0 || ('message' in resultData[0] && resultData[0].message === 'No results found')) {
        return react_1.default.createElement("p", null, "No results found");
    }
    if ('message' in resultData[0] && resultData[0].message === 'Error during search') {
        return react_1.default.createElement("p", null, "Error during search");
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Search Result:"),
        react_1.default.createElement("ul", null, resultData.map((item, index) => (react_1.default.createElement("li", { key: index }, ('email' in item && 'number' in item) ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null,
                "Email: ",
                item.email),
            react_1.default.createElement("p", null,
                "Number: ",
                item.number))) : (react_1.default.createElement("p", null, item.message))))))));
};
exports.default = SearchResults;
