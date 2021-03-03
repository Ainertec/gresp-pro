"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const celebrate_1 = require("celebrate");
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
class App {
    constructor() {
        this.express = express_1.default();
        this.server = new http_1.default.Server(this.express);
        this.io = socket_io_1.default(this.server);
        this.webSocket();
        this.middlewares();
        if (!(process.env.NODE_ENV === 'test'))
            this.database();
        this.routes();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    }
    database() {
        mongoose_1.default.connect('mongodb://localhost:27017/gresp_pro', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    }
    routes() {
        this.express.use(compression_1.default());
        this.express.use(routes_1.default);
        this.express.use(celebrate_1.errors());
    }
    webSocket() {
        this.io.on('connection', socket => {
            socket.on('newFinished', data => {
                socket.broadcast.emit('hasFinished', data);
            });
        });
        this.express.use((req, res, next) => {
            req.io = this.io;
            return next();
        });
    }
}
exports.default = new App();
//# sourceMappingURL=app.js.map