const mongoose = require("mongoose");
const Joi = require("joi");
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
    type: Object,
    default: {
      url: "",
      publicId: null,
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
      ref: "skills",
    },
  ],
});

// Create the Project model
const Project = mongoose.model("Project", projectSchema);

// Validation schema for creating a project
let validateCreateProject = (obj) => {
  let schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    githubLink: Joi.string().uri().required(),
    appLink: Joi.string().uri().required(),
    skills: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });
  return schema.validate(obj);
};

// Validation schema for updating a project
let validateUpdateProject = (obj) => {
  let schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    githubLink: Joi.string().uri(),
    appLink: Joi.string().uri(),
    skills: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  });
  return schema.validate(obj);
};

module.exports = { Project, validateCreateProject, validateUpdateProject };
