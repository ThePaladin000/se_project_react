import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    item.likes && item.likes.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `item__card-like-button ${
    isLiked ? "item__card-like-button_active" : ""
  }`;

  const handleLike = (e) => {
    e.stopPropagation();
    if (currentUser && onCardLike) {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <div className="item__card" onClick={() => onCardClick(item)}>
      <div className="item__card-header">
        <p className="item__card-text">{item.name}</p>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
          >
            {isLiked ? "♥" : "♡"}
          </button>
        )}
      </div>
      <img src={item.imageUrl} alt={item.name} className="item__card-image" />
    </div>
  );
}

export default ItemCard;
