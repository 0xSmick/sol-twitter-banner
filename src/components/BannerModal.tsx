import { useState } from "react";
import { SelectedItemsContext } from "../contexts/SelectedItemsContext";

const Modal = ({ imageUrl, onClose }) => {
  const [isModalOpen, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <img src={imageUrl} alt="Modal" />
        <button onClick={handleClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default Modal;
