import React from 'react';

function Card({card, onCardClick}) {
    
    function handleClick() {
        onCardClick(card);
    }

    return(
        <div className='cards__card'>
            <div className='cards__photo-container'>
                <img className='cards__photo'
                src={card.link}
                alt={card.name}
                onClick={handleClick}
                />
            </div>
            <div className='cards__group'>
                <h2 className='cards__text'>{card.name}</h2>
                <div className='cards__like-container'>
                    <button className='cards__like' aria-label='Нравится' type='button'></button>
                    <span className= 'cards__like-count'>{card.likes.length}</span>
                </div>
            </div>
            <button className='cards__remove' aria-label='Удалить' type='button'></button>
        </div>
    )
}

export default Card;