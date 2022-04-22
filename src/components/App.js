import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({
        name: '',
        link: '',
    });

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
      };
    
      const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
      };
    
      const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
      };
    
      const handleCardClick = (card) => {
        setSelectedCard(card);
      };
    
      const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({});
      };

    return (
        <div className='page'>
            <Header />
            <Main 
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm 
                name='profile'
                title='Редактировать профиль'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                buttonText='Сохранить'
            >
                <input 
                className='popup__input-line' 
                type='text' name='name' 
                id='name' 
                placeholder='Ваше имя' 
                required 
                minLength='2' 
                maxLength='40'/>
                <span className='popup__error' id='name-error'></span>
                <input 
                className='popup__input-line' 
                type='text' 
                name='about' 
                id='job' 
                placeholder='Ваше занятие'
                required 
                minLength='2' 
                maxLength='200'/>
                <span className='popup__error' id='job-error'></span>
            </PopupWithForm>
            <PopupWithForm
                name='avatar'
                title='Обновить аватар'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                buttonText='Сохранить'
            >
                <input 
                className='popup__input-line' 
                type='url' name='url' 
                id='avatar' 
                placeholder='Ссылка на фото' 
                required/>
                <span className='popup__error' id='avatar-error'></span>
            </PopupWithForm>
            <PopupWithForm
                name='card'
                title='Новое место'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                buttonText='Создать'
            >
                <input 
                className='popup__input-line' 
                type='text' 
                name='title' 
                id='title' 
                placeholder='Название' 
                required 
                minLength='2' 
                maxLength='30'/>
                <span className='popup__error' id='title-error'></span>
                <input 
                className='popup__input-line' 
                type='url' 
                name='link' 
                id='link' 
                placeholder='Ссылка на картинку' 
                required/>
                <span className='popup__error' id='link-error'></span>
            </PopupWithForm>
            <PopupWithForm
                name='delete'
                title='Вы уверены?'
                buttonText='Да'
            ></PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
    );
}

export default App;
