import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `cards__remove ${
    isOwn ? "cards__remove_visible" : "cards__remove_hidden"
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `cards__like ${
    isLiked ? "cards__like_black" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="cards__card">
      <div className="cards__photo-container">
        <img
          className="cards__photo"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      <div className="cards__group">
        <h2 className="cards__text">{card.name}</h2>
        <div className="cards__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="cards__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
