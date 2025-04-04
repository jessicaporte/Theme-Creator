import { useState } from "react";
import { nanoid } from "nanoid";
import ColorInput from "./ColorInput";
import { useEffect } from "react";

export default function ColorForm({ initialColors, onSubmit }) {
  const [hex, setHex] = useState("#000000");
  const [role, setRole] = useState("");
  const [contrastText, setContrastText] = useState("#FFFFFF");

  // 4 al editar con isEditting en Colors.jsx, el effect detecta el cambio realizado en los colores iniciales y
  // actualiza los valores del form, sin effect el form solo muestra valores por defecto
  useEffect(() => {
    if (initialColors) {
      setHex(initialColors.hex);
      setRole(initialColors.role);
      setContrastText(initialColors.contrastText);
    }
  }, [initialColors]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Para evitar que el formulario se recargue

    //creo un nuevo objeto, si es colorinicial ya existe se mantiene el id, si es un color nuevo, se crea un id nuevo con nanoid
    const newColor = {
      id: initialColors ? initialColors.id : nanoid(),
      hex,
      role,
      contrastText,
    };

    onSubmit(newColor); //  envío el newColor a App.jsx

    // Resetreo el formulario asi lo dejo listo para un nuevo color
    setHex("#000000");
    setRole("");
    setContrastText("#FFFFFF");
  };

  return (
    // define cómo se ve y cómo funciona el formulario
    <form onSubmit={handleSubmit} className="color-form">
      {" "}
      {/*presiono Add o Update y se ejecuta handleSubmit*/}
      <ColorInput
        label="Hex"
        type="text"
        value={hex}
        onChange={(e) => setHex(e.target.value)} //actualizar el estado con el nuevo valor
      />
      <ColorInput
        label="Role"
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <ColorInput
        label="Contrast"
        type="text"
        value={contrastText}
        onChange={(e) => setContrastText(e.target.value)}
      />
      <button type="submit">
        {initialColors ? "Update Color" : "Add Color"}{" "}
        {/*cambio los valores y lo guardo con el botón "Update Color" o "Add Color".*/}
      </button>
      {/*<button type="button" onClick={handleCancel}> 
        Cancel
      </button> */}
    </form>
  );
}

/*const handleCancel = () => {
    // se restaura los valores iniciales al cancelar
    if (initialColors) {
      setHex(initialColors.hex);
      setRole(initialColors.role);
      setContrastText(initialColors.contrastText);
    } // asi se llama para salir sin haber hecho nada
    else {
      setHex("#000000");
      setRole("");
      setContrastText("#FFFFFF");
    }
  }; */
