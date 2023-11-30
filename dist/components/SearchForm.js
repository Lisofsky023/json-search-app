"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_input_mask_1 = __importDefault(require("react-input-mask"));
const InputMaskWithRef = (0, react_1.forwardRef)((props, ref) => react_1.default.createElement(react_input_mask_1.default, Object.assign({}, props, { inputRef: ref })));
const SearchForm = ({ onSubmit }) => {
    const inputRef = (0, react_1.useRef)(null);
    const [email, setEmail] = (0, react_1.useState)('');
    const [number, setNumber] = (0, react_1.useState)('');
    const [emailError, setEmailError] = (0, react_1.useState)('');
    const [numberError, setNumberError] = (0, react_1.useState)('');
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            return;
        }
        setEmailError('');
        if (number && number.includes('_')) {
            setNumberError('Please complete the number field');
            return;
        }
        setNumberError('');
        // Trigger onSubmit prop with email and number values
        onSubmit({ email, number });
    };
    // Handle changes in the number input
    const handleNumberChange = (e) => {
        const newValue = e.target.value;
        setNumber(newValue);
        // Clear number error if field is fully filled
        if (!newValue.includes('_')) {
            setNumberError('');
        }
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit },
        react_1.default.createElement("label", null, "Email:"),
        react_1.default.createElement("input", { type: "email", value: email, onChange: (e) => {
                setEmail(e.target.value);
                setEmailError('');
            }, required: true }),
        emailError && react_1.default.createElement("p", { style: { color: 'red' } }, emailError),
        react_1.default.createElement("label", null, "Number:"),
        react_1.default.createElement(InputMaskWithRef, { ref: inputRef, mask: "99-99-99", maskChar: "_", value: number, onChange: handleNumberChange }),
        numberError && react_1.default.createElement("p", { style: { color: 'red' } }, numberError),
        react_1.default.createElement("button", { type: "submit" }, "Submit")));
};
exports.default = SearchForm;
