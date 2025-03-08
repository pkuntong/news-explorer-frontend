import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useState, useContext } from 'react';
import { searchResultContext } from '../../contexts/searchResultContext';
import { hasSearchedContext } from '../../contexts/hasSearchedContext';

const NewsCardList = ({
  handleSaveArticle,
  handleRemoveArticle,
  onLoginClick,
}) => {
  const [cardsDisplayed, setCardsDisplayed] = useState(3);

  const { searchResult } = useContext(searchResultContext);

  const { hasSearched } = useContext(hasSearchedContext);

  const increaseVisibleCards = () => {
    setCardsDisplayed(cardsDisplayed + 3);
  };

  return (
    <section className='news__card-section'>
      {hasSearched ? (
        <>
          <h2 className='news__cards-header'>Search results</h2>
          <article className='news__cards-container'>
            {searchResult.slice(0, cardsDisplayed).map((result, index) => (
              <li className='news__card-list' key={result.id || index}>
                <NewsCard
                  newsData={result}
                  handleSaveArticle={handleSaveArticle}
                  handleRemoveArticle={handleRemoveArticle}
                  onClick={onLoginClick}
                />
              </li>
            ))}
          </article>
          <button
            className={`news__cards-button ${
              cardsDisplayed >= searchResult.length ? 'hidden' : ''
            }`}
            onClick={increaseVisibleCards}
          >
            Show more
          </button>
        </>
      ) : (
        ''
      )}
    </section>
  );
};

export default NewsCardList;