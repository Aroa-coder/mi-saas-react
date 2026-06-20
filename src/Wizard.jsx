import { useState } from "react";
import GeneradorWeb from "./GeneradorWeb";

export default function Wizard() {
  const [step, setStep] = useState(1);

  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedEstilo, setSelectedEstilo] = useState("");

  const [data, setData] = useState({
    tipo: "",
    estilo: "",
    nombre: "",
    descripcion: "",
    ubicacion: "",
    telefono: "",
    email: "",
  });

  const update = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const selectTipo = (value) => {
    setSelectedTipo(value);
    update("tipo", value);
  };

  const selectEstilo = (value) => {
    setSelectedEstilo(value);
    update("estilo", value);
  };

 const btnStyle = (active) => ({
  padding: "14px 18px",
  borderRadius: "14px",
  border: active ? "2px solid #111827" : "2px solid #e5e7eb",
  cursor: "pointer",
  background: active ? "#111827" : "white",
  color: active ? "white" : "#111827",
  transform: active ? "scale(1.07)" : "scale(1)",
  boxShadow: active
    ? "0 20px 45px rgba(17,24,39,0.25)"
    : "0 8px 20px rgba(0,0,0,0.08)",
  transition: "all 0.25s cubic-bezier(.2,.8,.2,1)",
  marginRight: "10px",
  marginBottom: "10px",
  fontWeight: "600",
  letterSpacing: "0.2px",
  position: "relative",
  overflow: "hidden",
});

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>

      {/* PASO 1 */}
      {step === 1 && (
        <div>
          <h2>¿Qué tipo de negocio tienes?</h2>

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "15px" }}>
            {["restaurante", "clinica", "tienda", "portafolio"].map((item) => (
              <button
                key={item}
                onClick={() => selectTipo(item)}
                style={{
                  ...btnStyle(selectedTipo === item),
                  animation: selectedTipo === item ? "pulse 1.5s infinite" : "none"
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <br />
          <button
            onClick={() => setStep(2)}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#111",
              color: "white",
              cursor: "pointer",
            }}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* PASO 2 */}
      {step === 2 && (
        <div>
          <h2>Elige el estilo</h2>

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "15px" }}>
            {["moderno", "elegante", "minimalista"].map((item) => (
              <button
                key={item}
                onClick={() => selectEstilo(item)}
                style={{
                  ...btnStyle(selectedEstilo === item),
                  animation: selectedEstilo === item ? "pulse 1.5s infinite" : "none"
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <br />
          <button
            onClick={() => setStep(3)}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#111",
              color: "white",
              cursor: "pointer",
            }}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* PASO 3 */}
      {step === 3 && (
        <div>
          <h2>Datos del negocio</h2>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "15px"
          }}>
            <input
              placeholder="Nombre"
              style={inputStyle}
              onChange={(e) => update("nombre", e.target.value)}
            />

            <input
              placeholder="Descripción"
              style={inputStyle}
              onChange={(e) => update("descripcion", e.target.value)}
            />

            <input
              placeholder="Ubicación"
              style={inputStyle}
              onChange={(e) => update("ubicacion", e.target.value)}
            />

            <input
              placeholder="Teléfono"
              style={inputStyle}
              onChange={(e) => update("telefono", e.target.value)}
            />

            <input
              placeholder="Email"
              style={inputStyle}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <br />
          <button
            onClick={() => setStep(4)}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#4f46e5",
              color: "white",
              cursor: "pointer",
            }}
          >
            Generar web
          </button>
        </div>
      )}

      {/* PASO 4 */}
      {step === 4 && (
        <GeneradorWeb data={data} />
      )}

    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
};