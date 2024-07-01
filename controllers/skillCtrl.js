let asyncHandler = require("express-async-handler");
const {
  Skill,
  validateCreateSkill,
  validateUpdateSkill,
} = require("../modules/Skill");
const path = require("path");
const fs = require("fs");

const { cloudinaryUploadImage } = require("../utils/cloudinary");

/**
 * @desc    Get All Skills
 * @route   /api/skills/
 * @method  Get
 * @access  public
 */

let getAllSkills = asyncHandler(async (req, res) => {
  let skills = await Skill.find();

  if (skills) {
    return res.status(200).json(skills);
  }
  res.status(404).json({ message: "Not found" });
});

/**
 * @desc    Create a Skill
 * @route   /api/skills/
 * @method  POST
 * @access  Private
 */
let createSkill = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  let { error } = validateCreateSkill(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let skills = await Skill.find({ title: req.body.title });
  if (skills.length > 0) {
    return res.status(400).json({ message: "This skill already exists." });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  let result = await cloudinaryUploadImage(imagePath);

  // Remove the image from the local images folder after upload
  if (result) {
    fs.unlinkSync(imagePath);
  }

  let skill = new Skill({
    title: req.body.title,
    image: {
      url: result ? result.secure_url : "",
      public_id: result ? result.public_id : null,
    },
  });

  await skill.save();
  res.status(200).json({ message: "The skill has been created!" });
});

/**
 * @desc    Delete a Skill
 * @route   /api/skills/:id
 * @method  Delete
 * @access  private
 */

let deleteSkill = asyncHandler(async (req, res) => {
  let { id } = req.params;

  let skill = await Skill.findById(id);

  if (!skill) {
    return res.status(400).json({ message: "This skill ID is not found" });
  }

  await Skill.findByIdAndDelete(id);

  res.status(200).json({ message: "This skill has been deleted!" });
});

module.exports = {
  getAllSkills,
  createSkill,
  deleteSkill,
};
