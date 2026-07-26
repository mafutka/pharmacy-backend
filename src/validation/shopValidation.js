import Joi from "joi";

export const shopSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  zip: Joi.string().required(),
  hasDelivery: Joi.boolean().required(),
});

export const createShopSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  zip: Joi.string().required(),
  hasDelivery: Joi.boolean().required(),
})

export const updateShopSchema = Joi.object({
  name: Joi.string(),
  owner: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  zip: Joi.string(),
  hasDelivery: Joi.boolean(),
})