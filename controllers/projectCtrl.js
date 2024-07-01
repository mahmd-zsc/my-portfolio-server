const asyncHandler = require("express-async-handler");
const path = require("path");
const {
  Project,
  validateCreateProject,
  validateUpdateProject,
} = require("../modules/Project");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const fs = require("fs");
/**
 * @desc    Get All Projects
 * @route   /api/projects/
 * @method  GET
 * @access  Public
 */
let getAllProjects = asyncHandler(async (req, res) => {
  let projects = await Project.find().populate("skills");

  if (projects) {
    return res.status(200).json(projects);
  }
  res.status(404).json({ message: "Not found" });
});

/**
 * @desc    Create a Project
 * @route   /api/projects/
 * @method  POST
 * @access  Private
 */
let createProject = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  let { error } = validateCreateProject(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  let result = await cloudinaryUploadImage(imagePath);

  // Remove the image from the local images folder after upload
  if (result) {
    fs.unlinkSync(imagePath);
  }
  let project = new Project({
    title: req.body.title,
    description: req.body.description,
    image: {
      url: result ? result.secure_url : "",
      public_id: result ? result.public_id : null,
    },
    githubLink: req.body.githubLink,
    appLink: req.body.appLink,
    skills: req.body.skills,
  });

  await project.save();
  res.status(200).json("this project has been created!");
});

/**
 * @desc    Delete a Project
 * @route   /api/projects/:id
 * @method  DELETE
 * @access  Private
 */
let deleteProject = asyncHandler(async (req, res) => {
  let { id } = req.params;

  let project = await Project.findById(id);

  if (!project) {
    return res.status(400).json({ message: "This project ID is not found" });
  }

  await Project.findByIdAndDelete(id);

  res.status(200).json({ message: "This project has been deleted!" });
});

module.exports = {
  getAllProjects,
  createProject,
  deleteProject,
};
