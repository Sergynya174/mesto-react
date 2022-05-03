import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card.link && "popup_opened"}`} id="popup__img">
      <form className="popup__container-img" name="img" id="container-three">
        <img
          className="popup__img"
          src={`${card.link}`}
          alt={card.name}
          id="img"
        />
        <button
          className="popup__close-btn"
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          id="close-img"
        ></button>
        <h2 className="popup__name-img">{card.name}</h2>
      </form>
    </div>
  );
}

export default ImagePopup;
