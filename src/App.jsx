import { useState } from "react";
import { initialColors } from "./lib/colors";
import ColorForm from "./components/ColorForm";
import Color from "./components/Color";

export default function App() {
  const [colors, setColors] = useState(initialColors);

  const addColor = (newColor) => {
    setColors([newColor, ...colors]);
  };

  // Función de eliminación
  const deleteButton = (id) => {
    console.log("Eliminando color con id:", id);
    // Filtrar el array para eliminar el color con el `id` correspondiente
    setColors(colors.filter((color) => color.id !== id));
  };
  // actualizo el color
  const updateButton = (updatedColor) => {
    // Areemplazando el color con el id correspondiente, si colorid es =
    // updateid entonces queda el color nuevo, si no queda el color original pre edit
    setColors(
      colors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
  };
  return (
    <div>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={addColor} />
      {colors.length === 0 ? (
        <p>There are no colors in the theme. Add some to get started.</p>
      ) : (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            deleteButton={deleteButton}
            updateButton={updateButton}
          />
          //ahora deletebotton es un prop para luego enviarla a color.jsx y ellos la reciban
        ))
      )}
    </div>
  );
}
