import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './ConfirmModal.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Close } from '../../assets/close-icon.svg';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import { resendLink } from '../../api/api';
import swal from 'sweetalert';

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

    const handleVerifyLink = async (email) => {
        try {
            const { message } = await resendLink(email);
            swal({
                title: message,
                text: "check your email inbox",
                buttons: false,
                timer: 2000
            })
        } catch(error) {
            swal({
                title: `${error.error}`,
                icon: "error",
                text: "You can login now",
                buttons: false,
                timer: 2000
            });
        }
    }

    return ReactDOM.createPortal(
        <div onClick={(e) => handleClose(e, 'wrapper')} className={`${style.modalWrapper} wrapper`}>
            <div className={style.modalBody}>
                <div className={style.close}>
                    <Link to="/ads"><Close /></Link>
                </div>
                <div className={style.content}>
                    <h1>Verify Your Email</h1>
                    <p>A verification link has been sent to your email account. Please click the link in that email and login to continue.</p>
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required(),
                        })}
                        onSubmit={({ email }) => {
                            handleVerifyLink(email);
                        }}
                    >
                        <Form>
                            <TextField id="email" name="email" type="email" label="Email" placeholder="example@email.com" />
                            <button type="submit">Resend Link</button>
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
            {/* <label>{label}</label> */}
            <input {...field} {...props} className={`form-control ${meta.touched && meta.error ? `is-invalid` : null}`} />
            {meta.touched && meta.error ? (
                <div id={id} className="invalid-feedback">
                    {meta.error}
                </div>
            ): null}
        </div>
    );
}
