"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useSearch = () => {
    const [searchResult, setSearchResult] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [abortController, setAbortController] = (0, react_1.useState)(new AbortController());
    const [requestInProgress, setRequestInProgress] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        return () => abortController.abort();
    }, [abortController]);
    // Function to perform the search
    const performSearch = ({ email, number }) => __awaiter(void 0, void 0, void 0, function* () {
        // Cancel ongoing request if there is one
        if (requestInProgress) {
            abortController.abort();
        }
        setRequestInProgress(true);
        setLoading(true);
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        try {
            // Making the API request
            const response = yield fetch('http://localhost:8000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, number }),
                signal: newAbortController.signal,
            });
            // Handling request cancellation
            if (response.status === 499) {
                console.log('Request was canceled');
                return;
            }
            // Processing the response
            const result = yield response.json();
            // Setting the search result or error
            if (result && result.result) {
                setSearchResult(result.result);
            }
            else {
                setSearchResult([{ message: 'Unexpected response format' }]);
            }
        }
        catch (error) {
            // Handling fetch errors
            if ((error === null || error === void 0 ? void 0 : error.name) === 'AbortError') {
                console.log('Request was canceled');
                return;
            }
            setSearchResult([{ message: 'Error during search' }]);
        }
        finally {
            // Final state updates after request completion or failure
            if (!newAbortController.signal.aborted) {
                setLoading(false);
            }
            setRequestInProgress(false);
        }
    });
    return { searchResult, loading, performSearch };
};
exports.default = useSearch;
