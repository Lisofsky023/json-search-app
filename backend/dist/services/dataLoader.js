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
exports.loadJsonData = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function loadJsonData() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataPath = path_1.default.join(__dirname, '../data/data.json');
        try {
            const rawData = yield promises_1.default.readFile(dataPath, 'utf-8');
            return JSON.parse(rawData);
        }
        catch (error) {
            console.error('Error reading JSON data:', error);
            throw error;
        }
    });
}
exports.loadJsonData = loadJsonData;
