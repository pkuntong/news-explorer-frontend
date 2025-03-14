import React, { useContext } from 'react';
import SavedNewsHeader from './SavedNewsHeader/SavedNewsHeader';
import SavedNewsCardList from './SavedNewsCardList/SavedNewsCardList';
import Navigation from '../Navigation/Navigation';
import { savedArticlesContext } from '../../contexts/savedArticlesContext';

const SavedNews = () => {
  const { savedArticles, setSavedArticles } = useContext(savedArticlesContext);

  const handleRemoveArticle = articleToRemove => {
    setSavedArticles(
      savedArticles.filter(article => article._id !== articleToRemove._id)
    );
    console.log(articleToRemove._id);
  };

  return (
    <>
      <Navigation />
      <section className='saved'>
        <SavedNewsHeader />
        <SavedNewsCardList handleRemoveArticle={handleRemoveArticle} />
      </section>
    </>
  );
};

export default SavedNews;