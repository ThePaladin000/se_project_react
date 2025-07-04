import "./GarmentChildren.css";

export default function GarmentChildren({
  name,
  setName,
  link,
  setLink,
  weather,
  setWeather,
}) {
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setLink(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  return (
    <>
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <span className="modal__span"></span>
      <label className="modal__label">
        Image
        <input
          type="url"
          name="link"
          className="modal__input"
          placeholder="Image URL"
          value={link}
          onChange={handleImageUrlChange}
          required
        />
      </label>
      <p className="modal__radio-title">Select the weather type:</p>
      <div className="modal__radio-buttons">
        <div className="modal__radio-option">
          <label className="modal__radio-label">
            <input
              type="radio"
              id="hot"
              value="hot"
              name="weather"
              className="modal__radio-input"
              onChange={handleWeatherChange}
              checked={weather === "hot"}
              required
            />
            <span className="modal__custom-radio"></span>
            Hot
          </label>
        </div>
        <div className="modal__radio-option">
          <label className="modal__radio-label">
            <input
              type="radio"
              id="warm"
              value="warm"
              name="weather"
              className="modal__radio-input"
              onChange={handleWeatherChange}
              checked={weather === "warm"}
              required
            />
            <span className="modal__custom-radio"></span>
            Warm
          </label>
        </div>
        <div className="modal__radio-option">
          <label className="modal__radio-label">
            <input
              type="radio"
              id="cold"
              value="cold"
              name="weather"
              className="modal__radio-input"
              onChange={handleWeatherChange}
              checked={weather === "cold"}
              required
            />
            <span className="modal__custom-radio"></span>
            Cold
          </label>
        </div>
      </div>
    </>
  );
}
