"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questions = void 0;
/* eslint-disable func-names */
/* eslint-disable camelcase */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Questions = Object.freeze({
    first: 'Qual o modelo do seu primeiro carro?',
    second: 'Qual o nome do seu melhor amigo de infância?',
    third: 'Qual o nome do seu primeiro animal de estimação?',
    fourth: 'Qual o nome da sua mãe?',
    fifth: 'Qual sua cor preferida?',
    getQuestions() {
        const ques = [this.first, this.second, this.third, this.fourth, this.fifth];
        return ques;
    },
});
exports.Questions = Questions;
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
    },
    question: {
        type: String,
        enum: Object.values(Questions),
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    response: {
        type: String,
        required: true,
    },
});
Object.assign(UserSchema.statics, {
    Questions,
});
UserSchema.virtual('password', { type: String, require: true });
UserSchema.pre('save', async function (next) {
    if (this.password) {
        const hash = await bcrypt_1.default.hash(this.password, 8);
        this.password_hash = hash;
    }
    next();
});
UserSchema.methods.checkPassword = function (password) {
    return bcrypt_1.default.compare(password, this.password_hash);
};
UserSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, String(process.env.APP_SECRET));
};
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map