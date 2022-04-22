import React from 'react';

function PopupWithForm(props) {
    return(
        <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.id}>
            <form name={props.name} className='popup__container' noValidate>
                <h2 className='popup__title'>{props.title}</h2>
                {props.children}
                <button className='popup__save-btn' type='submit'>
                {props.buttonText}
                </button>
                <button onClick={props.onClose} className='popup__close-btn' type='button' aria-label='Закрыть'></button>
            </form>
        </div>
    )
}

export default PopupWithForm;