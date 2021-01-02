import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import style from './LoginModal.module.scss';
import { Link, useHistory } from 'react-router-dom';

import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

import { AuthContext } from '../Context/AuthContext';

import logo from '../assets/logo.png';
import { ReactComponent as Close } from '../assets/close-icon.svg';
import { ACTIONS } from '../actions';
import { registerRequest, signInRequest } from '../api/api';

export default function LoginModal() {

    const [loading, setLoading] = useState(false);

    const { state, dispatch } = useContext(AuthContext);

    let history = useHistory();

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const data = await signInRequest(values);
            if (data) {
                console.log(data);
                dispatch({ type: ACTIONS.AUTH_SUCCESS, payload: data });
                localStorage.setItem('accessToken', data.accessToken);
                console.log('sign in success');
                setLoading(false);
                // redirect
                history.push('/account');
            }
        } catch(error) {
            dispatch({ type: ACTIONS.AUTH_ERROR });
            setLoading(false);
            swal({
                title: `${error.error}`,
                icon: "error",
                text: "try again",
                buttons: false,
                timer: 2000
            });
        }
    }

    const handleSignUp = async (values) => {
        // console.log('sign up', values);
        setLoading(true);
        try {
            const data = await registerRequest(values);
            if (data) {
                console.log(data);
                dispatch({ type: ACTIONS.AUTH_SUCCESS, payload: data });
                localStorage.setItem('accessToken', data.accessToken);
                console.log('sign up success');
                setLoading(false);
            }
            // redirect
        } catch(error) {
            dispatch({ type: ACTIONS.AUTH_ERROR });
            setLoading(false);
            swal({
                title: `${error.error}`,
                icon: "error",
                text: "try again",
                buttons: false,
                timer: 2000
            });
        }
    }

    useEffect(() => {
        // if user logged in redirecting to the account
        state.isAuthenticated && state.user && history.push('/account');

        // console.log(state);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "visible";
        }
    }, []);

    const [componentState, setComponentState] = useState('signin');

    const handleClose = (e, includeClass) => {
        typeof e.target.className === "string" && 
        e.target.className !== "" && 
        e.target.className.split(' ').includes(includeClass) && history.push('/ads');
    }

    return ReactDOM.createPortal(
        <div onClick={(e) => handleClose(e, 'wrapper')} className={`${style.modalWrapper} wrapper`}>
            <div className={style.modalBody}>
                {componentState === 'signin' 
                ? <SignIn 
                    loading={loading} 
                    handleLogin={handleLogin} 
                    setComponentState={setComponentState} 
                />
                : <SignUp
                    loading={loading}
                    handleSignUp={handleSignUp} 
                    setComponentState={setComponentState} />
                }
            </div>
        </div>,
        document.getElementById('sideMenuPortal')
    );
}

const SignIn = ({ setComponentState, handleLogin, loading }) => {

    return (
        <>
        {loading ? 
        <Spinner /> 
        : 
        <>
            <div className={style.close}>
                <Link to="/ads"><Close /></Link>
            </div>
            <div className={style.content}>
                <h1>Sign In to</h1>
                <img src={logo} alt="logo" />
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().required()
                    })}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                    <Form>
                        <TextField id="email" name="email" type="email" label="Email" placeholder="example@email.com" />
                        <TextField id="password" name="password" type="password" label="Password" placeholder="********" />
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
                <button onClick={() => setComponentState('signup')}>Create Account</button>
                <p>Create your account to post ads</p>
            </div>
        </>
        }
        </>
    );
}

const SignUp = ({ setComponentState, loading, handleSignUp }) => {
    return (
        <>
        {loading ? 
        <Spinner /> 
        :
        <>
            <div className={style.close}>
                <Link to="/ads"><Close /></Link>
            </div>
            <div className={style.content}>
                <h1>Create Account</h1>
                <img src={logo} alt="logo" />
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().required()
                    })}
                    onSubmit={(values) => {
                        handleSignUp(values);
                    }}
                >
                    <Form>
                        <TextField id="email" name="email" type="email" label="Email" placeholder="example@email.com" />
                        <TextField id="password" name="password" type="password" label="Password" placeholder="********" />
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
                <button onClick={() => setComponentState('signin')}>Sign in</button>
                <p>Create your account to post ads</p>
            </div>
        </>
        }
        </>
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

