import React, { useContext, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './SideMenu.scss';
import { ReactComponent as Close } from '../assets/close-icon.svg';
import { ACTIONS } from '../actions';

// import { API } from 'aws-amplify';
// import { postsByCategory } from '../graphql/queries';

// consume context
import { PortalContext } from '../Context/PortalContext';
import { FeedContext } from '../Context/FeedContext'; 

export default function SideMenu() {

  const { state, dispatch } = useContext(PortalContext);

  const useOutSideHandler = (ref) => {
    useEffect(() => {

      const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch({ type: ACTIONS.CLOSE_SIDE_MENU })
        }
      }
  
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    }, [ref]);
  }

  const menuRef = useRef(null);
  useOutSideHandler(menuRef);
    
  return ReactDOM.createPortal(
    <div ref={menuRef}
      className={`${
        state.sideMenu ? `side-menu-wrapper show-menu` : `side-menu-wrapper`
      }`}
    >
      <MenuHeading
        icon={<Close onClick={() => dispatch({ type: ACTIONS.CLOSE_SIDE_MENU })} />}
      >
        Hotbox.lk
      </MenuHeading>
      <MenuItem>About us</MenuItem>
      <Link to="/ads/sign-in"><MenuItem>Sign in</MenuItem></Link>
      <MenuHeading>CATEGORIES</MenuHeading>
      <MenuItem categoryValue="fashion" icon={<i className="fas fa-tshirt"></i>}>Fashion</MenuItem>
      <MenuItem categoryValue="restaurantsCafes" icon={<i className="fas fa-utensils"></i>}>Restaurants & Cafes</MenuItem>
      <MenuItem categoryValue="spasSaloons" icon={<i className="fas fa-cut"></i>}>Spas & Saloons</MenuItem>
      <MenuItem categoryValue="homemade" icon={<i className="fas fa-hand-paper"></i>}>Homemade</MenuItem>
      <MenuItem categoryValue="services" icon={<i className="fas fa-circle"></i>}>Services</MenuItem>
      <MenuItem categoryValue="taxi" icon={<i className="fas fa-taxi"></i>}>Taxi</MenuItem>
      <MenuItem categoryValue="entertainment" icon={<i className="fas fa-compact-disc"></i>}>Entertainment</MenuItem>
      <MenuItem categoryValue="onlineStores" icon={<i className="fas fa-shopping-cart"></i>}>Online stores</MenuItem>
      <MenuItem categoryValue="finance" icon={<i className="fas fa-hand-holding-usd"></i>}>Finance</MenuItem>
      <MenuItem categoryValue="hospitals" icon={<i className="fas fa-stethoscope"></i>}>Hospitals</MenuItem>
      <MenuItem categoryValue="essentials" icon={<i className="fas fa-circle"></i>}>Essentials</MenuItem>
      <MenuItem categoryValue="tours" icon={<i className="fas fa-plane"></i>}>Tours</MenuItem>
      <MenuItem categoryValue="hotels" icon={<i className="fas fa-hotel"></i>}>Hotels</MenuItem>
      <MenuItem categoryValue="shoppingCentres" icon={<i className="fas fa-store"></i>}>Shopping Centres</MenuItem>
      <MenuItem categoryValue="wineStores" icon={<i className="fas fa-wine-bottle"></i>}>Wine Stores</MenuItem>
      <MenuItem categoryValue="properties" icon={<i className="fas fa-home"></i>}>Properties</MenuItem>
      <MenuItem categoryValue="furniture" icon={<i className="fas fa-couch"></i>}>Furniture</MenuItem>
      <MenuItem categoryValue="events" icon={<i className="far fa-calendar-alt"></i>}>Events</MenuItem>
      <MenuItem categoryValue="florists" icon={<i className="fas fa-circle"></i>}>Florists</MenuItem>
      <MenuItem categoryValue="freelancers" icon={<i className="fas fa-briefcase"></i>}>Freelancers</MenuItem>
      <MenuItem categoryValue="electronics" icon={<i className="fas fa-cog"></i>}>Electronics</MenuItem>
      <MenuItem categoryValue="advertising" icon={<i className="fas fa-ad"></i>}>Advertising</MenuItem>
      <MenuItem categoryValue="toysFun" icon={<i className="fas fa-baby"></i>}>Toys & Fun</MenuItem>
      <MenuItem categoryValue="vehicles" icon={<i className="fas fa-car"></i>}>Vehicles</MenuItem>
      <MenuItem categoryValue="hardware" icon={<i className="fas fa-tools"></i>}>Hardware</MenuItem>
      <MenuItem categoryValue="sports" icon={<i className="fas fa-futbol"></i>}>Sports</MenuItem>
    </div>,
    document.getElementById('sideMenuPortal')
  );
}

function MenuHeading({ children, icon }) {
  return (
    <div className="menu-item side-menu-heading">
      <p>{children}</p>
      {icon && icon}
    </div>
  );
}

function MenuItem({ children, icon, categoryValue }) {

  const { dispatch } = useContext(PortalContext);

  const { setFeedData } = useContext(FeedContext);

  const handleCategoryClick = async (category) => {
    console.log(category);
    dispatch({ type: ACTIONS.CLOSE_SIDE_MENU })
    // try {
    //   const { data } = await API.graphql({ query: postsByCategory, variables: { category }, authMode: 'AWS_IAM' });
    //   setFeedData(data.postsByCategory);
    //   dispatch({ type: ACTIONS.CLOSE_SIDE_MENU })
    // } catch (error) {
    //   console.log('error on postByCategory', error);
    // }
  }

  return (
    <div onClick={() => handleCategoryClick(categoryValue)} className="menu-item hover">
      <div className="menu-item-left">
        {icon && icon}
        <p>{children}</p>
      </div>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}
