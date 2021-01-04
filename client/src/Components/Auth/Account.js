import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import style from './account.module.scss';
import { textFilter } from '../../helpers/helpers';

import { getPostsByUser, updatePost } from '../../api/api';
export default function Account() {

  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPostsByUser = async () => {
    setLoading(true);
    try {
      const allPosts = await getPostsByUser(state.user.user._id);
      console.log(allPosts);
      setPosts(allPosts);
      setLoading(false);
    } catch(error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPostsByUser();
  }, []);

  return (
    state.isAuthenticated && state.user ?
    <>
      <div className={style.wrapper}>
      <div className={style.header}>
          <p>Profile</p>
          <div className={style.email}>
            <i className="fas fa-user"></i>
            <p>{state.user && textFilter(state.user.user.email, 17)}</p>
          </div>
          <Link to="/create" className={style.createButton}>Post New Ad</Link>
        </div>
        {loading ? <Spinner /> : <AdItems posts={posts} fetchPostsByUser={fetchPostsByUser} />}
      </div>
    </>
    :
    <Redirect to="/ads/sign-in" />
  );
}

const AdItems = ({ posts, fetchPostsByUser }) => {

  const mutateOffers = async (item) => {
    try {
      const updateOffer = {
          offer: !item.offer
      }
      const updatedPost = await updatePost(item._id, updateOffer);
      console.log(updatedPost);
      fetchPostsByUser();
    } catch(error) {
      console.log(error);
    }
  }

  return (
    posts.length > 0 ?
    posts.map((item, index) => {
      return (
        <div key={index} className={style.body}>
        <div className={style.accordion}>
          <div
            className={style.card}
            data-toggle="collapse"
            data-target={`#collapseExample${index}`}
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <img src={item.thumbnail} alt="img" />
            <p>{item.brandName}</p>
            <i class="fas fa-chevron-down"></i>
          </div>
    
          <div className={`collapse ${style.collapse}`} id={`collapseExample${index}`}>
            <div className={style.collapseWrapper}>
              <div className={style.views}>
                <p className={style.viewsAmount}>{item.analytics}</p>
                <p>clicks</p>
              </div>
              <div className={style.offers}>
                <p>Offers</p>
                <div onClick={() => mutateOffers(item)}>
                  {item.offer ? <button className={style.enabled}>Enabled</button> : <button className={style.disabled}>Disabled</button> }
                </div>
              </div>
              <div className={style.buttons}>
                <Link to={`/account/${item._id}/edit`}><button>Edit</button></Link>
                <Link to={`/ads/${item._id}`}><button>View</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    })
  :
    <p>Create Your First Ad</p>
  );
}

const Spinner = () => {
  return (
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}