import React from "react";

function PopupWithForm({
  isOpen,
  id,
  name,
  title,
  children,
  buttonText,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`} id={id}>
      <form
        name={name}
        className="popup__container"
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__save-btn" type="submit">
          {buttonText}
        </button>
        <button
          onClick={onClose}
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
