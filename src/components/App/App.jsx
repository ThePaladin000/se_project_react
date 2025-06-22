// import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const temp = 78;
  return (
    <>
      <Header temp={temp} />
      <Main temp={temp} />
      <Footer />
      <ModalWithForm />
      <ItemModal />
    </>
  );
}

export default App;
