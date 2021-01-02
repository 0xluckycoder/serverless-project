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

  /*
  const handleInput = async (e) => {
    setLoading(true);
    if (e.target.value === "") {
      inputStatus.current = false;
      setSuggestions({}); 
    } else {
      // hide the search icon
      inputStatus.current = true;
      try {
        const { data } = await API.graphql({ query: searchPosts, authMode: 'AWS_IAM', variables: { filter: { brand_name: { matchPhrasePrefix: e.target.value }} } });
        setSuggestions(data.searchPosts);
      } catch (error) {
        console.log('error on searching' ,error);
      }
    }
    setLoading(false);
  }
  */


  const handleSearchButton = (item) => {
    console.log('hello world');
    // setFeedData({items: [item]});
  }

  /*
  const handleLogoClick = async () => {
    try {
      const { data } = await API.graphql({query: listPosts, authMode: 'AWS_IAM'});
      setFeedData(data.listPosts);
    } catch (error) {
      console.log('error listing posts click logo', error);
    }
  }
  */

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
          <img /* onClick={() => handleLogoClick()} */ src={logo} alt="logo" />
          <div className="search-bar">
            <input ref={inputRef} /* onChange={(e) => handleInput(e)} */ type="search" placeholder="Search" />
            {inputStatus.current ? <i onClick={() => clearInput()} className="fas fa-times"></i> : <i className="fas fa-search"></i>}
          </div>
          {/* {loading
          // search bar loading spinner 
          ? <div className="suggestions-box">
             <Spinner />
            </div> 
            // desktop suggestions box
          : <DesktopSuggestions suggestions={suggestions} setSuggestions={setSuggestions}  handleSearchButton={handleSearchButton} />} */}

        </div>
        <div className="nav-center">
          <Link to="/ads/location"><Location /></Link>
          <div className="nav-mango-card">
            <Link to="/account"><p>HOTCARD</p></Link>
          </div>
        </div>

        <div className="nav-right">
          <Facebook onClick={() => console.log(suggestions.items)} />
          <a target="_blank" href="https://www.instagram.com/hotbox.srilanka"><Instagram /></a>
        </div>
      </div>

      <div className="mobile-top-nav">
        <Toggle onClick={() => dispatch({ type: ACTIONS.SIDE_MENU })} />
        <SearchBar onClick={() => setToggle(!toggle)}  />
        <img /*onClick={() => handleLogoClick()}*/ src={logo} alt="logo" />
        <Facebook />
        <Instagram />
      </div>

      <div ref={mobileRef} className={`mobile-search-bar ${toggle ? `show` : `hide`} `}>
        <input /*onChange={(e) => handleInput(e)} */ type="text" placeholder="Search" />
        {/* {loading 
          ? null
          : <MobileSuggestions suggestions={suggestions} setSuggestions={setSuggestions} handleSearchButton={handleSearchButton} setToggle={setToggle} />} */}
      </div>

      <div className="mobile-bottom-nav">
        <Link to="/ads/location"><Location /></Link>
        {/* <div className="nav-mango-card">
          <p>MANGO CARD</p>
        </div> */}
      </div>
    </>
  );
}

// const MobileSuggestions = ({ suggestions, setSuggestions, handleSearchButton, setToggle }) => {

//   return (
//     <div className={`${suggestions.items ? `mobile-suggestions-box` : `suggestions-hide`}`}>
//       {suggestions.items && suggestions.items.map((item, index) => (
//         <>
//         <div className="mobile-search-item" key={index} onClick={() => handleSearchButton(item)}>
//           <p>{item.brand_name}</p>
//           <i className="fas fa-search"></i>
//         </div>
//         </>
//       ))}
//     </div>
//   );
// }

// const DesktopSuggestions = ({ suggestions, setSuggestions, handleSearchButton }) => {

//   const [hide, setHide] = useState(false);

//   // handling suggestion box outside click
//   const useOutsideHandler = (ref) => {
//     useEffect(() => {

//       const handleOutsideClick = (event) => {
//         if (ref.current && !ref.current.contains(event.target)) {
//           setHide(true);
//         }
//       }
//       document.addEventListener("mousedown", handleOutsideClick);
//       return () => {
//         document.removeEventListener("mousedown", handleOutsideClick);
//       }
//     }, [ref]);
//   }

//   const wrapperRef = useRef(null);
//   useOutsideHandler(wrapperRef);

//   return (
//     <div ref={wrapperRef} className={`${suggestions.items ? `suggestions-box`: `suggestions-hide`} ${hide && 'suggestions-hide'}`}>
//       {suggestions.items && suggestions.items.map((item, index) => (
//         <div className="search-item" key={index} onClick={() => handleSearchButton(item)}>
//           <p>{item.brand_name}</p>
//           <i className="fas fa-search"></i>
//         </div>
//       ))}
//     </div>
//   );
// }

const Spinner = () => {
  return (
    <div className="search-spinner spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
