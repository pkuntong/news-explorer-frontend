import './SavedNewsCardList.css';
import { useContext } from 'react';
import NewsCard from '../../NewsCard/NewsCard';
import { savedArticlesContext } from '../../../contexts/savedArticlesContext';
import { currentUserContext } from '../../../contexts/currentUserContext';

function SavedNewsCardList({ handleRemoveArticle, handleSaveArticle }) {
  const { savedArticles } = useContext(savedArticlesContext);
  const { currentUser } = useContext(currentUserContext);
  return (
    <section className='saved__news-card'>
      <article className='saved__news-cards__container'>
        {savedArticles
          .filter(article => article.owner === currentUser._id)
          .map((article, index) => (
            <NewsCard
              newsData={article}
              key={`${article._id}-${index}`}
              article={article}
              handleRemoveArticle={handleRemoveArticle}
              handleSaveArticle={handleSaveArticle}
            />
          ))}
      </article>
    </section>
  );
}

export default SavedNewsCardList;