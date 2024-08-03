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
  let projects = await Project.find();

  if (projects) {
    return res.status(200).json(projects);
  }
  res.status(404).json({ message: "Not found" });
});
/**
 * @desc    Get Project by ID
 * @route   /api/projects/:id
 * @method  GET
 * @access  Public
 */
let getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the ID format if necessary
  if (!id) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  let project = await Project.findById(id).populate("skills");

  if (project) {
    return res.status(200).json(project);
  }
  res.status(404).json({ message: "Project not found" });
});
/**
 * @desc    Create a Project
 * @route   /api/projects/
 * @method  POST
 * @access  Private
 */
let createProject = asyncHandler(async (req, res) => {
  if (!req.files || !req.files.small || !req.files.large) {
    return res
      .status(400)
      .json({ message: "Both small and large images are required" });
  }

  let { error } = validateCreateProject(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const smallImagePath = path.join(
    __dirname,
    `../images/${req.files.small[0].filename}`
  );
  const largeImagePath = path.join(
    __dirname,
    `../images/${req.files.large[0].filename}`
  );

  let smallImageResult = await cloudinaryUploadImage(smallImagePath);
  let largeImageResult = await cloudinaryUploadImage(largeImagePath);

  // Remove the images from the local images folder after upload
  if (smallImageResult) {
    fs.unlinkSync(smallImagePath);
  }
  if (largeImageResult) {
    fs.unlinkSync(largeImagePath);
  }

  let project = new Project({
    title: req.body.title,
    description: req.body.description,
    image: {
      small: {
        url: smallImageResult ? smallImageResult.secure_url : "",
        publicId: smallImageResult ? smallImageResult.public_id : null,
      },
      large: {
        url: largeImageResult ? largeImageResult.secure_url : "",
        publicId: largeImageResult ? largeImageResult.public_id : null,
      },
    },
    githubLink: req.body.githubLink,
    appLink: req.body.appLink,
    skills: req.body.skills,
  });

  await project.save();
  res
    .status(201)
    .json({ message: "Project has been created successfully", project });
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
  getProjectById,
};
