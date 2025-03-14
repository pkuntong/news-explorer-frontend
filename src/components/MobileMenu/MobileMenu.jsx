import './MobileMenu.css';
import logOutWhite from '../../assets/logout-white.svg';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { currentUserContext } from '../../contexts/currentUserContext';

const MobileMenu = ({ onLoginClick, onLogout, onCloseMenu }) => {
  const { isLoggedIn, currentUser } = useContext(currentUserContext);

  const handleCloseMenu = () => {
    onCloseMenu();
  };

  return (
    <nav className='mobile'>
      <nav className='mobile__content'>
        <nav className='mobile__links'>
          <nav className='mobile__link-NewsExplorer' onClick={handleCloseMenu}>
            NewsExplorer
          </nav>
          <button
            className='mobile__link-NewsExplore-close'
            onClick={handleCloseMenu}
          ></button>
          <div className='mobile__link'>
            <NavLink
              to='/'
              className='mobile__link-container mobile__link-home '
              onClick={handleCloseMenu}
            >
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to='/saved-news'
                className='mobile__link-container'
                onClick={handleCloseMenu}
              >
                Saved articles
              </NavLink>
            )}
            {isLoggedIn ? (
              <button className='mobile__button-loggedin' onClick={onLogout}>
                <p className='mobile__user-loggedin'>{currentUser.name}</p>
                <img
                  src={logOutWhite}
                  alt='logout'
                  className='mobile__logout-icon'
                />
              </button>
            ) : (
              <button className='mobile__button' onClick={onLoginClick}>
                Sign in
              </button>
            )}
          </div>
        </nav>
      </nav>
    </nav>
  );
};

export default MobileMenu;