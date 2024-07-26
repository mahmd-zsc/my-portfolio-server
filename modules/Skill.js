const mongoose = require("mongoose");
const Joi = require("joi");

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Ensures no leading or trailing spaces
  },
  color: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

const validateCreateSkill = (obj) => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    color: Joi.string().required(),
    link: Joi.string().uri().required(),
  });
  return schema.validate(obj);
};

const validateUpdateSkill = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim(),
    color: Joi.string(),
    link: Joi.string().uri(),
  });
  return schema.validate(obj);
};

module.exports = { Skill, validateCreateSkill, validateUpdateSkill };
