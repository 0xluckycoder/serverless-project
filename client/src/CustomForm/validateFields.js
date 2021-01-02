export default function validateFields(thumbnail, slides) {
    let errors = {};

    slides.forEach((item) => {
        if (item.url === '') {
            errors.slides = 'slide is empty';
        }
    })

    if (thumbnail.url === '') {
        errors.thumbnail = 'thumbnail is empty';
    }

    return errors;
}

/*
export default function Loading() {   
     const [showLoading, setShowLoading] = useState(false)
      
     useEffect(
        () => {
          let timer1 = setTimeout(() => setShowLoading(null), 1000)
    
          // this will clear Timeout when component unmount like in willComponentUnmount
          return () => {
            clearTimeout(timer1)
          }
        },
        [] //useEffect will run only one time
           //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
      )

 return showLoading && <div>I will be visible after ~1000ms</div>
*/