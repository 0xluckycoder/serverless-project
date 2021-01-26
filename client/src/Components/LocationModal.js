import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FeedContext } from '../Context/FeedContext'; 
import style from './LocationModal.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Close } from '../assets/close-icon.svg';
import { getPostsByLocation } from '../api/api';
export default function LoginModal() {
    let history = useHistory();

    const { setFeedData } = useContext(FeedContext);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "visible";
        }
    }, []);

    const handleClose = (e, includeClass) => {
        typeof e.target.className === "string" && 
        e.target.className !== "" && 
        e.target.className.split(' ').includes(includeClass) && history.push('/ads');
    }

    const getAll = () => {
        console.log('all');
    }

    const handleLocation = async (location) => {
        const data = await getPostsByLocation(location);
        setFeedData(data);
    }

    return ReactDOM.createPortal(
        <div onClick={(e) => handleClose(e, 'wrapper')} className={`${style.modalWrapper} wrapper`}>
            <div className={style.modalBody}>
                <div className={style.close}>
                    <Link to="/ads"><Close /></Link>
                </div>
                <div className={style.content}>
                    <div className={style.heading}>
                        <h1>Select Location</h1>
                    </div>
                    <div className={style.innerContent}>
                        <ul>
                            <li onClick={() => getAll()}>All</li>
                            <li>Nearby</li>
                            <li onClick={() => handleLocation("ampara")}>Ampara</li>
                            <li onClick={() => handleLocation("anuradhapura")}>Anuradhapura</li>
                            <li onClick={() => handleLocation("badulla")}>Badulla</li>
                            <li onClick={() => handleLocation("batticaloa")}>Batticaloa</li>
                            <li onClick={() => handleLocation("colombo")}>Colombo</li>
                            <li onClick={() => handleLocation("galle")}>Galle</li>
                            <li onClick={() => handleLocation("gampaha")}>Gampaha</li>
                            <li onClick={() => handleLocation("hambantota")}>Hambantota</li>
                            <li onClick={() => handleLocation("jaffna")}>Jaffna</li>
                            <li onClick={() => handleLocation("kalutara")}>Kalutara</li>
                            <li onClick={() => handleLocation("kandy")}>Kandy</li>
                            <li onClick={() => handleLocation("kegalle")}>Kegalle</li>
                            <li onClick={() => handleLocation("kilinochchi")}>Kilinochchi</li>
                            <li onClick={() => handleLocation("kurunegala")}>Kurunegala</li>
                            <li onClick={() => handleLocation("mannar")}>Mannar</li>
                            <li onClick={() => handleLocation("matale")}>Matale</li>
                            <li onClick={() => handleLocation("matara")}>Matara</li>
                            <li onClick={() => handleLocation("monaragala")}>Monaragala</li>
                            <li onClick={() => handleLocation("mullativu")}>Mullativu</li>
                            <li onClick={() => handleLocation("nuwaraEliya")}>Nuwara Eliya</li>
                            <li onClick={() => handleLocation("polonnaruwa")}>Polonnaruwa</li>
                            <li onClick={() => handleLocation("puttalam")}>Puttalam</li>
                            <li onClick={() => handleLocation("ratnapura")}>Ratnapura</li>
                            <li onClick={() => handleLocation("trincomalee")}>Trincomalee</li>
                            <li onClick={() => handleLocation("vavuniya")}>Vavuniya</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('sideMenuPortal')
    );
}
