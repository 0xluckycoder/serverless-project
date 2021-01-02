import React, { useEffect, useState, useMemo, useContext } from 'react';
import SideMenu from './SideMenu';
import Navbar from './Navbar';
// import Modal from './Modal';
import LoginModal from './LoginModal';
// import LocationModal from './LocationModal';

import './Feed.scss';

import { Link, Route, Switch, useHistory } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext'; 

import { FeedContext } from '../Context/FeedContext'; 

// import { API, graphqlOperation } from 'aws-amplify';
// import { getPost, listPosts } from '../graphql/queries';
// import { updatePost } from '../graphql/mutations';

export default function Feed() {

//   const promise = API.graphql({query: listPosts, authMode: 'AWS_IAM'});

  const { feedData, setFeedData } = useContext(FeedContext);

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

  let history = useHistory();


  let gridItems = [];

  const countingGrid = () => {
    if (feedData.items && feedData.items.length < 50) {
      let boxes = 400 - feedData.items.length;

      console.log('boxes', boxes);

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
            {feedData.items ? feedData.items.map((item, index) => (
              <img key={index} 
              /* onClick={() => handleAdClick(item.id)} */ 
              src={`https://res.cloudinary.com/dw2wcjhod/image/fetch/w_100,h_100,q_auto/${item.thumbnail}`} alt="feedbox"/>
            ))
          : null}
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
