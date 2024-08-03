const mongoose = require("mongoose");
const Joi = require("joi");
const { Skill } = require("./Skill");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    small: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    large: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  githubLink: {
    type: String,
    required: true,
  },
  appLink: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

const validateCreateProject = (obj) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    githubLink: Joi.string().uri().required(),
    appLink: Joi.string().uri().required(),
    skills: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });
  return schema.validate(obj);
};

const validateUpdateProject = (obj) => {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    githubLink: Joi.string().uri(),
    appLink: Joi.string().uri(),
    skills: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });
  return schema.validate(obj);
};

module.exports = { Project, validateCreateProject, validateUpdateProject };
