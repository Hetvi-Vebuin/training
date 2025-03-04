"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(Object.assign(Object.assign({}, req.body), req.params));
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateSchema = validateSchema;
