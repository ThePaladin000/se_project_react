export const handleOverlayClick = (e, onClose) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};

export const handleCardClick = (card, setSelectedCard) => {
  setSelectedCard(card);
};

export const handleCloseItemModal = (setSelectedCard) => {
  setSelectedCard(null);
};

export const getTimeOfDay = (sunriseTimestamp, sunsetTimestamp) => {
  const now = new Date();
  const sunrise = new Date(sunriseTimestamp * 1000);
  const sunset = new Date(sunsetTimestamp * 1000);

  if (isNaN(sunrise.getTime()) || isNaN(sunset.getTime())) {
    return "Invalid sunrise or sunset timestamp.";
  }

  const isDaytime = now > sunrise && now < sunset;

  return isDaytime ? "day" : "night";
};
