"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerialController {
    exit(req, res) {
        const { password } = req.query;
        if (Number(password) === 52164521655455362) {
            process.exit(0);
        }
        else {
            return res.status(400).json({ alert: 'invalid access!' });
        }
    }
}
exports.default = new SerialController();
//# sourceMappingURL=SerialController.js.map