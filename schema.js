const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({ // Change this to expect an object for 'image'
      url: Joi.string().allow("", null), // 'url' inside 'image' should be a string
      filename: Joi.string().allow("", null) // 'filename' inside 'image' should also be a string
    }).optional(), // Use .optional() if the image object itself is not strictly required, or .required() if it always must be present.
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
