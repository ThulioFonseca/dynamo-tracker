import "./Style.css";
export default function CancelButton({ onClick, children, className }) {
  return (
    <button type="cancel" className={"cancel-button " + className} onClick={onClick}>
      <span className="cancel-button-label">{children}</span>
    </button>
  );
}
