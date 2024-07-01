let express = require("express");
const {
  getAllSkills,
  createSkill,
  deleteSkill,
} = require("../controllers/skillCtrl");
const { imageUpload } = require("../middleware/uploadImage");
let router = express.Router();

router
  .route("/")
  .get(getAllSkills)
  .post(imageUpload.single("image"), createSkill);
router.route("/:id").delete(deleteSkill);
module.exports = router;
