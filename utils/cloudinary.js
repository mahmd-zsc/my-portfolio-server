const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload image to cloudinary
module.exports.cloudinaryUploadImage = async (fillToUpload) => {
  try {
    let data = await cloudinary.uploader.upload(fillToUpload, {
      resource_type: "auto",
    });

    return data;
  } catch (error) {
    return error;
  }
};
// upload image to cloudinary
module.exports.cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    let result = await cloudinary.uploader.destroy(imagePublicId);

    return result;
  } catch (error) {
    return error;
  }
};
// upload image multiple to cloudinary
module.exports.cloudinaryRemoveMultipleImage = async (imagesPublicIds) => {
  try {
    let result = await cloudinary.v2.api.delete_resources(imagesPublicIds);

    return result;
  } catch (error) {
    return error;
  }
};
