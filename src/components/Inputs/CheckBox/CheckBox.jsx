import "./Style.css";
export default function CheckBox({ checked, onChange }) {
  return (
    <div className="d-flex justify-content-center p-1">
      <input
        type="checkbox"
        className="styled-checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}
