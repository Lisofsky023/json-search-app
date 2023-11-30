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
exports.startSearch = void 0;
const searchService_1 = require("../services/searchService");
let currentRequestTimeout = null;
const startSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentRequestTimeout) {
        clearTimeout(currentRequestTimeout);
        currentRequestTimeout = null;
    }
    currentRequestTimeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, number } = req.body;
            console.log('Server received search request:', { email, number });
            const result = yield (0, searchService_1.jsonSearch)(email, number);
            console.log('Server search result:', result);
            res.json({ result });
        }
        catch (error) {
            handleError(error, res);
        }
    }), 5000);
});
exports.startSearch = startSearch;
function handleError(error, res) {
    if (error instanceof Error && error.message === 'Request canceled') {
        console.log('Request was canceled');
    }
    else {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
