const Joi = require("joi");
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Object,
    default: {
      url: "",
      publicId: null,
    },
  },
});

let validateCreateSkill = (obj) => {
  let Schema = Joi.object({
    title: Joi.string().required(),
  });
  return Schema.validate(obj);
};

let validateUpdateSkill = (obj) => {
  let Schema = Joi.object({
    title: Joi.string(),
  });
  return Schema.validate(obj);
};

const Skill = mongoose.model("Skill", skillSchema);

module.exports = { Skill, validateCreateSkill, validateUpdateSkill };
