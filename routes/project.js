let express = require("express");
const {
  getAllProjects,
  createProject,
  deleteProject,
  getProjectById,
} = require("../controllers/projectCtrl");
const { imageUpload } = require("../middleware/uploadImage");
let router = express.Router();

router
  .route("/")
  .get(getAllProjects)
  .post(imageUpload.single("image"), createProject);

router.route("/:id").delete(deleteProject).get(getProjectById);

module.exports = router;
