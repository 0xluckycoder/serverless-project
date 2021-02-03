import React from 'react';
import ReactDOM from 'react-dom';
import style from './ChangePassword.module.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ReactComponent as Close } from '../../assets/close-icon.svg';
import { resetPassword } from '../../api/api';

import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

export default function ForgotPasswordModal() {

    let history = useHistory();

    const { token, id } = useParams();

    const changePassword = async ({ password }) => {
        try {
            await resetPassword({ id, token, password });
            // show success alert
            swal({
                title: "Password Changed",
                text: "login with your new password",
                buttons: false,
                timer: 2000
            });
            history.push('/ads/sign-in');
        } catch(error) {
            if (error.error) {
                swal({
                    title: `${error.error}`,
                    text: "please try again",
                    buttons: false,
                    timer: 2000
                });
            }
        }
    }

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
                    <h2>Change Password</h2>
                    <p>Enter Your New Password</p>
                    <Formik
                    initialValues={{
                        password: "",
                    }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string().min(8).max(50).required()
                    })}
                    onSubmit={(password) => {
                        changePassword(password);
                    }}
                >
                    <Form>
                        <TextField id="password" name="password" type="password" label="Password" placeholder="*********" />
                        <button type="submit">Change Password</button>
                    </Form>
                </Formik>
                </div>
            </div>
        </div>,
        document.getElementById('sideMenuPortal')
    );
}

const TextField = ({id, label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <label>{label}</label>
            <input {...field} {...props} className={`form-control ${meta.touched && meta.error ? `is-invalid` : null}`} />
            {meta.touched && meta.error ? (
                <div id={id} className="invalid-feedback">
                    {meta.error}
                </div>
            ): null}
        </div>
    );
}