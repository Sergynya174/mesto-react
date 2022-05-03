import React from "react";
import Header from "./Header";
import Main from "./Main";
import { api } from "../utils/Api";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isDataLoad, setIsDataLoad] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([res, initialCards]) => {
        setCurrentUser(res);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function handleUpdateUser(newUserData) {
    setIsDataLoad(true);
    api
      .editProfile(newUserData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataLoad(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsDataLoad(true);
    api
      .addAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataLoad(false);
      });
  }

  function handleCardLike(card) {
    //* Снова проверяем, есть ли уже лайк на данной карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    //* Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeCardLike(card._id, isLiked)
      .then((newCard) => {
        //* Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        setCards(cards =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
        //* Обновляем стейт
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsDataLoad(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards =>
          cards.filter((newCard) => newCard._id !== card._id)
        );
        //* Обновляем стейт
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataLoad(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsDataLoad(true);
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataLoad(false);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isDataLoad={isDataLoad}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isDataLoad={isDataLoad}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          isDataLoad={isDataLoad}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
