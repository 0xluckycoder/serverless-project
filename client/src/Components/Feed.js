import React, { useEffect, useContext } from 'react';
import SideMenu from './SideMenu';
import Navbar from './Navbar';
import Modal from './Modal';

import ConfirmModal from './Modals/ConfirmModal';
import LoginModal from './Modals/LoginModal';
import LocationModal from './Modals/LocationModal';
import HotcardModal from './Modals/HotcardModal';
import AboutModal from './Modals/AboutModal';
import ForgotPassword from './Modals/ForgotPassword';
import ChangePassword from './Modals/ChangePassword';

import './Feed.scss';

import { Route, Switch, useHistory } from 'react-router-dom';
import { FeedContext } from '../Context/FeedContext'; 
import { getAllPosts, getPostById, updateAnalytics } from '../api/api';

export default function Feed() {

  const { feedData, setFeedData } = useContext(FeedContext);

  const fetchData = async () => {
    try {
      const { posts } = await getAllPosts();
      setFeedData(posts)
    } catch(error) {
      console.log('error listing posts', error);
    }
  }

  useEffect(() => {
    console.log('feed loaded');
    fetchData();
  }, []);

  const handleAnalytics = async (id) => {
    try {
      const { post: { analytics } } = await getPostById(id);
      await updateAnalytics(id, analytics + 1);
    } catch(error) {
      console.log(error);
    }
  }

  // fill 400 grid boxes with empty grey boxes
  let gridItems = [];
  const countingGrid = () => {
    if (feedData && feedData.length < 50) {
      let boxes = 400 - feedData.length;
      for (let i = 0; i <= boxes; i++) {
        gridItems.push(i);
      }
    } else {
        for (let i = 0; i <= 400; i++) {
            gridItems.push(i);
        }
    }
  }

  countingGrid();

  let history = useHistory();

  // open the ad modal
  const handleClick = (id) => {
    handleAnalytics(id);
    history.push(`/ads/${id}`);
  }
  
  return (
      <div>
          <Navbar />
          <SideMenu />
        {/* 
         */}
          <div className="feed">
            <div className="image-list">
            {
              feedData ? 
                feedData.map((item, index) => (
                  <img key={index} onClick={() => handleClick(item._id)} src={item.thumbnail} alt="feedbox"/>
                ))
              :
                null
            }
          {gridItems.map((box, index) => <div key={index} className="grid"></div>)}
            </div>
          </div>

        <Switch>
          {/* <Route path="/ads/location" component={LocationModal} /> */}
          <Route path="/ads/changePassword/:token/:id" component={ChangePassword} />
          <Route path="/ads/forgotPassword" component={ForgotPassword} />
          <Route path="/ads/confirm" component={ConfirmModal} />
          <Route path="/ads/sign-in" component={LoginModal}/>
          <Route path="/ads/location" component={LocationModal} />
          <Route path="/ads/hotcard" component={HotcardModal} />
          <Route path="/ads/about" component={AboutModal} />
          <Route path="/ads/:id" component={Modal} />
        </Switch> 
      </div>
  );
}
