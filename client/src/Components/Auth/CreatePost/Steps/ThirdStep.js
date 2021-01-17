import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './ThirdStep.module.scss';
import useForm from '../../../../CustomForm/useForm';
import validate from '../../../../CustomForm/validateFields';
import { ReactSortable } from 'react-sortablejs';

export default function ThirdStep({ setStep, setThirdValues }) {

  const [fieldError, setFieldError] = useState(false);
  const {
    imageLoading,
    handleSlide,
    handleThumbnail,
    handleSubmit,
    handleRemoveClick,
    handleAddClick,
    thumbnail,
    slides,
    setSlide,
    errors,
  } = useForm(submit, validate);

  // form submission
  function submit() {
    const slidesArr = slides.map(slide => slide.url);
    console.log('submitted slides', slidesArr);
    console.log('thumbnail', thumbnail.url);
    setThirdValues({ thumbnail: thumbnail.url, slide: slidesArr });
    setStep(4);
  }
  
  useEffect(() => {
    setFieldError(errors);
    let timer = setTimeout(() => {
      setFieldError({});
    }, 3000)

    return () => {
      clearTimeout(timer);
    }
  }, [errors]);

  const Thumbnail = () => {
    return (
      <div className={style.thumbnailWrapper}>
        <h1>Upload Post Thumbnail</h1>

        {fieldError.thumbnail && (
          <div className={`alert alert-danger ${style.error}`} role="alert">
            {fieldError.thumbnail}
          </div>
        )}
        <div className={style.thumbnailItem}>
          <div className="custom-file">
            <input
              type="file"
              onChange={(e) => handleThumbnail(e)}
              className="custom-file-input"
              id="thumbnail"
            />
            <label className="custom-file-label" htmlFor="customFile">
              Click here to select files
            </label>
          </div>
          {thumbnail.url && <img draggable="false" src={thumbnail.url} alt="uploaded" />}
        </div>
      </div>
    );
  };

  return (
    <div className={style.wrapper}>
      <Thumbnail />

      {imageLoading ? <h1>Loading...</h1> : null}

      <div className={style.slideWrapper}>
        <h1 onClick={() => console.log(slides)}>Upload Post Slider</h1>
        <p>You can Move and Reorder your images</p>

      {fieldError.slides && (
        <div className={`alert alert-danger ${style.error}`} role="alert">
          {fieldError.slides}
        </div>
      )}

      <ReactSortable list={slides} setList={setSlide} animation={200}>
          {slides.map(({ url }, index) => (
                <div className={style.slideItem} key={index}>
                  <div className="custom-file">
                    <input
                      type="file"
                      onChange={(e) => handleSlide(e, index)}
                      className="custom-file-input"
                      id="slide"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Click here to select files
                    </label>
                  </div>
                  {url && <img draggable="false" src={url} alt="image" />}
                  
                  <div className={style.buttonWrapper}>
                    {slides.length !== 1 && (
                      <button onClick={() => handleRemoveClick(index, url)}>
                        <i className="fas fa-minus"></i>
                      </button>
                    )}

                    {slides.length < 4
                      ? slides.length - 1 === index &&
                      (
                        <button onClick={handleAddClick}>
                          <i className="fas fa-plus"></i>
                        </button>
                      )
                      : null}
                  </div>

                </div>
          ))}
      </ReactSortable>
      </div>

      <div className={style.formFooterButtons}>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Continue</button>
        <Link to="/account"><button>Cancel</button></Link>
      </div>
    </div>
  );
}
