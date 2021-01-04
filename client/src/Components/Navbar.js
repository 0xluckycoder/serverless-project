import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

import logo from '../assets/logo.png';
import { ReactComponent as Toggle } from '../assets/toggle.svg';
import { ReactComponent as SearchBar } from '../assets/search.svg';
import { ReactComponent as Facebook } from '../assets/facebook.svg';
import { ReactComponent as Instagram } from '../assets/instagram.svg';
import { ReactComponent as Location } from '../assets/location.svg';

// import { API, graphqlOperation } from 'aws-amplify';
// import { listPosts, searchPosts } from '../graphql/queries';

import { PortalContext } from '../Context/PortalContext';
import { FeedContext } from '../Context/FeedContext'; 

import { ACTIONS } from '../actions';
export default function Navbar({ auth }) {
  const { state, dispatch } = useContext(PortalContext);

  const { setFeedData } = useContext(FeedContext);

  const [suggestions, setSuggestions] = useState({});

  const [loading, setLoading] = useState(false);

  const inputStatus = useRef(false);

  // clear input search field
  const inputRef = useRef(null);

  const clearInput = () => {
    inputRef.current.value = "";
  }

  // mobile search bar
  const [toggle, setToggle] = useState(false);

  // open
  const useMobileOutsideHandler = (ref) => {
    useEffect(() => {

      const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggle(false);
          // setToggle(false);
        }
      }

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    }, [ref]);
  }

  const mobileRef = useRef(null);
  useMobileOutsideHandler(mobileRef);
  // end



  return (
    <>
      <div className="nav-wrapper">
        <div className="nav-left">
          <Toggle onClick={() => dispatch({ type: ACTIONS.SIDE_MENU })} />
          <img src={logo} alt="logo" />
          <div className="search-bar">
            <input ref={inputRef} type="search" placeholder="Search" />
            {inputStatus.current ? <i onClick={() => clearInput()} className="fas fa-times"></i> : <i className="fas fa-search"></i>}
          </div>
        </div>
        <div className="nav-center">
          <Link to="/ads/location"><Location /></Link>
        </div>

        <div className="nav-right">
          <Facebook onClick={() => console.log(suggestions.items)} />
          <a target="_blank" href="https://www.instagram.com/hotbox.srilanka"><Instagram /></a>
        </div>
      </div>

      <div className="mobile-top-nav">
        <Toggle onClick={() => dispatch({ type: ACTIONS.SIDE_MENU })} />
        <SearchBar onClick={() => setToggle(!toggle)}  />
        <img src={logo} alt="logo" />
        <Facebook />
        <Instagram />
      </div>

      <div ref={mobileRef} className={`mobile-search-bar ${toggle ? `show` : `hide`} `}>
        <input type="text" placeholder="Search" />
      </div>

      <div className="mobile-bottom-nav">
        <Link to="/ads/location"><Location /></Link>
      </div>
    </>
  );
}
