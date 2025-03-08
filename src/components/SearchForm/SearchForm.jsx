import './SearchForm.css';
import { useContext } from 'react';
import { keywordContext } from '../../contexts/keyWordContext';

function SearchForm({ handleSearch }) {
  const { keyword, setkeyword } = useContext(keywordContext);

  const handleSubmit = event => {
    event.preventDefault();
    handleSearch(keyword);
  };

  const handleKeyWord = event => {
    setkeyword(event.target.value);
  };

  return (
    <section className='search'>
      <h1 className='search__header'>What's going on in the world?</h1>
      <p className='search__subHeader'>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='search-form__container'>
          <input
            className='search-form__input'
            type='text'
            id='search'
            value={keyword}
            placeholder='Enter Topic'
            onChange={handleKeyWord}
            required
          />
          <button type='submit' className='search-form__button'>
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;