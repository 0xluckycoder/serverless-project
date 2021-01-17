import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import style from './ConfirmModal.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Close } from '../assets/close-icon.svg';
// import { AuthContext } from '../Context/AuthContext';

export default function LoginModal() {
    let history = useHistory();

    useEffect(() => {
        // state.isAuthenticated && state.user && history.push('/account');
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
                    <h1>Verify Your Email</h1>
                    <p>A verification link has been sent to your email account <b>test@email.com</b>. Please click the link in that email to continue.</p>
                </div>
            </div>
        </div>,
        document.getElementById('sideMenuPortal')
    );
}
