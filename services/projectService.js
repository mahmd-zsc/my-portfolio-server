const { Project, validateCreateProject } = require("../modules/Project");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const getAllProjects = async () => {
  let projects = await Project.find();
  if (!projects) throw new Error("Not found");
  return projects;
};

const getProjectById = async (id) => {
  if (!id) throw new Error("Project ID is required");

  let project = await Project.findById(id).populate("skills");
  if (!project) throw new Error("Project not found");
  return project;
};

const createProject = async (req) => {
  if (!req.files || !req.files.small || !req.files.large) {
    throw new Error("Both small and large images are required");
  }

  let { error } = validateCreateProject(req.body);
  if (error) throw new Error(error.details[0].message);

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

  if (smallImageResult) fs.unlinkSync(smallImagePath);
  if (largeImageResult) fs.unlinkSync(largeImagePath);

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
  return project;
};

const deleteProject = async (id) => {
  let project = await Project.findById(id);
  if (!project) throw new Error("This project ID is not found");

  await Project.findByIdAndDelete(id);
  return "This project has been deleted!";
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
};
