import './ModalWithForm.css';

function SuccessfulModal({ isOpen, onClose, onLoginClick }) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className='modal__content-success'>
        <h2 className='modal__title-success'>
          Registration successfullly completed!
        </h2>
        <button
          className='modal__close-button'
          type='button'
          onClick={onClose}
        ></button>
        <button
          className='modal__submit-button'
          type='button'
          onClick={onLoginClick}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessfulModal;