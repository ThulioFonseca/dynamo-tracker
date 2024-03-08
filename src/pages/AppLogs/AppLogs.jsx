import { useState } from "react";
import Modal from "../../components/Common/Modal/Modal";

export default function AppLogs() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <h1>Logs</h1>
      <button onClick={handleModalOpen}>Abrir modal</button>
      <Modal
        isOpen={showModal} // Exemplo de estado para abrir o modal
        title="Título do Modal"
        content="Conteúdo do Modal"
        onClose={() => {
          handleModalOpen();
        }}
      />
    </div>
  );
}
