"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var celebrate_1 = require("celebrate");
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var compression = require('compression');
var routes_1 = __importDefault(require("./routes"));
var App = /** @class */ (function () {
    function App() {
        this.express = express_1.default();
        this.server = new http_1.default.Server(this.express);
        this.io = socket_io_1.default(this.server);
        this.webSocket();
        this.middlewares();
        if (!(process.env.NODE_ENV === 'test'))
            this.database();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    };
    App.prototype.database = function () {
        mongoose_1.default.connect('mongodb://localhost:27017/gresp_pro', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    };
    App.prototype.routes = function () {
        this.express.use(compression());
        this.express.use(routes_1.default);
        this.express.use(celebrate_1.errors());
    };
    App.prototype.webSocket = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            socket.on('newFinished', function (data) {
                socket.broadcast.emit('hasFinished', data);
            });
        });
        this.express.use(function (req, res, next) {
            req.io = _this.io;
            return next();
        });
    };
    return App;
}());
exports.default = new App();
