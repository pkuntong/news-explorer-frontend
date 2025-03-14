import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import MobileMenu from '../MobileMenu/MobileMenu';
import SigninModal from '../ModalWithForm/SigninModal';
import RegisterModal from '../ModalWithForm/RegisterModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SuccessfulModal from '../ModalWithForm/SuccessfulModal';

import { mobileContext } from '../../contexts/mobileContext';
import { keywordContext } from '../../contexts/keyWordContext';
import { currentPageContext } from '../../contexts/currentPageContext';
import { hasSearchedContext } from '../../contexts/hasSearchedContext';
import { currentUserContext } from '../../contexts/currentUserContext';
import { searchResultContext } from '../../contexts/searchResultContext';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';

import { getSearchResult } from '../../utils/NewsApi';
import { checkToken, authorize, register } from '../../utils/Auth';
import {
  getSavedArticles,
  removeSavedArticle,
  addSavedArticle,
} from '../../utils/Api';
import Footer from '../Footer/Footer';

function App() {
  const [activeModal, setActiveModal] = useState('');
  const [keyword, setkeyword] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [currentUser, setCurrentUser] = useState({
    name: '',
    _id: '',
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const location = useLocation();

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const onClose = () => {
    setActiveModal('');
  };

  const openSuccessModal = () => {
    setIsSuccessful(true);
  };

  const onCloseSuccessModal = () => {
    setIsSuccessful(false);
  };

  const handleSignInModalClick = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    setActiveModal('sign-in');
  };

  const handleRegisterModalClick = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    setActiveModal('sign-up');
  };

  const handleSearch = keyword => {
    setkeyword(keyword);
    setIsSearching(true);
    setIsLoading(true);
    getSearchResult(keyword)
      .then(res => {
        setSearchResult(res.articles);
        setHasSearched(true);
        setIsSearching(false);
        setSearchError(false);
      })
      .catch(err => {
        console.log(err);
        setIsSearching(false);
        setSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveArticle = ({ newsData }) => {
    removeSavedArticle(newsData)
      .then(() => {
        const unsavedNewsArticles = savedArticles.filter(
          article => article._id !== newsData._id
        );
        setSavedArticles(unsavedNewsArticles);
        localStorage.setItem(
          'savedArticles',
          JSON.stringify(unsavedNewsArticles)
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  // * * Handlers Save Article  * *
  const handleSaveArticle = ({ newsData, keyword }) => {
    const isArticleSaved = savedArticles.some(
      article => article.link === newsData.url
    );

    const updateSearchResult = newArticle => {
      const updatedSearchResult = searchResult.map(article =>
        article.url === newsData.url ? newArticle : article
      );
      setSearchResult(updatedSearchResult);
    };

    if (!isArticleSaved) {
      addSavedArticle(newsData, keyword)
        .then(res => {
          const newArticle = { ...newsData, _id: res._id };
          const updatedSavedArticles = [res, ...savedArticles];
          setSavedArticles(updatedSavedArticles);
          localStorage.setItem(
            'savedArticles',
            JSON.stringify(updatedSavedArticles)
          );
          updateSearchResult(newArticle);
        })
        .catch(err => console.error(err));
    } else {
      removeSavedArticle(newsData)
        .then(() => {
          const unsavedArticles = savedArticles.filter(
            article => article._id !== newsData._id
          );
          setSavedArticles(unsavedArticles);
          localStorage.setItem(
            'savedArticles',
            JSON.stringify(unsavedArticles)
          );
          updateSearchResult({ ...newsData, _id: '' });
        })
        .catch(err => console.error(err));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSignIn = ({ email, password }) => {
    authorize({ email, password })
      .then(() => {
        checkToken()
          .then(res => {
            setCurrentUser({
              email: res.data.email,
              _id: res.data._id,
            });
            setIsLoggedIn(true);
            onClose();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });

    localStorage.setItem('user', JSON.stringify(currentUser));
    setIsLoggedIn(true);
    setCurrentUser(currentUser);
  };

  const handleSignUp = ({ name, email, password }) => {
    register({ name, email, password })
      .then(res => {
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
        });
        setIsLoggedIn(false);
        openSuccessModal(true);
        onClose();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleOverlayClick = e => {
      if (e.target.classList.contains('modal')) {
        onClose();
      }
    };

    document.addEventListener('click', handleOverlayClick);
    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  }, []);

  useEffect(() => {
    setIsLoggedInLoading(true);
    checkToken()
      .then(res => {
        if (res) {
          setCurrentUser(res.data);
          getSavedArticles()
            .then(articles => {
              setSavedArticles(articles);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoggedInLoading(false);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleEscClose = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  useEffect(() => {
    const storedArticles = localStorage.getItem('savedArticles');
    if (storedArticles) {
      setSavedArticles(JSON.parse(storedArticles));
    }
  }, []);

  // * * Render * *
  return (
    <div className='page'>
      <currentPageContext.Provider value={{ currentPage, setCurrentPage }}>
        <currentUserContext.Provider value={{ isLoggedIn, currentUser }}>
          <hasSearchedContext.Provider value={{ hasSearched, setHasSearched }}>
            <searchResultContext.Provider
              value={{ searchResult, setSearchResult }}
            >
              <savedArticlesContext.Provider
                value={{ savedArticles, setSavedArticles }}
              >
                <keywordContext.Provider value={{ keyword, setkeyword }}>
                  <mobileContext.Provider
                    value={{ mobileMenuOpen, openMobileMenu, closeMobileMenu }}
                  >
                    <div className='page__content'>
                      <Routes>
                        <Route
                          path='/'
                          element={
                            <Main
                              handleSearch={handleSearch}
                              searchError={searchError}
                              isLoading={isLoading}
                              handleRemoveArticle={handleRemoveArticle}
                              handleSaveArticle={handleSaveArticle}
                              onLoginClick={handleSignInModalClick}
                              onLogout={handleLogout}
                              onRegisterClick={handleRegisterModalClick}
                            />
                          }
                        />

                        <Route
                          path='/saved-news'
                          element={
                            <ProtectedRoute
                              isLoggedIn={isLoggedIn}
                              isLoggedInLoading={isLoading}
                            >
                              <SavedNews
                                handleRemoveArticle={handleRemoveArticle}
                              />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                      {mobileMenuOpen && (
                        <MobileMenu
                          onLoginClick={handleSignInModalClick}
                          onLogout={handleLogout}
                          onCloseMenu={closeMobileMenu}
                        />
                      )}

                      <SigninModal
                        isOpen={activeModal === 'sign-in'}
                        onClose={onClose}
                        onRegisterClick={handleRegisterModalClick}
                        onLogInClick={handleSignInModalClick}
                        onLogIn={handleSignIn}
                        activeModal={activeModal}
                        isLoading={isLoading}
                      />
                      <RegisterModal
                        isOpen={activeModal === 'sign-up'}
                        onClose={onClose}
                        onLoginClick={handleSignInModalClick}
                        onRegisterClick={handleRegisterModalClick}
                        onRegister={handleSignUp}
                        activeModal={activeModal}
                        isLoading={isLoading}
                      />
                      <SuccessfulModal
                        onClose={onCloseSuccessModal}
                        isOpen={isSuccessful}
                        onLoginClick={() => {
                          handleSignInModalClick();
                          onCloseSuccessModal();
                        }}
                      />
                    </div>
                    <Footer />
                  </mobileContext.Provider>
                </keywordContext.Provider>
              </savedArticlesContext.Provider>
            </searchResultContext.Provider>
          </hasSearchedContext.Provider>
        </currentUserContext.Provider>
      </currentPageContext.Provider>
    </div>
  );
}

export default App;