let express = require("express");
let app = express();
let dotenv = require("dotenv");
dotenv.config({ path: ".env" });
let { connectDB } = require("./config/conactDB");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
connectDB();
// Middleware
app.use(express.json()); // Parse JSON data in request body
app.use(express.static(path.join(__dirname, "images"))); // Serve images folder
app.use(helmet()); // Enhance security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use("/api/skills", require("./routes/skill"));
app.use("/api/projects", require("./routes/project"));

app.listen(8000, () => {
  console.log("app is running...");
});
