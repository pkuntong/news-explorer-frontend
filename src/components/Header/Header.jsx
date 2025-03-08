import './header.css';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header({ onLoginClick, onLogout, onRegisterClick, handleSearch }) {
  return (
    <>
      <header className='header'>
        <Navigation
          onLoginClick={onLoginClick}
          onLogout={onLogout}
          onRegisterClick={onRegisterClick}
        />
        <SearchForm handleSearch={handleSearch} />
      </header>
    </>
  );
}

export default Header;