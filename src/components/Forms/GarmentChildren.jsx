export const GarmentChildren = (
  <>
    <label className="modal__label">
      Name
      <input
        type="text"
        name="name"
        className="modal__input"
        placeholder="Name"
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
            defaultChecked
            className="modal__radio-input"
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
          />
          <span className="modal__custom-radio"></span>
          Cold
        </label>
      </div>
    </div>
  </>
);
