"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const jsrtf_1 = __importDefault(require("jsrtf"));
const Order_1 = __importDefault(require("../models/Order"));
const print_1 = require("../utils/print");
const SoldsProductsTotalUseCase_1 = require("../UseCases/Report/SoldsProductsTotalUseCase");
const OrderProfitUseCase_1 = require("../UseCases/Report/OrderProfitUseCase");
class PrinterController {
    constructor() {
        this.create = this.create.bind(this);
    }
    toPrinterUpdated(items, oldItems) {
        const products = [];
        const drinks = [];
        oldItems.map(oldItem => {
            const position = items.findIndex(item => String(item.product._id) === String(oldItem.product) &&
                item.quantity === oldItem.quantity);
            if (position >= 0) {
                items.splice(position, 1);
            }
            items.map(item => {
                if (String(item.product._id) === String(oldItem.product))
                    item.quantity = item.quantity - oldItem.quantity;
            });
        });
        items.map(item => {
            if (item.product.drink) {
                drinks.push(item);
            }
            else {
                products.push(item);
            }
        });
        return { products, drinks };
    }
    toPrinterNew(items) {
        const products = [];
        const drinks = [];
        items.map(item => {
            if (item.product.drink) {
                drinks.push(item);
            }
            else {
                products.push(item);
            }
        });
        return { products, drinks };
    }
    async create(req, res) {
        const { identification, oldItems, type } = req.body;
        const order = await Order_1.default.findOne({ closed: false, identification });
        if (!order)
            return res.status(400).json('orders does not exist!');
        await order.populate('items.product').execPopulate();
        const date = order.updatedAt
            ? date_fns_1.format(order.updatedAt, 'dd/MM/yyyy HH:mm:ss')
            : '';
        const myDoc = new jsrtf_1.default({
            language: jsrtf_1.default.Language.BR,
            pageWidth: jsrtf_1.default.Utils.mm2twips(58),
            landscape: false,
            marginLeft: 5,
            marginRight: 2,
        });
        const contentStyle = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 20,
            fontSize: 8,
            paragraph: true,
        });
        const contentBorder = new jsrtf_1.default.Format({
            spaceBefore: 100,
            spaceAfter: 100,
            fontSize: 8,
            paragraph: true,
            borderBottom: { type: 'single', width: 10 },
        });
        const header = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 100,
            fontSize: 8,
            bold: true,
            paragraph: true,
            align: 'center',
            borderTop: { size: 2, spacing: 100, color: jsrtf_1.default.Colors.GREEN },
        });
        let notItem = false;
        for (const iterator of order.items) {
            if (Boolean(iterator.product.print && (!iterator.product.drink || Boolean(process.env.PRINTDRINK == 'true')))) {
                notItem = true;
            }
        }
        if (order.items && notItem) {
            console.log(type);
            const items = type
                ? this.toPrinterNew(order.items)
                : this.toPrinterUpdated(order.items, oldItems);
            myDoc.writeText('', contentBorder);
            myDoc.writeText('>>>>>>>>> Comanda <<<<<<<<<<', header);
            myDoc.writeText(`Número: ${order.identification}`, header);
            type
                ? myDoc.writeText(`Tipo: Novo`, header)
                : myDoc.writeText(`Tipo: Atualizado`, header);
            if (process.env.PRINTDRINK) {
                myDoc.writeText('=========== Bebidas ==========', contentBorder);
                items.drinks.map(item => {
                    if (item.product.print) {
                        myDoc.writeText(`* ${item.product.name} ${item.courtesy ? '/ Cortesia' : ''}`, contentStyle);
                        myDoc.writeText(`- Quantidade: ${item.quantity}`, contentStyle);
                        // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
                    }
                });
            }
            myDoc.writeText('=========== Produtos ==========', contentBorder);
            items.products.map(item => {
                if (item.product.print) {
                    myDoc.writeText(`* ${item.product.name} ${item.courtesy ? '/ Cortesia' : ''}`, contentStyle);
                    myDoc.writeText(`- Quantidade: ${item.quantity}`, contentStyle);
                    // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
                }
            });
            myDoc.writeText('========== Observação =========', contentStyle);
            myDoc.writeText(`\n- ${order.note ? order.note : 'Nenhuma.'}\n`, contentStyle);
            myDoc.writeText(`- ${date}`, contentStyle);
            const content = myDoc.createDocument();
            try {
                print_1.printFile(content, String(identification));
                return res.status(200).send();
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        }
        else {
            return res.status(400).json('There are no items');
        }
    }
    async createComprovant(req, res) {
        const { identification, payment } = req.body;
        const order = await Order_1.default.findOne({ closed: false, identification });
        if (!order)
            return res.status(400).json('orders does not exist!');
        await order.populate('items.product').execPopulate();
        const date = order.updatedAt
            ? date_fns_1.format(order.updatedAt, 'dd/MM/yyyy HH:mm:ss')
            : '';
        const myDoc = new jsrtf_1.default({
            language: jsrtf_1.default.Language.BR,
            pageWidth: jsrtf_1.default.Utils.mm2twips(58),
            landscape: false,
            marginLeft: 5,
            marginRight: 2,
        });
        const contentStyle = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 20,
            fontSize: 8,
            paragraph: true,
        });
        const contentBorder = new jsrtf_1.default.Format({
            spaceBefore: 100,
            spaceAfter: 100,
            fontSize: 8,
            paragraph: true,
            borderBottom: { type: 'single', width: 10 },
        });
        const header = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 100,
            fontSize: 8,
            bold: true,
            paragraph: true,
            align: 'center',
            borderTop: { size: 2, spacing: 100, color: jsrtf_1.default.Colors.GREEN },
        });
        if (order.items) {
            myDoc.writeText('', contentBorder);
            myDoc.writeText('>>>>>>>>> Comprovante <<<<<<<<<<', header);
            myDoc.writeText(`Identificador: ${order.identification}`, header);
            myDoc.writeText('=========== Produtos ==========', contentBorder);
            order.items.map(item => {
                myDoc.writeText(`* ${item.product.name} ${item.courtesy ? '/ Cortesia' : ''}`, contentStyle);
                myDoc.writeText(`- Quantidade: ${item.quantity} --- Valor:R$ ${(item.product.price).toFixed(2)}`, contentStyle);
                // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
            });
            myDoc.writeText('========== Observação =========', contentStyle);
            myDoc.writeText(`\n- ${order.note ? order.note : 'Nenhuma.'}\n`, contentStyle);
            myDoc.writeText('=========== Resumo ===========', contentStyle);
            myDoc.writeText(`\n- Valor do pedido: R$${(order.total).toFixed(2)}\n`, contentStyle);
            if (payment == 'dinheiro') {
                myDoc.writeText(`- Taxa de serviço/gorjeta: R$${order.tip ? (order.tip).toFixed(2) : '0.00'}\n`, contentStyle);
                myDoc.writeText('- - - - - - - - - - - - - - - - - - - - - - - - -', contentStyle);
                myDoc.writeText(`\n- Total no dinheiro: R$${(order.total + order.tip).toFixed(2)}\n`, contentStyle);
            }
            else if (payment == 'debito') {
                myDoc.writeText(`- Taxa de serviço/gorjeta: R$${order.tip ? (order.tip).toFixed(2) : '0.00'}\n`, contentStyle);
                myDoc.writeText(`- Taxa de Cartão: R$${order.carddebitfee ? (order.carddebitfee).toFixed(2) : '0.00'}\n`, contentStyle);
                myDoc.writeText('- - - - - - - - - - - - - - - - - - - - - - - - -', contentStyle);
                myDoc.writeText(`\n- Total no débito: R$${(order.total + order.carddebitfee + order.tip).toFixed(2)}\n`, contentStyle);
            }
            else {
                myDoc.writeText(`- Taxa de serviço/gorjeta: R$${order.tip ? (order.tip).toFixed(2) : '0.00'}\n`, contentStyle);
                myDoc.writeText(`- Taxa de Cartão: R$${order.cardcreditfee ? (order.cardcreditfee).toFixed(2) : '0.00'}\n`, contentStyle);
                myDoc.writeText('- - - - - - - - - - - - - - - - - - - - - - - - -', contentStyle);
                myDoc.writeText(`\n- Total no crédito: R$${(order.total + order.cardcreditfee + order.tip).toFixed(2)}\n`, contentStyle);
            }
            myDoc.writeText(`- Data/hora ${date}`, contentStyle);
            const content = myDoc.createDocument();
            try {
                print_1.printFileProof(content, String(identification));
                return res.status(200).send();
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        }
        else {
            return res.status(400).json('There are no items');
        }
    }
    async show(req, res) {
        const products = await new SoldsProductsTotalUseCase_1.SoldsProductsTotalUseCase(Order_1.default).execute();
        const myDoc = new jsrtf_1.default({
            language: jsrtf_1.default.Language.BR,
            pageWidth: jsrtf_1.default.Utils.mm2twips(58),
            landscape: false,
            marginLeft: 5,
            marginRight: 2,
        });
        const contentStyle = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 20,
            fontSize: 8,
            paragraph: true,
        });
        const contentBorder = new jsrtf_1.default.Format({
            spaceBefore: 100,
            spaceAfter: 100,
            fontSize: 8,
            paragraph: true,
            borderBottom: { type: 'single', width: 10 },
        });
        const header = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 100,
            fontSize: 8,
            bold: true,
            paragraph: true,
            align: 'center',
            borderTop: { size: 2, spacing: 100, color: jsrtf_1.default.Colors.GREEN },
        });
        const date = date_fns_1.format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        myDoc.writeText('', contentBorder);
        myDoc.writeText('>>>>> Relatório de Produtos <<<<<', header);
        products.map(product => {
            myDoc.writeText(`Name:${product._id.name} `, contentStyle);
            myDoc.writeText(`Price:${product._id.price} `, contentStyle);
            myDoc.writeText(`Estoque:${product._id.stock} `, contentStyle);
            myDoc.writeText(`Receita:${product.amount} `, contentStyle);
            myDoc.writeText(`Qt.vendida:${product.soldout} `, contentBorder);
        });
        myDoc.writeText(`Relatório referente ao dia:${date} `, header);
        const content = myDoc.createDocument();
        try {
            print_1.printFileProof(content, 'productsReport');
            return res.status(200).send();
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
    async index(req, res) {
        const ordersProfit = await new OrderProfitUseCase_1.OrdersProfitUseCase(Order_1.default).execute(String(date_fns_1.startOfDay(new Date())), String(date_fns_1.endOfDay(new Date())));
        const myDoc = new jsrtf_1.default({
            language: jsrtf_1.default.Language.BR,
            pageWidth: jsrtf_1.default.Utils.mm2twips(58),
            landscape: false,
            marginLeft: 5,
            marginRight: 2,
        });
        const contentStyle = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 20,
            fontSize: 8,
            paragraph: true,
        });
        const contentBorder = new jsrtf_1.default.Format({
            spaceBefore: 100,
            spaceAfter: 100,
            fontSize: 8,
            paragraph: true,
            borderBottom: { type: 'single', width: 10 },
        });
        const header = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 100,
            fontSize: 8,
            bold: true,
            paragraph: true,
            align: 'center',
            borderTop: { size: 2, spacing: 100, color: jsrtf_1.default.Colors.GREEN },
        });
        const date = date_fns_1.format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        myDoc.writeText('', contentBorder);
        myDoc.writeText('>>>> Relatório de Produtos <<<<<', header);
        myDoc.writeText(`Total Líquido:${ordersProfit.netValue} `, header);
        myDoc.writeText(`Total bruto :${ordersProfit.total} `, header);
        myDoc.writeText(`Total gasto com cortesia:${ordersProfit.totalCourtesy} `, header);
        myDoc.writeText(`Relatório referente ao dia:${date} `, header);
        const content = myDoc.createDocument();
        try {
            print_1.printFileProof(content, 'ordersReport');
            return res.status(200).send();
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
}
exports.default = new PrinterController();
//# sourceMappingURL=PrinterController.js.map