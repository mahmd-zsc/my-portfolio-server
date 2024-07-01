let express = require("express");
const {
  getAllProjects,
  createProject,
  deleteProject,
} = require("../controllers/projectCtrl");
const { imageUpload } = require("../middleware/uploadImage");
let router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(imageUpload.single("image"), createProject);

router.route("/:id").delete(deleteProject);

module.exports = router;
