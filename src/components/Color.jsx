import { useState } from "react";
import "./Color.css";
import ColorForm from "./ColorForm";

//reciben deletebutton de la prop de app.jsx ({})
export default function Color({ color, deleteButton, updateButton }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  //cada color  muestra o no su propio cuadro de confirmación ya que esta dentro de la tarjeta

  const [isEditing, setIsEditing] = useState(false);
  //si isediting es false se muestra la tarjeta con el color y botones edit y delete
  //si es true, se muestra el colorform para editarlo

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {/* Si isEditing es TRUE, se muestra el formulario de edición (ColorForm)*/}
      {isEditing ? (
        <ColorForm
          initialColor={color} // los valores nuevos al formulario
          onSubmit={(updatedColor) => {
            updateButton(updatedColor); // con esto actualizo
            setIsEditing(false); // asi se vuelve al modo visualizacion
          }}
        />
      ) : (
        <>
          {/* Si isEditing es FALSE, mostramos la tarjeta del color normal que tenia originalmente*/}
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>

          {/*boton edit*/}
          <button onClick={() => setIsEditing(true)}> Edit </button>
          {/* Botón para eliminación,si usuario hace clic en "Delete",se activa  el 
      estado con setShowConfirmation(true), y luego asi aparece el cuadro de confirmación. */}

          <button type="button" onClick={() => setShowConfirmation(true)}>
            Delete
          </button>

          {/* Mostrar confirmación si showConfirmation es true */}
          {showConfirmation && (
            <div className="color-card-highlight">
              <p>Are you sure you want to delete this color?</p>
              <button
                onClick={() => {
                  deleteButton(color.id); // Si se elige "Yes, Delete", llamamos a deleteButton(color.id),
                  setShowConfirmation(false); // con esto se cierra la confirmacion luego de eliminar el color
                }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmation(false)} //si elije cancel como en el comienzo queda en false, se cierra sin quenada pase
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
