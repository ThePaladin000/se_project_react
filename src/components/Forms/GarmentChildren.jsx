import "./GarmentChildren.css";

export default function GarmentChildren({
  name,
  imageUrl,
  weather,
  errors,
  focused,
  handleChange,
  handleBlur,
}) {
  return (
    <>
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className={`modal__input ${
            errors.name && focused.name ? "modal__input--error" : ""
          }`}
          placeholder="Name"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.name && focused.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <span className="modal__span"></span>
      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          className={`modal__input ${
            errors.imageUrl && focused.imageUrl ? "modal__input--error" : ""
          }`}
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.imageUrl && focused.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
