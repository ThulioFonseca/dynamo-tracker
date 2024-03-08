import "./Style.css";

export default function Modal({ isOpen, title, content, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="default-modal-overlay">
      <div className="default-modal">
        <div className="default-modal-header d-flex align-items-center">
          <h5 className="m-0">{title}</h5>
          <button className="close-button" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="default-modal-content">
          <p>{content}</p>
        </div>
        <hr />
        <div className="default-modal-footer">
          <button className="default-modal-confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="default-modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
