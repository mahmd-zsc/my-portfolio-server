let express = require("express");
let app = express();
let dotenv = require("dotenv");
dotenv.config({ path: ".env" });
let { connectDB } = require("./config/conactDB");

connectDB();
app.use(express.json());
app.use("/api/skills", require("./routes/skill"));
app.use("/api/projects", require("./routes/project"));

app.listen(8000, () => {
  console.log("app is running...");
});
