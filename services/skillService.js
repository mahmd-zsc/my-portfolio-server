const {
  Skill,
  validateCreateSkill,
  validateUpdateSkill,
} = require("../modules/Skill");

const getAllSkills = async () => {
  const skills = await Skill.find();
  if (skills.length === 0) throw new Error("No skills found");
  return skills;
};

const createSkill = async (body) => {
  const { error } = validateCreateSkill(body);
  if (error) throw new Error(error.details[0].message);

  // Check if the skill already exists
  const existingSkill = await Skill.findOne({ title: body.title });
  if (existingSkill) throw new Error("This skill already exists.");

  // Create and save new skill
  const skill = new Skill({
    title: body.title,
    color: body.color,
    link: body.link,
  });

  await skill.save();
  return skill;
};

const deleteSkill = async (id) => {
  const skill = await Skill.findById(id);
  if (!skill) throw new Error("This skill ID is not found");

  await Skill.findByIdAndDelete(id);
  return "This skill has been deleted!";
};

module.exports = {
  getAllSkills,
  createSkill,
  deleteSkill,
};
