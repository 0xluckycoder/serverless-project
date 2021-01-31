import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './AboutModal.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Close } from '../../assets/close-icon.svg';
export default function LoginModal() {
    let history = useHistory();

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

    return ReactDOM.createPortal(
        <div onClick={(e) => handleClose(e, 'wrapper')} className={`${style.modalWrapper} wrapper`}>
            <div className={style.modalBody}>
                <div className={style.close}>
                    <Link to="/ads"><Close /></Link>
                </div>
                <div className={style.content}>
                    <h2>Hotcard Heading</h2>
                    <p>hotcard content</p>
                </div>
            </div>
        </div>,
        document.getElementById('sideMenuPortal')
    );
}