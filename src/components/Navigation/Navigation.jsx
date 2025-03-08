import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

import logOutBlack from '../../assets/logout-Black.svg';
import logOutWhite from '../../assets/logout-White.svg';

import MobileMenu from '../MobileMenu/MobileMenu';

import { currentPageContext } from '../../contexts/currentPageContext';
import { mobileContext } from '../../contexts/mobileContext';
import { currentUserContext } from '../../contexts/currentUserContext';

function Navigation({ onLoginClick, onLogout }) {
  const { currentPage, activeModal } = useContext(currentPageContext);
  const { currentUser, isLoggedIn } = useContext(currentUserContext);
  const { mobileMenuOpen, openMobileMenu, closeMobileMenu } =
    useContext(mobileContext);

  const handleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return (
    <nav
      className={`main-nav ${currentPage === '/saved-news' ? 'saved-nav' : ''}`}
    >
      <div
        className={`main-nav__container ${
          currentPage === '/saved-news' ? 'saved-nav__container' : ''
        } ${mobileMenuOpen ? 'main-nav__menu-open' : ''}`}
      >
        {currentPage === '/' || mobileMenuOpen ? (
          <NavLink to='/'>
            <p className='main-nav__logo-white main-nav__logo '>NewsExplorer</p>
          </NavLink>
        ) : (
          <NavLink to='/'>
            <p className='main-nav__logo-black main-nav__logo '>NewsExplorer</p>
          </NavLink>
        )}

        {currentPage === '/' ? (
          <button
            className={`main-nav__btn ${
              activeModal === '' ? 'main-nav__btn_hidden' : ''
            } ${mobileMenuOpen === true ? 'main-nav__btn_close' : ''}`}
            onClick={handleMobileMenu}
          />
        ) : (
          <button
            className={`saved-nav__btn ${
              activeModal === '' ? 'saved-nav__btn_hidden' : ''
            } ${mobileMenuOpen === true ? 'saved-nav__btn_close' : ''}`}
            onClick={handleMobileMenu}
          />
        )}

        {mobileMenuOpen && (
          <MobileMenu onLoginClick={onLoginClick} onLogout={onLogout} />
        )}

        {isLoggedIn && currentPage === '/' ? (
          <nav className='main-nav__menu'>
            <NavLink to='/' className='main-nav__menu-item'>
              Home
            </NavLink>
            <NavLink to='/saved-news' className='main-nav__menu-saved'>
              Saved Articles
            </NavLink>
            <button
              className={`main-nav__menu-btn ${
                currentPage === '/' ? 'main-nav__menu-btn-white' : ''
              }`}
              onClick={onLogout}
            >
              <span className='main-nav__menu-username'>
                {currentUser.name}
              </span>
              <img
                src={currentPage === '/' ? logOutWhite : logOutBlack}
                alt='logout'
                className='main-nav__menu-icon'
              />
            </button>
          </nav>
        ) : isLoggedIn && currentPage === '/saved-news' ? (
          <nav className='main-nav__menu saved-nav__menu'>
            <NavLink to='/' className='saved-nav__menu-item'>
              Home
            </NavLink>
            <NavLink to='/saved-news' className='main-nav__menu-saved-user'>
              Saved Articles
            </NavLink>
            <button
              className={`saved-nav__menu-btn-black  ${
                currentPage === '/' ? 'main-nav__menu-btn' : ''
              }`}
              onClick={onLogout}
            >
              <span className='main-nav__menu-username'>
                {currentUser.name}
              </span>
              <img
                src={currentPage === '/' ? logOutWhite : logOutBlack}
                alt='logout'
                className='main-nav__menu-icon'
              />
            </button>
          </nav>
        ) : (
          <div
            className={`main-nav__buttons ${
              mobileMenuOpen ? 'main-nav__menu-open' : ''
            }`}
          >
            <NavLink to='/' className='main-nav__menu-item'>
              Home
            </NavLink>
            <button className='main-nav__button-signin' onClick={onLoginClick}>
              Sign in
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;