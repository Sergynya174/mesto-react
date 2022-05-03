import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, isDataLoad }) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    //* Передаём значения управляемых компонентов во внешний обработчик
    onAddCard({
      name: placeName,
      link: placeLink,
    });
  }

  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isDataLoad ? "Добавляем..." : "Добавить карточку"}
    >
      <input
        className="popup__input-line"
        value={placeName || ""}
        onChange={handleChangePlaceName}
        type="text"
        name="title"
        id="title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error" id="title-error"></span>
      <input
        className="popup__input-line"
        value={placeLink || ""}
        onChange={handleChangePlaceLink}
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
