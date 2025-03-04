import { Request, Response, NextFunction } from "express";
import Joi from "joi";
export declare const validateSchema: (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => void;
