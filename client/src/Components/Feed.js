import React, { useEffect, useState, useMemo, useContext } from 'react';
import SideMenu from './SideMenu';
import Navbar from './Navbar';
// import Modal from './Modal';
import LoginModal from './LoginModal';
// import LocationModal from './LocationModal';

import './Feed.scss';

import { Link, Route, Switch, useHistory } from 'react-router-dom';

import { FeedContext } from '../Context/FeedContext'; 

import { getAllPosts } from '../api/api';

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
    fetchData();
  });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await promise;
//         setFeedData(data.listPosts);
//       } catch (error) {
//         console.log('error on listing posts', error);
//       }
//     }

//     fetchData();

//     return () => {
//       API.cancel(promise, "my message for cancellation");
//     }
//   }, []);

  /*
  const updateAnalytics = async (currentId) => {
    try {
      // fetch post by id
      const { data } = await API.graphql({ query: getPost, variables: { id: currentId }, authMode: 'AWS_IAM' });
      // add click to analytics
      const updateAnalytics = {
        id: data.getPost.id,
        analytics: parseInt(data.getPost.analytics) + 1
      }
      // update clicks
      await API.graphql({ 
        query: updatePost, 
        variables: { input: updateAnalytics }, 
        authMode: 'AWS_IAM' 
      });
    } catch(error) {
      console.log(error);
    }
  }

  const handleAdClick = (id) => {
    updateAnalytics(id);
    history.push(`/ads/${id}`);
  }
  */

  // fill 400 grid boxes with empty grey boxes
  let gridItems = [];
  const countingGrid = () => {
    if (feedData.items && feedData.items.length < 50) {
      let boxes = 400 - feedData.items.length;
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
                  <img key={index} src={item.thumbnail} alt="feedbox"/>
                ))
              :
                null
            }
          {gridItems.map((box, index) => <div key={index} className="grid"></div>)}
            </div>
          </div>

        <Switch>
          {/* <Route path="/ads/location" component={LocationModal} /> */}
          <Route path="/ads/sign-in" component={LoginModal}/>
          {/* <Route path="/ads/:id" component={Modal} /> */}
        </Switch> 
      </div>
  );
}
