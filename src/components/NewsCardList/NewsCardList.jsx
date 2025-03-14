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
    <section className='news-cards'>
      {hasSearched ? (
        <>
          <h2 className='news-cards__title'>Search results</h2>
          <ul className='news-cards__list'>
            {searchResult.slice(0, cardsDisplayed).map((result, index) => (
              <li className='news-cards__item' key={result.id || index}>
                <NewsCard
                  newsData={result}
                  handleSaveArticle={handleSaveArticle}
                  handleRemoveArticle={handleRemoveArticle}
                  onClick={onLoginClick}
                />
              </li>
            ))}
          </ul>
          <button
            className={`news-cards__button ${
              cardsDisplayed >= searchResult.length ? 'news-cards__button_hidden' : ''
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