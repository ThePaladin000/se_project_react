// import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { GarmentChildren } from "../Forms/GarmentChildren";
import { handleCloseModal } from "../../utils/utils";

function App() {
  const temp = 78;

  return (
    <>
      <Header temp={temp} />
      <Main temp={temp} />
      <Footer />
      <ModalWithForm
        title="New garment"
        name="garment"
        buttonText="Add garment"
        onClose={handleCloseModal}
      >
        {GarmentChildren}
      </ModalWithForm>
      <ItemModal />
    </>
  );
}

export default App;
