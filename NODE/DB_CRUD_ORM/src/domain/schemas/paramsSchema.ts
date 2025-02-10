import Joi from "joi";
 
const paramsSchema = Joi.object({
  id: Joi.number().min(1).integer().required().messages({
    "string.min":"Id is required",
    "number.base": "The requested id should be a valid number.",
  }),
});
 
export default paramsSchema;