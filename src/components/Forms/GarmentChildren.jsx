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
        <input
          type="radio"
          id="hot"
          value="hot"
          name="weather"
          defaultChecked
        />
        <label htmlFor="hot">Hot</label>
      </div>
      <div className="modal__radio-option">
        <input type="radio" id="warm" value="warm" name="weather" />
        <label htmlFor="warm">Warm</label>
      </div>
      <div className="modal__radio-option">
        <input type="radio" id="cold" value="cold" name="weather" />
        <label htmlFor="cold">Cold</label>
      </div>
    </div>
  </>
);
