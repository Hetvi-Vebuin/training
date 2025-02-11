import { Request, Response, NextFunction } from "express";
import Joi, { number, Schema } from "joi";

export const validateSchema =
  (schema: Joi.Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate({ ...req.body, ...req.params });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    next();
  };
