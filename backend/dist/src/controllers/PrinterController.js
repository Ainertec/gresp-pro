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
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var date_fns_1 = require("date-fns");
// import '../@types/jsrtg.d.ts'
var jsrtf_1 = __importDefault(require("jsrtf"));
var Order_1 = __importDefault(require("../models/Order"));
var PrinterController = /** @class */ (function () {
    function PrinterController() {
        this.create = this.create.bind(this);
    }
    PrinterController.prototype.toPrinterUpdated = function (items, oldItems) {
        var products = '';
        var drinks = '';
        oldItems.map(function (oldItem) {
            var position = items.findIndex(function (item) {
                return String(item.product._id) === String(oldItem.product) && item.quantity === oldItem.quantity;
            });
            if (position >= 0) {
                items.splice(position, 1);
            }
        });
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.product.drink) {
                drinks += "* " + (item === null || item === void 0 ? void 0 : item.product.name) + "\n- Quantidade: " + item.quantity + "\n";
            }
            else {
                products += "* " + item.product.name + "\n- Quantidade: " + item.quantity + "\n";
            }
        }
        return { products: products, drinks: drinks };
    };
    PrinterController.prototype.toPrinterNew = function (items) {
        var products = '';
        var drinks = '';
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            if (item.product.drink) {
                drinks += "* " + item.product.name + "\n- Quantidade: " + item.quantity + "\n";
            }
            else {
                products += "* " + item.product.name + "\n- Quantidade: " + item.quantity + "\n";
            }
        }
        return { products: products, drinks: drinks };
    };
    PrinterController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, identification, oldItems, type, order, date, myDoc, contentStyle, contentBorder, header, items, content, buffer, dir;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, identification = _a.identification, oldItems = _a.oldItems, type = _a.type;
                        console.log(oldItems);
                        return [4 /*yield*/, Order_1.default.findOne({ closed: false, identification: identification })];
                    case 1:
                        order = _b.sent();
                        if (!order)
                            return [2 /*return*/, res.status(400).json('orders does not exist!')];
                        return [4 /*yield*/, order.populate('items.product').execPopulate()];
                    case 2:
                        _b.sent();
                        date = order.updatedAt ? date_fns_1.format(order.updatedAt, 'dd/MM/yyyy HH:mm:ss') : '';
                        myDoc = new jsrtf_1.default({
                            language: jsrtf_1.default.Language.BR,
                            pageWidth: jsrtf_1.default.Utils.mm2twips(58),
                            landscape: false,
                            marginLeft: 5,
                            marginRight: 2,
                        });
                        contentStyle = new jsrtf_1.default.Format({
                            spaceBefore: 20,
                            spaceAfter: 20,
                            fontSize: 8,
                        });
                        contentBorder = new jsrtf_1.default.Format({
                            spaceBefore: 100,
                            spaceAfter: 100,
                            fontSize: 8,
                            paragraph: true,
                            borderBottom: { type: 'single', width: 10 },
                        });
                        header = new jsrtf_1.default.Format({
                            spaceBefore: 20,
                            spaceAfter: 100,
                            fontSize: 8,
                            bold: true,
                            paragraph: true,
                            align: 'center',
                            borderTop: { size: 2, spacing: 100, color: jsrtf_1.default.Colors.GREEN },
                        });
                        if (order.items) {
                            items = type
                                ? this.toPrinterNew(order.items)
                                : this.toPrinterUpdated(order.items, oldItems);
                            myDoc.writeText('', contentBorder);
                            myDoc.writeText('>>>>>>>>> Comanda <<<<<<<<<<', header);
                            myDoc.writeText("N\u00FAmero: " + order.identification, header);
                            type ? myDoc.writeText("Tipo: Novo", header) : myDoc.writeText("Tipo: Atualizado", header);
                            // myDoc.writeText(`Hora: ${order.identification}`, header);
                            myDoc.writeText('=========== Produtos ==========', contentBorder);
                            myDoc.writeText("" + (items === null || items === void 0 ? void 0 : items.products), contentStyle);
                            myDoc.writeText('=========== Bebidas ===========', contentBorder);
                            myDoc.writeText("" + (items === null || items === void 0 ? void 0 : items.drinks), contentStyle);
                            myDoc.writeText('', contentBorder);
                            myDoc.writeText('========== Observação =========', contentStyle);
                            myDoc.writeText("\n- " + (order.note ? order.note : 'Nenhuma.') + "\n", contentStyle);
                            myDoc.writeText("- " + date, contentStyle);
                            content = myDoc.createDocument();
                            buffer = Buffer.from(content, 'binary');
                            dir = process.env.NODE_ENV === 'test'
                                ? path_1.default.resolve(__dirname, '..', '..', '__tests__', 'recipes')
                                : path_1.default.resolve('commands', 'commandsCreate');
                            fs_1.default.writeFile(dir + "/" + identification + ".rtf", buffer, { encoding: 'utf-8', flag: 'w' }, function (err) {
                                if (err)
                                    return res.status(400).json("" + err);
                                return res.status(200).json('success');
                            });
                        }
                        else {
                            return [2 /*return*/, res.status(400).json('There are no items')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PrinterController;
}());
exports.default = new PrinterController();
