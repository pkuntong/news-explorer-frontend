import './NewsCard.css';
import { useLocation } from 'react-router-dom';
import { keywordContext } from '../../contexts/keyWordContext';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';
import { currentPageContext } from '../../contexts/currentPageContext';
import { currentUserContext } from '../../contexts/currentUserContext';
import { useContext, useEffect, useState } from 'react';

function NewsCard({
  newsData,
  handleSaveArticle,
  handleRemoveArticle,
  onClick,
}) {
  let formattedDate;

  if (newsData.publishedAt) {
    formattedDate = new Date(newsData.publishedAt).toLocaleDateString(
      'default',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    );
  } else {
    formattedDate = '';
  }

  const location = useLocation();

  const { currentPage, setCurrentPage } = useContext(currentPageContext);
  const { savedArticles } = useContext(savedArticlesContext);
  const { keyword } = useContext(keywordContext);
  const { isLoggedIn } = useContext(currentUserContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = () => {
    handleSaveArticle({ newsData, keyword });
  };

  const handleRemoveClick = () => {
    handleRemoveArticle(newsData);
  };

  const capitalizeFirstLetter = string => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  return (
    <section className='news-card'>
      {currentPage === '/saved-news' && (
        <>
          <h3 className='news__keyword'>
            {capitalizeFirstLetter(newsData.keyword)}
          </h3>
          <p
            className={`news__popup-text ${
              isHovered ? '' : 'news__popup-text_hidden'
            }`}
          >
            Remove from saved
          </p>
          <button
            className='news__button-delete'
            onClick={handleRemoveClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </>
      )}

      {isLoggedIn && currentPage === '/' ? (
        <button
          className={`news__button-bookmark ${
            savedArticles.some(
              savedArticles => savedArticles.link === newsData.url
            )
              ? 'news__button-bookmark_marked'
              : ''
          }`}
          onClick={newsData.isSaved ? handleRemoveClick : handleBookmarkClick}
        />
      ) : (
        ''
      )}
      {!isLoggedIn && (
        <>
          <p
            className={`news__popup-text ${
              isHovered ? '' : 'news__popup-text_hidden'
            }`}
          >
            Sign in to save articles
          </p>

          <button
            className='news__button-bookmark'
            onClick={onClick}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          />
        </>
      )}

      <a
        className='news-card__link'
        href={newsData.url}
        target='_blank'
        rel='noreferrer'
      >
        {newsData.urlToImage && (
          <img
            className='news-card__image'
            src={newsData.urlToImage}
            alt={newsData.title}
          />
        )}

        <section className='news-card__text'>
          <h5 className='news-card__date'>{formattedDate}</h5>
          <h4 className='news-card__title'>{newsData.title}</h4>
          <p className='news-card__description'>
            {newsData.text || newsData.description}
          </p>
          {newsData.source && (
            <h5 className='news-card__source'>
              {newsData.source.name || newsData.source}
            </h5>
          )}
        </section>
      </a>
    </section>
  );
}

export default NewsCard;