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
exports.formatNumberForComparison = exports.jsonSearch = void 0;
const dataLoader_1 = require("./dataLoader");
function jsonSearch(email, number) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, dataLoader_1.loadJsonData)();
            if (!data) {
                console.log('No data found');
                return [];
            }
            const result = data.filter((item) => {
                const emailMatches = email ? item.email.toLowerCase().includes(email.toLowerCase()) : true;
                const numberMatches = number ? formatNumberForComparison(item.number) === formatNumberForComparison(number) : true;
                return emailMatches && numberMatches;
            });
            return result;
        }
        catch (error) {
            console.error('Error during data loading or processing:', error);
            throw error;
        }
    });
}
exports.jsonSearch = jsonSearch;
function formatNumberForComparison(phoneNumber) {
    return phoneNumber.replace(/-/g, '').toLowerCase();
}
exports.formatNumberForComparison = formatNumberForComparison;
