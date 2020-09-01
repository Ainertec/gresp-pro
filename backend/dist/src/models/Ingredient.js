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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
/* eslint-disable no-param-reassign */
var mongoose_1 = require("mongoose");
var Item_1 = __importDefault(require("./Item"));
var getItemsCost_1 = __importDefault(require("../utils/getItemsCost"));
var Unit = Object.freeze({
    kilogram: 'g',
    liter: 'ml',
    unity: 'u',
    getUnit: function () {
        var unit = [this.kilogram, this.liter, this.unity];
        return unit;
    },
});
exports.Unit = Unit;
var IngredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    priceUnit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    unit: {
        type: String,
        required: true,
        enum: Object.values(Unit),
    },
    stock: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
Object.assign(IngredientSchema.statics, {
    Unit: Unit,
});
IngredientSchema.post('findOneAndUpdate', function (document) { return __awaiter(void 0, void 0, void 0, function () {
    var ingredientID, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!document) return [3 /*break*/, 3];
                ingredientID = document._id;
                return [4 /*yield*/, Item_1.default.find({
                        'ingredients.material': { $in: ingredientID },
                    })];
            case 1:
                items = _a.sent();
                return [4 /*yield*/, Promise.all(items.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var cost;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!item.ingredients) return [3 /*break*/, 3];
                                    return [4 /*yield*/, getItemsCost_1.default(item.ingredients)];
                                case 1:
                                    cost = _a.sent();
                                    item.cost = cost;
                                    return [4 /*yield*/, item.save()];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
IngredientSchema.post('findOneAndRemove', function (document) { return __awaiter(void 0, void 0, void 0, function () {
    var ingredientID_1, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!document) return [3 /*break*/, 3];
                ingredientID_1 = document._id;
                return [4 /*yield*/, Item_1.default.find({
                        'ingredients.material': { $in: ingredientID_1 },
                    })];
            case 1:
                items = _a.sent();
                return [4 /*yield*/, Promise.all(items.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var ingredientUpdated;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!item.ingredients) return [3 /*break*/, 2];
                                    ingredientUpdated = item.ingredients.filter(function (ingredient) {
                                        return String(ingredient.material) !== String(ingredientID_1);
                                    });
                                    item.ingredients = ingredientUpdated;
                                    return [4 /*yield*/, item.save()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = mongoose_1.model('Ingredient', IngredientSchema);
