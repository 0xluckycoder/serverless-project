import React, { useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import useForm from '../../../CustomForm/useForm';
import validate from '../../../CustomForm/validateEdit';
import swal from 'sweetalert';
import upload from '../../../assets/upload.png';
import style from './edit.module.scss';

import { updatePost } from '../../../api/api';

const Gallery = ({ initialData, currentPost }) => {

    const { post : { slide, thumbnail } } = initialData;

    let history = useHistory();

    // avoid ref equality
    const MemSlide = useMemo(() => { 
      return { slide };
    }
    , [slide]);

    // consuming use form hook
    const { 
      handleSlide,
      handleThumbnail,
      handleSubmit,
      handleRemoveClick,
      handleAddClick,
      slides,
      thumbnail: initialThumbnail,
      setSlide,
      setThumbnail,
      errors
    } = useForm(submit, validate);

    const handleUpdate = async (slidesArr, initialThumbnail) => {
      const updateGallery = {
        slide: slidesArr,
        thumbnail: initialThumbnail.url
      }
      await updatePost(currentPost, updateGallery);
      history.push('/account');
    }

    function submit() {
      const slidesArr = slides.map(slide => slide.url);
      handleUpdate(slidesArr, initialThumbnail);
    }
  
  
    const handleInitialState = (slide) => {
      if (slide) {
        const images = slide.map(item => {
          return {url: item}
        });
  
        setSlide(images);
        setThumbnail({url: thumbnail})
      }
    }
  
    useEffect(() => {
      handleInitialState(slide);
    }, [MemSlide, thumbnail]);

    useEffect(() => {
      if (errors.slides) {
      swal({
        title: "Error",
        text: errors.slides,
        icon: "error",
        buttons: false,
        timer: 2500
      });
    }
    }, [errors])

    const Thumbnail = () => {
      return (
        <div className={style.thumbnail}>
          <h1>Thumbnail</h1>
            {initialThumbnail && (<img src={initialThumbnail.url} alt="thumbnail" />)}

              <div className="custom-file">
                <input
                  type="file"
                  onChange={(e) => handleThumbnail(e)}
                  className="custom-file-input"
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Upload
                </label>
              </div>
        </div>
      );
    }
  
      return (
          <div className={style.gallery}>

            <Thumbnail />
            
            <div className={style.slides}>
              <h1 onClick={() => console.log(slides)}>Existing Slide</h1>
                <ReactSortable className={style.slideImages} list={slides} setList={setSlide} animation={200}>
                  {slides.map(({ url }, index) => url ? (
                      <div className={style.card}>
                        {url && <img src={url} alt="uploads" />}
                        <button className={style.cardButton} onClick={() => handleRemoveClick(index, url)}>Remove</button>
                      </div>
                  )
                  : (
                    <div className={style.uploadCard}>
                      <div className="custom-file">
                        <input
                          type="file"
                          onChange={(e) => handleSlide(e, index)}
                          className="custom-file-input"
                        />
                        <label className="custom-file-label" htmlFor="customFile">
                          Upload
                        </label>
                      </div>

                      <img src={upload} alt="uploads" />
                      
                      <button className={style.cardButton} onClick={() => handleRemoveClick(index, url)}>Remove</button>
                    </div>
                  )
                  )}
                </ReactSortable>
                {slides.length < 5 
                ?  <div className={style.upload}>
                <button onClick={handleAddClick}>Add</button>
              </div> 
                : null}
            </div>
  


            <div className={style.formFooterButtons}>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Update Gallery</button>
                <Link to="/account"><button>Cancel</button></Link>
            </div>
          </div>
      );
}

export default Gallery;