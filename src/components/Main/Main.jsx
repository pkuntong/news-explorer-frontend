import './Main.css';
import { useContext } from 'react';

import About from '../About/About';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';

import { searchResultContext } from '../../contexts/searchResultContext';
import { hasSearchedContext } from '../../contexts/hasSearchedContext';

function Main({
  searchError,
  isLoading,
  handleSearch,
  handleRemoveArticle,
  handleSaveArticle,
  onLoginClick,
  onLogout,
  onRegisterClick,
}) {
  const { searchResult } = useContext(searchResultContext);
  const { hasSearched } = useContext(hasSearchedContext);
  return (
    <>
      <Header
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onRegisterClick={onRegisterClick}
        handleSearch={handleSearch}
      />
      <main className='main'>
        <div>
          {hasSearched && searchResult.length > 0 ? (
            <NewsCardList
              onLoginClick={onLoginClick}
              handleSaveArticle={handleSaveArticle}
              handleRemoveArticle={handleRemoveArticle}
            />
          ) : hasSearched && searchResult.length === 0 ? (
            <NotFound />
          ) : isLoading ? (
            <Preloader />
          ) : searchError === true ? (
            <p>
              Sorry, something went wrong during the request. There may be a
              connection issue or the server may be down. Please try again
              later.
            </p>
          ) : (
            ''
          )}
        </div>
        <About />
      </main>
    </>
  );
}

export default Main;