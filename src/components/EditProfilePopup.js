import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isDataLoad }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    //* Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isDataLoad ? "Сохраняем..." : "Сохранить профиль"}
    >
      <input
        className="popup__input-line"
        value={name || ""}
        onChange={handleChangeName}
        type="text"
        name="name"
        id="name"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__error" id="name-error"></span>
      <input
        className="popup__input-line"
        value={description || ""}
        onChange={handleChangeDescription}
        type="text"
        name="about"
        id="job"
        placeholder="Ваше занятие"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
