import React, {useEffect} from 'react';
import {api} from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
        .then(([{ name, about, avatar }, cardList]) => {
          const card = cardList.map((data) => {
            return {
              name: data.name,
              link: data.link,
              likes: data.likes,
              id: data._id,
              ownerId: data.owner._id,
            };
          });
          setUserName(name);
          setUserDescription(about);
          setUserAvatar(avatar);
          setCards(card);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return(
    <main className='content'>
      <section className='profile'>
        <div className= 'profile__avatar-conteiner'>
          <img className='profile__avatar' src={userAvatar} alt='Аватарка'/>
          <button className= 'profile__avatar-button' onClick={onEditAvatar} type= 'button'></button>
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{userName}</h1>
          <p className='profile__subtitle'>{userDescription}</p>
          <button className='profile__edit-button' onClick={onEditProfile} aria-label='Редактировать' type='button'></button>
        </div>
        <button className='profile__add-button' onClick={onAddPlace} aria-label='Добавить' type='button'></button>
      </section>
      <section className='cards'>
        {cards.map((card) => (
          <Card key={card.id} card={card} onCardClick={onCardClick} />
        ))}   
      </section>
    </main>
  )
}

export default Main;