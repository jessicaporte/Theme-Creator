export default function ColorInput({ label, type, value, onChange }) {
  return (
    <label>
      {label}:
      <input type={type} value={value} onChange={onChange} />
    </label>
  );
}
