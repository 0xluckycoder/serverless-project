import React, { useState, useEffect, useContext } from 'react';
import style from './edit.module.scss';
import { Link, useParams, Redirect } from 'react-router-dom';

import Overview from './Overview';
import Gallery from './Gallery';

// import { Form, Formik, FieldArray, useField } from 'formik';
// import * as Yup from 'yup';

// API
import { updatePost, getPostById } from '../../../api/api';
import { AuthContext } from '../../../Context/AuthContext';

export default function Edit() {

    const { state } = useContext(AuthContext);

    const [page, setPage] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState({});

    const { id } = useParams();

    useEffect(() => {
      let mounted = true;
      const fetchData = async () => {
        const data = await getPostById(id);
        setInitialData(data);
        setLoading(false);
      }

      fetchData();
      return () => {
        mounted = false;
      }
    }, []);

    return (
        state.isAuthenticated && state.user ?
        <>
        {
        loading ?
            <Spinner />
        :
            <div className={style.wrapper}>
                <Navigation page={page} setPage={setPage} />
                <Content page={page} setPage={setPage} initialData={initialData} currentPost={id} />
            </div>
        }
        </>
        :
        <Redirect to="/ads/sign-in" />
    );
}

const Navigation = ({ page, setPage }) => {
    return (
        <div className={style.navigation}>
            <button className={page === 'overview' ? style.selected: undefined} onClick={() => setPage('overview')}>Overview</button>
            <button className={page === 'gallery' ? style.selected: undefined} onClick={() => setPage('gallery')}>Gallery</button>
        </div>
    );
}

const Content = ({ page, initialData, currentPost }) => {

    const Page = () => {
        switch (page) {
            case 'overview':
                return <Overview initialData={initialData} currentPost={currentPost} />                
            case 'gallery':
                return <Gallery initialData={initialData} currentPost={currentPost} />
        }
    }

    return (
        <div className={style.content}>
            <Page />
        </div>
    );
}

// loading spinner
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