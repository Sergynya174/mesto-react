import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-conteiner">
          {avatar && (
            <img className="profile__avatar" src={avatar} alt="Аватарка" />
          )}
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{name}</h1>
          <p className="profile__subtitle">{about}</p>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            aria-label="Редактировать"
            type="button"
          ></button>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          aria-label="Добавить"
          type="button"
        ></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
