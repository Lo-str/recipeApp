"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint config
var js_1 = require("@eslint/js");
var typescript_eslint_1 = require("typescript-eslint");
exports.default = typescript_eslint_1.default.config.apply(typescript_eslint_1.default, __spreadArray(__spreadArray([{
        ignores: ["dist/**", "node_modules/**"],
    },
    js_1.default.configs.recommended], typescript_eslint_1.default.configs.recommendedTypeChecked, false), [{
        files: ["src/**/*.ts"],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            // No implicit/unsafe any style
            "@typescript-eslint/no-explicit-any": "error",
            // Consistent arrow functions
            "func-style": ["error", "expression", { allowArrowFunctions: true }],
            "prefer-arrow-callback": "error",
            // No unused vars
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            // Strict equality
            eqeqeq: ["error", "always"],
            // Async/await safety
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": "error",
            // Naming style
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "default",
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                },
                { selector: "typeLike", format: ["PascalCase"] },
            ],
        },
    }], false));
