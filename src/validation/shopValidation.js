import Joi from "joi";

export const shopSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  zip: Joi.string().required(),
  password: Joi.string().min(6).required(),
  hasDelivery: Joi.string().valid("yes", "no"),
});