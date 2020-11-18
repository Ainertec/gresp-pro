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
var date_fns_1 = require("date-fns");
var jsrtf_1 = __importDefault(require("jsrtf"));
var Order_1 = __importDefault(require("../models/Order"));
var print_1 = require("../utils/print");
var SoldsProductsTotalUseCase_1 = require("../UseCases/Report/SoldsProductsTotalUseCase");
var OrderProfitUseCase_1 = require("../UseCases/Report/OrderProfitUseCase");
var PrinterController = /** @class */ (function () {
    function PrinterController() {
        this.create = this.create.bind(this);
    }
    PrinterController.prototype.toPrinterUpdated = function (items, oldItems) {
        var products = [];
        var drinks = [];
        oldItems.map(function (oldItem) {
            var position = items.findIndex(function (item) {
                return String(item.product._id) === String(oldItem.product) &&
                    item.quantity === oldItem.quantity;
            });
            if (position >= 0) {
                items.splice(position, 1);
            }
        });
        items.map(function (item) {
            if (item.product.drink) {
                drinks.push(item);
            }
            else {
                products.push(item);
            }
        });
        return { products: products, drinks: drinks };
    };
    PrinterController.prototype.toPrinterNew = function (items) {
        var products = [];
        var drinks = [];
        items.map(function (item) {
            if (item.product.drink) {
                drinks.push(item);
            }
            else {
                products.push(item);
            }
        });
        return { products: products, drinks: drinks };
    };
    PrinterController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, identification, oldItems, type, order, date, myDoc, contentStyle, contentBorder, header, items, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, identification = _a.identification, oldItems = _a.oldItems, type = _a.type;
                        return [4 /*yield*/, Order_1.default.findOne({ closed: false, identification: identification })];
                    case 1:
                        order = _b.sent();
                        if (!order)
                            return [2 /*return*/, res.status(400).json('orders does not exist!')];
                        return [4 /*yield*/, order.populate('items.product').execPopulate()];
                    case 2:
                        _b.sent();
                        date = order.updatedAt
                            ? date_fns_1.format(order.updatedAt, 'dd/MM/yyyy HH:mm:ss')
                            : '';
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
                            paragraph: true,
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
                            type
                                ? myDoc.writeText("Tipo: Novo", header)
                                : myDoc.writeText("Tipo: Atualizado", header);
                            myDoc.writeText('=========== Produtos ==========', contentBorder);
                            items.products.map(function (item) {
                                myDoc.writeText("* " + item.product.name + " " + (item.courtesy ? '/ Cortesia' : ''), contentStyle);
                                myDoc.writeText("- Quantidade: " + item.quantity, contentStyle);
                                // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
                            });
                            myDoc.writeText('=========== Bebidas ===========', contentBorder);
                            items.drinks.map(function (item) {
                                myDoc.writeText("* " + item.product.name + " " + (item.courtesy ? '/ Cortesia' : ''), contentStyle);
                                myDoc.writeText("- Quantidade: " + item.quantity, contentStyle);
                                // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
                            });
                            myDoc.writeText('========== Observação =========', contentStyle);
                            myDoc.writeText("\n- " + (order.note ? order.note : 'Nenhuma.') + "\n", contentStyle);
                            myDoc.writeText("- " + date, contentStyle);
                            content = myDoc.createDocument();
                            try {
                                print_1.printFile(content, String(identification));
                                return [2 /*return*/, res.status(200).send()];
                            }
                            catch (error) {
                                return [2 /*return*/, res.status(400).json(error.message)];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(400).json('There are no items')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PrinterController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products, myDoc, contentStyle, contentBorder, header, date, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new SoldsProductsTotalUseCase_1.SoldsProductsTotalUseCase(Order_1.default).execute()];
                    case 1:
                        products = _a.sent();
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
                            paragraph: true,
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
                        date = date_fns_1.format(new Date(), 'dd/MM/yyyy HH:mm:ss');
                        myDoc.writeText('', contentBorder);
                        myDoc.writeText('>>>>> Relatório de Produtos <<<<<', header);
                        products.map(function (product) {
                            myDoc.writeText("Name:" + product._id.name + " ", contentStyle);
                            myDoc.writeText("Price:" + product._id.price + " ", contentStyle);
                            myDoc.writeText("Estoque:" + product._id.stock + " ", contentStyle);
                            myDoc.writeText("Receita:" + product.amount + " ", contentStyle);
                            myDoc.writeText("Qt.vendida:" + product.soldout + " ", contentBorder);
                        });
                        myDoc.writeText("Relat\u00F3rio referente ao dia:" + date + " ", header);
                        content = myDoc.createDocument();
                        try {
                            print_1.printFile(content, 'productsReport');
                            return [2 /*return*/, res.status(200).send()];
                        }
                        catch (error) {
                            return [2 /*return*/, res.status(400).json(error.message)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PrinterController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersProfit, myDoc, contentStyle, contentBorder, header, date, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new OrderProfitUseCase_1.OrdersProfitUseCase(Order_1.default).execute()];
                    case 1:
                        ordersProfit = _a.sent();
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
                            paragraph: true,
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
                        date = date_fns_1.format(new Date(), 'dd/MM/yyyy HH:mm:ss');
                        myDoc.writeText('', contentBorder);
                        myDoc.writeText('>>>> Relatório de Produtos <<<<<', header);
                        myDoc.writeText("Total L\u00EDquido:" + ordersProfit.netValue + " ", header);
                        myDoc.writeText("Total bruto :" + ordersProfit.total + " ", header);
                        myDoc.writeText("Total gasto com cortesia:" + ordersProfit.totalCourtesy + " ", header);
                        myDoc.writeText("Relat\u00F3rio referente ao dia:" + date + " ", header);
                        content = myDoc.createDocument();
                        try {
                            print_1.printFile(content, 'ordersReport');
                            return [2 /*return*/, res.status(200).send()];
                        }
                        catch (error) {
                            return [2 /*return*/, res.status(400).json(error.message)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PrinterController;
}());
exports.default = new PrinterController();
