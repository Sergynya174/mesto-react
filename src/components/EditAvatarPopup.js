import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isDataLoad }) {
  const avatarRef = React.useRef(); //* записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ url: avatarRef.current.value });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isDataLoad ? "Обновляем..." : "Обновить"}
    >
      <input
        ref={avatarRef}
        className="popup__input-line"
        type="url"
        name="url"
        id="avatar"
        placeholder="Ссылка на фото"
        required
      />
      <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
