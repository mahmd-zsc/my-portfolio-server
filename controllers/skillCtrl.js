const asyncHandler = require("express-async-handler");
const { Skill, validateCreateSkill, validateUpdateSkill } = require("../modules/Skill");

/**
 * @desc    Get All Skills
 * @route   /api/skills/
 * @method  GET
 * @access  public
 */
const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();
  if (skills.length > 0) {
    return res.status(200).json(skills);
  }
  res.status(404).json({ message: "No skills found" });
});

/**
 * @desc    Create a Skill
 * @route   /api/skills/
 * @method  POST
 * @access  Private
 */
const createSkill = asyncHandler(async (req, res) => {
  const { error } = validateCreateSkill(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the skill already exists
  const existingSkill = await Skill.findOne({ title: req.body.title });
  if (existingSkill) {
    return res.status(400).json({ message: "This skill already exists." });
  }

  // Create and save new skill
  const skill = new Skill({
    title: req.body.title,
    color: req.body.color,
    link: req.body.link,
  });

  await skill.save();
  res.status(201).json({ message: "The skill has been created!" });
});

/**
 * @desc    Delete a Skill
 * @route   /api/skills/:id
 * @method  DELETE
 * @access  Private
 */
const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skill = await Skill.findById(id);
  if (!skill) {
    return res.status(404).json({ message: "This skill ID is not found" });
  }

  await Skill.findByIdAndDelete(id);
  res.status(200).json({ message: "This skill has been deleted!" });
});

module.exports = {
  getAllSkills,
  createSkill,
  deleteSkill,
};
