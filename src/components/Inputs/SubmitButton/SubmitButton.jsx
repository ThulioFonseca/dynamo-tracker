import "./Style.css";
export default function SubmitButton({ onClick, children, className }) {
  return (
    <button type="submit" className={"submit-button"} onClick={onClick}>
      <span className="submit-button-label">{children}</span>
    </button>
  );
}
