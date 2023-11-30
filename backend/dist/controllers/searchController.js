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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSearch = void 0;
const searchService_1 = require("../services/searchService");
const joi_1 = __importDefault(require("joi"));
// Used for canceling the previous search request
let currentRequestTimeout = null;
// Schema for request validation using Joi
const searchRequestSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    number: joi_1.default.string().pattern(new RegExp('^[0-9]{2}-[0-9]{2}-[0-9]{2}$')).allow(''),
});
const startSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = searchRequestSchema.validate(req.body);
    if (error) {
        console.log('Validation error:', error.details);
        return res.status(400).json({ error: error.details[0].message });
    }
    // Cancel the previous timeout if it exists
    if (currentRequestTimeout) {
        clearTimeout(currentRequestTimeout);
        currentRequestTimeout = null;
    }
    // Set a new timeout for simulating delayed response
    currentRequestTimeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, number } = req.body;
            const result = yield (0, searchService_1.jsonSearch)(email, number);
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
