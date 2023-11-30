"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchForm_1 = __importDefault(require("./components/SearchForm"));
const SearchResults_1 = __importDefault(require("./components/SearchResults"));
const useSearch_1 = __importDefault(require("./hook/useSearch"));
const ErrorBoundary_1 = __importDefault(require("./error/ErrorBoundary"));
require("./App.css");
const App = () => {
    const { searchResult, loading, performSearch } = (0, useSearch_1.default)();
    return (react_1.default.createElement(ErrorBoundary_1.default, null,
        react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement(SearchForm_1.default, { onSubmit: performSearch }),
            loading && react_1.default.createElement("p", null, "Loading..."),
            searchResult && react_1.default.createElement(SearchResults_1.default, { results: searchResult }))));
};
exports.default = App;
