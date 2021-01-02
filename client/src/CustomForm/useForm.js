import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';

const useForm = (callback, validate) => {
  const [slides, setSlide] = useState([{ url: '' }]);
  const [thumbnail, setThumbnail] = useState({ url: '' });
  const [imageLoading, setImageLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // validating selected files
  const validateImage = (e) => {
    // const filesArray = e.target.files;
    const file = e.target.files[0];
    const size = e.target.files[0].size;
    const type = e.target.files[0].type;
    const name = e.target.files[0].name;
    // const extension = e.target.files[filesArray.length-1];

    console.log(e.target.files);

    // !e.target.files[0] ||
    // !e.target.files[0].size ||
    // !e.target.files[0].name.split(".")[1] ||
    // !e.target.files[0].name.split(".")[0]

    if (!file || !size || !type || !name) {

      swal({
        title: "Error",
        text: "File is not supported",
        icon: "error",
        buttons: false,
        timer: 2500
      });

      return { error: 'error' }
    } else {

      // console.table(type);
      /* check the file type */
      if (type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/jpg') {
        swal({
          title: "Error",
          text: "Only .JPG and .PNG File Formats Allowed",
          icon: "error",
          buttons: false,
          timer: 2500
        });
        return { error: 'error' };
      }

      if (size > 1000000) {
        swal({
          title: "Error",
          text: "Too Large. Image Should Be Less Than 1MB",
          icon: "error",
          buttons: false,
          timer: 2500
        });
  
        return { error: 'error' }
      }
      
      return { file , error: null };
    }
  };


  /*
  const uploadImage = async (base64EncodedImage) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ data: base64EncodedImage }),
          headers: {'Content-type': 'application/json'}
        });
        const data = await response.json();
        resolve(data);
      } catch(error) {
        reject(error);
      }
    });
  };
  */

  // handle slide change
  const handleSlide = (e, index) => {
    e.preventDefault();
    
    const { file, error } = validateImage(e);
    
    if (error !== 'error') {

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {

        try {
          setImageLoading(true);
          // console.log('image - ', reader.result);
          // const resolvedImage = await uploadImage(reader.result);
          const list = [...slides];
          list[index]['url'] = reader.result;
          setSlide(list);
          setImageLoading(false);
        } catch(error) {
          console.log('rejection error', error);
        }

      }
    } else {
      return null;
    }
  };

  // handle thumbnail change
  const handleThumbnail = (e) => {
    e.preventDefault();

    const { file, error } = validateImage(e);
    if (error !== 'error') {

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {

        try {
          setImageLoading(true);
          // const resolvedImage = await uploadImage(reader.result);
          // console.log(reader.result);
          setThumbnail({ url: reader.result });
          setImageLoading(false);
        } catch(error) {
          console.log('rejection error', error);
        }

      }
    } else {
      return null;
    }
  };

  // handle field array
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(thumbnail, slides));
    setIsSubmitting(true);
  };

  // handle field array
  const handleRemoveClick = async (index, url) => {

    // remove image item

    // remove item from array
    const list = [...slides];
    list.splice(index, 1);
    setSlide(list);
  };

  const handleAddClick = () => {
    setSlide([...slides, { url: '' }]);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    imageLoading,
    handleSlide,
    handleThumbnail,
    handleSubmit,
    handleRemoveClick,
    handleAddClick,
    thumbnail,
    slides,
    setSlide,
    setThumbnail,
    errors,
  };
};

export default useForm;
