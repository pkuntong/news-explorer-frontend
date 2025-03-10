import { useEffect, useContext } from 'react';
import ModalWithForm from './ModalWithForm';
import { useForm } from '../../Hooks/useForm';
import { currentUserContext } from '../../contexts/currentUserContext';

const SigninModal = ({
  isOpen,
  onClose,
  onRegisterClick,
  onLogInClick,
  IsLoading,
}) => {
  const currentUser = useContext(currentUserContext);
  const inputValues = {
    email: '',
    password: '',
  };

  const { values, handleChange, errors, isValid, resetForm } = useForm(
    inputValues,
    currentUser
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      onLogIn(values);
    }
  };

  useEffect(() => {
    resetForm(inputValues);
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title='Sign in'
      buttonText={IsLoading ? 'Loading...' : 'Sign in'}
      alternateButtonText="or Sign up"
    >
      <label htmlFor='email1' className='modal__label'>
        Email
        <input
          className={`modal__input ${errors.email ? 'modal__input-error' : ''}`}
          type='email'
          name='email'
          id='email1'
          placeholder='Email'
          value={values.email}
          onChange={handleChange}
          required
          autoComplete='current-email'
        />
         <span className='modal__error'>{errors.email}</span>
      </label>
      <label htmlFor='password' className='modal__label'>
        Password
        <input
          className={`modal__input ${
            errors.password ? 'modal__input-error' : ''
          }`}
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={values.password}
          onChange={handleChange}
          required
          autoComplete='current-password'
        />
        <span className='modal__error'>{errors.password}</span>
      </label>
      <button type='submit' className='modal__submit-button'>
        Sign in
      </button>
      <button onClick={onRegisterClick} className='modal__alternate-button'>
        {' '}
        or <span className='modal__alternate-button-text'>Sign up</span>
      </button>
    </ModalWithForm>
  );
};

export default SigninModal;