const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = uploader = (image, folder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { secure_url } = await cloudinary.uploader.upload(image, {
                upload_preset: folder
            });
            resolve({ url: secure_url });
        } catch(error) {
            console.log(error);
            reject({ error: "cloudinary error" });
        }
    });
}