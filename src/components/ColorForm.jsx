import { useState } from "react";
import { nanoid } from "nanoid";
import ColorInput from "./ColorInput";
import { useEffect } from "react";

export default function ColorForm({ initialColor, onSubmit }) {
  const [hex, setHex] = useState("#000000");
  const [role, setRole] = useState("");
  const [contrastText, setContrastText] = useState("#FFFFFF");

  // Si hay un color inicial (en el caso de edición), asi puedo actualizar el estado del formulario
  useEffect(() => {
    if (initialColor) {
      setHex(initialColor.hex);
      setRole(initialColor.role);
      setContrastText(initialColor.contrastText);
    }
  }, [initialColor]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Para evitar que el formulario se recargue

    //es un nuevo objeto con los valores que ya tengo

    const newColor = {
      id: initialColor ? initialColor.id : nanoid(),
      hex,
      role,
      contrastText,
    };

    onSubmit(newColor); // Pasamos el color actualizado

    // Resetear el formulario
    setHex("#000000");
    setRole("");
    setContrastText("#FFFFFF");
  };

  const handleCancel = () => {
    // se restaura los valores iniciales al cancelar
    if (initialColor) {
      setHex(initialColor.hex);
      setRole(initialColor.role);
      setContrastText(initialColor.contrastText);
    } // asi se llama para salir sin haber hecho nada
    else {
      setHex("#000000");
      setRole("");
      setContrastText("#FFFFFF");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ColorInput
        label="Hex"
        type="color"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
      />
      <ColorInput
        label="Role"
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <ColorInput
        label="Contrast"
        type="color"
        value={contrastText}
        onChange={(e) => setContrastText(e.target.value)}
      />
      <button type="submit">
        {initialColor ? "Update Color" : "Add Color"}
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
