"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/../.env` });
const app = express_1.default();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('hello');
});
app.listen(port, () => {
    console.log(`Server run at: http://172.0.0.1:${port}`);
});
//# sourceMappingURL=app.js.map