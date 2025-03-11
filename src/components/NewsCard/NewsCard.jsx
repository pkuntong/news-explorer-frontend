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
    <article className='news-cards__item'>
      {currentPage === '/saved-news' && (
        <>
          <h3 className='news-cards__item-keyword'>
            {capitalizeFirstLetter(newsData.keyword)}
          </h3>
          <p
            className={`news-cards__item-popup-text ${
              isHovered && 'news-cards__item-popup-text_hidden'
            }`}
          >
            Remove from saved
          </p>
          <button
            className='news-cards__item-button-delete'
            onClick={handleRemoveClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </>
      )}

      {isLoggedIn && currentPage === '/' ? (
        <button
          className={`news-cards__item-button-bookmark ${
            savedArticles.some(
              savedArticles => savedArticles.link === newsData.url
            )
              ? 'news-cards__item-button-bookmark_marked'
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
            className={`news-cards__item-popup-text ${
              isHovered && 'news-cards__item-popup-text_hidden'
            }`}
          >
            Sign in to save articles
          </p>

          <button
            className='news-cards__item-button-bookmark'
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
        className='news-cards__item-link'
        href={newsData.url}
        target='_blank'
        rel='noreferrer'
      >
        {newsData.urlToImage && (
          <img
            className='news-cards__item-image'
            src={newsData.urlToImage}
            alt={newsData.title}
          />
        )}

        <div className='news-cards__item-text'>
          <h5 className='news-cards__item-date'>{formattedDate}</h5>
          <h4 className='news-cards__item-title'>{newsData.title}</h4>
          <p className='news-cards__item-description'>
            {newsData.text || newsData.description}
          </p>
          {newsData.source && (
            <h5 className='news-cards__item-source'>
              {newsData.source.name || newsData.source}
            </h5>
          )}
        </div>
      </a>
    </article>
  );
}

export default NewsCard;