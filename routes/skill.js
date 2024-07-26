let express = require("express");
const {
  getAllSkills,
  createSkill,
  deleteSkill,
} = require("../controllers/skillCtrl");
let router = express.Router();

router.route("/").get(getAllSkills).post(createSkill);

router.route("/:id").delete(deleteSkill);

module.exports = router;
