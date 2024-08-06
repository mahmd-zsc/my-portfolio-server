const asyncHandler = require("express-async-handler");
const skillService = require("../services/skillService");

/**
 * @desc    Get All Skills
 * @route   /api/skills/
 * @method  GET
 * @access  public
 */
const getAllSkills = asyncHandler(async (req, res) => {
  try {
    const skills = await skillService.getAllSkills();
    res.status(200).json(skills);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @desc    Create a Skill
 * @route   /api/skills/
 * @method  POST
 * @access  Private
 */
const createSkill = asyncHandler(async (req, res) => {
  try {
    const skill = await skillService.createSkill(req.body);
    res.status(201).json({ message: "The skill has been created!", skill });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @desc    Delete a Skill
 * @route   /api/skills/:id
 * @method  DELETE
 * @access  Private
 */
const deleteSkill = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const message = await skillService.deleteSkill(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getAllSkills,
  createSkill,
  deleteSkill,
};
