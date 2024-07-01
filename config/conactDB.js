let mongoose = require("mongoose");

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBLINK);
    console.log("connected is success to mongodb ._.");
  } catch (error) {
    console.log(error);
  }
};
