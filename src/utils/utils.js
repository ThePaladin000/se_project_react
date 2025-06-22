export const handleCloseModal = () => {
  console.log("modal close button clicked");
};

export const handleOverlayClick = (e, onClose) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};

export const handleEscClose = (e, onClose) => {
  if (e.key === "Escape") {
    onClose();
  }
};

export const handleCardClick = (card, setSelectedCard) => {
  setSelectedCard(card);
};

export const handleCloseItemModal = (setSelectedCard) => {
  setSelectedCard(null);
};
