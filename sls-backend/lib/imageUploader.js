const uploader = require('./uploader');

/**
 * this function will not upload 
 * the image if the image is already 
 * uploaded in Cloudinary
 * */ 
module.exports = imageUploader = (slide, thumbnail) => {
    return new Promise(async (resolve) => {
        // thumbnail upload
        if (!/^https?:\/\//.test(thumbnail)) {
            const { url } = await uploader(thumbnail, 'posts');
            thumbnail = url;
        }

        // slide upload
        let newSlide = [];
        for (const slideImage of slide) {
            if (/^https?:\/\//.test(slideImage)) {
                newSlide.push(slideImage)
            } else {
                const { url } = await uploader(slideImage, 'posts');
                newSlide.push(url);   
            }
        }

        resolve({ thumbnail, slide: newSlide });
    });
}