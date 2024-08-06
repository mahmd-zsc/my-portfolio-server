const asyncHandler = require("express-async-handler");
const projectService = require("../services/projectService");

/**
 * @desc    Get All Projects
 * @route   /api/projects/
 * @method  GET
 * @access  Public
 */
const getAllProjects = asyncHandler(async (req, res) => {
  try {
    let projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @desc    Get Project by ID
 * @route   /api/projects/:id
 * @method  GET
 * @access  Public
 */
const getProjectById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let project = await projectService.getProjectById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @desc    Create a Project
 * @route   /api/projects/
 * @method  POST
 * @access  Private
 */
const createProject = asyncHandler(async (req, res) => {
  try {
    let project = await projectService.createProject(req);
    res
      .status(201)
      .json({ message: "Project has been created successfully", project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @desc    Delete a Project
 * @route   /api/projects/:id
 * @method  DELETE
 * @access  Private
 */
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let message = await projectService.deleteProject(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  getAllProjects,
  createProject,
  deleteProject,
  getProjectById,
};
