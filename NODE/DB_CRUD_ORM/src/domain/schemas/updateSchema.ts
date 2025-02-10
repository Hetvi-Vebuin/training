import Joi from 'joi';

export const updateSchema = Joi.object({
    id:Joi.number().required(),
    email:Joi.string().email(),
    username: Joi.string().min(3).max(30),
    password: Joi.string().min(6),
});
