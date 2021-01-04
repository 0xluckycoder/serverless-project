import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import style from './Modal.module.scss';
import { copyToClipboard } from '../helpers/helpers';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import swal from 'sweetalert';

// modal assets
import { ReactComponent as Share } from '../assets/modal/share.svg';
import { ReactComponent as Call } from '../assets/modal/phone-btn.svg';
import { ReactComponent as Globe } from '../assets/modal/globe-btn.svg';
import { ReactComponent as Direction } from '../assets/modal/marker-2.svg';
import { ReactComponent as Close } from '../assets/close-icon.svg';

// import halalLogo from '../assets/modal/options/halal.png';
import Facebook from '../assets/modal/options/facebook.png';
import Instagram from '../assets/modal/options/instagram.png';
import Twitter from '../assets/modal/options/twitter.png';

import { getPostById } from '../api/api';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Modal({ isOpen, onClose }) {

    const [activeBranch, setActiveBranch] = useState({});

    const copy = (value) => {
        copyToClipboard(value);
        swal("Ad link copied to your clipboard", {
            title: 'Link Copied',
            buttons: false,
            timer: 2000,
        });
    }

    const [data, setData] = useState({});

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    let currentUrl = useLocation();

    const fetchData = async () => {
        setLoading(true);
        try {
            const { post } = await getPostById(id);
            setData(post);
        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        fetchData();
        return () => {
            document.body.style.overflow = "visible";
        }
    }, []);

    // document.querySelector('.wrapper').addEventListener('click')

    let history = useHistory();

    const handleClose = (e, includeClass) => {
        typeof e.target.className === "string" && 
        e.target.className !== "" && 
        e.target.className.split(' ').includes(includeClass) && history.push('/ads');
    }

    return ReactDOM.createPortal(
        <div onClick={(e) => handleClose(e, 'wrapper')} className={`${style.modalWrapper} wrapper`}>
            <div className={style.modalBody}>
            {loading 
                ? <Spinner />
                : <><div className={style.heading}>
                <p>{data.brandName && data.brandName}</p>
                <Link to="/ads"><Close onClick={onClose} /></Link>
            </div>
            <div className={style.secondRow}>
                <div className={style.socialMedia}>
                    <a href={data.facebook} target="_blank" rel="noreferrer">
                        {data.facebook && <img src={Facebook} alt="facebook" />}
                    </a>
                    <a href={data.instagram} target="_blank" rel="noreferrer">
                        {data.instagram && <img src={Instagram} alt="instagram" />}
                    </a>
                    <a href={data.twitter} target="_blank" rel="noreferrer">
                        {data.twitter && <img src={Twitter} alt="twitter" />}
                    </a>
                </div>
                <div className={style.options}>
   
                </div>
            </div>

            <div className={style.Slider}>
                <Swiper
                direction="horizontal"
                pagination={{clickable: true}}
                Keyboard={{enabled: true, onlyInViewport: false}}
                slidesPerView={1}
                >
                {data.slide && data.slide.map(img => (
                    <SwiperSlide>
                        <img src={img} alt="slide" />
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            <div className={style.footer}>
                <Dropdown branches={data.branches && data.branches} setActiveBranch={setActiveBranch} activeBranch={activeBranch} />
                <div className={style.icon}>
                    <a href={data.number ? `tel:${data.number}` : null}>
                        <Call />
                    </a>      
                </div>
                <div className={style.icon}>
                    <a href={activeBranch.branchLocation ? activeBranch.branchLocation : null} target="_blank" rel="noreferrer">
                        <Direction />
                    </a>
                </div>
                <div className={style.icon}>
                    <a href={data.website ? data.website : null} target="_blank" rel="noreferrer">
                        <Globe />
                    </a>
                </div>
                <div className={style.icon}>
                    <div onClick={() => copy(`http://localhost:3000${currentUrl.pathname}`)} className="share-button">
                        <Share />
                    </div>
                </div>
            </div> 
            
            <div className={style.offer}>
                    <p className={data.offer ? style.available : style.unavailable}>OFFER</p>
            </div>
            
            </>}
            </div>
        </div>,
        document.getElementById('sideMenuPortal')
    )
}

const Dropdown = ({ branches, setActiveBranch, activeBranch }) => {
    return (
        <div class="dropdown">
        <button class={`btn btn-dark dropdown-toggle ${style.dropdownButton}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {branches && branches.map((branch) => (
                    <div onClick={() => setActiveBranch(branch)} className="dropdown-item">{branch.district}</div>
            ))}
        </div>
        </div>
    );
}

const Spinner = () => {
    return (
      <div className={`spinner ${style.spinner}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
}

                 {/* {data && data.options && data.options.map(optionItem => {
                        switch (optionItem.option) {
                            case 'airbnb':
                                return <a href={optionItem.url} target="_blank"><img src={airbnbLogo} alt="optionLogo" /></a>           
                            case 'booking':
                                return <a href={optionItem.url} target="_blank"><img src={bookingLogo} alt="optionLogo" /></a>
                            case 'trivago':
                                return <a href={optionItem.url} target="_blank"><img src={trivagoLogo} alt="optionLogo" /></a>
                            case 'pickme' :
                                return <img src={pickmeLogo} alt="optionLogo" />
                            case 'uber' :
                                return <img src={uberLogo} alt="optionLogo" />
                            case 'deliver' :
                                return <img src={deliverLogo} alt="optionLogo" />
                            case 'halal' :
                                return <img src={halalLogo} alt="optionLogo" />                            
                            default:
                                return null;
                                break;
                        }
                    })} 
                    {data.pickme && <img src={Pickme} alt="option" />}
                    {data.uber && <img src={Uber} alt="option" />}
                    {data.wedeliver && <img src={WeDeliver} alt="option" />}
                    {data.airbnb && <img src={Airbnb} alt="option" />}                    
                    {data.agoda && <img src={Agoda} alt="option" />}
                    {data.booking && <img src={Booking} alt="option" />} */}