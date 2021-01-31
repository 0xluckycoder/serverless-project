import React from 'react';
import ReactDOM from 'react-dom';
import style from './ForgotPassword.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Close } from '../../assets/close-icon.svg';
import { sendResetPasswordLink } from '../../api/api';

import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';

export default function ForgotPasswordModal() {

    let history = useHistory();

    const sendEmail = async (email) => {
        try {
            await sendResetPasswordLink(email);
            // redirect the user to new page
            console.log('success');
        } catch (error) {
            console.log(error);
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
                    <h2>Reset Password</h2>
                    <p>We will send a password reset link to your email</p>
                    <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required()
                    })}
                    onSubmit={(values) => {
                        sendEmail(values)
                    }}
                >
                    <Form>
                        <TextField id="email" name="email" type="email" label="Email" placeholder="example@email.com" />
                        <button type="submit">Send Email</button>
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