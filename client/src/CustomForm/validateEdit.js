export default function validateEdit(thumbnail, slides) {
    let errors = {};

    slides.forEach((item) => {
        if (item.url === '' || !item.url) {
            errors.slides = 'slide is empty';
        }
    });

    if(slides.length === 0) {
        errors.slides = 'slide is empty';
    }

    console.log('slideee', slides)

    return errors;
}